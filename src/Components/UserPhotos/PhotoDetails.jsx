import React, { Component } from 'react'
import exifImg from '../../service/gpsService';
const parse = require('html-react-parser');

export default class details extends Component{
   state={
      str:null,
      loc:null,
      day:null,
      songs:null
   }
   async getinfo()
   {
     let a= await exifImg();
     let parts=a.split('|');
     this.setState({str:a,
      loc:parts[0],
      day:parts[1],
      songs:parts[2]})
   }
   render(){
      return(
      <>
      <img src={`images/a.jpeg`} id="pic" alt=""></img><br/>
      {/* button to fetch exif and billboard info */}
      <button onClick={()=>{this.getinfo()}}>Info</button>
      <table>
         <tbody>
            <tr>
               <td id="loc">{this.state.loc!==null?<>{parse(this.state.loc)}</>:''}</td><td id="day">{this.state.day!==null?<>{parse(this.state.day)}</>:''}</td>
            </tr>
            <tr><td id="songs" colSpan="2">{this.state.songs!==null?<>{parse(this.state.songs)}</>:''}</td></tr>
         </tbody>
      </table>
      </>
      )
   }
}