import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { protect, restrictTo } from '../utils/auth.js';
import { Roles } from '../utils/roles.js';

const router = Router();
const version = 'api/v1';

router.post(`/${version}/auth/register`, UserController.register);

router.post(`/${version}/auth/login`, UserController.login);

router.get(
	`/${version}/users`,
	protect,
	restrictTo(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
	UserController.getAllUsers
);
router.get(
	`/${version}/users/:userId`,
	protect,
	restrictTo(Roles.ADMIN, Roles.INSTRUCTOR, Roles.STUDENT),
	UserController.getUserById
);

export default router;
