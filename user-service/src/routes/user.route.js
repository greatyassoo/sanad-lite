import { Router } from 'express';
import * as UserController from '../controllers/user.controller.js';
import { protect, restrictTo } from '../utils/auth.js';
import { Roles } from '../utils/roles.js';
import axios from 'axios';
const router = Router();

const version = 'api/v1';

router.post(`/${version}/auth/register`, UserController.register);
router.post(`/${version}/auth/login`, UserController.login);
router.get(
	`/${version}/users`,
	protect,
	restrictTo(Roles.ADMIN),
	UserController.getAllUsers
);

// courses service
router.get(
	`/${version}/courses`,
	protect,
	restrictTo(Roles.ADMIN, Roles.STUDENT),
	async (req, res) => {
		const response = await axios.get('http://localhost:8080/api/v1/courses');
		return res.status(response.status).json(response.data);
	}
);

export default router;
