import { PrismaService } from '../../src/prisma/prisma.service';
import { Migration } from '../cli/migration';

const prisma = new PrismaService();
export default class implements Migration {
  async up() {
    /**
     # ToDo: Create a migration that creates all tables for the following user stories

     For an example on how a UI for an api using this might look like, please try to book a show at https://in.bookmyshow.com/.
     To not introduce additional complexity, please consider only one cinema.

     Please list the tables that you would create including keys, foreign keys and attributes that are required by the user stories.

     ## User Stories

     **Movie exploration**
     * As a user I want to see which films can be watched and at what times
     * As a user I want to only see the shows which are not booked out

     **Show administration**
     * As a cinema owner I want to run different films at different times
     * As a cinema owner I want to run multiple films at the same time in different showrooms

     **Pricing**
     * As a cinema owner I want to get paid differently per show
     * As a cinema owner I want to give different seat types a percentage premium, for example 50 % more for vip seat

     **Seating**
     * As a user I want to book a seat
     * As a user I want to book a vip seat/couple seat/super vip/whatever
     * As a user I want to see which seats are still available
     * As a user I want to know where I'm sitting on my ticket
     * As a cinema owner I dont want to configure the seating for every show
     */
    await prisma.$queryRaw`CREATE TABLE "movie_exploration" (
                                                               "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                               "name" TEXT NOT NULL,
                                                               "start" DATETIME NOT NULL,
                                                               "end" DATETIME NOT NULL,
                                                               "booked_out" BOOLEAN NOT NULL
                         )`;
    await prisma.$queryRaw`CREATE TABLE "show_room" (
                                                       "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                       "name" TEXT NOT NULL
                         )`;
    await prisma.$queryRaw`CREATE TABLE "movieExploration_showRoom" (
                                                                       "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                                       "movie_explorationId" INTEGER NOT NULL,
                                                                       "show_roomId" INTEGER NOT NULL,
                                                                       CONSTRAINT "movieExploration_showRoom_movie_explorationId_fkey" FOREIGN KEY ("movie_explorationId") REFERENCES "movie_exploration" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                                                                       CONSTRAINT "movieExploration_showRoom_show_roomId_fkey" FOREIGN KEY ("show_roomId") REFERENCES "show_room" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                         )`;
    await prisma.$queryRaw`CREATE TABLE "pricing" (
                                                     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                     "movie_explorationId" INTEGER NOT NULL,
                                                     "seat_type" TEXT NOT NULL,
                                                     "price" INTEGER NOT NULL,
                                                     CONSTRAINT "pricing_movie_explorationId_fkey" FOREIGN KEY ("movie_explorationId") REFERENCES "movie_exploration" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                         )`;
    await prisma.$queryRaw`CREATE TABLE "seats" (
                                                   "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                   "movie_explorationId" INTEGER NOT NULL,
                                                   "type" TEXT NOT NULL,
                                                   "row" INTEGER NOT NULL,
                                                   "number" INTEGER NOT NULL,
                                                   "premium_price" BOOLEAN NOT NULL,
                                                   CONSTRAINT "seats_movie_explorationId_fkey" FOREIGN KEY ("movie_explorationId") REFERENCES "movie_exploration" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                         )`;
    await prisma.$queryRaw`CREATE TABLE "users" (
                                                   "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                   "name" TEXT NOT NULL
                         )`;
    await prisma.$queryRaw`CREATE TABLE "bookings" (
                                                     "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                                                     "movie_explorationId" INTEGER NOT NULL,
                                                     "seatId" INTEGER NOT NULL,
                                                     "userId" INTEGER NOT NULL,
                                                     CONSTRAINT "bookings_movie_explorationId_fkey" FOREIGN KEY ("movie_explorationId") REFERENCES "movie_exploration" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                                                     CONSTRAINT "bookings_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seats" ("id") ON DELETE CASCADE ON UPDATE NO ACTION,
                                                     CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE NO ACTION
                         )`;
    // throw new Error('TODO: implement migration in task 4');
  }

  async down() {
    // do nothing
  }
}
