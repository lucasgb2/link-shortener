interface IMessageNotify {
    code: number,
    msg : string
}

export class MessageNotify {

    static msgServerRunning: IMessageNotify = { code: 100, msg: 'Server running on port '};

    static msgServerTerminate: IMessageNotify = { code: 101, msg: 'Server received signal to terminate '};

    static msgServerTerminated: IMessageNotify = { code: 101, msg: 'Server close gracefully :) '};
    
    static msgNotExistsPragmaHeader: IMessageNotify = {code: 110, msg: 'Não foi identificado o Pragma Header'};
    
    static msgErrorRequest(error: string | Error | unknown): IMessageNotify{
        if (error instanceof String) {
            return {code: 10, msg: 'Falha na requisição: '+error};
        }else if (error instanceof Error){
            return {code: 10, msg: 'Falha na requisição: '+error.message};
        }else{
            return {code: 10, msg: 'Falha na requisição: Não identificado'};
        }        
    }
}

