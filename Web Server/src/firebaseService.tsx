import firebase from './firebase';

const database = firebase.database();

export const fetchData = async () => {
  try {
    const snapshot = await database.ref('Scale_1').once('value');
    return snapshot.val();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
