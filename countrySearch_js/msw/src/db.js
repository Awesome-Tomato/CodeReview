import datas from './datas';

class Db {
	constructor() {
		this.datas = datas;
	}

	getAllCountry() {
		return this.datas;
	}
}

const db = new Db();
export default db;