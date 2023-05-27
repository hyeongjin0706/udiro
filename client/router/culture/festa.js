import express from 'express';
import * as festaController from '../../controller/culture/festa.js';
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
router.get('/', festaController.getFestas);

// GET
router.get('/:place_NUM', festaController.getFesta);

// 이름으로 찾는거 없어서 대충 넣어둠
router.get('/:fac_name', festaController.getFesta);

// POST
router.post('/', festaController.CreateFesta);

// PUT
router.put('/:place_NUM', festaController.updateFesta);

// DELETE
router.delete('/:place_NUM', festaController.deleteFesta);

export default router;