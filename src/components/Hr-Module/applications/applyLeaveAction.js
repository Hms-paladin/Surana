import { apiurl } from "../../../App"
import axios from 'axios';
import { notification } from "antd";

export const applyLeave = (leaveApplicatondatas,resetFormData) => {
    return(dispatch)=>{
        axios({
            method:'post',
            url:apiurl+'/applyleave',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...leaveApplicatondatas
            }
        }).then((response)=>{
            notification.success({
                message: "Leave Application Submitted Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            // alert(JSON.stringify(response))
            // alert('Leave Application Submitted')
            resetFormData()
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const applyPermission = (permissiondata,resetFormData) => {
    return()=>{
        axios({
            method:'post',
            url:apiurl+'/applyPermission',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...permissiondata
            }
        }).then((response)=>{
            notification.success({
                message: "Permission Application Submitted Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            // alert("Permission Application Submitted")
            resetFormData()
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const addCepLeave = (cepLeave,resetFormData) => {
    return()=>{
        axios({
            method:'post',
            url:apiurl+'/cepLeave',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...cepLeave
            }
        }).then((response)=>{
            notification.success({
                message: "CEP leave Submitted Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            // alert('CEP leave submitted')
            resetFormData()
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const addSubject = (subject) => {
    return()=>{
        axios({
            method:'post',
            url:apiurl+"/cepsubject",
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                subject
            }
        }).then((response)=>{
            // alert(JSON.stringify(response))
        }).catch((error)=>{
            alert(error)
        })
    }
}

export const onDuty = (ApiData,resetFormData) =>{
    return()=>{
        axios({
            method:'post',
            url:apiurl+'/ondutyform',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...ApiData
            }
        }).then((response)=>{
            notification.success({
                message: "OnDuty Form Submitted Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            // alert("OnDuty Form Submitted")
            resetFormData()
        }).catch((error)=>{
            alert(error)
        })
    }
}