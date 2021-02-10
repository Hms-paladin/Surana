import axios from 'axios';
import { apiurl } from '../../../../App';

export const GET_PREVIOUS = 'GET_PREVIOUS';





export const getPreviousLink = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/linktoprevious',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_PREVIOUS,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

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