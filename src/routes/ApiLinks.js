const server = window.location.origin === 'http://localhost:3000' ? 'local' : 'live'
export const endpoint = server === 'local' ? 'http://127.0.0.1:8000' : 'https://tudu-app-backend.herokuapp.com'
export const api = `${endpoint}/api`

export const apiLinks = {
    login: `${api}/auth/login`,
    logOut: `${api}/auth/logout`,
    register: `${api}/auth/register`,
    fetchProfile: `${api}/profile`,
    changePassword: `${api}/profile/change-password`,
    updateProfile: `${api}/profile/update`,
    todos: `${api}/todos`
}