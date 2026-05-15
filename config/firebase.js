const admin = require("firebase-admin");

const serviceAccount = require("../serviceAccountKey.json");


if (!admin.apps.length) {
  /*
  const serviceAccount = JSON.parse(
    process.env.FIREBASE_SERVICE_ACCOUNT
  );
  */

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: serviceAccount.project_id
  });
}

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };