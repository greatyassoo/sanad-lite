import { Listbox } from '@headlessui/react';
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

export default function Register() {
	const types = ['student', 'instructor'];
	const [selectedType, setselectedType] = useState(types[0]);
	const redirectTo = useNavigate();
	const formik = useFormik({
		initialValues: {},
		onSubmit: async (values) => {
			values['role'] = selectedType;
			const response = await axios.post(
				'http://localhost:8383/api/v1/auth/register',
				values
			);
			console.log(response.data);
			redirectTo('/login');
		},
	});

	return (
		<div className="w-full p-8 space-y-6 ">
			<div className="menu">
				<Listbox
					onChange={(e) => {
						setselectedType(e);
					}}
				>
					{({ open }) => (
						<div className="relative w-[300px] ">
							<Listbox.Button
								className={`font-semibold  w-full  text-mainColor  py-3 px-2 text-sm   
                      relative  flex cursor-pointer rounded-lg bg-text_FF text-left focus:outline-none  sm:text-sm `}
							>
								<span className="absolute top-[50%] translate-y-[-50%] end-4">
									<i className="fa-solid fa-angle-down"></i>
								</span>

								<span
									className={`block truncate text-size_12 sm:text-base capitalize`}
								>
									{selectedType}
								</span>
							</Listbox.Button>

							<Listbox.Options
								className="absolute  mt-1 max-h-40 z-10  
                       w-full overflow-y-scroll rounded-md bg-text_FF py-1 text-base  shadow  focus:outline-none sm:text-sm "
							>
								{types &&
									types
										.filter((item, i) => selectedType !== item)
										.map((person, personIdx) => (
											<Listbox.Option
												key={personIdx}
												className={({ active }) =>
													` relative cursor-pointer select-none py-1 sm:py-2 pl-10 pr-4 ${
														active
															? 'bg-mainColor text-white'
															: 'text-mainColor text-size_12 sm:text-sm  '
													}`
												}
												value={person}
											>
												{({ selectedType }) => (
													<span
														className={`block truncate text-size_12 sm:text-sm   ${
															selectedType ? 'font-medium' : 'font-normal'
														}`}
													>
														{person}
													</span>
												)}
											</Listbox.Option>
										))}
							</Listbox.Options>
						</div>
					)}
				</Listbox>
			</div>

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
								Name
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
								htmlFor="name"
							>
								Email
							</label>
							<input
								id="email"
								name="email"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
								type="text"
								placeholder="example@email.com"
							/>
						</div>
						<div className="name flex flex-col w-full">
							<label
								className="text-base text-secondMainColor font-semibold"
								htmlFor="password"
							>
								Password
							</label>
							<input
								id="password"
								name="password"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
								type="password"
								placeholder="*****"
							/>
						</div>
					</div>

					<div className=" h-full flex flex-col gap-y-3 w-full sm:w-1/2    ">
						<div className="name flex flex-col w-full">
							<label
								className="text-base text-secondMainColor font-semibold"
								htmlFor="name"
							>
								Affiliation
							</label>
							<input
								id="affiliation"
								name="affiliation"
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
								type="text"
								placeholder="example"
							/>
						</div>
						{selectedType === 'instructor' ? (
							<div className="name flex flex-col w-full">
								<label
									className="text-base text-secondMainColor font-semibold"
									htmlFor="name"
								>
									Years Of Expierence
								</label>
								<input
									id="yearsOfExpierence"
									name="yearsOfExpierence"
									onBlur={formik.handleBlur}
									onChange={formik.handleChange}
									className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
									type="number"
									placeholder="e.g 1"
								/>
							</div>
						) : null}

						<div className="name flex flex-col w-full">
							<label
								className="text-base text-secondMainColor font-semibold"
								htmlFor="bio"
							>
								Bio
							</label>
							<textarea
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								name="bio"
								className={` w-full px-2 placeholder:text-size_12 text-size_12 outline-none  focus:outline-none text-start border-[1px] text-sm text-secondMainColor font-semibold   rounded-xl py-2   px 6 placeholder:text-start`}
								id="bio"
								rows="6"
								cols="60"
								placeholder="example bio"
							></textarea>
						</div>
					</div>
				</div>

				<div className="buttons w-full">
					<button
						type="submit"
						className="font-bold bg-mainColor rounded-xl text-white py-2 px-3 w-full"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
}
