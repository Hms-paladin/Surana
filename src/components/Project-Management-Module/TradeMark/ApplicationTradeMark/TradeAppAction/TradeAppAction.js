import axios from 'axios';
import { apiurl } from '../../../../../App';

export const GET_STATUS = 'GET_STATUS';
export const GET_ASSOCIATE = 'GET_ASSOCIATE';
export const GET_CLASS='GET_CLASS';
export const GET_OUR_REFERENCE='GET_OUR_REFERENCE';
export const GET_COUNTRY='GET_COUNTRY';
export const GET_ALLOTMENT='GET_ALLOTMENT';
export const GET_STAGES='GET_STAGES';
export const GET_SUB_STAGES='GET_SUB_STAGES';
export const GET_USERDATE = 'GET_USERDATE';
export const GET_CLIENT_NAME='GET_CLIENT_NAME';
export const GET_TYPE_WORK="GET_TYPE_WORK";
export const GET_PROJECT_NAME = "GET_PROJECT_NAME"




export const getStatus = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/statuslist',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_STATUS,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getAssociate = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/assosciate',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_ASSOCIATE,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}


export const getClass = () => {
    return(dispatch)=>{
        axios({
            method:'GET',
            url:apiurl+'/classlist',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        }).then((response)=>{
            dispatch({
                type:GET_CLASS,
                payload:response.data
            })
        }).catch((error)=>{
            console.log(error)
        })
    }
}

export const getOurReference = () =>{
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
                type:GET_OUR_REFERENCE,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

    
export const getCountry = () =>{
    return(dispatch)=>{
        axios({
            method:'get',
            url:apiurl+'/countrylist',
            Header:{
                Accept:'application/json',
                'Content-Type':'application/json',
            }
        }).then((response)=>{
            
            dispatch({
                type:GET_COUNTRY,
                payload:response.data
            })
        }).catch((error)=>{
        })
    }
    }

    export const getAllotment = () =>{
        return(dispatch)=>{
            axios({
                method:'get',
                url:apiurl+'/allotment',
                Header:{
                    Accept:'application/json',
                    'Content-Type':'application/json',
                }
            }).then((response)=>{
                
                dispatch({
                    type:GET_ALLOTMENT,
                    payload:response.data
                })
            }).catch((error)=>{
            })
        }
        }

        export const getStages = () =>{
            return(dispatch)=>{
                axios({
                    method:'get',
                    url:apiurl+'/stageslist',
                    Header:{
                        Accept:'application/json',
                        'Content-Type':'application/json',
                    }
                }).then((response)=>{
                    
                    dispatch({
                        type:GET_STAGES,
                        payload:response.data
                    })
                }).catch((error)=>{
                })
            }
            }

            export const getSubstages = () =>{
                return(dispatch)=>{
                    axios({
                        method:'get',
                        url:apiurl+'/substageslist',
                        Header:{
                            Accept:'application/json',
                            'Content-Type':'application/json',
                        }
                    }).then((response)=>{
                        
                        dispatch({
                            type:GET_SUB_STAGES,
                            payload:response.data
                        })
                    }).catch((error)=>{
                    })
                }
                }
                export const getUserDate = () =>{
                    return(dispatch)=>{
                        axios({
                            method:'get',
                            url:apiurl+'/userdate',
                            Header:{
                                Accept:'application/json',
                                'Content-Type':'application/json',
                            }
                        }).then((response)=>{
                            
                            dispatch({
                                type:GET_USERDATE,
                                payload:response.data
                            })
                        }).catch((error)=>{
                        })
                    }
                    }
                    export const getClientName = () =>{
                        return(dispatch)=>{
                            axios({
                                method:'get',
                                url:apiurl+'/listofclients',
                                Header:{
                                    Accept:'application/json',
                                    'Content-Type':'application/json',
                                }
                            }).then((response)=>{
                                
                                dispatch({
                                    type:GET_CLIENT_NAME,
                                    payload:response.data
                                })
                            }).catch((error)=>{
                            })
                        }
                        }

                        export const getTypeWork = () =>{
                            return(dispatch)=>{
                                axios({
                                    method:'get',
                                    url:apiurl+'/typeofwork',
                                    Header:{
                                        Accept:'application/json',
                                        'Content-Type':'application/json',
                                    }
                                }).then((response)=>{
                                    
                                    dispatch({
                                        type:GET_TYPE_WORK,
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