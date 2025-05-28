# Demoblaze E-Commerce Automation

This project automates tests for the Demoblaze e-commerce website using [Playwright](https://playwright.dev/).

## Prerequisites

 [Node.js](https://nodejs.org/en) (version 16 or higher)
 Git
 [Visual Studio Code](https://code.visualstudio.com/) (recommended)

## Setup Instructions

1. Clone the Repository

   Open a command prompt and navigate to the folder where you want to create the project. For example:

   cd C:\temp
   

   Clone the repository:

   
   git clone https://github.com/kshwetainit/demoblaze
   

2. Open in VSCode

   Launch Visual Studio Code and open the cloned project folder:

   
   C:\temp\demoblaze
   

3. Install Dependencies

   Open a new terminal in VSCode and navigate to the project directory:

   
   cd demoblaze
   

   Then run the following commands:

   
   npm init playwright@latest
   npm install --save-dev @playwright/test
   

4. Run Tests

    To run all tests:

     
     npx playwright test tests
     

    To run a specific test, for example the cart test:

     
     npx playwright test tests/cart.test.ts
     

5. View Test Report

   After test execution, you can view the HTML report:

   
   npx playwright show-report

