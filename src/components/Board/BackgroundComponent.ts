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

	public draw(context: CanvasRenderingContext2D): void {
		context.fillStyle = '#000';

		const verticalPinCount = Math.ceil(this.camera.width / (this.tileSize + this.tileSpacing));
		const horizontalPinCount = Math.ceil(this.camera.height / (this.tileSize + this.tileSpacing));

		for (let x = 0; x < this.camera.width; x += this.tileSize + this.tileSpacing) {
			for (let y = 0; y < this.camera.height; y += this.tileSize + this.tileSpacing) {
				let actualX = x + this.camera.xPos;
				let actualY = y + this.camera.yPos;

				actualX %= verticalPinCount * (this.tileSize + this.tileSpacing);
				actualY %= horizontalPinCount * (this.tileSize + this.tileSpacing);

				if (x === 0 && y === 0 && this.camera.zoom !== 1) {
					console.log(x, y, this.camera.xPos, this.camera.yPos);
					console.log('Before wrapping: ', actualX, actualY);
				}

				if (actualX + this.tileSize < 0) actualX += verticalPinCount * (this.tileSize + this.tileSpacing);
				if (actualX > this.camera.width) actualX -= verticalPinCount * (this.tileSize + this.tileSpacing);

				if (actualY + this.tileSize < 0) actualY += horizontalPinCount * (this.tileSize + this.tileSpacing);
				if (actualY > this.camera.height) actualY -= horizontalPinCount * (this.tileSize + this.tileSpacing);

				if (x === 0 && y === 0 && this.camera.zoom !== 1) {
					console.log('After wrapping: ', x, y, actualX, actualY);
				}

				context.fillRect(actualX, actualY, this.tileSize, this.tileSize);
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
