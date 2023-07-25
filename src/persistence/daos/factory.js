import { DaoMDBProduct } from './mdb/dao-mdb-prod.js'
import { DaoMDBUser } from './mdb/dao-mdb-user.js'
import { DaoMDBCart } from './mdb/dao-mdb-cart.js'
import { DaoFSProduct } from './fs/dao-fs-prod.js'
import { DaoFSCart } from './fs/dao-fs-cart.js'
import { initMDB } from './connection-mdb.js'
import 'dotenv/config'

let daoProd;
let daoCart;
let daoUser;

const persistence = process.env.PERSISTENCE

switch (persistence) {
    case 'fs':
        daoProd = new DaoFSProduct()
        daoCart = new DaoFSCart()
        break;
    case 'mdb':
        await initMDB()
        daoProd = new DaoMDBProduct()
        daoCart = new DaoMDBCart()
        daoUser = new DaoMDBUser()
        break;
    default:
        await initMDB()
        daoProd = new DaoMDBProduct()
        daoCart = new DaoMDBCart()
        daoUser = new DaoMDBUser()
        break;
}

export default { daoProd, daoCart, daoUser }