# IGCSEHub

**IGCSEHub** is a modern, student-focused SaaS platform to help learners prepare for the International General Certificate of Secondary Education (IGCSE). The app supports private candidates, tutors, and parents by offering mock exams, study tools, and educational content.

---

## 🚀 Features

- 🔐 **Clerk Authentication with Role-Based Access**  
  Admin and Student roles managed via Clerk (no database yet)

- 🧠 **Mock Exams by Subject**  
  Take quizzes by subject, view scores, and review answers

- 📅 **Checkpoint Tracker**  
  Track progress on weekly goals with visual progress bar

- 📰 **Blog System (JSON-based)**  
  Public blog articles to help users learn about IGCSE, study tips, and parent guidance

- 📂 **Client-Side Blog Rendering**  
  Blog posts stored in `/public/blog/posts.json` for easy deployment (no `fs` or markdown parsing needed)

---

## 🧱 Tech Stack

- **Next.js 15** with App Router (React 19)
- **Tailwind CSS + Shadcn UI** for styling
- **Clerk** for authentication & role management
- **TypeScript** for strict type safety
- **LocalStorage** for saving quiz and checkpoint progress

---

## 🛠 How to Run Locally

1. Clone the repo:
```bash
git clone https://github.com/your-username/igcsehub.git
cd igcsehub
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file with Clerk keys (skip DB for now)

4. Run the dev server:
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000)

---

## 📌 Roadmap (Upcoming)

- ✅ Finish JSON-based blog viewer
- ⏳ Subject detail pages with guides
- ⏳ Contribution system for educators
- ⏳ Analytics dashboard for admins
- ⏳ Optional PostgreSQL integration

---

## 📄 License
MIT or custom license (TBD)

---

> Built with ❤️ by Abu Hazan — Educational support for IGCSE students everywhere.
