import { Request, Response, NextFunction } from 'express';

export const midLogger = (req: Request, res: Response, next: NextFunction) => {
    const dt = new Date();
    console.log(
        {
            moment: dt.toLocaleDateString() + ' ' + dt.toLocaleTimeString(),
            endpoint: req.originalUrl,
            host: req.headers['host'],            
        }
    );
    next();
};