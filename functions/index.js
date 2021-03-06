if (process.env.FUNCTIONS_EMULATOR) {
    process.env.GOOGLE_APPLICATION_CREDENTIALS = '../serviceAccount.json';
}
const firebase_admin = require('firebase-admin');
const config = require('./config/config');
firebase_admin.initializeApp();

const express = require('express');
const cors = require('cors');
const app = express();
const functions = require('firebase-functions');
const unsupported_endpoint = require('./controllers/unsupported_endpoint');
const routes = require('./routes');

app.disable('x-powered-by');

app.use(cors({ origin: true }));
app.use(routes(express.Router()));
app.use(unsupported_endpoint);

exports.api = functions.https.onRequest(app);
