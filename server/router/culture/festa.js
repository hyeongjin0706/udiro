import express from 'express';
import * as festaController from '../../controller/culture/festa.js';
import { or } from 'sequelize';

const router = express.Router();

// GET
router.get('/', festaController.getFestas);

// GET
// num
router.get('/num/:festa_NUM', festaController.getFesta);

// title
router.get('/title/:title', festaController.getFestaTitle);

// guname
router.get('/guname/:guname', festaController.getFestaGuname);

// POST
router.post('/', festaController.CreateFesta);

// PUT
router.put('/num/:festa_NUM', festaController.updateFesta);

// DELETE
router.delete('/num:festa_NUM', festaController.deleteFesta);

export default router;
