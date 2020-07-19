import { combineReducers } from 'redux'
import authReducer from './authReducer'
import formReducer from './formReducer'
import todosReducer from './todosReducer'

const rootReducer = combineReducers({
    app: combineReducers({
        form: formReducer,
    }),
    users: combineReducers({
        auth: authReducer,
        todos: todosReducer
    }),
})

export default rootReducer