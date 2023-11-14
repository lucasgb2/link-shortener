import { AppDataSourceMongodb, AppDataSourceRedis, AppDataSourceSQLite } from '../../repository/dataSource';
import { Component } from './component';

export class DataBaseComponent implements Component {

    async initialize(): Promise<void> {
        await AppDataSourceSQLite.initialize().then(async () => {
            console.log('Conectado database: ' + AppDataSourceSQLite.options.database);
        }
        ).catch((error) => console.log('Erro conectar' + error));
       
        await AppDataSourceRedis.connect();        

        await AppDataSourceMongodb.initialize().then(async () => {
            console.log('Conectado database: ' + AppDataSourceMongodb.options.database);
        }
        ).catch((error) => console.log('Erro conectar' + error));
    }


}