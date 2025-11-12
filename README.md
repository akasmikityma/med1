<p align="center">
  <img src="public/betterlogo.jpg" width="80" alt="Mediocure logo">
</p>

<h1 align="center">🩺 Mediocure</h1>
<p align="center">
  Healthcare Appointments Made Simple
</p>


> **Connect patients with doctors seamlessly.**  
> Book appointments instantly, manage schedules effortlessly, and focus on what matters most — your health.

---

## 🌐 Live Demo

🔗 **[Visit Mediocure on Vercel](https://mediocure.vercel.app)**  
*(Deployed with NeonDB as backend database)*

---

## 🚀 Overview

**Mediocure** is a full-stack healthcare appointment management web app built with **Next.js 14 (App Router)**, **TypeScript**, and **Prisma ORM**.  
It bridges the gap between **clinics** and **patients**, making the process of booking and managing doctor visits intuitive and efficient.

---

## ✨ Features

✅ **Role-based access**  
Different dashboards for **clinics** and **patients**.

✅ **Clinic dashboard**  
Manage visiting doctors, appointments, and patient records.

✅ **Doctor visiting schedules**  
Clinics can add and manage doctors' visiting days and hours.

✅ **Patient booking system**  
Patients can view available visits and instantly book appointments.

✅ **Google Authentication (NextAuth)**  
Secure and seamless login using Google accounts.

✅ **Real-time appointment tracking**  
Clinics and patients can both see live updates for bookings.

✅ **NeonDB + Prisma**  
Cloud-hosted PostgreSQL database for reliability and scalability.

---

## 🧠 Tech Stack

| Layer | Technology |
|--------|-------------|
| **Frontend** | Next.js 14 (App Router) + React + TypeScript + Tailwind CSS |
| **State Management** | Recoil |
| **Auth** | NextAuth.js (Google OAuth) |
| **Backend / ORM** | Prisma ORM |
| **Database** | PostgreSQL (hosted on NeonDB) |
| **Hosting** | Vercel |
| **Language** | TypeScript |

---

## 📁 Project Structure

<pre>
├── prisma/ # Prisma schema & migrations
├── app/ # App Router (Next.js)
│ ├── api/ # Server routes (Next.js server actions)
│ ├── clinic/ # Clinic dashboard pages
│ ├── patient/ # Patient dashboard pages
│ └── ...
├── lib/ # Auth, Prisma, and utility functions
├── components/ # Reusable UI components
├── public/ # Static assets (logos, icons)
└── README.md
<pre>

---

## 🖼️ Screenshots

| View | Preview |
|------|----------|
| 🔐 Google Login | ![Google Login](https://github.com/akasmikityma/med1/blob/main/Screenshots/PatientLogin.gif?raw=true) |
| 🏥 Clinic Creating Visit | ![Clinic VisitCreating](https://github.com/akasmikityma/med1/blob/main/Screenshots/ClinicCreatingVisit.gif?raw=true) |
| 👨‍⚕️ Patient Booking | ![Patient Booking](https://github.com/akasmikityma/med1/blob/main/Screenshots/PatientBookingVisit.gif?raw=true) |


---

## 🧰 Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/akasmikityma/med1.git
cd med1
2️⃣ Install dependencies
npm install
3️⃣ Set up environment variables

Create a .env file in the project root:

DATABASE_URL="postgresql://<your-neon-connection-url>"
GOOGLE_CLIENT_ID="<your-client-id>"
GOOGLE_CLIENT_SECRET="<your-client-secret>"
NEXTAUTH_SECRET="<any-random-string>"
NEXTAUTH_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"

4️⃣ Run Prisma migrations
npx prisma migrate dev

5️⃣ Start the dev server
npm run dev

Then visit ➜ http://localhost:3000

☁️ Deployment

This app is hosted on Vercel, with the database managed by NeonDB.
To deploy your own instance:

Push your code to GitHub.
Import the repo in Vercel Dashboard.
Add all environment variables (same as in .env).


Deploy 🚀

After your first deploy:
Update NEXTAUTH_URL and NEXT_PUBLIC_SITE_URL to your production URL (e.g. https://mediocure.vercel.app)
Update Google OAuth redirect URIs in Google Cloud Console accordingly:

https://mediocure.vercel.app/api/auth/callback/google


🧩 Future Enhancements / TODOs

💬 Video consultations via WebRTC
💳 Payment integration (Stripe)
📊 Admin analytics dashboard
🕒 Appointment reminders (SMS / email)


📱 Mobile-first PWA version


👨‍💻 Author
Bishal Maity
🌍 GitHub
🧠 Full-stack developer passionate about scalable web systems, AI, and product design.

📄 License

This project is open source under the MIT License.