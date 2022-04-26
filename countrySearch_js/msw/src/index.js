import { setupWorker } from 'msw';
import handlers from './api.js';

const worker = setupWorker(...handlers);

worker.start({
	serviceWorker: {
		url: "/countrySearch_js/mockServiceWorker.js"
	}
});