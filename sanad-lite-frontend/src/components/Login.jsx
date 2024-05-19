import { Listbox } from '@headlessui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
	const [errorFlag, setErrorFlag] = useState(false);
	const redirectTo = useNavigate();
	const formik = useFormik({
		initialValues: {},
		onSubmit: async (values) => {
			try {
				const response = await axios.post(
					'http://localhost:8383/api/v1/auth/login',
					values
				);
				console.log(response.data);
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('role', response.data.data.role);
				redirectTo('/courses');
			} catch (err) {
				setErrorFlag(true);
			}
		},
	});

	return (
		<div className="w-full  flex items-center justify-center flex-col absolute top-[50%] translate-y-[-50%] ">
			<h2 className="mx-auto font-bold text-mainColor text-center text-3xl">
				Sign In:
			</h2>

			<form
				onSubmit={formik.handleSubmit}
				className="flex w-full px-4 items-center flex-col   gap-y-5 sm:w-[60%] mx-auto py-2"
			>
				<div className="name flex flex-col w-full">
					<label
						className="text-base text-secondMainColor font-semibold"
						htmlFor="email"
					>
						Email:
					</label>
					<input
						name="email"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2 placeholder:text-start`}
						type="text"
						id="email"
						placeholder="email@example.com"
					/>
				</div>
				<div className="name flex flex-col w-full">
					<label
						className="text-base text-secondMainColor font-semibold"
						htmlFor="password"
					>
						Password:
					</label>
					<input
						name="password"
						onBlur={formik.handleBlur}
						onChange={formik.handleChange}
						className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
						type="password"
						id="password"
						placeholder="*****"
					/>
				</div>
				<div className="buttons w-full">
					<button
						type="submit"
						className="font-bold bg-mainColor rounded-xl text-white py-2 px-3 w-full"
					>
						Submit
					</button>
				</div>
				{errorFlag && <p className="text-red-400">Invalid email or password</p>}
			</form>
		</div>
	);
}
