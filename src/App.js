import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {BrowserRouter as Router,Route} from "react-router-dom"
import './App.css';

import Navbar from "./components/Navbar"
import CreateWorker from "./components/CreateWorker"
import EditWorker from "./components/EditWorker"
import WorkersList from "./components/WorkersList"
import CreateUser from "./components/CreateUser"


function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
<     br/>
    <Route path ="/" exact component ={WorkersList} />
    <Route path ="/edit/:_id" exact component ={EditWorker} />
    <Route path ="/create" exact component ={CreateWorker } />
    <Route path ="/user" exact component ={CreateUser} />   
    </div>
  </Router>
      
      
   );
}

export default App;
