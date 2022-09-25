import fetch from "node-fetch";

let apis;

// const data = async function GetAPIs() {
// 	const APIsList = await fetch("https://api.publicapis.org/entries");
// 	const response = await APIsList.json();

// 	return response.entries;
// };

export default class APIsDAO {
	static async injectDB(conn) {
		if (apis) {
			return;
		}
		try {
			apis = await conn.db(process.env.API_NS).collection("apis");
			// if (apis == undefined) {
			// 	try {
			// 		apis = await conn
			// 			.db(process.env.API_NS)
			// 			.collection("apis")
			// 			.insertMany(await data());
			// 		console.log("data inserted in database");
			// 	} catch (e) {
			// 		console.log(e);
			// 	}
			// }
		} catch (e) {
			console.error(
				`Unable to establish a collection handle in restaurantsDAO: ${e}`
			);
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
}
