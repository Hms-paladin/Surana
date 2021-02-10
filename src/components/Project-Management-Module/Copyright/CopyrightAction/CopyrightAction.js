import axios from 'axios';
import { apiurl } from '../../../../App';

export const GET_STAGES_LIST = 'GET_STAGES_LIST';
export const GET_SUBSTAGES_LIST = 'GET_SUBSTAGES_LIST';
export const GET_PROJECT_LIST = 'GET_PROJECT_LIST';




export const getProjectList = () => {
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
                type:GET_PROJECT_LIST,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export const getStagesList = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/stageslist',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_STAGES_LIST,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getSubstagesList = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/substageslist',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_SUBSTAGES_LIST,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}
