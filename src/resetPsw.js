import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import reset from './style/reset.module.scss'
import { translate, Trans } from 'react-i18next'

class ResetPsw extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      success: false
    }
  }

  resetPassword() {
    if (!this.state.email)
      this.setState({error: this.props.t('Complete all fields')})
    else {
      this.setState({loading: true})
      this.props.resetPassword(this.state.email)
      .then(({data}) => {
        this.setState({loading: false, success: true})
      })
      .catch(e => this.setState({error: this.props.t(e.message), loading: false}))
    }
  }

  render() {
    return (
      <Trans i18nKey='reset'>
        <div className={`container ${reset.reset}`}>
          <div className={reset.container}>
            <div className={reset.title}>RESET PASSWORD</div>
            <div className={reset.please}>{this.state.success ? 'Follow link sent in e-mail' : 'Enter e-mail associated with your account'}</div>
            {this.state.success || <><div className={`${reset.error} ${this.state.error || 'is-hidden'}`}>{this.state.error}</div>
            <input onKeyDown={e => {if (e.keyCode === 13) this.resetPassword()}} onChange={(e) => this.setState({email: e.target.value})} className={reset.input} value={this.state.email} placeholder="Enter e-mail"/>
            <button className={`button ${reset.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.resetPassword()}>RESET</button></>}
          </div>
        </div>
      </Trans>
    )
  }
}


export default compose(
  graphql(gql `mutation resetPassword($email: String!) {
    resetPassword(email: $email)
  }`, { props: ({ mutate }) => ({
      resetPassword: (email) => mutate({
        variables: { email }
      })
    })
  }),
  translate('reset')
)(ResetPsw)
