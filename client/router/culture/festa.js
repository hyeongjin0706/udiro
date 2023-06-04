import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("./culture/culture_festa.ejs");
});
// // GET
// router.get('/', festaController.getFestas);

// // GET
// router.get('/:place_NUM', festaController.getFesta);

router.get('/:place_NUM', (req, res) => {
    res.render("./culture/festa.ejs");
});

// // 이름으로 찾는거 없어서 대충 넣어둠
// router.get('/:fac_name', festaController.getFesta);

// // POST
// router.post('/', festaController.CreateFesta);

// // PUT
// router.put('/:place_NUM', festaController.updateFesta);

// // DELETE
// router.delete('/:place_NUM', festaController.deleteFesta);

export default router;