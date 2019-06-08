import React, { PureComponent } from 'react'
import notfound from './style/notfound.module.scss'

export default class NotFound extends PureComponent {
  render() {
    return (
        <div className={`container is-fullheight hero ${notfound.container}`}>
          <div className={notfound.title}>404 NOT FOUND</div>
        </div>
    )
  }
}
