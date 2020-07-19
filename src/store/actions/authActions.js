import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { AUTH_DEFAULT, FORM_DEFAULT, FORM_ERROR, SET_USER, TODOS_DEFAULT } from "../reducers/types";

export const setUser = (user) => {
    return {
        type: SET_USER,
        user
    }
}

export const authDefault = () => {
    return {
        type: AUTH_DEFAULT
    }
}

export const registerAction = (data) => {
    return (dispatch) => {
        return Axios.post(apiLinks.register, data).then(
            response => {
                let data = response.data

                if (data.status === 'success') {

                    const user = {
                        token: data.token
                    }

                    return UserAuth.authenticate(user).then(() => {
                        return dispatch({
                            type: SET_USER,
                            user: data.user
                        })
                    })

                }
                else {

                    showNotification(data.message, 'danger')

                    dispatch({
                        type: FORM_ERROR,
                        message: data.message
                    })
                }

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        ).catch(
            error => {

                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger')

                dispatch({
                    type: FORM_ERROR,
                    message: message
                })

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        )
    }
}

export const loginAction = (data) => {
    return (dispatch) => {
        return Axios.post(apiLinks.login, data).then(
            response => {
                let data = response.data

                if (data.status === 'success') {

                    const user = {
                        token: data.token
                    }

                    UserAuth.authenticate(user).then(() => {
                        return dispatch({
                            type: SET_USER,
                            user: data.user
                        })
                    })

                }
                else {

                    showNotification(data.message, 'danger')

                    dispatch({
                        type: FORM_ERROR,
                        message: data.message
                    })
                }

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        ).catch(
            error => {

                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger')

                dispatch({
                    type: FORM_ERROR,
                    message: message
                })

                return dispatch({
                    type: FORM_DEFAULT
                })
            }
        )
    }
}

export const logOutAction = () => {
    return (dispatch) => {

        var headers = UserAuth.getHeaders()

        return UserAuth.signOut().then(() => {

            dispatch({
                type: SET_USER,
                user: false
            })

            dispatch({
                type: TODOS_DEFAULT
            })

            return Axios.post(apiLinks.logOut, null, headers).then(
                response => {
                    let data = response.data

                    return showNotification(data.message, 'success')
                }
            ).catch(
                error => null
            )
        })
    }
}
