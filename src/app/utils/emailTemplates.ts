export const WELCOME_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Welcome to BlogTide!</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background: #E5E5E5;
      font-family: 'Open Sans', sans-serif;
    }
    table, td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    .button {
      background: #4C83EE;
      color: #fff;
      text-decoration: none;
      display: inline-block;
      padding: 10px 0;
      font-size: 14px;
      font-weight: bold;
      text-align: center;
      border-radius: 7px;
      width: 100%;
    }
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
      .button {
        display: block !important;
        width: auto !important;
      }
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F6FAFB" align="center">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
          <tr>
            <td style="padding: 48px 0 30px; text-align: center; font-size: 18px; color: #1C27B0;">
              <strong>Geetask</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 48px 30px 40px; color: #000000;">
              <table width="100%">
                <tr>
                  <td style="font-size: 18px; font-weight: bold; padding-bottom: 24px;">
                    Welcome, {username}!
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; line-height: 150%; padding-bottom: 10px;">
                    Thanks for joining <strong>Geetask</strong> — We’re excited to have you on board!
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; padding-bottom: 16px;">
                    To get started, take your next step:
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <a class="button" href="{clientURL}/login" title="Next Step">Start using Geetask</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; line-height: 170%;">
                    Best regards,<br><strong>Geetask</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0 48px; text-align: center; font-size: 11px; color: #8B949F;">
              Geetask<br/>Alimosho, Lagos, Nigeria
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

export const PASSWORD_RESET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Reset Your Password</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background: #E5E5E5;
      font-family: 'Open Sans', sans-serif;
    }
    table, td {
      border-collapse: collapse;
    }
    .button {
      display: inline-block;
      background-color: #22D172;
      color: #fff;
      text-decoration: none;
      padding: 12px 24px;
      font-weight: bold;
      border-radius: 6px;
    }
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
      .button {
        display: block !important;
        width: auto !important;
      }
    }
  </style>
</head>
<body>
  <table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#F6FAFB">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding: 48px 0 30px 0; text-align: center; font-size: 24px; color: #1C27B0;">
              Geetask
            </td>
          </tr>
          <tr>
            <td style="padding: 48px 30px 40px; background-color: #ffffff;">
              <table width="100%">
                <tr>
                  <td style="padding-bottom: 24px; font-size: 18px; font-weight: bold; line-height: 1.5;">
                    Forgot your password?
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px; font-size: 14px; line-height: 1.5;">
                    We received a request to reset the password for your Geetask account: <strong>{email}</strong>.
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px; font-size: 14px; line-height: 1.5;">
                    Click the button below to create a new password:
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 24px;">
                    <a href={resetURL} class="button" title="Reset Password">Reset Password</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 10px; font-size: 14px; line-height: 1.5;">
                    This link will expire in 15 minutes. If you didn’t request a password reset, you can safely ignore this message.
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; line-height: 1.7;">
                    Sincerely,<br><strong>Geetask</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0 48px; text-align: center; font-size: 11px; color: #8B949F;">
              Geetask<br/>
              Alimosho, Lagos, Nigeria<br/>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE = `<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <title>Password Reset Successful - BlogTide</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style type="text/css">
    body {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
      background: #E5E5E5;
      font-family: 'Open Sans', sans-serif;
    }
    table, td {
      border-collapse: collapse;
      mso-table-lspace: 0pt;
      mso-table-rspace: 0pt;
    }
    .success-box {
      font-size: 18px;
      background-color: #e6f4ea;
      padding: 16px;
      border-radius: 6px;
      text-align: center;
      color: #2e7d32;
      margin: 20px 0;
      border: 1px solid #c8e6c9;
    }
    @media only screen and (max-width:595px) {
      .container {
        width: 100% !important;
      }
    }
  </style>
  <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600&display=swap" rel="stylesheet">
</head>
<body>
  <table width="100%" cellspacing="0" cellpadding="0" bgcolor="#F6FAFB" align="center">
    <tr>
      <td align="center">
        <table class="container" width="600" cellpadding="0" cellspacing="0" bgcolor="#ffffff">
          <tr>
            <td style="padding: 48px 0 30px; text-align: center; font-size: 18px; color: #4C83EE;">
              <strong>Geetask</strong>
            </td>
          </tr>
          <tr>
            <td style="padding: 48px 30px 40px; color: #000000;">
              <table width="100%">
                <tr>
                  <td style="font-size: 18px; font-weight: bold; padding-bottom: 24px;">
                    Hello, {username}!
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; line-height: 150%; padding-bottom: 10px;">
                    This is a confirmation that your BlogTide account password has been successfully reset.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="success-box">
                      Your password was changed successfully.
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding-bottom: 16px;">
                    <span style="display: block; width: 117px; border-bottom: 1px solid #8B949F;"></span>
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; line-height: 170%;">
                    Stay secure,<br><strong>Geetask</strong>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 0 48px; text-align: center; font-size: 11px; color: #8B949F;">
              Geetask<br/>Alimosho, Lagos, Nigeria<br/>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
