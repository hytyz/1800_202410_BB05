function generateLeaderboard() {
    // Initialize an object to store scores for each level
    let leaderboard = {
        beginner: [],
        elementary: [],
        intermediate: [],
        advanced: []
    };

    // Query the database to retrieve scores for each level
    return db.collection("users").get().then(querySnapshot => {
        querySnapshot.forEach(doc => {
            let data = doc.data();
            if (data.quizResultBeginner) {
                leaderboard.beginner.push({
                    userID: data.name,
                    score: data.quizResultBeginner.score
                });
            }
            if (data.quizResultElementary) {
                leaderboard.elementary.push({
                    userID: data.name,
                    score: data.quizResultElementary.score
                });
            }
            if (data.quizResultIntermediate) {
                leaderboard.intermediate.push({
                    userID: data.name,
                    score: data.quizResultIntermediate.score
                });
            }
            if (data.quizResultAdvanced) {
                leaderboard.advanced.push({
                    userID: data.name,
                    score: data.quizResultAdvanced.score
                });
            }
        });

        // Sort scores in each level in descending order
        for (let level in leaderboard) {
            leaderboard[level].sort((a, b) => b.score - a.score);
        }

        // Now you have the leaderboard object containing scores for each level sorted in descending order
        return leaderboard;
    }).catch(error => {
        console.error("Error retrieving leaderboard:", error);
        return null; // Return null in case of an error
    });
}

// Call the function to generate the leaderboard and handle the returned object
generateLeaderboard().then(leaderboard => {
    // Check if the leaderboard is not null
    if (leaderboard) {
        // Loop through each level and populate the corresponding table
        for (let level in leaderboard) {
            let table = document.getElementById(`${level}-leaderboard`);
            let tbody = table.querySelector('tbody');

            leaderboard[level].forEach(entry => {
                let row = document.createElement('tr');
                row.innerHTML = `
                    <td>${entry.userID}</td>
                    <td>${entry.score}</td>
                `;
                tbody.appendChild(row);
            });
        }
    } else {
        console.error("Failed to generate leaderboard");
    }
});
