import React from "react";
import { getBusinessPages } from "../../../api/business/api";
import CommonList from "../../common/list";
import { columns } from "./common/columns";

function ProjectList(props) {
	const mapData = (item, index) => {
		return {
			...item,
		};
	};

	return (
		<div>
			<CommonList
				mapData={mapData}
				load={getBusinessPages}
				columns={columns}
			/>
		</div>
	);
}

export default ProjectList;
