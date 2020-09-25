import React from 'react'
import * as tokenService from './tokenService'
const BASE_URL = '/api/auth/'

export function getUser(userId) {
    if (userId) {
        return fetch(`${BASE_URL}/updateTokenUser/${userId}`, {
            method: 'POST'
        },
        {mode: 'cors'})
        .then(res => res.json())
        .then(({ token }) => {
            tokenService.removeToken()
            tokenService.setToken(token)
        })
        .then(response => tokenService.userFromToken())
    }
    return tokenService.userFromToken()
}

export function signup(userData) {
    return fetch(BASE_URL + 'signup', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(userData)
    })
    .then(res => res.json())
    .then(({ token }) => tokenService.setToken(token))
}

export function login(info) {
    return fetch(BASE_URL + 'login', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(info)
    })
    .then(res => {
        if (res.ok) return res.json()
        throw new Error('bad creds')
    })
    .then(({ token }) => tokenService.setToken(token))
}


export function sendUserGUser(gId, userId, cb) {
    const fetchObject = { gId, userId }
    fetch('/apis/updateUser', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(fetchObject)
    })
    .then(resp => resp.json())
    .then(({ comboUser }) => {
        console.log(`in the fe ffetch and info ${comboUser.name, comboUser.gId}`)
        cb(null, comboUser)
        return comboUser
    })
}

export function logout() {
    tokenService.removeToken()
}

