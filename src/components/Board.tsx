import React from 'react';

import Camera from '../types/Camera';
import Canvas from './Canvas';

import BackgroundComponent from './Board/BackgroundComponent';

interface Props {
	camera: Camera;

	tileSize: number;
	tileSpacing: number;
};

const Board: React.FC<Props> = ({ camera, tileSize, tileSpacing }) => {

	return (
		<Canvas
			width={camera.width}
			height={camera.height}
			zoom={camera.zoom}

			components={[
				new BackgroundComponent(camera, tileSize, tileSpacing),
			]}
		/>
	);
};

export default Board;