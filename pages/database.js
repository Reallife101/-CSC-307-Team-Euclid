var firebaseConfig = {
    apiKey:        "AIzaSyDl0gkgD1D9usTr8ngnMr5bRVu5Ac2jbmg",
    authDomain:    "euclidean-geometry-61a34.firebaseapp.com",
    databaseURL:   "https://euclidean-geometry-61a34-default-rtdb.firebaseio.com",
    projectId:     "euclidean-geometry-61a34",
    storageBucket: "euclidean-geometry-61a34.appspot.com",
    messagingSenderId: "404877681598",
    appId:         "1:404877681598:web:734231928fc50797ad0fef",
    measurementId: "G-NX9T5ZKKHL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// write to database
// read to database
function writeToFirebase(cardSet, id){
    firebase.database().ref().child("set-names").get().then((snapshot) => {
        if (snapshot.exists()) {
            console.log("exists");
            var setIds = snapshot.val();
            if(!setIds.includes(id)){
                setIds = setIds.concat(id);
                firebase.database().ref("set-names").set(setIds);
            }
        }else{
            console.log("doesnt exists");
            firebase.database().ref("set-names").set([id]);
        }
    }).catch((error) => {
        console.log("error");
        console.error(error);
    });
    firebase.database().ref(id).set(cardSet);
}
async function readFromFirebase(id){
    return firebase.database().ref().child(id).get().then((snapshot) => {
        if (snapshot.exists()) {
            return snapshot.val();
        }else{
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

export { readFromFirebase, writeToFirebase };