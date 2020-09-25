import React, { Component } from 'react'
import * as authService from '../../service/authService'
import FavoriteDates from '../../Components/FavoriteDates/FavoriteDates'
import YouTubePlayer from '../../Components/YouTubePlayer/YouTubePlayer'
import AddFavoriteDate from '../../Components/AddFavoriteDate/AddFavoriteDate'
import DividerEl from '../../Components/Divider'
function ProfilePage({ user, photosDisplay, setPhotosDisplay, startDate, setStartDate, endDate, setEndDate}) {
        
        return ( 
            <>
            {user ? 
            <>
            <h1>{user.name}'s Profile</h1>
            <FavoriteDates user={user} photosDisplay={photosDisplay} setPhotosDisplay={setPhotosDisplay} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}/>
            < DividerEl />
            {photosDisplay.length ?
            <>
            {photosDisplay.map((photo, i) => <img src={photo.urlTo} alt="" />)} 
            </>
            :
            <>
            </>
                }
                </>
                :
                <h3>no user</h3>
                }
            <YouTubePlayer />
            </>

         );
    }
 
export default ProfilePage;
