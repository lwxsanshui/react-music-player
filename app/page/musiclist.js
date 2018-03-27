/**
 * Created by free on 2018/3/27.
 */
/**
 * Created by free on 2018/3/26.
 */
import React from 'react'
import MusicListItem from '../components/musiclistitem'
import Progress from '../components/progress'
import './player.less'
import $ from 'jquery'
import 'jplayer'

class MusicList extends React.Component{
    render(){
        let listEle = null;
        listEle = this.props.musicList.map((item)=>{
            return (<MusicListItem
                    focus = {item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={item}
                     >
                     {item.title}
                     </MusicListItem>);
        });
        return (<ul>{ listEle }</ul>);
    }

};
export default MusicList;
