# GachaSimServer

This is the **server-side** repository for the Gacha Simulation project   
It works together with the [GachaSim client](https://github.com/ponlawat30109/GachaSim) to provide a complete backend/frontend experience.

## Purpose
This repo contains the backend logic, APIs, and data handling for the Gacha system.  
It should be deployed separately and configured to communicate with the client application.

## Deployment & Configuration
After deploying the server (e.g., to a cloud platform or VPS), make sure to:

- Edit config.js to match your environment. This includes updating the database connection settings like host, user, password, and database name
- **Don't forget to edit `config.js`** to match your deployment settings (e.g., database URI, allowed origins, etc.)
- **The database is located in the `/database` folder** — make sure to deploy and configure it properly before starting the server
- Make sure your MySQL server is running and the gacha_game database is created before starting the app.
- Ensure the deployed server is publicly accessible
- Update the client-side configuration to point to the correct server URL

## Related Repository
- **Client-side repo**: [GachaSim](https://github.com/ponlawat30109/GachaSim)
