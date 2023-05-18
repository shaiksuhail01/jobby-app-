import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdLocationOn, MdWork} from 'react-icons/md'

import './index.css'

const JobsCard = props => {
  const {jobItemDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobItemDetails
  return (
    <Link to={`/jobs/${id}`} className="navLink">
      <li className="listItemContainer">
        <div className="companyLogoContainer">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="companyLogo"
          />
          <div className="titleRatingContainer">
            <h1 className="titleText">{title}</h1>
            <div className="ratingContainer">
              <AiFillStar color="#fbbf24" />
              <p className="ratingText">{rating}</p>
            </div>
          </div>
        </div>
        <div className="locationDetailsContainer">
          <div className="locationAndTypeContainer">
            <div className="locationContainer">
              <MdLocationOn color="#ffffff" />
              <p className="locationText">{location}</p>
            </div>
            <div className="locationContainer">
              <MdWork color="#ffffff" />
              <p className="locationText">{employmentType}</p>
            </div>
          </div>
          <p className="packageText">{packagePerAnnum}</p>
        </div>
        <hr className="hrLine" color="#b6c5ff" />
        <h1 className="titleText">Description</h1>
        <p className="descriptionText">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsCard
