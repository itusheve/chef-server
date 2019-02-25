import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import {get} from 'lodash';
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        message: get(exception, ['message', 'error']),
        response: get(exception, ['response', 'error']),
      });
  }
}