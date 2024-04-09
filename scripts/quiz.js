let params = new URL(window.location.href);
    let arrayID = params.searchParams.get("docID")
    var arrayIDSplit = arrayID.split('=')
    var ID = arrayIDSplit[0];
    var ID2 = arrayIDSplit[2];
    
function displayQuizItems() {
    let cardTemplate = document.getElementById("questionBankTemplate");
  
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

    var doneButtonContainer = document.getElementById("goBack-button");
        doneButtonContainer.addEventListener("click", function () {
            
            window.location.href = "eachQuizTopic.html?docID=" + ID + "=docID=" +ID2;
        })

  }
  
  displayQuizItems();

  

  
function quizSubmit() {
    let questionContainers = document.querySelectorAll('.qaNum-go-here');
    let score = 0;
    let questionResults = []; // Array to store detailed results
  
    questionContainers.forEach((container, index) => {
      // Retrieve the selected answer's value, if there's a selected answer
      let selectedAnswer = container.querySelector('input[type="radio"]:checked');
      let correctAnswer = container.querySelector('.answer').textContent.trim(); // Correct answer for this question
  
      if (selectedAnswer) {
        let userAnswer = selectedAnswer.value.trim(); // User's answer for this question
        if (userAnswer === correctAnswer) {
          score++; // Increment score if the answer is correct
          questionResults.push({index: index + 1, correct: true});
          console.log(`Question ${index + 1}: Correct`);
        } else {
        questionResults.push({index: index + 1, correct: false, userAnswer, correctAnswer});
          console.log(`Question ${index + 1}: Incorrect, selected: ${userAnswer}, correct: ${correctAnswer}`);
        }
      } else {
        questionResults.push({index: index + 1, notAnswered: true});
      }
  
      // Show the correct answer div
      container.querySelector('.quizanswer').style.visibility = 'visible';
    });
  
    console.log(`User's score: ${score}/${questionContainers.length}`);
    let total = questionContainers.length;

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;

        if(ID=="beginner"){
            currentUser.update({
                quizResultBeginner: {
                    topic : ID2,
                    userID: userID,
                    score: score,
                    total: total,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
                }).then(() => {
                    console.log("saved");
                    displayScore(score, questionContainers.length, questionResults);
                });
        } else if (ID=="elementary"){
            currentUser.update({
                quizResultElementary: {
                    topic : ID2,
                    userID: userID,
                    score: score,
                    total: total,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
                }).then(() => {
                    console.log("saved");
                    displayScore(score, questionContainers.length, questionResults);
                });
        } else if (ID=="intermediate"){
            currentUser.update({
                quizResultIntermediate: {
                    topic : ID2,
                    userID: userID,
                    score: score,
                    total: total,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
                }).then(() => {
                    console.log("saved");
                    displayScore(score, questionContainers.length, questionResults);
                });
            } else if (ID=="advanced"){
                currentUser.update({
                    quizResultAdvanced: {
                        topic : ID2,
                        userID: userID,
                        score: score,
                        total: total,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }
                    }).then(() => {
                        console.log("saved");
                        displayScore(score, questionContainers.length, questionResults);
                    });
                } else {
                alert("No user is signed in");
                window.location.href = 'index.html';
            }

  }
}
  
  function displayScore(score, total, questionResults) {
    // Update the UI to display the user's score
    // alert(`You scored ${score} out of ${total}`);
    // Construct the detailed results message
    let detailedResults = '';
    questionResults.forEach(result => {
        if (result.correct) {
            detailedResults += `Question ${result.index}: Correct,\n`;
        } else if (result.notAnswered) {
            detailedResults += `Question ${result.index}: Not answered\n`;
        } else {
            detailedResults += `Question ${result.index}: Incorrect, \nSelected: ${result.userAnswer}, \nCorrect: ${result.correctAnswer}\n`;
        }
    });

    // Display the score and detailed results in one alert
    let alertMessage = `You scored ${score} out of ${total}.\n${detailedResults}`;
    showAlert(alertMessage);
  }

  function showAlert(alertMessage) {
    let customAlert = document.getElementById("customAlert");
    let customAlertMessage = document.getElementById("customAlertMessage");

    customAlertMessage.innerHTML = alertMessage.replace(/\n/g, '<br>');
    customAlert.style.display = "block";

    document.getElementById("customAlertClose").addEventListener("click", function() {
        customAlert.style.display = "none";
        window.location.href = "eachQuizLevel.html?docID=" + ID;

    });
}
  
  // Attach the event listener to the submit button
  document.getElementById("submitbutton").addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the default form submission
    quizSubmit();
  });
  