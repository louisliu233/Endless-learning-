import React from 'react';
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'
import Reactpage from './video/Reactpage'
import Flutter from './video/Flutter'
import Vue from './video/Vue'

function Video(){
    return (
        <Router>
            <div className='topDav'>
                <ul>
                <li><Link to='/video/Reactpage'>React教程</Link></li>
                <li><Link to='/video/Flutter'>Flutter教程</Link></li>
                <li><Link to='/video/Vue'>Vue教程</Link></li>
                </ul>
            </div>
            <div className='videoContent'>
                <div><h3>视频教学</h3></div>
                <Route path='/video/Reactpage/ ' component={Reactpage} />
                <Route path='/video/Flutter/ ' component={Flutter} />
                <Route path='/video/Vue/ ' component={Vue} />
            </div>   
            </Router>
    )
}

export default Video