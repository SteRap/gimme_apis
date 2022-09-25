import APIsDAO from "../dao/apisDAO.js";

export default class APIsController {
	static async apiGetAPIs(req, res, next) {
		const APIsPerPage = req.query.APIsPerPage
			? parseInt(req.query.APIsPerPage, 10)
			: 20;
		const page = req.query.page ? parseInt(req.query.page, 10) : 0;

		let filters = {};
		if (req.query.Category) {
			filters.Category = req.query.Category;
		} else if (req.query.Auth) {
			filters.Auth = req.query.Auth;
		} else if (req.query.API) {
			filters.API = req.query.API;
		}

		const { apisList, totalNumApis } = await APIsDAO.getAPIs({
			filters,
			page,
			APIsPerPage,
		});

		let response = {
			apis: apisList,
			page: page,
			filters: filters,
			entries_per_page: APIsPerPage,
			total_results: totalNumApis,
		};
		res.json(response);
	}

	static async apiGetAPIsCategories(req, res, next) {
		try {
			let categories = await APIsDAO.getCategories();
			res.json(categories);
		} catch (e) {
			console.log(`api, ${e}`);
			res.status(500).json({ error: e });
		}
	}
}
