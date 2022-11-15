import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import CreateBreed from './components/CreateBreed'
import LandingPage from './components/Landing-page'
import Detail from './components/Detail'

function App() {
  return (
    <React.Fragment>
    <LandingPage/>
    
    <Route exact path="/home" component={Home}/>
    <Route path="/create-breed" component={CreateBreed}/>
    <Route path="/dogs/:id" component={Detail}/>

  
  </React.Fragment>
  )
}

export default App;
