# IQBike Documentation


Če želite dokumentacijo prebrati v **slovenščini**, je na voljo na [povezavi](docs/sl/README.md).


# IQBike

IQBike addresses the issue of providing real-time information about the availability of bike rental stations and helps users plan the most efficient routes. This README file provides an overview of the app, its features, and detailed instructions on how to set up and use the application.

## Table of Contents

- [Solution Goals](#solution-goals)
- [Target Users](#target-users)
- [Features](#features)
  - [Bike Rental and Return](#bike-rental-and-return)
  - [Subscription Options and Online Payment](#subscription-options-and-online-payment)
  - [Multilingual Support and Dark/Light Mode](#multilingual-support-and-darklight-mode)
  - [Easy Bike Rental via QR Code](#easy-bike-rental-via-qr-code)
  - [Route Planning Considering Occupancy](#route-planning-considering-occupancy)
- [App Prototype](#app-prototype)
- [Wireframes](#wireframes)
- [User-Flow Diagram](#user-flow-diagram)
- [App Structure and Operation](#app-structure-and-operation)
- [App Installation](#app-installation)
  - [Installation Instructions](#installation-instructions)
  - [Project Setup](#project-setup)
  - [Payment Server Setup](#payment-server-setup)
- [Using the App](#using-the-app)
  - [Station Overview](#station-overview)
  - [Registration](#registration)
  - [Login](#login)
  - [Profile](#profile)
  - [Bike Rental](#bike-rental)
  - [Bike Return](#bike-return)
  - [Rating and Feedback](#rating-and-feedback)
  - [Subscription](#subscription)
  - [Prediction](#prediction)
  - [Dark/Light Mode](#darklight-mode)
  - [Language Change](#language-change)
  - [Logout](#logout)

## Solution Goals

The goal of our proposed solution, IQBike, is to provide users with real-time information about bike rental station occupancy and enable them to plan the most efficient routes. This aims to resolve issues users currently face with renting or returning bikes, such as unavailability or overcrowded stations. Our solution stands out from existing mobile apps by not only facilitating bike rental and return but also predicting bike and station availability in the future.

## Target Users

- Cyclists
- Various institutions (municipalities, other bike-sharing systems, etc.)

## Features

### Bike Rental and Return

The bike rental and return functionality via the app provides a modern and convenient way of mobility in urban environments. This innovative approach allows users to easily rent bikes, promoting a sustainable means of transportation and reducing environmental impact.

### Subscription Options and Online Payment

Choosing between subscription options and online payment enables users to tailor their biking experience to their preferences. Create your unique biking story and get ready to explore the city in the way that suits you best.

### Multilingual Support and Dark/Light Mode

The app is available in Slovenian and English, making it easy for foreigners to use and understand. We've also added a dark/light mode feature.

### Easy Bike Rental via QR Code

Users can easily and quickly rent a bike at a station using a QR code, without the need for additional inputs or explanations.

### Route Planning Considering Occupancy

Using advanced regression models, the app predicts the occupancy of stations in the near future. It shows users three possible routes considering bike and station availability based on the weather, enabling better route planning.

## App Prototype

App prototypes are available at [this link](https://github.com/gorenjak/IQBike/blob/main/docs/Prototipi%20aplikacije.pdf).

## Wireframes

Prepared wireframes are available at [this link](https://github.com/gorenjak/IQBike/blob/main/docs/%C5%BDi%C4%8Dni%20digrami.pdf).

## User-Flow Diagram

The user-flow diagram illustrating the operation of our app is available at [this link](https://github.com/gorenjak/IQBike/blob/main/docs/User%20Flow%20Diagram.pdf).

## App Structure

![](https://github.com/gorenjak/IQBike/blob/main/docs/App-Structure.png)

## App Installation

### Installation Instructions

Mobile app prerequisites to be met before starting setup:
- Installed `Node.js`.
- Installed `Expo CLI`.
- Installed `Git`.
- Installed `Yarn`.
- Access to the `GitHub repository` and cloned project.

### Project Setup

1. **Navigate to the IQBike Folder**
    - Open the command line (terminal) on your computer.
    - Go to the IQBike folder where you cloned the repository: 
        ```sh
        cd path/to/project_folder/IQBike
        ```

2. **Install the Expo CLI Library**
    - Use the command `npm install -g expo-cli` to install the Expo CLI library if you haven't already.
    - Then run `yarn install` to install all necessary dependencies.

3. **Run the Project**
    - Use the command `npx expo` to run the project.
    - The Expo Developer Tools will open in the terminal, giving you the option to run the app on a physical device (via QR code) or on an Android/iOS emulator.

4. **Testing on Device or Emulator**
    - For testing on a physical device:
        * Install the Expo Go app on your device (from the app store).
        * Scan the QR code from the Expo Developer Tools terminal to run the app on your device.

    - For testing on an emulator:
        * Follow the instructions provided in the Expo Developer Tools terminal to run on an Android or iOS emulator.

### Payment Server Setup

1. **Navigate to the IQBike/mobile/server Folder**
    - Open the command line (terminal) on your computer.
    - Go to the IQBike/mobile/server folder where you cloned the repository: 
        ```sh
        cd path/to/project_folder/IQBike/mobile/server
        ```

2. **Install Libraries**
    - Use the command `npm install` to install all necessary dependencies.

3. **Run the Server**
    - Use the command `nodemon server.js` to run the server. Then you can use the app seamlessly.

## Using the App

### Station Overview

- The map shows bike stations and their current occupancy.
- Clicking on green markers provides more information about the station and a list of bikes at the station.
- Bike rental is available only to logged-in users with an active subscription.

### Registration

If you don't have an account, you can create a new one:

- On the home page, click the top right icon for direct login/registration or the top left icon for the menu, where there's a Login tab.
- Select the "Register" option.
- Follow the simple steps to create your account.

### Login

If you already have an account, log in with your credentials:

- On the home page, click the top right icon for direct login/registration or the top left icon for the menu, where there's a Login tab.
- Enter your credentials and log in.
- If you've forgotten your password, you can select the "Forgot Password?" option to enter your email address and reset your password.

### Profile

On the home page, click the top right icon or the top left icon for the menu, where there's a Profile tab.

In your profile, you have the following options:
- View your information (name and email address).
- Details about your subscriptions, payments, and past rides.
- Access the data protection policy and legal notice of our app.
- Delete your profile if you choose to do so.

### Bike Rental

- On the home screen, you'll see a map with bike rental stations.
- Use the zoom function to locate stations near you.
- If you have an active subscription, you have two options to rent bikes:
    1. Select the station where you want to rent a bike:
        - Choose a bike and click the Rent button.
        - A window will appear where you need to confirm the rental.
        - Once the rental is successful, you can use the bike.
    2. Use the "Unlock Bike" button at the bottom of the map:
        - Scan the code on the bike with your phone's camera.
        - A window will appear where you need to confirm the rental.
        - Once the rental is successful, you can use the bike.

### Bike Return

- When you finish cycling, ride to the nearest IQBike station.
- Lock the bike back at the station and follow the app instructions to complete the rental.

### Rating and Feedback

- After completing the rental, you have the option to rate your bike.
- Select the stars and rate the bike from 1-5.

### Subscription

- On the home page, click the top left icon for the menu.
- Select the "Subscription" tab.
- On this page, you'll find information about different subscription types:
    * Annual subscription
    * Weekly subscription
- Swipe left or right to read more about each subscription.
- Once you decide which subscription suits you best, simply click the "Choose" button.
- If you're logged in and don't yet have an active subscription, follow these steps:
    * After selecting the desired subscription, a frame will appear.
    * Enter your bank details and postal code for payment in the frame.
    * After a successful payment, you'll have an active subscription, allowing you to rent bikes without worries and enjoy cycling adventures.

### Prediction

- On the home page, click the top left icon for the menu.
- Select the "Prediction" tab.
- On this page, the user enters the starting and ending stations, as well as the date and time of the ride.
- Click the "Show Routes" button.
- The prediction model will calculate three routes that are the best according to the data:
    * The first route contains the starting and ending station based on the best prediction, and the last one based on the worst prediction.

### Dark/Light Mode

- On the home page, click the top right icon for the menu.
- At the bottom of the menu, you have a toggle for "Dark/Light Mode."
- Select the desired mode: 
    1. "Dark Mode" for a darker appearance or 
    2. "Light Mode" for a lighter appearance.

### Language Change

- On the home page, click the top right icon for the menu.
- At the bottom of the menu, you have a toggle for "Language."
- Select the desired language:
    1. Slovenian
    2. English

### Logout

- On the home page, click the top right icon for the menu.
- Select the "Logout" option.
- Your session will be securely terminated, and you will be logged out of your account.