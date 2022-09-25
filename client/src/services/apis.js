import http from "../http-common";

class APIDataService {
	getAll(page = 0) {
		return http.get(`?page=${page}`);
	}

	find(query, by, page = 0) {
		return http.get(`?${by}=${query}&page=${page}`);
	}

	findCategory(query, by, page = 0) {
		return http.get(`?${by}=${query}&page=${page}`);
	}

	getCategory(id) {
		return http.get(`/categories`);
	}
}

export default new APIDataService();
