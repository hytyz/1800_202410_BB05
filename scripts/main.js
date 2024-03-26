function getNameFromAuth() {
    firebase.auth().onAuthStateChanged(user => {
        // Check if a user is signed in:
        if (user) {
            // Do something for the currently logged-in user here: 
            console.log(user.uid); //print the uid in the browser console
            console.log(user.displayName);  //print the user name in the browser console
            userName = user.displayName;

            //method #1:  insert with JS
            document.getElementById("name-goes-here").innerText = userName;    

        } else {
            // No user is signed in.
            console.log ("No user is logged in");
        }
    });
}
getNameFromAuth(); 


function writeMenu() {
    //define a variable for the collection you want to create in Firestore to populate data
    var menuRef = db.collection("menu");

    console.log("working");

    menuRef.add({
        code: "MENU01",
        name: "Tutorials", 
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
    menuRef.add({
        code: "MENU02",
        name: "Quizzes", //replace with your own city?
        last_updated: firebase.firestore.FieldValue.serverTimestamp() 
    });
    menuRef.add({
        code: "MENU03",
        name: "Progress", //replace with your own city?
        last_updated: firebase.firestore.FieldValue.serverTimestamp() 
    });
    menuRef.add({
        code: "MENU04",
        name: "News", //replace with your own city?
        last_updated: firebase.firestore.FieldValue.serverTimestamp() 
    });
}



//------------------------------------------------------------------------------
// Input parameter is a string representing the collection we are reading from
//------------------------------------------------------------------------------
function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("menuCardTemplate"); // Retrieve the HTML element with the ID "hikeCardTemplate" and store it in the cardTemplate variable. 

    db.collection("menu").orderBy("code").get()   //the collection called "hikes"
        .then(allMenu=> {
            //var i = 1;  //Optional: if you want to have a unique ID for each hike
            allMenu.forEach(doc => {
            console.log("uyhuybuybyt7bgytb",doc.data())
            //iterate thru each doc
                var title = doc.data().name;       // get value of the "name" key
                var details = doc.data().details;  // get value of the "details" key
								var menuCode = doc.data().code;    //get unique ID to each hike to be used for fetching right image
                var docID = doc.id;
                let newcard = cardTemplate.content.cloneNode(true); // Clone the HTML template to create a new card (newcard) that will be filled with Firestore data.

                //update title and text and image
                newcard.querySelector('.card-title').innerHTML = title;
                newcard.querySelector('.card-text').innerHTML = details;
                newcard.querySelector('.card-image').src = `./images/${menuCode}.jpg`; //Example: NV01.jpg

                if(title == "Quizzes"){
                    newcard.querySelector('a').href = "quizlevel.html?docID="+docID;
                }
                else if(title == "Practices"){
                    newcard.querySelector('a').href = ".html?docID="+docID;
                }
                else if(title == "News"){
                    newcard.querySelector('a').href = ".html?docID="+docID;
                }
                else if(title == "Tutorials"){
                    newcard.querySelector('a').href = ".html?docID="+docID;
                }
                else{
                    newcard.querySelector('a').href = ".html?docID="+docID;
                }
                        
                
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

displayCardsDynamically("menu");  //input param is the name of the collection