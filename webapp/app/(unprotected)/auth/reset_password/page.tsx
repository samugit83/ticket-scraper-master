import { getCsrfToken } from "next-auth/react"
import { cookies } from 'next/headers';
import { ForgPassButt } from '@/csr_comps/forgot_pass_button'

export default async function Page() {

    const csrfToken = await getCsrfToken({
        req: {
          headers: {
            cookie: cookies().toString(),
          },
        },
      });



    return (
        <div className="signin-parent-container">
            <div className="signin-container">
                <form method="post" action="/api/auth/callback/credentials">
                    <div className="signin-logo-container ">
                        <img className="signin-logo" src="/images/pans.png" alt="Panscribe logo" />
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
                        <ForgPassButt />
                    </div>
                </form>
            </div>
        </div>
    )

}

