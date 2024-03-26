function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("quizLevelTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection(collection).orderBy("levelNum").get()   //the collection called "hikes"
        .then(allLevel=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allLevel.forEach(doc => { //iterate thru each doc
                var title = doc.data().levelName;       // get value of the "name" key
                var quote = doc.data().quote;  // get value of the "details" key
								var levelNum = doc.data().levelNum;    //get unique ID to each hike to be used for fetching right image
                // var hikeLength = doc.data().length; //gets the length field
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                // newcard.querySelector('.card-length').innerHTML = hikeLength +"km";
                newcard.querySelector('.card-text').innerHTML = quote;
                newcard.querySelector('.card-image').src = `./images/${levelNum}.jpg`; //Example: NV01.jpg
                newcard.querySelector('a').href = "eachQuizLevel.html?docID="+docID;
                
                //Optional: give unique ids to all elements for future use
                // newcard.querySelector('.card-title').setAttribute("id", "ctitle" + i);
                // newcard.querySelector('.card-text').setAttribute("id", "ctext" + i);
                // newcard.querySelector('.card-image').setAttribute("id", "cimage" + i);

                //attach to gallery, Example: "hikes-go-here"
                document.getElementById(collection + "-go-here").appendChild(newcard);

                //i++;   //Optional: iterate variable to serve as unique ID
            })
        })
}

displayCardsDynamically("level");  //input param is the name of the collection