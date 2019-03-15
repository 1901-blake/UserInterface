// Temp import
import { IAssociateInput } from '../../model/Associateinput.model';
import { getFormatById } from '../../components/associate-input/temp.util';
// import { interviewClient } from '../../axios/sms-clients/interview-client';

export const AssocInputActions = {
    UPDATE_DAY_NOTIFIED: 'UPDATE_DAY_NOTIFIED',
    UPDATE_DESC_PROVIDED: 'UPDATE_DESC_PROVIDED',
    UPDATE_ACTUAL: 'UPDATE_ACTUAL',
    UPDATE_PROPOSED: 'UPDATE_PROPOSED',
    SUBMIT: 'SUBMIT' 
};
export const updateDayNotified = (event: any) => {
    return {
        type: AssocInputActions.UPDATE_DAY_NOTIFIED,
        payload: event.target.valueAsDate
    };
};

export const updateDescProvided = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_DESC_PROVIDED,
        payload: (value === 'Yes')
    };
};


export const updateActualFormat = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_ACTUAL,
        payload: getFormatById(id)
    };
};

export const updateProposedFormat = (value: string, id: number) => {
    return {
        type: AssocInputActions.UPDATE_PROPOSED,
        payload: getFormatById(id)
    };
};

export const submit = (fields: IAssociateInput) => async (dispatch) => {
    // const res = await interviewClient.submitAssocInput(fields);
    // if(res.status === 200) {
    //     console.log('Assoc Input Submission: SUCCESS!');
    //     dispatch({
    //         type: AssocInputActions.SUBMIT,
    //         payload: fields
    //     });
    // } else {
    //     console.log('Assoc Input Submission: FAILED!');
    // }
    console.log(fields);
};
