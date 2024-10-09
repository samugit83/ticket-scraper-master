

export interface jwtTypes {
  id: string;
  email: string;
  nome: string | undefined;
  cognome: string | undefined;
}


export interface GeneralParamsTypes {
  supported_upload_format: string[];
  max_file_size_mb_upload: number;
  queue_info_update_interval: number;
  usequeryCache: {  
    staletime: {
      dpp: number; 
  }}
  defaultEmailList: string[];
  defaultPhoneList: string[];
}


export interface TrackedTicketDataTypes {
  _id?: string;
  eventName: string;
  eventIsoDatetime: string;  
  city: string;
  userName: string;
  isActive: boolean;
  creationTime: number;  
  imgUrl: string;
  lastNotificationTime: number | null; 
  nrTickets: number;
  channels: string[];
  emailList: string[];
  phoneList: string[];
}

export interface RawTicketDataTypes {
  city: string;
  date_time: string;
  iso_datetime: string;
  link: string;
  location: string;
} 

export interface QueueInfoTypes {
  ApproximateNumberOfMessages: string;
  lastUpdateTime: number;
}

export interface DrawerContactListDataTypes {
  _id: string;
  contactType: string;
  contactString: string;
  isOpen: boolean;
}

export interface GlobalDataState {
  UserData: UserDataState,
  oneSubIsLoading: boolean;
  queueInfo: QueueInfoTypes | null;
  lastCycleDuration: number | null;
  drawerContactListData: DrawerContactListDataTypes;
}

export interface UserDataState {
    userName: string | null;
    trackedTickets: TrackedTicketDataTypes[]
}