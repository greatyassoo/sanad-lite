import { Disclosure } from '@headlessui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { addCourse, deleteCourseById, getAllCourses } from '../utils/apis';
import { stringifyQueryParams } from '../utils/helpers';
// import { decode } from 'jwt-decode';
const Courses = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [courses, setCourses] = useState([]);
	const [loading, setloading] = useState(false);

	const role = localStorage.getItem('role');
	const arr = [112, 22, 2, 2, 2];
	const token = localStorage.getItem('token');

	const handleDeleteCourse = async (e, courseId) => {
		e.preventDefault();
		await deleteCourseById(courseId, token);
	};
	const formik = useFormik({
		initialValues: {},
		onSubmit: async (values) => {
			values['endDate'] = new Date(values['endDate']).toISOString();
			if (values['maxCapacity'] === '') values['maxCapacity'] = -1;
			values['instructorId'] = JSON.parse(localStorage.getItem('user'))['_id'];
			await addCourse(values, token);
		},
	});

	const handleSearchChange = (event) => {
		setSearchQuery(event.target.value);
	};

	const fetchCourses = async (search) => {
		const q = stringifyQueryParams(search);
		const response = await getAllCourses(token, q);
		setCourses(response.data.content);
	};

	useEffect(() => {
		const query = { search: searchQuery, size: 1000 };
		if (localStorage.getItem('role') === 'instructor')
			query['instructorId'] = JSON.parse(localStorage.getItem('user'))['_id'];
		console.log(query);
		fetchCourses(query);
		console.log(courses);
	}, [searchQuery]);

	return (
		<div className="flex flex-col xl:flex-row w-full px-8 ">
			{role === 'instructor' && (
				<>
					<h2 className="mx-auto my-3 font-bold text-mainColor text-center text-3xl">
						Add course:
					</h2>
					<form
						onSubmit={formik.handleSubmit}
						className="flex items-center flex-col  gap-y-5 sm:w-[60%] mx-auto py-2"
					>
						<div className="flex flex-col sm:flex-row items-center sm:gap-x-6  w-full h-auto sm:h-[350px]">
							<div className=" h-full flex flex-col w-full  sm:w-1/2 justify-start  gap-y-3  ">
								<div className="name flex flex-col w-full">
									<label
										className="text-base text-secondMainColor font-semibold"
										htmlFor="name"
									>
										Course name
									</label>
									<input
										id="name"
										name="name"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
										type="text"
										placeholder="name"
									/>
								</div>
								<div className="name flex flex-col w-full">
									<label
										className="text-base text-secondMainColor font-semibold"
										htmlFor="category"
									>
										Category
									</label>
									<select
										onChange={formik.handleChange}
										className="w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start"
										name="category"
										id="category"
									>
										<option value="BUSINESS">BUSINESS</option>
										<option value="DEVELOPMENT">DEVELOPMENT</option>
										<option value="OTHER">OTHER</option>
									</select>
								</div>
								<div className="name flex flex-col w-full">
									<label
										className="text-base text-secondMainColor font-semibold"
										htmlFor="endDate"
									>
										End date
									</label>
									<input
										id="endDate"
										name="endDate"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
										type="date"
										placeholder="dd/mm/yyyy"
									/>
								</div>
							</div>

							<div className=" h-full flex flex-col gap-y-3 w-full sm:w-1/2    ">
								<div className="name flex flex-col w-full">
									<label
										className="text-base text-secondMainColor font-semibold"
										htmlFor="name"
									>
										Max capacity
									</label>
									<input
										id="maxCapacity"
										name="maxCapacity"
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
										type="number"
										placeholder="e.g 100"
									/>
								</div>
								<div className="name flex flex-col w-full">
									<label
										className="text-base text-secondMainColor font-semibold"
										htmlFor="description"
									>
										Description
									</label>
									<textarea
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										name="description"
										className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
										id="description"
										rows="6"
										cols="60"
										placeholder="example description"
									></textarea>
								</div>
							</div>
						</div>
						<div className="w-full">
							<button
								type="submit"
								className="font-bold bg-mainColor rounded-xl text-white py-2 px-3 w-full"
							>
								Add course
							</button>
						</div>
					</form>
				</>
			)}
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
								return (
									<div className="flex" key={i}>
										<Link
											to={`/course/${course.id}`}
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
												{course.rating.toFixed(1)}
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
													<span className="text-green">Active</span>
												) : (
													<span className="text-red-500">Closed</span>
												)}
											</p>
										</Link>
										{role === 'admin' && (
											<div
												className="mt-2 ml-2 cursor-pointer"
												onClick={(e) => {
													handleDeleteCourse(e, course.id);
												}}
											>
												<span className="bg-red-500 px-3 py-2 rounded-md text-stone-100 font-semibold">
													Delete
												</span>
											</div>
										)}
									</div>
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
				<div className="flex flex-col rounded-2xl gap-y-3 lg:hidden">
					{!loading
						? courses.map((course, i) => {
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
														<div className="flex flex-col items-start">
															<p className="font-bold text-mainColor text-size__14 sm:text-base md:text-size_18">
																{course.name}
															</p>
															<p className="font-bold text-textGray text-size_12 sm:text-sm md:text-base">
																rating: {course.rating.toFixed(1)}
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
															{course.category}
														</div>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Rating Count
														</p>
														<p className="flex  gap-2 font-semibold text-textGray text-size_12 sm:text-size__14 flex-wrap justify-end w-3/4">
															{course.ratingsCount}
														</p>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Enrollments
														</p>
														<div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end w-3/4">
															{course.enrollmentsNumber}
														</div>
													</div>

													<div className="flex justify-between items-center w-full">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center ">
															Status
														</p>
														<div className="flex  gap-2 font-semibold text-size_12 sm:text-size__14 text-textGray flex-wrap justify-end w-3/4">
															{course.endDate != null &&
															new Date(course.endDate).getTime() >
																new Date().getTime() ? (
																<span className="text-green">Active</span>
															) : (
																<span className="text-red-500">Closed</span>
															)}
														</div>
													</div>

													<div className="flex justify-between items-center w-full relative">
														<p className="font-semibold text-size_12 sm:text-size__14 text-textGray text-center "></p>
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
				</div>
			</div>
		</div>
	);
};

export default Courses;
