import { apiurl } from "../../../App"

const axios = require('axios');

export const GET_COURT_NAME = 'GET_COURT_NAME';
export const GET_CITY_NAME = 'GET_CITY_NAME';
export const PUT_COURT_DATA = 'PUT_COURT_DATA';




export const getcourtName  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/court',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_COURT_NAME,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getcityName  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/city',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_CITY_NAME,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}




//Edit Court Function
export const EditCourtData  = () =>{
    return(dispatch)=>{
         axios({
            method:'PUT',
            url:apiurl+'/updatecourt',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:PUT_COURT_DATA,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}