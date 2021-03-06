# Safe 2 School

## QR Student Tracker

For Youngstown State University's Software Engineering Course (CSCI 5801), our project idea is to create a system for tracking students' pick-up and drop-off times on their busing routes. The plan is to give children QR codes that they cannot easily lose (e.g., sewn into their backpacks) that the bus drivers can scan on their phones using our Progressive Web App (PWA). We will allow drivers and school staff to log in to make record of who last saw the child. This could also be extended to school, daycare, or extracurricular staff so that there is confirmation by an adult that the children were not only safely dropped off, but also received by an authority figure. School administrators would have an admin login on the website to ensure that all students were received and their whereabouts accounted for.

## The Team

**Project Manager:** Ryan Lalchand

**Programming Engineers:** Alyssa Guglielmetti, Caroline Snyder, Dylan Straley, Nicole Zimmerman

**Testing Engineers:** Alyssa Guglielmetti, Caroline Snyder

**Customer Service Representatives:** Robert Malizia, Nicole Zimmerman

## Acknowledgements

Dr. Feng Yu for the project idea

[This QR Code Generator](https://www.npmjs.com/package/qrcode)

[This QR Code Scanner](https://www.npmjs.com/package/jsqr)

## Setup

Clone the repo to your own machine

You'll need to install [MongoDB Community Server](https://www.mongodb.com/try/download/community) and [Node.js LTS Version: 16.13.1](https://nodejs.org/en/download/) on your machine

Open the terminal and navigate to the directory where you cloned the repo

Run `npm i` to install dependencies

Run `node src/config/dbTest.js` to initialize some basic users

Run `node app.js` to start the server

Navigate to https://localhost:3000 in the browser to log in with an admin username & password from the `src/config/dbTest.js` file
