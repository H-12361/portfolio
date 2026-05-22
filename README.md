# 🚀 Harshit Tiwari — Portfolio Website

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Status-Live-brightgreen?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=for-the-badge&logo=framer)

**A modern, animated personal portfolio built with the MERN stack.**

[🌐 Live Site](#) · [📧 harshittiwari61200@gmail.com](mailto:harshittiwari61200@gmail.com) · [💼 LinkedIn](https://www.linkedin.com/in/harshit-tiwari-2b5546232/) · [🐙 GitHub](https://github.com/H-12361)

</div>

---

## ✨ Features

- **Dark theme** with teal (`#64ffda`) accent — minimal, professional, elegant
- **Times New Roman** typography — classic serif for a refined, distinctive look
- **Smooth animations** powered by Framer Motion — stagger reveals, scroll triggers
- **Typewriter effect** on the hero — cycles through MERN, React, Node, Full Stack
- **Custom cursor** — clean dot that expands on hover
- **Fully responsive** — mobile-first layout, works on all screen sizes
- **Contact form** with backend email sending via NodeMailer
- **GitHub activity graph** — animated contribution visualization
- **Project modals** — click "View Details" for expanded project info
- **Smooth scroll navigation** — all nav links jump to sections

---

## 🛠 Tech Stack

### Frontend
| Tool | Purpose |
|------|---------|
| React 18 | UI framework |
| Framer Motion | Animations & transitions |
| Vite | Build tool & dev server |
| CSS-in-JS (inline styles) | Component styling |

### Backend
| Tool | Purpose |
|------|---------|
| Node.js + Express.js | Server |
| MongoDB + Mongoose | Database for contact form submissions |
| NodeMailer | Email sending on contact form submit |

---

## 📁 Project Structure

```
client/
├── public/
│   └── resume.pdf          ← Your resume (add this!)
├── src/
│   ├── components/
│   │   ├── Navbar.jsx      ← Fixed navigation with scroll detection
│   │   ├── Hero.jsx        ← Landing section with typewriter
│   │   ├── About.jsx       ← Skills grid
│   │   ├── Projects.jsx    ← Project cards with modals
│   │   ├── Experience.jsx  ← Work & education timeline
│   │   ├── GitHub.jsx      ← GitHub contribution graph
│   │   ├── Contact.jsx     ← Contact form
│   │   ├── Footer.jsx      ← Footer with links
│   │   └── Cursor.jsx      ← Custom cursor
│   ├── data.js             ← ⭐ ALL your info lives here (edit this!)
│   ├── App.jsx             ← Root component
│   ├── main.jsx            ← Entry point
│   └── index.css           ← Global styles & CSS variables
├── server/
│   ├── Server.js           ← Express server
│   ├── models/
│   │   └── contactModel.js
│   ├── routes/
│   │   └── contactRoutes.js
│   ├── controller/
│   │   └── contactController.js
│   └── config/
│       ├── db.js           ← MongoDB connection
│       └── nodeMailer.js   ← Email config
├── index.html
├── vite.config.js
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm or yarn
- MongoDB (local or Atlas)

### 1. Clone the Repository

```bash
git clone https://github.com/H-12361/portfolio.git
cd portfolio/client
```

### 2. Install Frontend Dependencies

```bash
npm install
```

### 3. Start Frontend Dev Server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Setup Backend (for contact form)

```bash
cd server
npm install
```

Create a `.env` file in `/server`:

```env
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=5000
```

Start the server:

```bash
node Server.js
```

---

## ✏️ Customization Guide

All personal info lives in **`src/data.js`** — just edit that file:

```js
export const personalInfo = {
  name: "Harshit Tiwari",
  email: "harshittiwari61200@gmail.com",
  phone: "+91 6386068863",
  linkedin: "https://www.linkedin.com/in/harshit-tiwari-2b5546232/",
  github: "https://github.com/H-12361",
  // ...
};

export const projects = [
  {
    title: "Your Project",
    live: "https://your-live-link.com",
    github: "https://github.com/H-12361/your-repo",
    // ...
  }
];
```

**To add your resume:** Place `resume.pdf` inside the `public/` folder.

**To change colors:** Edit CSS variables in `src/index.css`:
```css
:root {
  --accent: #64ffda;   /* teal accent */
  --bg: #060b14;       /* dark background */
}
```

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to `dist/` — deploy this folder to Vercel, Netlify, or any static host.

### Deploy to Vercel (Recommended)

```bash
npm i -g vercel
vercel
```

---

## 🔗 My Projects

| Project | Live | GitHub |
|---------|------|--------|
| 🏠 Interior Design Website | [Live ↗](https://thriving-semolina-5f23bc.netlify.app/) | [Repo ↗](https://github.com/H-12361/Intrior_Designed) |
| ⛽ Petroshop Platform | [Live ↗](https://thepetroshop.com/login) | Private |
| 💇 Salon Website | [Live ↗](https://salon-nine-eta.vercel.app/) | [Repo ↗](https://github.com/H-12361/Salon) |
| 🛒 E-Commerce Website | — | [GitHub ↗](https://github.com/H-12361) |

---

## 📬 Contact

**Harshit Tiwari** — MERN Stack Developer  
📧 [harshittiwari61200@gmail.com](mailto:harshittiwari61200@gmail.com)  
📞 +91 6386068863  
📍 Indore, Madhya Pradesh

---

<div align="center">
  Made with ❤️ by Harshit Tiwari · Built with React.js
</div>
