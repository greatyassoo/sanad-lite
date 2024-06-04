import { Router } from 'express';
import * as EnrollmentController from '../controllers/enrollment.controller.js';
import { protect, restrictTo } from '../utils/auth.js';
import { Roles } from '../utils/roles.js';
const router = Router();
const version = 'api/v1';

router
	.route(`/${version}/enrollments`)
	.post(protect, restrictTo(Roles.STUDENT), EnrollmentController.addEnrollment)
	.get(
		protect,
		restrictTo(Roles.STUDENT, Roles.INSTRUCTOR),
		EnrollmentController.getEnrollments
	);

router.patch(
	`/${version}/enrollments/:enrollmentId/accept`,
	protect,
	restrictTo(Roles.INSTRUCTOR),
	EnrollmentController.acceptEnrollment
);

router.patch(
	`/${version}/enrollments/:enrollmentId/reject`,
	protect,
	restrictTo(Roles.INSTRUCTOR),
	EnrollmentController.rejectEnrollment
);

export default router;
