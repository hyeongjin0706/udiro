import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.render('./culture/culture_place.ejs');
});

router.get('/:place_num', (req, res) => {
  res.render('./culture/place.ejs');
});

// router.get('/:fac_name', placeController.getPlaceByFac_name);

// // POST
// router.post('/', placeController.CreatePlace);

// // PUT
// router.put('/:place_NUM', placeController.UpdatePlace);

// // DELETE
// router.delete('/:place_NUM', placeController.deletePlace);

export default router;
