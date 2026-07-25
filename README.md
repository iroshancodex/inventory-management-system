# 📊 Inventory Management System (Frontend Only)

A responsive, feature-rich Inventory Management System built with **React**, **Tailwind CSS**, **Formik**, **Yup**, and **LocalStorage**. Developed as an Intern Assessment task.

---

## 🚀 Features Implemented

### Core Features
- **Product Management (CRUD):** Add, Edit, Delete products with auto-generated SKU IDs.
- **Stock Level Management:** Restock (+) and Sale (-) controls with validation to prevent negative stock.
- **Form Validation:** Integrated **Formik** and **Yup** for client-side field validations.
- **Dashboard Summary:** Overview of total products, total stock value (LKR), low stock alerts, and category distributions.
- **Search & Filters:** Real-time search by Product Name/SKU and filter by Category or Stock Status (In Stock / Out of Stock).
- **Data Persistence:** All data stored locally using browser `localStorage` (no backend required).

### Bonus Features
- 🏷️ **Auto-generated SKU:** Automatically creates unique identifiers (`PRD-XXXXXX`).
- 📥 **CSV Export:** Download full inventory list as a `.csv` file.

---

## 🛠️ Tech Stack

- **Framework:** React.js (Vite)
- **Styling:** Tailwind CSS
- **Form Handling:** Formik
- **Schema Validation:** Yup
- **State & Storage:** React Hooks + LocalStorage API

---

## 💻 How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone <YOUR-GITHUB-REPO-LINK>
   cd inventory-management-system