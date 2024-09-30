export default function paidRequestEmail(domain, request, translator) {
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
    <h1>${translator['WebsiteAdmin.Mail.NewRequest.paid.receipt']}</h1>

    <table>
      <thead>
        <tr>
          <th colspan="2">
            ---------- ${translator['WebsiteAdmin.Mail.NewRequest.title']} ----------
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.NewRequest.website']}
          </th>
          <td>
            <a href="${process.env.NODE_ENV === 'development' ? `http://${request.page.website.slug}.${domain}:3003/pages/${request.page.slug}` : `https://${request.page.website.slug}.${domain}/pages/${request.page.slug}`}">
              ${request.page.website.name}
            </a>
          </td>
        </tr>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.NewRequest.name']}
          </th>
          <td>
            ${request.name}
          </td>
        </tr>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.NewRequest.description']}
          </th>
          <td>
            ${request.description}
          </td>
        </tr>
        <tr>
          <th>
            ${translator['WebsiteAdmin.Mail.NewRequest.url']}
          </th>
          <td>
            ${request.url}
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
  `;
}
