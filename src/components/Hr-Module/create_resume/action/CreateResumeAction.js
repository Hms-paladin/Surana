import { apiurl } from '../../../../App';
import { buttonDisableAction } from '../../../../fixers/fixersAction';

const axios = require('axios');

export const GET_RESUMEDETAILS = 'GET_RESUMEDETAILS';

export const GET_SKILLS = 'GET_SKILLS';

export const GET_TAGLIST = 'GET_TAGLIST';

export const GET_CANDIDATETYPE = 'GET_CANDIDATETYPE';

export const TABDETAILS_RESUME = 'TABDETAILS_RESUME';

export const CLEARSTORE = 'CLEARSTORE';

export const ADDSKILLS = 'ADDSKILLS';

export const RESUME_ID = 'RESUME_ID';

export const EDUCATION_ID = 'EDUCATION_ID';

export const LICENSE_ID = 'LICENSE_ID';

export const EXPERIENCE_ID = 'EXPERIENCE_ID';

export const EDUCATION_TABDETAILS = 'EDUCATION_TABDETAILS';

export const EXPERIENCE_TABDETAILS = 'EXPERIENCE_TABDETAILS';

export const LICENSE_TABDETAILS = 'LICENSE_TABDETAILS';

export const SKILLS_TABDETAILS = 'SKILLS_TABDETAILS';

export const GET_DESIGNATIONS = 'GET_DESIGNATIONS';

const key = 'updatable';

export const clearStore = () => {
    return ({
        type: CLEARSTORE,
        data: null
    })
}

export const resumeTab = (resumeTab) => {
    return ({
        type: 'TABDETAILS_RESUME',
        resumeTab
    })
}

export const educationTab = (educationData) => {
    return ({
        type: 'EDUCATION_TABDETAILS',
        educationData
    })
}

export const licenseTab = (licenseData) => {
    return ({
        type: 'LICENSE_TABDETAILS',
        licenseData
    })
}

export const experienceTab = (experienceData) => {
    return ({
        type: 'EXPERIENCE_TABDETAILS',
        experienceData
    })
}


export const skillsTab = (skillsData) => {
    return ({
        type: 'SKILLS_TABDETAILS',
        skillsData
    })
}

export const resumeIdTable = (id) => {
    var data=[
        {
            'data':id
        }
    ]
        
    return({
        type: 'RESUME_ID',
        payload: data[0]
    })
}



// Summary
export const getResumeDetails = (resumeId, propsFunc) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + '/resumedetails',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                resId: resumeId
                // resumeId
            }
        }).then((response) => {
            dispatch({
                type: GET_RESUMEDETAILS,
                payload: response.data
            })
            if (propsFunc) {
                propsFunc(0)
            }
        }).catch((error) => {
            console.log(error)
        })
    }
}



// Add Profile 
export const addProfile = (formData, propsFunc) => {
    console.log(...formData, "formDataValue")
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + "/createResume",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then((response) => {
            console.log(response, "MyResponse")
            dispatch({
                type: RESUME_ID,
                payload: response.data
            })
            dispatch(getResumeDetails(response.data.data))
            propsFunc(1)
            dispatch(buttonDisableAction(false))
        }).catch((error) => {
            console.log(error, "MyError")
        })
    }
}

// Edit Profile
export const updateProfile = (formData, propsFunc, tabNum) => {
    console.log(...formData, "formDataValue")
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: apiurl + "/updateresume",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        }).then((response) => {
            // alert(JSON.stringify(response))
            propsFunc(1)
            dispatch(buttonDisableAction(false))
        }).catch((error) => {
            console.log(error, "MyError")
        })
    }
}

// Education
export const addEducationDetails = (education, tabNum, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + "/addeducation",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                education
            }
        }).then(function (response) {
            console.log(JSON.stringify(response.data), 'checking');
            dispatch({
                type: EDUCATION_ID,
                payload: response.data.data
            })
            dispatch(getResumeDetails(resId))
            propFunc(tabNum)
            dispatch(buttonDisableAction(false))
        }).catch(function (error) {
            console.log(error)
        })
    }
};

// update Education
export const updateEducationDetails = (education, tabNum, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: apiurl + "/updateEducation",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                education
            }
        }).then(function (response) {
            if (resId) {
                dispatch(getResumeDetails(resId))
            }
            propFunc(tabNum ? tabNum : 5)
            dispatch(buttonDisableAction(false))
            console.log(JSON.stringify(response));
        }).catch(function (error) {
            console.log(error)
        })
    }
};


// Experience
export const addExperienceDetails = (experience, num, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + '/addExperience',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                experience
            }
        }).then((response) => {
            console.log(JSON.stringify(response));
            dispatch({
                type: EXPERIENCE_ID,
                payload: response.data.data
            })
            propFunc(num)
            dispatch(getResumeDetails(resId))
            dispatch(buttonDisableAction(false))
        }).catch((error) => {
            console.log(error)
        })
    }
}

// Experience
export const updateExperienceDetails = (experience, num, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: apiurl + '/updateExperience',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                experience
            }
        }).then((response) => {
            console.log(JSON.stringify(response));
            setTimeout(() => {
                propFunc(num);
                dispatch(getResumeDetails(resId))
            }, 100);
            dispatch(buttonDisableAction(false))
        }).catch((error) => {
            console.log(error)
        })
    }
}

// Skills
export const getSkills = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: apiurl + '/listofskills',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            dispatch({
                type: GET_SKILLS,
                payload: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}

// Add Skills
export const addSkills = (skill, resumeId, propFunc) => {
    return (dispatch) => {
        axios({
            method: "POST",
            url: apiurl + '/addskills',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "resId": resumeId,
                "skill": skill,
            }
        }).then((response) => {
            dispatch(getResumeDetails(resumeId))
            propFunc(4)
            dispatch(buttonDisableAction(false))
        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }
}

//add License 
export const addlicenseDetails = (license, tabNum, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + "/addlicense",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                "license":license
            },
        }).then(function (response) {
            console.log(JSON.stringify(response.data), 'checking');
            dispatch({
                type: LICENSE_ID,
                payload: response.data.data
            })
            dispatch(getResumeDetails(resId))
            propFunc(tabNum)
            dispatch(buttonDisableAction(false))
        }).catch(function (error) {
            console.log(error)
        })
    }
};

// update License
export const updateLicenseDetails = (license, tabNum, propFunc, resId) => {
    return (dispatch) => {
        axios({
            method: 'PUT',
            url: apiurl + "/updatelicense",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            data: {
                "license":license
            },
        }).then(function (response) {
            if (resId) {
                dispatch(getResumeDetails(resId))
            }
            propFunc(5)
            dispatch(buttonDisableAction(false))
            console.log(JSON.stringify(response));
        }).catch(function (error) {
            console.log(error)
        })
    }
};

// Delete License
export const deleteLicenseApi = (id) => {
    return () => {
        axios({
            method: "DELETE",
            url: apiurl + '/deletelicense',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "LicId": id,
            }
        }).then((response) => {
        }).catch((error) => {
        })
    }
}


// update Skills
export const updateSkills = (skill, resumeId, deletedSkillId, propFunc) => {
    return (dispatch) => {
        axios({
            method: "PUT",
            url: apiurl + '/updateskills',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                "resId": resumeId,
                "deletedskills": deletedSkillId,
                "Insertedskills": skill,
            }
        }).then((response) => {
            dispatch(getResumeDetails(resumeId))
            propFunc(4)
            dispatch(buttonDisableAction(false))

        }).catch((error) => {
            // alert(JSON.stringify(error))
        })
    }
}

export const getCandidateType = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: apiurl + '/candidateType',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            dispatch({
                type: GET_CANDIDATETYPE,
                payload: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const getTaglist = (data) => {
    // alert(data)
    return (dispatch) => {
        axios({
            method: 'post',
            url: apiurl + '/taglist',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            data: {
                CLId: data
            }
        }).then((response) => {
            console.log(JSON.stringify(response))
            dispatch({
                type: GET_TAGLIST,
                payload: response.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}

export const getDesignations = () => {
    return (dispatch) => {
        axios({
            method: 'get',
            url: apiurl + '/listofdesignations',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            console.log("sdlfkdslfjsdklf", response.data.data)
            dispatch({
                type: GET_DESIGNATIONS,
                payload: response.data.data
            })
        }).catch((error) => {
            console.log(error)
        })
    }
}