import axios from 'axios';

export const isLoggedIn = () => {
	return localStorage.getItem('token') ? true : false;
};

/**
 * @param payload {object} email, password
 */
export const login = async (payload) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/v1/auth/login`,
			payload
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param payload {object} name, email, password, affiliation, bio, yearsOfExperience
 */
export const register = async (payload) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/v1/auth/register`,
			payload
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param token {string}
 * @param query {string}
 */
export const getAllCourses = async (token, query) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/v1/courses?${query}`,
			{
				headers: {
					authorization: `Bearer ` + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param token {string}
 * @param query {string}
 */
export const addCourse = async (payload, token) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/v1/courses`,
			payload,
			{
				headers: {
					authorization: `Bearer ` + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param courseId {number}
 * @param token {string}
 */
export const getCourseById = async (courseId, token) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}`,
			{
				headers: {
					authorization: `Bearer ` + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param courseId {number}
 * @param token {string}
 */
export const deleteCourseById = async (courseId, token) => {
	try {
		const response = await axios.delete(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}`,
			{
				headers: {
					authorization: `Bearer ` + token,
				},
			}
		);
		return { status: response.status };
	} catch (err) {
		return { err };
	}
};

/**
 * @param courseId {string}
 * @param payload {object}
 * @param token {string}
 */
export const updateCourseById = async (courseId, payload, token) => {
	try {
		const response = await axios.patch(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}`,
			payload,
			{
				headers: {
					authorization: `Bearer ` + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

/**
 * @param payload {object} courseId, studentUUID, rating, review,
 * @param token {string}
 */
export const addCourseReview = async (payload, token) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/reviews`,
			payload,
			{
				headers: {
					authorization: 'Bearer ' + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return err;
	}
};

export const getCourseReviews = async (courseId, token) => {
	try {
		const response = await axios.get(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}/reviews`,
			{
				headers: {
					authorization: 'Bearer ' + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};

export const addCourseContent = async (courseId, payload, token) => {
	try {
		const response = await axios.post(
			`${process.env.REACT_APP_API_URL}/api/v1/courses/${courseId}/content`,
			payload,
			{
				headers: {
					authorization: 'Bearer ' + token,
				},
			}
		);
		return { status: response.status, data: response.data };
	} catch (err) {
		return { err };
	}
};
