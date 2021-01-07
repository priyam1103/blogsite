import React,{useEffect, useState} from 'react'
import axios from "axios";
import { Link,useNavigate } from "@reach/router";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignature,faEnvelope,faPhoneAlt,faSmileBeam,faBlog } from '@fortawesome/free-solid-svg-icons'

export default function Profile(props) {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({})
    const navigate = useNavigate();
    useEffect(() => {

        async function getBlogs() {
            await axios.get(`https://blogsite1103.herokuapp.com/api/blog/getuserblogs/${props.id}`, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("cofounder")
                }
            })
                .then((res) => {
                    setBlogs(res.data.blogs)
                    setUser(res.data.user)
                }).catch((err) => {
                navigate("/")
            })
        } 
        getBlogs();
    },[])
    return (
        <div className="profile">
            <div className="user-details">
                <p> <FontAwesomeIcon icon={faSignature} size="xs" /> {user.username}</p>
            <p><FontAwesomeIcon icon={faEnvelope} size="xs" /> {user.emailId}</p>
            <p><FontAwesomeIcon icon={faPhoneAlt} size="xs" /> {user.mobileNo}</p>
            <p><FontAwesomeIcon icon={faSmileBeam} size="xs" /> {user.age}</p>
                <p><FontAwesomeIcon icon={faBlog} size="xs" /> {blogs.length}</p>
            </div>
            <div className="myblogs">
                <p className="username">{user.username}'s blogs</p>
            {blogs.map((item, index) => (
                <Link to={`/blog/${item._id}`} key={index} className="blogcard-text">
                <div  className="blog-card">
                    <p>{item.title}</p>
                        <p className="reading-time">{item.readtime} <span>({item.tagname})</span></p>
                    <p>{item.story.substring(0,200)}.......</p>
                    </div>
                    </Link>
            ))}
                </div>
        </div>
    )
}
