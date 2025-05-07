export class NotFoundException implements Error{
    name: string;
    message: string;
    stack?: string | undefined;
    cause?: unknown;

    constructor(msg: string){
        this.message = msg;
    }
}