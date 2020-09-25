import React, { useEffect } from 'react'
import { Menu } from 'semantic-ui-react'
import './FavoriteDates.css'

function FavoriteDates({ user, photosDisplay, setPhotosDisplay, startDate, setStartDate, endDate, setEndDate }) {
    function setDates(dat) {
        setStartDate(dat)
        setEndDate(dat)
    }
    function sortPhotos() {
        const newPhotosDisplay =  user.photos ? [...user.photos].filter(photo => (photo.date > startDate && photo.date < endDate)) : []
        setPhotosDisplay(newPhotosDisplay)
    }
    useEffect(() => {
            sortPhotos()
    }, [startDate])
    return (
    <>
        <h3>Favorite Dates:</h3>
        <div id="dateMenu">
        <Menu color='blue'>
            {user.favDates.map((favDate, i) => 
                <Menu.Item
                    onClick={() => setDates(favDate)} key={i}>
                        {favDate}
                </Menu.Item>
            )}
        </Menu>
        </div>
    </>
    )
}

export default FavoriteDates
