import { Request } from 'express';

export interface Business {

    get(request: Request): Promise<string>;
    post(request: Request): Promise<string>;
    
}