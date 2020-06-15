import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyBMCEcHyeG9TPiwwiwjqab-feNG27_CJZs',
  authDomain: 'smoothy-b4774.firebaseapp.com',
  databaseURL: 'https://smoothy-b4774.firebaseio.com',
  projectId: 'smoothy-b4774',
  storageBucket: 'smoothy-b4774.appspot.com',
  messagingSenderId: '909155581443',
  appId: '1:909155581443:web:e6c6c37f392ac020d8d836',
  measurementId: 'G-Q6J77CJYNM',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const db = firebase.firestore();

export const pullData = async (user) =>
  db.collection('users').doc(user.id).get();

export const pushData = async (user, data, actions) => {
  const syncDate = new Date().toISOString();
  const { id, ...profile } = user;
  return db
    .collection('users')
    .doc(id)
    .set(
      {
        ...profile,
        data,
        syncDate,
        actions,
      },
      { merge: true },
    );
};

export const updateActions = async (user, actions) => {
  const { id } = user;
  await db.collection('users').doc(id).set({ actions }, { merge: true });
};

export { firebase };
