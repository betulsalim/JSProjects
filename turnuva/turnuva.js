//bir oyun seçilecek
//kullanıcıdan girilen kişi sayısı ile bir turnuva yapılacak.
//turnuvada skor sistemi olacak ve bu skor sistemi ile kazanan ve kaybeden belirlenecek kaybeden oyundan çıkacak kazanan bir üst tura geçecek.
//bu şekilde olan eleme yöntemiyle final turu kazananı belirlenecek.

function startTournament() {
    const playerCount = 5;
    if (playerCount < 2 || isNaN(playerCount)) {
        alert("Geçerli bir sayı girilmedi. Turnuva sonlandırılıyor.");
        return;
    }
    alert(`${playerCount} oyuncu ile turnuvamız başlıyor...`);

    let players = [];
    for(let i = 1; i <= playerCount; i++)
        {
            players.push(`Player ${[i]}`);
        }
    alert("Oyuncularımız: \n" + players.join(", "));
    console.log("Oyuncular: \n" + players.join(", "));

    let roundNumber = 1;
    while (players.length > 1) {
        let nextRoundPlayers = [];
        let roundResults = [];
        players = shuffleArray(players); // Oyuncuları karıştır
        console.log(`\n=== Round ${roundNumber} ===`);

        for (let i = 0; i < players.length; i += 2) {
            if (i + 1 >= players.length) {
                alert(players[i] + " otomatik olarak bir üst tura geçti.");
                roundResults.push([players[i], "-", "-", "-", players[i]]);
                nextRoundPlayers.push(players[i]);
                continue;
            }

            // Eşleşen oyuncuları bildir
            alert("Eşleşme: " + players[i] + " vs " + players[i + 1]);

            let score1, score2;
            do {
                score1 = Math.floor(Math.random() * 10);
                score2 = Math.floor(Math.random() * 10);
                console.log(`${players[i]} skoru: ` + score1);
                console.log(`${players[i + 1]} skoru: ` + score2);
                alert(`${players[i]} skoru: ${score1} vs. \n ${players[i + 1]} skoru: ${score2}`)
                if (score1 === score2) {
                    alert("Berabere! Maç tekrarlanacak.");
                    console.log("..............Maç Tekrarlanacak..............");
                    
                }
            } while (score1 === score2);

            let winner;
            if (score1 > score2) {
                alert(players[i] + " kazandı!");
                winner = players[i];
            } else {
                alert(players[i + 1] + " kazandı!");
                winner = players[i + 1];
            }

            roundResults.push([players[i], players[i + 1], score1, score2, winner]);
            nextRoundPlayers.push(winner); // Kazananı bir sonraki tur için kaydediyoruz
        }

        console.log("Player 1 | Player 2 | Score 1 | Score 2 | Winner");
        console.log("---------------------------------------------");
        roundResults.forEach((match) => {
            console.log(`${match[0]}   | ${match[1]}   | Score 1: ${match[2]}      | Score 2:  ${match[3]}      | Winner:  ${match[4]}`);
        });

        players = nextRoundPlayers; // Sadece kazananlar bir sonraki turda yarışacak
        roundNumber++;
    }

    if (players.length === 1) {
        alert("Şampiyon: " + players[0]);
    }
}

// Oyuncuları rastgele karıştıran fonksiyon
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Elementleri değiştir
    }
    return array;
}

startTournament();