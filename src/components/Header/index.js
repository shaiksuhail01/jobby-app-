import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'

import {FiLogOut} from 'react-icons/fi'

import {MdWork} from 'react-icons/md'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="navContainer">
      <div className="navMobileBg">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navLogoImage"
          />
        </Link>
        <ul className="navMenuList">
          <li className="navItem">
            <Link className="navLink" to="/">
              <AiFillHome size={26} color="#ffffff" />
            </Link>
          </li>
          <li className="navItem">
            <Link className="navLink" to="/jobs">
              <MdWork size={26} color="#ffffff" />
            </Link>
          </li>
          <li className="navItemLogout">
            <button
              type="button"
              className="logoutButton"
              onClick={onClickLogOut}
            >
              <FiLogOut size={26} color="#ffffff" />
            </button>
          </li>
        </ul>
      </div>
      <div className="navLargeContainer">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="navLogoImage"
          />
        </Link>
        <ul className="navMenuList">
          <li className="navItem">
            <Link className="navLink" to="/">
              Home
            </Link>
          </li>
          <li className="navItem">
            <Link className="navLink" to="/jobs">
              Jobs
            </Link>
          </li>
        </ul>
        <button
          className="logoutButtonEl"
          type="button"
          onClick={onClickLogOut}
        >
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
