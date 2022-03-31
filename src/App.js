import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import Blogs from './components/Blogs';
import Login from './components/Login';
import SignUp from './components/SignUp';
import AddPost from './components/Post';
import BlogView from './components/BlogView';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {
  const pageSize = 5;

  const [progress, setProgress] = useState(0)
  
  
  function alertMD(title,body) {
    let bt = document.getElementById("modal");
    document.getElementById("exampleModalLabel").innerHTML = title;
   document.getElementById("body").innerHTML = body;
    bt.click();

  }
  function rHome() {
    window.location.href="/";
  }
  alert =  alertMD;
  

  return (
   

   <div className="wrapper d-flex align-items-stretch">
      <link href="./index.css" rel="stylesheet" />

      <Router>
        <NavBar />
        <LoadingBar
          height={3}
          color='#f11946'
          progress={progress}
        />
       <div id="content" className="d-inline">
        <div className="d-flex p-4 bgred align-items-center text-white-50 bg-purple rounded box-shadow">
        <img className="mr-2 ml-4" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg" alt="" width="48" height="48" />
        <div className="">
          <h6 className="mb-0 text-white ">BlogWorld </h6>
          <small>Right here to help!</small>

        </div>

            <button type="button" className="btn btn-primary float-right ml-auto p-2" >
<small><small>{localStorage.getItem("user") ? "Logged in as," : "Not Logged in"} </small><br></br> <i><b>{localStorage.getItem("user") ? localStorage.getItem("user") : ""}</b></i> </small> </button>

          
         <button type="button" style={{display:"none"}} id="modal" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div id="bodyy" className="modal-body text-dark">
        
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" onClick={rHome} className="btn btn-primary">Return to Home</button>
      </div>
    </div>
  </div>
</div>
      </div>
      <div className="p-3">
          <Switch>
            <Route exact path="/"><Blogs setProgress={setProgress} key="general" pageSize={pageSize} country="in" category="general" /></Route>

            <Route exact path="/write"><NavBar setProgress={setProgress} key="business" pageSize={pageSize} country="in" category="business" /></Route>
            <Route exact path="/login"><Login setProgress={setProgress} key="entertainment" pageSize={pageSize} country="in" category="entertainment" /></Route>
            <Route exact path="/signup"><SignUp /></Route>

            <Route exact path="/create"><AddPost /></Route>

            <Route path="/article/:tag" children={<BlogView />} />
          </Switch>
        </div>

</div>
      </Router>



    </div>
  )

}

export default App;