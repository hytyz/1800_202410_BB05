firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var userId = user.uid;
      var userDocRef = db.collection("users").doc(userId);
  
      userDocRef.get().then(userDoc => {
        if (userDoc.exists) {
          const finishedTopics = userDoc.data().finishedTopics;
          const finishedQuizTopics = userDoc.data().finishedQuizTopics ;
  
          displayFinishedTopics(finishedTopics, 'Tutorial');
          displayFinishedTopics(finishedQuizTopics, 'Quiz');
        } else {
          console.log("User document does not exist!");
        }
      }).catch(error => {
        console.error("Error fetching user data:", error);
      });
    } else {
      console.log("No user is signed in.");
    }
  });
  
  function displayFinishedTopics(topicsArray, topicType) {
    var topicsListContainerId = (topicType === 'Tutorial') ? 'finished-topics-list' : 'finished-quiz-topics-list';
    var topicsListContainer = document.getElementById(topicsListContainerId);
    

  
    topicsArray.forEach(topicTitle => {
      var listItem = document.createElement("li");
      listItem.textContent = topicTitle;
      topicsListContainer.appendChild(listItem);
    });
  }
  