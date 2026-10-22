document.addEventListener('DOMContentLoaded', function () {

  const targetDate = new Date('Maret 29, 2030 10:00:00').getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const difference = targetDate - now;

    if (difference > 0) {
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      const daysElem = document.getElementById('days');
      const hoursElem = document.getElementById('hours');
      const minutesElem = document.getElementById('minutes');
      const secondsElem = document.getElementById('seconds');

      if (daysElem) daysElem.innerText = days < 10 ? '0' + days : days;
      if (hoursElem) hoursElem.innerText = hours < 10 ? '0' + hours : hours;
      if (minutesElem) minutesElem.innerText = minutes < 10 ? '0' + minutes : minutes;
      if (secondsElem) secondsElem.innerText = seconds < 10 ? '0' + seconds : seconds;
    } else {
      const countdownContainer = document.getElementById('countdown');
      if (countdownContainer) {
        countdownContainer.innerHTML = '<span class="font-serif fs-4">Acara Telah Berlangsung</span>';
      }
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  const bgMusic = document.getElementById('bgMusic');
  const musicToggle = document.getElementById('musicToggle');
  const musicIcon = document.getElementById('musicIcon');
  let isPlaying = false;

  if (musicToggle && bgMusic) {
    musicToggle.addEventListener('click', function () {
      if (isPlaying) {
        bgMusic.pause();
        if (musicIcon) musicIcon.className = 'fas fa-music';
      } else {
        bgMusic.play().then(() => {
          if (musicIcon) musicIcon.className = 'fas fa-pause';
        }).catch(err => console.log('Playback error:', err));
      }
      isPlaying = !isPlaying;
    });

    document.body.addEventListener('click', function () {
      if (!isPlaying && bgMusic) {
        bgMusic.play().then(() => {
          isPlaying = true;
          if (musicIcon) musicIcon.className = 'fas fa-pause';
        }).catch(() => {
        });
      }
    }, { once: true });
  }

  const copyBtn = document.getElementById('copyBtn');
  const copyToast = document.getElementById('copyToast');

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      const accountNumElem = document.getElementById('accountNum');
      if (accountNumElem) {
        const accountNum = accountNumElem.innerText.replace(/\s/g, '');
        navigator.clipboard.writeText(accountNum).then(() => {
          if (copyToast) {
            copyToast.classList.remove('opacity-0');
            setTimeout(() => {
              copyToast.classList.add('opacity-0');
            }, 2500);
          }
        }).catch(err => console.error('Gagal menyalin:', err));
      }
    });
  }

  const rsvpForm = document.getElementById('rsvpForm');
  const rsvpAlert = document.getElementById('rsvpAlert');

  if (rsvpForm) {
    rsvpForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (rsvpAlert) rsvpAlert.classList.remove('d-none');

      rsvpForm.reset();

      setTimeout(() => {
        if (rsvpAlert) rsvpAlert.classList.add('d-none');
        const modalElement = document.getElementById('rsvpModal');
        if (modalElement && window.bootstrap) {
          const modal = bootstrap.Modal.getInstance(modalElement);
          if (modal) modal.hide();
        }
      }, 2500);
    });
  }

});