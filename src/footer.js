import React, { PureComponent } from 'react'
import { compose } from 'react-apollo'
import footer from './style/footer.module.scss'
import { translate, Trans } from 'react-i18next'
import { Link } from 'react-router-dom'

class Footer extends PureComponent {
  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    return (
      <div>
      <Trans>
        <footer className={`container ${footer.footer}`}>
          <div className={footer.links}>
            <div className={footer.column}>
              <div><Link to={`/${lang}/faq`}>FAQ</Link></div>
              <div><Link to={`/${lang}/guides`}>GUIDES</Link></div>
              <div><a href='https://medium.com/@muraqaba' target='_blank' rel="noopener noreferrer">BLOG</a></div>
            </div>
            <div className={footer.column}>
              <div><Link to={`/${lang}/tos`}>TERMS OF SERVICE</Link></div>
              <div><Link to={`/${lang}/privacy`}>PRIVACY POLICY</Link></div>
              <div><Link to={`/${lang}/canary`}>WARRANT CANARY</Link></div>
            </div>
        </div>
        <div className={footer.bottom}>
          <div><a href='mailto:support@muraqaba.io'>support@muraqaba.io</a> <span className={footer.dot}>·</span> <a href='/muraqaba-pubkey.asc' target='_blank'>PGP</a></div>
          <div className={footer.metw}>
            <a href='https://medium.com/@muraqaba' target='_blank' rel="noopener noreferrer"><img src='/imgs/medium.svg' alt='Medium logo' className={footer.logo}/></a>
            <span className={footer.line}></span>
            <a href='https://twitter.com/muraqaba' target='_blank' rel="noopener noreferrer"><img src='/imgs/twitter.svg' alt='Twitter logo' className={footer.logo}/></a>
          </div>
        </div>
      </footer>
    </Trans>
  </div>
    )
  }
}

export default compose(
  translate('footer')
)(Footer)
