import { setupWorker } from 'msw';
import handlers from './api.js';

const worker = setupWorker(...handlers);

worker.start({
  serviceWorker: {
    url:
      process.env.NODE_ENV === 'production'
        ? '/CodeReview/countrySearch_js/mockServiceWorker.js'
        : '/countrySearch_js/mockServiceWorker.js',
  },
});
