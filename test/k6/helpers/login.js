import http from 'k6/http'

export function login(username, password, baseUrl) {
    const url = `${baseUrl}/login`
    const payload = JSON.stringify({ username, password})
    const params = { headers: {'Content-Type': 'application/json'} }
    const res = http.post(url, payload, params)
    const body = res.json()
    return body.token
}