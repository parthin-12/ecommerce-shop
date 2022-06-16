import React from 'react'
import ReactStars from 'react-rating-stars-component'
import profileImg from "../../images/profile.png"

const Review = ({review}) => {
    
    const ReactStarsOptions ={
        edit:false,
        color:"rgba(20,20,20,0.2)",
        activeColor:"#FF9529",
        isHalf:true,
        value:review.rating,
        size: window.innerWidth < 600 ? 22 : 25
      }

  return (
      <div className="reviewCard">
        <img src={review.image.url==="sampleUrl"?profileImg:review.image.url} alt="User" style={{width:review.image.url==="sampleUrl"?"5vmax":"4vmax",
              height:review.image.url==="sampleUrl"?"5vmax":"4vmax"}}/>
        <p>{review.name}</p>
        <ReactStars {...ReactStarsOptions} />
        <span>{review.comment}</span>
      </div>
  )
}

export default Review