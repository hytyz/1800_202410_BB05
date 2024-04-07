function generateLeaderboard() {
    // Initialize an object to store scores for each level
    let leaderboard = {
        beginner: [],
        elementary: [],
        intermediate: [],
        advanced: []
    };

    // Query the database to retrieve scores for each level
    db.collection("users").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let data = doc.data();
            if (data.quizResultBeginner) {
                leaderboard.beginner.push({
                    userID: doc.id,
                    score: data.quizResultBeginner.score
                });
            }
            if (data.quizResultElementary) {
                leaderboard.elementary.push({
                    userID: doc.id,
                    score: data.quizResultElementary.score
                });
            }
            if (data.quizResultIntermediate) {
                leaderboard.intermediate.push({
                    userID: doc.id,
                    score: data.quizResultIntermediate.score
                });
            }
            if (data.quizResultAdvanced) {
                leaderboard.advanced.push({
                    userID: doc.id,
                    score: data.quizResultAdvanced.score
                });
            }
        });

        // Sort scores in each level in descending order
        for (let level in leaderboard) {
            leaderboard[level].sort((a, b) => b.score - a.score);
        }

        // Now you have the leaderboard object containing scores for each level sorted in descending order
        console.log(leaderboard);
        // You can use this data to display the leaderboard on your webpage
    }).catch(error => {
        console.error("Error retrieving leaderboard:", error);
    });
}

// Call the function to generate the leaderboard
generateLeaderboard();
