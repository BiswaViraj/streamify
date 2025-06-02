import { faker } from "@faker-js/faker";
import fs from "fs";
import type { Artist, Revenue, Song, Stream, User } from "../src/types";

type MockData = {
  users: User[];
  artists: Artist[];
  songs: Song[];
  streams: Stream[];
  revenues: Revenue[];
};

const DATA_LENGTH = {
  userCount: faker.number.int({ min: 50, max: 1000 }),
  artistCount: faker.number.int({ min: 25, max: 100 }),
  songCount: faker.number.int({ min: 50, max: 500 }),
  streamCount: faker.number.int({ min: 1000, max: 10000 }),
  revenueCount: faker.number.int({ min: 100, max: 500 }),
};

function generateMockData({
  userCount,
  artistCount,
  songCount,
  streamCount,
  revenueCount,
}) {
  console.log("START: Users data.");
  const users: User[] = Array.from({ length: userCount }, () => ({
    id: faker.string.uuid(),
    userName: faker.internet.username(),
    email: faker.internet.email(),
    subscriptionType: faker.helpers.arrayElement(["free", "premium"]),
    createdAt: faker.date.past({ years: 2 }).toISOString(),
  }));
  console.log(`END: ${userCount} Users generated.`);

  console.log("START: Artists data.");
  const artists: Artist[] = Array.from({ length: artistCount }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
  }));
  console.log(`END: ${artistCount} Artists generated.`);

  console.log("START: Songs data.");
  const songs: Song[] = Array.from({ length: songCount }, () => ({
    id: faker.string.uuid(),
    title: faker.music.songName(),
    artistId: faker.helpers.arrayElement(artists).id,
  }));

  console.log(`END: ${songCount} Songs generated.`);

  console.log("START: Streams data.");
  const streams: Stream[] = Array.from({ length: streamCount }, () => {
    const song = faker.helpers.arrayElement(songs);
    return {
      id: faker.string.uuid(),
      songId: song.id,
      artistId: song.artistId,
      userId: faker.helpers.arrayElement(users).id,
      dateStreamed: faker.date.recent({ days: 90 }).toISOString(),
      streamCount: faker.number.int({ min: 10, max: 1000 }),
    };
  });

  console.log(`END: ${streamCount} Streams generated.`);

  console.log("START: Revenues data.");
  const revenues: Revenue[] = Array.from({ length: revenueCount }, () => ({
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(users).id,
    source: faker.helpers.arrayElement(["ads", "subscriptions", "merchandise"]),
    amount: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
    date: faker.date.recent({ days: 90 }).toISOString(),
  }));

  console.log(`END: ${revenueCount} Revenues generated.`);

  const data: MockData = {
    users,
    artists,
    songs,
    streams,
    revenues,
  };

  try {
    console.log("START: Writing data to db.json");
    fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
    console.log("END: db.json generated.");
  } catch (error) {
    console.error("Error generating db.json:", error);
  }
}

generateMockData(DATA_LENGTH);
