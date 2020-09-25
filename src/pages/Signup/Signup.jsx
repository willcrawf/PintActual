import React, { useState, useEffect, useReducer } from "react";
import * as authService from '../../service/authService'
import { Form, Button } from 'semantic-ui-react'

const initialState = {
    name: '',
    email: '',
    password: '',
    passwordConf: '',
}

function reducer(state, action) {
    return {...state, [action.name]: action.value}
}

export default function Signup(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    
    async function handleSignup(e) {
        e.preventDefault()
        try {
            await authService.signup(state)
            props.handleSignupLogin()
            props.history.push('/addPhotos')
        } catch (err) {console.log(err)}
    }

    return (
        <Form onSubmit={handleSignup}>
            <Form.Field>
                <input type="text" name="name" onChange={e => dispatch(e.target)} value={state.name} placeholder="Name" className={(props.design===1?'a':'e')} />
            </Form.Field>
            <Form.Field>
                <input type="text" name="email" onChange={e => dispatch(e.target)} value={state.email} placeholder="E-Mail" className={(props.design===1?'a':'e')} />
            </Form.Field>
            <Form.Field>
                <input type="text" name="password" onChange={e => dispatch(e.target)} value={state.password} placeholder="Password" className={(props.design===1?'a':'e')} />
            </Form.Field>
            <Form.Field>
                <input type="text" name="passwordConf" onChange={e => dispatch(e.target)} value={state.passwordConf} placeholder="Confirm Password" className={(props.design===1?'a':'e')} />
            </Form.Field>
          <Button disabled={(state.email!==''&&state.password!==''&&state.passwordConf===state.password)?false:true} type="submit">SIGN UP</Button>
        </Form>
    )
}
