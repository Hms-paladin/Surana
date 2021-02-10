import axios from 'axios';
import {apiurl} from "../../../../App";


export const GET_USER_MASTER = "GET_USER_MASTER";


export const getUserMasterDetails = () => {
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/getUser',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
        }).then((response)=>{
            dispatch({
                type:GET_USER_MASTER,
                payload:response.data.data
            })
        }).catch((error)=>{
        })
    }
}
