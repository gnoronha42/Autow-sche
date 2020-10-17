import { Request, Response } from 'express';

import knex from '../database/connections'

class PointsController {
    async create(request: Request, response: Response) {
        try {

            //pega todas as variaves do corpo da requisicao 
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

            //cria uma transacao no BD para caso algo der erro na gravacao
            const trx = await knex.transaction();

            //grava todas as variaveis do corpo da requisicao em um OBJETO 
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

            //pega todos os IDS da insercao feita no BD com todas as variaves de POINTS
            const insertedIds = await trx('points').insert(point)

            //cria uma variavel que armavena o id da Gravacao
            const point_id = insertedIds[0];

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