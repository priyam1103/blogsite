import React,{useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "@reach/router"
export default function Blog(props) {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        async function getblog() {
            setLoading(true);
            await axios.get(`https://blogsite1103.herokuapp.com/api/blog/getblog/${props.id}`)
                .then((res) => {
                    console.log(res)
                    setLoading(false);
                    setBlog(res.data.blog)
                }).catch((err) => {
                    console.log(err.response)
                })
        }
        getblog()
    }, [])

    return (
        <>
            {loading && <div className="loader message"></div>}
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
