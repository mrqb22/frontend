import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'
import { GRAPHQL_URL } from './config'

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.register()
