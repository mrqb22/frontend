import React, { PureComponent } from 'react'
import faq from './style/faq.module.scss'

export default class FAQ extends PureComponent {
  render() {
    return (
        <div className={`container ${faq.container}`}>
          <div className={faq.title}>PRIVACY POLICY</div>
          <div className={faq.items}>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that happens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that vndjfv vjdfnv vjkdfnkvjd vdjfnvjk vkdjfnvkjdnf vjdkfnvkjdfnv kvdjnfvkjnfd kvjdfnvkjdfnvkjdhappens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that happens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
          </div>
          <div className={faq.title}>PRIVACY POLICY</div>
          <div className={faq.items}>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that happens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that vndjfv vjdfnv vjkdfnkvjd vdjfnvjk vkdjfnvkjdnf vjdkfnvkjdfnv kvdjnfvkjnfd kvjdfnvkjdfnvkjdhappens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
            <div className={faq.item}>
              <div className={faq.subtitle}>WHY DO I GET CAPTCHAS ALL THE TIME?</div>
              <div>This is a known issue that happens on many sites using Cloudflare. Please follow our SOCKS5 guide to reduce the occurrence of CAPTCHAs.</div>
            </div>
          </div>
        </div>
    )
  }
}
