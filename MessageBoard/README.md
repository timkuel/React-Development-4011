This application is a full-stack project that acts like a message board, allowing a user to practice crud operations with a mongoDB.  The back-end
was designed using express that interacts with the MongoDB, and the front-end using React to interact with the express server.  

To access the message board, at least on user needs to be registered in the system.  After registered, the user is transfered to a login page.  After
logging in, a Bearer Token is returnd to the user that allows them access to the message board.  From there, the user can do basic CRUD operations
on their own messages that are posted publically for all to see. 
