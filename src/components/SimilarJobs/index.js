import {Link} from 'react-router-dom'

import {AiFillStar} from 'react-icons/ai'

import {MdWork, MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilarJobs = props => {
  const {jobDetails, onClickSimilarJob} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobDetails

  const onClickJob = () => {
    onClickSimilarJob()
  }

  return (
    <Link to={`/jobs/${id}`} className="navLink" onClick={onClickJob}>
      <li className="listItemContainer3">
        <div className="companyLogoContainer">
          <img
            src={companyLogoUrl}
            alt=" similar job company logo"
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
        <h1 className="titleText">Description</h1>
        <p className="descriptionText">{jobDescription}</p>
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
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobs
