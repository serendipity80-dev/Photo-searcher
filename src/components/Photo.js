import React,{useState, useEffect} from 'react';
// import axios from 'axios';
import {FaSearch} from 'react-icons/fa';
import SearchPhoto from './SearchPhoto';
const clientID = `?client_id=${process.env.REACT_APP_API_KEY}`;
const pageUrl = `https://api.unsplash.com/photos/`
const searchURL = `https://api.unsplash.com/search/photos/` 

const Photo = () => {
     const [query, setQuery] = useState("");
     const [photos,setPhotos] = useState([]);
     const [page, setPage] = useState(0);
     const [loading, setLoading] = useState(false);
 
    const getPhoto = async () => {
        setLoading(true)
        let url;
        const urlPage = `&page=${page}`
        const urlQuery = `&query=${query}`

        if(query) {
            url = `${searchURL}${clientID}${urlPage}${urlQuery}`
        } else {
            url = `${pageUrl}${clientID}${urlPage}`
        }
try {
   const response = await fetch(url)
   const data = await response.json()
   setPhotos((oldPhotos) => {
       if(query && page ===1){
           return data.results
       }else if (query){
return [...oldPhotos, ...data.results]
       } else {
           return [...oldPhotos, ...data]
       }
   }) 
   setLoading(false)
} catch (error) {
    console.log(error)
    setLoading(false)
}
    }
 useEffect(() => {
     getPhoto()
     //eslint-disable-next-line
 }, [page])

useEffect(() => {
    const scroll = window.addEventListener('scroll', () => {
         // eslint-disable-next-line
        if(
           (!loading && window.innerHeight + window.scrollY) >= document.body.scrollHeight -2
        ) {
            setPage((oldPage) => {
                return oldPage +1
            })
        }
    })
    return () => window.removeEventListener('scroll')
    // eslint-disable-next-line 
},[])
const handleSubmit = e => {
    e.preventDefault();
    setPage(1)
}

    return (
        <main>
        <section className="search">
            <form className="search-form">
                <input type="text"
                            placeholder="search"
                            value={query}
                            onChange={(e)=> setQuery(e.target.value)}
                            className="search-input"/>
                            <button type="submit"
                                    onClick={handleSubmit}
                                    className="btn-submit">
                                        <FaSearch/>
                                    </button>
            </form>
        </section>
        <section className="photos">
<div className="photos-center">
    {photos.map((image, index) => {
        return <SearchPhoto key={index} {...image}/>
    })}
</div>
{loading && <h2 className="loading">Loading...</h2>}
        </section>
     </main>
    )
}

export default Photo
