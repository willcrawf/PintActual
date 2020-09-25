const mongoose = require('mongoose')
const Schema = mongoose.Schema

const albumSchema = new Schema({
    gId: String,
    title: String,
    productUrl: String,
    mediaItemsCount: Number,
    isWritable: Boolean,
    photos: [{
        type: Schema.Types.ObjectId,
        ref: 'Photo'
    }]
}, {
    timestamps: true
})

module.exports = mongoose.model('Album', albumSchema)