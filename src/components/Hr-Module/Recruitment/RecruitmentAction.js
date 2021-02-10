import axios from 'axios';
import {message} from 'antd';
import { apiurl } from '../../../App';

import { notification } from 'antd';

export const GET_LICENSES = 'GET_LICENSES';

export const GET_SPECIALIZATION = 'GET_SPECIALIZATION';

export const GET_LANGUAGES = 'GET_LANGUAGES';

export const GET_CERTIFICATION = 'GET_CERTIFICATION';

export const GET_QUALIFICATION = 'GET_QUALIFICATION';

export const GET_TEMPLATE_NAME = 'GET_TEMPLATE_NAME';

export const GET_TEMPLATE_DATA = 'GET_TEMPLATE_DATA';

export const getLicenses = () => {
    return (dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listoflicences',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_LICENSES,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export const getSpecialization = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listofspecialization',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_SPECIALIZATION,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getCertification = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listofcertifications',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_CERTIFICATION,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getLanguages = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listoflanguages',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_LANGUAGES,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export const getQualification = () => {
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
                type:GET_QUALIFICATION,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getTemplateName = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url: apiurl+'/templatename',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_TEMPLATE_NAME,
                payload:response.data.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}



export const generateTicket = (data) => { // ticket generation with template id
    return(dispatch)=>{
        axios({
            method:'POST',
            url:apiurl+'/SaveTemplate',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...data
            }
        }).then((response)=>{
            // alert(JSON.stringify(response))
            notification.success({
                message: "Template Created Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
              dispatch(getTemplateName())

        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const generateTicketWithoutId = (data) => { // ticket generation without template id
    return(dispatch)=>{
        axios({
            method:'POST',
            url:apiurl+'/Ticketgenerate',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...data
            }   
        }).then((response)=>{
            // message.success('Ticket Generated Successfully')
            notification.success({
                message: "Template Created Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            dispatch(getTemplateName())
        }).catch((error)=>{
            console.log(error)
        })
    }
}



export const createTemplate = (data) => {  //SaveTemplate
    return(dispatch)=>{
        axios({
            method:'POST',
            url:apiurl+'/saveTicket',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...data
            }
        }).then((response)=>{
            console.log(response)
            // message.success(response.data.msg)
            notification.success({
                message: "Ticket Generated Successfully",
                onClick: () => {
                  console.log("Notification Clicked!");
                },
              });
            dispatch(getTemplateName())
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getTemplateData = (templateId) => {
    return(dispatch)=>{
        axios({
            method:'POST',
            url:apiurl+'/generateTicketList',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                generateTicketId:templateId  
            }
        }).then((response)=>{
            console.log(response,"okk")
            dispatch({
                type:GET_TEMPLATE_DATA,
                payload:response.data.data
            })
        })
    }
}