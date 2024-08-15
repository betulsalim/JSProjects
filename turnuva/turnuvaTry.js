async function startTournament(playerCount) {
    try {
        const response = await fetch('players.json');
        const data = await response.json();
        let players = data.players;

        if (playerCount < 2) {
            console.error("Geçerli bir oyuncu sayısı girilmedi. Turnuva sonlandırılıyor.");
            return;
        }

        if (players.length < playerCount) {
            const maxPlayerNumber = Math.max(...players.map(p => parseInt(p.match(/Player (\d+)/)?.[1], 10) || 0));
            players = players.concat(Array.from({ length: playerCount - players.length }, (_, i) => `Player ${maxPlayerNumber + i + 1}`));
        }

        players = players.sort((a, b) => parseInt(a.match(/Player (\d+)/)[1], 10) - parseInt(b.match(/Player (\d+)/)[1], 10))
                        .slice(0, playerCount);
        
        console.log(`${playerCount} oyuncu ile turnuvamız başlıyor...`);
        console.log("Oyuncular: \n" + players.join(", "));

        while (players.length > 1) {
            players = playRound(players);
        }

        console.log("Şampiyon: " + players[0]);
    } catch (error) {
        console.error('JSON verisi alınırken hata oluştu:', error);
    }
}

function playRound(players) {
    const shuffledPlayers = players.slice().sort(() => Math.random() - 0.5);
    const nextRoundPlayers = [];

    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        if (i + 1 >= shuffledPlayers.length) {
            console.log(`${shuffledPlayers[i]} otomatik olarak bir üst tura geçti.`);
            nextRoundPlayers.push(shuffledPlayers[i]);
        } else {
            const [winner] = playMatch(shuffledPlayers[i], shuffledPlayers[i + 1]);
            nextRoundPlayers.push(winner);
        }
    }

    return nextRoundPlayers;
}

function playMatch(player1, player2) {
    let score1, score2;
    do {
        score1 = Math.floor(Math.random() * 10);
        score2 = Math.floor(Math.random() * 10);
        console.log(`${player1} skoru: ${score1}, ${player2} skoru: ${score2}`);
        
        if (score1 === score2) {
            console.log("..............Maç Tekrarlanacak..............");
        }
    } while (score1 === score2);

    return [score1 > score2 ? player1 : player2];
}

// Kullanıcıdan oyuncu sayısını al ve başlat
const playerCount = parseInt(prompt("Kaç oyuncu katılacak?"), 10);
if (!isNaN(playerCount) && playerCount >= 2) {
    startTournament(playerCount);
} else {
    console.error("Geçersiz oyuncu sayısı.");
}
