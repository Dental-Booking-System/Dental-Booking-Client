# Dental Booking Client - React Native

The **Dental Booking Client** is a cross-platform mobile application built with **React Native** that streamlines appointment booking and dental clinic management. Patients can easily log in, browse dental profiles, and schedule appointments right from their mobile devices. 

For more information, visit the organization page: [Dental Booking System](https://github.com/Dental-Booking-System).

## Features

- **User Authentication**: Secure login for patients to access their profiles.
- **Browse Dental Profiles**: View detailed information about dentists and specialists.
- **Appointment Booking**: Schedule, manage, and cancel appointments directly in the app.
- **Appointment History**: Track past appointments and upcoming bookings.

## Tech Stack

- **Framework**: React Native
- **State Management**: Redux 
- **Authentication**: Google API with Firebase
- **API Communication**: Fetch API

## Getting Started

### Prerequisites  
Make sure you have the following installed:

- Node.js  
- npm or yarn  
- React Native CLI (for running on emulator or real device)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dental-Booking-System/Dental-Booking-Client.git
   cd Dental-Booking-Client
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   - Create a `.env` file in the root directory.
   - Add required API endpoints and Firebase configurations.

4. Start the development server:
   ```bash
   npm run android   # For Android
   npm run ios       # For iOS
   ```

## Backend Server

This app communicates with a **Spring Boot backend** for authentication, booking management, and MySQL data storage. [Visit Backend Repository](https://github.com/Dental-Booking-System/dental-booking-server).

## Contributors

- **Tony Vu** – [LinkedIn](https://linkedin.com/in/duyquocvu) | [GitHub](https://github.com/quocduyvu6262)
