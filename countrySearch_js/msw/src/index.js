import { setupWorker } from 'msw';
import handlers from './api.js';

const worker = setupWorker(...handlers);

worker.start({
	serviceWorker: {
		url: "/CodeReview/countrySearch_js/mockServiceWorker.js"
	}
});