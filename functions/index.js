const functions = require('firebase-functions');
const firebase_admin = require('firebase-admin');

exports.helloWorld = functions.https.onRequest((request, response) => {
    console.log(request.body);
    response.send("Hello from Firebase!");
});
