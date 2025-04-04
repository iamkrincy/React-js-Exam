React Js Practical Exam - Web
Hotel Management System Project Outline

Instruction/Text linked with this question

1. Project Setup

- Set up a new React project using Create React App.

- Install required dependencies: `react-router-dom`, `redux`, `react-redux`, `redux-thunk`, `@ Bootstrap i/core`, `json-server` for API, etc.



2. Component Structure

- Create the necessary components:

- RoomList

- RoomDetails

- ReservationForm

- ReservationList

- PrivateRoute

- Navbar

- Implement the basic component structure for the hotel management system.



3. Redux Setup (5 points)

- Set up the Redux store with actions, reducers, and thunks.

- Define actions for fetching room and reservation data, handling loading and errors.

- Implement thunks for asynchronous operations.



4. JSON Server Setup (5 points)

- Set up a JSON Server to act as a backend for storing room and reservation data.

- Create a `db.json` file to store initial data for rooms and reservations.

- Define routes for CRUD operations (e.g., `/rooms`, `/reservations`).

 

5. Fetching and Displaying Room Data (5 points)

- Implement the `fetchRooms` function in the RoomList component.

- Display rooms dynamically using the RoomDetails component.

- Connect the RoomList component to the Redux store to fetch room data.



6. Reservation Feature (5 points)

- Implement the `makeReservation` function in the ReservationForm component.

- Allow users to make reservations with details such as room selection, check-in, and check-out dates.

- Dispatch a Redux action and thunk to add the reservation to the server and store.



7. Displaying Reservations (5 points)

- Implement the `fetchReservations` function in the ReservationList component.

- Display reservations dynamically, including reservation details and room information.

- Connect the ReservationList component to the Redux store to fetch reservation data.



8. Updating and Canceling Reservations (5 points)

- Develop the `updateReservation` function in the ReservationList component to allow users to edit existing reservations.

- Implement the `cancelReservation` function to allow users to cancel reservations.

- Dispatch Redux actions and thunks to update and delete reservations on the server and in the store.



9. Sorting and Filtering (10 points)

- Implement sorting feature by room type or availability in the RoomList component.

- Implement filtering feature by room features or reservation status in the RoomList component.



10. User Authentication (5 points)

- Implement a simple user authentication mechanism.

- Allow users to sign in to manage room information and reservations.

- Restrict access to reservation-related operations based on user authentication status.



11. Navbar ()

- Create a Navbar component to provide navigation within the application.

- Include links to the room list, reservation form, reservation list, user profile, and a sign-out option (if applicable).

- Ensure the Navbar is responsive and visually appealing.

 

12. Bootstrap Styling (5 points)

- Utilize Bootstrap I components for a modern and clean UI.

- Apply styling and theming to enhance the overall look and feel of the application.

