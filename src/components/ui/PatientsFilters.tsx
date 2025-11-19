import { ChevronDown, Search } from 'lucide-react';

export default function PatientsFilters() {
     return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-wrap items-center gap-4">
               {/* Buscador */}
               <div className="lg:grow">
                    <label className="flex flex-col min-w-40 h-12 w-full">
                         <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                              <div className="flex border-none bg-[#233648] items-center justify-center px-4 rounded-l-lg">
                                   <Search className="w-6 h-6 text-[#92adc9]" />
                              </div>
                              <input
                                   type="text"
                                   placeholder="Search by name or patient ID..."
                                   className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-cyan-500/50 border-none bg-[#233648] h-full placeholder:text-[#92adc9] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                              />
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
