# 🍣 Sushi Delivery Network

A modern full-stack application for sushi delivery service with beautiful UI and robust functionality.

![React](https://img.shields.io/badge/React-18.3.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9.5-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-orange)

## ✨ Features

### 🎯 Core Functionality
- **Product Catalog** - Beautiful sushi cards with categories
- **User Authentication** - Secure login/registration system
- **Shopping Cart** - Seamless order management
- **Real-time Notifications** - User feedback system
- **Modal Windows** - Smooth interactive dialogs

### 🛠️ Admin Panel
- **Quick Product Management** - Add/edit sushi items
- **Category Management** - Organize menu categories
- **Admin Dashboard** - Streamlined administrative tools

### 🎨 UI/UX Features
- **Custom Swiper Component** - Handcrafted swipeable carousel on homepage
- **Responsive Design** - Optimized for all devices
- **Modern Styling** - Clean and appealing interface

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Styled Components** - CSS-in-JS styling
- **Redux Toolkit** - State management
- **Apollo Client** - GraphQL integration
- **Axios** - HTTP requests

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **GraphQL** - API query language
- **CORS** - Cross-origin resource sharing
- **Sequelize** - Database ORM

## 🏗️ Project Structure

```
seafoodshop-fullstack/
├── client/ # Frontend React Application
│ ├── public/ # Static public assets
│ └── src/
│   ├── components/ # Reusable UI Components
│   ├── graphql/ # GraphQL API integration
│   ├── hooks/ # Custom React hooks
│   ├── http/ # HTTP utilities (Axios config)
│   ├── pages/ # Page components
│   ├── static/ # Static assets
│   ├── store/ # Redux state management
│   ├── types/ # TypeScript type definitions
│   ├── utils/ # Utility functions
│   └── animations/ # CSS animations and keyframes
└── server/ # Backend Node.js Application
  ├── controllers/ # Business logic controllers
  ├── error/ # Error handling utilities
  ├── graphql/ # GraphQL API setup
  ├── middleware/ # Express middleware
  ├── models/ # Sequelize database models
  ├── routes/ # REST API routes (if any)
  ├── static/ # Server static files
  └── utils/ # Server utility functions
```

## 🎮 Key Components

### Frontend Highlights
- **Custom Swiper** - Self-implemented swipeable carousel
- **Product Cards** - Interactive sushi item displays
- **Cart Management** - Dynamic shopping cart
- **Auth Forms** - Secure authentication flows
- **Admin Interface** - Quick product/category management

### Backend Features
- **GraphQL API** - Flexible data queries
- **Sequelize ORM** - Database management
- **RESTful endpoints** - Additional API support
- **CORS configuration** - Cross-domain requests

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/Emeraldo48/seafoodshop-fullstack.git
cd seafoodshop-fullstack
```

2. **Install backend dependencies**
```bash
cd server
npm install
```

3. **Install frontend dependencies**
```bash
cd ../client
npm install
```

4. **Run the application**
```bash
# Start backend (from server directory)
npm run dev

# Start frontend (from client directory)  
npm start
```

## 📸 Screenshots

- **Homepage** with custom swiper
![Main page image](https://github.com/Emeraldo48/seafoodshop-fullstack/raw/master/screenshots/main-page.png)
- **Cart**
![Main page image](https://github.com/Emeraldo48/seafoodshop-fullstack/raw/master/screenshots/cart-page.png)
![Main page image](https://github.com/Emeraldo48/seafoodshop-fullstack/raw/master/screenshots/cart-button-hover.png)
- **Modal window**
![Main page image](https://github.com/Emeraldo48/seafoodshop-fullstack/raw/master/screenshots/cart-button-hover.png)

## 🛠️ Development

### Available Scripts

**Frontend**
```bash
npm start          # Start development server
npm run build      # Build for production
```

**Backend**
```bash
npm run start        # Start development server
```