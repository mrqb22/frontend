import React, { PureComponent } from 'react'
import article from './style/article.module.scss'

export default class Canary extends PureComponent {
  render() {
    return (
        <div className={`container ${article.container}`}>
          <div className={article.title}>WARRANT CANARY</div>
          <div className={article.update}>last updated 20 Jul 2018</div>
          <div>-----BEGIN PGP SIGNED MESSAGE-----<br/>
            Hash: SHA512
            <br/><br/>
            Once per month Muraqaba will publish a 'warrant canary' in the form of a PGP signed message containing the following:
            <br/><br/>
            - A declaration that, up to that point, no warrants have been served, nor have any searches or seizures taken place.<br/>
            - Headlines from a major news source demonstrating that the update could not have been created prior to that date.
            <br/><br/>
            Muraqaba public key is here: <a href='https://muraqaba.io/muraqaba-pubkey.asc' className={article.link} target='_blank' rel="noopener noreferrer">https://muraqaba.io/muraqaba-pubkey.asc</a>
            <br/><br/>
            Special note should be taken if these messages ever cease being updated, or are removed from this page.
            However this scheme is not infallible. Although signing the declaration makes it impossible for a third party to produce arbitrary declarations,
            it does not prevent them from using force to coerce Muraqaba to produce false declarations.
            <br/><br/>
            The current message is here:
            <br/><br/>
            As of 2018-05-08 no warrants have ever been served to Muraqaba or Muraqaba employees.
            No searches or seizures of any kind have ever been performed on Muraqaba assets.
            Muraqaba has no direct or indirect knowledge of any backdoors, or potential backdoors in our servers or network and Muraqaba has not received any requests to implement a backdoor.
            Muraqaba has never disclosed any user communications to any third party.
            <br/><br/>
            (from https://www.ft.com/news-feed)
            <br/><br/>
            Australia cuts taxes for lower earners in ‘make or break’ budget
            ‘This is not a give-away’ says Treasurer in switch from focus on debt reduction
            <br/><br/>
            British Gas owner Centrica starts hunt for new chairman
            Next holder of the role will face a series of challenges
            <br/><br/>
            How the end of QE will affect asset prices
            Central banks bought trillions in bonds after financial crisis
            <br/><br/>
            -----BEGIN PGP SIGNATURE-----
            <br/><br/>
            <div className={article.wrap}>iQEzBAEBCgAdFiEEXxDK46RlUWr/x/EkisFrnrZHumkFAlrxeEsACgkQisFrnrZHumnuLwf9FBAKrJ5qtxFKpmlw3hIAwNvga0l4O+CUc7M47FjKG8X5P+35KcBVLwqwIPtiJHeIKJdKbgNXjaGt4z6/zo38jsIMnZmbSAf4uLtrpSmjccqtbu3v+D5dGca8upxFPFs9Ywqq8PyWazqvRYrTSP2eoQh1ChVdv4PWBtqe0fb7Q9jujOCmtD5bRuzdblv8NjlzhqgVs/BKZuhvyn5ihgC0rxyIplAwnJ1/WmeP/oij6j24fX8dFJsGmBz6QngjLZPDt6PUqgiF6EyVJ5QdeUCIzE7L9M7KmIhOUOclSqZVQdKV/cMxTpfqj3swvCiVem7dq/DVrjL0oGGNRdiY0QwTGA===uF08<br/><br/>
            -----END PGP SIGNATURE-----</div>
          </div>
        </div>
    )
  }
}
