# 🐍 Snake Arcade Game (PWA)

A responsive, mobile-friendly Snake Arcade Game built using **HTML5, CSS3, and Vanilla JavaScript**. Designed as a **Progressive Web App (PWA)**, it supports both desktop keyboard controls and mobile touch swipe gestures, and can be installed directly onto your phone's home screen for offline gameplay.

---

## ✨ Features

* **Responsive Grid Layout:** Dynamically calculates grid rows and columns based on screen dimensions (`100dvh`) to fit mobile, tablet, and desktop screens.
* **Dual Controls:**
  * **Desktop:** Smooth Arrow Key navigation (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`) with reverse-direction protection.
  * **Mobile:** Custom touch-swipe gesture detection (`touchstart` & `touchend`) with accidental-tap threshold filtering.
* **Progressive Web App (PWA):**
  * Installable on Android and iOS devices via `manifest.json`.
  * **Offline Support:** Powered by a Service Worker (`sw.js`) that caches game assets for uninterrupted offline play.
* **Persistent High Score:** Automatically saves and updates your highest score using browser `localStorage`.
* **Live Game Timer & Scoreboard:** Tracks real-time survival duration (`MM - SS`) and current score.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure and PWA manifest linking.
* **CSS3:** CSS Grid, CSS Custom Properties (variables), dynamic viewport units (`dvh`), and `touch-action` optimization.
* **JavaScript (ES6+):** DOM manipulation, `setInterval` game loop, `localStorage`, Touch Events API, and Service Workers.

---

## 📂 Project Structure

```text
snake-game/
├── index.html      # Main game layout, scoreboard, and modals
├── style.css       # Responsive styling, grid setup, and mobile touch rules
├── script.js       # Core snake movement, collision, swipe controls, and score logic
├── manifest.json   # PWA configuration for standalone app installation
├── sw.js           # Service Worker for caching and offline gameplay
├── icon.png        # App icon (512x512)
└── README.md       # Project documentation
```

---

## 🎮 How to Play

1. Click **Start Game** on the welcome modal.
2. **On Desktop:** Use the **Arrow Keys** to steer the snake.
3. **On Mobile:** **Swipe** up, down, left, or right anywhere on the game board.
4. Eat the red food blocks to grow longer and earn **+10 points** per food item.
5. Avoid hitting the outer walls—if you crash, click **Restart Game** to play again.

---

## 📲 How to Install as a Mobile App

1. Open the live GitHub Pages link in **Google Chrome** (Android) or **Safari** (iOS).
2. Tap the browser menu (**⋮** on Chrome or **Share** icon on Safari).
3. Select **"Install App"** or **"Add to Home Screen"**.
4. Launch the game directly from your home screen in full-screen standalone mode!

---

## 🚀 Future Improvements

* Add self-collision detection (game over when the snake hits its own body).
* Increase snake movement speed progressively as the score grows.
* Add sound effects for eating food and game over events.
