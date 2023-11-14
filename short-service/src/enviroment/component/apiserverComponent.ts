import * as http from 'http';
import express  from 'express';
import { MessageNotify } from '../../util/util';
import { AppDataSourceSQLite } from '../../repository/dataSource';
import { Component } from './component';

class ApiServer implements Component {
    public expressApp: express.Application;   
    private serverListening: http.Server | undefined;

    async initialize(): Promise<void> {        
        this.serverListening = this.expressApp.listen(process.env.API_BACKEND_PORT, () => {
            console.log(MessageNotify.msgServerRunning.msg + process.env.API_BACKEND_PORT);
        });
    }

    downServer(){
        console.log(MessageNotify.msgServerTerminate.msg);
        if (this.serverListening != undefined){
            this.serverListening.close();
            console.log(MessageNotify.msgServerTerminated.msg);
            process.exit();
        }                
    }

    constructor(){        
        this.expressApp = express();
        this.expressApp.use(express.json());        
    }
}
export const apiServer = new ApiServer();

