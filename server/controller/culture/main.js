import * as festaRepository from '../../data/culture/festa.js';
import * as placeRepository from '../../data/culture/place.js';

export async function search(req, res) {
  const { category, filter, input } = req.body;

  try {
    const results = await searchByGuname(category, filter, input);
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while searching.' });
  }
}
