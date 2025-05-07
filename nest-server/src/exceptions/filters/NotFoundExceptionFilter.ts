import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { NotFoundException } from "../NotFoundException";
import { Response } from "express";

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    catch(exception: NotFoundException, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>()
        return response.status(404).json({
            message: exception.message,
            error: "NotFound",
            statusCode: 404
        })
    }
}