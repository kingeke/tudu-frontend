import Axios from "axios";
import { showNotification } from "../../components/includes/Notifications";
import { apiLinks } from "../../routes/ApiLinks";
import { UserAuth } from "../../services/AuthService";
import { SET_TODOS, TODOS_DEFAULT, SET_TODO, TODO_DEFAULT } from "../reducers/types";

export const todosDefault = () => {
    return {
        type: TODOS_DEFAULT
    }
}

export const getTodos = (filters = null) => {
    return (dispatch) => {
        return Axios.get(apiLinks.todos, {
            params: {
                ...filters
            },
            headers: UserAuth.getHeaders().headers
        }).then(
            response => {

                let data = response.data

                if (data.status === 'success') {
                    return dispatch({
                        type: SET_TODOS,
                        todos: data.todos,
                    })

                }
                else {
                    return dispatch({
                        type: TODOS_DEFAULT
                    })
                }
            }
        ).catch(
            error => {
                let message = (error.response && error.response.data && error.response.data.message) || error.message

                showNotification(message, 'danger');

                return dispatch({
                    type: TODOS_DEFAULT
                })
            }
        )
    }
}

export const getTodo = (todo = false, id = false) => {
    return (dispatch) => {
        if (todo) {
            return dispatch({
                type: SET_TODO,
                todo
            })
        }
        else {
            return Axios.get(`${apiLinks.todos}/${id}`, UserAuth.getHeaders()).then(
                response => {
                    let data = response.data

                    if (data.status === 'success') {
                        return dispatch({
                            type: SET_TODO,
                            todo: data.todo,
                        })

                    }
                    else {
                        return dispatch({
                            type: TODOS_DEFAULT
                        })
                    }
                }
            ).catch(
                error => {
                    let message = (error.response && error.response.data && error.response.data.message) || error.message

                    showNotification(message, 'danger');

                    return dispatch({
                        type: TODO_DEFAULT
                    })
                }
            )
        }
    }
}