const {
  db
} = require("../config/firebase");

const collection = db.collection("users");

exports.getProfile = async (userId) => {

  const userDoc = await collection.doc(userId).get();
  
  const userData = userDoc.data();

  return {
    id: userId,
    ...userData
  }
};

exports.updateProfile = async (id, data) => {

  await collection.doc(id).update({
    count: data.count
  });

};