import { apiurl } from "../../../App"

const axios = require('axios');

export const GET_EXPENSE_OPTION = 'GET_EXPENSE_OPTION';
export const GET_EXPENSE_DEPARTMENT = 'GET_EXPENSE_DEPARTMENT';

export const getexpenseOptions  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/listofnames',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_EXPENSE_OPTION,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}


export const getexpenseDepartment  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/listofdepartments',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_EXPENSE_DEPARTMENT,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}
