import { SET_TODOS, TODOS_DEFAULT, TODO_DEFAULT, SET_TODO } from "./types"

const initialState = {
    loaded: false,
    todos: false,
    todo: false
}

const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case TODOS_DEFAULT:
            return todosDefault(state)
        case SET_TODOS:
            return setTodos(state, action)
        case TODO_DEFAULT:
            return todoDefault(state)
        case SET_TODO:
            return setTodo(state, action)
        default:
            return state
    }
}

const setTodos = (state, action) => {
    return {
        ...state,
        loaded: true,
        todos: action.todos
    }
}

const todosDefault = (state) => {
    return {
        ...state,
        loaded: false,
        todos: false
    }
}

const setTodo = (state, action) => {
    return {
        ...state,
        todo: action.todo
    }
}
const todoDefault = (state) => {
    return {
        ...state,
        todo: false
    }
}


export default todosReducer