import React, {Component} from 'react'
import SearchBar from '../SearchBar/SearchBar'
import VideoList from '../VideoList/VideoList'
import VideoDetail from '../VideoDetail/VideoDetail'
import youtube from '../../service/youtube-api';


class YouTubePlayer extends Component {
        state = {
            videos: [],
            selectedVideo: null
        }
        handleSubmit = async (termFromSearchBar) => {
            const response = await youtube.get('/search', {
                params: {
                    q: termFromSearchBar
                }
            })
    
            this.setState({
                videos: response.data.items
            })
            console.log("this is resp",response);
        };
        handleVideoSelect = (video) => {
            this.setState({selectedVideo: video})
        }
    
        render() {
            return (
                <div className='ui container' style={{marginTop: '1em'}}>
                    <SearchBar handleFormSubmit={this.handleSubmit}/>
                    <div className='ui grid'>
                        <div className="ui row">
                            <div className="eleven wide column">
                                <VideoDetail video={this.state.selectedVideo}/>
                            </div>
                            <div className="five wide column">
                                <VideoList handleVideoSelect={this.handleVideoSelect} videos={this.state.videos}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
export default YouTubePlayer;