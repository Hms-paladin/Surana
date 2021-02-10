import { apiurl } from "../../../../../App"

const axios = require('axios');

export const GET_STAGE_LIST = 'GET_STAGE_LIST';
export const GET_SUBSTAGE_LIST = 'GET_SUBSTAGE_LIST';
export const GET_STATUS_LIST = 'GET_STATUS_LIST';
export const GET_CLASS_LIST = 'GET_CLASS_LIST';
export const GET_PROJECT_NAME ="GET_PROJECT_NAME";





export const getStagelist  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/stageslist',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_STAGE_LIST,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getSubStagelist  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/substageslist',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_SUBSTAGE_LIST,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}




export const getStatuslist  = () =>{
    return(dispatch)=>{
         axios({
            method:'GET',
            url:apiurl+'/statuslist',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_STATUS_LIST,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getClassList  = () =>{
    return(dispatch)=>{
         axios({
            method:'GET',
            url:apiurl+'/classlist',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_CLASS_LIST,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}

export const getProjectName = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/ProjectName',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_PROJECT_NAME,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}


