export const PASSWORD_RESET_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Reset Your Password</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .button {
      background-color: #007BFF;
      color: #fff;
      padding: 12px 24px;
      border-radius: 4px;
      text-decoration: none;
      display: inline-block;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>Hi,</p>
    <p>We received a request to reset the password for your Geetask account: <strong>{email}</strong>.</p>
    <p>Click the button below to create a new password:</p>
    <p><a href="{resetURL}" class="button">Reset Password</a></p>
    <p>This link expires in 15 minutes. If you didn’t request this, you can ignore this message.</p>
    <p>Need help? <a href="{clientURL}/support">Contact support</a>.</p>
    <p><strong>– The Geetask Team</strong></p>
    <small>Geetask Inc, Lagos, Nigeria</small>
  </div>
</body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Password Reset Successful</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .success {
      background: #e6f4ea;
      padding: 12px;
      border-radius: 4px;
      color: #2e7d32;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Password Reset Successful</h2>
    <p>Hello, {username}!</p>
    <p>This is a confirmation that your Geetask account password has been successfully reset.</p>
    <div class="success">Your password was changed successfully.</div>
    <p>If you didn't perform this action, please reset your password again or <a href="{clientURL}/support">contact support</a>.</p>
    <p><strong>– The Geetask Team</strong></p>
    <small>Geetask Inc, Lagos, Nigeria</small>
  </div>
</body>
</html>
`;

export const ACCOUNT_DELETION_EMAIL_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
  <title>Account Deleted</title>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: auto;
      background: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0,0,0,0.05);
    }
    .info {
      background: #f9f9f9;
      padding: 12px;
      border-radius: 4px;
      margin: 16px 0;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Account Deleted</h2>
    <p>Hello, {username}!</p>
    <p>This is a confirmation that your Geetask account has been deleted.</p>
    <div class="info">Your account has been successfully removed from our system.</div>
    <p>If you didn’t request this, please <a href="{clientURL}/support">contact our support team</a> immediately.</p>
    <p><strong>– The Geetask Team</strong></p>
    <small>Geetask Inc, Lagos, Nigeria</small>
  </div>
</body>
</html>
`;
