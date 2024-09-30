export default function receiveOrderEmail(domain, order, translator) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
    <style>
      html,
      body {
        padding: 0;
        margin: 0;
        color: rgba(26, 9, 13, 1.0);
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
      }
      a {
        color: inherit;
        text-decoration: none;
      }
      * {
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        /*Reset's every elements apperance*/
        background: none repeat scroll 0 0 transparent;
        border: medium none;
        border-spacing: 0;
        list-style: none outside none;
        margin: 0;
        padding: 0;
        text-align: left;
        text-decoration: none;
        text-indent: 0;
        color: rgba(26, 9, 13, 1.0);
        font-size: 16px;
        font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
        font-weight: normal;
        line-height: 1.42rem;
      }
      html,
      body,
      #__next {
        height: 100%;
      }
      table {
        margin-top: 1rem;
      }
      thead th{
        padding-bottom: 0.25rem;
      }
      tbody th {
        font-weight: bolder;
        padding-right: 0.5rem;
      }
      tfoot td {
        padding-top: 0.25rem;
      }
      thead th,
      tbody td,
      tfoot td {
        color: #555555;
      }
    </style>
  </head>
  <body>
    <h1>${translator['WebsiteAdmin.Mail.Order.sold']}</h1>

    <table>
      <thead>
        <tr>
          <th colspan="2">
            ---------- ${translator['WebsiteAdmin.Mail.Order.title']} ----------
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.Order.website']}
          </th>
          <td>
            <a href="${process.env.NODE_ENV === 'development' ? `http://${order.website.slug}.${domain}:3003` : `https://${order.website.slug}.${domain}`}">
              ${order.website.name}
            </a>
          </td>
        </tr>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.Order.date']}
          </th>
          <td>
            ${order.createdAt}
          </td>
        </tr>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.Order.orderNo']}
          </th>
          <td>
            ${order.id}
          </td>
        </tr>
        ${order.orderedProducts.map((product, index) => `
<tr>
  <th>
    ${translator['WebsiteAdmin.Mail.Order.product']} ${index + 1}
  </th>
  <td>
    ${product.name}
  </td>
</tr>`)
    }
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.Order.totalPrice']}
          </th>
          <td>
            ${order.amount}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">
            ${translator['WebsiteAdmin.Mail.Order.detail']}
            <a href="${process.env.NODE_ENV === 'development' ? `http://www.${domain}:3000/admin` : `https://dashboard.${domain}/admin`}">
              >> ${translator['WebsiteAdmin.Mail.Order.check']}
            </a>
          </td>
        </tr>
      </tfoot>
    </table>
  </body>
</html>
  `;
}
