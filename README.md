
# Demoblaze E-Commerce Automation

This project automates tests for the Demoblaze e-commerce website using [Playwright](https://playwright.dev/).

##  Prerequisites

* [Node.js](https://nodejs.org/en) (version 16 or higher)
* Git
* [Visual Studio Code](https://code.visualstudio.com/) (recommended)

##  Setup Instructions

1. **Clone the Repository**

   Open Command Prompt and navigate to the folder where you want to create the project. For example:

   **`cd C:\temp`**

   Then clone the repository:

   **`git clone https://github.com/kshwetainit/demoblaze`**

   This will clone the project to `C:\temp\demoblaze`.

2. **Open in VSCode**

   Launch Visual Studio Code and open the folder:

   **`C:\temp\demoblaze`**

3. **Install Dependencies**

   Open a new terminal in VSCode and run the following:

   **`cd demoblaze`**

   Then install Playwright and the test runner:

   **`npm init playwright@latest`**
   **`npm install --save-dev @playwright/test`**

4. **Run All Tests**

   **`npx playwright test tests`**

5. **Run a Specific Test**

   For example, to run the cart test:

   **`npx playwright test tests/cart.test.ts`**

6. **View Test Report**

   After running tests, view the HTML report with:

   **`npx playwright show-report`**

