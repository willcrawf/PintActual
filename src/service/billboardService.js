const axios = require("axios");

export default async function getTopTen(date){
let a= await axios({
    method:"GET",
    url:"https://billboard-api2.p.rapidapi.com/hot-100",
    headers: {
    "content-type": "application/octet-stream",
    "x-rapidapi-host": "billboard-api2.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_BILLBOARD,
    "useQueryString": true
    },
    params: {
    "date": date,
    //!change range to 2 in order to limit youtube quota consumption
    "range": "1-2"
    }
    })
    .then(async (response)=>{
      //console.log(response)
      let a=Object.values(response)
      let b=Object.values(a[0])
      let c=Object.values(b[1])
      let strings='<h1>Top Ten Hits on This Day:</h1><h3><ol>';
      const yt=process.env.REACT_APP_YOUTUBE;
      //turns object into sets of arrays
      c.forEach(async song=>{
        let info=Object.values(song);
        let songS=info[1].replace(/ /g,'%20')
        let artistS=info[2].replace(/ /g,'%20')
        let links;
        //pulls songs and artists from array
        //console.log(JSON.stringify(info))
        console.log('before the loop:'+strings)//original
        let ytLinks= await axios.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q='+songS+'%20'+artistS+'&key='+yt)
        .then(response => {
          let ytString=response.data.items[0].id.videoId;
          console.log('during the loop:'+strings)
          return(ytString)
        })
        .catch(error => {console.log(error)})
        console.log('after the loop:'+strings)
        links=ytLinks
        const stringt=`<li><a href="https://www.youtube.com/watch?v=`+await new Promise((response,rej)=>{
          response(links)
        })+`">${info[1]} By ${info[2]}</a></li><br/>`
        strings+=stringt;
        console.log('complete string:'+strings)
        return(strings)
      })
      let ytlink=Object.values(c);
      strings+=ytlink+'</ol></h3>';
      //adds the list of songs to the "songs" row of the table
      let rslt= strings;
      await rslt
      return(rslt)
    })
    .catch((error)=>{console.log(error)})
    return(a)
  }