import Axios from "axios";
import { apiurl } from "../../../App";

export const INDUCTION_CHECKLIST = 'INDUCTION_CHECKLIST';

export const getInductionCheckList = () => {
    return (dispatch) => {
        Axios({
            method: 'GET',
            url: apiurl + '/checkListItems',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            dispatch({
                type: INDUCTION_CHECKLIST,
                payload: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}


export const addCandidateInduction = (data) => {
    return () => {
        Axios({
            url: apiurl+'/masinduction',
            method: 'POST',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                ...data
            }
        }).then((response) => {
        // alert(JSON.stringify(response))
        }).catch((error) => {
            console.log(error)
        })
    }
}