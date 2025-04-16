let words = []; // fetch で取得される単語リスト
let currentWord = "";
let correctCount = 0;
let startTime = null;
let gameFinished = false;

function pickNewWord() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    document.getElementById("word").textContent = currentWord;
}

fetch("word.json")
    .then(response => response.json())
    .then(data => {
        words = data;
        pickNewWord();
    })
    .catch(error => {
        console.error("word.json の読み込みエラー:", error);
        document.getElementById("word").textContent = "単語が読み込めませんでした。";
    });

document.getElementById("input").addEventListener("input", (e) => {
    if (gameFinished) return;

    if (e.target.value === currentWord) {
        correctCount++;

        if (correctCount === 1) {
            startTime = Date.now(); // 最初の正解で時間記録
        }

        if (correctCount >= 10) {
            let endTime = Date.now();
            let seconds = ((endTime - startTime) / 1000).toFixed(2);
            document.getElementById("result").textContent = `🎉 10問連続正解！タイム: ${seconds}秒`;
            gameFinished = true;
            return;
        }

        document.getElementById("result").textContent = `正解！ (${correctCount}/10)`;

        setTimeout(() => {
            pickNewWord();
            e.target.value = "";
            document.getElementById("result").textContent = "";
        }, 1000);
    } else if (!currentWord.startsWith(e.target.value)) {
        // 入力ミスならカウントリセット
        correctCount = 0;
        startTime = null;
        document.getElementById("result").textContent = "ミス！カウントリセット😢";
    }
});
