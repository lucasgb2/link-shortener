import dotenv from 'dotenv';
dotenv.config();

import { initRoutes } from './routes/routes';
import { InstanceEnv } from './enviroment/instance';

const initializeApp = async () => {
    await InstanceEnv.getIntance().initializeComponents();
    initRoutes();
    
}


initializeApp();

