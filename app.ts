import * as express from 'express';
import {engine} from 'express-handlebars';
import {helpers} from "./utils/helpers";
import * as methodOverride from 'method-override';
import {homeRouter} from "./routes/home";
import {warriorsRouter} from "./routes/warriorsRouter";
import {hallOfGloryRouter} from "./routes/hallOfGloryRouter";
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
}))
app.use(methodOverride());

app.use('', homeRouter);
app.use('/warriors', warriorsRouter)
app.use('/hall-of-glory', hallOfGloryRouter)


app.listen(3000, '127.0.0.1', () => {
    console.log('The app is listening on http://localhost:3000');
})
