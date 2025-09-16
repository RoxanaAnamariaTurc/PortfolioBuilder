# PortfolioBuilder

### Dissertation project - researching and building a portfolio builder project with typescript and react

#### Introduction

- This document's purpose is to guide how to install and run the project locally.

#### Key technologies

- ReactJS
- Typescript
- NodeJS
- ExpressJS
- Jest
- React Testing Library
- Storybook
- MongoDB
- Axios
- Cors
- Mongoose
- Emotion Styling

#### Prerequisites

1. Make sure you have installed NodeJS ( version 14.0 or higher )
2. Make sure you have installed MongoDB ( locally or remote )
3. Make sure you have installed Git

To ensure the project runs smoothly and no errors are encounter follow the next steps.

### Installation

- Clone the repository
  `git clone https://github.com/your-username/PortfolioBuilder.git`
- Navigate to the project directory
  `cd portfolio-generator`
- Install all the dependencies
  `npm install`
- Make sure all the dependencies are up to date
  `npm update`
- To run the server use `npm run start:server`
- To run the frontend use `npm run start:client`
- The project will open on your localhost:3000 and the server will open on localhost:3001

### Testing

The application has unit tests written with Jest. If you wish to run the tests simply run `npm test` from the root directory of the project

### Storybook

Storybook is used for building UI components and pages in isolation. This project includes stories for the Button component and TextArea component.

- To run Storybook use `npm run storybook`
- Open http://localhost:6006 to view it in the browser

### System Design

#### Architecture Overview

The PortfolioBuilder project follows a typical MERN (MongoDB, Express, React, Node.js) architecture:

- Frontend: Built with React and TypeScript, styled with Emotion, and bundled using Webpack.
- Backend: Implemented with Node.js and Express.js, using Mongoose for MongoDB interactions.
- Database: MongoDB is used for data storage.

#### Data Flow

- User Actions: Users interact with the frontend React components.
- API Calls: The frontend makes HTTP requests to the backend API using Axios.
- Backend Processing: The backend processes the requests, interacts with MongoDB to perform CRUD operations, and sends - responses back to the frontend.
- State Management: The frontend updates its state based on the responses from the backend.

#### Authentication & API Endpoints

The application issues short-lived, cookie-backed sessions. The frontend must send authenticated requests with
`withCredentials: true` so the browser includes the httpOnly `accessToken` and `refreshToken` cookies.

- `POST /register` — creates a user, stores an encrypted session, and returns the shareable portfolio token.
- `POST /login` — rotates the portfolio token, refreshes the session cookies, and returns the authenticated user.
- `POST /refresh` — swaps an expired access token for a new pair of session cookies.
- `POST /logout` — clears the session cookies and revokes the stored session identifiers.
- `GET /me` — returns the authenticated user (used to guard dashboard and project routes).
- `POST /portfolio/token/rotate` — issues a new shareable portfolio token without altering the active session.
- `GET /portfolio/:token` — publicly renders a portfolio for the supplied share token.
- `GET /projects` — retrieves the signed-in user’s projects.
- `POST /projects` — creates a project for the signed-in user.
- `PUT /projects/:projectId` — updates one of the signed-in user’s projects.
- `DELETE /projects/:projectId` — removes one of the signed-in user’s projects.
- `GET /skills` — fetches the signed-in user’s skill lists.
- `PUT /skills` — replaces the signed-in user’s skill lists.
- `GET /user/:token` — publicly fetches a user profile by portfolio token.
- `GET /user/:token/skills` — publicly fetches skill lists by portfolio token.

### Environment Setup

To set up different environments (development and production):

#### Development:

- Configure your `.env` file for local development.
- Required variable:
  - `MONGODB_URI` — connection string for your MongoDB instance.
- Optional variables:
  - `PORT` — overrides the default API port (3001).
  - `ACCESS_TOKEN_EXPIRATION_MINUTES` — minutes before an access token expires (default 15).
  - `REFRESH_TOKEN_EXPIRATION_DAYS` — days before a refresh token expires (default 7).
- Use local MongoDB or a development MongoDB Atlas cluster.

#### Production:

- Configure the same environment variables on Heroku (backend) and Netlify (frontend).
- Use MongoDB Atlas for a production database.

### Deployment Details

#### Deployment URL

- The app can be accessed here : [PortfolioBuilder](https://nimble-fairy-0b2928.netlify.app/)

#### Deployment Process

- Frontend (Netlify):
  Connect your GitHub repository to Netlify.
  Set up continuous deployment for the main branch.
  Ensure environment variables are configured in Netlify settings.

- Backend (Heroku):

Deploy your backend using Git.
Set up environment variables in Heroku.
Scale your dynos as needed.

#### CI/CD

- Netlify: Automatically builds and deploys the frontend when changes are pushed to GitHub.
- Heroku: Automatically deploys the backend when changes are pushed to the connected GitHub repository or manually via the Heroku CLI.

## Contributing to the project

Contributions will be welcomed once the open source license is set and everything is ready. Here’s how you can prepare to contribute in the future:

1. Fork the repository.
2. Create a new branch for your feature or bugfix
   `git checkout -b my-feature-branch`
3. Make your changes
4. Commit your changes
   `git commit -m "Description of my changes"`
5. Push to your branch
   `git push origin my-feature-branch`
6. Open a pull request on Github

Further details of the description messages for the PR will be released when the project is open sourced and ready for contribution.

## Future developments

This project is set to be open source in future development steps. Here are some of the features and improvements that are planned for implementation:

- Enhanced Component Library: Expansion of the component library with more reusable components
- Advanced Customization: More options for customizing portfolios
- Performance Optimization: Improvements in performance and scalability.
- Documentation: Comprehensive documentation for developers and end-users.

Due to time constraints allocated for my dissertation, these features are not possible to be completed before the deadline. However, once the open source license is established, we welcome contributions and look forward to collaborative development to make this project robust and widely useful.

### Client-side session handling

- The React client configures Axios with `withCredentials: true` for authenticated requests so the browser automatically forwards the httpOnly session cookies.
- Sensitive identifiers are kept out of `localStorage`; the `UserProvider` bootstraps user state by calling `GET /me` and exposes helpers to clear the session on `401` responses.
- Dashboard and project routes should gate access by awaiting `/me` and redirecting unauthenticated users to `/login`.
