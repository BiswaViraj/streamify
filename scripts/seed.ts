import { faker } from "@faker-js/faker";
import fs from "fs";

type SubscriptionType = "free" | "premium";
type RevenueSource = "ads" | "subscriptions";

type User = {
  id: string;
  userName: string;
  email: string;
  subscriptionType: SubscriptionType;
  createdAt: string;
};

type Artist = {
  id: string;
  name: string;
};

type Song = {
  id: string;
  title: string;
  artistId: string;
};

type Stream = {
  id: string;
  songId: string;
  userId: string;
  dateStreamed: string;
  streamCount: number;
};

type Revenue = {
  id: string;
  userId: string;
  source: RevenueSource;
  amount: number;
  date: string;
};

type MockData = {
  users: User[];
  artists: Artist[];
  songs: Song[];
  streams: Stream[];
  revenues: Revenue[];
};

const DATA_LENGTH = {
  userCount: 1000,
  artistCount: 100,
  songCount: 2500,
  streamCount: 10000,
  revenueCount: 300,
};

function generateMockData({
  userCount = 1000,
  artistCount = 100,
  songCount = 2500,
  streamCount = 10000,
  revenueCount = 300,
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

  const songs: Song[] = Array.from({ length: songCount }, () => ({
    id: faker.string.uuid(),
    title: faker.music.songName(),
    artistId: faker.helpers.arrayElement(artists).id,
  }));

  console.log(`END: ${songCount} Songs generated.`);

  const streams: Stream[] = Array.from({ length: streamCount }, () => ({
    id: faker.string.uuid(),
    songId: faker.helpers.arrayElement(songs).id,
    userId: faker.helpers.arrayElement(users).id,
    dateStreamed: faker.date.recent({ days: 90 }).toISOString(),
    streamCount: faker.number.int({ min: 1, max: 100 }),
  }));

  console.log(`END: ${streamCount} Streams generated.`);

  const revenues: Revenue[] = Array.from({ length: revenueCount }, () => ({
    id: faker.string.uuid(),
    userId: faker.helpers.arrayElement(users).id,
    source: faker.helpers.arrayElement(["ads", "subscriptions"]),
    amount: faker.number.float({ min: 1, max: 25, fractionDigits: 2 }),
    date: faker.date.recent({ days: 90 }).toISOString(),
  }));

  console.log(`END: ${revenueCount}  Revenue generated.`);

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
