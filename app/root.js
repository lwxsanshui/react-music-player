/**
 * Created by free on 2018/3/24.
 */
import React from 'react'
import Header from './components/header'
import MusicList from './page/musiclist'
import Player from './page/player'
//import Progress from './components/progress'
import $ from 'jquery'
import 'jplayer'
import { MUSIC_LIST } from './config/musiclist'
import { Router,IndexRoute,Link,Route,hashHistory } from 'react-router'
import Pubsub from 'pubsub-js'


class App extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[3],
            repeatType: 'cycle'
        }
        this.playMusic = this.playMusic.bind(this);
    }

    componentDidMount(){
        $('#player').jPlayer({
            ready:function(){
                $(this).jPlayer('setMedia',{
                    mp3:'http://oj4t8z2d5.bkt.clouddn.com/%E6%88%91%E8%A6%81%E4%BD%A0.mp3'
                }).jPlayer('play');
            },
            supplied:'mp3',
            wmode:'window'

        });
        $('#player').bind($.jPlayer.event.ended,(e)=>{
            this.playNext();
        })
        Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
            this.setState({
                musicList: this.state.musicList.filter(item=>{
                    return item !== musicItem;
                })
            })
        });
        Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
            this.playMusic(musicItem);
        });
        Pubsub.subscribe('PLAY_PREV',(msg,musicItem)=>{
            this.playNext('prev');
        });
        Pubsub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
            this.playNext();
        });
    }
    componentWillUnMount(){
        Pubsub.unsubscribe('DELETE_MUSIC');
        Pubsub.unsubscribe('PLAY_MUSIC');
        Pubsub.unsubscribe('PLAY_PREV');
        Pubsub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended)
    }
    playMusic(item) {
        $("#player").jPlayer("setMedia", {
            mp3: item.file
        }).jPlayer('play');
        this.setState({
            currentMusicItem: item
        });
    }
    playNext(type = "next"){
        let index = this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength = this.state.musicList.length;
        if(type === 'next'){
            newIndex = (index+1) % musicListLength;
        }else{
            newIndex =(index - 1 + musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    }
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    }
    render(){
        return (
            <div>
            <Header></Header>
            {React.cloneElement(this.props.children,this.state)}
            </div>

        );
    }

}


class Root extends React.Component{
    render(){
        return (
        <Router history={hashHistory}>
            <Route path='/' component={App}>
                <IndexRoute component={Player}></IndexRoute>
                <Route path="/list" component={MusicList}></Route>
            </Route>
        </Router>)
    }

};
export default Root;
