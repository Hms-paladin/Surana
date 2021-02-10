import axios from 'axios';
import { apiurl } from '../../../../../App';

export const GET_APPNO = 'GET_APPNO';
export const GET_FOREIGN_APPNO = 'GET_FOREIGN_APPNO';




export const getApplicationNum = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/viewappNo',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_APPNO,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getForeignAppNum = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/viewintlappNo',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_FOREIGN_APPNO,
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