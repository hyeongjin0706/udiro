import * as festaRepository from '../../data/culture/festa.js';
import * as placeRepository from '../../data/culture/place.js';

export async function getFestasandPlace(req, res) {
    const category = req.query.category;
    const purpose = req.query.purpose;
    const input = req.query.input;
    let data;

    if (category && purpose && input) {
        switch (category) {
            case 'all':
                switch (purpose) {
                    case 'guname':
                        data = await festaRepository.getSearchByguname(input);
                        data = await placeRepository.getSearchByguname(input);
                        break;

                    case 'title':
                        data = await festaRepository.getSearchByTitle(input);
                        data = await placeRepository.getSearchByTitle(input);
                        break;

                    case 'program':
                        data = await festaRepository.getSearchByprogram(input);
                        data = await placeRepository.getSearchByprogram(input);
                        break;

                    default:
                        break;
                }
                break;

            case 'festa':
                switch (purpose) {
                    case 'guname':
                        data = await festaRepository.getSearchByguname(input);
                        break;

                    case 'title':
                        data = await festaRepository.getSearchByTitle(input);
                        break;

                    case 'program':
                        data = await festaRepository.getSearchByprogram(input);
                        break;

                    default:
                        break;
                }
                break;

            case 'place':
                switch (purpose) {
                    case 'guname':
                        data = await placeRepository.getSearchByguname(input);
                        break;

                    case 'title':
                        data = await placeRepository.getSearchByTitle(input);
                        break;

                    case 'program':
                        data = await placeRepository.getSearchByprogram(input);
                        break;

                    default:
                        break;
                }
                break;

            default:
                break;
        }
    } else {
        data = await festaRepository.getAll();
        data = await placeRepository.getAll();
    }

    res.status(200).json(data);
}