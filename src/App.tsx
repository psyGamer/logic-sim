import React, { useEffect, useState } from 'react';

import Camera from './types/Camera';
import Board from './components/Board';

import './App.css';

const App: React.FC = () => {
	const [camera, setCamera] = useState<Camera>({
		xPos: 0,
		yPos: 0,

		width: window.innerWidth,
		height: window.innerHeight,

		zoom: 1
	});

	useEffect(() => {
		const onWindowResize = () => {
			const newCamera: Camera = {
				...camera,

				width: window.innerWidth,
				height: window.innerHeight,
			};

			setCamera(newCamera);
		};


		const onKeyDown = (event: KeyboardEvent) => {
			const newCamera: Camera = {
				...camera,
			}

			const movementSpeed = 10;
			const zoomSpeed = 0.1;

			switch (event.key) {
				case 'ArrowUp':
					newCamera.yPos -= movementSpeed;
					break;
				case 'ArrowDown':
					newCamera.yPos += movementSpeed;
					break;
				case 'ArrowLeft':
					newCamera.xPos -= movementSpeed;
					break;
				case 'ArrowRight':
					newCamera.xPos += movementSpeed;
					break;
				case '+':
					newCamera.zoom += zoomSpeed;
					break;
				case '-':
					newCamera.zoom -= zoomSpeed;
					break;
				default:
					break;
			}

			setCamera(newCamera);
		};

		window.addEventListener('resize', onWindowResize);
		window.addEventListener('keydown', onKeyDown);

		return () => {
			window.removeEventListener('resize', onWindowResize);
			window.removeEventListener('keydown', onKeyDown);
		}
	});

	return (
		<Board
			camera={camera}

			tileSize={5}
			tileSpacing={40}
		/>
	);
};

export default App;