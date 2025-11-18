import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination() {
     return (
          <div className="flex flex-wrap items-center justify-between gap-4">
               <p className="text-sm text-[#92adc9]">Showing 1 to 5 of 57 patients</p>
               <div className="flex items-center gap-2">
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20 transition">
                         <ChevronLeft className="w-4 h-4 text-white" />
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyan-500 bg-cyan-500/20 text-white font-medium">
                         1
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20">
                         2
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20">
                         3
                    </button>
                    <span className="text-white px-2">...</span>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20">
                         12
                    </button>
                    <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#324d67] bg-[#233648] text-white hover:bg-cyan-500/20 transition">
                         <ChevronRight className="w-4 h-4 text-white" />
                    </button>
               </div>
          </div>
     );
}
