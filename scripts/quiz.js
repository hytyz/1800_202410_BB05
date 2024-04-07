
// function displayQuizItems() {
//     let cardTemplate = document.getElementById("questionBankTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 
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
//         var quizQuestion = doc.data().question;
//         console.log( quizQuestion );

//         var quizAnswer = doc.data().answer;

//         var choice1 = doc.data().choices[0];
//         var choice2 = doc.data().choices[1];
//         var choice3 = doc.data().choices[2];
//         var choice4 = doc.data().choices[3];
//         // quizAnswer = doc.data().answer;

//         let newcard = cardTemplate.content.cloneNode(true)
        
//         newcard.querySelector('.quizQuestion').innerHTML = quizQuestion;
//                 // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
//         newcard.querySelector('.choice1').innerHTML = choice1;
//         newcard.querySelector('.choice2').innerHTML = choice2;
//         newcard.querySelector('.choice3').innerHTML = choice3;
//         newcard.querySelector('.choice4').innerHTML = choice4;
//         newcard.querySelector('.answer').innerHTML = quizAnswer;


//         document.getElementById("questionBank-go-here").appendChild(newcard);
//     })
//     })

// }

function displayQuizItems() {
  let cardTemplate = document.getElementById("questionBankTemplate");
  let params = new URL(window.location.href);
  let arrayID = params.searchParams.get("docID")
  var arrayIDSplit = arrayID.split('=')
  var ID = arrayIDSplit[0];
  var ID2 = arrayIDSplit[2];

  db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
  .then(allItems => {
      allItems.forEach(doc => {
          let newCard = cardTemplate.content.cloneNode(true);

          // Set the question text
          newCard.querySelector('.quizQuestion').textContent = doc.data().question;

          // Set the choices and their values
          doc.data().choices.forEach((choice, index) => {
              let choiceLabel = newCard.querySelector('.choice' + (index + 1));
              let choiceInput = choiceLabel.previousElementSibling;
              choiceInput.value = choice; // Set the input value to the choice text
              choiceLabel.textContent = choice; // Set the label text to the choice text
          });

          // Store the correct answer in a hidden span
          newCard.querySelector('.answer').textContent = doc.data().answer;

          document.getElementById("questionBank-go-here").appendChild(newCard);
      })
  });
}

displayQuizItems();

function quizSubmit() {
  let questionContainers = document.querySelectorAll('.qaNum-go-here');
  let score = 0;

  questionContainers.forEach((container, index) => {
    // Retrieve the selected answer's value, if there's a selected answer
    let selectedAnswer = container.querySelector('input[type="radio"]:checked');
    let correctAnswer = container.querySelector('.answer').textContent.trim(); // Correct answer for this question

    if (selectedAnswer) {
      let userAnswer = selectedAnswer.value.trim(); // User's answer for this question
      if (userAnswer === correctAnswer) {
        score++; // Increment score if the answer is correct
        console.log(`Question ${index + 1}: Correct`);
      } else {
        console.log(`Question ${index + 1}: Incorrect, selected: ${userAnswer}, correct: ${correctAnswer}`);
      }
    } else {
      console.log(`Question ${index + 1}: Not answered`);
    }

    // Show the correct answer div
    container.querySelector('.quizanswer').style.visibility = 'visible';
  });

  console.log(`User's score: ${score}/${questionContainers.length}`);
  displayScore(score, questionContainers.length);
}

function displayScore(score, total) {
  // Update the UI to display the user's score
  alert(`You scored ${score} out of ${total}`);
}

// Attach the event listener to the submit button
document.getElementById("submitbutton").addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the default form submission
  quizSubmit();
});


// function displayQuizItems() {
//     let cardTemplate = document.getElementById("questionBankTemplate");
//     let params = new URL(window.location.href);
//     let arrayID = params.searchParams.get("docID")
//     var arrayIDSplit = arrayID.split('=')
//     var ID = arrayIDSplit[0];
//     var ID2 = arrayIDSplit[2];

//     console.log(ID);
//     console.log(ID2);

//     db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
//         .then(allItems => {
//             allItems.forEach((doc, index) => {
//                 var quizQuestion = doc.data().question;
//                 console.log(quizQuestion);

//                 var quizAnswer = doc.data().answer;

//                 var choice1 = doc.data().choices[0];
//                 var choice2 = doc.data().choices[1];
//                 var choice3 = doc.data().choices[2];
//                 var choice4 = doc.data().choices[3];

//                 let newcard = cardTemplate.content.cloneNode(true);

//                 newcard.querySelector('.quizQuestion').innerHTML = quizQuestion;
//                 newcard.querySelector('.choice1').innerHTML = choice1;
//                 newcard.querySelector('.choice2').innerHTML = choice2;
//                 newcard.querySelector('.choice3').innerHTML = choice3;
//                 newcard.querySelector('.choice4').innerHTML = choice4;
//                 newcard.querySelector('.answer').innerHTML = quizAnswer;

//                 // Set unique IDs for input elements and answer spans
//                 newcard.querySelector('.answer').id = `answer_${index + 1}`;
                
//                 newcard.querySelectorAll('input[type="radio"]').forEach((input, inputIndex) => {
//                     input.id = `q${index + 1}_option${inputIndex + 1}`;
//                     input.setAttribute('name', `q${index + 1}_option`);
//                     input.setAttribute('value', `q${index + 1}_option${inputIndex + 1}`);
//                     input.nextElementSibling.setAttribute('for', `q${index + 1}_option${inputIndex + 1}`);
                    
//                     input.addEventListener('click', function() {
//                         var correctAnswer = document.getElementById(`answer_${index + 1}`).innerHTML;
//                         var selectedAnswer = document.querySelector(`input[name="q${index + 1}_option"]:checked`).value.innerHTML;

//                         if (correctAnswer === selectedAnswer) {
//                             alert('Correct answer!');
//                         } else {
//                             alert('Wrong answer!');
//                         }
//                     });
//                 });
               

                

//                 document.getElementById("questionBank-go-here").appendChild(newcard);
//             })
//         })
// }

// displayQuizItems();



// function saveUserAnswers(answers) {
//   let params = new URL( window.location.href ); //get URL of search bar
//   let arrayID = params.searchParams.get( "docID" )
//   var arrayIDSplit = arrayID.split('=')
//   var ID = arrayIDSplit[0];
//   var ID2 = arrayIDSplit[2];

//   console.log( ID );
//   console.log( ID2 );

//   // Assuming you have a collection named 'useranswers' in Firestore

//   db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get()
//   .then( allItems => {
//     allItems.forEach(doc => {
//         var userAns = doc.add({
//             userAns: userChoice

//         })
//     })
//     })
// }

// function checkUserAnswers(answers) {

//   let params = new URL( window.location.href ); //get URL of search bar
//   let arrayID = params.searchParams.get( "docID" )
//   var arrayIDSplit = arrayID.split('=')
//   var ID = arrayIDSplit[0];
//   var ID2 = arrayIDSplit[2];

//   console.log( ID );
//   console.log( ID2 );
//   // Assuming you have a collection named 'questionbank' in Firestore
//   db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank")
//   .get().then((querySnapshot) => {
//       querySnapshot.forEach((doc) => {
//           const userAns = doc.data().userAns;
//           const correctAnswer = doc.data().answer;

//           // Compare user's answer with correct answer
//           if (userAns === correctAnswer) {
//               console.log(`Question ${doc.id} is correct!`);
//           } else {
//               console.log(`Question ${doc.id} is incorrect!`);
//           }
//       });
//   });
// }

// document.getElementById("quizForm").addEventListener("submit", function(event) {
//   event.preventDefault();

//   const form = event.target;
//   const formData = new FormData(form);
//   const answers = {};

//   // Iterate through form elements to get selected answers
//   for (let i = 1; i <= 5; i++) {
//       const selectedAnswer = formData.get(`choices${i}`);
//       answers[`choices${i}`] = selectedAnswer;
//   }

//   // Save user answers to the database
//   saveUserAnswers(answers);

//   // Check user answers against the correct answers
//   checkUserAnswers(answers);
// });

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