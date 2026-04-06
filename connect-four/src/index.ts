import { Game } from "./Game";
import { Grid } from "./Grid";


const grid = new Grid(6, 7);
const game = new Game(grid, /* connectN= */ 4, /* targetScore= */ 2);
game.play();