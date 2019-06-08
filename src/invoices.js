import React, { PureComponent } from 'react'
import { translate, Trans } from 'react-i18next'
import { graphql, compose } from 'react-apollo'
import { gql } from 'apollo-boost'
import get from 'lodash.get'
import dayjs from 'dayjs'
import invoices from './style/invoices.module.scss'

class Invoices extends PureComponent {
  render() {
    const allInvoices = get(this.props.getInvoices, 'getInvoices', [])
    return (
      <Trans i18nKey='invoices'>
        <div className={`container ${invoices.container}`}>
          <div className={invoices.title}>{this.props.getInvoices.loading ? '' : allInvoices.length ? 'INVOICES' : 'No invoices yet'}</div>
          {allInvoices.length ? <table className={`table is-hoverable is-fullwidth is-narrow is-bordered ${invoices.table}`}>
            <thead>
              <tr>
                <th className={invoices.th}>DATE</th>
                <th className={invoices.th}>TYPE</th>
                <th className={invoices.th}>AMOUNT</th>
                <th className={invoices.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {allInvoices.map((invoice) => <tr onClick={() => window.open(invoice.invoiceUrl, "_blank")} key={invoice._id}>
                <td className={invoices.td} title={dayjs(invoice.createdAt).format('DD.MM.YYYY HH:mm')}>{dayjs(invoice.createdAt).format('DD.MM.YY')}</td>
                <td className={invoices.td}>{invoice.type}</td>
                <td className={invoices.td}>{invoice.price.toString()} €</td>
                <td className={invoices.td}>{dayjs(invoice.expirationTime).isBefore(dayjs()) ? 'EXPIRED' : invoice.status}</td>
              </tr>)}
            </tbody>
          </table> : null}
        </div>
      </Trans>
    )
  }
}

export default compose(
  graphql(gql `query getInvoices { getInvoices { _id, createdAt, type, price, invoiceUrl, status, expirationTime }}`, {name: 'getInvoices'}),
  translate('invoices')
)(Invoices)
