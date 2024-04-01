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
    db.collection('news').orderBy('timestamp', 'desc').get().then(snapshot => {
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
                db.collection("news").add({
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
        window.location.href = 'signin.html';
    }
});