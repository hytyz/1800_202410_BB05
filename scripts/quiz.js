
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

        var choice1 = doc.data().choices[0];
        var choice2 = doc.data().choices[1];
        var choice3 = doc.data().choices[2];
        var choice4 = doc.data().choices[3];
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

function saveUserAnswers(answers) {
  let params = new URL( window.location.href ); //get URL of search bar
  let arrayID = params.searchParams.get( "docID" )
  var arrayIDSplit = arrayID.split('=')
  var ID = arrayIDSplit[0];
  var ID2 = arrayIDSplit[2];

  console.log( ID );
  console.log( ID2 );

  // Assuming you have a collection named 'useranswers' in Firestore

  db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
  .then( allItems => {
    allItems.forEach(doc => {
        var userAns = doc.add({
            userAns: userChoice

        })
    })
    })
}

function checkUserAnswers(answers) {

  let params = new URL( window.location.href ); //get URL of search bar
  let arrayID = params.searchParams.get( "docID" )
  var arrayIDSplit = arrayID.split('=')
  var ID = arrayIDSplit[0];
  var ID2 = arrayIDSplit[2];

  console.log( ID );
  console.log( ID2 );
  // Assuming you have a collection named 'questionbank' in Firestore
  db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank")
  .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          const userAns = doc.data().userAns;
          const correctAnswer = doc.data().answer;

          // Compare user's answer with correct answer
          if (userAns === correctAnswer) {
              console.log(`Question ${questionId} is correct!`);
          } else {
              console.log(`Question ${questionId} is incorrect!`);
          }
      });
  });
}

document.getElementById("quizForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const answers = {};

  // Iterate through form elements to get selected answers
  for (let i = 1; i <= 5; i++) {
      const selectedAnswer = formData.get(`choices${i}`);
      answers[`choices${i}`] = selectedAnswer;
  }

  // Save user answers to the database
  saveUserAnswers(answers);

  // Check user answers against the correct answers
  checkUserAnswers(answers);
});

// const quizSubmit = document.getElementById('quizSubmit');
// const ifChoice1 = document.querySelector('input[name="choice1"]:checked');
// const ifChoice2 = document.querySelector('input[name="choice2"]:checked');
// const ifChoice3 = document.querySelector('input[name="choice3"]:checked');
// const ifChoice4 = document.querySelector('input[name="choice4"]:checked');

// quizSubmit.addEventListener('submit', (e) => {
//     e.preventDefault();
//     var user = firebase.auth().currentUser;
//     if (user) {
//         var ifChoice1 = ifChoice1.value;
//         var ifChoice2 = ifChoice2.value;
//         var ifChoice3 = ifChoice3.value;
//         var ifChoice4 = ifChoice4.value;


//         if (ifChoice1 !== '' || ifChoice2 !== '' || ifChoice3 !== '' || ifChoice4 !== '') {
//             var userID = user.uid;
//             db.collection("users").doc(user.uid).get().then(doc => {
//                 var userName = doc.data().name;
//                 var userEmail = doc.data().email;

//                 let params = new URL(window.location.href);
//                 let arrayID = params.searchParams.get("docID");
//                 var arrayIDSplit = arrayID.split('=')
//                 var ID = arrayIDSplit[0];
//                 var ID2 = arrayIDSplit[2];

//                 db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank")
//                     .get().then(allItems => {
//                         allItems.forEach(doc => {
//                             // Add user's answers to Firestore
//                             doc.ref.collection("userAnswers").add({
//                                 levelID: ID,
//                                 topicID: ID2,
//                                 userName: userName,
//                                 userEmail: userEmail,
//                                 ifChoice1: ifChoice1,
//                                 ifChoice2: ifChoice2,
//                                 ifChoice3: ifChoice3,
//                                 ifChoice4: ifChoice4,
//                                 userID: userID,
//                                 timestamp: firebase.firestore.FieldValue.serverTimestamp()
//                             }).then(() => {
//                                 console.log("User answers added successfully");
//                             }).catch(error => {
//                                 console.error("Error adding user answers: ", error);
//                             });
//                         })
//                     }).catch(error => {
//                         console.error("Error getting quiz questions: ", error);
//                     });
//             })
//         }
//     } else {
//         console.log("No user is signed in");
//         window.location.href = 'index.html';
//     }
// });