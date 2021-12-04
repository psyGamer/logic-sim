import React, { useCallback, useEffect, useRef } from 'react';

import CanvasComponent from '../types/CanvasComponent';

interface Props {
	width: number;
	height: number;
	zoom: number;

	components?: CanvasComponent[];
};

const Canvas: React.FC<Props> = ({ width, height, zoom, components }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const draw = useCallback((context: CanvasRenderingContext2D) => {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		if (components)
			components.forEach(component => component.draw(context, zoom));
	}, [components, zoom]);

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		if (!canvas || !context)
			return;

		context.scale(zoom, zoom);

		draw(context);

		return () => {
			context.scale(1 / zoom, 1 / zoom);
		}
	}, [zoom, draw]);

	return (
		<div style={{
			width: '100vw',
			height: '100vh',
			overflow: 'hidden'
		}}>
			<canvas
				ref={canvasRef}

				width={width}
				height={height}

				style={{
					width: width,
					height: height
				}} />
		</div>
	);
};

export default Canvas;