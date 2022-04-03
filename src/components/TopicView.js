
import React, { useEffect } from 'react'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

var  serverAdd = process.env.REACT_APP_SERVER;


const Topic = (props) => {
  let { cat,tag } = useParams();

 const [posts, setPosts] = useState([])
 const [topic, setTopic] = useState([])
 let history = useHistory();

 function backk() {
   history.goBack();
 }

 const docats = async () => {
    
  const response = await fetch(
    serverAdd + "/api/topics/topic/" + cat.trim() + "/" + tag.trim(),
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const json = await response.json();
return json;      
}


useEffect(() => {
  docats().then((po) => {   
     console.log(po.data.posts)

    setPosts(po.data.posts);
    setTopic(po.data.topic.name);
    console.log(posts)
  });

  // eslint-disable-next-line
}, [])

return (<section id="recent-blog-posts" class="recent-blog-posts">
    <center>
    <a class="btn btn-primary my-2 mx-2 text-light"  style={{float:'left'}} onClick={backk}>Go Back</a>
<h3 class="h3" style={{fontSize:"40px",marginBottom : "30px"}}> {topic} <a class="btn btn-primary my-2 mx-2"  style={{float:'right'}} href={"/topicpost/create/" + cat + "/" + tag}>Add Post</a> </h3>

</center>
<hr/>
<div class="row"> 


{
posts.map((ele) => {
                 return <div class="col-lg-4 my-2">
                 <div class="post-box">
                   <div class="post-img"><img src={ele.body[0].img} class="img-fluid" alt="test"/></div>
                   <span class="post-date">{ele.dateCreated}</span>
                   <h3 class="post-title" >{ele.title}</h3>
                   <a href={"/article/" + ele.id} class="readmore stretched-link mt-auto"><span>Read More</span><i class="bi bi-arrow-right"></i></a>
                 </div>
                 </div>
               })}

    </div>
    </section>
  );
};

export default Topic;
