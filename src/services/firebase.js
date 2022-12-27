import { initializeApp } from "firebase/app";
import { getDatabase, ref } from "firebase/database";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "@firebase/auth";
import { GithubAuthProvider } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDQE2NrbijExPQAWJ4m1_lq9ZyDCiAbS8w",
    authDomain: "chatty-5eec7.firebaseapp.com",
    projectId: "chatty-5eec7",
    storageBucket: "chatty-5eec7.appspot.com",
    messagingSenderId: "194422149181",
    appId: "1:194422149181:web:930e580afeb99294285a54"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signUp = (email, pass) =>
    createUserWithEmailAndPassword(auth, email, pass);
export const login = (email, pass) =>
    signInWithEmailAndPassword(auth, email, pass);
export const logout = () => signOut(auth);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => {
    signInWithPopup(auth, provider).then((result) => {
        console.log(result);
    }).catch((error) => {
        console.log(error);
    });
}

export const signInWithGitHub  = () => {
    signInWithPopup(auth, new GithubAuthProvider())
    .then((result) => {
      console.log()
    }).catch((error) => {
        console.log(error)
    });
}


export const db = getDatabase(app);
export const profileRef = ref(db, "profile");
export const getProfileNameRef = (userId) => ref(db, `profile/${userId}/name`);
export const profileShowNameRef = ref(db, "profile/showName");
export const chatsRef = ref(db, "chats");
export const getChatsRefById = (chatId) => ref(db, `chats/${chatId}`);

export const messagesRef = ref(db, "messages");
export const getMessageListRefByChatId = (chatId) =>
  ref(db, `messages/${chatId}/messageList`);
export const getMessagesRefByChatId = (chatId) => ref(db, `messages/${chatId}`);
export const getMessageRefById = (chatId, msgId) =>
  ref(db, `messages/${chatId}/messageList/${msgId}`);