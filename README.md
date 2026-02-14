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

## Screenshots

<img width="671" height="415" alt="image" src="https://github.com/user-attachments/assets/fac4b64d-c0ca-4f17-85c4-e2c9bd5c2571" />
<img width="545" height="411" alt="image" src="https://github.com/user-attachments/assets/dcc8ec3a-7ddf-4b5a-b804-a57d8b8ecfca" />
<img width="935" height="384" alt="image" src="https://github.com/user-attachments/assets/475478fb-951e-4454-80dd-1111b2a37edf" />
<img width="807" height="365" alt="image" src="https://github.com/user-attachments/assets/f33e5781-7ae5-4eee-9647-b85c3bfba60f" />
<img width="313" height="328" alt="image" src="https://github.com/user-attachments/assets/b21b6be5-95af-4fdb-99c1-05c343ef3bd1" />
<img width="1622" height="1086" alt="image" src="https://github.com/user-attachments/assets/251a2e37-37b5-4e19-851b-78528185ef70" />







