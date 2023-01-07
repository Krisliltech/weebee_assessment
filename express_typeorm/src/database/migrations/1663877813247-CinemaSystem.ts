import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CinemaSystem1663877813247 implements MigrationInterface {
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
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie_exploration',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
          { name: 'start', type: 'timestamp'},
          { name: 'end', type: 'timestamp'},
          { name: 'booked_out', type: 'boolean'},
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'show_room',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' }
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'movieExploration_showRoom',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movie_explorationId', type: 'integer' },
          { name: 'show_roomId', type: 'integer' }
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'movieExploration_showRoom',
      new TableForeignKey({
        columnNames: ['movie_explorationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_exploration',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'movieExploration_showRoom',
      new TableForeignKey({
        columnNames: ['show_roomId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'show_room',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'pricing',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movie_explorationId', type: 'integer' },
          { name: 'seat_type', type: 'string'},
          { name: 'price', type: 'integer'}
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'pricing',
      new TableForeignKey({
        columnNames: ['movie_explorationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_exploration',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'seats',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movie_explorationId', type: 'integer' },
          { name: 'row', type: 'integer'},
          { name: 'number', type: 'integer'},
          { name: 'type', type: 'string'},
          { name: 'premium_price', type: 'boolean'}
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'seats',
      new TableForeignKey({
        columnNames: ['movie_explorationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_exploration',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar' },
        ],
      }),
    );
    await queryRunner.createTable(
      new Table({
        name: 'bookings',
        columns: [
          {
            name: 'id',
            isPrimary: true,
            type: 'integer',
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'movie_explorationId', type: 'integer' },
          { name: 'seatId', type: 'integer' },
          { name: 'userId', type: 'integer' },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['movie_explorationId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'movie_exploration',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['seatId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'seats',
        onDelete: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'bookings',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
    // throw new Error('TODO: implement migration in task 4');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
     //empty
  }
}
