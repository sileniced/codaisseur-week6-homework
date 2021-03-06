import {
  BadRequestError,
  Body,
  Get,
  HttpCode,
  JsonController,
  NotFoundError,
  Param,
  Post,
  Put,
} from "routing-controllers";
import Game from "./entity";

@JsonController()
export default class PageController {

  @Get("/games")
  public async allGames(): Promise<{
    games: Game[],
  }> {
    const games = await Game.find();
    return { games };
  }

  @Post("/games")
  @HttpCode(201)
  public createGame(
    @Body() body: { name: string },
  ): Promise<Game> {
    const game: Game = new Game(body.name);
    return game.save();
  }

  @Put("/games/:id")
  public async updateGame(
    @Param("id") id: number,
    @Body() update: Partial<Game>,
  ): Promise<Game> {
    const game: Game | undefined = await Game.findOne(id);
    if (!game) {
      throw new NotFoundError("Cannot find game");
    }
    if (update.id) {
      throw new BadRequestError("You can't update the game this way");
    }
    if (update.color && !Game.isValidColor(update.color)) {
      throw new BadRequestError("Not a valid color");
    }
    if (update.board && !Game.isValidMove(game.board, update.board)) {
      throw new BadRequestError("Not a valid move. More then 1 move is made");
    }
    return Game.merge(game, update).save();
  }
}
