import React, { useState, useEffect } from 'react'
import * as photoService from '../../service/photoService'
import * as authService from '../../service/authService'
import * as uploadService from '../../service/uploadService'
import './AddPhotos.css'



export default function AddPhotos({ user, setUser, design, photosDisplay, setPhotosDisplay, startDate, setStartDate, endDate, setEndDate }) {
    const [gPhotos, setGPhotos] = useState([])
    const [upPhotos, setUpPhotos] = useState(null)
    // const [photosDisplay, setPhotosDisplay] = useState(user.photos)
    // const [loaded, setLoaded] = useState(null)
    // const [startDate, setStartDate] = useState('1980-08-08')
    // const [endDate, setEndDate] = useState(new Date().toLocaleDateString().split('/').reverse().join('-'))

    useEffect(() => {
       sortPhotos()
    }, [user])

    async function setPhotosFromGoogle() {
        const response = await photoService.getGPhotos()
        const retPhotos = response[0] ? response : []
        setGPhotos(retPhotos)
    }
    // async function setUserPhotos() {
    //     const profilePhotos = await photoService.getUserPhotos()
    //     setProfilePhotos(profilePhotos)
    // }
    // async function addToProfilePhotos(photo) {
    //     await photoService.addPhotoToUser(photo, user._id)
    //     const updatedUser = await authService.getUser(user._id)
    //     setUser(updatedUser)
    // }

    async function removeFromProfilePhotos(photoId) {
        await photoService.removePhotoFromUser(photoId, user._id)
        const updatedUser = await authService.getUser(user._id)
        setUser(updatedUser)
    }

    function sortPhotos() {
        const newPhotosDisplay =  user && user.photos ? [...user.photos].filter(photo => (photo.date > startDate && photo.date < endDate)) : []
        setPhotosDisplay(newPhotosDisplay)
    }
    // async function sendCreateAlbum() {
    //     await photoService.createGAlbum(user)
    //     const updatedUser = await authService.getUser(user._id)
    //     setUser(updatedUser)
    // }

    // function sendBatchPhotos() {
    //     const photoIds = user.photos.map(photo => photo.gId)
    //     photoService.addPhotosToAlbum(user.token, user.albums[0].gId, photoIds)
    // }

    function handlePhotoChange(e) {
        for (let key in e.target.files[0]) {
        console.log(key)
        }
        setUpPhotos(e.target.files)
        // setLoaded(0)
    }

    async function handleUploadClick() {
        if (upPhotos && upPhotos.length) {
            const data = new FormData()
            for (var x = 0; x < upPhotos.length; x++) data.append('file', upPhotos[x])
            uploadService.uploadPhotos(data, user._id, (err, updatedUser) => {
            authService.getUser(user._id)
            setUser(updatedUser)
            })
        } else {console.log('add photos')}
    }
        // id productUrl baseUrl mimeType mediaMetadata filename
    return (
        <div>
            {user && user.photos && user.photos.length > 0 &&
            <> 
                {/* <button onClick={sendBatchPhotos}>Add to Profile</button> */}
                <h3 className={(design===1?'a':'e')}>Sort photos by date</h3>
                <input type="date" name="startDate" value={startDate} onChange={e => setStartDate(e.target.value)}/>
                <input type="date" name="endDate" value={endDate} onChange={e => setEndDate(e.target.value)}/>
                <button onClick={sortPhotos}>Sort</button>
                <div className="user-photos">
                    {photosDisplay.map((photo, i) => <div className="img-wrapper" key={i} onClick={() => removeFromProfilePhotos(photo._id)}><img src={photo.urlTo} alt="" /></div>)}
                </div>
                </>
            }
             <div className={(design===1?'a':'e')}>
                <input className={(design===1?'':'e')} type="file" name="upPhotos" multiple onChange={handlePhotoChange} />
                <button onClick={handleUploadClick}>Upload</button>
                <h3 className={(design===1?'':'e')}>Upload Photos</h3>
            </div>
            {gPhotos.length?
            <>
                <div className="g-photos">
                    {gPhotos.map((photo, i) => <div className="img-wrapper" key={i}><img src={photo.baseUrl} alt="" /></div>)}
                </div>
                {/* <button onClick={sendCreateAlbum}>Select Your Albums</button> */}
                </>
                :
                <>
                 <div>
                    <a href="http://localhost:3001/auth/google"  className={(design===1?'':'e')}>Sign in to google</a>
                    <button onClick={setPhotosFromGoogle}>search gPhotos</button>
                 </div>
                </>
            }
        </div>
    )
}