import express from 'express';
import placeRouter from './culture/place.js';
import mainRouter from './culture/main.js';
import festaRouter from './culture/festa.js';

const router = express.Router();

router.use('/main', mainRouter);

router.use('/festa', festaRouter);

router.use('/place', placeRouter);

export default router;
