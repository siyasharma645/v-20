import fs from 'node:fs';
import path from 'node:path';
import Image from 'next/image';
import { Zap } from 'lucide-react';
import stock from '@/data/stock.json';
import { cn } from '@/lib/utils';

type Slot = keyof typeof stock;

/**
 * Slot for licensed stock photography used where Danika has no genuine company photo.
 * - If the optimised file exists in /public/images/stock it is shown with an honest
 *   label (see "label" in stock.json, e.g. "Stock photo" or "Illustrative image") (and the credit from src/data/stock.json), so it is never presented as a Danika project.
 * - If it does not exist yet, a branded placeholder is rendered instead: no broken images, no fake photos.
 */
export function StockImage({ slot, sizes, className, position = 'center' }: { slot: Slot; sizes: string; className?: string; position?: string }) {
  const s = stock[slot];
  const exists = fs.existsSync(path.join(process.cwd(), 'public', 'images', 'stock', s.file));

  return (
    <div className={cn('absolute inset-0 overflow-hidden bg-brand-900', className)}>
      {exists ? (
        <>
          <Image src={`/images/stock/${s.file}`} alt={s.alt} fill sizes={sizes} loading="lazy" className="object-cover" style={{ objectPosition: position }} />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-950/60 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-3 left-3 z-[2] rounded-btn bg-brand-950/80 px-3 py-1 text-[0.7rem] font-semibold tracking-wide text-white backdrop-blur-sm">
            {s.label}{s.credit ? ` · ${s.credit}` : ''} · not a Danika project
          </p>
        </>
      ) : (
        <div className="blueprint absolute inset-0 grid place-items-center bg-brand-800" aria-hidden>
          <Zap className="h-24 w-24 text-white/80" strokeWidth={1.25} />
        </div>
      )}
    </div>
  );
}
