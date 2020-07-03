import express, { request, response } from 'express';
import PointsController from './controllers/PointsController';
import ItensController from './controllers/ItensController';
import multer from 'multer';
import multerConfig from './config/multer';
import { celebrate, Joi } from 'celebrate';

const routes = express.Router();

const upload = multer(multerConfig);

const pointsController = new PointsController();
const itensController = new ItensController();

routes.get('/itens', itensController.index);

//No insomnia para enviar arquivo binários como uma imagem tem que mudar de
//Json para multpart form
routes.post(
    '/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            itens: Joi.string().required(),
        })
    }, {
        abortEarly: false
    }),
    pointsController.create
);
    
routes.get('/points/:id', pointsController.show);
routes.get('/points', pointsController.index);

export default routes;