import React, { useCallback, useEffect, useRef } from 'react';

import CanvasComponent from '../types/CanvasComponent';

interface Props {
	width: number;
	height: number;

	components?: CanvasComponent[];
};

const Canvas: React.FC<Props> = ({ width, height, components }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const canvas = canvasRef.current;
	const context = canvas?.getContext('2d');

	const draw = useCallback((context: CanvasRenderingContext2D) => {
		context.clearRect(0, 0, context.canvas.width, context.canvas.height);

		if (components)
			components.forEach(component => component.draw(context));
	}, [components]);

	useEffect(() => {
		if (!canvas || !context)
			return;

		draw(context);
	}, [canvas, context, draw]);

	return (
		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
			<canvas ref={canvasRef} width={width} height={height}></canvas>
		</div>
	);
};

export default Canvas;