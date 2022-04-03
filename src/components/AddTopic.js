import React, { useState } from "react";
import { useHistory } from "react-router-dom";

var  serverAdd = process.env.REACT_APP_SERVER;

const AddTopic= (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    username: "",
  });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(
        serverAdd + "/api/auth/signup",
        {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: credentials.username,
          email: credentials.email,
          password: credentials.password,
        }),
      }
    );
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // Save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      history.push("/");
    } else {
      alertMD("Dude!","Invalid credentials");
    }
  };

  const [note, setNote] = useState({
    topicid: "",
    name: "",
    description: "",
    category : "",
    img : "",
    color : ""
  });
  
  
  function alertMD(title,bodyy) {
    let bt = document.getElementById("modal");
    document.getElementById("exampleModalLabel").innerHTML = title;
   document.getElementById("bodyy").innerHTML = bodyy;
    bt.click();

  }

  const addNote = async (e) => {
    // TODO: API Call
    // API Call

    e.preventDefault();
    if (!localStorage.getItem("token")) {
      alertMD("Oops!","You need to login first <br> You will be redirected to login page.");
      history.push("/login");
      return;
    }

    const response = await fetch(
      `${serverAdd}/api/topics/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"), //`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiemVyYXBpdW0iLCJ1c2VybmFtZSI6IlplcmFwaXVtIiwiZW1haWwiOiJtbW1AbW0uY29tIn0sImlhdCI6MTYzODUyNDM0Nn0.eWm0y_ULVu57suXg7BhHwS1XKisqLd0ZQDMYCp7UPXo`
        },
        body: JSON.stringify({
          topicid: note.topicid && note.topicid.length ? note.topicid.trim() : false,
          name: note.name,
          description: note.description,
          category : note.category,
          img: note.img && note.img.length ? note.img.trim() : false,
          color : note.color && note.color.length ? note.color : false

         
        }),
      }
    );

    const json = await response.json();
    console.log(json);
    if (json.success) {
      history.push("/");
    } else {
           alertMD("Dude!",json.errors[0].msg);
    }
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="container my-3 p-5 bg-dark text-light">
      <h2 className="text-light">Add a Topic</h2>
      <form className="my-3" onSubmit={addNote}>
        <div className="mb-3">
          <label htmlFor="topicid" className="form-label">
            Topic ID (Optional)
          </label>
          <small>
            <i> (Enter topic id if you wanna edit a topic) </i>{" "}
          </small>

          <input
            type="text"
            className="form-control"
            id="topicid"
            name="topicid"
            value={note.topicid}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        


        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Topic Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            aria-describedby="emailHelp"
            value={note.name}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Category
          </label>
          <input
            type="text"
            className="form-control"
            id="category"
            name="category"
            aria-describedby="emailHelp"
            value={note.category}
            onChange={onChange}
            minLength={5}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Short Description
          </label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={note.description}
            onChange={onChange}
            minLength={5}
            
          />
        </div>
       
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
            Image Link
          </label>
          <input
            type="text"
            className="form-control"
            id="tag"
            name="img"
            value={note.img}
            onChange={onChange}
            minLength={5}
            
          />
        </div>


        <div className="mb-3">
          <label htmlFor="tag" className="form-label">
           Color
          </label>
          <input
            type="text"
            className="form-control"
            id="color"
            name="color"
            value={note.color}
            onChange={onChange}
            minLength={3}
            
          />
        </div>


        <button type="submit" className="btn btn-primary" onClick={addNote}>
          Add Topic
        </button>
      </form>
    </div>
  );
};



export default AddTopic;
