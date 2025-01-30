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

##  Report Table (User Reports)
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

## Soft Delete System
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


#API Endpoints

##1. Authentication

POST /api/auth/login

Description: Authenticate user and provide a JWT token.

Request:

{
  "username": "string",
  "password": "string"
}

Response:

{
  "token": "string"
}

Authorization: None

2. Destinations

GET /api/destinations

Description: Retrieve a list of popular destinations.

Request Parameters: None

Response:

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

Authorization: Bearer Token

GET /api/destinations/{id}

Description: Retrieve details about a specific destination.

Request Parameters:

Path Parameter: id (integer)

Response:

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

Authorization: Bearer Token

3. Itineraries

POST /api/itineraries

Description: Create a new itinerary for a user.

Request:

{
  "user_id": 1,
  "destination_id": 1,
  "activities": ["Visit Hagia Sophia", "Explore the Grand Bazaar"]
}

Response:

{
  "id": 101,
  "user_id": 1,
  "destination_id": 1,
  "activities": ["Visit Hagia Sophia", "Explore the Grand Bazaar"]
}

Authorization: Bearer Token

4. User Reviews

POST /api/reviews

Description: Submit a review for a destination.

Request:

{
  "user_id": 1,
  "destination_id": 1,
  "rating": 5,
  "comment": "Amazing experience at Hagia Sophia!"
}

Response:

{
  "review_id": 301,
  "user_id": 1,
  "destination_id": 1,
  "rating": 5,
  "comment": "Amazing experience at Hagia Sophia!"
}

Authorization: Bearer Token

GET /api/reviews/{destination_id}

Description: Retrieve reviews for a specific destination.

Request Parameters:

Path Parameter: destination_id (integer)

Response:

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

Authorization: Bearer Token

Request/Response Formats

Content Type: All requests and responses use application/json.

Error Handling

400: Bad Request

401: Unauthorized

404: Not Found

500: Internal Server Error

Error Response Example:

{
  "error": "Invalid credentials"
}

Authorization Requirements

Authentication: JWT-based Bearer Token

Endpoints requiring authorization: All endpoints except /api/auth/login require a valid token in the Authorization header.

Authorization Header Format

Authorization: Bearer <token>



