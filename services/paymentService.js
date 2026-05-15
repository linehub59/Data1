const axios = require("axios");
const {
  admin
} = require("../config/firebase");
require("dotenv").config()



// 🔑 1. Get Access Token
async function getAccessToken() {
  const url =
  "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(
    `${process.env.CONSUMER_KEY}:${process.env.CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(url, {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  });

  return response.data.access_token;
}





exports.stkpush = async ({
  phone, amount, transactionId
}) => {

  const accessToken = await getAccessToken();

  // Timestamp
  const timestamp = new Date()
  .toISOString()
  .replace(/[-:TZ.]/g, "")
  .slice(0, 14);

  // Password
  const password = Buffer.from(
    process.env.BUSINESS_SHORTCODE + process.env.PASSKEY + timestamp
  ).toString("base64");

  const url =
  "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const payload = {
    BusinessShortCode: process.env.BUSINESS_SHORTCODE,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerPayBillOnline",
    PartyA: phone,
    PartyB: process.env.BUSINESS_SHORTCODE,
    PhoneNumber: phone,
    CallBackURL: process.env.CALLBACK_URL,
    AccountReference: transactionId,
    TransactionDesc: "Test Payment",
  };

  const response = await axios.post(url, payload, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.data;


};

exports.callback = async (data) => {


  const resultCode = data.Body.stkCallback.ResultCode;

  const metadata = data.Body.stkCallback.CallbackMetadata?.Item || [];

  const orderItem = metadata.find(i => i.Name === "AccountReference");

  const transactionId = orderItem?.Value;

  if (!transactionId) return "No transactionId";

  if (resultCode === 0) {
    // ✅ SUCCESS
    await admin.firestore().collection("transactions").doc(transactionId).update({
      status: "paid",
      updatedAt: new Date()
    });
  } else {
    // ❌ FAILED
    await admin.firestore().collection("transactions").doc(transactionId).update({
      status: "failed",
      updatedAt: new Date()
    });
  }

  return "OK"


};