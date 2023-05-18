import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'

import Profile from '../Profile'
import Header from '../Header'

import JobsCard from '../JobsCard'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    employmentTypeList: [],
    salaryRange: '',
    searchInput: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {employmentTypeList, salaryRange, searchInput} = this.state
    const employmentStrings = employmentTypeList.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentStrings}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onChangeJobSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIconButton = () => {
    this.getJobs()
  }

  onChangeType = event => {
    if (event.target.checked === true) {
      this.setState(
        prevState => ({
          employmentTypeList: [
            ...prevState.employmentTypeList,
            event.target.value,
          ],
        }),
        this.getJobs,
      )
    } else {
      const {employmentTypeList} = this.state
      const updateEmploymentTypeList = employmentTypeList.filter(
        eachType => eachType !== event.target.value,
      )
      this.setState(
        {employmentTypeList: updateEmploymentTypeList},
        this.getJobs,
      )
    }
  }

  onChangeRadio = event => {
    this.setState({salaryRange: event.target.value}, this.getJobs)
  }

  onClickRetryJobButton = () => {
    this.setState({apiStatus: apiStatusConstants.initial}, this.getJobs)
  }

  renderJobDetails = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobsListContainer">
            {jobsList.map(eachJob => (
              <JobsCard key={eachJob.id} jobItemDetails={eachJob} />
            ))}
          </ul>
        ) : (
          <div className="noJobsContainer">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="noJobsImage"
            />
            <h1 className="errorText">No Jobs Found</h1>
            <p className="errorPara">
              We could not find any jobs. Try other filters.
            </p>
          </div>
        )}
      </>
    )
  }

  renderJobLodingView = () => (
    <div className="job-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobFailureView = () => (
    <div className="jobsFailureContainer">
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

  renderJobSpecificDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.inProgress:
        return this.renderJobLodingView()
      case apiStatusConstants.failure:
        return this.renderJobFailureView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="jobsContainer">
        <Header />
        <div className="jobsFullContainer">
          <div>
            <div className="searchInputContainer">
              <input
                type="search"
                placeholder="Search"
                value={searchInput}
                className="searchInputEl"
                onChange={this.onChangeJobSearchInput}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="searchButton"
                onClick={this.onClickSearchIconButton}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>
            <Profile />
            <hr className="hrLine" color="#b6c5ff" />
            <div className="typeContainer">
              <h1 className="typeHeadingText">Type of Employment</h1>
              {employmentTypesList.map(eachType => (
                <div className="checkboxContainer">
                  <input
                    type="checkbox"
                    id={eachType.employmentTypeId}
                    value={eachType.employmentTypeId}
                    onChange={this.onChangeType}
                  />
                  <label
                    htmlFor={eachType.employmentTypeId}
                    className="checkboxLabelText"
                  >
                    {eachType.label}
                  </label>
                </div>
              ))}
            </div>
            <hr className="hrLine" color="#b6c5ff" />
            <div className="salaryContainer">
              <h1 className="typeHeadingText">Salary Range</h1>
              {salaryRangesList.map(eachSalary => (
                <div className="radioContainer">
                  <input
                    type="radio"
                    id={eachSalary.salaryRangeId}
                    value={eachSalary.salaryRangeId}
                    name="Salary"
                    onChange={this.onChangeRadio}
                  />
                  <label
                    className="checkboxLabelText"
                    htmlFor={eachSalary.salaryRangeId}
                  >
                    {eachSalary.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {this.renderJobSpecificDetails()}
        </div>
      </div>
    )
  }
}

export default Jobs
