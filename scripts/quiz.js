
function displayQuizItems() {
    let cardTemplate = document.getElementById("questionBankTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 
    let params = new URL( window.location.href ); //get URL of search bar
    let arrayID = params.searchParams.get( "docID" )
    var arrayIDSplit = arrayID.split('=')
    var ID = arrayIDSplit[0];
    var ID2 = arrayIDSplit[2];

    console.log( ID );
    console.log( ID2 );
  
  db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
  .then( allItems => {
    allItems.forEach(doc => {
        var quizQuestion = doc.data().question;
        console.log( quizQuestion );
        var choice1 = doc.data().choice1;
        var choice2 = doc.data().choice2;
        var choice3 = doc.data().choice3;
        var choice4 = doc.data().choice4;
        // quizAnswer = doc.data().answer;

        let newcard = cardTemplate.content.cloneNode(true)
        
        newcard.querySelector('.quizQuestion').innerHTML = quizQuestion;
                // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
        newcard.querySelector('.choice1').innerHTML = choice1;
        newcard.querySelector('.choice2').innerHTML = choice2;
        newcard.querySelector('.choice3').innerHTML = choice3;
        newcard.querySelector('.choice4').innerHTML = choice4;

        document.getElementById("questionBank-go-here").appendChild(newcard);


    })
    })

}

displayQuizItems(); 

// function myAnswers() {
//   let cardTemplate = document.getElementById("questionBankTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 
//     let params = new URL( window.location.href ); //get URL of search bar
//     let arrayID = params.searchParams.get( "docID" )
//     var arrayIDSplit = arrayID.split('=')
//     var ID = arrayIDSplit[0];
//     var ID2 = arrayIDSplit[2];

//     console.log( ID );
//     console.log( ID2 );
  
//   db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
//   .then( allItems => {
//     allItems.forEach(doc => {
//   console.log("inside write review");




//   let ifChoice1 = document.querySelector('input[name="choice1"]:checked').value;
//   let ifChoice2 = document.querySelector('input[name="choice2"]:checked').value;
//   let ifChoice3 = document.querySelector('input[name="choice3"]:checked').value;
//   let ifChoice4 = document.querySelector('input[name="choice4"]:checked').value;

//   let totalScore = 0;
//   let score1 = 0;
//   let score2 = 0;
//   let score3 = 0;
//   let score4 = 0;
//   let score = 0;


//   let qadb = db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank");

//   let qadb1 = qadb.where('answer','==',ifChoice1);
//   let qadb2 = qadb.where('answer','==',ifChoice2);
//   let qadb3 = qadb.where('answer','==',ifChoice3);
//   let qadb4 = qadb.where('answer','==',ifChoice4);


//   if(qadb1){
//     score1++;
//   }
//   else if(qadb2){
//     score2++;
//   }
//   else if(qadb3){
//     score3++;
//   }
//   else if(qadb4){
//     score4++;
//   }
//   else{
//     score = 0;
//   }

//   totalScore = score1 + score2 +score3 +score4 +score;


// })
// })

// var user = firebase.auth().currentUser;
// if (user) {
//    var currentUser = db.collection("users").doc(user.uid);
//    var userID = user.uid;

//     //  Get the document for the current user.
//   db.collection("quizanswers").add({
//      levelID: ID,
//       topicID: ID2,
//       choice1: score1,
//      choice2: score2,
//     choice3: score3,
//      choice4: score4,
//        userID: userID, // Include the rating in the review
//       timestamp: firebase.firestore.FieldValue.serverTimestamp()
//   }).then(() => {
//       window.location.href = "thanks.html"; // Redirect to the thanks page
//   });
//  } else {
//   console.log("No user is signed in");
//   window.location.href = 'review.html';
// }



// }

function myAnswers() {
  // Retrieve user choices from form inputs
  // let ifChoice1 = document.querySelector('input[name="choice1"]:checked').value;
  let ifChoice2 = document.querySelector('input[name="choice2"]:checked').value;
  let ifChoice3 = document.querySelector('input[name="choice3"]:checked').value;
  let ifChoice4 = document.querySelector('input[name="choice4"]:checked').value;

  let ifChoice1Element = document.querySelector('input[name="choice1"]:checked');
  let ifChoice1 = ifChoice1Element ? ifChoice1Element.value : ''; // If element exists, get its value; otherwise, use empty string

  console.log(ifChoice1);

  // Define variables to store scores
  let score1 = 0;
  let score2 = 0;
  let score3 = 0;
  let score4 = 0;

  // Retrieve level and topic IDs from URL
  let params = new URL(window.location.href);
  let arrayID = params.searchParams.get("docID");
  let arrayIDSplit = arrayID.split('=');
  let ID = arrayIDSplit[0];
  let ID2 = arrayIDSplit[2];

  // Get a reference to the question bank collection
  let qadb = db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank");

  // Query the question bank for each choice and update scores accordingly
  qadb.where('answer', '==', ifChoice1).get().then((snapshot) => {
      if (!snapshot.empty) score1++;
      return qadb.where('answer', '==', ifChoice2).get();
  }).then((snapshot) => {
      if (!snapshot.empty) score2++;
      return qadb.where('answer', '==', ifChoice3).get();
  }).then((snapshot) => {
      if (!snapshot.empty) score3++;
      return qadb.where('answer', '==', ifChoice4).get();
  }).then((snapshot) => {
      if (!snapshot.empty) score4++;

      // Calculate total score
      let totalScore = score1 + score2 + score3 + score4;

      // Get current user ID
      let user = firebase.auth().currentUser;
      if (user) {
          let userID = user.uid;
          // Store quiz answers in the database
          db.collection("quizanswers").add({
              levelID: ID,
              topicID: ID2,
              choice1: score1,
              choice2: score2,
              choice3: score3,
              choice4: score4,
              userID: userID,
              timestamp: firebase.firestore.FieldValue.serverTimestamp()
          }).then(() => {
              window.location.href = "thanks.html"; // Redirect to the thanks page
          }).catch((error) => {
              console.error("Error writing document: ", error);
          });
      } else {
          console.log("No user is signed in");
          window.location.href = 'review.html';
      }
  }).catch((error) => {
      console.error("Error getting documents: ", error);
  });
}



