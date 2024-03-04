import express from 'express';
import cors from 'cors';
import routes from './routes/index.route';
import { handleError } from './middleware/error.middleware';
import sessionConfig from './config/session.config';
import session from 'express-session';
import corsConfig from './config/cors.config';

// express app
const app = express();

// cors
app.use(cors(corsConfig));

// body parser
app.use(express.json());
// url encoding
app.use(express.urlencoded({ extended: true }));
// session
app.use(session(sessionConfig));

// custom middleware should go here

// routes
app.use(routes);

app.use(handleError);

export default app;
