import React, { useState} from 'react'
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom'



let sdb = "";
 





const NavBar = () => {
  let history = useHistory();
  
    function alertMD(title,bodyy) {
    let bt = document.getElementById("modal");
    document.getElementById("exampleModalLabel").innerHTML = title;
   document.getElementById("bodyy").innerHTML = bodyy;
    bt.click();

  }
  
  const ff = () => {
  
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    history.push("/login");
    
  }

  const [sdb, setSDB] = useState("");
  
 
  function toggleSDB() {
      setSDB((sdb == "active") ? "" : "active") ;
  };
  
  

  return (
            
    <nav id="sidebar" className={sdb}>
				<div className="custom-menu d-lg-none">
					<button type="button" onClick={toggleSDB} id="sidebarCollapse" className="btn btn-primary">
	          <i className="fa fa-bars"></i>
	          <span className="sr-only">Toggle Menu</span>
	        </button>
        </div>
				<div className="p-4 pt-5">
		  		<h1><a href="index.html" className="logo">
          <img className = "rounded" src="https://camo.githubusercontent.com/fe63ad82cd0ea16571908365dcb3aff7a9715881cbeb881dba7def507d2790ea/68747470733a2f2f6d69726f2e6d656469756d2e636f6d2f6d61782f313336302f302a67714f33736c4c6d4762346d55656a652e676966" width="100%" height="120" />
</a></h1>
	        <ul className="list-unstyled components mb-5">

          <li className="active">
          <Link className="nav-link" aria-current="page" to="/">Home</Link>
                
	          </li>

	          <li className="active">
	            <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Login/SignUp</a>
	            <ul className="collapse list-unstyled" id="homeSubmenu">
                <li>
                <Link className="nav-link" aria-current="page" to="/login">Login</Link>
                             
                </li>
                <li>
                <Link className="nav-link" aria-current="page" to="/signup">Sign Up</Link>
               
                </li>
                <li>
                <Link className="nav-link" onClick={ff} aria-current="page" to="/login">Logout</Link>
               
                </li>
	            </ul>
	          </li>
            <li className="active">
            <Link className="nav-link" aria-current="page" to="/create">Write A Blog</Link>
               
	          </li>
            <li className="active">
              <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Pages</a>
              <ul className="collapse list-unstyled" id="pageSubmenu">
                <li>
                    <a href="#">Page 1</a>
                </li>
                <li>
                    <a href="#">Page 2</a>
                </li>
                <li>
                    <a href="#">Page 3</a>
                </li>
              </ul>
	          </li>
            <li className="active">
            <a href="https://mayurcodes.in">PortFolio</a>
           
	          </li>
            <li className="active">
              <a href="#">Contact</a>
	          </li>
	        </ul>

	        <div className="mb-5">
						<h3 className="h6">Subscribe for newsletter</h3>
						<form action="#" className="colorlib-subscribe-form">
	            <div className="form-group d-flex">
	            	<div className="icon"><span className="icon-paper-plane"></span></div>
	              <input type="text" className="form-control" placeholder="Enter Email Address"/>
	            </div>
	          </form>
					</div>

	        <div className="footer">
	        	<p> <small>  Copyright &copy; {(new Date().getFullYear())} | MayurCodes </small>

  </p>
  <img src="https://66.media.tumblr.com/d5b7f3798daf71bbbaf44f6aa0ab278b/tumblr_pdnkqq8wuu1scncwdo1_540.gif" width="100%" height="80" />

</div>



	      </div>
    	</nav>
    
    
   
    )

  
  
  
  
    /* return (
        <div>
            <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">MyBlogWorld</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item"><Link className="nav-link" to="/myblogs">My Blogs</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/signup">SignUp</Link></li>
                      
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
*/
}

export default NavBar
