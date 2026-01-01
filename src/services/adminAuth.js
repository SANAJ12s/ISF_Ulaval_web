import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "@/firebase";

export function adminLogin(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function adminLogout() {
  return signOut(auth);
}
