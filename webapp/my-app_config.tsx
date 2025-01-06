
import {GeneralParamsTypes} from '@/types/types'

export const general_params: GeneralParamsTypes = {
    supported_upload_format: ['.txt', '.md', '.html', '.doc', '.docx', '.csv', '.xls', '.xlsx', '.pdf'],
    max_file_size_mb_upload: 20,
    queue_info_update_interval: 30000,
    usequeryCache: {
      staletime: {
        dpp: 60000000
      }
    },
    defaultEmailList: [],
    defaultPhoneList: []
};




