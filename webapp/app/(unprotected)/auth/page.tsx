import { getCsrfToken } from "next-auth/react"
import { cookies } from 'next/headers';
import { getServerSession, } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth_options";
import { redirect } from 'next/navigation'
//import { ForgPassButt } from '@/csr_comps/forgot_pass_button'

export default async function Page() {


    const csrfToken = await getCsrfToken({
        req: {
          headers: {
            cookie: cookies().toString(),
          },
        },
      });

    const jwtData = await getServerSession(authOptions)


    if(jwtData?.email) {

		redirect('/')

	} else {

    return (
        <div className="signin-parent-container">
            <div className="signin-container">
                <form method="post" action="/api/auth/callback/credentials">
                    <div className="signin-logo-container ">
                        <img className="signin-logo" src="/images/cronologo.png" alt="Cronomegawatt logo" />
                    </div>
                    <div className="signin-inputs">
                        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                        <label>
                            Email
                        </label>
                        <input name="email" type="text"/>
                        <label>
                            Password
                        </label>
                        <input name="password" type="password"/>
                        <button style={{width: "40%", margin: "auto", marginTop: "30px"}} className="signin-confirm" type="submit">Sign in</button>
                             {/* <ForgPassButt /> */}
                    </div>
                </form>
            </div>
        </div>
    )
}

}

