'use client';

import { useEffect, useId, useRef, useState, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, HelpCircle, Layers, Loader2, Phone, Siren, Wrench, Zap, type LucideIcon } from 'lucide-react';
import { SITE, orig } from '@/data/site';
import { OTHER_OPTION } from '@/data/quote-options';
import { validateLead, type LeadErrors, type LeadInput } from '@/lib/validation';
import { cn } from '@/lib/utils';
import { buttonClasses } from '@/components/ui/Button';
import { ContactVisibility } from '@/components/ContactVisibility';
import { Field, field, input } from '@/components/QuoteForm';

type Cat = 'plumbing' | 'electrical' | 'both' | 'not_sure';
type Status = 'idle' | 'submitting' | 'success' | 'not_configured' | 'error';

const CATS: { id: Cat; label: string; Icon: LucideIcon }[] = [
  { id: 'plumbing', label: 'Plumbing', Icon: Wrench },
  { id: 'electrical', label: 'Electrical', Icon: Zap },
  { id: 'both', label: 'Both', Icon: Layers },
  { id: 'not_sure', label: 'Not Sure', Icon: HelpCircle },
];

// Every name below is on the API's allow-list (ALL_SERVICE_OPTIONS), so the webhook only ever receives known values.
const PLUMBING = ['Emergency Plumbing', 'Drain Cleaning', 'Water Heater Services', 'Leak Detection', 'Sewer Repair'];
const ELECTRICAL = ['Electrical Repair', 'Electrical Panel Upgrades', 'EV Charger Installation', 'Emergency Electrician'];
const EMERGENCY_PLUMBING = 'Emergency Plumbing';
const EMERGENCY_ELECTRICAL = 'Emergency Electrician';

const chipsFor = (c: Cat): { label?: string; items: string[] }[] => {
  if (c === 'plumbing') return [{ items: [...PLUMBING, OTHER_OPTION] }];
  if (c === 'electrical') return [{ items: [...ELECTRICAL, OTHER_OPTION] }];
  if (c === 'both') return [{ label: 'Plumbing', items: PLUMBING }, { label: 'Electrical', items: [...ELECTRICAL, OTHER_OPTION] }];
  return [];
};

function CallLink({ className, children }: { className?: string; children: React.ReactNode }) {
  return <a href={SITE.phoneHref} aria-label={`Call ${SITE.phone}`} className={className}>{children}</a>;
}

/**
 * Homepage Quick Request: emergency phone panel + a short callback form.
 * Submits to the same /api/lead endpoint as the detailed form, as a `callback` request
 * (name + phone required, everything else optional), tagged `homepage-quick-request`.
 */
export function QuickRequest() {
  const uid = useId();
  const id = (k: string) => `${uid}-${k}`;
  const formRef = useRef<HTMLFormElement>(null);
  const sending = useRef(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zip, setZip] = useState('');
  const [message, setMessage] = useState('');
  const [cat, setCat] = useState<Cat | ''>('');
  const [services, setServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<LeadErrors & { category?: string }>({});
  const [status, setStatus] = useState<Status>('idle');

  // Any link marked data-quick-service="plumbing|electrical|both|not_sure" preselects that card (it also scrolls here via its #quick-request href).
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element).closest<HTMLElement>('[data-quick-service]');
      const v = el?.dataset.quickService as Cat | undefined;
      if (v && CATS.some((c) => c.id === v)) pick(v);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  function pick(c: Cat) {
    setCat(c);
    setErrors((cur) => ({ ...cur, category: undefined }));
    const allowed = chipsFor(c).flatMap((g) => g.items);
    setServices((cur) => cur.filter((s) => allowed.includes(s)));
  }
  const toggle = (s: string) => setServices((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));

  const plumbingUrgent = services.includes(EMERGENCY_PLUMBING);
  const electricalUrgent = services.includes(EMERGENCY_ELECTRICAL);
  const urgent = plumbingUrgent || electricalUrgent;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const values: LeadInput = {
      firstName: name, lastName: '', phone, email: '', message, type: 'callback', zip,
      // "Not Sure" has no category of its own on the backend: send no category plus the existing "Other / Not Sure" service.
      serviceCategory: cat === 'not_sure' ? '' : cat,
      services: cat === 'not_sure' ? [OTHER_OPTION] : services,
    };
    const found: LeadErrors & { category?: string } = validateLead(values, 'callback');
    if (found.firstName) found.firstName = 'Please enter your name.';
    if (!cat) found.category = 'Choose what you need help with.';
    setErrors(found);
    const first = (['firstName', 'phone', 'category', 'zip', 'message'] as const).find((k) => found[k]);
    if (first) {
      formRef.current?.querySelector<HTMLElement>(first === 'category' ? '[name="quickCategory"]' : `[name="${first}"]`)?.focus();
      return;
    }

    if (sending.current) return;
    sending.current = true;
    setStatus('submitting');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, source: 'homepage-quick-request', website: String(new FormData(e.currentTarget).get('website') ?? '') }),
      });
      // Success only after the server confirms delivery. Every other outcome keeps what the visitor typed.
      if (res.ok) { setStatus('success'); return; }
      if (res.status === 503) { setStatus('not_configured'); return; }
      if (res.status === 422) {
        const data = await res.json().catch(() => null);
        setErrors(data?.errors ?? {});
        setStatus('idle');
        return;
      }
      setStatus('error');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  const clear = (k: keyof LeadInput) => setErrors((cur) => (cur[k] ? { ...cur, [k]: undefined } : cur));
  const border = (k: keyof LeadInput) => (errors[k] ? 'border-brand-500 bg-white' : 'border-ink/20');
  const bad = (k: keyof LeadInput) => (errors[k] ? true : undefined);
  const desc = (k: keyof LeadInput) => (errors[k] ? `${id(k)}-error` : undefined);

  return (
    <section id="quick-request" aria-labelledby="quick-title" className="bg-paper py-12 lg:py-16">
      <ContactVisibility targetId="quick-request" />
      <div className="container-x grid items-stretch gap-6 lg:grid-cols-[2fr_3fr] lg:gap-8">
        {/* LEFT / FIRST ON MOBILE: emergency phone contact */}
        <aside aria-label="Emergency contact" className="on-red flex flex-col justify-center rounded-card bg-brand-800 p-7 text-white shadow-lift sm:p-9">
          <p className="inline-flex w-fit items-center gap-2 rounded-btn border border-white/30 bg-white/10 px-3 py-1.5 text-sm font-bold">
            <Siren className="h-4 w-4" aria-hidden /> 24/7 Emergency
          </p>
          <h2 className="h3-compact mt-5 !text-white">Need Urgent Help?</h2>

          <CallLink className="mt-7 inline-flex items-center gap-3 text-white">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-ui bg-white text-brand-700"><Phone className="h-6 w-6" aria-hidden /></span>
            <span className="display whitespace-nowrap text-[clamp(2.25rem,1.5rem+2.4vw,3rem)] leading-none">{SITE.phone}</span>
          </CallLink>
          <a href={SITE.phoneHref} className={buttonClasses('light', 'lg', 'mt-6 w-full')}><Phone className="h-5 w-5" aria-hidden /> Call Now</a>

        </aside>

        {/* RIGHT: quick callback form */}
        <div className="rounded-card bg-white p-7 text-ink shadow-lift sm:p-9">
          <h2 id="quick-title" className="h3-compact">Request a Quick Callback</h2>
          <p className="mt-3 max-w-xl text-ink-soft">Tell us what you need help with. Our team will have the details to guide you to the right service.</p>


          {status === 'success' ? (
            <div role="status" className="mt-6 rounded-card border border-line border-l-4 border-l-brand-700 bg-white p-6">
              <CheckCircle2 className="h-8 w-8 text-brand-700" aria-hidden />
              <h3 className="mt-3 text-xl font-bold !text-brand-700">Thank you!</h3>
              <p className="mt-2 text-[0.95rem]">Your request has been received. Our team will be in touch.</p>
              <p className="mt-2 text-[0.95rem]">For anything urgent, call <a className="font-bold text-brand-700 underline" href={SITE.phoneHref}>{SITE.phone}</a>. We answer 24/7 for plumbing emergencies.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={onSubmit} noValidate aria-describedby={id('note')} className="mt-6 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id={id('firstName')} label="Your name" error={errors.firstName}>
                  <input id={id('firstName')} name="firstName" value={name} onChange={(e) => { setName(e.target.value); clear('firstName'); }} autoComplete="name" aria-invalid={bad('firstName')} aria-describedby={desc('firstName')} className={cn(input, border('firstName'))} />
                </Field>
                <Field id={id('phone')} label="Phone number" error={errors.phone}>
                  <input id={id('phone')} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="(425) 555-0123" value={phone} onChange={(e) => { setPhone(e.target.value); clear('phone'); }} aria-invalid={bad('phone')} aria-describedby={desc('phone')} className={cn(input, border('phone'))} />
                </Field>
              </div>

              <fieldset aria-describedby={errors.category ? id('cat-error') : undefined}>
                <legend className="text-sm font-semibold text-ink">What do you need help with?<span className="text-brand-700" aria-hidden> *</span><span className="sr-only">(required)</span></legend>
                <div className="mt-1.5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {CATS.map(({ id: c, label, Icon }) => (
                    <label
                      key={c}
                      className={cn(
                        'relative flex min-h-[72px] cursor-pointer flex-col items-center justify-center gap-1.5 rounded-ui border-2 px-2 py-3 text-center text-[0.95rem] font-bold leading-tight transition duration-200',
                        'has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500',
                        cat === c ? 'border-brand-700 bg-brand-700 text-white' : 'border-line bg-white text-brand-700 hover:border-brand-500 hover:bg-brand-50',
                      )}
                    >
                      <input type="radio" name="quickCategory" value={c} checked={cat === c} onChange={() => pick(c)} className="sr-only" />
                      <Icon className="h-5 w-5" aria-hidden />{label}
                    </label>
                  ))}
                </div>
                {errors.category && <p id={id('cat-error')} role="alert" className="mt-1.5 text-sm font-semibold text-brand-600">{errors.category}</p>}

                {chipsFor(cat || 'not_sure').length > 0 && (
                  <div className="mt-4 space-y-3">
                    <p className="text-sm font-semibold text-ink">Pick a service <span className="font-normal text-ink-soft">(optional)</span></p>
                    {chipsFor(cat as Cat).map((g, gi) => (
                      <div key={g.label ?? gi}>
                        {g.label && <p className="mb-1.5 text-xs font-bold text-ink-soft">{g.label}</p>}
                        <ul className="flex flex-wrap gap-2">
                          {g.items.map((s) => (
                            <li key={s}>
                              <label className="flex min-h-[44px] cursor-pointer items-center rounded-btn border border-ink/20 bg-brand-50/50 px-3.5 text-sm font-semibold text-ink transition hover:border-brand-500 has-[:checked]:border-brand-700 has-[:checked]:bg-brand-700 has-[:checked]:text-white has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand-500">
                                <input type="checkbox" checked={services.includes(s)} onChange={() => toggle(s)} className="sr-only" />
                                {s}
                              </label>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </fieldset>

              <div className="sm:max-w-[calc(50%-0.625rem)]">
                <Field id={id('zip')} label="ZIP code" required={false} optionalHint error={errors.zip}>
                  <input id={id('zip')} name="zip" inputMode="numeric" autoComplete="postal-code" maxLength={10} placeholder="98204" value={zip} onChange={(e) => { setZip(e.target.value); clear('zip'); }} aria-invalid={bad('zip')} aria-describedby={desc('zip')} className={cn(input, border('zip'))} />
                </Field>
              </div>
              <Field id={id('message')} label="Brief description" required={false} optionalHint error={errors.message}>
                <textarea id={id('message')} name="message" rows={3} maxLength={2000} placeholder="Briefly describe what is happening..." value={message} onChange={(e) => { setMessage(e.target.value); clear('message'); }} aria-invalid={bad('message')} aria-describedby={desc('message')} className={cn(field, border('message'), 'min-h-[96px] resize-y py-3.5 leading-relaxed')} />
              </Field>

              {/* Honeypot: hidden from people and assistive tech */}
              <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
                <label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>

              {/* Urgent selections: the phone number comes first, the form stays available but is clearly not dispatch. */}
              <div aria-live="polite">
                {urgent && (
                  <div className="rounded-card border border-brand-500 border-l-4 border-l-brand-700 bg-brand-50 p-5">
                    <p className="flex items-start gap-3 text-[0.95rem] leading-snug">
                      <Siren className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden />
                      <span>
                        {plumbingUrgent ? (
                          <>
                            <strong className="text-base text-brand-700">Emergency plumbing? Call now.</strong>
                            <span className="mt-1 block">For urgent plumbing assistance, call our team directly. Emergency plumbing is available 24/7. Sending this form does not dispatch a plumber.</span>
                          </>
                        ) : (
                          <>
                            <strong className="text-base text-brand-700">Electrical problem? Call us directly.</strong>
                            <span className="mt-1 block">Speak with our team by phone. If there is fire, smoke, sparking or a burning smell, call 911 first. This form is not an emergency response service.</span>
                          </>
                        )}
                      </span>
                    </p>
                    <a href={SITE.phoneHref} className={buttonClasses('primary', 'lg', 'mt-4 w-full')}><Phone className="h-5 w-5" aria-hidden /> Call Now · {SITE.phone}</a>
                  </div>
                )}
              </div>

              <p id={id('note')} className="text-xs leading-relaxed text-ink-soft">
                Once you submit our form, we may reach out to you via phone, email, or text to communicate service details, which you can opt out of at any time.
                This form consent is not a condition of purchase. Message/data rates apply.{' '}
                <a className="font-semibold underline" href={orig('/terms-conditions/')}>Terms and Conditions</a> | <a className="font-semibold underline" href={orig('/privacy-policy/')}>Privacy Policy</a>.
              </p>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={buttonClasses(urgent ? 'secondary' : 'primary', 'md', 'w-full disabled:cursor-wait disabled:opacity-70 sm:w-auto sm:min-w-[240px]')}
              >
                {status === 'submitting' ? <><Loader2 className="h-5 w-5 animate-spin" aria-hidden /> Sending…</> : 'Request a Callback'}
              </button>

              <div aria-live="polite">
                {status === 'not_configured' && (
                  <div role="alert" className="flex gap-3 rounded-field border border-line border-l-4 border-l-brand-700 bg-white p-4 text-sm text-ink">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden />
                    <p><strong>Online requests aren&rsquo;t connected yet on this site.</strong> Nothing was sent. Please call <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>.</p>
                  </div>
                )}
                {status === 'error' && (
                  <div role="alert" className="flex gap-3 rounded-field border border-brand-500 bg-white p-4 text-sm text-ink">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-brand-700" aria-hidden />
                    <p>Something went wrong and your request may not have been sent. Your details are still here. Please try again, or call <a href={SITE.phoneHref} className="font-bold underline">{SITE.phone}</a>.</p>
                  </div>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
