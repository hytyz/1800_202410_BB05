var ui = new firebaseui.auth.AuthUI(firebase.auth());
var uiConfig = {
    callbacks: {
        signInSuccessWithAuthResult: function (authResult, redirectUrl) {
            var user = authResult.user;
            if (authResult.additionalUserInfo.isNewUser) {
               
                db.collection("users").doc(user.uid).set({
                    name: user.displayName,
                    email: user.email
                })
                .then(function () {
                    console.log("New user added to firestore");
                    var subcollectionPromises = [];
                    var subcollectionNames = ["tutorial", "practice", "quiz"];
                    subcollectionNames.forEach(function(subcollectionName) {
                        subcollectionPromises.push(
                            db.collection("users").doc(user.uid).collection(subcollectionName).add({                   
                                exampleField: "exampleValue"
                            })
                        );
                    });
                    return Promise.all(subcollectionPromises);
                })
                .then(function () {
                    console.log("Subcollections created for the new user");
                    window.location.assign("start.html");
                })
                .catch(function (error) {
                    console.log("Error adding new user: " + error);
                });
            } else {
                return true;
            }
            return false;
        },
        uiShown: function() {
            document.getElementById('loader').style.display = 'none';
        }
    },
    signInFlow: 'popup',
    signInSuccessUrl: "start.html",
    signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    tosUrl: '<your-tos-url>',
    privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
