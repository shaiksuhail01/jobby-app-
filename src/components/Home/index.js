import {Link} from 'react-router-dom'

import Header from '../Header'

import './index.css'

const Home = () => (
  <div className="homeContainerBg">
    <Header />
    <div className="homeContainer">
      <h1 className="mainHeading">Find The Job That Fits Your Life</h1>
      <p className="descText">
        Millions of people are searching for jobs, salary information, company
        reviews. Find the job that fits your abilities and potential.
      </p>
      <Link to="/jobs">
        <button type="button" className="findButton">
          Find Jobs
        </button>
      </Link>
    </div>
  </div>
)

export default Home
