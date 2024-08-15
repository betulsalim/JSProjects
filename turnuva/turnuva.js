//bir oyun seçilecek
//kullanıcıdan girilen kişi sayısı ile bir turnuva yapılacak.
//turnuvada skor sistemi olacak ve bu skor sistemi ile kazanan ve kaybeden belirlenecek kaybeden oyundan çıkacak kazanan bir üst tura geçecek.
//bu şekilde olan eleme yöntemiyle final turu kazananı belirlenecek.

async function startTournament(playerCount) {
    try {
        // JSON verisini al
        const response = await fetch('players.json');
        const data = await response.json();
        
        // JSON'dan oyuncu listesi al
        let players = data.players;

        // Oyuncu sayısını doğrula
        if (playerCount < 2) {
            console.error("Geçerli bir oyuncu sayısı girilmedi. Turnuva sonlandırılıyor.");
            return;
        }

        // Kullanıcı sayısı JSON'dan fazlaysa, eksik oyuncuları ekleyin
        if (players.length < playerCount) {
            players = players.concat(generateAdditionalPlayers(playerCount - players.length, getMaxPlayerNumber(players) + 1));
        }

        // Oyuncu listesini sıralı hale getir ve kullanıcı tarafından belirlenen sayıda oyuncu seç
        players = sortPlayers(players).slice(0, playerCount);
        
        console.log(`${playerCount} oyuncu ile turnuvamız başlıyor...`);
        console.log("Oyuncular: \n" + players.join(", "));

        // Turnuvayı başlat
        while (players.length > 1) {
            players = playRound(players);
        }

        console.log("Şampiyon: " + players[0]);
    } catch (error) {
        console.error('JSON verisi alınırken hata oluştu:', error);
    }
}

function playRound(players) {
    const shuffledPlayers = shuffleArray(players);
    const nextRoundPlayers = [];

    for (let i = 0; i < shuffledPlayers.length; i += 2) {
        if (i + 1 >= shuffledPlayers.length) {
            console.log(`${shuffledPlayers[i]} otomatik olarak bir üst tura geçti.`);
            nextRoundPlayers.push(shuffledPlayers[i]);
        } else {
            const winner = playMatch(shuffledPlayers[i], shuffledPlayers[i + 1]);
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
    const arrayCopy = array.slice(); // Orijinal diziyi değiştirmemek için kopyala
    for (let i = arrayCopy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arrayCopy[i], arrayCopy[j]] = [arrayCopy[j], arrayCopy[i]]; // Elementleri değiştir
    }
    return arrayCopy;
}

function generateAdditionalPlayers(count, startIndex) {
    // Belirtilen sayıda ek oyuncu oluşturur
    return Array.from({ length: count }, (_, i) => `Player ${startIndex + i}`);
}

function getMaxPlayerNumber(players) {
    // Mevcut oyuncuların en yüksek numarasını bulur
    return Math.max(...players.map(player => {
        const match = player.match(/Player (\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }));
}

function sortPlayers(players) {
    // Oyuncuları numaralarına göre sıralar
    return players.slice().sort((a, b) => {
        const numA = parseInt(a.match(/Player (\d+)/)[1], 10);
        const numB = parseInt(b.match(/Player (\d+)/)[1], 10);
        return numA - numB;
    });
}

// Kullanıcıdan oyuncu sayısını al
const playerCount = parseInt(prompt("Kaç oyuncu katılacak?"), 10);
if (!isNaN(playerCount)) {
    startTournament(playerCount);
} else {
    console.error("Geçersiz oyuncu sayısı.");
}
