/* --- FILE CHỨA CÁC HIỆU ỨNG ĐẶC BIỆT --- */

function runFirework() {
    // Cấu hình pháo hoa rực rỡ hơn
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      var particleCount = 50 * (timeLeft / duration);
      // Bắn pháo hoa ngẫu nhiên ở các vị trí
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);
}

// Con có thể thêm hiệu ứng âm thanh chúc mừng ở đây
function playSuccessSound() {
    const audio = new Audio('https://www.soundjay.com/misc/sounds/magic-chime-01.mp3');
    audio.play();
}
