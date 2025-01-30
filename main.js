import AssetManager from "./assetmanager";
import GameEngine from "./gameengine";

const CANVAS_WIDTH = 768
const CANVAS_HEIGHT = 768

const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	

	gameEngine.init(ctx);

	gameEngine.start();
});

export {CANVAS_WIDTH, CANVAS_HEIGHT}