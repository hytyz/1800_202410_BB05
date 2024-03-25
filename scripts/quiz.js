function readitem(id) {
    db.collection("level")
      .doc(id) //name of the collection and documents should matach excatly with what you have in Firestore
      .onSnapshot((level) => {
        //arrow notation
        console.log(level.data()); //.data() returns data object
        //    document.getElementById("item-goes-here").innerHTML = dayDoc.data().quote;      //using javascript to display the data on the right place
  
        //Here are other ways to access key-value data fields
        //$('#quote-goes-here').text(dayDoc.data().quote);         //using jquery object dot notation
        //$("#quote-goes-here").text(dayDoc.data()["quote"]);      //using json object indexing
        //document.querySelector("#quote-goes-here").innerHTML = dayDoc.data().quote;
      });
  }
  readitem("beginner"); //calling the function
  
  //Getting all documents from one collection in Firestore
  function getAllItems() {
    db.collection("level")
      .get()
      .then((allitems) => {
        const level = allitems.docs.map((doc) => doc.data());
        console.log(level);
      });
  }
  getAllItems();