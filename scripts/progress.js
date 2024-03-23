var subcollectionsList = document.getElementById('subcollectionsList');

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        var userId = user.uid;
        var subcollectionNames = ["tutorial", "practice", "quiz"];

        subcollectionNames.forEach(function(subcollectionName) {
            
            var subcollectionHeading = document.createElement('h3');
            subcollectionHeading.textContent = subcollectionName.charAt(0).toUpperCase() + subcollectionName.slice(1); // Capitalize the first letter
            
            subcollectionsList.appendChild(subcollectionHeading);

            var listGroupDiv = document.createElement('div');
            listGroupDiv.classList.add('list-group');
            subcollectionsList.appendChild(listGroupDiv);


            db.collection('users').doc(userId).collection(subcollectionName).get().then(function(querySnapshot) {
                if (!querySnapshot.empty) {
                    querySnapshot.forEach(function(doc) {
                        var listItem = document.createElement('a');
                        listItem.href = '#';
                        listItem.classList.add('list-group-item', 'list-group-item-action');
                        var data = doc.data();
                        listItem.textContent = data.exampleField; 
                        listGroupDiv.appendChild(listItem);
                    });
                } else {
                    var listItem = document.createElement('a');
                    listItem.href = '#';
                    listItem.classList.add('list-group-item', 'list-group-item-action', 'disabled');
                    listItem.textContent = "No items found in " + subcollectionName;
                    listGroupDiv.appendChild(listItem);
                }
            }).catch(function(error) {
                console.log('Error getting documents from subcollection:', error);
            });
        });
    } 
});
