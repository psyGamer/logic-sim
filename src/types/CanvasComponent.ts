export default abstract class CanvasComponent {
	public abstract draw(context: CanvasRenderingContext2D, zoom: number): void;
}
