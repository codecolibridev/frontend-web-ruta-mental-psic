import { ChevronDown, Search, RefreshCw } from 'lucide-react';

type PatientsFiltersProps = {
     onReload?: () => void;
};

export default function PatientsFilters({ onReload }: PatientsFiltersProps) {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap items-center gap-4">
               {/* Buscador */}
               <div className="lg:grow">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                         <div className="flex w-full items-stretch h-full gap-3">
                              <button
                                   type="button"
                                   aria-label="Reload data"
                                   onClick={() => onReload?.()}
                                   className="flex h-full items-center justify-center bg-[#233648] px-3 rounded-lg hover:bg-[#2d445c] transition-colors"
                              >
                                   <RefreshCw className="w-5 h-5 text-[#92adc9]" />
                              </button>

                              <div className="flex w-full flex-1 items-stretch rounded-lg h-full overflow-hidden bg-[#233648]">
                                   <div className="flex items-center justify-center px-4">
                                        <Search className="w-6 h-6 text-[#92adc9]" />
                                   </div>

                                   <input
                                        type="text"
                                        placeholder="Search by name or patient ID..."
                                        className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden text-white focus:outline-0 focus:ring-2 focus:ring-cyan-500/50 border-none bg-transparent h-full placeholder:text-[#92adc9] px-4 pl-2 text-base font-normal leading-normal"
                                   />
                              </div>
                         </div>
                    </label>
               </div>

               {/* Filtros tipo chip */}
               <div className="flex gap-3 overflow-x-auto pb-1 lg:pb-0">
                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#233648] pl-4 pr-3 hover:bg-[#2d445c] transition-colors">
                         <p className="text-white text-sm font-medium leading-normal">Status: All</p>
                         <ChevronDown className="w-5 h-5 text-white" />
                    </button>

                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#233648] pl-4 pr-3 hover:bg-[#2d445c] transition-colors">
                         <p className="text-white text-sm font-medium leading-normal">Therapist: All</p>
                         <ChevronDown className="w-5 h-5 text-white" />
                    </button>

                    <button className="flex h-12 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-[#233648] pl-4 pr-3 hover:bg-[#2d445c] transition-colors">
                         <p className="text-white text-sm font-medium leading-normal">Last Appointment</p>
                         <ChevronDown className="w-5 h-5 text-white" />
                    </button>
               </div>
          </div>
     );
}
