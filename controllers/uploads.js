const multer = require('multer')

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage }).array('file')

const uploadPhotos = (req, res, next) => {
    console.log('in the back _______________ ')
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            console.log(err)
            return res.status(500).json(err)
        } else if (err) {
            console.log(err)
            return res.status(500).json(err)
        }
        next()
    })
}

// const getResults = (req, res) => {
//     const urlsTo = req.files.map(file => file.path)
//     req.urlsTo = urlsTo
//     userPhotosCtrlr.addUserPhoto(urlsTo, req.params.userId)
//     res.status(200).send('ok')
// }

module.exports = { uploadPhotos }