import { Injectable } from '@nestjs/common'
import * as bcrypt from 'bcrypt'

export const usuarios = [
    {
        id: 0,
        username: 'usuario1',
        password: '$2b$12$uRBFJKZpr4b1eT64XqfxPeiq6dtSZ7vmQa2HSdpkPoCc5uc.mdE0a', //teste123
    },
    {
        id: 1,
        username: 'usuario2',
        password: '$2b$12$uRBFJKZpr4b1eT64XqfxPeiq6dtSZ7vmQa2HSdpkPoCc5uc.mdE0a', //teste123
    },
    {
        id: 2,
        username: 'malvadao',
        password: '$2b$12$uRBFJKZpr4b1eT64XqfxPeiq6dtSZ7vmQa2HSdpkPoCc5uc.mdE0a', //teste123
    },
]

@Injectable()
export class AuthService {
    public async validateUser(username: string, password: string): Promise<any> {
        const usuario = usuarios.find((usuario) => usuario.username === username)
        if (usuario) {
            const passwordMatch = await bcrypt.compare(password, usuario.password)

            if (passwordMatch) {
                return usuario
            }
        }
        return null
    }
}
