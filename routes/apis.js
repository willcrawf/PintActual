const router = require('express').Router()
const gPhotosCtrlr = require('../controllers/gPhotos')
const userPhotosCtrlr = require('../controllers/userPhotos')
const usersCtrlr = require('../controllers/users')

router.post('/gPhotos', gPhotosCtrlr.returnGPhotos)
router.get('/users/:userId/photos', userPhotosCtrlr.getUserPhotos)
// router.post('/users/:userId/photos', userPhotosCtrlr.addUserPhoto)
router.delete('/users/:userId/photos/:photoId', userPhotosCtrlr.deleteUserPhoto)
router.post('/updateUser', usersCtrlr.combineGTokenUser)
// router.post('/newShared/:gToken/:userId', userPhotosCtrlr.createGAlbum)
// router.post('/addToAlbum/:gToken/:albumId/:photoIds', userPhotosCtrlr.addToUserAlbum)

module.exports = router