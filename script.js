/* --- BỘ NÃO CỦA ỨNG DỤNG (script.js) --- */

// 1. KHO DỮ LIỆU ĐA CHỦ ĐỀ
const allData = {
    animals: [
        { eng: "Lion 🦁", vie: "Sư tử", color: "#e67e22" },
        { eng: "Elephant 🐘", vie: "Con voi", color: "#95a5a6" },
        { eng: "Monkey 🐒", vie: "Con khỉ", color: "#d35400" },
        { eng: "Shark 🦈", vie: "Cá mập", color: "#2980b9" },
        { eng: "Giraffe 🦒", vie: "Hươu cao cổ", color: "#f1c40f" }
    ],
    colors: [
        { eng: "Red 🔴", vie: "Màu đỏ", color: "#e74c3c" },
        { eng: "Blue 🔵", vie: "Màu xanh dương", color: "#3498db" },
        { eng: "Green 🟢", vie: "Màu xanh lá", color: "#2ecc71" },
        { eng: "Yellow 🟡", vie: "Màu vàng", color: "#f1c40f" },
        { eng: "Purple 🟣", vie: "Màu tím", color: "#9b59b6" }
    ],
    foods: [
        { eng: "Pizza 🍕", vie: "Bánh Pizza", color: "#f39c12" },
        { eng: "Apple 🍎", vie: "Quả táo", color: "#c0392b" },
        { eng: "Milk 🥛", vie: "Sữa", color: "#bdc3c7" },
        { eng: "Bread 🍞", vie: "Bánh mì", color: "#d35400" },
        { eng: "Ice Cream 🍦", vie: "Kem", color: "#ff7675" }
    ]
};

// 2. BIẾN QUẢN LÝ TRẠNG THÁI
let currentTopic = "animals";
let vocabularyList = allData[currentTopic];
let currentIndex = 0;

// 3. HÀM CẬP NHẬT GIAO DIỆN THẺ
function updateCard() {
    const item = vocabularyList[currentIndex];
    
    // Cập nhật nội dung chữ
    document.getElementById('engWord').innerText = item.eng;
    document.getElementById('vieWord').innerText = item.vie;
    
    // Cập nhật màu sắc nền cho mặt trước
    document.getElementById('frontSide').style.backgroundColor = item.color;
    
    // Cập nhật thanh tiến độ
    document.getElementById('progress').innerText = `Chủ đề: ${getTopicName(currentTopic)} | Từ ${currentIndex + 1} / ${vocabularyList.length}`;
    
    // Đảm bảo thẻ luôn quay về mặt trước khi chuyển từ
    document.getElementById('cardInner').classList.remove('flipped');
}

// 4. HÀM CHUYỂN ĐỔI CHỦ ĐỀ
function changeTopic(topicName) {
    currentTopic = topicName;
    vocabularyList = allData[topicName];
    currentIndex = 0;
    updateCard();
    
    // Thêm hiệu ứng âm thanh nhẹ khi đổi chủ đề (nếu con muốn)
    console.log("Đã đổi sang chủ đề: " + topicName);
}

// 5. HÀM LẬT THẺ
function flipCard() {
    document.getElementById('cardInner').classList.toggle('flipped');
}

// 6. HÀM CHUYỂN TỪ TIẾP THEO (CÓ GỌI PHÁO HOA)
function nextCard() {
    // Nếu đây là từ cuối cùng của danh sách
    if (currentIndex === vocabularyList.length - 1) {
        // GỌI HÀM TỪ FILE effects.js
        if (typeof runFirework === "function") {
            runFirework();
        }
        if (typeof playSuccessSound === "function") {
            playSuccessSound();
        }
    }
    
    currentIndex = (currentIndex + 1) % vocabularyList.length;
    updateCard();
}

// 7. HÀM QUAY LẠI TỪ TRƯỚC
function prevCard() {
    currentIndex = (currentIndex - 1 + vocabularyList.length) % vocabularyList.length;
    updateCard();
}

// 8. HÀM PHÁT ÂM (WEB SPEECH API)
function speakText(event) {
    event.stopPropagation(); // Không cho thẻ lật khi bấm nút loa
    
    const rawText = vocabularyList[currentIndex].eng;
    // Dùng Regex để xóa Emoji, chỉ giữ lại chữ để robot đọc chuẩn
    const cleanText = rawText.replace(/[\u1000-\uFFFF]+/g, "").trim(); 

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    utterance.lang = 'en-US'; 
    utterance.rate = 0.8;    
    synth.speak(utterance);
}

// 9. HÀM PHỤ TRỢ: LẤY TÊN TIẾNG VIỆT CỦA CHỦ ĐỀ
function getTopicName(topic) {
    const names = {
        animals: "Động vật",
        colors: "Màu sắc",
        foods: "Đồ ăn"
    };
    return names[topic] || topic;
}

// 10. CHẠY KHI TRANG WEB TẢI XONG
window.onload = function() {
    updateCard();
};
