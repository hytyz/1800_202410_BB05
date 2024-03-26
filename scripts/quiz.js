
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
        quizChoice1 = doc.data().choice1;
        quizChoice2 = doc.data().choice2;
        quizChoice3 = doc.data().choice3;
        quizChoice4 = doc.data().choice4;
        // quizAnswer = doc.data().answer;

        let newcard = cardTemplate.content.cloneNode(true)
        
        newcard.querySelector('.quizQuestion').innerHTML = quizQuestion;
                // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
        newcard.querySelector('.choice1').innerHTML = quizChoice1;
        newcard.querySelector('.choice2').innerHTML = quizChoice2;
        newcard.querySelector('.choice3').innerHTML = quizChoice3;
        newcard.querySelector('.choice4').innerHTML = quizChoice4;

        document.getElementById("questionBank-go-here").appendChild(newcard);


    })
    

    

    })

}

displayQuizItems(); 


