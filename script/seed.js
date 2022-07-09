"use strict";

const { Sequelize } = require("sequelize");
const axios = require("axios");

const {
  db,
  models: { User, Event, UsersEvents, UserPreferences },
} = require("../server/db");

const usersSeed = require("./user_data.json");
const eventsSeed = require("./event_data.json");
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users

  const users = await User.bulkCreate(usersSeed);

  // Creating events
  const events = await Event.bulkCreate(eventsSeed);

  const crossover = await users[0].addEvents(events[2]);

  // for (let i = 0; i < users.length; i++) {

  // }

  //  create connections
  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${events.length} events`);
  console.log(`seeded ${crossover.length} crossover(s)`);
  console.log(`seeded successfully`);
  return {
    users: {
      cody: users[0],
      murphy: users[1],
    },
  };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
