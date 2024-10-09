import React from 'react';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
  } from "@/components/ui/alert-dialog"
  

  interface DialogParamType {
    dialog_title: string;
    dialog_descr: string;
    cancel_button: string;
    comfirm_button: string;
  }

   
  export function DialogConfirmation({
    confirm_dialog_data, 
    open_state,
    handleCancelDeleteAzioni,
    handleConfirmDeleteAzioni}:
    {confirm_dialog_data: DialogParamType, 
     open_state: any,
     handleCancelDeleteAzioni: any,
     handleConfirmDeleteAzioni: any}) {


    return (
      <AlertDialog open={open_state}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
                {confirm_dialog_data.dialog_title}
            </AlertDialogTitle>
            <AlertDialogDescription>
                {confirm_dialog_data.dialog_descr}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleCancelDeleteAzioni}>
                {confirm_dialog_data.cancel_button}
            </AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDeleteAzioni}>
                {confirm_dialog_data.comfirm_button}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }