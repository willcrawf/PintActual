export function setToken(token) {
    token ? 
    localStorage.setItem('token', token)
    :
    localStorage.removeItem('token', token);
}

export function userFromToken() {
    const token = getToken()
    return token ? JSON.parse(atob(token.split('.')[1])).user : null
}

export function getToken() {
    let token = localStorage.getItem('token')
    if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]))
        if (payload.exp < Date.now() / 1000) {
            localStorage.removeItem('token')
            token = null
        }
    }
    return token; 
}

export function removeToken() {
    localStorage.removeItem('token')
}
