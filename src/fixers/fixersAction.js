import { apiurl } from '../App.js';

const axios = require('axios');

export const GET_DEPARTMENT = 'GET_DEPARTMENT';

export const GET_QUALIFICATION_LIST = 'GET_QUALIFICATION_LIST';

export const GET_EMPLOYEES  = 'GET_EMPLOYEES';

export const GET_CLIENT = 'GET_CLIENT';

export const GET_PROFESSIONAL_COURSE = 'GET_PROFESSIONAL_COURSE';

export const GET_LIST_OF_EMPLOYEES = 'GET_LIST_OF_EMPLOYEES';

export const GET_ALLOWANCE_TYPE = 'GET_ALLOWANCE_TYPE';

export const GET_DEDUCTION_TYPE = 'GET_DEDUCTION_TYPE';

export const BUTTON_DISABLE_ACTION = 'BUTTON_DISABLE_ACTION';

export const GET_TYPEOF_INDUSTRY = 'GET_TYPEOF_INDUSTRY';

export const GET_REFERRED_BY = 'GET_REFERRED_BY';

export const getTypeOfIndustry = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/typeofIndustry'
        }).then((response)=>{
            dispatch({
                type:GET_TYPEOF_INDUSTRY,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getReferredBy = () => {
    return(dispatch)=>{
        axios({
            method:'POST',
            url:apiurl+'/getReferredBy'
        }).then((response)=>{
            dispatch({
                type:GET_REFERRED_BY,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getDepartment = () => {
    return(dispatch) =>{
        axios({
            method:'get',
            url: apiurl+'/listofdepartments',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
              },
        
        }).then((response)=>{
            dispatch({
                type: GET_DEPARTMENT,
                payload: response.data
            })
        })
    }
}


export const getQualificationList = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listofqualifications',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            dispatch({
                type:GET_QUALIFICATION_LIST,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getEmployees = () => {
    return(dispatch)=>{
        axios({
            method:'get',
            url: apiurl+'/listofemployees',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
        }).then((response)=>{
            dispatch({
                type: GET_EMPLOYEES,
                payload: response.data
            })
        }).catch((error)=>{
            alert(error)
        })
    }
}


export const getClient = () => {
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/getclients',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
        }).then((response)=>{
            dispatch({
                type:GET_CLIENT,
                payload:response.data
            })
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const getProfessionalCourse = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+"/listofcourses",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_PROFESSIONAL_COURSE,
                payload:response.data
            })
        }).catch((error)=>{
            alert(error)
        })
    }
}

// Get AllowanceType
export const getAllowanceType = () => {
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/getallowances',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_ALLOWANCE_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
            alert(error)
        })
    }
}
// Get DeductionType
export const getDeductionType = () => {
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/getdeductions',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_DEDUCTION_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const buttonDisableAction = (btnState) => {
    return(dispatch)=>{
       dispatch({
           type:BUTTON_DISABLE_ACTION,
           payload:btnState
       })
    }
}