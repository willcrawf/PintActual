const router = require('express').Router()
const upCtrlr = require('../controllers/upload')
const uploadCtrlr = require('../controllers/uploads')
const multer = require('multer')
const userPhotosCtrlr = require('../controllers/userPhotos')

const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })
//photo is name of the input element
router.post('/', upload.single('photo'), upCtrlr.uploading)
router.post('/uploadPhotos/:userId/:pDates', uploadCtrlr.uploadPhotos, userPhotosCtrlr.storeInUser)


module.exports = router