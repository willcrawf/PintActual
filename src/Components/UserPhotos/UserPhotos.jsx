import React, { useState } from 'react'
import * as photoService from '../../service/photoService'


export default function UserPhotos({ user }) {
    const [photos, setPhotos] = useState([])
    
    async function searchGPhotos() {
        const photos = await photoService.getGPhotos()
        setPhotos(photos)
    }
    async function searchExif(imgUrl) {
        console.log('in component searchExif')
        // const exifData = await photoService.getExif(imgUrl)
        // console.log(exifData)
    }
    return (
        <>
        {user && !photos.length &&
        <>
            <a href="http://localhost:3001/auth/google">Sign in to google</a>
            <button onClick={searchGPhotos}>search gPhotos</button>
        </>
            }
            {photos.length ? 
            <>
                {photos.map((photo, i) => <button key={i} onClick={() => searchExif(`${photo.baseUrl}`)}><img src={photo.baseUrl} alt=""/></button>)}
            </>
                :
                <h3>please sign up or login</h3>
            }
        </>
    )
}