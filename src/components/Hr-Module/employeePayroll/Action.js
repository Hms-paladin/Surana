import React from 'react';
import Axios from 'axios';
import { apiurl } from '../../../App';
import {notification} from 'antd';

export const employeeAddAllowance = (allowance) => {
    return () => {
        Axios({
            method:'POST',
            url: apiurl+'/addallowance',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data:{
                allowance
            }
        }).then((response) => {
            alert(JSON.stringify(response))
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }
}

export const employeeAddDeduction = (deduction) => {
    return () => {
        Axios({
            method:'POST',
            url: apiurl+'/adddeduction',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data:{
                deduction
            }
        }).then((response) => {
            alert(JSON.stringify(response))
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }
}

export const employeeAddPayroll = (data) => {
    return () => {
        Axios({
            method:'POST',
            url: apiurl+'/addPayroll',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data     
        }).then((response) => {
            notification.warning({
                message: `Payroll Added successfully`,
                duration: 3.5,
                placement: "topRight",
              });
        }).catch((error) => {
            alert(JSON.stringify(error))
        })
    }
}


