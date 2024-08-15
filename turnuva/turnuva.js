//bir oyun seçilecek
//kullanıcıdan girilen kişi sayısı ile bir turnuva yapılacak.
//turnuvada skor sistemi olacak ve bu skor sistemi ile kazanan ve kaybeden belirlenecek kaybeden oyundan çıkacak kazanan bir üst tura geçecek.
//bu şekilde olan eleme yöntemiyle final turu kazananı belirlenecek.

async function startTournament(playerCount) {
    try {
        const response = await fetch('players.json');
        const data = await response.json();
        
        if (!isValidPlayerCount(playerCount, data.players.length)) {
            console.error("Geçerli bir oyuncu sayısı girilmedi. Turnuva sonlandırılıyor.");
            return;
        }

        let players = selectPlayers(data.players, playerCount);

        console.log(`${playerCount} oyuncu ile turnuvamız başlıyor...`);
        console.log("Oyuncular: \n" + players.join(", "));

        let roundNumber = 1;
        while (players.length > 1) {
            console.log(`\n=== Round ${roundNumber} ===`);
            players = playRound(players);
            roundNumber++;
        }

        console.log("Şampiyon: " + players[0]);

    } catch (error) {
        console.error('JSON verisi alınırken hata oluştu:', error);
    }
}

function isValidPlayerCount(playerCount, maxPlayers) {
    return playerCount >= 2 && playerCount <= maxPlayers;
}

function selectPlayers(players, playerCount) {
    return players.slice(0, playerCount);
}

function playRound(players) {
    players = shuffleArray(players);
    let nextRoundPlayers = [];

    for (let i = 0; i < players.length; i += 2) {
        if (i + 1 >= players.length) {
            console.log(`${players[i]} otomatik olarak bir üst tura geçti.`);
            nextRoundPlayers.push(players[i]);
        } else {
            const winner = playMatch(players[i], players[i + 1]);
            nextRoundPlayers.push(winner);
        }
    }

    return nextRoundPlayers;
}

function playMatch(player1, player2) {
    let score1, score2;
    do {
        score1 = getRandomScore();
        score2 = getRandomScore();
        console.log(`${player1} skoru: ${score1}, ${player2} skoru: ${score2}`);
        
        if (score1 === score2) {
            console.log("..............Maç Tekrarlanacak..............");
        }
    } while (score1 === score2);

    return score1 > score2 ? player1 : player2;
}

function getRandomScore() {
    return Math.floor(Math.random() * 10);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Elementleri değiştir
    }
    return array;
}

// Koddan veya kullanıcıdan oyuncu sayısını belirle
const playerCount = parseInt(prompt("Kaç oyuncu katılacak?"), 10);  // Veya manuel olarak const playerCount = 5; 
startTournament(playerCount);
