const dotenv = require('dotenv');
dotenv.config();


firebaseConfig = {
  "type": "service_account",
  "project_id": process.env.PROJECT_ID,
  "private_key_id": process.env.PRIVATE_ID_KEY,
  "private_key": process.env.PRIVATE_KEY,
  "client_id": process.env.CLIENT_ID,
  "auth_uri": process.env.AUTH_URI,
  "token_uri": process.env.TOKEN_URI,
  "auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
  "client_x509_cert_url": process.env.CLIENT_CERT,
  "universe_domain": "googleapis.com",
  "client_email": process.env.EMAIL_CLIENT,
}

module.exports = firebaseConfig;