Author: Timothy Kuelker
Date:   April 20, 2020
Course: CMPSCI 4011


Within Insomnia or Postman: the methods GET, POST, PATCH, & DELETE are delcared to show
which endpoints are part of which method.  The BASEURL is added to the beginning
of each command below.  For ones where a JSON body is required for a post, I provided an example. The example
shows all possible fields that post may contain.


EXAMPLE FOR INSOMNIA:
(METHOD) URL

GET http://localhost:3000/v1/allPosts

DELETE http://localhost:3000/v2/posts/1



version1 (This version gets all info from a resting API):
BASEURL (3000 may change depending on the port selected in index.js):
    http://localhost:3000/v1
    GET:
        /allPosts
            -> Returns all posts for all users.
        
        /allPosts/<username>
            -> Returns all posts for a specific user, by using their username.

        /posts/<postid>
            -> Returns a specific post by its ID number.

        /profile/<username>
            -> Returns a specific user's profile data
 


version2 (This version gets all info from a local Mongo DB):
BASEURL (3000 may change depending on the port selected in index.js):
    http://localhost:3000/v2
    
    GET:
        /allPosts
            -> Returns all posts for all users.
        
        /allPosts/<username>
            -> Returns all posts for a specific user, by using their username.

        /posts/<postid>
            -> Returns a specific post by its ID number.

        /profile/<username>
            -> Returns a specific user's profile data

    POST:
        /posts
            -> creates a new post for a specific user
                -> Here is an example of what to put into the JSON Body, where userId is the ID of the user who is posting
                {
                    "userId": 1,
                    "id": 1,
                    "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
                    "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
                }

        /users
            -> creates a new user profile (added this so that i could have a user in the DB)
            -> Here is an example of what to put into the JSON Body
            {
                "id": "5",
                "name": "Leanne Graham",
                "username": "Bret",
                "email": "Sincere@april.biz",
                "phone": "1-770-736-8031 x56442",
                "website": "hildegard.org",
	            "company": {
                    "name": "Romaguera-Crona",
                    "catchPhrase": "Multi-layered client-server neural-net",
                    "bs": "harness real-time e-markets"
                }
            }

    PATCH:
        /posts/<id>
            -> Updates a specific post using the id field within the post itself.  Not the _id field.
                -> Example of what to put into the JSON Body.
                {
                    "title": "HELLO",
                }

    DELETE:
         /posts/<postid>
            -> Removes a particular post based off of the postid