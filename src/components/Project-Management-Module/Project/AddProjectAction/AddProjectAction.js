import axios from 'axios';
import { apiurl } from '../../../../App';

export const GET_PROJECT_TYPE = 'GET_PROJECT_TYPE';
export const GET_PROJECT_NAME = 'GET_PROJECT_NAME';
export const GET_HOD='GET_HOD';
export const GET_CLIENT='GET_CLIENT';
export const GET_BILLING='GET_BILLING';
export const GET_CLIENT_NAME = "GET_CLIENT_NAME";
// export const GET_COUNTRY='GET_COUNTRY';
// export const GET_ALLOTMENT='GET_ALLOTMENT';
// export const GET_STAGES='GET_STAGES';
// export const GET_SUB_STAGES='GET_SUB_STAGES';



export const getClientName = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/listofclients',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_CLIENT_NAME,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

export const getProjectType = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/projectType',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_PROJECT_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getProjectName = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/projectname',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_PROJECT_NAME,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export const getProjectHod = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listofemployees',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_HOD,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getProjectClient = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/getcase',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_CLIENT,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

    
export const getProjectBilling = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/billingtype',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_BILLING,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

//     export const getAllotment = () =>{
//         return(dispatch)=>{
//             axios({
//                 method:'get',
//                 url:apiurl+'/allotment',
//                 Header:{
//                     Accept:'application/json',
//                     'Content-Type':'application/json',
//                 }
//             }).then((response)=>{
                
//                 dispatch({
//                     type:GET_ALLOTMENT,
//                     payload:response.data
//                 })
//             }).catch((error)=>{
//             })
//         }
//         }

//         export const getStages = () =>{
//             return(dispatch)=>{
//                 axios({
//                     method:'get',
//                     url:apiurl+'/stageslist',
//                     Header:{
//                         Accept:'application/json',
//                         'Content-Type':'application/json',
//                     }
//                 }).then((response)=>{
                    
//                     dispatch({
//                         type:GET_STAGES,
//                         payload:response.data
//                     })
//                 }).catch((error)=>{
//                 })
//             }
//             }

//             export const getSubstages = () =>{
//                 return(dispatch)=>{
//                     axios({
//                         method:'get',
//                         url:apiurl+'/substageslist',
//                         Header:{
//                             Accept:'application/json',
//                             'Content-Type':'application/json',
//                         }
//                     }).then((response)=>{
                        
//                         dispatch({
//                             type:GET_SUB_STAGES,
//                             payload:response.data
//                         })
//                     }).catch((error)=>{
//                     })
//                 }
//                 }
    

// export const getTemplateData = () => {
//     return(dispatch)=>{
//         axios({
//             method:'POST',
//             url:apiurl+'/getgenerateticket',
//             headers:{
//                 Accept:'application/json',
//                 'Content-Type':'application/json'
//             },
//             data:{
//                 generateTicketId:templateId  
//             }
//         }).then((response)=>{
//             console.log(response,"okk")
//             dispatch({
//                 type:GET_TEMPLATE_DATA,
//                 payload:response.data.data
//             })
//         })
//     }
// }