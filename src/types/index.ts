export type SubscriptionType = "free" | "premium";
export type RevenueSource = "ads" | "subscriptions";

export type PopulatedWith<
  Base,
  Populated extends Record<string, unknown>
> = Omit<Base, keyof Populated> & Populated;

export type User = {
  id: string;
  userName: string;
  email: string;
  subscriptionType: SubscriptionType;
  createdAt: string;
};

export type Artist = {
  id: string;
  name: string;
};

export type Song = {
  id: string;
  title: string;
  artistId: string;
};

export type Stream = {
  id: string;
  songId: string;
  artistId: string;
  userId: string;
  dateStreamed: string;
  streamCount: number;
};

export type Revenue = {
  id: string;
  userId: string;
  source: RevenueSource;
  amount: number;
  date: string;
};
