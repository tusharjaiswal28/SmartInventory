# SmartInventory

## Introduction

SmartInventory is an inventory management system built using React and Firebase. It helps users manage product stock, get alerts for low or expiring inventory, generate reports, and collaborate with team members. Designed for beginners, this project includes clean code, modular structure, and scalable architecture for future AI features.

## Project Type

Frontend | Fullstack (Firebase Backend)

## Deployed App

Frontend: 
Backend: Firebase Realtime Database

## Directory Structure

```
smartinventory-app/
├─ src/
│  ├─ components/
│  │  ├─ Header.jsx
|  |  ├─ InventoryContext.jsx
│  │  ├─ InventoryForm.jsx
│  │  ├─ InventoryList.jsx
│  │  ├─ Reports.jsx
│  │  └─ SearchBar.jsx
│  ├─ pages/
│  │  ├─ Dashboard.jsx
│  │  └─ Login.jsx
│  ├─ firebase.js
│  └─ App.jsx
```

## Video Walkthrough of the Project



## Features

* Role-based authentication (Admin/Viewer)
* Add/Delete inventory items with category, quantity, and expiry
* QR Code generation for items
* Sorting and filtering (by quantity, name, expiry, category)
* Alerts for low stock and expiring items
* Inventory reports dashboard

## Design Decisions or Assumptions

* Chose Firebase Realtime DB for simplicity and real-time sync
* Role selection only at registration (not editable after)
* Context API used to avoid prop drilling for items
* Viewer can view but cannot add/delete items
* Styling is kept minimal for beginner-friendliness

## Installation & Getting Started

```bash
git clone "repository link"
cd smartinventory
npm install
npm run dev
```

### Firebase Setup

1. Create Firebase Project
2. Enable Email/Password Auth
3. Add Realtime Database
4. Copy config to `firebase.js`

## Usage

```bash
# Run the app locally
npm install
npm start
```

1. Register or log in
2. Admins can add items with name, quantity, expiry, and category
3. Use search/filter/sort to explore items
4. View reports by clicking the report button
5. Logout to end session


## APIs Used

* Firebase Authentication
* Firebase Realtime Database
* QR Code Generation (qrcode.react)
* Toast Notifications (react-toastify)

## Technology Stack

* React.js
* Firebase (Auth + Realtime DB)
* React Router DOM
* QRCode.React
* Context API
