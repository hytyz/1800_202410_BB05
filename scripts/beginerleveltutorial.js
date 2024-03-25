var topicListContainer = document.getElementById("tutorial-beginner-topic-list");

db.collection("tutorial").doc("FBcXKTaI21yrKTYzjgVc").collection("beginner").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        var topicLink = document.createElement("a");
        topicLink.href= "#";
        topicLink.className = "list-group-item list-group-item-action btn";
        topicLink.textContent = doc.data().topic;

        topicListContainer.appendChild(topicLink);
    });
});