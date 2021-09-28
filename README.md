# Inu

A fullstack instagram clone. https://redditclone-seven.vercel.app/

# The heroku server is forced to sleep from 12am - 6 am. Please refresh the page if facing a 504 gateway error.

(Unfortunately it currently does not work on mobile browser)

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
