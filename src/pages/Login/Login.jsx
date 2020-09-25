import React, { useState, useEffect, useReducer } from "react";
import * as authService from '../../service/authService'
import { Form, Button } from 'semantic-ui-react'

const initialState = {
    email: '',
    password: '',
}

function reducer(state, action) {
    return {...state, [action.name]: action.value}
}

export default function Login(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    async function handleLogin(e) {
        e.preventDefault()
        try {
            await authService.login(state)
            props.handleSignupLogin()
            props.history.push('/addPhotos')
        } catch (err) {console.log(err)}
    }
    return (
        <Form onSubmit={handleLogin}>
            <Form.Field>
                <input type="text" name="email" onChange={e => dispatch(e.target)} value={state.email} placeholder="E-Mail" className={(props.design===1?'a':'e')} />
            </Form.Field>
            <Form.Field>
                <input type="text" name="password" onChange={e => dispatch(e.target)} value={state.password} placeholder="Password" className={(props.design===1?'a':'e')} />
            </Form.Field>
          <Button disabled={(state.email!==''&&state.password!=='')?false:true} type="submit">LOGIN</Button>
        </Form>
    )
}
