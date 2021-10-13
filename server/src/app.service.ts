import { Injectable } from '@nestjs/common'
import { FastifyReply } from 'fastify'
import { createReadStream, statSync } from 'fs'
import { readFile } from 'fs/promises'
import { lookup } from 'mime-types'
import { extname, join, resolve } from 'path'

import { CRSF_PROTECTION } from './vulnerabilidadades.constants'

@Injectable()
export class AppService {
    public sendStaticFile(requestedFile: string, res: FastifyReply, folder = ''): void {
        let clientDist = resolve(__dirname, '..', '..', 'client', folder)
        let fileName = requestedFile
        const ext = extname(fileName)

        // if it's not a file, send the index and let the spa handle the route (or 404)
        if (!ext.length) {
            fileName = 'index.html'
        }

        const type = lookup(extname(fileName))
        const path = join(clientDist, fileName)

        if (fileName === 'index.html') {
            clientDist = resolve(__dirname, '..', '..', 'client')
            void res.header('Content-Type', type)

            if (!CRSF_PROTECTION) {
                void res.send(createReadStream(path))
                return
            }

            void readFile(path)
                .then((file) => file.toString('utf-8'))
                .then((file) => {
                    const token = 'código gerado aleatóriamente'
                    const endOfHeadIndex = file.indexOf('</head>')
                    const f =
                        file.substring(0, endOfHeadIndex) +
                        `<meta name="csrf_token" content="${token}">` +
                        file.substring(endOfHeadIndex)

                    void res.setCookie('csrf_token', token, {
                        sameSite: 'strict',
                        httpOnly: true,
                    })

                    return res.send(f)
                })
            return
        }

        try {
            statSync(path)
        } catch (err) {
            void res.status(404).send()
            return
        }
        void res.header('Content-Type', type)
        void res.send(createReadStream(path))
    }

    public async getFile(requestedFile: string, res: FastifyReply): Promise<void> {
        if (process.env.NODE_ENV === 'production') {
            return this.sendStaticFile(requestedFile, res, 'dist')
        }
        return this.sendStaticFile(requestedFile, res)
    }
}
