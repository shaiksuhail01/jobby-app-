import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {MdLocationOn, MdWork} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'

import {FiExternalLink} from 'react-icons/fi'

import Header from '../Header'

import SimilarJobs from '../SimilarJobs'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetailsList: [],
    similarJobsList: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    this.setState({apiStatus: apiStatusConstants.inProgress})

    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      console.log(fetchedData)
      const updateSkills = fetchedData.job_details.skills.map(eachSkill => ({
        name: eachSkill.name,
        skillImageUrl: eachSkill.image_url,
      }))
      const updatedJobDetail = {
        companyLogoUrl: fetchedData.job_details.company_logo_url,
        companyWebsiteUrl: fetchedData.job_details.company_website_url,
        employmentType: fetchedData.job_details.employment_type,
        id: fetchedData.job_details.id,
        jobDescription: fetchedData.job_details.job_description,
        lifeAtCompanyDescription:
          fetchedData.job_details.life_at_company.description,
        lifeAtCompanyImageUrl:
          fetchedData.job_details.life_at_company.image_url,
        location: fetchedData.job_details.location,
        packagePerAnnum: fetchedData.job_details.package_per_annum,
        rating: fetchedData.job_details.rating,
        skills: updateSkills,
        title: fetchedData.job_details.title,
      }
      console.log(updatedJobDetail)
      const updateSimilarJobs = fetchedData.similar_jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      console.log(updateSimilarJobs)
      this.setState({
        jobDetailsList: updatedJobDetail,
        similarJobsList: updateSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onClickRetryJobButton = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getJobDetails)
  }

  onClickSimilarJob = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getJobDetails)
  }

  renderJobSpecificDetailsFailure = () => (
    <div className="jobDetailsFailureContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failureImage"
      />
      <h1 className="errorText">Oops! Something Went Wrong</h1>
      <p className="errorPara">
        We Cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retryButton"
        onClick={this.onClickRetryJobButton}
      >
        Retry
      </button>
    </div>
  )

  renderJobSpecificDetailsLoading = () => (
    <div className="loader-container-job-details" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state
    return (
      <>
        <h1 className="similarJobText">Similar Jobs</h1>
        <ul className="similarJobListContainer">
          {similarJobsList.map(eachJob => (
            <SimilarJobs
              key={eachJob.id}
              jobDetails={eachJob}
              onClickSimilarJob={this.onClickSimilarJob}
            />
          ))}
        </ul>
      </>
    )
  }

  renderJobSpecificDetailsSuccess = () => {
    const {jobDetailsList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompanyDescription,
      lifeAtCompanyImageUrl,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsList
    return (
      <>
        <div className="listItemContainer2">
          <div className="companyLogoContainer">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="descriptionVisitContainer">
            <h1 className="titleText2">Description</h1>

            <a href={companyWebsiteUrl} className="linkContainer">
              Visit <FiExternalLink size={15} className="linkIcon" />
            </a>
          </div>
          <p className="descriptionText">{jobDescription}</p>
          <h1 className="titleText2">Skills</h1>
          <div className="skillsContainer">
            {skills.map(eachSkill => (
              <div className="skillItemContainer">
                <img
                  src={eachSkill.skillImageUrl}
                  className="skillImage"
                  alt={eachSkill.name}
                />
                <p className="skillName">{eachSkill.name}</p>
              </div>
            ))}
          </div>
          <h1 className="titleText2">Life at Company</h1>
          <div className="lifeAtCompanyContainer">
            <p className="descriptionText2">{lifeAtCompanyDescription}</p>
            <img
              src={lifeAtCompanyImageUrl}
              alt="life at company"
              className="lifeAtCompanyImage"
            />
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderJobSpecificDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobSpecificDetailsSuccess()
      case apiStatusConstants.failure:
        return this.renderJobSpecificDetailsFailure()
      case apiStatusConstants.inProgress:
        return this.renderJobSpecificDetailsLoading()

      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobDetailsRouteContainer">
          {this.renderJobSpecificDetails()}
        </div>
      </>
    )
  }
}

export default JobDetails
