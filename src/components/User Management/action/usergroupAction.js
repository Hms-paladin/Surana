import axios from 'axios';
import { apiurl } from "../../../App"

export const GET_USER_GROUP = 'GET_USER_GROUP';


export const getUserGroup = () => {
    return (dispatch) => {
        axios({
            method: 'GET',
            url: apiurl + '/getAllGroup',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        }).then((response) => {
            dispatch({
                type: GET_USER_GROUP,
                payload: response.data.data
            })
            console.log("asdfasdfashfa", response.data)
        }).catch((error) => {
            console.error(error)
        })
    }
}

export const addusergroup = (group_name,getUserGroup) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + '/insertGroupMaster',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                group_name,
                "created_by": 1,
                "group_id": 0
            }
        }).then((response) => {
            getUserGroup()
        }).catch((error) => {
        })
    }
}


export const updateusergroup = (group_name, group_id,getUserGroup) => {
    return (dispatch) => {
        axios({
            method: 'put',
            url: apiurl + '/updateGroupMaster',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                group_name,
                "created_by": 1,
                group_id
            }
        }).then((response) => {
            getUserGroup()
        }).catch((error) => {
        })
    }
}

export const deleteRow = (data,getUserGroup) => {
    return (dispatch) => {
        axios({
            method: 'DELETE',
            url: apiurl + '/deleteGroupMaster',
            Header: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "group_id": JSON.stringify(data)
            }
        }).then((response) => {
            getUserGroup()
        }).catch((error) => {
        })
    }
}