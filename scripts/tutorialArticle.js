function displayTutorialArticle() {
    let params = new URL(window.location.href);
    let ID = params.searchParams.get("docID");
    let ID2 = params.searchParams.get("docID2");

    var tutorialArticleContainer = document.getElementById("tutorial-article");

    db.collection("level").doc(ID).collection("tutorial").doc(ID2).get().then((docSnapshot) => {
        if (docSnapshot.exists) {
            var article = docSnapshot.data().article;
            var articleContent = document.createElement("div");
            
            article = article.replace(/\*\*\*(.*?)\*\*\*/g, '<br><h2>$1</h2>'); 
            article = article.replace(/\-\-(.*?)\-\-/g, '<br><br><h4>$1</h4>'); 
            article = article.replace(/\*(.*?)\*/g, '<h5>$1</h5>'); 

            articleContent.innerHTML = article;
            articleContent.style.fontSize = '20px';

            tutorialArticleContainer.appendChild(articleContent);
        }
    });
}

displayTutorialArticle();