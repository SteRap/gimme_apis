import React, { useState, useContext } from "react";
import Pagination from "https://cdn.skypack.dev/rc-pagination@3.1.15";
import { Context } from "../Context";
import { useMediaQuery } from "react-responsive";

function PaginationComp(props) {
	const [perPage, setPerPage] = useState(20);
	const [size, setSize] = useState(perPage);
	const { current, setCurrent } = useContext(Context);

	const isMobile = useMediaQuery({ query: "(max-width: 480px)" });
	const isTablet = useMediaQuery({ query: "(max-width: 760px)" });

	const PerPageChange = (value) => {
		setSize(value);
		const newPerPage = Math.ceil(props.total / value);
		if (props.current > newPerPage) {
			setCurrent(newPerPage);
		}
	};

	const PaginationChange = (page, pageSize) => {
		setCurrent(page);
		setSize(pageSize);
		props.changePage(page - 1);
	};

	const PrevNextArrow = (current, type, originalElement) => {
		if (type === "prev") {
			return (
				<button>
					<i className="fa fa-angle-double-left"></i>
				</button>
			);
		}
		if (type === "next") {
			return (
				<button>
					<i className="fa fa-angle-double-right"></i>
				</button>
			);
		}
		return originalElement;
	};
	return (
		<div className="table-filter-info d-flex justify-content-center ">
			{isMobile ? (
				<Pagination
					className="pagination-data"
					onChange={PaginationChange}
					current={current}
					pageSize={size}
					total={props.total}
					showSizeChanger={false}
					itemRender={PrevNextArrow}
					onShowSizeChange={PerPageChange}
					showLessItems
				/>
			) : isTablet ? (
				<Pagination
					className="pagination-data"
					onChange={PaginationChange}
					total={props.total}
					current={current}
					pageSize={size}
					showSizeChanger={false}
					itemRender={PrevNextArrow}
					onShowSizeChange={PerPageChange}
				/>
			) : (
				<Pagination
					className="pagination-data"
					showTotal={(total, range) =>
						`Showing ${range[0]}-${range[1]} of ${total}`
					}
					onChange={PaginationChange}
					total={props.total}
					current={current}
					pageSize={size}
					showSizeChanger={false}
					itemRender={PrevNextArrow}
					onShowSizeChange={PerPageChange}
				/>
			)}
		</div>
	);
}

export default PaginationComp;
