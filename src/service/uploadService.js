import axios from 'axios'
import * as gpsService from '../service/gpsService'

export async function uploadPhotos(data, userId, cb) {
    const phots = await data.getAll('file')
    const photDates = phots.map(phot => phot.lastModifiedDate)
    axios.post(`http://localhost:3001/upload/uploadPhotos/${userId}/${photDates}`, data)
        .then(res => res.data)
        .then(({ user }) => cb(null, user))
}