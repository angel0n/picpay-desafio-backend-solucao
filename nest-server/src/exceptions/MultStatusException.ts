export class MultStatusException implements Error{
    name: string;
    message: string;
    stack?: string | undefined;
    cause?: unknown;
    status: { status: Status[] }

    constructor(sts: { status: Status[] }){
        this.status = sts;
    }
}

type Status = {
    operacao: string,
    status: number,
    response: any
}