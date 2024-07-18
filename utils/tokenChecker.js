import { database } from './firebaseConfig.js';
import { ref, get } from 'firebase/database';

export async function getUsernameFromToken() {
  const localToken = localStorage.getItem('authToken');
  if (localToken) {
    const usersRef = ref(database, 'pengajar/');
    try {
      const snapshot = await get(usersRef);
      if (snapshot.exists()) {
        const users = snapshot.val();
        const user = Object.values(users).find(user => user.token === localToken);
        if (user) {
          return user.username;
        } else {
          localStorage.removeItem('authToken');
        }
      }
    } catch (error) {
      console.error('Error checking token:', error);
    }
  }
  return null;
}
