import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.render("./culture/culture_place.ejs");
});


router.get('/:place_NUM', (req, res) => {
    res.render("./culture/place.ejs");
});
// // GET
// router.get('/:place_NUM', placeController.getPlace);

// router.get('/:fac_name', placeController.getPlaceByFac_name);

// // POST
// router.post('/', placeController.CreatePlace);

// // PUT
// router.put('/:place_NUM', placeController.UpdatePlace);

// // DELETE
// router.delete('/:place_NUM', placeController.deletePlace);

export default router;