import { initializeApp, getApps, getApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  databaseURL: "https://kuizy-pbo2024-default-rtdb.asia-southeast1.firebasedatabase.app/",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const database = getDatabase(app);

export { database };
