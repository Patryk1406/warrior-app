import * as express from 'express';
import 'express-async-errors';
import {engine} from 'express-handlebars';
import {helpers} from "./utils/helpers";
import * as methodOverride from 'method-override';
import {homeRouter} from "./routes/home";
import {warriorsRouter} from "./routes/warriors.router";
import {hallOfGloryRouter} from "./routes/hall-of-glory.router";
import {arenaRouter} from "./routes/arena.router";
import {errorHandler} from "./utils/error";
import './database/db';

const app = express();

app.engine('.hbs', engine({
    extname: '.hbs',
    helpers: helpers,
}));
app.set('view engine', '.hbs');

app.use(express.static('./public'));
app.use(express.urlencoded({
    extended: false,
}));
app.use(methodOverride('_method'));

app.use('', homeRouter);
app.use('/warriors', warriorsRouter);
app.use('/hall-of-glory', hallOfGloryRouter);
app.use('/arena', arenaRouter);

app.use(errorHandler);

app.listen(3000, '127.0.0.1', () => {
    console.log('The app is listening on http://localhost:3000');
});
