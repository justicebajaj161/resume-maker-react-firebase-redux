Objective:
Develop a web application using React and Firebase for authentication and database management, where users can sign up, sign in, post their details, and view them in a resume format.
(Make using Redux , No useContext!)
Key Features and Requirements:

Navigation Bar (Navbar):

Class Name: .navbar
Before a user is signed in, the Navbar should contain two options:
"Sign Up" (Text case-insensitive)
"Sign In" (Text case-insensitive)
Before a user is signed in, the Navbar should NOT contain the following options:
"Details"
"Resume"
"Logout"
Routing and Page Access:

Root URL: 'http://localhost:3000'
Users should be redirected to /signin if they try to access the root URL without being authenticated.
Users should be able to visit the /signup and /signin pages without any authentication.
Users should be able to visit the /resume page.
Sign Up Page:

URL: /signup
Input Fields (All fields are mandatory):
First Name (input[name="firstName"])
Last Name (input[name="lastName"])
Email (input[name="email"])
Password (input[name="password"])
Date of Birth (input[name="dob"])
Gender (input[name="gender"])
Button:
"Submit" (case-insensitive)
Error Messages (Displayed as toast messages):
"Complete all fields" - if any of the mandatory fields are left blank.
"Password should be at least 6 characters" - if the password is shorter than 6 characters.
After a successful signup, users should be redirected to the /signin page.
Sign In Page:

URL: /signin
Input Fields:
Email (input[name="email"])
Password (input[name="password"])
Button:
"Submit" (case-insensitive)
Error Messages (Displayed as toast messages):
"Invalid email or password" - if the entered credentials are incorrect.
"Password should be at least 6 characters" - if the password is shorter than 6 characters.
After a successful login, users should be redirected to the root URL (/).
Details Page:

logout clears the localstorage and kicks the user out to the signin page  because of protected routes

Users can fill out their details which include:
Objective (textarea[name="objective"])
Experience (textarea[name="experience"])
Education (textarea[name="education"])
Skills (textarea[name="skills"])
Button to submit their details:
"Update" (case-insensitive)
Success Message (Displayed as toast message):
"Resume updated successfully"
All textareas should be filled before submission.
Resume Page:

URL: /resume
Display the details posted by the user in a resume format.
Additional Information:

All elements in the application should be visible and accessible based on the described specifications.
The application should handle different user flows, including error scenarios and edge cases.
Use Firebase for handling user authentication (SignUp and SignIn) and storing user details.
Expected Outcome:
At the end of this project, students should be able to develop a fully functional React web application integrated with Firebase. They should be proficient in creating React components, managing states, handling user inputs, implementing routing, and integrating with Firebase for authentication and data storage.


You can create a dummy firebase account , cause the project should be entirely working , and make sure to register an account before submmiting 
firstname : John
lastName : Doe
email : codingninjas@codingninjas.com
password : codingninjas

Apart from that when the user is not signed in , only signin and signup should be visible , once you are in the log out button , resume and details should be visible 
to ensure this you will have the tranfer state globally which requires Redux (do not use context in this project!!!)


use this      if (process.env.NODE_ENV === 'development') {
  window.store = store;
}

in your store.js , which will expose your store to the window , make sure auth and loading are in reducer as well .
example  reducer: {
    auth: authReducer,
    loading: loadingReducer,
  }



The project should be responsive , make sure to use a navbar toggler icon , with th class of .navbar-toggler. 


Please go through this sample video , and make it as similar as possible to pass the test cases .
link - https://files.codingninjas.in/resumemaker-30530.mkv









