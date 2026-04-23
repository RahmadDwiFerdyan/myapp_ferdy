import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const snapshot = await getDocs(collection(db, collectionName));

  const data = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return data;
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const snapshot = await getDoc(doc(db, collectionName, id));

  const data = snapshot.data();

  return data;
}

function normalizeEmail(email: string) {
  return (email ?? "").trim().toLowerCase();
}

export type DbUser = {
  id: string;
  email?: string;
  fullname?: string;
  password?: string;
  role?: string;
  image?: string;
  type?: string;
  [key: string]: any;
};

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const normalized = normalizeEmail(email);
  if (!normalized) return null;

  const q = query(collection(db, "users"), where("email", "==", normalized));
  const querySnapshot = await getDocs(q);

  const data = querySnapshot.docs.map((docSnap) => ({
    id: docSnap.id,
    ...docSnap.data(),
  })) as DbUser[];

  return data.length > 0 ? data[0] : null;
}

export async function signIn(email: string) {
  return getUserByEmail(email);
}

export type OAuthUpsertInput = {
  fullname?: string;
  email?: string;
  image?: string;
  type?: string;
};


export async function upsertOAuthUser(input: OAuthUpsertInput): Promise<DbUser | null> {
  const email = normalizeEmail(input.email ?? "");
  if (!email) return null;

  const existing = await getUserByEmail(email);

  const payload = {
    fullname: input.fullname ?? existing?.fullname ?? "",
    email,
    image: input.image ?? existing?.image,
    type: input.type ?? existing?.type,
    role: existing?.role ?? "member",
  };

  if (existing?.id) {
    await updateDoc(doc(db, "users", existing.id), payload);
    return { ...existing, ...payload };
  }

  const created = await addDoc(collection(db, "users"), payload);
  return { id: created.id, ...payload };
}

export type SignUpPayload = {
  email: string;
  fullname: string;
  password: string;
  role?: string;
};

export type SignUpResult =
  | { status: "success"; message: string }
  | {
      status: "error";
      errorCode: "VALIDATION" | "ALREADY_EXISTS" | "INTERNAL";
      message: string;
    };

export async function signUp(userData: SignUpPayload): Promise<SignUpResult> {
  const email = (userData.email ?? "").trim().toLowerCase();
  const password = userData.password ?? "";

  if (!email) {
    return {
      status: "error",
      errorCode: "VALIDATION",
      message: "Email wajib diisi",
    };
  }

  if (typeof password !== "string" || password.length < 6) {
    return {
      status: "error",
      errorCode: "VALIDATION",
      message: "Password minimal 6 karakter",
    };
  }

  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return {
      status: "error",
      errorCode: "ALREADY_EXISTS",
      message: "Email sudah terdaftar",
    };
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const role = (userData.role ?? "").trim() || "member";
    const fullname = (userData.fullname ?? "").trim();

    await addDoc(collection(db, "users"), {
      email,
      fullname,
      password: hashedPassword,
      role,
    });

    return {
      status: "success",
      message: "Register berhasil",
    };
  } catch (error: any) {
    return {
      status: "error",
      errorCode: "INTERNAL",
      message: error?.message ?? "Terjadi kesalahan",
    };
  }
}

export async function signInWithGoogle(userData: any, callback: any) {
  try {
    const user = await upsertOAuthUser({
      fullname: userData.fullname,
      email: userData.email,
      image: userData.image,
      type: userData.type,
    });

    if (!user) {
      callback({
        status: false,
        message: "Failed to register user with Google",
      });
      return;
    }

    callback({
      status: true,
      message: "User registered and logged in with Google",
      data: user,
    });
  } catch (error: any) {
    // Tangani error di sini
    callback({
      status: false,
      message: "Failed to register user with Google",
    });
  }
}