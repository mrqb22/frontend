import React, { PureComponent } from 'react'
import article from './style/article.module.scss'

export default class ToS extends PureComponent {
  render() {
    return (
        <div className={`container ${article.container}`}>
          <div className={article.title}>TERMS OF SERVICE</div>
          <div className={article.update}>last updated 20 Jul 2018</div>
          <div>These are the terms of service you are agreeing to when you subscribe and/or are using the services of Muraqaba. Please note that in this agreement, the term "You" means you the "Subscriber/User", and the term "We" or "Our" means Muraqaba, its owners, employees, agents and any others involved with Muraqaba.</div>
          <div className={article.subtitle}>PRIVACY POLICY</div>
          <div>By using Muraqaba you agree to our Privacy Policy which can be found here: <a href='https://muraqaba.io/privacy' className={article.link}>https://muraqaba.io/privacy</a></div>
          <div className={article.subtitle}>PAYMENTS</div>
          <div>All payments are made in advance. The service will be automatically cancelled if the user doesn't renew his account before expiration date.</div>
          <div className={article.subtitle}>REFUND POLICY</div>
          <div>Usually we do not offer refunds but encourage you to use 1-day free trial. In exceptional circumstances e.g. there is a technical issue which prevents you from connecting, we may refund your account.</div>
          <div className={article.subtitle}>LIMITED WARRANTIES AND LIABILITY</div>
          <div>Usually we do not offer refunds but encourage you to use 1-day free trial. In exceptional circumstances e.g. there is a technical issue which prevents you from connecting, we may refund your account.</div>
          <div className={article.subtitle}>MODIFICATIONS OF TERMS OF SERVICE</div>
          <div>Within the limits of applicable law, the company reserves the right to review and change this agreement at any time. You are responsible for regularly reviewing these Terms and Conditions. Continued use of the Service after such changes shall constitute your consent to such changes.</div>
        </div>
    )
  }
}
