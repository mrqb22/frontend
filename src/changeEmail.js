import React, { PureComponent } from 'react'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import reset from './style/reset.module.scss'
import { translate, Trans } from 'react-i18next'
import get from 'lodash.get'

class ChangeEmail extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: '',
      success: false,
    }
  }

  changeEmail() {
    if (!this.state.email)
      this.setState({error: this.props.t('Complete all fields')})
    else {
      this.setState({loading: true})
      this.props.changeEmail(this.state.email)
      .then(({data}) => this.setState({loading: false, success: true}))
      .catch(e => this.setState({error: this.props.t(e.message), loading: false}))
    }
  }

  render() {
    return (
      <Trans i18nKey='login'>
        <div className={`container ${reset.reset}`}>
          <div className={reset.container}>
            <div className={reset.title}>CHANGE EMAIL</div>
            <div className={reset.please}>{this.state.success ? 'E-Mail changed' : `Your current email is ${this.props.getUser.loading ? '...' : get(this.props.getUser, 'getUser.email', '') || 'not defined'}. Please, enter new e-mail`}</div>
            {this.state.success || <><div className={`${reset.error} ${this.state.error || 'is-hidden'}`}>{this.state.error}</div>
            <input value={this.state.email} onKeyDown={e => {if (e.keyCode === 13) this.changeEmail()}} onChange={(e) => this.setState({email: e.target.value})} placeholder="Enter new e-mail" type='text' className={reset.input} />
            <button className={`button ${reset.button} ${this.state.loading && 'is-loading'}`} onClick={() => this.changeEmail()}>CHANGE</button></>}
          </div>
        </div>
      </Trans>
    )
  }
}


export default compose(
  graphql(gql `query getUser { getUser { _id, email } }`, {name: 'getUser', options: { fetchPolicy: 'network-only' }}),
  graphql(gql `mutation changeEmail($newEmail: String!) {
    changeEmail(newEmail: $newEmail) {_id, email}
  }`, { props: ({ mutate }) => ({
      changeEmail: (newEmail) => mutate({
        variables: { newEmail }
      })
    })
  }),
  translate('reset')
)(ChangeEmail)
