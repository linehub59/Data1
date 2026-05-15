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
  const dataRef = collection.doc(id);
  const doc = await dataRef.get();

  // Check if product exists
  if (!doc.exists) {
    return {
      message: "data not found"
    };
  }

  // Update product
  await dataRef.update({
    ...data,
    updatedAt: new Date()
  });

  const updatedDoc = await dataRef.get();

  return {
    id: id,
    ...updatedDoc.data()
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