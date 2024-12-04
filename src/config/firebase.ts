import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyC15XGTOc9-BmsnPWwYhKiWHF2QibnQQaM",
  authDomain: "smart-aquaponics-system-37bba.firebaseapp.com",
  databaseURL: "https://smart-aquaponics-system-37bba-default-rtdb.firebaseio.com",
  projectId: "smart-aquaponics-system-37bba",
  storageBucket: "smart-aquaponics-system-37bba.firebasestorage.app",
  messagingSenderId: "572958792637",
  appId: "1:572958792637:web:daf88a5c50ee29c08c50d4",
  measurementId: "G-EHCQ5880SC"
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);