import React  from 'react'

const SearchPhoto =({
      urls: { regular },
      alt_description,
      likes,
      user: {
           name,
          portfolio_url,
          profile_image: { medium },
      },
  }) => {
return (
<div className="search-photo">
    <img src={regular} alt={alt_description}/>
    <div className="photo-info">
        <div>
            <h4>{name}</h4>
            <p>{likes} likes</p>
        </div>
        <a href={portfolio_url}>
            <img src={medium} alt="" className="users-info"/>
        </a>
    </div>
</div>
)
  }
    


export default SearchPhoto
