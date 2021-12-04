import Camera from '../../types/Camera';
import CanvasComponent from '../../types/CanvasComponent';

class BackgroundComponent extends CanvasComponent {
	camera: Camera;

	tileSize: number;
	tileSpacing: number;

	constructor(camera: Camera, tileSize: number, tileSpacing: number) {
		super();

		this.camera = camera;

		this.tileSize = tileSize;
		this.tileSpacing = tileSpacing;
	}

	public draw(context: CanvasRenderingContext2D, zoom: number): void {
		const cameraWidth = this.camera.width / zoom;
		const cameraHeight = this.camera.height / zoom;

		context.fillStyle = '#121212';
		context.fillRect(0, 0, cameraWidth, cameraHeight);

		if (zoom < 0.4 - 0.00001) return;

		const verticalPinCount = Math.ceil(cameraWidth / (this.tileSize + this.tileSpacing));
		const horizontalPinCount = Math.ceil(cameraHeight / (this.tileSize + this.tileSpacing));

		context.beginPath();

		for (let x = 0; x < cameraWidth; x += this.tileSize + this.tileSpacing) {
			for (let y = 0; y < cameraHeight; y += this.tileSize + this.tileSpacing) {
				let actualX = x + this.camera.xPos;
				let actualY = y + this.camera.yPos;

				actualX %= verticalPinCount * (this.tileSize + this.tileSpacing);
				actualY %= horizontalPinCount * (this.tileSize + this.tileSpacing);

				// Warp the coordinates to the other side of the board if they are off the screen
				if (actualX + this.tileSize < 0) actualX += verticalPinCount * (this.tileSize + this.tileSpacing);
				if (actualX > cameraWidth) actualX -= verticalPinCount * (this.tileSize + this.tileSpacing);

				if (actualY + this.tileSize < 0) actualY += horizontalPinCount * (this.tileSize + this.tileSpacing);
				if (actualY > cameraHeight) actualY -= horizontalPinCount * (this.tileSize + this.tileSpacing);

				context.rect(Math.floor(actualX), Math.floor(actualY), this.tileSize, this.tileSize);
			}
		}

		// Fade out based on zoom
		context.fillStyle = `rgba(44, 44, 44, ${(zoom - 0.4) / 5.2 + 0.5})`;
		console.log(zoom, context.fillStyle);
		context.fill();
	}

	private isVisible(xPos: number, yPos: number): boolean {
		return (
			xPos + this.tileSize >= 0 &&
			yPos + this.tileSize >= 0 &&
			xPos <= this.camera.width &&
			yPos <= this.camera.height
		);
	}
}

export default BackgroundComponent;
