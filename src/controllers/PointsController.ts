import { Request, Response } from 'express';

import knex from '../database/connections'

class PointsController {
    async create(request: Request, response: Response) {

        try {
            const {
                name,
                email,
                whatsapp,
                longitude,
                latitude,
                uf,
                city,
                wash,
            } = request.body;

            const trx = await knex.transaction();

            const point = {
                image: "image-fake",
                name,
                email,
                whatsapp,
                longitude,
                latitude,
                uf,
                city,
            }

            const ids = await trx('points').insert(point)

            const point_id = ids[0];

            const pointWash = wash.map((wash_id: Number) => {
                return {
                    wash_id,
                    point_id,
                }
            })

            await trx('points_wash').insert(pointWash)

            await trx.commit();

            return response.json({
                id: point_id,
                ...point,
            })

        } catch (error) {
            response.json({
                error: true,
                message: error.message
            })
        }
    }
}

export default PointsController;