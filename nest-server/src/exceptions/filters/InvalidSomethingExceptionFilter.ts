import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { InvalidSomethingException } from "../InvalidSomethingException";
import { Response } from "express";

@Catch(InvalidSomethingException)
export class InvalidSomethingExceptionFilter implements ExceptionFilter {
    catch(exception: InvalidSomethingException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>()
        return response.status(422).json({
            message: exception.message,
            error: "InvalidSomething",
            statusCode: 422
        })
    }
}