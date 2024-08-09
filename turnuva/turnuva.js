//bir oyun seçilecek
//kullanıcıdan girilen kişi sayısı ile bir turnuva yapılacak.
//turnuvada skor sistemi olacak ve bu skor sistemi ile kazanan ve kaybeden belirlenecek kaybeden oyundan çıkacak kazanan bir üst tura geçecek.
//bu şekilde olan eleme yöntemiyle final turu kazananı belirlenecek.

function startTournament() {
    const playerCount = parseInt(prompt("Lütfen kişi sayısını girin (en az 2):"));
    if (playerCount < 2 || isNaN(playerCount)) {
        alert("Geçerli bir sayı girilmedi. Turnuva sonlandırılıyor.");
        return;
    }
    let players = [];
    for (let i = 1; i <= playerCount; i++) {
        let playerName = prompt(`Lütfen ${i}. oyuncunun adını girin:`);
        if (playerName.trim() === "") {
            alert("Geçerli bir isim girilmedi. Turnuva sonlandırılıyor.");
            return;
        }
        players.push(playerName);
        console.log("Oyuncular: " + playerName);
        
    }
    let roundNumber = 1;
    while (players.length > 1) {
        let nextRoundPlayers = [];
        let roundResults = [];
        // Oyuncuları rastgele karıştır
        players = shuffleArray(players);
        console.log(`\n=== Round ${roundNumber} ===`);
        for (let i = 0; i < players.length; i += 2) {
            if (i + 1 >= players.length) {
                // Eğer eşleşmelerde bir oyuncu kalırsa otomatik olarak bir üst tura geçer
                alert(players[i] + " otomatik olarak bir üst tura geçti.");
                roundResults.push([players[i], "-", "-", "-", players[i]]);
                nextRoundPlayers.push(players[i]);
                continue; // Diğer maçlara geç
            }
            let score1, score2;
            do {
                score1 = parseInt(prompt(`${players[i]} skoru girin:`));
                score2 = parseInt(prompt(`${players[i + 1]} skoru girin:`));
                if (isNaN(score1) || isNaN(score2)) {
                    alert("Geçersiz skorlar girildi, lütfen tekrar deneyin.");
                    continue;
                }
                if (score1 === score2) {
                    alert("Berabere! Maç tekrarlanacak.");
                }
            } while (score1 === score2 || isNaN(score1) || isNaN(score2));
            let winner;
            if (score1 > score2) {
                alert(players[i] + " kazandı!");
                winner = players[i];
            } else {
                alert(players[i + 1] + " kazandı!");
                winner = players[i + 1];
            }
            roundResults.push([players[i], players[i + 1], score1, score2, winner]);
            nextRoundPlayers.push(winner);
        }
        // Round sonuçlarını matris olarak göster
        console.log("Player 1 | Player 2 | Score 1 | Score 2 | Winner");
        console.log("---------------------------------------------");
        roundResults.forEach((match) => {
            console.log(`${match[0]}   | ${match[1]}   | Score 1: ${match[2]}      | Socre 2:  ${match[3]}      | Winner:  ${match[4]}`);
        });
        players = nextRoundPlayers; // Oyuncu isimleri aynen korunur, numaralar değişmez
        roundNumber++;
    }
    if (players.length === 1) {
        alert("Şampiyon: " + players[0]);
    }
}

// Array'i rastgele karıştıran fonksiyon
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));//0 ile i arasında bir sayı üretmesi için
        [array[i], array[j]] = [array[j], array[i]]; // Elementleri değiştir
    }
    return array;
}

startTournament();