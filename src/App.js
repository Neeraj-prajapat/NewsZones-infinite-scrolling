import './App.css';
import React, { Component } from 'react'
import Navbar from './component/Navbar';
import News from './component/News';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoadingBar from 'react-top-loading-bar'



export default class App extends Component {

apiKey=process.env.REACT_APP_NEWS_API;

state={
  progress:0
}

setProgress=(progress)=>{
  this.setState({progress:progress})
}

  render() {
    return (
     <BrowserRouter>
         <LoadingBar
        color='#f11946'
        height={2}
        progress={this.state.progress}
      />
        <Navbar/>    
        <Routes>
        <Route path="/" key="1" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="general"  />}/>
          <Route path="/business" key="2" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="business"/>}/>
          <Route path="/entertainment" key="3" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="entertainment"/>}/>
          <Route path="/health" key="4" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="health"/>}/>
          <Route path="/sports" key="5" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="sports"/>}/>
          <Route path="/technology" key="6" element={<News apiKey={this.apiKey} setProgress={this.setProgress} country="in" category="technology"/>}/>
        </Routes>
     </BrowserRouter> 
    )
  }
}





//hum log class ke ander hai ishiliye hum log pageSize ke saat const ka use nhi kiye hai.


















