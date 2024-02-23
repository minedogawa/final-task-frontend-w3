import React, { useState, useEffect } from "react"

import image1 from "../public/bg-header-desktop.svg"
import faceit from "../public/faceit.svg"
import data from "./data/data.json"

import JobList from "./JobList"
import Filter from "./Filter"
import Pagination from "./Pagination"

const App = () => {
	const [jobs, setJobs] = useState([])
	const [showedJobs, setShowedJobs] = useState([])
	const [requirementFilter, setRequirementFilter] = useState([])
	const [itemPerPage, setItemPerPage] = useState(5)
	const [currentPage, setCurrentPage] = useState(1)

	useEffect(() => {
		// console.log(requirementFilter)
		// let jobs = []

		// data.forEach((job) => {
			

		// 	if (requirementFilter.length > 0) {
				
		// 		if ([...job.languages, job.role, job.level].some((requirement) => requirementFilter.includes(requirement)) == false) {
		// 			return
		// 		}
		// 	}

		// 	if (requirementFilter.length < 1) {
		// 		jobs.push(job)
		// 	} else {
		// 		if (job.featured == true) {
		// 			jobs.unshift(job)
		// 		} else {
		// 			jobs.push(job)
		// 		}
		// 	}
		// })
		
		//lambda function
		const jobs = data.filter(job => 
			requirementFilter.every(
				(filter) => job.role === filter || job.level === filter || job.languages.includes(filter)
			)
		);
	
		setJobs(jobs)
		setShowedJobs(jobs.slice(currentPage * itemPerPage - itemPerPage, currentPage * itemPerPage))
	}, [requirementFilter, itemPerPage, currentPage])

	useEffect(() => {
		setCurrentPage(1)
	}, [requirementFilter])

	function addRequirementFilter(requirement) {
		if (requirementFilter.includes(requirement)) {
			return
		}

		setRequirementFilter((oldRequirementFilter) => {
			return [...oldRequirementFilter, requirement]
		})
	}

	function deleteRequirementFilter(requirement) {
		setRequirementFilter((oldRequirementFilter) => {
			if (oldRequirementFilter.indexOf(requirement) < 0) {
				return oldRequirementFilter
			}

			oldRequirementFilter.splice(oldRequirementFilter.indexOf(requirement), 1)
			return [...oldRequirementFilter]
		})
	}

	function clearRequirementFilter() {
		setRequirementFilter([])
	}

	function changeCurrentPage(page) {
		setCurrentPage(page)
	}

	return (
		<>
			<header className="bg-cyan-dark bg-no-repeat bg-cover h-44 bg-header-desktop" style={{ backgroundImage: `url(${image1})`}}></header>
			<main className="bg-cyan-light min-h-[80vh] pb-8 px-6">
				<div className="max-w-5xl m-auto relative -top-8 ">
					<div className="w-full max-w-5xl min-h-[4rem] mb-10">
						<Filter requirementFilter={requirementFilter} deleteRequirementFilter={deleteRequirementFilter} clearRequirementFilter={clearRequirementFilter} />
					</div>

					<div>
						<JobList jobs={showedJobs} addRequirementFilter={addRequirementFilter} />
					</div>
					<Pagination totalData={jobs.length} itemPerPage={itemPerPage} currentPage={currentPage} changeCurrentPage={changeCurrentPage} />
				</div>
			</main>
		</>
	)
}

export default App
