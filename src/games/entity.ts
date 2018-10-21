// src/pages/entity.ts
import { Exclude } from "class-transformer";
import { IsJSON } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

type Board = string[][];
enum Colors { "red", "blue", "green", "yellow", "magenta" }

const defaultBoard: Board = [
  ["o", "o", "o"],
  ["o", "o", "o"],
  ["o", "o", "o"],
];

@Entity()
export default class Game extends BaseEntity {

  @Exclude()
  public static isValidMove = (board1: Board, board2: Board): boolean =>
    board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
      .length === 1

  @Exclude()
  public static isValidColor = (color): boolean => !Game.colorArray.includes(color)

  @Exclude()
  private static colorArray: Colors[] = Object.keys(Colors)
  .filter((key) => !isNaN(Number(key)))
  .map((key) => Colors[key]);

  @Exclude()
  private static getRandomColor = (): Colors => {
    const random: number = Math.floor(Math.random() * Game.colorArray.length);
    return Game.colorArray[random];
  }

  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({
    nullable: false,
    type: "text",
  })
  public name: string;

  // @IsEnum(Colors)
  @Column({
    nullable: false,
    type: "text",
  })
  public color: Colors;

  @IsJSON()
  @Column({
    nullable: false,
    type: "json",
  })
  public board: Board;

  constructor(name: string) {
    super();
    this.name = name;
    this.color = Game.getRandomColor();
    this.board = defaultBoard;
  }
}
