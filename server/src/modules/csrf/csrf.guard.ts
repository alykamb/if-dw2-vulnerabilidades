import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { Observable } from 'rxjs'

@Injectable()
export class CsrfGuard implements CanActivate {
    public canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request: FastifyRequest = context.switchToHttp().getRequest()
        return (
            request.cookies['csrf_token'] &&
            request.headers['x-csrf-token'] &&
            request.cookies['csrf_token'] === request.headers['x-csrf-token']
        )
    }
}
