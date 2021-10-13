import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'

import { JWT_COOKIE } from './modules/auth/jwt.constants'
import { JwtAuthGuard } from './modules/auth/jwt.guard'
import { CsrfGuard } from './modules/csrf/csrf.guard'
import { CRSF_PROTECTION } from './vulnerabilidadades.constants'

@Controller()
export class AppController {
    constructor(private jwtService: JwtService) {}

    @UseGuards(AuthGuard('local'))
    @Post('api/v1/login')
    public async apiLogin(@Req() req: Request & { user: any }, @Res() res: Response): Promise<any> {
        const tokenPayload = { id: req.user.id, username: req.user.username }
        const signedJwt = this.jwtService.sign(tokenPayload)

        const expires = new Date()
        expires.setDate(expires.getDate() + 1)

        res.cookie(JWT_COOKIE, signedJwt, {
            expires,
            path: '/',
            httpOnly: true,
            // sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        }).send(true)
    }

    @UseGuards(JwtAuthGuard, ...(CRSF_PROTECTION ? [CsrfGuard] : []))
    @Get('api/v1/me')
    public async getCurrentUser(@Req() req: Request & { user: any }): Promise<any> {
        delete req.user.password
        return req.user
    }
}
