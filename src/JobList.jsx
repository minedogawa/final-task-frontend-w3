import React, { useState, useEffect } from "react"

function Requirement({ requirements, addRequirementFilter }) {
	const [requirementComponents, setRequirementComponents] = useState([])

	useEffect(() => {
		let requirementComponents = []

		requirements.forEach((requirement, index) => {
			requirementComponents.push(
				<li key={index}>
					<button onClick={handleAddRequirementFilter} data-requirement={requirement} className="bg-cyan-light-2 px-2 py-1.5 text-sm text-cyan-dark font-bold rounded-l-md  hover:bg-cyan-dark hover:text-white rounded-r-md">
						<label data-requirement={requirement}>{requirement}</label>
					</button>
				</li>
			)
		})

		setRequirementComponents(requirementComponents)
	}, [requirements])

	function handleAddRequirementFilter(event) {
		addRequirementFilter(event.target.dataset.requirement)
	}

	return (
		<>
			<ul className="flex flex-wrap gap-4 border-t border-cyan-dark-grayish mt-4 pt-4 lg:border-0">{requirementComponents}</ul>
		</>
	)
}

function JobItem({ job, addRequirementFilter }) {
	return (
		<>
			<li className={`relative bg-white p-7 rounded-md flex items-center gap-6 shadow-lg mb-12 lg:mb-6`}>
				<div className="absolute -top-7 w-14 lg:relative lg:w-auto lg:top-0">
					<img src={job.logo} alt={"image"} className="rounded-full w-full" />
				</div>
				<div className="w-full lg:flex justify-between items-center">
					<div>
						<div>
							<span className="text-sm text-cyan-dark font-bold">{job.company}</span>
							{job.new == true ? <span className="bg-cyan-dark px-2 py-1 rounded-xl ml-2 text-xs text-white font-bold">NEW!</span> : ""}
							{job.featured == true ? <span className="bg-cyan-very-dark px-2 py-1 rounded-xl ml-2 text-xs text-white font-bold">FEATURED</span> : ""}
						</div>
						<a href="#" className="block my-1 text-base font-bold hover:text-cyan-dark">
							{job.position}
						</a>
						<ul className="flex text-cyan-dark-grayish gap-4 text-sm font-medium">
							<li>{job.postedAt}</li>
							<li className="before:content-['•'] before:mr-3 after:content-['•'] after:ml-3">{job.contract}</li>
							<li>{job.location}</li>
						</ul>
					</div>
					<div>
						<Requirement requirements={[...job.languages, job.role, job.level]} addRequirementFilter={addRequirementFilter} />
					</div>
				</div>
			</li>
		</>
	)
}

export default function JobList({ jobs, addRequirementFilter }) {
	const [jobItemComponents, setJobItemComponents] = useState([])

	useEffect(() => {
		let jobItemComponents = []

		jobs.forEach((job, index) => {
			jobItemComponents.push(<JobItem key={index} job={job} addRequirementFilter={addRequirementFilter} />)
		})

		setJobItemComponents(jobItemComponents)
	}, [jobs])

	return (
		<>
			<ul>{jobItemComponents}</ul>
		</>
	)
}
