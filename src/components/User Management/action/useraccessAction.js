

export const GET_USER_ACCESS = 'GET_USER_ACCESS';


export const userAccessFunc = (data) => {
    console.log(data,"dattttttttt<<<")
    return (dispatch) => {
        dispatch({
            type: GET_USER_ACCESS,
            payload: data
        })}
        
}