
import React, { useEffect } from 'react'
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";

var  serverAdd = process.env.REACT_APP_SERVER;


const Topic = (props) => {
  let { title } = props;
  let { tag } = useParams();
console.log(tag)
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
 const [cats, setCats] = useState([])

 const docats = async () => {
    
    const response = await fetch(
      serverAdd + "/api/topics/topics/" + tag.trim(),
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
      setCats(po.topics);
    });

    // eslint-disable-next-line
  }, [])

return (
    <section id="topics" class="topics">

    <div class="container" data-aos="fade-up">

      <header class="section-header">
        <h2 class="h3" style={{marginBottom:"20px",fontSize:"25px"}}>Learning</h2>
     
      </header>

      <div class="row gy-4">
      {
               
               cats.map((ele) => {
                 return <div class="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay="200">
                 <div class={"topic-box " + ele.color}>
                   <img src={ele.img ? ele.img : "https://www.transparentpng.com/thumb/question-mark/question-mark-in-black-circle-png-icon--8vYxZN.png"} class="ri-discuss-line " width="140"/>
                   <h3>{ele.name}</h3>
                   <p>{ele.description ? ele.description : "A very interesting topic that will help you grow!"}</p>
                   <a href={"/topic/" + ele.category + "/" + ele.id}  class="read-more"><span>Read More</span> <i class="bi bi-arrow-right"></i></a>
                 </div>
               </div>
               })}
      

      </div>

    </div>
</section>
  );
};

export default Topic;
