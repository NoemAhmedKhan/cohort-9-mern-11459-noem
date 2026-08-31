# NoteTaker

NoteTaker is a full-stack Notes Management System that allows users to securely create, view, edit, search, and delete their personal notes.

## Features

* User Sign Up and Login
* JWT-based authentication
* Cookie-based authentication
* Frontend and backend validation
* Create, view, edit, and delete notes
* Rich text note editor using Tiptap
* Search notes
* Pagination
* User profile management
* Change password
* Protected routes and APIs
* Frontend testing with Vitest
* Backend testing with Jest
* Test coverage
* Code quality analysis with SonarQube
* Code review with CodeRabbit

## Technology Stack

### Frontend

* React.js
* React Router
* Tiptap
* Vite
* Vitest
* React Testing Library
* ESLint

### Backend

* Node.js
* Express.js
* RESTful APIs
* Mongoose
* JSON Web Token (JWT)
* bcrypt
* Cookie Parser
* CORS
* Pino Logger
* Jest

### Database

* MongoDB

### Code Quality

* SonarQube
* CodeRabbit

## Application Modules

### Authentication

Users can create an account and log in using their email and password.

During registration:

* Full name is required.
* Email must use the `@gmail.com` domain.
* Password must contain 8–16 characters.
* Password must contain at least one uppercase letter, one number, and one special character.

Login also includes frontend validation for email and password.

### Dashboard

After successful login, users are redirected to the Dashboard.

The Dashboard provides:

* List of user's notes
* Note search
* Pagination
* Navigation to the Note Editor
* Navigation to Profile
* Sign Out functionality

### Note Editor

The Note Editor uses Tiptap for rich text editing.

Users can:

* Add a note title
* Write and format note content
* Save notes
* View existing notes
* Edit notes
* Cancel changes
* Delete notes

Existing notes initially open in view-only mode. Users can select **Edit** to modify the note or **Delete** to remove it after confirmation.

### Profile

The Profile section displays the user's:

* Full Name
* Email

Users can:

* Edit their profile information
* Change their password

## Authentication

The application uses JWT-based authentication.

After successful login, a JWT containing user information is stored in a browser cookie.

The authentication middleware verifies the JWT before allowing access to protected backend routes.

If the token is missing, invalid, or expired, the request is rejected and the user must authenticate again.

When the user signs out, the authentication cookie is removed.

## Project Structure

```text
cohort_9_MERN_11459_Noem/
│
├── backend/
├── node-app/
│   ├── config/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── security/
│   ├── tests/
│   ├── utils/
│   ├── connection.js
│   ├── index.js
│   ├── jest.config.js
│   └── package.json
│
├── frontend/
├── react-app/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vitest.config.js
│
├── code-rabbit.yml
├── sonar-project.properties
└── README.md
```

## Installation

### Clone the Repository

```bash
git clone <repository-url>
cd cohort_9_MERN_11459_Noem
```

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` directory and add the required configuration.

Example:

```env
PORT=5000
MONGODB_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
NODE_ENV=development
```

Start the backend:

```bash
npm start
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend development server:

```bash
npm run dev
```

## Database

The application uses **MongoDB** with **Mongoose** for database operations.

The MongoDB connection is configured through the `MONGODB_URI` environment variable.

## Testing

### Frontend

Run tests in watch mode:

```bash
npm test
```

Run tests once:

```bash
npm run test:run
```

Generate test coverage:

```bash
npm run coverage
```

### Backend

Run Jest tests:

```bash
npm test
```

## Code Quality

The project uses **ESLint** for frontend code linting.

Run the frontend linter:

```bash
npm run lint
```

**SonarQube** is used for code quality analysis, including identifying bugs, vulnerabilities, code smells, and other quality issues.

SonarQube configuration is available in:

```text
sonar-project.properties
```

**CodeRabbit** is used for automated code review and analysis.

Its configuration is available in:

```text
code-rabbit.yml
```

## Build

To create a production build of the frontend:

```bash
npm run build
```

The generated production files can be previewed using:

```bash
npm run preview
```

## Security

* JWT-based authentication
* Cookie-based authentication
* Password hashing using bcrypt
* Protected backend routes
* Frontend and backend validation
* Environment variables for sensitive configuration
* Cookie expiration after 12 hours.
* Authentication middleware

> Do not commit real database credentials, JWT secrets, or other sensitive information to the repository.

## License

This project is developed as a Notes Management System project.
