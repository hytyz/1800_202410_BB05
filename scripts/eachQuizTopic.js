
      function displayQuizLevelTopic() {
        let params = new URL( window.location.href ); //get URL of search bar
        let arrayID = params.searchParams.get( "docID" )
        var arrayIDSplit = arrayID.split('=')
        var ID = arrayIDSplit[0];
        var ID2 = arrayIDSplit[2];

        console.log( ID );
        console.log( ID2 );
      
      db.collection("level").doc(ID).collection("quiz").doc(ID2).get().then( doc => {
        thisTopic = doc.data();
        topicTitle = doc.data().title;
        var docID = ID;  
                    var docID2 = ID2;
        
        // only populate title, and image
        document.getElementById( "topicTitle" ).innerHTML = topicTitle;

        document.getElementById( "takeQuiz" ).href = "quiz.html?docID="+docID+"=docID2="+docID2;

        });
   
  }
    displayQuizLevelTopic();

const postForm = document.getElementById('postForm');
const postInput = document.getElementById('postInput');
const timeline = document.getElementById('timeline');

function renderPost(doc) {
    const data = doc.data();
    const postDiv = document.createElement('div');
    postDiv.classList.add('post');
    postDiv.innerHTML = `
        <p>${data.content}</p>
        <small>${data.author}</small>
    `;
    timeline.appendChild(postDiv);
}

function getPosts() {
    let params = new URL( window.location.href ); //get URL of search bar
        let arrayID = params.searchParams.get( "docID" )
        var arrayIDSplit = arrayID.split('=')
        var ID = arrayIDSplit[0];
        var ID2 = arrayIDSplit[2];

        console.log( ID );
        console.log( ID2 );
      
      db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("review").orderBy('timestamp', 'desc').get().then( snapshot => {
        snapshot.docs.forEach(doc => {
            renderPost(doc);
        });

    });
}

getPosts();

postForm.addEventListener('submit', (e) => {
    e.preventDefault();
    var user = firebase.auth().currentUser;
    if (user) {
        var content = postInput.value.trim();
        if (content !== '') {
            var userID = user.uid;
            // Get the current user's name and email from Firestore
            db.collection("users").doc(user.uid).get().then(doc => {
                var userName = doc.data().name;
                var userEmail = doc.data().email;

                // Add the news post to Firestore
                let params = new URL( window.location.href ); //get URL of search bar
                let arrayID = params.searchParams.get( "docID" )
                var arrayIDSplit = arrayID.split('=')
                var ID = arrayIDSplit[0];
                var ID2 = arrayIDSplit[2];

                console.log( ID );
                console.log( ID2 );
        db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("review").add({
                    content: content,
                    author: userName,
                    email: userEmail,
                    userID: userID,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }).then(() => {
                    // Clear the input field after posting
                    postInput.value = '';
                    // Clear the timeline to avoid duplicate posts
                    timeline.innerHTML = '';
                    // Fetch and display the updated news posts
                    getPosts();
                }).catch(error => {
                    console.error('Error adding document: ', error);
                });
            }).catch(error => {
                console.error('Error getting user document: ', error);
            });
        }
    } else {
        // Redirect the user to the sign-in page if not signed in
        console.log("No user is signed in");
        window.location.href = 'index.html';
    }
});
