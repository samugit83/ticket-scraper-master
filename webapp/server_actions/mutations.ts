'use server'

import { TrackedTicketDataTypes, DrawerContactListDataTypes } from '@/types/types'


export const addNewTrackedTicket = async ({ trackedTicketData }: 
    { trackedTicketData: TrackedTicketDataTypes }) => {
    const url = `http://localhost:5000/new_tracked_ticket`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(trackedTicketData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error addNewTrackedTicket! status: ${response.status}`);
        } else {
            return true
        }

    } catch (error) {

        console.error('Error addNewTrackedTicket:', error);
        throw error; 
    }
};



export const switchTrackedTicket = async ({ checked, _id }: 
    { checked: boolean, _id: string }) => {
    const url = `http://localhost:5000/switch_tracked_ticket`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({switch_status: checked, _id}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error switchTrackedTicket! status: ${response.status}`);
        } else {
            return true
        }

    } catch (error) {

        console.error('Error switchTrackedTicket:', error);
        throw error; 
    }
};


export const deleteTrackedTicket = async ({ _id }: { _id: string }) => {
    const url = `http://localhost:5000/delete_tracked_ticket`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({_id}),
        });

        if (!response.ok) {
            throw new Error(`HTTP error deleteTrackedTicket! status: ${response.status}`);
        } else {
            return true
        }

    } catch (error) {

        console.error('Error deleteTrackedTicket:', error);
        throw error; 
    }
};



export const updateContactList = async ({ contactListData }: 
    { contactListData: DrawerContactListDataTypes }) => {

    const url = `http://localhost:5000/update_contact_list`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contact_list_data: contactListData }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error updateContactList! status: ${response.status}`);
        } else {
            return true
        }

    } catch (error) {

        console.error('Error updateContactList:', error);
        throw error; 
    }
};


