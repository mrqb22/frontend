import React, { PureComponent } from 'react'
import { translate, Trans } from 'react-i18next'
import { graphql, compose, withApollo } from 'react-apollo'
import { gql } from 'apollo-boost'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import get from 'lodash.get'
import TimeAgo from 'react-timeago'
import ruStrings from 'react-timeago/lib/language-strings/ru'
import enStrings from 'react-timeago/lib/language-strings/en'
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter'
import fileDownload from 'downloadjs'
import dashboard from './style/dashboard.module.scss'

class Dashboard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      months: 1,
      country: 'SE',
      exitCountry: 'SE',
      dnsType: 'DNS_ADBLOCK',
      loading: false,
      loadingBuy: false
    }
  }

  logout(lang) {
    localStorage.removeItem('token')
    this.props.client.resetStore()
    this.props.history.push(`/${lang}`)
  }

  getInvoice() {
    this.setState({loadingBuy: true})
    this.props.getInvoice(this.state.months, 'CRYPTO')
    .then(({data}) => window.location.replace(data.getInvoice))
    .catch(e => this.setState({error: this.props.t(e.message), loadingBuy: false}))
  }

  getConfig() {
    this.props.getConfig(this.state.country, this.state.exitCountry, this.state.dnsType)
    .then(({data}) => fileDownload(Buffer.from(data.getConfig, 'base64'), `${this.state.country}${this.state.exitCountry !== this.state.country ? '-' + this.state.exitCountry : ''}-${this.state.dnsType}.conf`.toLowerCase(), 'text/plain'))
  }
  getAllConfigsZIP() {
    this.props.getAllConfigsZIP()
    .then(({data}) => fileDownload(Buffer.from(data.getAllConfigsZIP, 'base64'), 'configs.zip', 'application/zip'))
  }

  handleChange(e, type) {
    this.setState({[type]: e.target.value})
  }

  async deactivate() {
    let answer = prompt('Please, enter - DEACTIVATE to confirm account deactivation')
    if (answer === 'DEACTIVATE') {
      await this.props.deleteAccount()
      this.logout()
    }
    else if (answer)
      this.deactivate()
  }

  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    return (
      <Trans i18nKey='dashboard'>
        <div className={`container ${dashboard.dashboard}`}>
          <div className={dashboard.cp}>
            <div className={dashboard.hello}>
              Hello, {get(this.props.getUser, 'getUser.username', '')} <span className={dashboard.logout}>(<span onClick={() => this.logout(lang)}>logout</span>)</span>
            </div>
            <div className={dashboard.expires}>
              Your VPN access expires: <TimeAgo date={get(this.props.getExpTime, 'getExpTime')} formatter={buildFormatter(lang === 'ru' ? ruStrings : enStrings)}  />
            </div>
            <div className={dashboard.cpContainer}>
              <div className={dashboard.extend}>Extend access for</div>
              <div className={dashboard.select}>
                <select value={this.state.months} onChange={(e) => this.handleChange(e, 'months')}>
                  <option value={1}>1 month - 10€</option>
                  <option value={2}>2 month - 20€</option>
                  <option value={3}>3 month - 30€</option>
                  <option value={4}>4 month - 40€</option>
                  <option value={5}>5 month - 50€</option>
                  <option value={6}>6 month - 60€</option>
                </select>
              </div>
              <button className={`button ${dashboard.button} ${this.state.loadingBuy && 'is-loading'}`} onClick={() => this.getInvoice()}>BUY</button>
            </div>
            <div className={`is-hidden-mobile ${dashboard.cpLinks}`}>
              <Link to='change-email'>Change E-Mail</Link>
              <Link to='change-password'>Change password</Link>
              <Link to='invoices'>Invoices</Link>
              <div onClick={() => this.deactivate()}>Deactivate</div>
            </div>
          </div>
          <div className={dashboard.configs}>
            <div className={dashboard.configTitle}>CONFIGURATION FILES</div>
            <div className={dashboard.configInputs}>
              <div className={dashboard.configSelectContainer}>
                <div className={dashboard.configSelectTitle}>Connect Server</div>
                <div className={dashboard.configSelect}>
                  <select value={this.state.country} onChange={(e) => this.handleChange(e, 'country')}>
                    <option disabled>Select Server</option>
                    <option value='SE'>Sweden</option>
                  </select>
                </div>
              </div>
              <div className={dashboard.configSelectContainer}>
                <div className={dashboard.configSelectTitle}>Exit Server</div>
                <div className={dashboard.configSelect}>
                  <select value={this.state.exitCountry} onChange={(e) => this.handleChange(e, 'exitCountry')}>
                    <option disabled>Select Server</option>
                    <option value='SE'>Sweden</option>
                  </select>
                </div>
              </div>
              <div className={dashboard.configSelectContainer}>
                <div className={dashboard.configSelectTitle}>DNS type</div>
                <div className={dashboard.configSelect}>
                  <select value={this.state.dnsType} onChange={(e) => this.handleChange(e, 'dnsType')}>
                    <option disabled>Select DNS &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</option>
                    <option value='DNS_ADBLOCK'>AdBlock</option>
                    <option value='DNS_SIMPLE'>Regular</option>
                  </select>
                </div>
              </div>
            </div>
            <div className={dashboard.buttons}>
              <button className={`button ${dashboard.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.getConfig()}>GET CONFIG</button>
              <button className={`button is-outlined is-primary ${dashboard.outline} ${dashboard.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.getAllConfigsZIP()}>GET ALL CONFIGS</button>
            </div>
          </div>
          <div className={`is-hidden-tablet ${dashboard.cpLinks}`}>
            <Link to='change-email'>Change E-Mail</Link>
            <Link to='change-password'>Change password</Link>
            <Link to='invoices'>Invoices</Link>
            <div onClick={() => this.deactivate()}>Deactivate</div>
          </div>
        </div>
      </Trans>
    )
  }
}

export default compose(
  graphql(gql `query getUser { getUser { username } }`, {name: 'getUser', options: { fetchPolicy: 'network-only' }}),
  graphql(gql `mutation getConfig($country: Country!, $exitCountry: Country!, $dnsType: DNSType!) {
    getConfig(country: $country, exitCountry: $exitCountry, dnsType: $dnsType)
  }`, { props: ({ mutate }) => ({
      getConfig: (country, exitCountry, dnsType) => mutate({
        variables: { country, exitCountry, dnsType }
      })
    })
  }),
  graphql(gql `mutation getAllConfigsZIP {
    getAllConfigsZIP
  }`, { props: ({ mutate }) => ({
      getAllConfigsZIP: (country, dnsType) => mutate()
    })
  }),
  graphql(gql `mutation deleteAccount {
    deleteAccount
  }`, { props: ({ mutate }) => ({
      deleteAccount: () => mutate()
    })
  }),
  graphql(gql `query getExpTime { getExpTime }`, {name: 'getExpTime'}),
  graphql(gql `mutation getInvoice($months: Int!, $paymentType: PaymentType!) {
    getInvoice(months: $months, paymentType: $paymentType)
  }`, { props: ({ mutate }) => ({
      getInvoice: (months, paymentType) => mutate({
        variables: { months, paymentType }
      })
    })
  }),
  translate('dashboard')
)(withRouter(withApollo(Dashboard)))
