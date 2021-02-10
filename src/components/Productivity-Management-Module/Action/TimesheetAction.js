import { apiurl } from "../../../App"

const axios = require('axios');

export const GET_EXPENSE_TYPE = 'GET_EXPENSE_TYPE';
export const GET_MODEOF_PAYEMENT = 'GET_MODEOF_PAYEMENT';
export const GET_TIMESHEET_PROJECTS = 'GET_TIMESHEET_PROJECTS';
export const GET_TIMESHEET_ACTIVITY = 'GET_TIMESHEET_ACTIVITY';
export const GET_STATUS_TASKLIST = 'GET_STATUS_TASKLIST';


export const getexpensetype  = () =>{
    
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/expensetype',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_EXPENSE_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}




export const getmodeofpayment  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/modeofpayment',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_MODEOF_PAYEMENT,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}

//Timesheet Project Dropdown

export const gettimesheetprojects  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/listofprojects',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_TIMESHEET_PROJECTS,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

//Timesheet Activity Dropdown

export const gettimesheetactivity  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/listofactivity',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_TIMESHEET_ACTIVITY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }


