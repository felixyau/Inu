# Inu

A fullstack instagram clone. https://redditclone-seven.vercel.app/

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
