import Task from './taskRoutes.js';
import Account from "./accountRoutes.js";

class RouteInitializer {
    constructor(app, pool) {
        this.app = app;
        this.pool = pool;
    }

    poolDecorator(controller) {
        return async (req, res) => {
            //console.log('inside clouser function');
            //console.log(req, res);
            const client = await this.pool.connect();
            try {
                console.log('Starting');
                const result = controller.apply(this, [client, req, res]);
                console.log('Finished');
                return result;
            } catch (e) {
                console.log("Error", e);
            }  finally {
                client.release();
            }
        }
    }

    initControllers() {
        const controllers = [
            Task.TaskController,
            Account.AccountController
        ];
        controllers.forEach((controller) => {
           controller.app = this.app;
        });
    }

    initRoutes() {
        const Routes = [
            Task.TaskRoutes,
            Account.AccountRoutes
        ];

        for ( let routeCollection of Routes ) {
            routeCollection.forEach((route, index) => {
                this.app[route.method.toLowerCase()](route.address, { schema: route.schema, allErrors: true, attachValidation: true }, this.poolDecorator(route.controller));
            });
        }

    }

}


export default RouteInitializer;