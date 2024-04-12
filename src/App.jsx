import './App.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
	Home,
	Login,
	Register,
	ResetPassword,
	ForgetPassword,
	RSVP,
	YouWillBeMissed_page,
	InvitationAccepted,
	EventDashboard,
	CreateNewEvent,
	InvitePeople,
	Create_And_Edit_Wishlist,
	PastEvents,
	OurEvents,
	MyEvents,
	Thankyou,
	BrokenLink,
	NotFound,
	ExpiredLink,
	ServerError,
} from './pages';
import ProtectedRoute from './components/layouts/ProtectedRoute';

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ProtectedRoute>
				<Home />
			</ProtectedRoute>
		),
	},
	{ path: '/broken-link', element: <BrokenLink /> },
	{ path: '/not-found', element: <NotFound /> },
	{ path: '/link-expired', element: <ExpiredLink /> },
	{ path: '/server-error', element: <ServerError /> },
	{ path: '/login', element: <Login /> },
	{ path: '/register', element: <Register /> },
	{ path: '/reset-password', element: <ResetPassword /> },
	{ path: '/forget-password', element: <ForgetPassword /> },
	{ path: '/invite-accepted', element: <InvitationAccepted /> },
	{
		path: '/my-events',
		element: (
			<ProtectedRoute>
				<MyEvents />
			</ProtectedRoute>
		),
	},

	{
		path: '/events',
		children: [
			{
				path: 'new-event',
				element: (
					<ProtectedRoute>
						<CreateNewEvent />
					</ProtectedRoute>
				),
			},
			{
				path: '/events/:event',
				element: (
					<ProtectedRoute>
						<EventDashboard />
					</ProtectedRoute>
				),
			},
			{
				path: '/events/:event/invite',
				element: (
					<ProtectedRoute>
						<InvitePeople />
					</ProtectedRoute>
				),
			},

			{
				path: '/events/:event/wishlist',
				element: (
					<ProtectedRoute>
						<Create_And_Edit_Wishlist />
					</ProtectedRoute>
				),
			},
			{
				path: '/events/:event/thankyou',
				element: (
					<ProtectedRoute>
						<Thankyou />
					</ProtectedRoute>
				),
			},
			{
				path: '/events/past-events',
				element: (
					<ProtectedRoute>
						<PastEvents />
					</ProtectedRoute>
				),
			},
			{
				path: '/events/our-events/:ownerId',
				element: (
					<ProtectedRoute>
						<OurEvents />
					</ProtectedRoute>
				),
			},
			{ path: '/events/:event/invitation', element: <RSVP /> },
			{ path: '/events/:event/you-will-be-missed', element: <YouWillBeMissed_page /> },
		],
	},
]);

function App() {
	const appTheme = useSelector((data) => data.theme);
	function getCurrentTheme() {
		if (appTheme.theme === 'dark') {
			document.documentElement.classList.add('dark');
			localStorage.theme = 'dark';
			return;
		} else if (appTheme.theme === 'light') {
			document.documentElement.classList.remove('dark');
			localStorage.theme = 'light';
			return;
		} else {
			const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
			systemTheme === 'dark' && document.documentElement.classList.add('dark');
			localStorage.removeItem('theme');
			return;
		}
	}
	useEffect(() => {
		getCurrentTheme();
	}, [appTheme]);

	return <RouterProvider router={router} />;
}

export default App;
