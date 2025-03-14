# YouGuide-Capstone

YouGuide
This project aims to create a map application where users can search for locations, get optimized routes, and save custom markers for better exploration and planning.
Core Features:
1.	Search Functionality:
Users can search for locations, addresses, or points of interest.
2.	Interactive Map:
A dynamic map where users can zoom, pan, and explore areas visually using Geolocation API 
3.	Custom Markers:
Users can create and save custom markers on the map, with labels and notes for specific locations.
4.	Route Navigation:
Provides optimized routes for driving, walking, or cycling, including travel times and distances.
5.	Mobile Responsiveness:
A design that works seamlessly across desktop and mobile devices.
6.	Dark Mode:
A design for the night times.(Maybe)
User Based:
•	I want it to be used  search for specific locations to plan my trips effectively.
•	Goingt to add  save and label custom locations for quick access in the future.
•	I want an app that works smoothly on both my phone and desktop.(React Native in the future)
Technical Stack:
•	Frontend: React.js for the user interface, Tailwind CSS or Bootstrap for styling, React Router for navigation.
•	Map Integration: Geolocation API for map rendering, search, and route calculations.
https://developers.google.com/maps/documentation/geolocation/overview
•	Version Control: GitHub for tracking progress and incremental updates.
Optional Features:
1.	Offline Access: Allow users to download map sections for offline use.
2.	Geofencing Notifications: Notify users when entering or exiting predefined areas.
3.	Map Customization: Provide different themes like dark mode, satellite view, or terrain view.
Next Steps:
1.	 Implement the search functionality for locations and points of interest. (Trip advisor)
2.	Add features to allow users to save and manage custom markers.
3.	Test the app on different devices and iterate based on feedback.
4.	Document all sources, APIs, and progress in the README file.
5.	Turning the Project to a mobile app with React Native also .

# YouGuide Database Schema ,ER Diagram and CRUD Operations
## 1. DATABASE SCHEMA
##  User Table
Stores user information. Users can save favorite locations and add custom markers to the map.

| Field           | Type               | Description                |
|-----------------|--------------------|----------------------------|
| id              | UUID (Primary Key) | Unique user identifier     |
| email           | String (Unique)    | User email                 |
| password        | String             | Hashed password            |
| name            | String             | Full name                  |
| role            | ENUM("user", "admin") | Defines privileges      |
| profile_picture | String (Optional)  | Profile image URL          |
| created_at      | Timestamp          | Account creation date      |
| updated_at      | Timestamp          | Last profile update        |

---

## Custom Marker Table
Stores user-created location markers with optional descriptions.

| Field       | Type               | Description                    |
|-------------|--------------------|--------------------------------|
| id          | UUID (Primary Key) | Unique marker identifier      |
| user_id     | UUID (Foreign Key → User) | Associated user ID      |
| location_name | String           | Custom marker title           |
| latitude    | Float              | Latitude of the marker        |
| longitude   | Float              | Longitude of the marker       |
| description | Text               | Notes about the location      |
| created_at  | Timestamp          | Marker creation date          |

---

##  Route History Table 
Stores route searches and history for users.

| Field          | Type               | Description                |
|----------------|--------------------|----------------------------|
| id             | UUID (Primary Key) | Unique route identifier    |
| user_id        | UUID (Foreign Key → User) | Associated user ID    |
| start_location | JSON               | Starting point coordinates |
| end_location   | JSON               | Destination coordinates    |
| route_type     | ENUM("walking", "driving", "cycling") | Travel mode |
| created_at     | Timestamp          | Route creation date        |

---

##  Favorites Table
Allows users to save favorite locations for quick access.

| Field      | Type               | Description                   |
|------------|--------------------|-------------------------------|
| id         | UUID (Primary Key) | Unique favorite ID            |
| user_id    | UUID (Foreign Key → User) | User who favorited the location |
| marker_id  | UUID (Foreign Key → Custom Marker) | Favorited marker |
| created_at | Timestamp          | Date favorited                |

---

##  Messaging Table (Future Feature)
Enables user-to-user communication for community suggestions or collaboration.

| Field       | Type               | Description                 |
|-------------|--------------------|-----------------------------|
| id          | UUID (Primary Key) | Unique message ID           |
| sender_id   | UUID (Foreign Key → User) | Sender's ID           |
| receiver_id | UUID (Foreign Key → User) | Receiver's ID         |
| content     | Text               | Message text                |
| is_deleted  | Boolean            | Soft delete flag            |
| created_at  | Timestamp          | Date sent                   |

---

##  Reports
Allows users to report incorrect or inappropriate markers.

| Field       | Type               | Description                 |
|-------------|--------------------|-----------------------------|
| id          | UUID (Primary Key) | Unique report ID            |
| reporter_id | UUID (Foreign Key → User) | User who reported    |
| marker_id   | UUID (Foreign Key → Custom Marker) | Reported marker |
| reason      | Text               | Report reason               |
| status      | ENUM("open", "under review", "resolved") | Status tracking |
| created_at  | Timestamp          | Date report submitted       |

---

## Soft Delete 
To ensure data integrity and maintain historical records, the platform will utilize soft delete for key tables:

- **Custom Marker Table:** `is_deleted` (Boolean) field will indicate inactive markers.
- **Messaging Table:** `is_deleted` (Boolean) field to handle message removals.

---

## Future Enhancements
- **WebSockets for Real-Time Chat:** Real-time communication between users for travel collaboration or local tips.
- **Geofencing Notifications:** Notify users when they enter predefined areas (like landmarks or saved markers).
- **Mobile App Support:** Extend functionality to a React Native app for cross-platform use.

## 2. ER Diagram
![YourGuide-ER Diagram](https://github.com/user-attachments/assets/8b93b29d-7ed8-4fb3-919a-10721f5e972d)
https://dbdiagram.io/d/679a8a1f263d6cf9a072ca69
## 3. Crud Operations
### Users

| Method | Endpoint       | Description                                |
|--------|----------------|--------------------------------------------|
| POST   | `/auth/register` | Register a new user                       |
| GET    | `/users/{id}`    | Retrieve user details                      |
| PUT    | `/users/{id}`    | Update profile details                     |
| PATCH  | `/users/{id}`    | Soft delete account (sets is_deleted=True) |

### Custom Markers

| Method | Endpoint              | Description                               |
|--------|-----------------------|-------------------------------------------|
| POST   | `/custom_markers`       | Add a new custom marker                   |
| GET    | `/custom_markers/{id}`  | Retrieve a specific custom marker         |
| GET    | `/custom_markers`       | Retrieve all custom markers               |
| PUT    | `/custom_markers/{id}`  | Edit details of a custom marker           |
| PATCH  | `/custom_markers/{id}`  | Soft delete a custom marker (sets is_deleted=True) |

### Favorites

| Method | Endpoint        | Description                          |
|--------|-----------------|--------------------------------------|
| POST   | `/favorites`      | Save a custom marker as a favorite   |
| GET    | `/favorites`      | Retrieve saved favorite markers      |
| DELETE | `/favorites/{id}` | Remove a saved favorite marker       |

### Route History

| Method | Endpoint              | Description                           |
|--------|-----------------------|---------------------------------------|
| POST   | `/route_history`        | Save a route search                   |
| GET    | `/route_history/{id}`   | Retrieve a specific route search      |
| GET    | `/route_history`        | Retrieve all route history            |

### Messaging

| Method | Endpoint                | Description                           |
|--------|-------------------------|---------------------------------------|
| POST   | `/messages`               | Send a message                        |
| GET    | `/messages/{id}`          | Retrieve a specific message           |
| GET    | `/messages`               | Retrieve all messages                |
| DELETE | `/messages/{id}`          | Delete a message                      |

### Reports

| Method | Endpoint              | Description                           |
|--------|-----------------------|---------------------------------------|
| POST   | `/reports`              | Report a custom marker                |
| GET    | `/reports`              | View reports                         |
| PUT    | `/reports/{id}`         | Change the status of a report         |
| DELETE | `/reports/{id}`         | Admin-only option to delete a report  |


# API Endpoints and Contract 

## 1. Authentication

### **POST /api/auth/login**
**Description:** Authenticate user and provide a JWT token.

#### Request:
```json
{
  "username": "string",
  "password": "string"
}
```

#### Response:
```json
{
  "token": "string"
}
```
**Authorization:** None

---

## 2. Destinations

### **GET /api/destinations**
**Description:** Retrieve a list of popular destinations.

#### Request Parameters:
None

#### Response:
```json
[
  {
    "id": 1,
    "name": "Istanbul",
    "country": "Turkey",
    "description": "Historical and cultural hub."
  },
  {
    "id": 2,
    "name": "Tokyo",
    "country": "Japan",
    "description": "Modern city with traditional roots."
  }
]
```
**Authorization:** Bearer Token

---

### **GET /api/destinations/{id}**
**Description:** Retrieve details about a specific destination.

#### Request Parameters:
- **Path Parameter:** `id` (integer)

#### Response:
```json
{
  "id": 1,
  "name": "Istanbul",
  "country": "Turkey",
  "description": "Historical and cultural hub.",
  "points_of_interest": [
    {
      "name": "Hagia Sophia",
      "type": "Historical Landmark"
    },
    {
      "name": "Grand Bazaar",
      "type": "Market"
    }
  ]
}
```
**Authorization:** Bearer Token

---

## 3. Itineraries

### **POST /api/itineraries**
**Description:** Create a new itinerary for a user.

#### Request:
```json
{
  "user_id": 1,
  "destination_id": 1,
  "activities": ["Visit Hagia Sophia", "Explore the Grand Bazaar"]
}
```

#### Response:
```json
{
  "id": 101,
  "user_id": 1,
  "destination_id": 1,
  "activities": ["Visit Hagia Sophia", "Explore the Grand Bazaar"]
}
```
**Authorization:** Bearer Token

---

## 4. User Reviews

### **POST /api/reviews**
**Description:** Submit a review for a destination.

#### Request:
```json
{
  "user_id": 1,
  "destination_id": 1,
  "rating": 5,
  "comment": "Amazing experience at Hagia Sophia!"
}
```

#### Response:
```json
{
  "review_id": 301,
  "user_id": 1,
  "destination_id": 1,
  "rating": 5,
  "comment": "Amazing experience at Hagia Sophia!"
}
```
**Authorization:** Bearer Token

---

### **GET /api/reviews/{destination_id}**
**Description:** Retrieve reviews for a specific destination.

#### Request Parameters:
- **Path Parameter:** `destination_id` (integer)

#### Response:
```json
[
  {
    "review_id": 301,
    "user_id": 1,
    "rating": 5,
    "comment": "Amazing experience at Hagia Sophia!"
  },
  {
    "review_id": 302,
    "user_id": 2,
    "rating": 4,
    "comment": "Lovely city with vibrant culture."
  }
]
```
**Authorization:** Bearer Token

---

## 5. Request/Response Formats
**Content Type:** All requests and responses use `application/json`.

### Error Handling
- **400:** Bad Request
- **401:** Unauthorized
- **404:** Not Found
- **500:** Internal Server Error

#### Error Response Example:
```json
{
  "error": "Invalid credentials"
}
```
API Endpoints
1. Authentication
POST /auth/login: Authenticate user and return JWT token.
2. Destinations
GET /api/destinations: Get a list of popular destinations.
GET /api/destinations/{id}: Get details of a specific destination.
3. Itineraries
POST /api/itineraries: Create an itinerary for a user.
4. User Reviews
POST /api/reviews: Submit a review for a destination.
GET /api/reviews/{destination_id}: Get reviews for a specific destination.
Features
Search Functionality: Search for locations, addresses, or points of interest.
Interactive Map: View and interact with maps using the Geolocation API.
Custom Markers: Create, label, and save custom markers on the map.
Route Navigation: Get optimized routes for walking, driving, and cycling.
Mobile Responsiveness: Works smoothly on both desktop and mobile devices.
Dark Mode: Toggle dark mode for better night-time usage (optional).
Technical Stack
Frontend
React.js: JavaScript library for building the user interface.
Tailwind CSS: Utility-first CSS framework for styling.
React Router: For navigation and routing.
Backend
Node.js: JavaScript runtime for building the backend.
Express.js: Web framework for building the API.
MongoDB: NoSQL database for storing user data, markers, routes, and more.
Map Integration
Geolocation API: For rendering the map and performing location-based queries.
Google Maps API: For optimized route calculations.
Version Control
GitHub: For version control and collaboration.
Database Schema
YouGuide uses a NoSQL database (MongoDB) to store data related to users, custom markers, route history, favorites, and more.

User Table: Stores user information, such as their email, name, and password.
Custom Marker Table: Stores user-created markers with associated metadata like location name, latitude, and longitude.
Route History Table: Saves previously searched routes with travel modes.
Favorites Table: Saves user-favorited locations for quick access.
ER Diagram
Click here to view the ER Diagram

API Endpoints
1. Authentication
POST /auth/login: Authenticate user and return JWT token.
2. Destinations
GET /api/destinations: Get a list of popular destinations.
GET /api/destinations/{id}: Get details of a specific destination.
3. Itineraries
POST /api/itineraries: Create an itinerary for a user.
4. User Reviews
POST /api/reviews: Submit a review for a destination.
GET /api/reviews/{destination_id}: Get reviews for a specific destination.
Setup Instructions
1. Frontend Setup
Navigate to the frontend directory:
bash
 
cd youguide-frontend
Install dependencies:
bash
 
npm install
Start the frontend server:
bash
 
npm run dev
The frontend will be available at http://localhost:5173.

2. Backend Setup
Navigate to the backend directory:
bash
 
cd youguide-backend
Install dependencies:
bash
 
npm install
Set up your environment variables: Create a .env file in the youguide-backend directory and include your MongoDB URI:
bash
 
MONGO_URI=your-mongodb-uri
PORT=5000
Start the backend server:
bash
 
npm run dev
The backend will be available at http://localhost:5000.

3. Deploying the Application
Frontend (YouGuide)
Build the frontend for production:
bash
 
npm run build
You can now deploy the built files to any hosting platform, such as Netlify, Vercel, or AWS S3.
Backend (YouGuide API)
Deploy the backend using a cloud platform like AWS, Heroku, or DigitalOcean.
For AWS EC2 Deployment:

Set up an EC2 instance and SSH into it.
Install Node.js, MongoDB (or use MongoDB Atlas for a managed database).
Transfer your files to the EC2 instance.
Start the Node.js app on EC2 and configure it to run in the background using tools like pm2.
4. Testing
Before deploying, it is important to test the functionality of both the frontend and backend.

Frontend Testing: Ensure all UI components are responsive and accessible on both mobile and desktop devices.
Backend Testing: Test all API endpoints using tools like Postman to ensure they work as expected.
5. Unit Tests
You can add unit tests for both the frontend and backend using testing frameworks like Jest or Mocha for JavaScript.

Known Issues
Offline Support: We currently do not support offline usage of the maps.
User Messaging: The messaging feature is planned for future versions.
Future Enhancements
Geofencing Notifications: Notify users when they enter or exit predefined areas like landmarks.
Mobile App: We plan to convert this web app to a mobile app using React Native for better portability across platforms.
Real-Time Collaboration: Introduce real-time collaboration for users to share itineraries or markers.

