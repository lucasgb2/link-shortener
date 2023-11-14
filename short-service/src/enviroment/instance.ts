import { RangeToken, SequenceTokenRepository } from "../repository/entities/tokenEntity";
import { DataBaseComponent } from "./component/databaseComponent";
import { TokenComponent } from "./component/tokenComponent";
import { apiServer } from "./component/apiserverComponent";


export class InstanceEnv {

    private static instanceEnv: InstanceEnv;
    public token: TokenComponent;

    public async initializeComponents(): Promise<void>{
        //initialize database connect
        await new DataBaseComponent().initialize();

        //initialize range token instance api
        this.token = await new TokenComponent();
        await this.token.initialize();       
        
        //initialize api
        await apiServer.initialize();
    }

    constructor() { };

    public static getIntance(): InstanceEnv {
        if (!this.instanceEnv) {
            this.instanceEnv = new InstanceEnv();
        }
        return InstanceEnv.instanceEnv
    }

}