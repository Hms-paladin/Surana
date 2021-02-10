import { apiurl } from '../../../../App'
import {notification} from 'antd';
const axios = require('axios');

export const GET_CASE_NAME = 'GET_CASE_NAME';
export const GET_CASE_TYPE = 'GET_CASE_TYPE';
export const GET_STATUS = 'GET_STATUS';
export const  GET_CASE_CITY ='GET_CASE_CITY';
export const GET_CASE_ADJOURNMENT="GET_CASE_ADJOURNMENT";
export const GET_CASE_BILLING="GET_CASE_BILLING";
export const GET_CASE_FILED="GET_CASE_FILED";
export const GET_CASE_SUB='GET_CASE_SUB';
export const GET_CASE_CLIENT='GET_CASE_CLIENT'
export const GET_COMPANY_CLIENT='GET_COMPANY_CLIENT'
export const GET_PROJECT_NAME = "GET_PROJECT_NAME"





export const getcaseType  = () =>{
    return(dispatch)=>{
         axios({
            method:'get',
            url:apiurl+'/casetype',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_CASE_TYPE,
                payload:response.data
            })
        }).catch((error)=>{
        })
    
    }
}


export const getstatusUpdate  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/casestatus',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            console.log(response,"sdjnfvsjkdbvkjsdb")
            dispatch({
                type:GET_STATUS,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }



export const getcaseName  = () =>{
return(dispatch)=>{
    axios({
        method:'get',
        url:apiurl+'/court',
        Header:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
    }).then((response)=>{
        
        dispatch({
            type:GET_CASE_NAME,
            payload:response.data
        })
    }).catch((error)=>{
    })
}
}
export const getcaseCity  = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/city',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_CASE_CITY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

    export const getcaseAdjournment  = () =>{
        return(dispatch)=>{
            axios({
                method:'get',
                url:apiurl+'/adjournment',
                Header:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                }
            }).then((response)=>{
                console.log(response,"sdjnfvsjkdbvkjsdb")
                dispatch({
                    type:GET_CASE_ADJOURNMENT,
                    payload:response.data
                })
            }).catch((error)=>{
            })
        }
        }
        export const getcaseBilling  = () =>{
            return(dispatch)=>{
                axios({
                    method:'get',
                    url:apiurl+'/billingtype',
                    Header:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    }
                }).then((response)=>{
                    
                    dispatch({
                        type:GET_CASE_BILLING,
                        payload:response.data
                    })
                }).catch((error)=>{
                })
            }
            }
            export const getcaseFiled = () =>{
                return(dispatch)=>{
                    axios({
                        method:'get',
                        url:apiurl+'/casefiled',
                        Header:{
                            Accept:'application/json',
                            'Content-Type':'application/json',
                        }
                    }).then((response)=>{
                        
                        dispatch({
                            type:GET_CASE_FILED,
                            payload:response.data
                        })
                    }).catch((error)=>{
                    })
                }
                }

                export const getcaseSub = () =>{
                    return(dispatch)=>{
                        axios({
                            method:'get',
                            url:apiurl+'/subcase',
                            Header:{
                                Accept:'application/json',
                                'Content-Type':'application/json',
                            }
                        }).then((response)=>{
                            
                            dispatch({
                                type:GET_CASE_SUB,
                                payload:response.data
                            })
                        }).catch((error)=>{
                        })
                    }
                    }
                    export const getcaseClient = () =>{
                        return(dispatch)=>{
                            axios({
                                method:'get',
                                url:apiurl+'/listofemployees',
                                Header:{
                                    Accept:'application/json',
                                    'Content-Type':'application/json',
                                }
                            }).then((response)=>{
                                
                                dispatch({
                                    type:GET_CASE_CLIENT,
                                    payload:response.data
                                })
                            }).catch((error)=>{
                            })
                        }
                        }
                        export const addCaseData = (data) => {
                            return (dispatch) => {
                                axios({
                                    method:'POST',
                                    url: apiurl+'/addcase',
                                    headers: {
                                        Accept: 'application/json',
                                        'Content-Type': 'application/json'
                                    },
                                    data     
                                }).then((response) => {
                                    dispatch({
                                        type:GET_COMPANY_CLIENT,
                                        payload:response.data
                                    })
                                    notification.warning({
                                        message: `Added successfully`,
                                        duration: 3.5,
                                        placement: "topRight",
                                      });
                                }).catch((error) => {
                                    alert(JSON.stringify(error))
                                })
                            }
                        }
                        
                        export const getcaseCompany = () =>{
                            return(dispatch)=>{
                                axios({
                                    method:'get',
                                    url:apiurl+'/getcase',
                                    Header:{
                                        Accept:'application/json',
                                        'Content-Type':'application/json',
                                    }
                                }).then((response)=>{
                                    
                                    dispatch({
                                        type:GET_COMPANY_CLIENT,
                                        payload:response.data
                                    })
                                }).catch((error)=>{
                                })
                            }
                            }

                            export const getProjectName = () =>{
                                return(dispatch)=>{
                                    axios({
                                        method:'get',
                                        url:apiurl+'/ProjectName',
                                        Header:{
                                            Accept:'application/json',
                                            'Content-Type':'application/json',
                                        }
                                    }).then((response)=>{
                                        
                                        dispatch({
                                            type:GET_PROJECT_NAME,
                                            payload:response.data
                                        })
                                    }).catch((error)=>{
                                    })
                                }
                            }