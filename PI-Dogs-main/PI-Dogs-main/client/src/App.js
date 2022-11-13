import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import Home from './components/Home'
import CreateBreed from './components/CreateBreed'
import LandingPage from './components/Landing-page'


function App() {
  return (
    <React.Fragment>
    <LandingPage/>
    
    <Route path={"/home"} component={Home}/>
    <Route path={"/create-breed"} component={CreateBreed}/>
    

  
  </React.Fragment>
  )
}

export default App;
