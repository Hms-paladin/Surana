import { apiurl } from '../../../App';
import { Modal, notification } from 'antd';


const axios = require('axios');

export const GET_QUESTION_CATEGORY = 'GET_QUESTION_CATEGORY';

export const GET_QUESTION_SUBCATEGORY = 'GET_QUESTION_SUBCATEGORY';

export const GET_QUESTION_TYPE = 'GET_QUESTION_TYPE';

export const GET_QUESTION_DETAILS = 'GET_QUESTION_DETAILS';

export const GET_QUESTIONS = 'GET_QUESTIONS'

export const CLEARSTORE = 'CLEARSTORE';

export const clearStore = () => {
    return ({
        type: CLEARSTORE,
        data: null
    })
}

export const getQuestionCategory = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/category',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            dispatch({
                type:GET_QUESTION_CATEGORY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}

// export const getQuestionSubCategory = () =>{
//     return(dispatch)=>{
//         axios({
//             method:'post',
//             url:apiurl+'/subcategory',
//             Header:{
//                 Accept:'application/json',
//                 'Content-Type':'application/json',
//             }

//         }).then((response)=>{
            
//             dispatch({
//                 type:GET_QUESTION_SUBCATEGORY,
//                 payload:response.data
//             })
//         }).catch((error)=>{
//         })
//     }
// }


export const getQuestionSubCategory = (data) => {
    return(dispatch) => {
        fetch(apiurl+'/subcategory',{
            method:'post',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({"categoryId":data})
        }).then((response) => response.json()).then((responseJson) => {
            console.log("Sadfsdfsdf",responseJson)
            dispatch({
                    type:GET_QUESTION_SUBCATEGORY,
                     payload:responseJson.data
                    })
        })
    }
}

export const getQuestionType = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/questiontype',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            dispatch({
                type:GET_QUESTION_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
}


export const getQuestionDetails = () => {
    return(dispatch) => {
        axios({
            method:'get',
            url:apiurl+'/getpostquestions',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response) => {
            dispatch({
                type:GET_QUESTION_DETAILS,
                payload:response.data
            })
        }).catch((error) => {
            //
        })
    }
}


export const getQuestions = () => {
    return(dispatch) => {
        axios({
            method:'get',
            url:apiurl+'/getaddquestions',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response) => {
            dispatch({
                type:GET_QUESTIONS,
                payload:response.data
            })
        }).catch((error) => {
            //
        })
    }
}


export const addQuestion = (question) => {
    return()=>{
        axios({
            method:'post',
            url:apiurl+'/addquestion',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                question
            }
        }).then((response)=>{
            notification.warning({
                message: `Questions added successfully`,
                duration: 3.5,
                placement: "topRight",
              });
        }).catch((error)=>{
        })
    }
}

export const postQuestion = (data) => {
 

  
    return()=>{

        fetch(apiurl+'/postquestion',{
            method:'POST',
            headers:{
                Accept:'application/json',
               'Content-Type':'application/json'
            },
            body:JSON.stringify(data)
        }).then((response) => response.json()).then((responseJson) => {
            console.log("sdflsdhfklsdfjksdfsd",responseJson)
            notification.warning({
                message: `Questions posted successfully`,
                duration: 3.5,
                placement: "topRight",
              });
        })
    }
}


export const saveAnswers = (data,cid,designationId,history) => {
    console.log("sdjfhsdfhsdjfhsdkjfhsdakjfhsdaf",data)
    return() => {
        fetch(apiurl+'/onlinetest',{
            method:'POST',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({"resId":cid,'desigId':designationId,"test":data})
        }).then((response) => response.json()).then((responseJson) => {
            notification.warning({
                message: `Answers submitted successfully`,
                duration: 3.5,
                placement: "topRight",
              });
              history.push("/Home")
        
              
        })
    }
}