import { Router } from 'express';
import * as CourseController from '../controllers/course.controller.js';
import { protect, restrictTo } from '../utils/auth.js';
import { Roles } from '../utils/roles.js';

const router = Router();
const version = 'api/v1';

router
	.route(`/${version}/courses`)
	.get(
		protect,
		restrictTo(Roles.ADMIN, Roles.STUDENT, Roles.INSTRUCTOR),
		CourseController.getAllCourses
	)
	.post(protect, restrictTo(Roles.INSTRUCTOR), CourseController.addCourse);

router
	.route(`/${version}/courses/:courseId`)
	.get(
		protect,
		restrictTo(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
		CourseController.getCourseById
	)
	.delete(protect, restrictTo(Roles.ADMIN), CourseController.deletCourseById);

/////////////////////// CONTENT ///////////////////////

router
	.route(`/${version}/courses/:courseId/content`)
	.get(
		protect,
		restrictTo(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
		CourseController.getCourseContent
	)
	.post(
		protect,
		restrictTo(Roles.INSTRUCTOR),
		CourseController.addCourseContent
	);

router.patch(
	`/${version}/content/:contentId/publish`,
	protect,
	restrictTo(Roles.ADMIN),
	CourseController.publishCourseContent
);
/////////////////////// REVIEWS ///////////////////////

router.post(`/${version}/courses/reviews`, CourseController.addReviewToCourse);
router.get(
	`/${version}/courses/:courseId/reviews`,
	protect,
	restrictTo(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
	CourseController.getCourseReviews
);

export default router;
