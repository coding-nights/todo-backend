import RouteInitializer from "./src/routes/apiRoutes.js";
import dotenv from 'dotenv';
import App from './app.js';
import pool from "./src/db/dbConnectionInitializer.js";

dotenv.config();


const routeInitializer = new RouteInitializer(App, pool);
routeInitializer.initControllers();
routeInitializer.initRoutes();

const start = async () => {
    try {
        await App.listen(3000)
        // app.log.info(`server listening on ${app.server.address().port}`)
    } catch (err) {
        App.log.error(err)
        process.exit(1)
    }
}
start();