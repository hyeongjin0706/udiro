import express from 'express';
import * as placeController from '../../controller/culture/place.js';
// import { body } from 'express-validator';
// import { validate } from "../middleware/validator.js";
// import { isAuth } from "../middleware/auth.js";
const router = express.Router();
// const validateCulture = [
//     body('culture_content')
//         .trim()
//         .isLength({min : 4})
//         .withMessage('text는 최소 4글자 이상 입력하세요!'),
//     validate
// ];

// GET
router.get('/', placeController.getPlaces);

// GET
router.get('/:place_NUM', placeController.getPlace);

router.get('/:fac_name', placeController.getPlaceByFac_name);

// POST
router.post('/', placeController.CreatePlace);

// PUT
router.put('/:place_NUM', placeController.UpdatePlace);

// DELETE
router.delete('/:place_NUM', placeController.deletePlace);

export default router;