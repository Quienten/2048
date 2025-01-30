import AssetManager from "./assetmanager.js";
import Board from "./board.js";
import GameEngine from "./gameengine.js";

const gameEngine = new GameEngine();

const ASSET_MANAGER = new AssetManager();

ASSET_MANAGER.downloadAll(() => {
	const canvas = document.getElementById("gameWorld");
	const ctx = canvas.getContext("2d");

	gameEngine.addEntity(new Board(gameEngine))

	gameEngine.init(ctx);

	gameEngine.start();
});