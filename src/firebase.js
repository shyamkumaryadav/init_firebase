import firebase from 'firebase/app'
import "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCgcOmsl2U6Avb-YNe4Gyde3PbHzQ11oRY",
    authDomain: "shyamkumaryadavp1.firebaseapp.com",
    projectId: "shyamkumaryadavp1",
    storageBucket: "shyamkumaryadavp1.appspot.com",
    messagingSenderId: "367679306487",
    appId: "1:367679306487:web:ace57b24bbcc38cbc4f1f2"
};

firebase.initializeApp(firebaseConfig);
export default firebase;
