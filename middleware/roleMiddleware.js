const {
  admin
} = require("../config/firebase");

// 🔐 middleware factory (you pass allowed roles)
const roleMiddleware = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({
          message: "No token provided"
        });
      }

      // 1. Verify Firebase token
      const decoded = await admin.auth().verifyIdToken(token);
      const uid = decoded.uid;

      // 2. Get user from Firestore
      const userDoc = await admin.firestore()
      .collection("users")
      .doc(uid)
      .get();

      if (!userDoc.exists) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      const userData = userDoc.data();

      // 3. Attach user to request
      req.user = {
        uid,
        ...userData
      };

      // 4. Check role
      if (!allowedRoles.includes(userData.role)) {
        return res.status(403).json({
          message: "Access denied: insufficient permissions"
        });
      }

      next();
    } catch (error) {
      return res.status(401).json({
        message: "Unauthorized",
        error: error.message
      });
    }
  };
};

module.exports = roleMiddleware;