import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GlobalDataState, UserDataState, TrackedTicketDataTypes, QueueInfoTypes, DrawerContactListDataTypes} from '@/types/types';

const initialState: GlobalDataState = {
  UserData:  {
    userName: null,
    trackedTickets: []
  },
  oneSubIsLoading: false,
  queueInfo: null,
  lastCycleDuration: null,
  drawerContactListData: {
    _id: "",
    contactType: "",
    contactString: "",
    isOpen: false
  }
};


export const globalSlice = createSlice({ 
  name: 'global', 
  initialState,
  reducers: {
    update_UserData: (state, action: PayloadAction<UserDataState>) => {
      state.UserData = action.payload 
    },
    push_NewTrackedTicket: (state, action: PayloadAction<TrackedTicketDataTypes>) => {
      state.UserData.trackedTickets.push(action.payload);
    },
    delete_TrackedTicket: (state, action: PayloadAction<string>) => {
      const _id = action.payload
      state.UserData.trackedTickets = state.UserData.trackedTickets.filter(itm => itm._id !==_id)
    },
    update_oneSubIsLoading: (state, action: PayloadAction<boolean>) => {
      state.oneSubIsLoading = action.payload 
    },
    update_queueInfo: (state, action: PayloadAction<QueueInfoTypes>) => {
      state.queueInfo = action.payload
    },
    update_lastCycleDuration: (state, action: PayloadAction<number>) => {
      state.lastCycleDuration = action.payload
    },
    update_drawerContactListData: (state, action: PayloadAction<DrawerContactListDataTypes>) => {
      state.drawerContactListData = action.payload
    }
  }
})


export const { 
  update_UserData,
  push_NewTrackedTicket,
  delete_TrackedTicket,
  update_oneSubIsLoading,
  update_queueInfo,
  update_lastCycleDuration,
  update_drawerContactListData
 } = globalSlice.actions

export default globalSlice.reducer



