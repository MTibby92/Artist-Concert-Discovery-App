// Initialize Firebase
var config = {
    apiKey: "AIzaSyAbRh1nH7CnVIFKc-uz2QOH1KVuMGTMKic",
    authDomain: "music-rec-app.firebaseapp.com",
    databaseURL: "https://music-rec-app.firebaseio.com",
    storageBucket: "music-rec-app.appspot.com",
    messagingSenderId: "886344174594"
};
firebase.initializeApp(config)


function getHistory() {
    var arr = []
    var myUserID = firebase.auth().currentUser.uid
    $('#dropdown1').empty()
    firebase.database().ref('history/' + myUserID).limitToLast(5).on('child_added', function(snapshot) {
        // console.log(snapshot.val())
        // console.log(snapshot.val().search)
        $('#dropdown1').append('<li><a href="#!">' + snapshot.val().search + '</a></li>')
        $('#dropdown1').append('<li class="divider"></li>')
        var ul = document.getElementById('dropdown1')
        var i = 0
        var total = ul.getElementsByTagName('li')
        var count = total.length
        count = count/2
        if (count > 5) {
            var target1 = total[0]
            var target2 = total[1]
            var parent = document.getElementById('dropdown1')
            parent.removeChild(target1)
            parent.removeChild(target2)
        }
    })
}

/**
 * Function called when clicking the Login/Logout button.
 */
// [START buttoncallback]
function toggleSignIn() {
    if (!firebase.auth().currentUser) {
        // [START createprovider]
        var provider = new firebase.auth.GoogleAuthProvider();
        // [END createprovider]
        // [START addscopes]
        provider.addScope('https://www.googleapis.com/auth/plus.login');
        // [END addscopes]
        // [START signin]
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            // [START_EXCLUDE]
            document.getElementById('oauthtoken').textContent = token;
            // [END_EXCLUDE]
        }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // [START_EXCLUDE]
            if (errorCode === 'auth/account-exists-with-different-credential') {
                alert('You have already signed up with a different auth provider for that email.');
                // If you are using multiple auth providers on your app you should handle linking
                // the user's accounts here.
            } else {
                console.error(error);
            }
            // [END_EXCLUDE]
        });
        // [END signin]
    } else {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
    }
    // [START_EXCLUDE]
    document.getElementById('sign-in').disabled = true;
    // [END_EXCLUDE]
}
// [END buttoncallback]
/**
 * initApp handles setting up UI event listeners and registering Firebase auth listeners:
 *  - firebase.auth().onAuthStateChanged: This listener is called when the user is signed in or
 *    out, and that is where we update the UI.
 */
function initApp() {
    // Listening for auth state changes.
    // [START authstatelistener]
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // [START_EXCLUDE]
            console.log('Signed In')
            document.getElementById('sign-in').textContent = 'Sign out';
            $('#sign-in').html('Sign-Out')
            // [END_EXCLUDE]
            $('#history').show()
            getHistory()
        } else {
            // User is signed out.
            // [START_EXCLUDE]
            console.log('Signed Out')
            document.getElementById('sign-in').textContent = 'Sign in with Google';
            $('#sign-in').html('Sign-In')
            $('#history').hide()
            // [END_EXCLUDE]
        }
        // [START_EXCLUDE]
        document.getElementById('sign-in').disabled = false;
        // [END_EXCLUDE]
    });
    // [END authstatelistener]
    document.getElementById('sign-in').addEventListener('click', toggleSignIn, false);
}

// window.onload = function() {
//     initApp();
// }

$( document ).ready(function() {
    //$('#sign-in').on('click', initApp)
    initApp()
})