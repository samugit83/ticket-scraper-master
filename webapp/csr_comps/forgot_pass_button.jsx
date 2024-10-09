'use client'
import { useRouter } from 'next/navigation';

export function ForgPassButt() {

  const router = useRouter()

  const goToPage = () => {
    router.push('/auth/reset_password')
}

  return <div onClick={goToPage} className="button-forgot">Forgot your password?</div>

}

