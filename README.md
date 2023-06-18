# Ludiq

Ludiq is a fun and entertaining website that allows users to add their hobbies and search for related posts. This README file provides detailed information about the development environment, project architecture, UX Design and the features of the site.

## Table of Contents

1. [Setting up the Development Environment](#setting-up-the-development-environment)
2. [Project Architecture](#project-architecture)
3. [UX Design](#ux-design)
4. [Website](#website)
5. [Website Features](#website-features)

## Setting up the Development Environment

To run the website, follow these steps:

1. Add the Ludiq folder to the htdocs directory of XAMPP.
2. Ensure that the front-end can retrieve images stored in the `assets/images` folder of the backend.
3. The website runs on the XAMPP server.
4. To change the database connection information, modify the password in the `Database.php` class located in the Backend folder.
5. The database used is named Ludiq.
6. The website has been tested with the versions:
	- PHP : 8.2.4 
	- phpMyAdmin : 5.2.1
	- Angular CLI: 16.0.3
	- Node: 18.15.0
	- Package Manager: npm 9.5.0
	- OS: win32 x64
	- Angular: 16.0.3
	- typescript : 5.0.4
7. To log in to the website, use the following credentials or create your own account:
	- Alan: jrL?.46E
	- Tegg: 3jXyG4%!
	- Sand: TyY*d@56
	- Tact: C%e_4eM3

## Project Architecture

The Ludiq project follows a structured architecture for both the front-end and back-end components.

### Front-End Architecture

The front-end architecture utilizes a classical structure to distribute tasks across different components:

- **Models**: Represents raw data retrieved from the backend.
- **Services**: Handles the communication between the models and the views (components).
- **Components**: Represents the visual elements of the website.

### Back-End Architecture

The back-end architecture follows a Data Transfer Object (DTO) structure, incorporating endpoints, DTO classes, and repositories.

- **DTO**: Data Transfer Objects are used to encapsulate data and transfer it between different layers of the application. DTOs provide a convenient way to exchange data between the backend and the front-end, ensuring a standardized format.
- **Endpoints**: Define the API routes and handle requests from the front-end. Endpoints interact with the repositories and use DTOs to send and receive data.
- **Repositories**: Handle the persistence and retrieval of data from the database. Repositories communicate with the endpoints, providing the necessary data through DTOs.

The use of DTOs in the backend architecture helps maintain a clear separation of concerns and ensures efficient data transfer between different layers of the application.

## UX Design

The user experience (UX) design of Ludiq has been carefully considered to provide an intuitive and visually appealing interface. 

- **Continuation from Hobby Share**: Ludiq is the next iteration of the Hobby Share website, developed during the WE4A course. In this version, we addressed several ergonomic issues to enhance the overall user experience.
- **Accessibility**: We have implemented the WCAG (Web Content Accessibility Guidelines) standards to ensure maximum accessibility for all types of users, including those with visual impairments or color blindness.
- **Network-like User Experience**: The UX design is inspired by social networks, with a static navigation bar that remains consistent regardless of the user's position on the website. This design choice aims to prevent users from getting easily disoriented and enhance their navigation experience.
- **Color Palette**: We have focused on using a maximum of four primary colors in our design: purple, red, dark purple, and green/cyan.
  - Purple elements represent general clickable elements throughout the site.
  - Red elements are related to hobbies and hobby-related content.
  - Green elements provide informational content to the user and are non-clickable.
- **Mockup Design**: Before development, mockups were created using Figma to visualize the potential appearance and layout of our website. Although unfinished due to time constraints, the mockup played a crucial role in ensuring the best possible ergonomic design. You can find the mockup at the following address: https://www.figma.com/proto/f3kviLuoy1rDOJY9vDQ6HK/WE4B_Project?page-id=0%3A1&type=design&node-id=1-2&viewport=-4790%2C1335%2C0.63&scaling=scale-down-width&starting-point-node-id=1%3A2.

## Website

Our website is called Ludiq, which is derived from the word "ludic," meaning "related to games." This name reflects the site's focus on offering fun and engaging training. In general, our website is centered around adding hobbies and posting related content to share our passions and participate in or organize activities related to various hobbies.

## Website Features

The website offers different functionalities for users:

### User Types

1. **Regular User**:
   - Can post content related to their hobbies.
   - Can specify their hobbies.
   - Can participate in activities.

2. **Activity Director** (includes all functionalities of a regular user):
   - Can add activities for other users to participate in.
   - Can create a new organization or be invited to an existing one.

3. **Organization**:
   - Represents a group of activity directors offering common activities.

### Key Features

- **Messaging**:
  - Users can send messages to their friends.
  - They can send friend requests to add new friends.
  - Friend requests appear in the messaging section.

- **Favorite Hobby**:
  - Users can add their favorite hobby to their profile.
  - They can modify it later.

- **Hobby Flashcards**:
  - Users can add their hobbies to their profile.
  - Hobbies are displayed as flashcards in the "Hobbies" section of their profile.

- **Sidebar**:
  - Shows the top 3 most popular hobbies.
  - Provides 3 hobby suggestions.

- **Activity Flashcards**:
  - Users can browse available activities in the "Activities" section of the site.
  - Displays the top 3 trending activities.
  - Clicking on an activity flashcard redirects users to the post's page for more information and to view comments.

- **Search Bar**:
  - Allows users to perform precise searches (users, posts, activities, hobbies).
  - Supports search combinations for relevant results.

- **Comments**:
  - Users can add comments to a post.
  - They can delete their own comments.
  - Users can view comments posted by other users.

- **Creating a Post**:
  - Users can create a new post related to their hobby.
  - Select the corresponding hobby.
  - Add up to a maximum of 4 images to the post.

- **Creating an Activity** (for activity directors only):
  - Activity directors can create new activities.
  - Fill in essential information such as title, date, etc.

- **Pride Month Logo**:
  - The website's logo changes based on the month.
  - In June, the logo incorporates LGBT colors to celebrate Pride Month.

- **Profile Editing**:
  - Users can modify their profile.
  - Add a profile picture, change the password, etc.

These features provide an interactive and enjoyable experience for Ludiq users, allowing them to share their passions, participate in hobby-related activities, and interact with other users.
