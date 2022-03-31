

import React, { useEffect } from 'react'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

var  serverAdd = process.env.REACT_APP_SERVER;


const BlogView = (props) => {
  let { title } = props;
  let { tag } = useParams();

  function escape(htmlStr) {
    return htmlStr.replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#39;");        
 
 }

 function unescapeHTML (htmlStr) {
htmlStr = escape(htmlStr);
htmlStr = htmlStr.replace(/&lt;br&gt;/g , "<br>");	 
htmlStr = htmlStr.replace(/&lt;b&gt;/g , "<b>");
htmlStr = htmlStr.replace(/&lt;\/b&gt;/g , "</b>");   
htmlStr = htmlStr.replace(/&amp;/g , "&");
    return htmlStr;

 }


  function modifyDate(date, timeReq) {
    let months = {
      '1': "Jan",
      '2': "Feb",
      '3': "Mar",
      '4': "Apr",
      '5': "May",
      '6': "Jun",
      '7': "Jul",
      '8': "Aug",
      '9': "Sep",
      '10': "Oct",
      '11': "Nov",
      '12': "Dec",
    };

    let tt = new Date(date);
    let t = tt.toGMTString().split(" ")[4];
    let t2 = tt.toLocaleString();

    let mon = months[t2.split(",")[0].split("/")[0]];
    let day = t2.split(",")[0].split("/")[1];
    let year = t2.split(",")[0].split("/")[2];
    let hr = parseInt(t2.split(",")[1].split(":")[0]);
    let min = parseInt(t2.split(",")[1].split(":")[1]);
    let aa = parseInt(t2.split(",")[1].split(":")[2]);
    let pp = t2.split(",")[1].split(":")[2].replace(aa, '');

    let time = hr + ":" + min + pp;

    if (timeReq) return (mon + " " + day + ", " + year) + ", " + time;
    return (mon + " " + day + ", " + year);

  }

  const [post, setPost] = useState({
    title: "",
    img: "",
    text: "",
    bd : [],
    author: "",
    post: "",
    id : ""
  });

  let history = useHistory();

  const [credentials, setCredentials] = useState({ text: "", username: "" })
  const [comments, setComments] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem("token")) {
      alertMD("Oops!","You need to login first");
      history.push("/login");
      return;
    }

    const response = await fetch(serverAdd + "/api/posts/comment/" + tag, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem("token") //`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemVyYXBpdW0iLCJ1c2VybmFtZSI6IlplcmFwaXVtIiwiZW1haWwiOiJtbW1AbW0uY29tIn0sImlhdCI6MTYzODUyNDM0Nn0.eWm0y_ULVu57suXg7BhHwS1XKisqLd0ZQDMYCp7UPXo`
      },
      body: JSON.stringify({ username: localStorage.getItem("user"), text: credentials.text })
    });

      function alertMD(title,bodyy) {
    let bt = document.getElementById("modal");
    document.getElementById("exampleModalLabel").innerHTML = title;
   document.getElementById("bodyy").innerHTML = bodyy;
    bt.click();

  }

    const json = await response.json()
    console.log(json);
    alertMD("Success ^_^","Reload the page to see the changes");
    if (json.success) {

      history.push("/article/" + tag);

    }
    else {
      alertMD("Dude!","Invalid credentials");
    }
  }

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value })
  }



  const getPost = async () => {
    const response = await fetch(
      serverAdd + "/api/posts/post/" + tag,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
      }
    );
    let json = await response.json();

    if (json.success) {
      setComments(json.post.comments.reverse());
      return json.post;

    } else {
      alert("Something went wrong!");
      history.push("/");
    }
  };

  useEffect(() => {
    getPost().then((po) => {
      document.title = `${title} - MyBlogWorld`;
      setPost({
        title: po.title,
        img: po.body[0].img,
        text: po.body[0].text,
        bd : po.body.slice(1),
        author: po.author,
        date: modifyDate(po.dateCreated),
        id : po.id
      });
    });

    // eslint-disable-next-line
  }, [])



  return (
    <div>
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossOrigin="anonymous" />
     <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet"/>
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>

      <div className="py-1">
        
            <div className="p-2">
                  <h2> 
             {post.title} 
  <img className="float-right" src="https://c.tenor.com/huFKJamiR84AAAAC/minions.gif" width="80" height="80" />

  </h2>
              <h7 className="text-muted">
                <small>
                <span className="fa fa-clock-o"></span> Post by{" "}
                {post.author}, {post.date}.
                </small>
              </h7>
              <h6>
                <span className="badge badge-danger">Coding</span>{" "}
                <span className="badge badge-primary">Random</span>
              </h6>

              <img
                src={post.img}
                className="my-4 border img-square"
                height="300"
                width="99%"

                alt="Avatar"
              />

              <p className="pggg" dangerouslySetInnerHTML = {{__html :unescapeHTML(post.text)}} ></p>
              <br></br>
              <br></br>


              {post.bd.map((ele) => {

return <div id={ele.id}> <h3>{ele.title} 
  <img className="float-right" src="https://i.gifer.com/origin/ab/ab17f96aec139d9fb81c663d2e2cd2d0_w200.gif" width="80" height="80" />
</h3>
              <h6 className="text-muted">
                <small>
                <span className="fa fa-clock-o"></span> Post by{" "}
                {ele.username}, {post.date}.
                </small>
              </h6>
              <h6>
              <span className="badge badge-danger">Coding</span>{" "}
                <span className="badge badge-primary">Ipsum</span>
              </h6>

              <img
                src={ele.img}
                className="my-4 border img-square"
                height="300"
                width="99%"

                alt="Avatar"
              />

              <p dangerouslySetInnerHTML = {{__html :unescapeHTML(ele.text)}} ></p>
              <br></br>
              <br></br>
              </div>
              })
            }


            </div>
            <hr></hr>

            <div>
              <h4 className="my-2">Leave a Comment:</h4>
              <form role="form"  onSubmit={handleSubmit}>
                <div className="form-group">
                  <textarea className="form-control" rows="3" value={credentials.text} onChange={onChange} id="text" name="text" required></textarea>
                </div>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </form>
              <br></br>
              <br></br>



              <div className="row mx-1 border comms bggrey p-3 overflow-auto">
                <p className="text-muted font-weight-bold">
                  <span className="badge badge-secondary rounded p-2">{comments.length}</span> Comments:
                </p>
                <br></br>
                {comments.map((element) => {

                  return <div className="shadow p-3 mb-5 bg-body rounded"> <div className="col-sm-2 text-center ">
                    <img
                      src={"https://raw.githubusercontent.com/eladnava/material-letter-icons/master/dist/png/" + element.username.charAt(0).toUpperCase() + ".png"}
                      className="img-circle"
                      height="65"
                      width="65"
                      alt="Avatar"
                    />
                  </div>
                    <div className="col-sm-12">
                      <h5>
                        {element.username} <h8 className="text-muted"><small>{modifyDate(element.date, true)} </small></h8>
                      </h5>
                      <p>
                        {element.text}
                      </p>
                      <br></br>
                    </div>
                  </div>


                })
                }



              </div>


              
              

            </div>


          
      </div>

    </div>
  );
};

export default BlogView;
