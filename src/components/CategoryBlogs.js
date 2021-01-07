import React,{useEffect, useState} from 'react'
import axios from "axios";
import {Link} from "@reach/router"
export default function CategoryBlogs(props) {
    const [loading, setLoading] = useState(false);
    const [blogs, setBlogs] = useState([]);
    useEffect(() => {
        async function getBlogs() {
            setLoading(true);
            await axios.get(`https://blogsite1103.herokuapp.com/api/blog/getcategoryblogs/${props.tagname}`)
                .then((res) => {
                    setLoading(false);
                    setBlogs(res.data.blogs)
            })
        } 
        getBlogs()
    },[])
    return (
        <div>
            {loading ? <div className="loader message"></div> : <>
            {blogs.length === 0 ?
            <p className="message">No blogs yet</p>: <>
                {blogs.map((item, index) => (
                    <Link to={`/blog/${item._id}`} key={index} className="blogcard-text">
                        <div className="blog-card">
                            <p>{item.title}</p>
                            <p className="reading-time">{item.readtime} <span>({item.tagname})</span></p>
                            <p>{item.story.substring(0, 200)}.......</p>
                        </div>
                    </Link>
                )).reverse()}
            </>}
            </>}
     
        </div>
    )
}
