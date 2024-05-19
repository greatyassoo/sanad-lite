import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import courseAvatar from '../assets/pngtree-training-course-online-computer-chat-flat-color-icon-vector-png-image_2007114.jpg';
import TAvatar from '../assets/WhatsApp Image 2024-05-15 at 02.32.37_92e4de74.jpg';
import smallAvatar from '../assets/imgUser.svg';
import Pagination from './Pagination';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const StyledRating = styled(Rating)(({ theme }) => ({
	'& .MuiRating-iconEmpty .MuiSvgIcon-root': {
		color: theme.palette.action.disabled,
	},
}));

const customIcons = {
	1: {
		icon: <SentimentVeryDissatisfiedIcon color="error" />,
		label: 'Very Dissatisfied',
	},
	2: {
		icon: <SentimentDissatisfiedIcon color="error" />,
		label: 'Dissatisfied',
	},
	3: {
		icon: <SentimentSatisfiedIcon color="warning" />,
		label: 'Neutral',
	},
	4: {
		icon: <SentimentSatisfiedAltIcon color="success" />,
		label: 'Satisfied',
	},
	5: {
		icon: <SentimentVerySatisfiedIcon color="success" />,
		label: 'Very Satisfied',
	},
};
function IconContainer(props) {
	const { value, ...other } = props;
	return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
	value: PropTypes.number.isRequired,
};

function CourseDetails() {
	const [Rate, setRate] = useState(2);
	const [currentPage, setCurrentPage] = useState(1);
	const [course, setCourse] = useState({});
	const [instructor, setInstructor] = useState({});
	const [content, setContent] = useState([]);
	const [reviews, setReviews] = useState([]);
	const { courseId } = useParams();

	const handlePageChange = (newPage) => {
		setCurrentPage(newPage);
	};
	const itemsPerPage = 1000;

	const x = [3, 3, 3, 3, 3, 33];

	// Calculate the start and end indexes for the current page
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = Math.min(startIndex + itemsPerPage, x?.length);
	const visibleData2 = x?.slice(startIndex, endIndex);
	const fetchCurrentCourse = async () => {
		const response = await axios.get(
			`http://localhost:8383/api/v1/courses/${courseId}`,
			{
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		);
		const getCourse = response.data;
		const getContent = response.data.courseContent;
		setCourse(getCourse);
		setContent(getContent);
		console.log(getCourse);
		console.log(getContent);
		const response2 = await axios.get(
			`http://localhost:8383/api/v1/users/${getCourse.instructorId}`,
			{
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		);
		const getInstructor = response2.data;
		setInstructor(getInstructor);
		console.log(getInstructor);
	};

	useEffect(() => {
		fetchCurrentCourse();
	}, []);

	return (
		<div className="w-full space-y-8">
			<div className="w-full  flex flex-col md:flex-row items-center my-4 gap-x-4 px-6">
				<div className="w-[40%] flex justify-center ">
					<img className="rounded-t-lg" src={courseAvatar} alt="courseAvatar" />
				</div>

				<div className=" p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
						{course.name}
					</h5>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{course.description}
					</p>

					<div className="w-full flex-col flex items-start justify-between gap-y-2">
						<div className="w-full">
							<StyledRating
								name="highlight-selected-only"
								// defaultValue={Rate}
								value={Math.round(course.rating)}
								IconContainerComponent={IconContainer}
								getLabelText={(value) => customIcons[value].label}
								highlightSelectedOnly
							/>
							<div className="w-full  items-start sm:w-[80%] gap-y-3 flex flex-col sm:flex-row sm:items-center gap-x-8 justify-between">
								<div>
									<div className="flex items-center gap-x-1">
										<span className=" font-semibold text-gray-700 dark:text-gray-400 ">
											Reviews : {course.ratingsCount}
										</span>
									</div>
									<div className="flex items-center gap-x-1">
										<div className=" font-semibold text-gray-700 dark:text-gray-400 ">
											Enrollments : {course.enrollmentsNumber}
											{course.maxCapacity === -1
												? ' / inf'
												: ` / ${course.maxCapacity}`}
										</div>
									</div>
								</div>
								<div>
									<div className="flex items-center gap-x-1">
										<span className=" font-semibold text-gray-700 dark:text-gray-400 ">
											Category : {course.category}
										</span>
									</div>
									<div className="flex items-center gap-x-1">
										<div className=" font-semibold text-gray-700 dark:text-gray-400 ">
											Until: {new Date(course.endDate).toLocaleDateString()}
										</div>
									</div>
								</div>
							</div>
						</div>
						{course.enrollmentsNumber < course.maxCapacity &&
						course.endDate != null &&
						new Date(course.endDate).getTime() > new Date().getTime() ? (
							<div className=" w-full  self-center py-2 md:mt-3  cursor-pointer bg-green text-white gap-x-1 flex items-center justify-center rounded-md text-xl">
								Enroll
								<i className="fa-solid fa-plus text-white text-2xl"></i>
							</div>
						) : (
							''
						)}
					</div>
				</div>
			</div>

			<div className="w-full  flex flex-col md:flex-row items-center my-4 gap-x-4 px-6">
				<div className="overflow-hidden rounded-xl w-[40%] flex justify-center">
					<img className="rounded-t-lg" src={TAvatar} alt="courseAvatar" />
				</div>

				<div className=" p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
						{instructor.name}
					</h5>
					<p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
						{instructor.bio}
					</p>

					<div className="w-full flex-col flex items-start justify-between gap-y-2">
						<div />
						Name: {instructor.name}
						<br />
						bio: {instructor.bio}
						<br />
						Email: {instructor.email}
						<br />
						affiliaton: {instructor.affiliation}
						<br />
						years of experience: {instructor.yearsOfExperiecnce}
						<br />
						course count: {instructor.yearsOfExperiecnce}
						<br />
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col gap-y-6 py-4  ">
				<div className="header relative">
					<h1 className="text-4xl text-center font-semibold">Content</h1>
					<span className="w-[50px] h-[2px] bg-black absolute start-[50%] translate-x-[-50%]"></span>
				</div>

				<form className="addContent px-6 w-full flex flex-col gap-y-3 md:w-[70%] self-center ">
					<h4 className="text-xl">Add Content</h4>

					<div className="flex items-center gap-8 bg-white p-3 rounded-xl ">
						<div className="title flex flex-col gap-y-1 w-full sm:w-[47%]">
							<label className="text-textColor__2" htmlFor="title">
								Title
							</label>
							<input
								type="text"
								className="focus:outline-none p-2 rounded-md bg-text_FF text-sm font-semibold text-secondMainColor"
								placeholder="type title ..."
							/>
						</div>
						<div className="title flex flex-col gap-y-1 w-full sm:w-[47%]">
							<label className="text-textColor__2" htmlFor="title">
								Link
							</label>
							<input
								type="text"
								className="focus:outline-none p-2 rounded-md bg-text_FF text-sm font-semibold text-secondMainColor"
								placeholder="type link ..."
							/>
						</div>
					</div>

					<button className="rounded-xl p-2  w-full bg-secondMainColor text-white">
						Submit
					</button>
				</form>

				<ul
					className="content w-full  flex flex-col md:flex-row flex-wrap    px-6  items-center gap-8"
					start={'1'}
				>
					{content.map((item, i) => {
						return (
							<div
								key={i}
								className="block review w-full md:w-[47%] bg-text_FF p-2 rounded-md text-mainColor font-bold"
							>
								<li className=" flex items-center w-full justify-between px-2 ">
									<a href={item.path}>
										{' '}
										{i + 1}: {item.title}
									</a>
									{item.isPublished && (
										<span className=" rounded-xl border-green border-[1px] text-green font-semibold p-2 text-sm">
											Puplished
										</span>
									)}
									{!item.isPublished && (
										<button className="rounded-xl border-red-400 border-[1px] text-red-400 font-semibold p-2 text-sm">
											Not Published
										</button>
									)}
								</li>
							</div>
						);
					})}
				</ul>

				<Pagination
					totalItems={x?.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>

			<div className="w-full flex flex-col gap-y-6 py-4 ">
				<div className="header relative">
					<h1 className="text-4xl text-center font-semibold">Reviews</h1>
					<span className="w-[50px] h-[2px] bg-black absolute start-[50%] translate-x-[-50%]"></span>
				</div>

				<div className="addReview px-6 w-full md:w-[70%] self-center ">
					<label htmlFor="feedback" className="mb-2  text-xl">
						Add Review
					</label>
					<textarea
						className="w-full border-[1px] focus:outline-none p-2 rounded-lg border-[#E1E1E1]"
						rows="6"
						cols="60"
						name="feedback"
						id="feedback"
						placeholder="type your review ..."
					></textarea>

					<StyledRating
						name="highlight-selected-only"
						// defaultValue={Rate}
						value={Rate}
						IconContainerComponent={IconContainer}
						getLabelText={(value) => customIcons[value].label}
						highlightSelectedOnly
						onChange={(e) => setRate(parseInt(e.target.value))}
					/>

					<button className="rounded-xl p-2  w-full bg-secondMainColor text-white">
						Submit
					</button>
				</div>

				<div className="content w-full  flex flex-col md:flex-row flex-wrap    px-6  items-center gap-8">
					{visibleData2.map((item, i) => {
						return (
							<div
								key={i}
								className="review w-full md:w-[47%] flex items-center gap-x-2 bg-text_FF p-2 rounded-xl"
							>
								<img src={smallAvatar} alt="smallAvatar" />
								<div className="flex flex-col w-full gap-1 items-end ">
									<h4 className=" font-semibold text-start self-start">
										Student Name
									</h4>
									<p className="text-start self-start">
										Lorem ipsum dolor sit amet consectetur adipisicing elit.
										Aut, aliquid mollitia id commodi sed quibusdam
										necessitatibus.
									</p>

									<div>
										<StyledRating
											name="highlight-selected-only"
											// defaultValue={Rate}
											value={Rate}
											IconContainerComponent={IconContainer}
											getLabelText={(value) => customIcons[value].label}
											highlightSelectedOnly
											onChange={(e) => setRate(parseInt(e.target.value))}
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
				<Pagination
					totalItems={x?.length}
					itemsPerPage={itemsPerPage}
					currentPage={currentPage}
					onPageChange={handlePageChange}
				/>
			</div>
		</div>
	);
}

export default CourseDetails;
