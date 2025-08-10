import {getFirestore, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import app from "../firebase/firebaseConfig";

const auth = getAuth(app);
const db = getFirestore(app);
export async function signup(email: string, password: string){
  try{
    // create user with email/password in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    // saves user profile(email,role,createdAt)in Firestore under users collection
    await setDoc(doc(db,"users",user.uid),{
        email:user.email,
        role:"user",//default role , can extend later
        createdAt:Timestamp.now(),
    });
    return user;

  }catch(error){
    throw error;
  }
}
//creating a signup with user email,password in irebase Auth