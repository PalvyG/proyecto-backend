import './passport/passport-local.js';
import './passport/passport-github.js';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import productsRouter from './routes/router-prod.js';
import cartsRouter from './routes/router-cart.js';
import usersRouter from './routes/router-user.js';
import viewsRouter from './routes/router-views.js';
import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';
import { Server } from 'socket.io';
import 'dotenv/config'
import factory from './persistence/daos/factory.js';
const { daoProd } = factory

const app = express();
const port = process.env.PORT;

const sessionConfig = {
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 30000 },
    store: new MongoStore({
        mongoUrl: process.env.MONGODB_URL,
        ttl: 30
    }),
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});
app.use(cookieParser())
app.use(passport.initialize());
app.use(passport.session(sessionConfig));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/views', viewsRouter)
app.use('/u', usersRouter)

const http = app.listen(port, () => {
    try {
        console.log(`Listening on port ${port}`);
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

const io = new Server(http)

io.on('connection', async (socket) => {
    const productsGet = await daoProd.getProducts(1, 15);
    const productsGetArray = productsGet.docs
    socket.emit('productsArray', productsGetArray);
    socket.on('newProduct', async (prod) => {
        await daoProd.addProduct(prod);
        const arrayUpdate = await daoProd.getProducts();
        socket.emit('arrayUpdate', arrayUpdate);
    })
})
