# Playwright Automation


This is a playwright automation for the MRT application of [dumdum-thesis](https://github.com/dumdum-thesis).

The purpose of this template is to provide a consistent framework for building automated tests for the Authentication, Form Filling, and Navigation. The Playwright script is referenced to this link [MRT System](https://d-mrtfe.onrender.com/magallanes/in).
 


## Tests Summary

### ./tests/authentication.spec.ts

This file automates the login authentication by doing the tests for:

1. Positive Login Test Case
- Visibility and Filling Valid Credentials
- Visibility and Interaction with "Sign In/Login" Button
- Successful Login Verification
 
2. Negative Login Test Case
- Using Invalid Credentials
- Empty Fields Test
- Validation of Error Messages


### ./tests/navigation.spec.ts

This file automates the navigation of the web application by following the tasks:

- Navigation of each navigation links.
- Verification of URL.
- Visibility and error handling of non-existing link.
- Verification of text content within the navigation links.

### ./tests/inputs.spec.ts

This file automates the CRUD of stations in the MRT application. 

- Creates new station by filling up the input fields.
- Updates existing stations by changing the current data in the feilds to a new data.
- Deletes existing stations.