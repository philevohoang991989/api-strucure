import express, {Request, Response} from "express"
import {admin} from "./src/api/routes/admin"
import {customer} from "./src/api/routes/customer"
import {createConnection} from "typeorm";
import cookieParser from "cookie-parser";

createConnection().then(connection => {
    const app = express();
    const cors = require('cors');
    app.use(express.json());
    app.use(cookieParser());
    admin(app);
    customer(app)
    app.listen(8000,()=>{
        console.log('listening to port 8000')
    })
    app.use(cors({
        origin: ['localhost:3000/api/']
    }))
});