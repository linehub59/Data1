const {
  db
} = require("../config/firebase");




const collection = db.collection("data");




exports.getAllData = async () => {
  const snapshot = await collection.get();
  return snapshot.docs.map(doc => ({
    id: doc.id, ...doc.data()
  }));
};




exports.getDataById = async (id) => {
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





exports.updateDataById = async (id, data) => {

  const doc = await collection.doc(id).get();

  // Check if product exists
  if (!doc.exists) {
    return {
      message: "Product not found"
    };
  }

  // Update product
  await productRef.update({
    ...data,
    updatedAt: new Date()
  });

  const updatedDoc = await productRef.get();

  return {
    message: "Product updated successfully",
    product: updatedDoc.data()
  };
};





exports.createData = async (data) => {
  const docRef = await collection.add(data);
  return {
    id: docRef.id,
    ...data
  };
};

exports.deleteDataById = async (id) => {
  await collection.doc(id).delete();
};




exports.deleteAllData = async () => {

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