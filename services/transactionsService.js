const {
  db
} = require("../config/firebase");




const collection = db.collection("transactions");




exports.getAllTransactions = async () => {
  const snapshot = await collection
  .orderBy("createdAt", "desc")
  .get();
  return snapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }));
};




exports.getTransactionById = async (id) => {
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





exports.updateTransactionById = async (id, data) => {

  const doc = await collection.doc(id).get();

  // Check if product exists
  if (!doc.exists) {
    return {
      message: "Product not found"
    };
  }

  // Update product
  await doc.update({
    ...data,
    updatedAt: new Date()
  });

  const updatedDoc = await doc.get();

  return {
    message: "Product updated successfully",
    product: updatedDoc.data()
  };
};





exports.createTransaction = async (data) => {
  const transactionRef = await collection.add({
    ...data,
   status: "unpaid",
    createdAt: new Date()
  });

  return {
    id: transactionRef.id,
    ...data
  };
};

exports.deleteTransactionById = async (id) => {
  await collection.doc(id).delete();
};




exports.deleteAllTransactions = async () => {

  const snapshot = await collection.get();

  if (snapshot.empty) {
    return {
      message: "No products to delete"
    };
  }

  const batch = db.batch();

  snapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();

  return {
    message: "All products deleted successfully",
    count: snapshot.size
  };

};