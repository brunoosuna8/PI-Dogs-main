import './App.css';
import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Home from './components/Home'
import CreateBreed from './components/CreateBreed'
import LandingPage from './components/Landing-page'
import Detail from './components/Detail'
import NavBar from './components/NavBar';

function App() {
  return (
    <React.Fragment>
    <Route exact path="/" component={LandingPage}/>
    <Route  path="/dogs" component={NavBar}/>
    <Route exact path="/dogs" component={Home}/>
    <Switch>
    <Route path="/dogs/create-breed" component={CreateBreed}/>
    
    <Route path="/dogs/:id" component={Detail}/>
    </Switch>
    

  
  </React.Fragment>
  )
}

export default App;
