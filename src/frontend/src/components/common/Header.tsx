import React from 'react'
import BCGovLogo from '../../assets/BC_Logo_Horizontal.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'

type Props = {
    user: string | null
}
function Header({ user }: Props) {
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
            <div data-cy="login" className="other">
                {!user ? (
                    <a href="/" className="btn-login">
                        Log in with IDIR{' '}
                        <FontAwesomeIcon className="icon" icon={faUser} />
                    </a>
                ) : (
                    <p>
                        {' '}
                        {user}{' '}
                        <FontAwesomeIcon
                            className="icon"
                            icon={faChevronDown}
                        />
                    </p>
                )}
            </div>
        </header>
    )
}

export default Header
