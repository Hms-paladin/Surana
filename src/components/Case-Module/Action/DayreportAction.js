import { apiurl } from "../../../App"

const axios = require('axios');

export const GET_INTERNAL_CASE = 'GET_INTERNAL_CASE';
export const GET_COURT_CASE_NO = 'GET_COURT_CASE_NO';




export const getinternalcase  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/Internalcasenumber',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_INTERNAL_CASE,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getcourtcase  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/courtcaseNo',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_COURT_CASE_NO,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}