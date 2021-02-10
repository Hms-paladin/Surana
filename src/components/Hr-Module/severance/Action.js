import { apiurl } from "../../../App"
import {notification} from 'antd';

const axios = require('axios');

export const GET_ACCEPTED_BY = 'GET_ACCEPTED_BY';
export const GET_RELEIVED_BY = 'GET_RELEIVED_BY';
export const GET_EMPLOYEE_NAMES = 'GET_EMPLOYEE_NAMES';
export const GET_EMPLOYEE_BY_ID = 'GET_EMPLOYEE_BY_ID';
export const GET_EMPLOYEE_DOJ = 'GET_EMPLOYEE_DOJ';


//



export const getacceptedby  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/acceptedby',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_ACCEPTED_BY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}



export const getreleivedby  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/Relievedby',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_RELEIVED_BY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}

export const getEmployeeNames  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/severanceemployees',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_EMPLOYEE_NAMES,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}

// export const severanceDetails = (data) => {
//    console.log("asdflksdhflsadhfsadf",data)
//     return() => {
//         fetch(apiurl+'/severanceform',{
//             method:'post',
//             Header:{
//                 Accept:'application/json',
//                 'Content-Type':'application/json',
//             },
//             body:{data}
//         }).then((response) => alert(JSON.stringify(response)))
       
//     }

// }


export const severanceDetails = (data) => {
    console.log("data33",data)
    return()=>{
        axios({
            method:'post',
            url:apiurl+'/severanceform',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data
          
        }).then((response)=>{
            // alert(JSON.stringify(response))

    
            notification.warning({
                message: `Severance posted successfully`,
                duration: 3.5,
                placement: "topRight",
              });
           
        }).catch((error)=>{
        })
    }
}


export const sendFeedback = (data1,data2) => {
    return() => {
        fetch(apiurl+'/feedbackform',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"feedback":data1,"feedbackdescription":data2,"empId":"1"})
        }).then((response) => response.json()).then((responseJson) => {
            console.log("sdafsdlfkjslkdfjslkdfj",responseJson)
            notification.warning({
                message: `Feedback posted successfully`,
                duration: 3.5,
                placement: "topRight",
              });
        })
    }
}


export const getEmployeeById  = (data) => async dispatch => {
        try{
            const url = `${apiurl}/getemployeebasedonDepartment`
            const depdata = {
                "DepartmentId":data
            }
            const res = await axios.post(url,depdata)
            dispatch({type:"GET_EMPLOYEE_BY_ID",payload:res.data})
        }catch(err) {
            console.error(err)
        }
}

export const getEmployeeDoj = (data) => async dispatch => {
    try{
        const url = `${apiurl}/EmployeeDetails`
        const depdata = {
            "empId":data
        }
        const res = await axios.post(url,depdata)

        dispatch({type:"GET_EMPLOYEE_DOJ",payload:res.data.data[0].employeeofficial[0].DOJ})
    }catch(err) {
        console.error(err)
    }
}