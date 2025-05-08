import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";import { Response } from "express";
import { MultStatusException } from "../MultStatusException";

@Catch(MultStatusException)
export class MultStatusExceptionFilter implements ExceptionFilter {
    catch(exception: MultStatusException , host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>()
        return response.status(207).json({
            message: exception.status,
            error: "MultStatus",
            statusCode: 207
        })
    }
}