import { ChevronLeft, ChevronRight } from 'lucide-react';

type Meta = {
     total: number;
     page: number;
     lastPage: number;
} | null;

interface PaginationProps {
     meta: Meta;
     page: number;
     limit: number;
     setPage: (n: number) => void;
}

function range(from: number, to: number) {
     const res: number[] = [];
     for (let i = from; i <= to; i++) res.push(i);
     return res;
}

export default function Pagination({ meta, page, limit, setPage }: PaginationProps) {
     if (!meta) return null;

     const total = meta.total;
     const lastPage = meta.lastPage;

     const start = Math.min(total, (page - 1) * limit + 1);
     const end = Math.min(total, page * limit);

     // build page buttons with ellipsis
     const pages: (number | string)[] = [];
     if (lastPage <= 7) {
          pages.push(...range(1, lastPage));
     } else {
          pages.push(1);
          const left = Math.max(2, page - 2);
          const right = Math.min(lastPage - 1, page + 2);

          if (left > 2) {
               pages.push('...');
          }

          pages.push(...range(left, right));

          if (right < lastPage - 1) {
               pages.push('...');
          }

          pages.push(lastPage);
     }

     const goPrev = () => setPage(Math.max(1, page - 1));
     const goNext = () => setPage(Math.min(lastPage, page + 1));

     return (
          <div className="flex flex-wrap items-center justify-between gap-4">
               <p className="text-sm text-[#92adc9]">
                    Mostrando {start} a {end} de {total} pacientes
               </p>
               <div className="flex items-center gap-2">
                    <button
                         onClick={goPrev}
                         disabled={page <= 1}
                         className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                              page <= 1
                                   ? 'border-[#26353f] text-[#516c82]'
                                   : 'border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20'
                         } transition`}
                    >
                         <ChevronLeft className="w-4 h-4" />
                    </button>

                    {pages.map((p, idx) =>
                         typeof p === 'string' ? (
                              <span key={`sep-${idx}`} className="text-white px-2">
                                   {p}
                              </span>
                         ) : (
                              <button
                                   key={p}
                                   onClick={() => setPage(p)}
                                   className={`flex h-9 min-w-[36px] items-center justify-center rounded-lg border px-2 ${
                                        p === page
                                             ? 'border-cyan-500 bg-cyan-500/20 text-white font-medium'
                                             : 'border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20'
                                   }`}
                              >
                                   {p}
                              </button>
                         )
                    )}

                    <button
                         onClick={goNext}
                         disabled={page >= lastPage}
                         className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                              page >= lastPage
                                   ? 'border-[#26353f] text-[#516c82]'
                                   : 'border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20'
                         } transition`}
                    >
                         <ChevronRight className="w-4 h-4" />
                    </button>
               </div>
          </div>
     );
}
