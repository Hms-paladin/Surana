import axios from 'axios';
import { apiurl } from '../../../App';

export const GET_PROJECT_CASE = 'GET_PROJECT_CASE';
export const GET_EMPLOYEE_NAME = 'GET_EMPLOYEE_NAME';
export const PUT_TASK_DATA='PUT_TASK_DATA';
// export const GET_COUNTRY='GET_COUNTRY';
// export const GET_ALLOTMENT='GET_ALLOTMENT';
// export const GET_STAGES='GET_STAGES';
// export const GET_SUB_STAGES='GET_SUB_STAGES';





export const getProjectCase = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/listofprojects',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_PROJECT_CASE,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}




export const getEmployee = () => {
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
                type:GET_EMPLOYEE_NAME,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}
export const EditTaskData  = () =>{
    return(dispatch)=>{
         axios({
            method:'PUT',
            url:apiurl+'/updateassignment',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:PUT_TASK_DATA,
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