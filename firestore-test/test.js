const admin = require('firebase-admin');
const serviceAccount = require('./virtual-friends-8afc9-firebase-adminsdk-c2hso-50588cbb8b.json');
  // Make sure this path is correct

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function fetchDocument() {
  const userId = '3L3h4PPRqPN8391DoNpcf7ySMg92';
  const virtualFriendId = 'hDqathqSYn6Nud3Un3rH';
  const docPath = `users/${userId}/virtualFriends/${virtualFriendId}`;
  
  const docRef = db.doc(docPath);
  const doc = await docRef.get();
  
  if (doc.exists) {
    console.log("Document exists!", doc.data());
  } else {
    console.log("No such document!");
  }
}

fetchDocument().catch(console.error);
