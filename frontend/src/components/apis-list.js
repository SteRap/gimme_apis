import React, { useState, useEffect, useContext } from "react";
import APIDataService from "../services/apis";
import PaginationComp from "./pagination";
import { Context } from "../Context";

function ApiList() {
	const [apis, setApis] = useState([]);
	const [searchName, setSearchName] = useState("");
	const [searchCategory, setSearchCategory] = useState("");
	const [page, setPage] = useState(0);
	const [total, setTotal] = useState(0);
	const { current, setCurrent } = useContext(Context);
	const [categories, setCategories] = useState(["All Categories"]);
	console.log(searchCategory);
	useEffect(() => {
		retrieveAPIs();
		retrieveCategories();
	}, []);

	useEffect(() => {
		if (searchCategory === "All Categories") {
			retrieveAPIs();
		} else {
			findByCategory();
		}
	}, [searchCategory]);

	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	const onChangeSearchCategory = (e) => {
		const searchCategory = e.target.value;
		setSearchCategory(searchCategory);
	};

	const retrieveAPIs = () => {
		APIDataService.getAll()
			.then((response) => {
				setApis(response.data.apis);
				setTotal(response.data.total_results);
				setCurrent(1);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const retrieveCategories = () => {
		APIDataService.getCategory()
			.then((response) => {
				setCategories(["All Categories"].concat(response.data));
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const refreshList = () => {
		retrieveAPIs();
		setSearchCategory("All Categories");
	};

	const find = (query, by) => {
		APIDataService.find(query, by)
			.then((response) => {
				setApis(response.data.apis);
				setPage(0);
				setTotal(response.data.total_results);
				setCurrent(1);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const changePage = (page) => {
		APIDataService.getAll(page)
			.then((response) => {
				setApis(response.data.apis);
			})
			.catch((e) => {
				console.log(e);
			});
	};
	const changePageByCategory = (page) => {
		APIDataService.find(`${searchCategory}`, "Category", page)
			.then((response) => {
				setApis(response.data.apis);
			})
			.catch((e) => {
				console.log(e);
			});
	};

	const findByName = () => {
		find(searchName, "API");
	};

	const findByCategory = () => {
		if (searchCategory === "All Category") {
			refreshList();
		} else {
			find(searchCategory, "Category");
		}
	};

	return (
		<div className="container-fluid mt-5 mb-5">
			<div className="row justify-content-center mx-0">
				<div className="row pb-1 ">
					<div className="d-flex flex-column flex-md-row gap-2 px-0">
						<div className="input-group mx-0">
							<input
								type="text"
								className="form-control"
								placeholder="Search by Name"
								value={searchName}
								onChange={onChangeSearchName}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={findByName}
								>
									Search
								</button>
							</div>
						</div>

						<select
							className="form-select"
							onChange={onChangeSearchCategory}
							value={searchCategory}
						>
							{categories.map((category) => {
								return (
									<option key={category} value={category}>
										{category}
									</option>
								);
							})}
						</select>

						<div className="input-group d-flex justify-content-end  ">
							<button
								className="btn btn-outline-primary align-self-center"
								disabled={
									searchCategory === "All Categories" && searchName.length === 0
										? true
										: false
								}
								type="button"
								onClick={refreshList}
							>
								Refresh
							</button>
						</div>
					</div>

					<div className="card mt-4">
						<div className="card-body p-0">
							<PaginationComp
								total={total}
								page={page}
								changePage={(page) => {
									searchCategory.length === 0 ||
									searchCategory === "All Categories"
										? changePage(page)
										: changePageByCategory(page);
								}}
							/>
							<div className="row d-flex justify-content-center gap-3 gap-md-4  px-2">
								{apis.map((data, index) => {
									return (
										<div
											className="card"
											style={{ width: "30em" }}
											key={data.id}
										>
											<div className="card-body">
												<h5 className="card-title">{data.API}</h5>
												<h6 className="card-subtitle mb-2 ">
													<span>Author: </span>
													{data.Auth ? (
														data.Auth
													) : (
														<span className="font-italic text-muted">
															unknown
														</span>
													)}
												</h6>
												<p className="card-text">{data.Description}</p>
												<h6 className="btn btn-outline-secondary btn-sm">
													{data.Category}
												</h6>
												<p>
													<a
														href={`${data.Link}`}
														target="_blank"
														rel="noreferrer"
														className="card-link"
													>
														{data.Link}
													</a>
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</div>
						<PaginationComp
							total={total}
							page={page}
							changePage={(page) => changePage(page)}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ApiList;
