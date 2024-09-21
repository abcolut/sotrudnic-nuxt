export interface serverRespType {  
    reset: string;  
    sendingData: string;  
    sucsess: string;  
    error: string;  
}

const serverResp = <serverRespType>{reset:'', sendingData:'sendingData', sucsess:'ok', error:'error'}

export default serverResp;