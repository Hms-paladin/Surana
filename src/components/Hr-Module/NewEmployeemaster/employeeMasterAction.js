import axios from 'axios';
import { apiurl } from "../../../App";
import { notification } from 'antd';

export const EMPLOYEE_MASTER_TAB = 'EMPLOYEE_MASTER_TAB';

export const EMPLOYEE_ID = 'EMPLOYEE_ID';

export const EMPLOYEE_DETAILS = 'EMPLOYEE_DETAILS';


export const employeeMasterTab = (tabData) => {
    return({
        type:EMPLOYEE_MASTER_TAB,
        tabData
    })
}

export const createEmployee = (empOfficialApiDatas) => {
    return(dispatch)=>{
        axios({
            method:'POST',
            url: apiurl+'/createEmployee',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...empOfficialApiDatas
            }
        }).then((response)=>{
            dispatch({
                type:EMPLOYEE_ID,
                payload:response.data.data
            })
            notification.success({
                message: "Employee Created Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            console.log(response.data,"responseData")
        }).catch((error)=>{
            console.log(error,"errorData")
        })
    }
}

export const updateEmployeeData = (empOfficialApiDatas) => {
    return(dispatch)=>{
        axios({
            method:'PUT',
            url: apiurl+'/updateemployeedetails',
            headers:{
                "Accept":'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...empOfficialApiDatas
            }
        }).then((response)=>{
            notification.success({
                message: "Employee Updated Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            console.log(response.data,"responseData")
        }).catch((error)=>{
            console.log(error,"errorData")
        })
    }
}


export const getPersonalDetails = (empId) => {
    return(dispatch)=> {
        axios({
            method:'POST',
            url:apiurl+'/EmployeeDetails',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            data:{
                empId
            }
        }).then((response)=>{
            dispatch({
                type:EMPLOYEE_DETAILS,
                payload:response.data.data
            })
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })
    }
}