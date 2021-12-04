import React, { useEffect, useRef } from 'react';

import IDrawableComponent from '../types/IDrawableComponent';

interface Props {
	components?: IDrawableComponent[];
};

const Canvas: React.FC<Props> = ({ components }) => {
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
		<canvas ref={canvasRef}></canvas>
	);
};

export default Canvas;