import React,{useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "@reach/router"
export default function Blog(props) {
    const [blog, setBlog] = useState(null);
    useEffect(() => {
        async function getblog() {
            await axios.get(`http://localhost:3004/api/blog/getblog/${props.id}`)
                .then((res) => {
                    console.log(res)
                    setBlog(res.data.blog)
                }).catch((err) => {
                    console.log(err.response)
                })
        }
        getblog()
    }, [])

    return (
    <>
        { blog != null &&
        <div className="blog-page">
           
            <div className="blog-postedby">
               <span> Posted by -
               </span>
                   <Link to={`/profile/${blog.postedby.id}`}> <p className="username-postedby">     {blog.postedby.name}</p></Link>
                    <p className="emailid-postedby">{blog.postedby.emailId}</p>
            </div>
            <div className="blog-content">
                <p className="title">{blog.title}</p>
                <p className="reading-time">{blog.readtime}</p>
                <p>{blog.story}</p>
            </div>
            
        </div>
            }
            </>
    )
}
