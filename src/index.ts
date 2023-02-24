import 'express-async-errors'
import express from 'express'
import { AppDataSourse } from './data-source'
import { errorMiddleware } from './middlewares/error'
import routes from './router'

AppDataSourse.initialize().then(async () => {
	const app = express()

	app.use(express.json())

	app.use(await routes())

	app.use(errorMiddleware)
	return app.listen(process.env.PORT, function () {
        console.log(`listening on port ${process.env.PORT}!`);
      })
})