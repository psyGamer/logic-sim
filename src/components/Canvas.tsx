import React, { useEffect, useRef } from 'react';

import CanvasComponent from '../types/CanvasComponent';

interface Props {
	width: number;
	height: number;

	components?: CanvasComponent[];
};

const Canvas: React.FC<Props> = ({ width, height, components }) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	const draw = (ctx: CanvasRenderingContext2D, frameCount: number) => {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

		if (components)
			components.forEach(component => component.draw(ctx));
	}

	useEffect(() => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext('2d');

		let frameCount = 0;
		let animationFrameID: number;

		if (!canvas || !context)
			return;

		const drawFrame = () => {
			frameCount++;

			draw(context, frameCount);

			animationFrameID = window.requestAnimationFrame(drawFrame);
		};

		drawFrame();

		return () => {
			window.cancelAnimationFrame(animationFrameID);
		};

	}, [draw]);

	return (
		<div style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
			<canvas ref={canvasRef} width={width} height={height}></canvas>
		</div>
	);
};

export default Canvas;