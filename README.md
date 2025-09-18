# Event Calendar

A full-stack web application for managing campus events, built with a React frontend and Node.js/Express backend. It provides an intuitive calendar interface for viewing, adding, and managing events, along with user authentication, admin approval system, and report generation capabilities.

## Features

- **Calendar Views**: Multiple views including Month, Week, Year, and Agenda for flexible event browsing.
- **Event Management**: Add, view, and manage events with details like title, organizer, date, time, location, and description.
- **User Authentication**: Secure login and signup with admin approval for new users.
- **Admin Panel**: Administrative interface for managing users, permissions, and events.
- **Report Generation**: Download event reports in PDF or Excel format for specified date ranges.
- **Responsive Design**: Mobile-friendly interface with adaptive layouts for different screen sizes.
- **Event Conflict Detection**: Prevents scheduling conflicts at the same venue and time.
- **Real-time Updates**: Dynamic fetching and display of events from the backend.

## Technologies Used

### Backend
- **Node.js**: JavaScript runtime for server-side development.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database for storing events, users, and permissions.
- **Mongoose**: ODM for MongoDB to manage data models.
- **Nodemailer**: For sending email notifications (e.g., admin notifications for new signups).
- **PDFKit**: Library for generating PDF reports.
- **XLSX**: Library for creating Excel spreadsheets.
- **Moment.js**: For date and time manipulation.

### Frontend
- **React**: JavaScript library for building user interfaces.
- **Vite**: Fast build tool and development server for React.
- **React Router**: For client-side routing and navigation.
- **CSS**: Custom styling for responsive and modern UI.

## Project Structure

```
event-calendar/
├── backend/                 # Backend server code
│   ├── models/              # MongoDB models (User, Listing, Permission, etc.)
│   ├── adminRoutes.js       # Admin-specific routes
│   ├── app.jsx              # Main Express server file
│   ├── package.json         # Backend dependencies and scripts
│   └── ...
├── snec/                    # Frontend React application
│   ├── src/
│   │   ├── components/      # React components (Calendar, EventForm, etc.)
│   │   ├── utils/           # Utility functions
│   │   ├── App.jsx          # Main React app component
│   │   └── ...
│   ├── public/              # Static assets
│   ├── package.json         # Frontend dependencies and scripts
│   └── ...
├── package.json             # Root package.json (if any)
└── README.md                # This file
```

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance, e.g., MongoDB Atlas)
- npm or yarn package manager

### Backend Setup
1. Navigate to the backend directory:
   ```
   cd backend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the backend directory with the following variables:
   ```
   MONGODB_URI=mongodb://127.0.0.1:27017/Event
   PORT=8000
   ADMIN_EMAIL=your-admin-email@example.com
   SMTP_USER=your-smtp-username
   SMTP_PASS=your-smtp-password
   ```
   - Replace the values with your actual MongoDB URI, port, and email credentials.

### Frontend Setup
1. Navigate to the frontend directory:
   ```
   cd snec
   ```
2. Install dependencies:
   ```
   npm install
   ```

## Running the Project

### Start the Backend Server
1. From the backend directory:
   ```
   cd backend
   npm start
   ```
   or if using nodemon:
   ```
   npx nodemon app.jsx
   ```
2. The server will run on `http://localhost:8000`.

### Start the Frontend Development Server
1. From the frontend directory:
   ```
   cd snec
   npm run dev
   ```
2. The app will be available at `http://localhost:5173` (default Vite port).

### Access the Application
- Open your browser and go to `http://localhost:5173` to use the Event Calendar app.
- Ensure the backend is running for full functionality.

## API Endpoints

The backend provides the following key API endpoints:

- `POST /api/login` - User login
- `POST /api/signup` - User registration (requires admin approval)
- `GET /api/events` - Fetch all events
- `POST /api/events` - Add a new event
- `GET /api/reports/download` - Download event reports (PDF/Excel)
- `GET /api/admin/*` - Admin-specific routes (e.g., user management)

For detailed API documentation, refer to the backend code or use tools like Postman to explore the endpoints.

## Usage

1. **Sign Up/Login**: Create an account or log in. New users may require admin approval.
2. **View Calendar**: Use Month, Week, Year, or Agenda views to browse events.
3. **Add Events**: Click "Add an event" to create new events with details.
4. **Manage Events**: Admins can access the admin panel for user and event management.
5. **Download Reports**: Generate and download reports for events in specified date ranges.
6. **Mobile Access**: The app is responsive and works on mobile devices with touch-friendly controls.

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test thoroughly.
4. Submit a pull request with a clear description of your changes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or support, please contact the development team or open an issue in the repository.
