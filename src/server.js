import './db/db.js'
import express from 'express';
import handlebars from 'express-handlebars';
import cartsRouter from './routes/router-cart.js';
import viewsRouter from './routes/router-views.js';
import productsRouter from './routes/router-prod.js';
import { daoProd } from './services/service-prod.js'; 
import { __dirname } from './path.js';
import { Server } from 'socket.io';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const http = app.listen(port, () => {
    try {
        console.log(`Listening on port ${port}`);
    } catch (err) {
        res.status(400).json({ message: err.message })
        console.log(err)
    }
})

const io = new Server(http)

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use('/products', productsRouter)
app.use('/carts', cartsRouter)
app.use('/views', viewsRouter)

io.on('connection', async (socket) => {
    console.log('User connected to socket (ID: ', socket.id, ')');
    socket.on('disconnect', () => {
        console.log('User disconnected from socket (ID:', socket.id, ')');
    })
    socket.on('message', (message) => {
        console.log(message)
    })
    socket.emit('productsArray', await daoProd.getProducts());
    socket.on('newProduct', async (prod) => {
        await daoProd.addProduct(prod);
        const arrayUpdate = await daoProd.getProducts();
        socket.emit('arrayUpdate', arrayUpdate);
        socket.on('update', (update) => {
            console.log(update);
        })
    })
})
