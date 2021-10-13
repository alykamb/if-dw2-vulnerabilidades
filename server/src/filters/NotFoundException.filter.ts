import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    NotFoundException,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

import { AppService } from '../app.service'

@Catch(NotFoundException)
export class NotFoundExceptionFilter implements ExceptionFilter {
    constructor(private appService: AppService) {}

    public async catch(_exception: HttpException, host: ArgumentsHost): Promise<void> {
        const ctx = host.switchToHttp()
        const res: FastifyReply = ctx.getResponse()
        const req: FastifyRequest = ctx.getRequest()

        if (req.url.indexOf('/api/') === 0) {
            return res.status(404).send()
        }

        const url = req.url.replace(/^\//, '')
        return this.appService.getFile(url || 'index.html', res)
    }
}
