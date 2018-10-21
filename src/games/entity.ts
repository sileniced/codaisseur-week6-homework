// src/pages/entity.ts
import { Exclude } from "class-transformer";
import { IsJSON } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseEntity } from "typeorm/repository/BaseEntity";

enum Colors { "red", "blue", "green", "yellow", "magenta" }

const defaultBoard = [["o", "o", "o"], ["o", "o", "o"], ["o", "o", "o"]];

@Entity()
export default class Game extends BaseEntity {

  @Exclude()
  public static colorArray = Object.keys(Colors)
  .filter((key) => !isNaN(Number(key)))
  .map((key) => Colors[key]);

  @Exclude()
  public static moves = (board1, board2) =>
    board1
    .map((row, y) => row.filter((cell, x) => board2[y][x] !== cell))
    .reduce((a, b) => a.concat(b))
      .length

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
  public board: string[][];

  constructor(name: string) {
    super();
    this.name = name;
    this.color = Game.getRandomColor();
    this.board = defaultBoard;
  }
}
