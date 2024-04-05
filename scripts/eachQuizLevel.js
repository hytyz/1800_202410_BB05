var currentUser; 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
  } 
});

function displayQuizLevel() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("level")
    .doc(ID)
    .get()
    .then(doc => {
      thisHike = doc.data();
      levelName = doc.data().levelName;
      document.getElementById("levelName").innerHTML = levelName;
    });

  function displayQuizLevelTopics() {


    var topicListContainer = document.getElementById("quiz-topic-list");

    db.collection("level").doc(ID).collection("quiz").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docID = ID;
        var docID2 = doc.id;

        currentUser.get().then(userDoc => {
          var finishedQuizTopics = userDoc.data().finishedQuizTopics;
          if (finishedQuizTopics.includes(doc.data().title)) {
            topicCheckbox.checked = true;
          }
        });

        var topicLink = document.createElement("a");
        topicLink.href = "eachQuizTopic.html?docID=" + docID + "=docID2=" + docID2;
        topicLink.className = "list-group-item list-group-item-action btn";
        topicLink.textContent = doc.data().title;

        var topicCheckbox = document.createElement("input");
        topicCheckbox.type = "checkbox";
        topicCheckbox.className = "topic-checkbox";
        topicCheckbox.id = "checkbox-" + docID2;
        topicCheckbox.setAttribute("data-docid", docID2);
        topicCheckbox.setAttribute("data-title", doc.data().title); 



        var containerDiv = document.createElement("div");
        containerDiv.className = "topic-container";
        containerDiv.appendChild(topicLink);
        containerDiv.appendChild(topicCheckbox);
        topicListContainer.appendChild(containerDiv);
        
        topicCheckbox.addEventListener('change', (event) => {
          const isChecked = event.target.checked;
 
          const topicTitle = event.target.getAttribute("data-title");
          handleCheckbox(topicTitle, isChecked);
        });
      });
    });
  }
  displayQuizLevelTopics();

  var doneButtonContainer = document.getElementById("goBack-button");
    var doneButton = document.createElement("button");
    doneButton.classList.add("btn", "btn-primary", "btn-lg", "btn-danger");
    doneButton.textContent = "Go Back";
    doneButtonContainer.appendChild(doneButton);

    doneButton.addEventListener("click", function () {
        
        window.location.href = "quizlevel.html";
    });
}
displayQuizLevel();


function handleCheckbox(topicTitle, isChecked) {
  if (isChecked) {
    currentUser.update({
      finishedQuizTopics: firebase.firestore.FieldValue.arrayUnion(topicTitle)
    }).then(() => {
      alert("Quiz marked complete")
      console.log("Topic added");
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  } else {
    currentUser.update({
      finishedQuizTopics: firebase.firestore.FieldValue.arrayRemove(topicTitle)
    }).then(() => {
      alert("Quiz marked incomplete")
      console.log("Topic removed from user's selected topics.");
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  }
}
