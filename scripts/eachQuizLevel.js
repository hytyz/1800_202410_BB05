function displayQuizLevel() {
  let params = new URL( window.location.href ); //get URL of search bar
  let ID = params.searchParams.get( "docID" ); //get value for key "id"
  console.log( ID );

  // doublecheck: is your collection called "Reviews" or "reviews"?
  db.collection( "level" ) 
      .doc( ID )
      .get()
      .then( doc => {
          thisHike = doc.data();
          levelName = doc.data().levelName;
          
          // only populate title, and image
          document.getElementById( "levelName" ).innerHTML = levelName;
          
          
      } );

      function displayQuizLevelTopics() {
        
      
      var topicListContainer = document.getElementById("quiz-topic-list");
      
                db.collection("level").doc(ID).collection("quiz").get().then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                      var docID = doc.ID2;
                      var topicLink = document.createElement("a");
                      topicLink.href= "#";
                      topicLink.className = "list-group-item list-group-item-action btn";
                      topicLink.textContent = doc.data().title;
                      topicListContainer.appendChild(topicLink);
                  });
              });
            }
              displayQuizLevelTopics();
}
displayQuizLevel();
