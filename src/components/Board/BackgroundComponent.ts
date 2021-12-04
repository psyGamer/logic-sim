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
		context.fillStyle = '#000';

		const cameraWidth = this.camera.width / zoom;
		const cameraHeight = this.camera.height / zoom;

		const verticalPinCount = Math.ceil(cameraWidth / (this.tileSize + this.tileSpacing));
		const horizontalPinCount = Math.ceil(cameraHeight / (this.tileSize + this.tileSpacing));

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

				// Start drawing
				context.beginPath();
				context.arc(actualX, actualY, this.tileSize, 0, 2 * Math.PI);
				context.fill();
			}
		}
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
