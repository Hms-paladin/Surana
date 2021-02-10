import { apiurl } from '../../../../App'
import {notification} from 'antd';
const axios = require('axios');

export const GET_INT_NUM = 'GET_INT_NUM';
export const GET_COURT_NUM = 'GET_COURT_NUM';
export const GET_CASE_VIEW = 'GET_CASE_VIEW';





export const getIntNum  = () =>{
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
                type:GET_INT_NUM,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getCourtNum  = () =>{
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
            type:GET_COURT_NUM,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}

    export const getCaseView = () =>{
        return(dispatch)=>{
            axios({
                method:'post',
                url:apiurl+'/viewcase',
                Header:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                }
            }).then((response)=>{
                
                dispatch({
                    type:GET_CASE_VIEW,
                    payload:response.data
                })
            }).catch((error)=>{
            })
        }
        }
