import express from 'express';
import { AppDataSourse } from './data-source';
import { errorMiddleware } from './middlewares/error'
import routes from './router';

AppDataSourse.initialize().then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes)

	app.use(errorMiddleware)

    app.get('/', (req, res) => {
        return res.json('health-check');
    })

    return app.listen(process.env.PORT);

})