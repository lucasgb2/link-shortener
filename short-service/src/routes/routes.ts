import { ShortBussines } from './../bussines/shortBusiness';
import { apiServer } from '../enviroment/component/apiserverComponent';
import { midLogger } from '../middleware/midLogger';
import { RoutesShort } from './shortRoutes';


export const initRoutes = () => {

    /**
     * Middleware de logger
     */
    if (Boolean(process.env.API_ACTIVE_LOG) == true) {
        apiServer.expressApp.use(midLogger);
    }

    /**
     * Publicando rotas para serem acessíveis
     */
    apiServer.expressApp.use(new RoutesShort(new ShortBussines()).routes);    

};



