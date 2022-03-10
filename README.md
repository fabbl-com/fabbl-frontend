[![Netlify Status](https://api.netlify.com/api/v1/badges/773e8526-2882-49ef-b807-f9227e95e845/deploy-status)](https://app.netlify.com/sites/fabbl/deploys)

# [FABBL](https://fabbl.social/)
Built with the MERN stack (MongoDB, Express, React and NodeJS).
![image](https://user-images.githubusercontent.com/63586628/157425055-236ae97c-2ecc-40e6-8eb2-4e48f5dff988.png)

  * [Introduction](#introduction)
  * [Key Features](#key-features)
  * [Technologies used](#technologies-used)
      - [Frontend](#frontend)
      - [Backend](#backend)
      - [Database](#database)
  * [Configuration and Setup](#configuration-and-setup)
  * [Author](#author)
  * [License](#license)

## Introduction
Fabbl is an anonymous messaging app. With fabbl, get the fast,simple, secure messaging and connect with millions of people like you for free*, available on phones all over the world.

## Key Features

- [x] User Profile

* User profile allows you to view details such as profile pictures, birth-date, location, and various other things.
After this, you have an option to update your profile by integrating a brief description or tag.

- [x] Swipe
* In the beginning, the list of potential matches depends on the hobbies, gender and other basic details.
You can swipe right to like someone and left to reject someone.
- [x] Match
* A match is required for a user to start a chat. It happens only when both the users swipe right to each other.
- [x] Chat
* After finding a match, you can immediately start a real time private conversation with the other person by chatting.
  - e2e encription
  - emogi support
  - block/unblock
  - delete message
  - active/inactive status
  - message seen status
  - message timestamp
- [x] Make friends
* After chating you can send user a friend request. and accept other's request. you can also remove user from you friend list.
- [x] Notifications
* Real time notifiacation about like, match,block,unblock, and friend request.
- [x] Dark/Light theme
- [x] Security
* Email conformation for changing sensitive data.
   - change password
   - change email
   - forgot password
- [x] Multiple user registration.
- [x] Easy register and login
Login and register using google and facebook id.
- [x] Authentication using jsonwebtoken (jwt)
- [x] Fully responsive



## Technologies used
Fabbl was created using the following technologies.

#### Frontend

- React JS
- Redux (for managing and centralizing application state)
- React-router-dom (To handle routing)
- Axios (for making api calls)
- Material UI (for User Interface)
- Web Crypto API (used to encrypt/decrypt messages)

#### [Backend](https://github.com/fabbl-com/fabbl-backend)

- Express
- Mongoose
- bcryptjs (for password encryption)
- JWT (For authentication)
- Nodemailer (for sending invoice via email)
- Cloudinary (to allows users to upload their imaage)
- Socket.IO (for realtime, bi-directional communication between web clients and servers)

#### Database
MongoDB (MongoDB Atlas)

## Configuration and Setup
*Setup [backend](https://github.com/fabbl-com/fabbl-backend#configuration-and-setup) then continue.

### 1\. Clone this Repository

```
git clone https://github.com/fabbl-com/fabbl-frontend.git 
```

### 2\. Navigate to the directory

```
cd fabbl-frontend
```

### 3\. Install dependencies

```
npm install
```
### 4\. Create .env to root dir and add
``` 
REACT_APP_ENDPOINT=http://localhost:4000
```

### 5\. Run

```
npm start
```

### 6\. ✨ Enjoy


## Comment
We intend to keep adding more features to this application, so if you like it, please give it a star, that will encourage us to 
to keep improving the project.

## Author
- [Ichan Kabir](https://github.com/ikabir21)
- [Nandan Kumar](https://github.com/nandan-shah)

## License
- This project is MIT licensed.
