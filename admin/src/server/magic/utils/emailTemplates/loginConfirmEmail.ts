export default function loginConfirmEmail({ email, loginConfirmUrl, phrase, expiresIn }) {
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
         .email_container__24Nn- .Button_button__1rPei {
         color: rgba(255, 255, 255, 0.9);
         }
         .Button_button__1rPei {
         width: 100%;
         height: 48px;
         -moz-border-radius: 8px;
         border-radius: 8px;
         background-color: rgba(249, 109, 16, 1.0);
         line-height: 48px;
         color: rgba(255, 255, 255, 0.9);
         font-weight: 700;
         text-transform: capitalize;
         text-align: center;
         cursor: pointer;
         display: inline-block;
         }
         .email_container__24Nn- {
         max-width: 450px;
         text-align: left;
         }
         .email_email__3AZYW  a {
         font-weight: 700;
         }
         .email_paragraph__1JNat {
         display: inline-block;
         padding: 16px 0;
         }
      </style>
   </head>
   <body>
      <table class="email_container__24Nn-" cellpadding="0" cellspacing="0" border="0">
         <tbody>
            <tr>
               <td><span class="email_paragraph__1JNat">Click the magic words below to login as <strong class="email_email__3AZYW">${email}</strong>.</td>
            </tr>
            <tr>
               <td><a href="${loginConfirmUrl}" class="Button_button__1rPei">${phrase}</a></td>
            </tr>
            <tr>
               <td><span class="email_paragraph__1JNat">Ensure the magic words match what you saw on the login page.</span><br>The magic words will only work for the next ${expiresIn}.</span></td>
            </tr>
         </tbody>
      </table>
   </body>
</html>
  `;
}
