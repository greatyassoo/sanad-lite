import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomeLayout from './components/pages/HomeLayout';
import Home from './components/Home';
import Courses from './components/Courses';
import BookCourse from './components/BookCourse';
import Login from './components/Login';
import Register from './components/Register';
import CourseDetails from './components/CourseDetails';
import axios from 'axios';

function App() {
	const routes = createBrowserRouter([
		{
			path: '/',
			element: <HomeLayout />,
			children: [
				{ index: true, element: <Home /> },
				{ path: 'courses', element: <Courses /> },
				{ path: 'course/:courseId', element: <CourseDetails /> },

				{ path: 'book', element: <BookCourse /> },

				{ path: 'login', element: <Login /> },
				{ path: 'register', element: <Register /> },
			],
		},
	]);

	return (
		<main className="bg-white  bg-HomePageBgImage h-screen w-screen overflow-y-auto scrollbar-thin">
			<RouterProvider router={routes} />
		</main>
	);
}

export default App;
