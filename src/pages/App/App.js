import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch, useParams } from 'react-router-dom'
import NavBar from '../../Components/NavBar/NavBar';
import Signup from '../Signup/Signup'
import Login from '../Login/Login'
import ProfilePage from '../ProfilePage/ProfilePage'
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import AddPhotos from '../AddPhotos/AddPhotos'
import './App.css';
import * as authService from '../../service/authService'
import Shared from '../Shared/Shared';
import _ from 'lodash'


export default function App(props) {
  const [user, setUser] = useState(authService.getUser())
  const [photosDisplay, setPhotosDisplay] = useState([] && user && user.photos)
  const [startDate, setStartDate] = useState('1980-08-08')
  const [endDate, setEndDate] = useState(new Date().toLocaleDateString().split('/').reverse().join('-'))
  const [design,setD]=useState(1)

  // useEffect(() => {
  //   setUser(authService.getUser(user._id))
  // }, [props.history])

  function handleSignupLogin() {
    setUser(authService.getUser())
  }
  function handleLogout() {
    authService.logout()
    setUser(null)
  }
  return (
    <>
    
    <NavBar user={user} design={design} handleLogout={handleLogout} />
    <Button className={(design===1)?'light':'dark'} onClick={()=>{(design===1)?setD(2):setD(1)}} >{(design===1)?'Dark Mode':'Light Mode'}</Button><br/><span className={(design===1)?'a':'e'}></span>
      <Route exact path='/addPhotos'
        render={() => 
          <AddPhotos user={user} setUser={setUser} design={design} photosDisplay={photosDisplay} setPhotosDisplay={setPhotosDisplay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
        } 
      />
      <Route exact path="/shared"
        render={() => 
        <Shared design={design} />
      } />
      <Route 
        exact path="/signup"
        render={() => 
          <Signup history={props.history} design={design} handleSignupLogin={handleSignupLogin}/>
        }/>
        <Route 
        exact path="/login"
        render={() => 
          <Login history={props.history} design={design} handleSignupLogin={handleSignupLogin}/>
        }/>
        <Switch>
          {user &&
          <Route path="/google/:gId" children={<CombineUser userId={user._id} setUser={setUser}/>}></Route>
          }
        </Switch>
        <Route 
        exact path="/profile"
        render={() => 
          <ProfilePage design={design}
          user={user} photosDisplay={photosDisplay} setPhotosDisplay={setPhotosDisplay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
        }/>
    </>
  );
}

function CombineUser({ userId, setUser }) {
  let { gId } = useParams()
  _.once(() => combineUser(gId, userId, setUser))
  return <Redirect exact to="/addPhotos" />
}

async function combineUser(gId, userId, setUser) {
  await authService.sendUserGUser(gId, userId, (err, user) => {})
  const updatedUser = await authService.getUser(userId)
  setUser(updatedUser)
}