import React from 'react';
import ReactDOM from 'react-dom/client';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Navigate,
	Route,
	RouterProvider,
} from 'react-router-dom';
import App from './App.tsx';
import './globals.css';

const router = createBrowserRouter(
	createRoutesFromElements(
		<>
			<Route path="/" element={<App />} />
			<Route path="*" element={<Navigate to="/" replace />} />
		</>
	)
);

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
