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
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {
	addCourseContent,
	addCourseReview,
	getCourseReviews,
} from '../utils/apis';

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
	const [course, setCourse] = useState({});
	const [instructor, setInstructor] = useState({});
	const [content, setContent] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [text, setText] = useState('');
	const [link, setLink] = useState('');
	const [title, setTitle] = useState('');
	const { courseId } = useParams();

	const fetchCurrentCourse = async () => {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}`,
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
		const response2 = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/v1/users/${getCourse.instructorId}`,
			{
				headers: {
					authorization: 'Bearer ' + localStorage.getItem('token'),
				},
			}
		);
		const getInstructor = response2.data;
		setInstructor(getInstructor);
	};

	const handleAddReview = async () => {
		await addCourseReview(
			{
				courseId: courseId,
				studentUUID: JSON.parse(localStorage.getItem('user'))['_id'],
				rating: Rate,
				review: text,
			},
			localStorage.getItem('token')
		);
	};

	const fetchCourseReviews = async () => {
		const res = await getCourseReviews(courseId, localStorage.getItem('token'));
		if (!res['err']) setReviews(res.data);
		console.log(reviews);
	};
	const handleAddContent = async () => {
		console.log(
			await addCourseContent(
				courseId,
				{ title: title, link: link },
				localStorage.getItem('token')
			)
		);
	};

	useEffect(() => {
		fetchCurrentCourse();
		fetchCourseReviews();
	}, []);

	return (
		<div className="w-full space-y-8">
			<div className="w-full  flex flex-col md:flex-row items-center my-4 gap-x-4 px-6">
				<div className="w-[40%] flex justify-center ">
					<img className="rounded-t-lg" src={courseAvatar} alt="courseAvatar" />
				</div>

				<div className=" p-5">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
						{course.id}. {course.name}
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
								Reviews: {course.ratingsCount}
								<br />
								Category : {course.category}
								<br />
								Until: {new Date(course.endDate).toLocaleDateString()} <br />
								Enrollments : {course.enrollmentsNumber}
								{course.maxCapacity === -1
									? ' / inf'
									: ` / ${course.maxCapacity}`}
								<div>
									<div className="flex items-center gap-x-1">
										<span className=" font-semibold text-gray-700 dark:text-gray-400 "></span>
									</div>
									<div className="flex items-center gap-x-1">
										<div className=" font-semibold text-gray-700 dark:text-gray-400 "></div>
									</div>
								</div>
							</div>
						</div>
						{localStorage.getItem('role') === 'student' &&
							course.enrollmentsNumber < course.maxCapacity &&
							course.endDate != null &&
							new Date(course.endDate).getTime() > new Date().getTime() && (
								<div className=" w-full  self-center py-2 md:mt-3  cursor-pointer bg-green text-white gap-x-1 flex items-center justify-center rounded-md text-xl">
									Enroll
									<i className="fa-solid fa-plus text-white text-2xl"></i>
								</div>
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
						Email: {instructor.email}
						<br />
						affiliaton: {instructor.affiliation}
						<br />
						years of experience: {instructor.yearsOfExperience}
						<br />
					</div>
				</div>
			</div>

			<div className="w-full flex flex-col gap-y-6 py-4  ">
				<div className="header relative">
					<h1 className="text-4xl text-center font-semibold">Content</h1>
					<span className="w-[50px] h-[2px] bg-black absolute start-[50%] translate-x-[-50%]"></span>
				</div>

				{localStorage.getItem('role') === 'instructor' && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleAddContent();
						}}
						className="addContent px-6 w-full flex flex-col gap-y-3 md:w-[70%] self-center "
					>
						<h4 className="text-xl">Add Content</h4>

						<div className="flex items-center gap-8 bg-white p-3 rounded-xl ">
							<div className="title flex flex-col gap-y-1 w-full sm:w-[47%]">
								<label className="text-textColor__2" htmlFor="title">
									Title
								</label>
								<input
									type="text"
									name="title"
									onChange={(e) => setTitle(e.target.value)}
									className="focus:outline-none p-2 rounded-md bg-text_FF text-sm font-semibold text-secondMainColor"
									placeholder="type title ..."
								/>
							</div>
							<div className="title flex flex-col gap-y-1 w-full sm:w-[47%]">
								<label className="text-textColor__2" htmlFor="link">
									Link
								</label>
								<input
									name="link"
									type="text"
									onChange={(e) => setLink(e.target.value)}
									className="focus:outline-none p-2 rounded-md bg-text_FF text-sm font-semibold text-secondMainColor"
									placeholder="type link ..."
								/>
							</div>
						</div>
						<button
							className="rounded-xl p-2  w-full bg-secondMainColor text-white"
							type="submit"
						>
							Submit
						</button>
					</form>
				)}

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
									<a href={item.path} rel="noreferrer" target="_blank">
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
			</div>

			<div className="w-full flex flex-col gap-y-6 py-4 ">
				<div className="header relative">
					<h1 className="text-4xl text-center font-semibold">Reviews</h1>
					<span className="w-[50px] h-[2px] bg-black absolute start-[50%] translate-x-[-50%]"></span>
				</div>
				{localStorage.getItem('role') === 'student' && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							handleAddReview();
						}}
						className="addReview px-6 w-full md:w-[70%] self-center "
					>
						<label htmlFor="feedback" className="mb-2  text-xl">
							Add Review
						</label>
						<textarea
							className="w-full border-[1px] focus:outline-none p-2 rounded-lg border-[#E1E1E1]"
							rows="6"
							cols="60"
							name="review"
							id="review"
							placeholder="type your review ..."
							onChange={(e) => setText(e.target.value)}
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

						<button
							type="submit"
							className="rounded-xl p-2  w-full bg-secondMainColor text-white"
						>
							Submit
						</button>
					</form>
				)}

				<div className="content w-full  flex flex-col md:flex-row flex-wrap    px-6  items-center gap-8">
					{reviews.map((review, i) => {
						return (
							<div
								key={i}
								className="review w-full md:w-[47%] flex items-center gap-x-2 bg-text_FF p-2 rounded-xl"
							>
								<img src={smallAvatar} alt="smallAvatar" />
								<div className="flex flex-col w-full gap-1 items-end ">
									<h4 className=" font-semibold text-start self-start">
										Student {review.studentUUID}
									</h4>
									<p className="text-start self-start">{review.review}</p>

									<div>
										<StyledRating
											name="highlight-selected-only"
											// defaultValue={Rate}
											value={Math.round(review.rating)}
											IconContainerComponent={IconContainer}
											getLabelText={(value) => customIcons[value].label}
											highlightSelectedOnly
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

export default CourseDetails;
