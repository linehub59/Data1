const {
  db
} = require("../config/firebase");




const collection = db.collection("users");




exports.getAllUsers = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }));
};




exports.getUserById = async (id) => {
  const doc = await collection.doc(id).get();
  if (!doc.exists) return {
    status: 404,
    message: "Product not found"
  };
  return {
    id: doc.id,
    ...doc.data()
  };
};