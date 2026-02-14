# LibGo – Library-to-Home Delivery System

**LibGo** is a comprehensive library delivery management system designed to bridge the gap between libraries and readers. It allows users to borrow books from nearby libraries without physical visits, facilitates librarians in managing their inventory, and provides administrators with full system control.

**Live Site URL:** [(https://lib-go-5abe2.web.app/)]

## Project Overview

The primary goal of BookCourier is to simplify the book borrowing process for students, researchers, and avid readers. The platform ensures a seamless experience from browsing books to having them delivered to the user's doorstep, featuring a robust role-based access control system (User, Librarian, Admin).

## Key Features

***  Role-Based Dashboard System:**
    * **User:** Manage orders, track delivery status, wishlist books, and view payment history.
    * **Librarian:** Add/Update books, manage inventory status (published/unpublished), and handle order workflows (Pending → Shipped → Delivered).
    * **Admin:** Manage users (promote to Admin/Librarian) and oversee all books and system activities.
*** Secure Authentication & Authorization:**
    * Email/Password and Social Login via Firebase.
    * JWT (JSON Web Token) implementation for securing private routes and API endpoints.
*** Advanced Book Management:**
    * Search functionality to find books by name.
    * Sorting options to filter books by price.
    * Book categories, details view, and "Related Books" suggestions.
*** Smart Borrowing & Payment Flow:**
    * Seamless "Borrow" process with a modal form.
    * Real-time status tracking (Pending, Paid, Shipped, Delivered).
    * Integrated payment gateway simulation.
*** Interactive Coverage Map:**
    * A dynamic map showcasing all cities where BookCourier service is available using Leaflet maps.
*** Wishlist:**
    * Users can add books to a wishlist for later.
    

## Technologies Used

* **Frontend:** React.js, Tailwind CSS, DaisyUI
* **Backend:** Node.js, Express.js
* **Database:** MongoDB
* **Authentication:** Firebase Auth
* **Security:** JWT (JSON Web Token)
* **Tools:** Vite, Axios, React Router

## Main npm Packages Used (Client Side)

* `react-router`: For single-page application navigation.
* `firebase`: For authentication and hosting.
* `axios`: For making secure HTTP requests to the backend.
* `react-hook-form`: For efficient form handling and validation.
* `swiper`: For the interactive home page sliders/carousels.
* `react-leaflet` : For displaying the delivery coverage map.
* `sweetalert2`: For user-friendly notifications and alerts.

