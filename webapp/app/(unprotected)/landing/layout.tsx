import { Poppins } from "next/font/google"
const poppins = Poppins({ subsets: ['latin-ext'], weight: "400" })

export default async function Layout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return (
      <div className={`w-screen h-screen fixed flex justify-center ${poppins.className}`}> 

          {children}

      </div>
    )

  
}
  