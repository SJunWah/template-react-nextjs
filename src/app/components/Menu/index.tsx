import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Link, useLocation, useHistory } from 'react-router-dom'
import {
  Navbar,
  useTheme,
  Image,
  Button
} from '@nextui-org/react'
import { useIntl } from 'react-intl'
import { useMediaQuery } from 'react-responsive'
import { ConnectWallet } from 'components/ConnectWallet'
import LangSelector from 'components/LangSelector'
import SocialLinks from 'components/SocialLinks'
import SubMenu from 'components/SubMenu'

const ButtonHome = styled(Button) <{ height: number, width: number, bg: string }>`
height: ${({ height }) => height};
width: ${({ width }) => width};
padding: 0px;
min-width: ${({ width }) => width};
border-radius: 0px;
background-color: ${({ bg }) => bg}!important;
:hover {
    cursor: pointer;
  }
`
const Menu: React.FC = () => {
  const history = useHistory()
  const intl = useIntl()
  const { isDark } = useTheme()
  const isMobile = useMediaQuery({ query: `(max-width: 992px)` })

  const location = useLocation()
  const { pathname } = location

  const navbarToggleRef = useRef(null)
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState(
    window.location.href.split(`${window.location.origin}`)[1],
  )

  const handleSideMenu = (link) => {
    setActiveMenu(link)
    return isSideMenuOpen && navbarToggleRef?.current?.click()
  }

  const menuItems = [
    // {
    //   name: intl.formatMessage({ id: "home", defaultMessage: "Home" }),
    //   link: '/home'
    // },
    // {
    //   name: intl.formatMessage({ id: "referral", defaultMessage: "Referral" }),
    //   link: '#!'
    // },
    // {
    //   name: intl.formatMessage({ id: "home", defaultMessage: "Home" }),
    //   link: '/home'
    // },
  ]

  return (
    <>
      <Navbar isBordered={false} disableShadow disableBlur variant="static" maxWidth="fluid" css={{ zIndex: "9999" }}
        className="cs-navbar" id="cs-navbar" >
        <Navbar.Brand>
          {/* <Navbar.Toggle showIn="sm" aria-label="toggle navigation" autoFocus ref={navbarToggleRef}
            onChange={(isSelected) => setIsSideMenuOpen(isSelected)} /> */}
          {
            isMobile ?
              <ButtonHome width="40px" height="40px" bg="var(--yellowColor)" onClick={() => { history.push("/chat"); }}>
                <svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.64347 18.7992V12.795H13.4468V18.7992C13.4468 19.4596 13.9872 20 14.6477 20H18.2502C18.9107 20 19.451 19.4596 19.451 18.7992V10.3933H21.4925C22.0449 10.3933 22.309 9.7088 21.8887 9.34854L11.8497 0.306214C11.3934 -0.102071 10.6969 -0.102071 10.2406 0.306214L0.201563 9.34854C-0.206722 9.7088 0.0454541 10.3933 0.597841 10.3933H2.63927V18.7992C2.63927 19.4596 3.17965 20 3.84011 20H7.44263C8.10309 20 8.64347 19.4596 8.64347 18.7992Z" fill="black" />
                </svg>
              </ButtonHome>
              :
              <Image
                src="/images/jinko-logo.png"
                alt="Whitelabel Image"
                width="150px"
                onClick={() => { window.location.href = `${process.env.REACT_APP_LANDING_LINK}`; }} style={{ cursor: "pointer" }}
              />
          }
        </Navbar.Brand>
        <Navbar.Content hideIn="sm" className="upper-item-navbar">
          {menuItems.map((mItem) => (
            <Navbar.Link key={mItem.name} href={mItem.link} className={pathname.includes(mItem.link) ? "active" : ""}>
              {mItem.name}
            </Navbar.Link>
          ))}
        </Navbar.Content>
        <Navbar.Content>
          <>
            <LangSelector />
            <ConnectWallet />
          </>
        </Navbar.Content>
        <Navbar.Collapse>
          {menuItems.map((item) => (
            <Navbar.CollapseItem key={item.name} isActive={item.link === activeMenu} css={{
              color: 'var(--whiteColor)',
              justifyContent: 'center',
            }}>
              <Link to={item.link} onClick={() => handleSideMenu(item.link)} className={pathname.includes(item.link) ? "active" : ""}>
                {item.name}
              </Link>
            </Navbar.CollapseItem>
          ))}
        </Navbar.Collapse>
      </Navbar>
      {/* {isMobile ? null :
        <Navbar isBordered disableShadow disableBlur variant="static" className="cs-navbar2">
          <Navbar.Content hideIn="sm">
            {menuItems.map((mItem) => (
              <Navbar.Link key={mItem.name} href={mItem.link} className={pathname.includes(mItem.link) ? "active" : ""}>
                {mItem.name}
              </Navbar.Link>
            ))}
          </Navbar.Content>
        </Navbar>
      } */}
    </>
  )
}

export default Menu