import { rest } from 'msw';
import db from './db';
import { baseUrl } from './utils';

const searchCountry = rest.get(baseUrl`/search`, (req, res, ctx) => {
	let keyword = req.url.searchParams.get('keyword') || '';
	keyword = keyword.trim().toLowerCase();
	if(!keyword.length) return res(ctx.json([]));

	return res(
		ctx.delay(),
		ctx.json(
			db
				.getAllCountry()
				.filter(country => country.toLowerCase().includes(keyword))
		)
	);
});

export default [
	searchCountry,
];