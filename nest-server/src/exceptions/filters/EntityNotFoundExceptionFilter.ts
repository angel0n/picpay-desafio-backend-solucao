import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Response } from "express";
import { EntityNotFoundError } from "typeorm";

@Catch(EntityNotFoundError)
export class EntitynotFoundExceptionFilter implements ExceptionFilter{
    catch(exception: EntityNotFoundError, host: ArgumentsHost) {
        const context = host.switchToHttp();
        const response = context.getResponse<Response>()
        return response.status(404).json({
            message: exception.message,
            error: "NotFound",
            statusCode: 404
        })
    }

}