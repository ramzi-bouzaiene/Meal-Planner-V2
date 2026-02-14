# 🍽️ Meal Planner

## Overview
Meal Planner is a full-stack web application that allows users to search for recipes, plan their meals, and manage their dietary preferences efficiently.

## Features
- 🔍 **Search Recipes**: Find recipes based on ingredients, cuisine, and dietary restrictions.
- 📅 **Meal Planning**: Add recipes to meal plans for different days of the week.
- ✅ **Authentication**: Secure login and registration system.
- 🔒 **Protected Routes**: Certain features require authentication.
- 📄 **Swagger API Documentation**: Easily explore API endpoints.
- 📜 **Winston Logging**: Centralized logging for debugging and monitoring.

## Tech Stack
### Frontend:
- **React (TypeScript)** – Component-based UI development
- **React Router** – Navigation and protected routes
- **CSS** – Styling and responsive design

### Backend:
- **Node.js & Express** – Server-side logic
- **MongoDB & Mongoose** – Database and ORM
- **JWT (JSON Web Tokens)** – Secure authentication
- **Bcrypt.js** – Password hashing
- **Swagger** – API documentation
- **Winston** – Logging middleware

## Installation

### Prerequisites
- Node.js (>=16)
- MongoDB (local or cloud-based)

### Setup
#### Clone the repository
```sh
git clone https://github.com/ramzibouzaiene/meal-planner.git
cd meal-planner
```

#### Install dependencies
##### Backend
```sh
cd Back
npm install
```
##### Frontend
```sh
cd ../Front
npm install
```

#### Environment Variables
Create a `.env` file in the `backend` folder and add:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

#### Start the application
##### Backend
```sh
npm run dev
```
##### Frontend
```sh
npm run dev
```

## API Endpoints
### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Favorites
- `POST /api/favorites` - Create a favorite meal
- `GET /api/favorites` - Get all favorites
- `PUT /api/favorites/:id` - Update favorite
- `DELETE /api/favorites/:id` - Delete favorite

### Meal Plans
- `POST /api/mealPlans` - Create a meal plan
- `GET /api/mealPlans` - Get all meal plans
- `PUT /api/mealPlans/:id` - Update meal plan
- `DELETE /api/mealPlans/:id` - Delete meal plan

### API Documentation (Swagger)
The API documentation is available via Swagger. To access it, start the backend and visit:
```sh
http://localhost:5000/api-docs
```

## Protected Routes
Some routes require authentication using JWT tokens. The frontend handles this with a protected route component.

## Contributing
1. Fork the repository
2. Create a feature branch (`git checkout -b feature-name`)
3. Commit changes (`git commit -m 'Added new feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a pull request

