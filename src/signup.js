import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import signup from './style/signup.module.scss'
import { translate, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

class SignUp extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      showPassword: false,
      error: '',
      username: '',
      password: '',
      email: '',
      loading: false
    }
  }

  signUp(lang) {
    let ref = localStorage.getItem('ref') || null
    if (!this.state.username || !this.state.password)
      this.setState({error: this.props.t('Complete all fields')})
    else {
      this.setState({loading: true})
      this.props.signUp(this.state.username, this.state.password, this.state.email, ref)
      .then(({data}) => {
        localStorage.setItem('token', data.signUp)
        this.setState({loading: false})
        this.props.history.push(`/${lang}/dashboard`);
      })
      .catch(e => this.setState({error: this.props.t(e.message), loading: false}))
    }
  }

  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    return (
      <Trans i18nKey='signup'>
        <div className={`container ${signup.signup}`}>
          <div className={signup.container}>
            <div className={signup.title}>REGISTRATION</div>
            <div className={`${signup.error} ${this.state.error || 'is-hidden'}`}>{this.state.error}</div>
            <input placeholder="Username" onKeyDown={e => {if (e.keyCode === 13) this.signUp(lang)}} onChange={(e) => this.setState({username: e.target.value})} className={signup.input} value={this.state.username} />
            <div className={signup.password}>
              <input value={this.state.password} onKeyDown={e => {if (e.keyCode === 13) this.signUp(lang)}} onChange={(e) => this.setState({password: e.target.value})} placeholder="Password" type={this.state.showPassword ? 'text' : 'password'} className={signup.input} />
              <img src={this.state.showPassword ? '/imgs/hide.svg' : '/imgs/show.svg'} className={signup.icon} onClick={() => this.setState({showPassword: !this.state.showPassword})} alt="Show/hide password"/>
            </div>
            <input value={this.state.email} onKeyDown={e => {if (e.keyCode === 13) this.signUp(lang)}} onChange={(e) => this.setState({email: e.target.value})} placeholder="E-Mail (optional)" type='email' className={signup.input} />
            <div className={signup.agree}>By signing up I agree to <Link to={`/${lang}/tos`} className={signup.tos}>Terms of Service</Link></div>
            <button className={`button ${signup.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.signUp(lang)}>JOIN</button>
            <hr className={signup.line}/>
            <div className={signup.already}>Already have an account? <Link className={signup.login} to={`/${lang}/login`}>Login</Link></div>
          </div>
        </div>
      </Trans>
    )
  }
}


export default compose(
  graphql(gql `mutation signUp($username: String!, $password: String!, $email: String, $ref: String) {
    signUp(username: $username, password: $password, email: $email, ref: $ref)
  }`, { props: ({ mutate }) => ({
      signUp: (username, password, email, ref) => mutate({
        variables: { username, password, email, ref }
      })
    })
  }),
  translate('signup')
)(withRouter(SignUp))
