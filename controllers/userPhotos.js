var _db, usersColln, photosColln
const mongoose = require('mongoose')
const User = require('../models/user')
const Photo = require('../models/photo')
const Album = require('../models/album')

mongoose.connect(process.env.DB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err, client) => {
    _db = client.db
    usersColln = _db.collection('users')
    photosColln = _db.collection('photos')
})
const dbOnes = mongoose.connection
dbOnes.on('connected', () => console.log(`connected to MongoDB Ones at ${dbOnes.host}:${dbOnes.port}`))

const request = require('request')
const { Header } = require('semantic-ui-react')

const getUserPhotos = async (req, res) => {
    const user = await User.findOne({ _id: req.params.userId })
    console.log('before: ' + user.photos.length)
    user.execPopulate('photos')
    .then(({ photos }) => {
        console.log(photos)
        return res.status(200).json({ photos })
    })
}

// const addPhotoToUserDB = async (req, res) => {
//     const gId = {...req.body}.id
//     delete req.body.id
//     const preppedPhoto = { ...req.body, gId }
//     const newPhoto = await Photo.create(preppedPhoto)
//     const user = await User.findOne({ _id: req.params.userId })
//     user.photos.push(newPhoto._id)
//     user.save()
//     .then(user => res.status(201).json({ newPhoto }))
// }

// const deletePhoto = (req, res) => {
//     console.log(req.params.photoId)
//     try {
//         User.findOneAndUpdate({ _id: req.params.userId }, 
//             {$pull: {'photos': req.params.photoId}},
//             {   
//                 useFindAndModify: false,
//                 new: true
//             })
//             .then(user => res.status(200).json(user))
//     } catch (err) {res.status(401)}
// }

// const createGAlbum = async (req, res) => {
//     console.log('in the create album')
//     const bodyInfo = { album: {title: "eDsse"} }
//     const shareBody = {
//         sharedAlbumOptions: {
//           isCollaborative: true,
//           isCommentable: true
//         }
//       }
    // const albumInfo = await new Promise((resolve, reject) => {
    //     request.post('https://photoslibrary.googleapis.com/v1/albums', {
    //         headers: {'Content-Type': 'application/json'},
    //         auth: {'bearer': req.params.gToken},
    //         body: JSON.stringify(bodyInfo)
    //     }, (err, response, body) => {
    //         resolve(JSON.parse(response.toJSON().body))
    //     })
    // })
    // const shareInfo = await new Promise((resolve, reject) => {
    //     request.post(`https://photoslibrary.googleapis.com/v1/albums/${albumInfo.id}:share`, {
    //         headers: {'Content-Type': 'application/json'},
    //         auth: {'bearer': req.params.gToken},
    //         body: JSON.stringify(shareBody)
    //     }, (err, response2, body) => {
    //         resolve(JSON.parse(response2.toJSON().body).shareInfo)
    //     })
    //  })
    // // const fileName = req.body.photoFileNames[0]
    // // const batchAddBody = {
    // //     mediaItemIds: [
    // //         "ADvT9uXnBK8fbnwB-Y8MT1gkp9cor1jvq_hHs_6zZQmjJ7wAlc6FxaeaVzY-UpFBO2gGvYWdGanzwBA4efDHc0Y7uAoo7vitGQ"
    // //     ]
    // //  }
    // // const photos = await new Promise((resolve, reject) => {
    // //     request.post(`https://photoslibrary.googleapis.com/v1/albums/${albumInfo.id}:batchAddMediaItems`, {
    // //         headers: {'Content-Type': 'application/json'},
    // //         auth: {'bearer': req.params.gToken},
    // //         body: JSON.stringify(batchAddBody)
    // //     }, (err, response3, body) => {
    // //         resolve(body)
    // //     })
    // // })
//     console.log('share token:  ' + shareInfo.shareToken)
//     console.log('photos response' + photos)
//     albumInfo.shareInfo = shareInfo
//     console.log('updated album info id' + albumInfo.id + albumInfo.shareInfo)
//     await addAlbumToUser(req.params.userId, albumInfo)
//     res.status(201).json({ albumInfo })
// }

// const addAlbumToUser = (userId, albumInfo) => {
//     console.log('in the addAlbum')
//     const gId = {...albumInfo}.id
//     delete albumInfo.id
//     albumInfo.gId = gId
//     Album.create(albumInfo, (err, album) => {
//         User.findOne({ _id: userId }, {useFindAndModify: false}, (err, user) => {
//             user.albums.push(album)
//             user.save()
//             .then(result => 1)
//         })
//     })
// }

// const makeAlbumShared = (req, res) => {

// }
// const addToUserAlbum = (req, res) => {
//     console.log(`in the backend add photos to album, albumid ${req.params.albumId}`)
//     request.post(`https://photoslibrary.googleapis.com/v1/albums/${req.params.albumId}:batchAddMediaItems`, {
//         headers: {
//             "Content-Type": "application/json",
//             "Authorization": "Bearer " + req.params.gToken
//         },
//         body: {"mediaItemIds": ["ADvT9uWiCmME2C-v-yXw_OCgzc-RWmsW4ZQ6qTSw2D6XWFYHatt7K6eCq1Aq1QkzuJqRsyDUl1DBkYZYMpX5bVmuRdzX0SR3IA"]}
//     })
//     .then(response => {
//         console.log(response)
//         res.status(204).send('all good')
//     })
//     .catch(err => console.log(err))
// }

const storeInUser = async (req, res) => {
    const urlsTo = req.files.map(file => `/${file.filename}`)
    const pDates = req.params.pDates.split(',')
    const urlsToObjs = urlsTo.map((urlTo, i) => {
        return { urlTo: urlTo, date: pDates[i] }
    })
    photosColln.insertMany(urlsToObjs)
    .then(ret => {
        const oIds = [...ret.ops.map(op => op._id)]
        User.findOneAndUpdate({ _id: req.params.userId }, {$push: {photos: {$each: oIds}}}, {useFindAndModify: false, upsert: true, new: true})
            .then(userNew => {
                User.populate(userNew, 'photos')
                .then(userPhot => res.status(201).json({ user: userPhot }))
            })
    })
}

const deleteUserPhoto = (req, res) => {
    try {
        User.findOneAndUpdate({ _id: req.params.userId }, 
            {$pull: {'photos': req.params.photoId}},
            {   
                useFindAndModify: false,
                new: true
            })
            .then(user => res.status(200).json(user))
    } catch (err) {res.status(401)}
}

module.exports = { getUserPhotos, storeInUser, deleteUserPhoto }