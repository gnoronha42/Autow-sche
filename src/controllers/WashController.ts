import {Request, Response } from 'express'

import knex from '../database/connections'


class WashController {
    async index(request: Request, response: Response) {
        const wash = await knex('wash').select('*');

        const serializedWash = wash.map((wash) => {
            return {
                id: wash.id,
                title: wash.title,
                image_url: `http://localhost:3333/uploads/${wash.image}`
            }
        })
        return response.json(serializedWash);

    };
}

export default WashController;