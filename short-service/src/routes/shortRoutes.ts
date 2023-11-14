
import { Router, Request, Response } from 'express';
import { Business } from '../bussines/business';

export class RoutesShort {

    public routes: Router;
    private business: Business;

    constructor(business: Business) {        
        this.routes = Router();  
        this.business = business;      
        this.mapEndpoint();        
    }

    mapEndpoint(): void {

        this.routes.get('/v1/short/:url', async (req: Request, res: Response) => {
            res.send(await this.business.get(req));
        });

        this.routes.post('/v1/short', async (req: Request, res: Response) => {
            res.send(await this.business.post(req));
        })


    }
}