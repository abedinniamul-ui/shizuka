
document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector) => document.querySelector(selector);

  // TOAST MESSAGE
  let toastTimer;

  function toast(message) {
    const element = $("#toast");
    element.textContent = message;
    element.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      element.classList.remove("show");
    }, 2600);
  }

  // MOBILE NAVIGATION
  const menuToggle = $("#menuToggle");
  const navLinks = $("#navLinks");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("open");
    menuToggle.textContent = navLinks.classList.contains("open") ? "×" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });

  // SCROLL PROGRESS
  function updateProgress() {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    $("#progressBar").style.width = `${progress}%`;
  }

  window.addEventListener("scroll", updateProgress, { passive: true });
  updateProgress();

  // REVEAL ANIMATIONS
  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(element => observer.observe(element));
  } else {
    revealElements.forEach(element => element.classList.add("visible"));
  }

  // MOOD MESSAGES
  const moodMessages = {
    happy: "Keep that beautiful smile. May today give you a hundred more reasons to be happy! ☀️",
    tired: "Take a deep breath. You don't have to do everything today. Rest is important too. 🌙",
    sad: "This feeling won't last forever. Be kind to yourself. Better and brighter moments are ahead. 🌷",
    excited: "Enjoy every second! Let your excitement turn into beautiful memories. ✨",
    stressed: "Pause for a moment. Breathe slowly. One step at a time is enough. 🫧"
  };

  document.querySelectorAll(".mood-btn").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".mood-btn").forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const mood = button.dataset.mood;
      $("#moodResult").innerHTML = `<span>♡</span><p>${moodMessages[mood]}</p>`;
    });
  });

  // PHOTO GALLERY
  const photoUpload = $("#photoUpload");
  const galleryGrid = $("#galleryGrid");
  const photoUrls = new Set();

  photoUpload.addEventListener("change", event => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => file.type.startsWith("image/"));

    if (!validFiles.length && files.length) {
      toast("Please select image files.");
      photoUpload.value = "";
      return;
    }

    $("#emptyGallery")?.remove();

    validFiles.forEach(file => {
      const url = URL.createObjectURL(file);
      photoUrls.add(url);

      const card = document.createElement("div");
      card.className = "photo-card";

      const image = document.createElement("img");
      image.src = url;
      image.alt = "Your uploaded memory";

      const remove = document.createElement("button");
      remove.className = "photo-remove";
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", "Remove photograph");

      remove.addEventListener("click", () => {
        URL.revokeObjectURL(url);
        photoUrls.delete(url);
        card.remove();

        if (!galleryGrid.querySelector(".photo-card")) {
          showEmptyGallery();
        }
      });

      card.append(image, remove);
      galleryGrid.appendChild(card);
    });

    if (validFiles.length) {
      toast(`${validFiles.length} photo(s) added to your gallery!`);
    }

    photoUpload.value = "";
  });

  function showEmptyGallery() {
    const empty = document.createElement("div");
    empty.className = "empty-gallery";
    empty.id = "emptyGallery";

    const heart = document.createElement("span");
    heart.textContent = "♡";

    const message = document.createElement("p");
    message.textContent = "Your beautiful memories will appear here.";

    empty.append(heart, message);
    galleryGrid.appendChild(empty);
  }

  // GIFT BOX
  const giftBox = $("#giftBox");
  const bouquet = $("#bouquet");
  const unboxButton = $("#unboxButton");
  const resetGift = $("#resetGift");
  const giftCaption = $("#giftCaption");

  let giftOpened = false;

  unboxButton.addEventListener("click", () => {
    if (giftOpened) return;

    giftOpened = true;
    giftBox.classList.add("open");
    unboxButton.disabled = true;
    unboxButton.textContent = "Opening your surprise...";

    setTimeout(() => {
      bouquet.classList.add("show");
      bouquet.setAttribute("aria-hidden", "false");
      giftCaption.textContent = "A beautiful bouquet, just for you. 🌹";
      unboxButton.textContent = "♡ Your surprise is here!";
      unboxButton.disabled = false;
      resetGift.hidden = false;
      createPetals(35);
      toast("A bouquet of roses, just for you! ❤️");
    }, 850);
  });

  resetGift.addEventListener("click", () => {
    giftOpened = false;
    giftBox.classList.remove("open");
    bouquet.classList.remove("show");
    bouquet.setAttribute("aria-hidden", "true");
    unboxButton.textContent = "🎁 Unbox your gift";
    unboxButton.disabled = false;
    giftCaption.textContent = "A little surprise, wrapped with care.";
    resetGift.hidden = true;
  });

  // ENVELOPE LETTER
  const envelopeButton = $("#envelopeButton");
  const secretMessage = $("#secretMessage");

  envelopeButton.addEventListener("click", () => {
    const isOpen = envelopeButton.classList.toggle("open");
    secretMessage.hidden = !isOpen;
    envelopeButton.querySelector(".envelope-label").textContent = isOpen ? "CLOSE ME" : "OPEN ME";

    if (isOpen) {
      secretMessage.scrollIntoView({ behavior: "smooth", block: "center" });
      toast("A little message for you. 💌");
    }
  });

  // WISH JAR
  const wishes = [
    "May your smile stay brighter than the stars. ✨",
    "May your dreams become your favourite reality. 🌷",
    "May unexpected happiness find you today. 💗",
    "May you always find strength in difficult moments. 🌙",
    "May every new chapter bring something beautiful. 🦋",
    "May you never run out of reasons to laugh. ☀️",
    "May your heart always feel peaceful and loved. 🌹",
    "May life surprise you in the loveliest ways. 🎀",
    "May the little things bring you the biggest joy. ♡"
  ];

  let lastWish = -1;

  $("#wishButton").addEventListener("click", () => {
    let nextWish;

    do {
      nextWish = Math.floor(Math.random() * wishes.length);
    } while (nextWish === lastWish && wishes.length > 1);

    lastWish = nextWish;
    $("#wishText").textContent = wishes[nextWish];
  });

  // FALLING PETALS
  function createPetals(count = 20) {
    const symbols = ["🌹", "🌸", "💗", "🌺"];

    for (let i = 0; i < count; i++) {
      setTimeout(() => {
        const petal = document.createElement("span");
        petal.className = "petal";
        petal.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.fontSize = `${15 + Math.random() * 18}px`;
        petal.style.animationDuration = `${3 + Math.random() * 4}s`;
        petal.style.setProperty("--drift", `${Math.random() * 180 - 90}px`);

        document.body.appendChild(petal);
        petal.addEventListener("animationend", () => petal.remove(), { once: true });
      }, i * 90);
    }
  }

  $("#petalButton").addEventListener("click", () => {
    createPetals(45);
    toast("A little rain of happiness! 🌹");
  });

  // MUSIC UPLOAD AND PLAYER
  const musicUpload = $("#musicUpload");
  const audioPlayer = $("#audioPlayer");
  const playMusic = $("#playMusic");
  const stopMusic = $("#stopMusic");
  const musicTitle = $("#musicTitle");
  const musicStatus = $("#musicStatus");

  let currentMusicURL = null;

  musicUpload.addEventListener("change", () => {
    const file = musicUpload.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("audio/")) {
      toast("Please select a valid audio file.");
      musicUpload.value = "";
      return;
    }

    if (currentMusicURL) {
      URL.revokeObjectURL(currentMusicURL);
    }

    currentMusicURL = URL.createObjectURL(file);
    audioPlayer.src = currentMusicURL;
    audioPlayer.load();

    musicTitle.textContent = file.name;
    musicStatus.textContent = "Song ready to play";
    playMusic.textContent = "▶";
    toast("Your song has been added! 🎵");

    musicUpload.value = "";
  });

  playMusic.addEventListener("click", async () => {
    if (!audioPlayer.src) {
      toast("Upload your favourite song first!");
      musicUpload.click();
      return;
    }

    if (audioPlayer.paused) {
      try {
        await audioPlayer.play();
      } catch {
        musicStatus.textContent = "Unable to play this file";
        toast("Could not play this audio file.");
      }
    } else {
      audioPlayer.pause();
    }
  });

  audioPlayer.addEventListener("play", () => {
    playMusic.textContent = "Ⅱ";
    musicStatus.textContent = "Now playing";
  });

  audioPlayer.addEventListener("pause", () => {
    playMusic.textContent = "▶";
    if (audioPlayer.currentTime > 0 && !audioPlayer.ended) {
      musicStatus.textContent = "Paused";
    }
  });

  audioPlayer.addEventListener("ended", () => {
    playMusic.textContent = "▶";
    musicStatus.textContent = "Song finished";
  });

  audioPlayer.addEventListener("error", () => {
    if (audioPlayer.src) {
      musicStatus.textContent = "Audio could not be loaded";
    }
  });

  stopMusic.addEventListener("click", () => {
    if (!audioPlayer.src) {
      toast("No song has been selected.");
      return;
    }

    audioPlayer.pause();
    audioPlayer.currentTime = 0;
    playMusic.textContent = "▶";
    musicStatus.textContent = "Stopped";
  });

  // CLEAN UP TEMPORARY MEDIA WHEN PAGE CLOSES
  window.addEventListener("beforeunload", () => {
    photoUrls.forEach(url => URL.revokeObjectURL(url));

    if (currentMusicURL) {
      URL.revokeObjectURL(currentMusicURL);
    }
  });
});
