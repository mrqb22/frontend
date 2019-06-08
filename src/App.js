import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Loadable from 'react-loadable'
import './style/app.scss'
import Header from './header'
import Footer from './footer'

export default class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <>
          <div style={{minHeight: '100vh'}}>
            <Header/>
            <Switch>
              <Route exact path='/:lng?/' component={Loadable({loader: () => import('./main'), loading: () => null})}/>
              <Route exact path='/:lng/join' component={Loadable({loader: () => import('./signup'), loading: () => null})}/>
              <Route exact path='/:lng/login' component={Loadable({loader: () => import('./login'), loading: () => null})}/>
              <Route exact path='/:lng/tos' component={Loadable({loader: () => import('./tos'), loading: () => null})}/>
              <Route exact path='/:lng/privacy' component={Loadable({loader: () => import('./privacy'), loading: () => null})}/>
              <Route exact path='/:lng/canary' component={Loadable({loader: () => import('./canary'), loading: () => null})}/>
              <Route exact path='/:lng/faq' component={Loadable({loader: () => import('./faq'), loading: () => null})}/>
              <Route exact path='/:lng/guides' component={Loadable({loader: () => import('./guides'), loading: () => null})}/>
              <Route exact path='/:lng/reset-password' component={Loadable({loader: () => import('./resetPsw'), loading: () => null})}/>
              <Route exact path='/:lng?/reset/token/:token' component={Loadable({loader: () => import('./changePsw'), loading: () => null})}/>
              <Route exact path='/:lng/change-password' component={Loadable({loader: () => import('./changePsw'), loading: () => null})}/>
              <Route exact path='/:lng/change-email' component={Loadable({loader: () => import('./changeEmail'), loading: () => null})}/>
              <Route exact path='/:lng/dashboard' component={Loadable({loader: () => import('./dashboard'), loading: () => null})}/>
              <Route exact path='/:lng/invoices' component={Loadable({loader: () => import('./invoices'), loading: () => null})}/>
              <Route component={Loadable({loader: () => import('./404'), loading: () => null})}/>
            </Switch>
          </div>
          <Footer/>
        </>
      </BrowserRouter>
    )
  }
}
