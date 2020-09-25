const request = require('request')
const axios = require('axios')
const config = require('../config/google')

async function returnGPhotos(req, res) {
    const filters = {contentFilter: {}, mediaTypeFilter: {mediaTypes: ["PHOTO"]}}
    let parameters = {filters, pageSize: 100}
    let nextPageToken = null
    let authToken = req.user.token;
    let photos = []
    
    try {
        do {
            let params = JSON.stringify(parameters)
            const result = await new Promise((resolve, reject) => {
                request.post('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
                    headers: {'Content-Type': 'application/json'},
                    body: params,
                    auth: {'bearer': authToken},
                    }, (err, response, body) => {
                            resolve(JSON.parse(response.toJSON().body))
                    })
                })
                photos = photos.concat(result.mediaItems)
                parameters.pageToken = result.nextPageToken
            } while (photos.length < 200 && parameters.pageToken != null)
        } catch (err) {console.log(err)}
        res.status(200).json({ photos })
}

module.exports = { returnGPhotos }

// async function searchGooglePhotos(authToken, params) {
//     let photos = [];
//     let nextPageToken = null;
//     let error = null;
//     params.pageSize = config.searchPageSize;
//     try {
//           // Loop while the number of photos threshold has not been met yet
//           // and while there is a nextPageToken to load more items.
//         do {
//             console.log(`Submitting search with parameters: ${JSON.stringify(params)}`);
//             // Make a POST request to search the library or album
//             const result =
//                 await request.post(config.apiEndpoint + '/v1/mediaItems:search', {
//                   headers: {'Content-Type': 'application/json'},
//                   json: params,
//                   auth: {'bearer': authToken},
//                 });
//             // console.log(`Response: ${result.Keys()}`);
//             // The list of media items returned may be sparse and contain missing
//             // elements. Remove all invalid elements.
//             // Also remove all elements that are not images by checking its mime type.
//             // Media type filters can't be applied if an album is loaded, so an extra
//             // filter step is required here to ensure that only images are returned.
//             for (let key in result) console.log(result[`${key}`])
//             console.log('res meditems' + result)
//             const items = result && result.mediaItems ?
//                 result.mediaItems
//                     .filter(x => x)  // Filter empty or invalid items.
//                     // Only keep media items with an image mime type.
//                    .filter(x => x.mimeType && x.mimeType.startsWith('image/')) :
//                 [];
//             photos = photos.concat(items);
//             // Set the pageToken for the next request.
//             params.pageToken = result.nextPageToken;
//             console.log(`Found ${items.length} images in this request. Total images: ${photos.length}`);
//             // Loop until the required number of photos has been loaded or until there
//             // are no more photos, ie. there is no pageToken.
//           } while (photos.length < config.photosToLoad &&
//                    params.pageToken != null);
//         } catch (err) {
//           // If the error is a StatusCodeError, it contains an error.error object that
//           // should be returned. It has a name, statuscode and message in the correct
//           // format. Otherwise extract the properties.
//           error = err.error.error ||
//               {name: err.name, code: err.statusCode, message: err.message};
//           console.error(error);
//         }
      
//         console.log('Search complete.');
//         return {photos, params, error};
//     }       

    // let albums = [];
    //         let nextPageToken = null;
    //         let error = null;
    //         let parameters = {pageSize: config.albumPageSize};
          
    //         try {
    //           // Loop while there is a nextpageToken property in the response until all
    //           // albums have been listed.
    //           do {
    //             console.log(`Loading albums. Received so far: ${albums.length}`);
    //             // Make a GET request to load the albums with optional parameters (the
    //             // pageToken if set).
    //             const result = await request.get(config.apiEndpoint + '/v1/albums', {
    //               headers: {'Content-Type': 'application/json'},
    //               qs: parameters,
    //               json: true,
    //               auth: {'bearer': authToken},
    //             });
          
    //             console.log(`Response: ${result}`);
          
    //             if (result && result.albums) {
    //               console.log(`Number of albums received: ${result.albums.length}`);
    //               // Parse albums and add them to the list, skipping empty entries.
    //               const items = result.albums.filter(x => !!x);
          
    //               albums = albums.concat(items);
    //             }
    //             parameters.pageToken = result.nextPageToken;
    //             // Loop until all albums have been listed and no new nextPageToken is
    //             // returned.
    //           } while (parameters.pageToken != null);
          
    //         } catch (err) {
    //   // If the error is a StatusCodeError, it contains an error.error object that
    //   // should be returned. It has a name, statuscode and message in the correct
    //       // format. Otherwise extract the properties.
    //       error = err.error.error ||
    //           {name: err.name, code: err.statusCode, message: err.message};
    //       console.error(error);
    //     }
      
    //     console.log('Albums loaded.');
    //     return {albums, error};
    //   }
