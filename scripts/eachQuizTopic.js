
      function displayQuizLevelTopics() {
        let params2 = new URL( window.location.href ); //get URL of search bar
        let ID2 = params.searchParams.get( "docID" ); //get value for key "id"
        console.log( ID2 );
      
      db.collection("level").doc(ID2).collection("quiz").get().then( doc => {
        thisTopic = doc.data();
        topicTitle = doc.data().title;
        
        // only populate title, and image
        document.getElementById( "topicTitle" ).innerHTML = topicTitle;
        
        
        
    
        });
   
  }
    displayQuizLevelTopics();
