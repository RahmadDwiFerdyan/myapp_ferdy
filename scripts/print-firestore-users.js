/* eslint-disable no-console */

const path = require("path");

// Load .env.local / .env like Next.js does
try {
  const { loadEnvConfig } = require("@next/env");
  loadEnvConfig(path.join(__dirname, ".."));
} catch {
  // no-op: if @next/env is not available, rely on process.env
}

const { initializeApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  getDocs,
} = require("firebase/firestore");

async function main() {
  const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
  };

  if (!firebaseConfig.projectId) {
    console.error(
      "Missing FIREBASE_* env vars. Pastikan .env.local berisi FIREBASE_PROJECT_ID, dll.",
    );
    process.exit(1);
  }

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const snapshot = await getDocs(collection(db, "users"));
  const users = snapshot.docs.map((docSnap) => {
    const data = docSnap.data() || {};
    return {
      id: docSnap.id,
      email: data.email,
      fullname: data.fullname,
      role: data.role,
      passwordHash: data.password ? "(hidden)" : undefined,
    };
  });

  console.log(JSON.stringify({ count: users.length, users }, null, 2));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
