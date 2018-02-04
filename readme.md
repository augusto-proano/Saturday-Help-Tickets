npm init
npm i body-parser morgan nodemon express sequelize pg --save
json - set up start
post-man:
body - raw - json(application/json)

____________
Requirements: Create MD File
(Utilize Volleyball)
app.js

List of requirements

Express - Using models and routes
Defining Models

*Run npm test and start working through 1)models tests, then 2) routes test* 
_______

Student Model:
First Name
-String
-Do not allow Null value
Last Name
-String
-Do not allow Null value
Email
-String
-Do not allow Null value
-Validate data is in fact email
Hook
-Before validate, capitalize first letter in first name and last name values

Instance Methods:
getTests
-Finds all tests associated with particular student
getInitials
-Returns students initials

_______

Test Model:
subject
-String
-Do not allow Null value
grade
-String
-Do not allow Null value

Class Methods:
passing
-Returns all tests with grade above 70
findByType
-Returns all tests for a particular subject

_______

Student Routes:
W-Get all students, send back instance of students along with status of 200
W-update a student
W-delete student,
_______

Test Routes:
W-Get all tests, send back instance of students along with status of 200
W-Get all tests with passing grades, send back status 200 along with instances of passing tests
W-Get all tests in a particular subject
W-Get test by id, set status as 201 and return instance of test
W-Post a new test, use route indicating the id of the student that took the test, create new test and associate / place the studentId on the table with the tst
W-Delete test

