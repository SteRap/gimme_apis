let apis;

export default class APIsDAO {
	static async injectDB(conn) {
		if (apis) {
			return;
		}
		try {
			apis = await conn.db(process.env.API_NS).collection("apis");
		} catch (e) {
			console.error(`Unable to establish a collection handle in APIsDAO: ${e}`);
		}
	}

	static async getAPIs({ filters = null, page = 0, apisPerPage = 20 } = {}) {
		let query;
		if (filters) {
			if ("API" in filters) {
				query = { API: { $eq: filters["API"] } };
			} else if ("Auth" in filters) {
				query = { Auth: { $eq: filters["Auth"] } };
			} else if ("Category" in filters) {
				query = { Category: { $eq: filters["Category"] } };
			}
		}

		let cursor;

		try {
			cursor = await apis.find(query);
		} catch (e) {
			console.error(`Unable to issue find command, ${e}`);
			return { apisList: [], totalNumApis: 0 };
		}

		const displayCursor = cursor.limit(apisPerPage).skip(apisPerPage * page);

		try {
			const apisList = await displayCursor.toArray();
			const totalNumApis = await apis.countDocuments(query);

			return { apisList, totalNumApis };
		} catch (e) {
			console.error(
				`Unable to convert cursor to array or problem counting documents, ${e}`
			);
			return { apisList: [], totalNumApis: 0 };
		}
	}

	static async getCategories() {
		let categories = [];
		try {
			categories = await apis.distinct("Category");
			return categories;
		} catch (e) {
			console.error(`Unable to get categories, ${e}`);
			return categories;
		}
	}

	static async getNames() {
		let names = [];
		try {
			names = await apis.distinct("API");
			return names;
		} catch (e) {
			console.error(`Unable to get APIs names, ${e}`);
			return names;
		}
	}
}
