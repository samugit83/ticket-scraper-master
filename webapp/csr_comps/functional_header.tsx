'use client'

import { useEffect } from "react";
import { LogOutIcon } from "@/csr_comps/icons";
import { useSession, signIn, signOut } from 'next-auth/react';
import { Loader } from "@/csr_comps/loader/loader";
import { useDispatch } from 'react-redux'
import { update_UserData } from '@/redux/reduxfeat/globalslice';
import { useSelector } from 'react-redux'
import { getUserData } from "@/server_actions/queries";
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function FunctionalHeader() {

    const dispatch = useDispatch();
    const pathname = usePathname()
    let pathname_array = pathname.split('/').filter(itm => itm)

    const CacheUserData = useSelector((state: any) => state.global.CacheUserData)



    useEffect(() => {

        let fetchUserData = async () => {

            let userData = await getUserData('admin')  //userName lo prendiamo dalla session

            dispatch(update_UserData(userData));
        }

        if (!CacheUserData?.userName) {
            fetchUserData()
        }

    });  // quando verrà implementato il jwt aggiungere [session]  come cronomegawatt, la query verrà effettuata per popolare il jwt


    return (
        <div className="mb-[20px] flex flex-row items-center">
            <Link href={`/event-search`} >
                <div className={`py-[5px] w-[160px] text-center rounded-tl-lg rounded-bl-lg border border-primary
                        ${pathname_array[0] === 'event-search' 
                            ? 'bg-primary text-background' 
                            : 'bg-background text-primary'}`}>
                    Event search
                </div>
            </Link>
            <Link href={`/tracked-tickets`} >
                <div className={`py-[5px] w-[160px] text-center rounded-tr-lg rounded-br-lg border border-primary
                        ${pathname_array[0] === 'tracked-tickets' 
                            ? 'bg-primary text-background' 
                            : 'bg-background text-primary'}`}>
                    Tracked tickets
                </div>
            </Link>
        </div>

        /*
        <div className={"flex align-items gap-x-4"}>
            {status === "loading" 
            ? 
            <Loader size={30} /> 
            :
            session
            ? 
            <button className="hover:scale-110 transition-all duration-400" onClick={() => signOut({ callbackUrl: '/api/auth/signin' })} >  
              <LogOutIcon size={30} fill={'#F31260'} />
            </button> 
            :
            null
            }
        </div>
        */
    )

}

