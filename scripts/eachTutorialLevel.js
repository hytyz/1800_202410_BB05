var currentUser; 
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
  } 
});

function displayTutorialLevel() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("docID"); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection("level")
    .doc(ID)
    .get()
    .then(doc => {
      levelName = doc.data().levelName;
      document.getElementById("levelName").innerHTML = levelName;
      
    });

    
  function displayTutorialLevelTopics() {
    
    var topicListContainer = document.getElementById("tutorial-topic-list");
    db.collection("level").doc(ID).collection("tutorial").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        var docID = ID;
        var docID2 = doc.id;
        currentUser.get().then(userDoc => {
          var finishedTopics = userDoc.data().finishedTopics;
          if (finishedTopics.includes(doc.data().title)) {
            topicCheckbox.checked = true;
          }
        });
        var topicLink = document.createElement("a");
        topicLink.href = "tutorialArticle.html?docID=" + docID + "&docID2=" + docID2;
        topicLink.className = "list-group-item list-group-item-action btn";
        topicLink.textContent = doc.data().title;


        var topicCheckbox = document.createElement("input");
        topicCheckbox.type = "checkbox";
        topicCheckbox.className = "topic-checkbox";
        topicCheckbox.setAttribute("data-docid", docID2); 
        topicCheckbox.setAttribute("data-title", doc.data().title); 
        

        topicCheckbox.addEventListener('change', (event) => {
          const isChecked = event.target.checked;
 
          const topicTitle = event.target.getAttribute("data-title");
          handleCheckbox(topicTitle, isChecked);
      });


        var containerDiv = document.createElement("div");
        containerDiv.className = "topic-container";
        containerDiv.appendChild(topicLink);
        containerDiv.appendChild(topicCheckbox);
        topicListContainer.appendChild(containerDiv);
      });
    });
  }
  displayTutorialLevelTopics();
  var doneButtonContainer = document.getElementById("goBack-button");
    var doneButton = document.createElement("button");
    doneButton.classList.add("btn", "btn-primary", "btn-lg", "btn-danger");
    doneButton.textContent = "Go Back";
    doneButtonContainer.appendChild(doneButton);

    doneButton.addEventListener("click", function () {
        
        window.location.href = "quizlevel.html";
    });
}
displayTutorialLevel();



function handleCheckbox(topicTitle, isChecked) {
  if (isChecked) {
    currentUser.update({
      finishedTopics: firebase.firestore.FieldValue.arrayUnion(topicTitle)
    }).then(() => {
      alert("Tutorial marked complete");
      console.log("Topic added");
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  } else {
    currentUser.update({
      finishedTopics: firebase.firestore.FieldValue.arrayRemove(topicTitle)
    }).then(() => {
      alert("Tutorial marked incomplete");
      console.log("Topic removed from user's selected topics.");
    }).catch((error) => {
      console.error("Error updating document:", error);
    });
  }
}
