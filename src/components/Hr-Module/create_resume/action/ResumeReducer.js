import {
    GET_RESUMEDETAILS, GET_SKILLS, GET_TAGLIST, GET_CANDIDATETYPE, TABDETAILS_RESUME, CLEARSTORE, RESUME_ID, EDUCATION_TABDETAILS, EXPERIENCE_TABDETAILS,
    SKILLS_TABDETAILS,
    EDUCATION_ID, EXPERIENCE_ID, LICENSE_ID, GET_DESIGNATIONS, LICENSE_TABDETAILS
} from "./CreateResumeAction";

const defaultState = {
    resume: null,
    skills: null,
    taglist: null,
    resumeTab: null,
    candidateType: null,
    resumeId: null,
    educationId: [],
    experinceId: [],
    licenseId: [],
    educationData: null,
    experienceData: null,
    licenseData:null,
    skillsData: null,
    designations: null
}

export const resumeReducer = (state = defaultState, action) => {
    console.log("fsdjkfhsjdfhsdfjds", action.payload)
    switch (action.type) {
        case GET_RESUMEDETAILS:
            return { ...state, resume: action.payload.data }
        case GET_SKILLS:
            return { ...state, skills: action.payload }
        case GET_TAGLIST:
            return { ...state, taglist: action.payload.data }
        case GET_CANDIDATETYPE:
            return { ...state, candidateType: action.payload.data }
        case TABDETAILS_RESUME:
            return { ...state, resumeTab: action.resumeTab }
        case EDUCATION_TABDETAILS:
            return { ...state, educationData: action.educationData }
        case EXPERIENCE_TABDETAILS:
            return { ...state, experienceData: action.experienceData }
        case SKILLS_TABDETAILS:
            return { ...state, skillsData: action.skillsData }
        case LICENSE_TABDETAILS:
            return { ...state, licenseData: action.licenseData}
        case RESUME_ID:
            return { ...state, resumeId: action.payload.data }
        case EDUCATION_ID:
            return { ...state, educationId: action.payload }
        case EXPERIENCE_ID:
            return { ...state, experienceId: action.payload }
        case LICENSE_ID:
            return { ...state, licenseId: action.payload }
        case GET_DESIGNATIONS:
            return { ...state, designations: action.payload }
        case CLEARSTORE:
            return { ...state, resume: null, skills: null, skillsData: null, taglist: null, resumeTab: null, educationData: null, experienceData: null, resumeId: null, educationId: [], experinceId: [] }
        default:
            return state;
    }
}