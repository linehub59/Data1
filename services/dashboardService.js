const {
  db
} = require("../config/firebase");




exports.getDashboard = async () => {
    // USERS
    const usersSnapshot = await db.collection("users").get()
    const totalUsers = usersSnapshot.size

    // TRANSACTIONS
    const transactionsSnapshot = await db
    .collection("transactions")
    .orderBy("createdAt", "desc")
    .get()

    const totalTransactions = transactionsSnapshot.size

    // TOTAL SALES
    let totalSales = 0

    // TOP BUNDLES
    const bundleMap = {}

    // RECENT TRANSACTIONS
    const recentTransactions = []

    transactionsSnapshot.forEach(doc => {
      const transaction = {
        id: doc.id,
        ...doc.data()
      }

      // TOTAL SALES
      if (transaction.status === "paid") {
        totalSales += transaction.amount || 0
      }

      // TOP BUNDLES
      if (transaction.bundleName) {
        if (!bundleMap[transaction.bundleName]) {
          bundleMap[transaction.bundleName] = 0
        }

        bundleMap[transaction.bundleName] += 1
      }

      // RECENT TRANSACTIONS
      if (recentTransactions.length < 10) {
        recentTransactions.push(transaction)
      }
    })

    // SORT TOP BUNDLES
    const topBundles = Object.entries(bundleMap)
    .map(([name, purchases]) => ({
      name,
      purchases
    }))
    .sort((a, b) => b.purchases - a.purchases)
    .slice(0,
      5)

    return {
      success: true,
      stats: {
        totalUsers,
        totalTransactions,
        totalSales,
        topBundles,
        recentTransactions
      }
    }

  }