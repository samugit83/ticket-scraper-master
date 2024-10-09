import FunctionalHeader from '@/csr_comps/functional_header'
import { Poppins } from "next/font/google"
const poppins = Poppins({ subsets: ['latin-ext'], weight: "400" })



export default async function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <>
        
        <div className={`w-screen h-screen fixed flex justify-center ${poppins.className} overflow-y-auto`}> 
          <div className="w-full max-w-[1200px] pt-[40px] mx-[30px]">
            <FunctionalHeader />
            {children}
          </div>
        </div>
      </>

    ) 

  
}
  