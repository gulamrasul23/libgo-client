# LibGo
Library-to-Home Delivery System

---

## Table of Contents

- [About the Project](#about-the-project)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Tech Stack](#tech-stack)
- [Dependencies](#dependencies)
- [Installation & Setup](#installation--setup)
- [Folder Structure](#folder-structure)
- [Contributions](#contributions)
- [How to Contribute](#how-to-contribute)
- [License](#license)
- [Contact](#contact)

---

## About the Project
LibGo is a comprehensive library delivery management system designed to bridge the gap between libraries and readers. It allows users to borrow books from nearby libraries without physical visits, making reading more accessible and convenient.

---

## Project Overview
The primary goal of LibGo (also known as BookCourier) is to simplify the book borrowing process for students, researchers, and avid readers. The platform ensures a seamless experience from browsing books to having them delivered to the user's doorstep, featuring a robust role-based access control system (User, Librarian, Admin).


---

## Key Features
- **Role-Based Dashboard System** — Tailored interfaces and workflows for Users, Librarians, and Admins.
- **Secure Authentication & Authorization** — Firebase email/social login secured with JWT for private routes.
- **Advanced Book Management** — Features including search by name, price sorting, categorization, and "Related Books" suggestions.
- **Smart Borrowing & Payment Flow** — Seamless borrowing modal, real-time status tracking (Pending → Shipped → Delivered), and payment gateway simulation.
- **Interactive Coverage Map** — A dynamic map built with Leaflet showcasing cities with active delivery service.
- **Wishlist** — Allows users to save their favorite books for later.

---

## Tech Stack
**Frontend:** React.js · Tailwind CSS · DaisyUI
<br>
**Backend:** Node.js · Express.js
<br>
**Database:** MongoDB
<br>
**Tools:** Vite · Firebase · JWT · Axios

---

## Dependencies
```json
{
  "react-router-dom": "^6.x",
  "firebase": "^10.x",
  "axios": "^1.x",
  "react-hook-form": "^7.x",
  "swiper": "^11.x",
  "react-leaflet": "^4.x",
  "sweetalert2": "^11.x"
}
```

## Installation️ & Setup
1. Clone the repo and install dependencies:

```bash
git clone [https://github.com/gulamrasul23/libgo-client.git](https://github.com/gulamrasul23/libgo-client.git)
cd libgo-client
npm install
```

2. Set up environment variables by creating a `.env` file in the root directory:

```env
VITE_APIKEY=your_api_Key
VITE_AUTHDOMAIN=Your_domain
VITE_PROJECTID=your_project_id
VITE_STORAGEBUCKET=your_storage_bucekt
VITE_MESSAGINGSENDERID=your_messaging_sender_id
VITE_APPID=appId

VITE_image_key=your_image_key
```

3. Run the application:

```bash
npm run dev
```

---

## Folder Structure

```plaintext
your-project/
│
├── src/
│   ├── components/
│   ├── pages/
│   ├── utils/
│   └── hooks/
├── public/
└── package.json
```

---



## License (Optional)
Distributed under the MIT License. See `LICENSE.txt` for more information.

---

## Contact

**Live URL:** [Live Site](https://lib-go-5abe2.web.app/)
<br>
**Email:** [Gulam Rasul](gulamrasulrahim23@gmail.com)
<br>
**Portfolio:** [Portfolio](https://portfolio-six-flame-xjdvqk020y.vercel.app)
