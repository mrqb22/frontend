import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import header from './style/header.module.scss'
import { translate, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import get from 'lodash.get'
import onClickOutside from "react-onclickoutside"

class Header extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dropdownMenuIsActive: false,
      dropdownLangIsActive: false
    }
  }

  handleClickOutside() {
    this.setState({dropdownLangIsActive: false, dropdownMenuIsActive: false})
  }

  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    let connected = get(this.props.getIPInfo, "getIPInfo.connected", false)
    let country = get(this.props.getIPInfo, "getIPInfo.country", '')
    let ip = get(this.props.getIPInfo, "getIPInfo.ip", '')
    let shouldRedirect = false //!this.props.getUser.loading && !this.props.getUser.getUser && ['dashboard','invoices','change-email'].includes(window.location.pathname.split('/').slice(-1)[0])
    const flag = () => (<div className={`dropdown is-right ${this.state.dropdownLangIsActive && 'is-active'}`}>
      <div className={`dropdown-trigger ${header.container}`}>
        <img src={`/imgs/${lang}.svg`} className={header.flag} onMouseOver={() => this.setState({dropdownLangIsActive: true})} alt={lang} />
      </div>
      <div className="dropdown-menu" onMouseLeave={() => this.setState({dropdownLangIsActive: false})}>
        <div className={`dropdown-content ${header.dropdownMenu}`}>
          <Link to={`/en/${window.location.pathname.substring(4)}`} className="dropdown-item" onClick={() => { this.props.i18n.changeLanguage('en'); this.setState({dropdownLangIsActive: false})}}>ENGLISH</Link>
          <Link to={`/ru/${window.location.pathname.substring(4)}`} className="dropdown-item" onClick={() => { this.props.i18n.changeLanguage('ru'); this.setState({dropdownLangIsActive: false})}}>РУССКИЙ</Link>
        </div>
      </div>
    </div>)

    return (
      <div>
        {shouldRedirect && <Redirect to={`/${lang}`}/>}
      <Trans i18nKey='header'>
      <nav className={`container ${header.header}`}>
        <div className={header.container}>
          <Link to={`/${lang}`} className={header.container}>
            <img src='/imgs/logo.svg' className={header.logo} alt='muraqaba logo'/>
            <div className={header.title}>
              <div className={header.muraqaba} title={connected ? `You are connected to VPN server in ${country} (${ip})` : 'Connect to muraqaba!'}>
                <span className={`${connected && header.connected} ${header.primaryColor}`}>m</span>uraqaba
              </div>
              <div className={header.finland}>Made in Finland</div>
            </div>
          </Link>
          <div className={`is-hidden-mobile ${header.wgad}`}>
            <Link to={`/${lang}/wireguard`}>WIREGUARD</Link>
            <span className={header.linksMargin}>·</span>
            <Link to={`/${lang}/adblock`}>ADBLOCK DNS</Link>
          </div>
        </div>
        <div className={`is-hidden-mobile ${header.container}`}>
          {this.props.getUser.loading ? null : get(this.props.getUser, "getUser.username", null) ? <Link className={header.linksMargin} to={`/${lang}/dashboard`}>DASHBOARD</Link> : <><Link to={`/${lang}/login`}>LOGIN</Link>
          <Link to={`/${lang}/join`} className={`${header.linksMargin} ${header.primaryColor}`}>JOIN</Link></>}
          {flag()}
        </div>
        <div className={`is-hidden-tablet ${header.mobileMenu}`}>
          <div className={`dropdown is-right ${this.state.dropdownMenuIsActive && 'is-active'}`}>
            <div className="dropdown-trigger">
              <div className={header.menuLink} onClick={() => {this.setState({dropdownMenuIsActive: !this.state.dropdownMenuIsActive}); window.setTimeout(() => this.refs.drop.focus(), 0)}}>
                MENU
              </div>
            </div>
            <div className="dropdown-menu">
              <div className={`dropdown-content ${header.dropdownMenu}`} tabIndex={-1} ref='drop'>
                <Link to={`/${lang}/wireguard`} className="dropdown-item" onClick={() => this.setState({dropdownMenuIsActive: false})} >WIREGUARD</Link>
                <Link to={`/${lang}/adblock`} className="dropdown-item" onClick={() => this.setState({dropdownMenuIsActive: false})}>ADBLOCK DNS</Link>
                <hr className={`dropdown-divider ${header.divider}`}/>
                {get(this.props.getUser, "getUser.username", null) ? <Link to={`/${lang}/dashboard`} className="dropdown-item" onClick={() => this.setState({dropdownMenuIsActive: false})}>DASHBOARD</Link> : <><Link to={`/${lang}/login`} className="dropdown-item">LOGIN</Link>
                <Link to={`/${lang}/join`} className={`dropdown-item ${header.primaryColor}`} onClick={() => this.setState({dropdownMenuIsActive: false})}>JOIN</Link></>}
              </div>
            </div>
          </div>
          {flag()}
        </div>
      </nav>
    </Trans>
  </div>
    )
  }
}

export default compose(
  graphql(gql `query getIPInfo { getIPInfo { ip, connected, country } }`, {name: 'getIPInfo'}),
  graphql(gql `query getUser { getUser { username } }`, {name: 'getUser'}),
  translate('header')
)(onClickOutside(Header, { eventTypes: ["touchend"] }))
