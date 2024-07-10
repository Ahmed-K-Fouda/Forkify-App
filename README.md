# Recipe Display Project

## Overview

This project is a dynamic recipe display application that fetches data from an external API. The application is built following the Object-Oriented Programming (OOP) paradigm, ensuring modularity, reusability, and maintainability. The user interface is organized using the Model-View-Controller (MVC) design pattern, with each view encapsulated in its respective file within the `views` directory. This structure allows for a clear separation of concerns and enhances the scalability of the application.

## Features

- **Dynamic Data Fetching**: Utilizes an external API to fetch the latest recipes, ensuring the displayed content is always up-to-date.
- **Object-Oriented Design**: Classes and objects are used extensively to encapsulate data and behavior, promoting code reusability and clarity.
- **Modular Views**: Each view (e.g., Recipe View, Search View, Results View) is contained in its own file, making the application easy to navigate and maintain.
- **Responsive Design**: The application is designed to be responsive, providing a seamless experience across different devices and screen sizes.
- **User Interactions**: Users can search for recipes, view detailed information, and navigate through different recipe options.

## Project Structure

- **src/**: Contains the source code for the application.
  - **js/**: JavaScript files, including models, views, and controllers.
    - **models/**: Contains the data models.
    - **views/**: Contains the view files for different UI components.
    - **controllers/**: Contains the controllers that handle the logic between models and views.
  - **sass/**: SASS files for styling the application.
  - **index.html**: The main HTML file.

## Technologies Used

- **JavaScript**: The core programming language used for the application logic.
- **SASS**: Used for styling, providing modular and maintainable CSS.
- **HTML**: Markup language for structuring the web pages.
- **API Integration**: Fetches recipe data from an external API.
