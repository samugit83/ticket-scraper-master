'use client'

import React from 'react'
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerFooter
} from "@/components/ui/drawer"
import { useSelector, useDispatch } from 'react-redux'
import { update_drawerContactListData, update_UserData } from '@/redux/reduxfeat/globalslice'
import { RootState } from '@/redux/store'
import { updateContactList } from '@/server_actions/mutations'
import { getUserData } from '@/server_actions/queries'





export function DrawerContactList() {

  const dispatch = useDispatch()

  const drawerContactListData = useSelector((state: RootState) => state.global.drawerContactListData)

  const handleCloseDrawer = () => {
    dispatch(update_drawerContactListData({
      _id: "",
      contactType: "",
      contactString: "",
      isOpen: false
    }))
  }

  const handleSave = async () => {
    await updateContactList({ contactListData: drawerContactListData })
    dispatch(update_drawerContactListData({
      _id: "",
      contactType: "",
      contactString: "",
      isOpen: false
    }))
    let userData = await getUserData('admin')
    dispatch(update_UserData(userData));
  }

  return (

    <Drawer open={drawerContactListData.isOpen} >
      <DrawerContent className="p-[30px]">
        <div className="overflow-y-auto hide-scrollbar" style={{ maxHeight: 'calc(100vh - 120px)'}}>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">
            {drawerContactListData.contactType === 'email' ? 'Indirizzi Email' : 'Numeri di cellulare'}
          </h3>
          <textarea
            className="w-full min-h-[200px] p-2 rounded-md resize-y border border-gray-300"
            value={drawerContactListData.contactString}
            onChange={(e) => dispatch(update_drawerContactListData({  
              ...drawerContactListData,
              contactString: e.target.value
            }))}
          />
        </div>
        </div>
        <DrawerFooter className="pt-2">
        <div className="flex items-center gap-x-[20px] ml-auto">
            <Button variant="outline" className="w-[100px]" onClick={handleCloseDrawer}>
              Cancella
            </Button>  
            <Button className="w-[100px] bg-primary text-white" onClick={handleSave}>
              Salva
            </Button>
        </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>

  )
}
 
