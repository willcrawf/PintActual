import { Stream } from 'stream'
// const ExifImage = require('exif').ExifImage


export function getGPhotos() {
    return fetch('/apis/gPhotos', {
        method: 'POST'
    }, { mode: "cors" })
        .then(res => res.json())
        .then(({ photos }) => photos)
}

export function getUserPhotos(userId) {
    console.log('in the get user photos fe')
    return fetch(`/apis/users/${userId}/photos`, {mode: 'cors'})
            .then(res => res.json())
            .then(({ photos }) => photos)
}

export function addPhotoToUser(photo, userId) {
    return fetch(`/apis/users/${userId}/photos`, {
        method: 'POST',
        headers: new Headers({ "Content-Type": "application/json" }),
        body: JSON.stringify(photo)
    }, { mode: "cors" })
        .then(res => res.json())
        .then(({ newPhoto }) => newPhoto)
}

export function removePhotoFromUser(photoId, userId) {
    console.log('in the remove photo fxn')
    return fetch(`/apis/users/${userId}/photos/${photoId}`, {
        method: 'DELETE'
    }, { mode: "cors" })
    .then(res => res.json())
    .then(({ user }) => user) 
}

// export function createGAlbum({ token, _id, photos }) {
//     return fetch(`apis/newShared/${token}/${_id}`,{
//         method: 'POST',
//     }, {mode: 'cors'})
//     .then(res => res.json())
//     .then(({ albumInfo }) => albumInfo)
// }

// export function addPhotosToAlbum(gToken, albumId, photoIds) {
//     console.log(`in the photoservice add photos, albumid ${albumId} and photos ${photoIds}`)
//     return fetch(`apis/addToAlbum/${gToken}/${albumId}/${photoIds}`, {
//         method: 'POST'
//     }, {mode: 'cors'})
//     .then(res => console.log(res))
// }

// export async function getExif(imgUrl) {
//     let exifData
//     try {
//         fetch(imgUrl, {mode: 'cors'})
//         .then(image => new ExifImage({ image }, (err, exData) => {
//             console.log(exData)
//             return exifData = exData
//             })
//         )
//     } catch (err) {console.log(err)}
//     finally {
//         return exifData
//     }
// }

// function createNewStream() {
//     const newStream = new Stream
//     newStream.writable = true
//     newStream.bytes = 0

//     newStream.write = function(buffer) {
//         newStream.bytes += buffer.length
//     }

//     newStream.end = function(buffer) {
//         if(arguments.length) newStream.write(buffer)
//         newStream.writable = false
//     }
//     return newStream
// }