
function displayQuizItems() {
    let params = new URL( window.location.href ); //get URL of search bar
    let arrayID = params.searchParams.get( "docID" )
    var arrayIDSplit = arrayID.split('=')
    var ID = arrayIDSplit[0];
    var ID2 = arrayIDSplit[2];

    console.log( ID );
    console.log( ID2 );
  
  db.collection("level").doc(ID).collection("quiz").doc(ID2).collection("questionBank").get().then( doc => {
    thisQuizItem = doc.data();
    quizQuestion = doc.data().question;
    quizChoice1 = doc.data().choice1;
    quizChoice2 = doc.data().choice2;
    quizChoice3 = doc.data().choice3;
    quizChoice4 = doc.data().choice4;
    quizAnswer = doc.data().answer;
    
    // only populate title, and image
    document.getElementById( "quizQuestion" ).innerHTML = quizQuestion;
    document.getElementById( "choice1" ).innerHTML = quizChoice1;
    document.getElementById( "choice2" ).innerHTML = quizChoice2;
    document.getElementById( "choice3" ).innerHTML = quizChoice3;
    document.getElementById( "choice4" ).innerHTML = quizChoice4;

    document.getElementById( "submitQuiz" ).href = "quizResult.html?docID="+docID+"=docID2="+docID2;

    });

}
