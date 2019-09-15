const firebase_admin = require('firebase-admin');
firebase_admin.initializeApp();
const express = require('express');
const cors = require('cors');
const app = express();
const functions = require('firebase-functions');
const config = require('./config/config');
const unsupported_endpoint = require('./controllers/unsupported_endpoint');
const routes = require('./routes');

app.disable('x-powered-by');

app.use(cors({ origin: true }));
app.use(routes(express.Router()));
app.use(unsupported_endpoint);

exports.api = functions.https.onRequest(app);
