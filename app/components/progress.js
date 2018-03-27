/**
 * Created by free on 2018/3/25.
 */

import React from 'react'
import './progress.less'

class Progress extends React.Component{
    static defaultProps(){
        return {
            barcolor: '#2f9842'
        }
    };
    constructor(...args){
        super(...args);
        this.changeProgress = this.changeProgress.bind(this);
    }
    changeProgress(e){
        let progressBar = this.refs.progressBar;
        let progress = (e.clientX - progressBar.getBoundingClientRect().left) / progressBar.clientWidth;

        this.props.onProgresssChange && this.props.onProgresssChange(progress);
    }
    render(){
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>

                <div className="progress" style={{width:`${this.props.progress}%`,background: this.props.barColor}}

                ></div>
            </div>

        );
    }
};
export default Progress;