import { apiurl } from "../../../App"

const axios = require('axios');

export const GET_HEARING_TASK = 'GET_HEARING_TASK';
export const GET_HEARING_PARTY = 'GET_HEARING_PARTY';

export const gethearingTask  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/taskassignedto',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_HEARING_TASK,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const gethearingParty  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/takenparty',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_HEARING_PARTY,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}
