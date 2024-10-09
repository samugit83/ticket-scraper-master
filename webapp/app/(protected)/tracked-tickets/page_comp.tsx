'use client'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { delete_TrackedTicket } from '@/redux/reduxfeat/globalslice'
import { RootState } from '@/redux/store';
import { switchTrackedTicket, deleteTrackedTicket } from "@/server_actions/mutations";
import { format } from 'date-fns';
import { it } from 'date-fns/locale';
import { Switch } from "@/components/ui/switch"
import { TrackedTicketDataTypes } from '@/types/types' 
import { TrashIcon, EmailIcon, PhoneIcon } from '@/csr_comps/icons'
import Image from 'next/image'
import { update_queueInfo, update_lastCycleDuration, update_drawerContactListData } from '@/redux/reduxfeat/globalslice';
import { getQueueInfo, getParameter } from '@/server_actions/queries';
import { general_params } from '@/my-app_config';
import { DrawerContactList } from '@/csr_comps/drawer_contact_list';


const QueueInfoComp = () => {

  const dispatch = useDispatch()

  const queueInfo = useSelector((state: RootState) => state.global.queueInfo)
  const lastCycleDuration = useSelector((state: RootState) => state.global.lastCycleDuration)

  const handleGetQueueInfo = async () => {
    let resp = await getQueueInfo()
    if(resp){ 
      dispatch(update_queueInfo({...resp, lastUpdateTime: new Date().getTime()}))
    };
  }

  const handleGetLastCycleDuration = async () => {
    let paramValue = await getParameter('duration')
    if(paramValue){ 
      dispatch(update_lastCycleDuration(paramValue))
    };
  }

  useEffect(() => {
    handleGetQueueInfo()
    handleGetLastCycleDuration()
    const interval = setInterval(() => {
      handleGetQueueInfo()
      handleGetLastCycleDuration()
    }, general_params.queue_info_update_interval)
    return () => clearInterval(interval)
  }, [])

  return <div className="bg-accent p-[20px] rounded-lg shadow-md mb-[20px] flex items-center justify-between">
          <p className="text-[18px] font-semibold">Task in coda: {queueInfo?.ApproximateNumberOfMessages}</p>
          <p className="text-[18px]">Durata ultimo ciclo: {lastCycleDuration}s</p>
          <p className="text-[18px]">
            Ultimo update: {queueInfo?.lastUpdateTime ? format(new Date(queueInfo?.lastUpdateTime), 'EEE d MMM HH:mm:ss', { locale: it }) : '---'}
          </p>
        </div>
}



export const PageComp = () => {

  const dispatch = useDispatch()
  const UserData = useSelector((state: RootState) => state.global.UserData)

  const handleSwitchTrackedTicket = (checked: boolean, _id: string) => {
    switchTrackedTicket({ checked, _id })
  }

  const handleDelete = async (_id: string) => {
    let resp = await deleteTrackedTicket({_id})
    if(resp){ 
      dispatch(delete_TrackedTicket(_id as string))
    };
  } 

  const handleOpenDrawerContactList = async ({_id, contactType, contactString}: {_id: string, contactType: string, contactString: string}) => {
    dispatch(update_drawerContactListData({_id, contactType, contactString, isOpen: true}))
  } 



  return (
    <div className="pb-[100px]">
      <QueueInfoComp />
        {UserData?.trackedTickets?.map((item: TrackedTicketDataTypes, idx: number) => {
          return <div key={`key-${idx}`} className="bg-accent p-[20px] rounded-lg shadow-md mb-[20px] flex items-center justify-between">
            <div className="flex items-center gap-x-[50px]">
              <Image
                src={item.imgUrl}
                alt="image"
                height={100}
                width={100}
              />
              <div className="max-w-[30%]">
                <p className="text-[19px] font-semibold text-primary">
                  {item.eventName}
                </p>
                <p className="text-[16px]">
                  {item.city.charAt(0).toUpperCase() + item.city.slice(1)}
                </p>
                <p className="text-[16px]">
                  {format(new Date(item.eventIsoDatetime), 'EEE d MMM HH:mm', { locale: it })}
                </p>
              </div>
              <div>
                <p className="text-[16px]">
                  Ultima notifica: {item.lastNotificationTime ?
                    format(new Date(item.lastNotificationTime), 'EEE d MMM HH:mm', { locale: it }) :
                    '---'}
                </p>
                <p className="text-[16px]">
                  Data creazione: {format(new Date(item.creationTime), 'EEE d MMM HH:mm', { locale: it })}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-[20px]">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full cursor-pointer" 
                onClick={() => handleOpenDrawerContactList({_id: item._id as string, contactType: 'email', contactString: item?.emailList?.join(' ') as string})}>
                <EmailIcon size={24} fill={'white'} />
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-full cursor-pointer"
                onClick={() => handleOpenDrawerContactList({_id: item._id as string, contactType: 'phone', contactString: item?.phoneList?.join(' ') as string})}>
                <PhoneIcon size={24} fill={'white'} />
              </div>
              <p className="text-[15px] ml-[20px] flex items-center whitespace-nowrap">
                Nr ticket: <span className="text-[30px] ml-[10px] text-primary">{item.nrTickets}</span>
              </p>
              <Switch defaultChecked={item.isActive} onCheckedChange={(checked) => handleSwitchTrackedTicket(checked, item._id as string)} />
              <div className="cursor-pointer " onClick={() => handleDelete(item._id as string)}>
                <TrashIcon size={30} fill={'hsl(var(--ring))'} />
              </div>
            </div>
          </div>
        })}
         <DrawerContactList />
    </div>
  )


}


