export const ADDTM = 'ADDTM';
export const RESET = 'RESET';

export const tempAction = dataval => ({
    type:ADDTM,
    payload:dataval
});


export const tempReset = () => ({
    type:RESET
})