import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import reset from './style/reset.module.scss'
import { translate, Trans } from 'react-i18next'

class ChangePsw extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      newPassword: '',
      success: false,
      showPassword: false
    }
  }

  changePassword() {
    let token = this.props.match.params.token || null
    if (!this.state.newPassword)
      this.setState({error: this.props.t('Complete all fields')})
    else {
      this.setState({loading: true})
      this.props.changePassword(this.state.newPassword, token)
      .then(({data}) => {
        localStorage.setItem('token', data.changePassword)
        this.setState({loading: false, success: true})
      })
      .catch(e => this.setState({error: this.props.t(e.message), loading: false}))
    }
  }

  render() {
    return (
      <Trans i18nKey='login'>
        <div className={`container ${reset.reset}`}>
          <div className={reset.container}>
            <div className={reset.title}>CHANGE PASSWORD</div>
            <div className={reset.please}>{this.state.success ? 'Password changed' : 'Please, enter new password'}</div>
            {this.state.success || <><div className={`${reset.error} ${this.state.error || 'is-hidden'}`}>{this.state.error}</div>
            <div className={reset.password}>
              <input value={this.state.newPassword} onKeyDown={e => {if (e.keyCode === 13) this.changePassword()}} onChange={(e) => this.setState({newPassword: e.target.value})} placeholder="Enter new password" type={this.state.showPassword ? 'text' : 'password'} className={reset.input} />
              <img src={this.state.showPassword ? '/imgs/hide.svg' : '/imgs/show.svg'} className={reset.icon} onClick={() => this.setState({showPassword: !this.state.showPassword})} alt="Show/hide password"/>
            </div>
            <button className={`button ${reset.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.changePassword()}>CHANGE</button></>}
          </div>
        </div>
      </Trans>
    )
  }
}


export default compose(
  graphql(gql `mutation changePassword($newPassword: String!, $resetPasswordToken: String) {
    changePassword(newPassword: $newPassword, resetPasswordToken: $resetPasswordToken)
  }`, { props: ({ mutate }) => ({
      changePassword: (newPassword, resetPasswordToken) => mutate({
        variables: { newPassword, resetPasswordToken }
      })
    })
  }),
  translate('reset')
)(ChangePsw)
