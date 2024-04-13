function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("quizLevelTemplate");
    db.collection(collection).orderBy("levelNum").get()
        .then(allLevel => {
            allLevel.forEach(doc => {
                var title = doc.data().levelName;
                var quote = doc.data().quote;
                var levelNum = doc.data().levelNum;
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true);

                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = quote;
                newcard.querySelector('.card-image').src = `./images/${levelNum}.jpg`;
                newcard.querySelector('a').href = "eachQuizLevel.html?docID=" + docID;

                document.getElementById(collection + "-go-here").appendChild(newcard);
            })
        })
}

displayCardsDynamically("level");