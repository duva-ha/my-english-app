const allData = {
    animals: [
        { eng: "Lion 🦁", vie: "Sư tử", color: "#e67e22" },
        { eng: "Elephant 🐘", vie: "Con voi", color: "#95a5a6" },
        { eng: "Shark 🦈", vie: "Cá mập", color: "#2980b9" }
    ],
    colors: [
        { eng: "Red 🔴", vie: "Màu đỏ", color: "#e74c3c" },
        { eng: "Blue 🔵", vie: "Màu xanh dương", color: "#3498db" },
        { eng: "Green 🟢", vie: "Màu xanh lá", color: "#2ecc71" }
    ],
    foods: [
        { eng: "Pizza 🍕", vie: "Bánh Pizza", color: "#f1c40f" },
        { eng: "Apple 🍎", vie: "Quả táo", color: "#c0392b" },
        { eng: "Milk 🥛", vie: "Sữa", color: "#bdc3c7" }
    ]
};

let currentTopic = "animals";
let vocabularyList = allData[currentTopic];
let currentIndex = 0;

function updateCard() {
    const item = vocabularyList[currentIndex];
    document.getElementById('engWord').innerText = item.eng;
    document.getElementById('frontSide').style.backgroundColor = item.color;
    document.getElementById('vieWord').innerText = item.vie;
    document.getElementById('progress').innerText = `Từ ${currentIndex + 1} / ${vocabularyList.length}`;
    document.getElementById('cardInner').classList.remove('flipped');
}

function flipCard() {
    document.getElementById('cardInner').classList.toggle('flipped');
}

function nextCard() {
    currentIndex = (currentIndex + 1) % vocabularyList.length;
    updateCard();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + vocabularyList.length) % vocabularyList.length;
    updateCard();
}

function changeTopic(topicName) {
    currentTopic = topicName;
    vocabularyList = allData[topicName];
    currentIndex = 0;
    updateCard();
}

function speakText(event) {
    event.stopPropagation();
    const rawText = vocabularyList[currentIndex].eng;
    const cleanText = rawText.replace(/[^\x00-\x7F]/g, "").trim(); 
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    window.speechSynthesis.speak(utterance);
}

// Chạy lần đầu khi trang web tải xong
window.onload = updateCard;
