import React from 'react'

function Header() {
  return (
    <header>
        <div className="banner">
            <a href="https://gov.bc.ca">
                <img className='logo' src="src/frontend/public/BC_Logo_Horizontal.svg" alt="Go to the Government of British Columbia website" />
            </a>
        </div>
        <div className="other">
            <h1>Digital Privacy Impact Assessment (DPIA)<span>beta</span></h1>
            <button>Log in with IDIR</button>
        </div>
    </header>
  )
}

export default Header;