import React, { PureComponent } from 'react'
import { compose } from 'react-apollo'
import { translate, Trans } from 'react-i18next'
import { withRouter } from 'react-router'
import main from './style/main.module.scss'

class Main extends PureComponent {
  render() {
    const lang = this.props.i18n.language.substring(0, 2)
    let ref = window.location.hash.substring(1)
    if (ref) localStorage.setItem('ref', ref)
    return (
      <Trans i18nKey='service'>
        <div className={`container ${main.main}`}>
          <div className={main.title}>WORLD CLASS ONLINE PRIVACY</div>
          <div className={main.subtitle}>Muraqaba is VPN service that keeps your online<br/> activity private. <span className={main.yellow}>For <span className={main.price}>5€ / month</span></span>. We accept<br/>crypto-currences only</div>
          <button className={`button is-primary is-large ${main.button}`} onClick={() => this.props.history.push(`/${lang}/join`)}>GET ACCOUNT</button>
          <div className={main.items}>
            <div className={main.item}>
              <div className={main.itemUp}>
                <img src='/imgs/shield.svg' className={main.icon} alt="shield"/>
                <div className={main.itemTitle}>BROWSE WEB SECURELY</div>
              </div>
              <div  className={main.itemText}>
                When you connect to the internet with Muraqaba, we ensure that the traffic to and from your computer is encrypted to the highest standards. Muraqaba VPN is based on WireGuard which uses state-of-the-art Noise crypto protocol (also used in Signal, WhatsApp).
              </div>
            </div>
            <div className={main.item}>
              <div className={main.itemUp}>
                <img src='/imgs/fingerprint.svg' className={main.icon} alt="fingerprint"/>
                <div className={main.itemTitle}>NO LOGS</div>
              </div>
              <div className={main.itemText}>
                We do not keep any logs whatsoever, which means we do not possess any seizable data by court orders. We do not ask for personal information and accept anonymous crypto-payments only.               </div>
            </div>
            <div className={main.item}>
              <div className={main.itemUp}>
                <img src='/imgs/tablet-mobile-combo.svg' className={main.icon} alt="tablet-mobile-combo"/>
                <div className={main.itemTitle}>MOBILE FRIENDLY</div>
              </div>
              <div className={main.itemText}>
                Muraqaba was built with mobile usage in mind. You can switch between 4G and Wi-Fi without even noticing. Also you can use our special DNS servers to block ad on any device.
              </div>
            </div>
            <div className={main.item}>
              <div className={main.itemUp}>
                <img src='/imgs/shuffle.svg' className={main.icon} alt="shuffle"/>
                <div className={main.itemTitle}>FAST MUTI HOP</div>
              </div>
              <div className={main.itemText}>
                Routing your connection through multiple servers in separate jurisdictions ensures that your privacy is retained even if the exit server is compromised.
              </div>
            </div>
          </div>
      </div>
      <div className={main.locations}>
        <div className={main.locationsTitle}>AVAILABLE LOCATIONS</div>
        <div className={main.countries}>
          <div className={main.country}>
            <img src='/imgs/en.svg' className={main.flag} alt="en"/>
            <span>UK</span>
          </div>
          <div className={main.country}>
            <img src='/imgs/en.svg' className={main.flag} alt="de"/>
            <span>GERMANY</span>
          </div>
          <div className={main.country}>
            <img src='/imgs/en.svg' className={main.flag} alt="se"/>
            <span>SWEDEN</span>
          </div>
        </div>
      </div>
      </Trans>
    )
  }
}

export default compose(
  translate('main')
)(withRouter(Main))
