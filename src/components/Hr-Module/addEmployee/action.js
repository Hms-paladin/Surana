import Axios from "axios";
import { apiurl } from "../../../App";

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';


export const addEmployee = (data) => {
    return(dispatch)=>{
        Axios({
            method:'POST',
            url:apiurl+'/createEmployee',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            },
            data:{
                ...data
            }
        }).then((response)=>{
            // alert(JSON.stringify(response))
        }).catch((response)=>{
            alert(JSON.stringify(response))
        })
    }
}