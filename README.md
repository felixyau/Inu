# Inu

The heroku server is forced to sleep 6 hours a day. Please refresh the page if you face a 504 gateway error. Unfortunately, it does not work on mobile broswer currently.

If you don't want to register, just login with this account: <br/>
&nbsp; username: admin <br/>
&nbsp; password: admin

A fullstack instagram clone. https://redditclone-seven.vercel.app/

I did this project to see the big picture of web developement. In the frontend, I used React for creating simple instagram actions like creating post, send comments and thumbs up, Nextjs for routing and Chakra UI to simulate the UI of instagram.  In the backend I have used Nodejs with typeorm to fetch data from Postgresql database. And used typegraphql and graphql to create the api. 

Installation

After you cloned the project, 
Run the server
  - cd server
  - npm dev/ yarn dev
  
 Run migrations
   - yarn run:migration
  
Run the website
  - cd web
  - npm dev/ yarn dev

To reload the server without restarting during development, and compile the typescript files to javascript run
  - yarn watch

To start a local redis server through WSL
  - service redis-server restart
