import { userClient } from "../../axios/sms-clients/user-client";
import { IUser } from "../../model/user.model";
import { toast } from "react-toastify";

export const currentSMSUserTypes = {
    GET_USER_INFO: 'GET_USER_INFO',
    UPDATE_USER_INFO: 'UPDATE_USER_INFO'
}

export const getUserByEmail = (email: string) => async (dispatch) => {
    const resp = await userClient.findOneByEmail(email);
    dispatch ({
        payload: {
            user: resp.data
        },
        type: currentSMSUserTypes.GET_USER_INFO
    })
}

export const updateUser = (currentSMSUser: IUser) => async (dispatch) => {
    try {
     const resp = await userClient.updateSMSUserInfo(currentSMSUser);
     toast.success('Info updated successfully');
     dispatch ({
         payload: {
             updatedUser: resp.data
         },
         type: currentSMSUserTypes.UPDATE_USER_INFO
     })
    } catch (error) {
        toast.error('Failed to update');
    }
}