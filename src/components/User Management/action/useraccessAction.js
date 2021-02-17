import axios from 'axios';
import { apiurl } from "../../../App"

export const GET_USER_ACCESS = 'GET_USER_ACCESS';


export const userAccessFunc = (userid) => {
    console.log(userid,"callaction")
    return (dispatch) => {
        axios({
            method: 'POST',
            url: apiurl + '/getUserPermission',
            data: {
                "user_id": userid
              },
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            dispatch({
                type: GET_USER_ACCESS,
                payload: response.data.data
            })
            console.log("asdfasdfashfa", response.data)
        }).catch((error) => {
            console.error(error)
        })
    }        
}