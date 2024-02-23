import React, { useState, useEffect } from "react"

export default function Filter({ requirementFilter, deleteRequirementFilter, clearRequirementFilter }) {
	const [filterComponents, setFilterComponents] = useState([])

	useEffect(() => {
		let filterComponents = []

		requirementFilter.forEach((requirementFilter, index) => {
			filterComponents.push(
				<li key={index} className="flex">
					<div className="bg-cyan-light-2 px-2 py-1.5 text-sm text-cyan-dark font-bold rounded-l-md cursor-default">{requirementFilter}</div>
					<div>
						<button onClick={handleDeleteRequirementFilter} data-requirement={requirementFilter} className="bg-cyan-dark h-full flex items-center p-2 rounded-r-md hover:bg-cyan-very-dark">
							<svg data-requirement={requirementFilter} xmlns="http://www.w3.org/2000/svg" width="14" height="14">
								<path data-requirement={requirementFilter} fill="#FFF" fillRule="evenodd" d="M11.314 0l2.121 2.121-4.596 4.596 4.596 4.597-2.121 2.121-4.597-4.596-4.596 4.596L0 11.314l4.596-4.597L0 2.121 2.121 0l4.596 4.596L11.314 0z"></path>
							</svg>
						</button>
					</div>
				</li>
			)
		})

		setFilterComponents(filterComponents)
	}, [requirementFilter])

	function handleDeleteRequirementFilter(event) {
		deleteRequirementFilter(event.target.dataset.requirement)
	}

	if (requirementFilter.length > 0) {
		return (
			<div className="bg-white rounded-md px-7 py-4 w-full shadow-lg flex justify-between">
				<ul className="flex flex-wrap gap-4">{filterComponents}</ul>
				<button onClick={clearRequirementFilter} className="text-sm text-cyan-dark font-bold underline">
					Clear
				</button>
			</div>
		)
	}
}
