
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

    function saveTopicReviewDocumentIDAndRedirect(){
        let params = new URL( window.location.href ); //get URL of search bar
        let arrayID = params.searchParams.get( "docID" )
        var arrayIDSplit = arrayID.split('=')
        var ID = arrayIDSplit[0];
        var ID2 = arrayIDSplit[2];
        localStorage.setItem('quizTopicReviewDocIDMain', ID)
        localStorage.setItem('quizTopicReviewDocID', ID2);
        window.location.href = 'quizTopicReview.html';
    }
    
    function populateReviews() {
        console.log("test");
        let reviewCardTemplate = document.getElementById("reviewCardTemplate");
        let reviewCardGroup = document.getElementById("reviewCardGroup");
    
        let params = new URL(window.location.href); // Get the URL from the search bar

        let arrayID = params.searchParams.get( "docID" )
        var arrayIDSplit = arrayID.split('=')
        var ID = arrayIDSplit[0];
        var ID2 = arrayIDSplit[2];

        console.log( ID );
        console.log( ID2 );
    
        // Double-check: is your collection called "Reviews" or "reviews"?
        db.collection("review")
            .where("quizTopicReviewDocIDMain", "==", ID)
            .where("quizTopicReviewDocID", "==", ID2)
            .get()
            .then((allReviews) => {
                reviews = allReviews.docs;
                console.log(reviews);
                reviews.forEach((doc) => {
                    var title = doc.data().title;
                    var level = doc.data().level;
                    var description = doc.data().description;
                    var time = doc.data().timestamp.toDate();
                    var rating = doc.data().rating; // Get the rating value
                    console.log(rating)
    
                    console.log(time);
    
                    let reviewCard = reviewCardTemplate.content.cloneNode(true);
                    reviewCard.querySelector(".title").innerHTML = title;
                    reviewCard.querySelector(".time").innerHTML = new Date(
                        time
                    ).toLocaleString();
                    reviewCard.querySelector(".level").innerHTML = `Level: ${level}`;
                    reviewCard.querySelector( ".description").innerHTML = `Description: ${description}`;
    
                    // Populate the star rating based on the rating value
                    
                      // Initialize an empty string to store the star rating HTML
                                    let starRating = "";
                                    // This loop runs from i=0 to i<rating, where 'rating' is a variable holding the rating value.
                    for (let i = 0; i < rating; i++) {
                        starRating += '<span class="material-icons">star</span>';
                    }
                                    // After the first loop, this second loop runs from i=rating to i<5.
                    for (let i = rating; i < 5; i++) {
                        starRating += '<span class="material-icons">star_outline</span>';
                    }
                    reviewCard.querySelector(".star-rating").innerHTML = starRating;
    
                    reviewCardGroup.appendChild(reviewCard);
                });
            });
    }
    
    populateReviews();
