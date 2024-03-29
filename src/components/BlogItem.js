import React from 'react'
import BlogView from './BlogView'
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { Link } from "react-router-dom";

var  serverAdd = process.env.REACT_APP_SERVER;


const BlogItem = (props)=> {
        let { title, description, imageUrl, author, date, id, likes, dislikes, fetchB } = props;
  
  
  
  
  const deletePost = async () => {
    const response = await fetch(serverAdd + "/api/posts/delete/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            }

        });
    let json = await response.json()
    if(json.success) {
    fetchB();
    
    }
    else {
      alert(json.msg)
    }
    
    
  }
  
  const likePost = async () => {
    
    const response = await fetch(serverAdd + "/api/posts/like/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            }

        });
    let json = await response.json()
    if(json.success) {
        fetchB();
    
    }
    else {
      alert(json.msg)
    }

    
  }
    
    


  
  const dislikePost = async () => {
    
        alert(id);
    const response = await fetch(serverAdd + "/api/posts/dislike/" + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem("token")
            }

        });
    let json = await response.json()
    alert(json);
    if(json.success) {
              fetchB();    
    }
    else {
      alert(json.msg)
    }

    
  }
    
    


  
  
  /*
  return (
  <div className="card shadow-sm">
      <div className="card">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                        <span className="badge rounded-pill bg-danger"> 'test' </span>
                      
      <img className="" width="100%" height="225" src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="bd-placeholder-img card-img-top" alt="..." />
               
            
            <div className="card-body">
              <p className="card-text">{description}</p>
              <div className="d-flex justify-content-between align-items-center">
                <div className="btn-group">
                  <button type="button" className="btn btn-sm btn-outline-secondary">View</button>
                  <button type="button" className="btn btn-sm btn-outline-secondary">Edit</button>
                </div>
                <small className="text-muted">{date}</small>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
*/
        return (
            <div className="my-3">
                <div className="card card shadow-sm">
                    <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }> 
                     


                        <span className="badge rounded-pill bg-danger p-1"> By {!author ? "Unknown" : author} </span>
                    </div>
                    <img  width="100%" height="225" src={!imageUrl ? "https://fdn.gsmarena.com/imgroot/news/21/08/xiaomi-smart-home-india-annoucnements/-476x249w4/gsmarena_00.jpg" : imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}  </h5>
                        <p className="card-text">{description}</p>
                      <div className="d-flex justify-content-between align-items-center">
                                            <div className="btn-group">
                  <button type="button" onClick={likePost} className="btn btn-sm btn-outline-secondary">👍 {likes} <i className="bi-like"></i> </button>
                  <button type="button" onClick={dislikePost} className="btn btn-sm btn-outline-secondary">👎 {dislikes} </button>
                </div> <br></br>
                        <button type="button" onClick={deletePost} className="btn btn-sm btn-outline-secondary">DELETE</button>
      
                <small className="text-muted"> <small> {new Date(date).toGMTString()}</small></small>
                        <Link className="nav-link" to={"/article/" + id } >Read More</Link>
                    </div>
                  </div>
                </div>
            </div>
        )
}


export default BlogItem
