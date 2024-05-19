import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import { useContext, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Courses = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [touched, setTouched] = useState(false);
	const [courses, setCourses] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalItems, settotalItems] = useState(0);
	const [loading, setloading] = useState(false);

	const x = [3, 3, 3, 3, 3, 3, 3, 3];
	const itemsPerPage = 1000;
	const displayRange = 1;
	const pagesToShow = [];
	const totalPages = Math.ceil(totalItems / itemsPerPage);
	const startPage = Math.max(currentPage - displayRange, 1);
	const endPage = Math.min(currentPage + displayRange, totalPages);
	// Calculate the start and end indexes for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, x?.length);
	const visibleData2 = x.slice(startIndex, endIndex);
	const arr = [112, 22, 2, 2, 2];

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
		setTouched(true);
	};

	const fetchAllCourses = async (searchQuery) => {
		const response = await axios.get(
			`http://localhost:8383/api/v1/courses?size=${itemsPerPage}`,
			{
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		);
		console.log(response.data);
		settotalItems(response.data.numberOfElements);
		setCourses(response.data.content);
	};

	// pagination
	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
		// getPayments(newPage)
	};

	const handleClick = (newPage) => {
		if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
			handlePageChange(newPage);
		}
	};

	if (startPage > 2) {
		pagesToShow.push(1);
		if (startPage > 3) {
			pagesToShow.push('...');
		}
	}

	for (let i = startPage; i <= endPage; i++) {
		pagesToShow.push(i);
	}

	if (endPage < totalPages - 1) {
		if (endPage < totalPages - 2) {
			pagesToShow.push('...');
		}
		pagesToShow.push(totalPages);
	}

	useEffect(() => {
		fetchAllCourses();
	}, [totalItems]);

	return (
		<div className="flex flex-col xl:flex-row w-full px-8 ">
			<div
				className={`w-full   rounded-lg flex flex-col lg:px-6 py-4 gap-6  ${
					!loading ? 'lg:h-[430px]' : 'lg:h-auto'
				}`}
			>
				<div className="header flex justify-between items-center">
					<div className="font-extrabold  text-size_24 md:text-size_26 xl:text-size_28   text-mainColor">
						Courses
					</div>

					<div className="SearchInput hidden lg:flex    h-10 w-80 bg-text_FF rounded-full  justify-start p-5 items-center text-textColor__2 text-lg">
						<input
							placeholder={'Search For ...'}
							value={searchQuery}
							onChange={(e) => {
								handleSearchChange(e);
							}}
							onFocus={(e) => {
								e.target.style.boxShadow = 'none';
								e.target.style.border = 'none';
								e.target.style.outline = 'none';
							}}
							className={
								'bg-inherit w-full  text-sm text-mainColor font-bold placeholder:font-semibold   border-none rounded-sm '
							}
							type="search"
						/>
						<span className="cursor-pointer">
							<i className="fa-solid fa-magnifying-glass"></i>
						</span>
					</div>
				</div>

				<div className="largeScreen hidden lg:table   h-full ">
					{!loading ? (
						<>
							<div className="thead bg-text_FF">
								<div className="Header p-6 border border-[#E1E1E1] border-b-0 rounded-2xl rounded-b-none flex justify-between w-full">
									<p className="text-start text-sm 2xl:text-base text-textGray w-1/6">
										Course Name
									</p>

									<p className="text-start text-sm 2xl:text-base text-textGray  w-1/6">
										Category
									</p>
									<p className="text-start text-sm 2xl:text-base text-textGray  w-1/6">
										Rate
									</p>

									<p className="text-start text-sm 2xl:text-base text-textGray  w-1/6">
										Ratings Count
									</p>

									<p className="text-start text-sm 2xl:text-base text-textGray  w-1/6">
										Enrollments
									</p>

									<p className="text-start text-sm 2xl:text-base text-textGray  w-1/6">
										Status
									</p>
								</div>
							</div>
							{courses?.map((course, i) => {
								console.log(course);
								return (
									<Link
										to={`/course/${course.id}`}
										key={i}
										className="content bg-white relative"
									>
										<div
											onClick={(e) => {
												e.stopPropagation();
											}}
											className="py-[10px] px-6 w-full bg-white border-[#E1E1E1] border  flex items-center justify-between relative"
										>
											{/* <div className="flex text-start gap-2 w-1/5"> */}

											<div className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6">
												{course.name}
											</div>

											<div className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6 ">
												{course.category != null ? course.category : 'OTHER'}
											</div>

											<p className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6">
												{course.rating}
											</p>
											<p className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6">
												{course.ratingsCount}
											</p>
											<p className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6">
												{course.maxCapacity == -1
													? `${course.enrollmentsNumber} / inf`
													: `${course.enrollmentsNumber} / ${course.maxCapacity}`}
											</p>
											<p className="font-bold text-mainColor text-start  text-sm 2xl:text-base w-1/6">
												{course.endDate != null &&
												new Date(course.endDate).getTime() >
													new Date().getTime() ? (
													<span className="text-green-300">Active</span>
												) : (
													<span className="text-red-300">Closed</span>
												)}
											</p>
										</div>
									</Link>
								);
							})}
						</>
					) : (
						arr?.map((item, index) => {
							return (
								<div
									key={index}
									className="py-5 px-6 w-full lg:gap-x-4  flex items-center justify-between "
								>
									<div className="animate-pulse w-full  flex items-center  space-x-4">
										<div className="rounded-full bg-zinc-300 h-10 w-10"></div>
										<div className="flex-1 space-y-3 py-1">
											<div className="h-2 bg-zinc-300 rounded"></div>
											<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
										</div>
									</div>
								</div>
							);
						})
					)}
				</div>

				{!loading && (
					<div className=" hidden lg:block">
						<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
							<button
								onClick={() => handleClick(currentPage - 1)}
								className={`${
									currentPage === 1
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
								} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
								disabled={currentPage === 1}
							>
								&lt;
							</button>

							{pagesToShow.map((page, index) => (
								<button
									key={index}
									onClick={() => {
										if (typeof page === 'number') {
											handleClick(page);
										}
									}}
									className={`${
										typeof page === 'number'
											? currentPage === page
												? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
												: 'bg-transparent text-[#293241] hover:bg-slate-100'
											: 'text-[#293241]'
									} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handleClick(currentPage + 1)}
								className={`${
									currentPage === totalPages
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
								}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
								disabled={currentPage === totalPages}
							>
								&gt;
							</button>
						</div>
					</div>
				)}

				{/* uncomment this part if you have the data then loop in it to display the data*/}
				<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
					{!loading
						? visibleData2?.map((item, i) => {
								return (
									<Disclosure key={i}>
										{({ open }) => (
											<div>
												<Disclosure.Button
													className={`py-4 px-6 w-full bg-text_FF shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl ${
														open ? 'rounded-b-none' : 'rounded-b-2xl'
													}`}
												>
													<div className="flex items-center  gap-x-2">
														icon
														<div className="flex flex-col items-start">
															<p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
																coursename
															</p>
															<p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
																Rate
															</p>
														</div>
													</div>

													<div className="flex gap-x-2 items-center ">
														{!open ? (
															<i className="fa-solid fa-chevron-right"></i>
														) : (
															<i className="fa-solid fa-angle-down"></i>
														)}
													</div>
												</Disclosure.Button>
												<Disclosure.Panel className="p-6 w-full bg-text_FF  flex flex-col items-center justify-between rounded-b-2xl gap-6">
													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
															Category
														</p>
														<div className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center">
															data
														</div>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Rateing Count
														</p>
														<p className="flex  gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 flex-wrap justify-end w-3/4">
															time
														</p>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Enrollments
														</p>
														<div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end w-3/4">
															afs
														</div>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Status
														</p>
														<div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end w-3/4">
															afs
														</div>
													</div>

													<div className="flex justify-between items-center w-full relative">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center "></p>
														<div className=" w-6 h-6  cursor-pointer bg-secondMainColor flex items-center justify-center rounded-md">
															<i className="fa-solid fa-plus text-white"></i>
														</div>
													</div>
												</Disclosure.Panel>
											</div>
										)}
									</Disclosure>
								);
						  })
						: arr.map((item, i) => {
								return (
									<div
										key={i}
										className={`py-4 px-6 w-full bg-white shadow-sm border-[#E1E1E1] border-b flex items-center justify-between rounded-2xl`}
									>
										<div className="animate-pulse w-full  flex items-center  space-x-4">
											<div className="rounded-full bg-zinc-300 h-10 w-10"></div>
											<div className="flex-1 space-y-3 py-1">
												<div className="h-2 bg-zinc-300 rounded"></div>
												<div className="h-2 w-[40%] bg-zinc-300 rounded"></div>
											</div>
										</div>
									</div>
								);
						  })}

					{!loading ? (
						<div className="flex justify-center items-center text-size_10 sm:text-size_12 md:text-size__14 max-w-full">
							<button
								onClick={() => handleClick(currentPage - 1)}
								className={`${
									currentPage === 1
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
								} text-[#293241] px-3 py-1 rounded-lg mr-2 font-bold`}
								disabled={currentPage === 1}
							>
								&lt;
							</button>

							{pagesToShow.map((page, index) => (
								<button
									key={index}
									onClick={() => {
										if (typeof page === 'number') {
											handleClick(page);
										}
									}}
									className={`${
										typeof page === 'number'
											? currentPage === page
												? 'bg-gradient-to-r from-[#023E8AB2] to-[#2684FFCC] text-white'
												: 'bg-transparent text-[#293241] hover:bg-slate-100'
											: 'text-[#293241]'
									} px-3 py-1 rounded-lg mx-1 cursor-pointer font-bold`}
								>
									{page}
								</button>
							))}
							<button
								onClick={() => handleClick(currentPage + 1)}
								className={`${
									currentPage === totalPages
										? 'opacity-50 cursor-not-allowed'
										: 'cursor-pointer'
								}  text-[#293241] px-3 py-1 rounded-lg ml-2 font-bold`}
								disabled={currentPage === totalPages}
							>
								&gt;
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Courses;
