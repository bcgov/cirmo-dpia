import React from 'react'
import BCGovLogo from '../../assets/BC_Logo_Horizontal.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function Header() {
    return (
        <header>
            <div className="banner">
                <a href="https://gov.bc.ca">
                    <img
                        className="logo"
                        src={BCGovLogo}
                        alt="Go to the Government of British Columbia website"
                    />
                </a>
                <h1 className="header-h1">
                    Digital Privacy Impact Assessment (DPIA) <span>beta</span>
                </h1>
            </div>
            <div className="other">
                <a href="/" className="btn-login">
                    Log in with IDIR{' '}
                    <FontAwesomeIcon className="icon" icon={faUser} />
                </a>
            </div>
        </header>
    )
}

export default Header
