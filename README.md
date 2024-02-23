# Institute Tracking System

This project aims to build a backend system for institutes to track their instructors' check-in and check-out times throughout the day and generate monthly reports of their working hours.

## Features

- **Multiple Check-in and Check-out**: Record multiple check-in and check-out times for instructors.
- **Monthly Reports**: Generate aggregated monthly reports of working hours for each instructor.
- **Authentication**: Implement user authentication using JWT to ensure secure access to the system.
- **Login, Signup, Update Instructor data, Soft Delete, All intsructors list, Individual instructor data, Chnage password, Get Instructor Profile**: Implement login, signup, update instructor, soft delete instructor, all instructor list, individual instructor data, change password and get instructor profile.

## Technologies Used

- Node.js: JavaScript runtime for building the backend server.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for storing instructor data.
- JWT (JSON Web Tokens): Used for authentication.
- Joi: Schema validation library for validating request data.

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```
2. Install dependencies:
```bash
cd institute-tracking-system
npm install
```
3. Set up environment variables:
Create a .env file in the root directory and add the following variables:
```bash
PORT=
DB_CONNECTION=
DB_HOST=
DB_PORT=
DB_DATABASE=
DB_USERNAME=
DB_PASSWORD=
JWT_TOKEN_EXPIRE=
SECRET_KEY=
```
5. Start the server:
```bash
npm start
```
