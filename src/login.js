import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import login from './style/login.module.scss'
import { translate, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class Login extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      error: '',
      username: '',
      password: '',
      loading: false
    }
  }

  login(lang) {
    if (!this.state.username || !this.state.password)
      this.setState({error: this.props.t('Complete all fields')})
    else {
      this.setState({loading: true})
      this.props.login(this.state.username, this.state.password)
      .then(({data}) => {
        localStorage.setItem('token', data.login)
        this.setState({loading: false})
        this.props.history.push(`/${lang}/dashboard`);
      })
      .catch(e => this.setState({error: this.props.t(e.message), loading: false}))
    }
  }

  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    return (
      <Trans i18nKey='login'>
        <div className={`container ${login.login}`}>
          <div className={login.container}>
            <div className={login.title}>LOGIN</div>
            <div className={`${login.error} ${this.state.error || 'is-hidden'}`}>{this.state.error}</div>
            <input placeholder="Username" onKeyDown={e => {if (e.keyCode === 13) this.login(lang)}} onChange={(e) => this.setState({username: e.target.value})} className={login.input} value={this.state.username} />
            <div className={login.password}>
              <input value={this.state.password} onKeyDown={e => {if (e.keyCode === 13) this.login(lang)}} onChange={(e) => this.setState({password: e.target.value})} placeholder="Password" type={this.state.showPassword ? 'text' : 'password'} className={login.input} />
              <img src={this.state.showPassword ? '/imgs/hide.svg' : '/imgs/show.svg'} className={login.icon} onClick={() => this.setState({showPassword: !this.state.showPassword})} alt="Show/hide password"/>
            </div>
            <Link to={`/${lang}/reset-password`} className={login.forgot}>Forgot your password?</Link>
            <button className={`button ${login.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.login(lang)}>LOGIN</button>
            <hr className={login.line}/>
            <div className={login.donthave}>Don't have an account? <Link className={login.join} to={`/${lang}/join`}>Sign Up</Link></div>
          </div>
        </div>
      </Trans>
    )
  }
}


export default compose(
  graphql(gql `mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)
  }`, { props: ({ mutate }) => ({
      login: (username, password) => mutate({
        variables: { username, password }
      })
    })
  }),
  translate('login')
)(withRouter(Login))
