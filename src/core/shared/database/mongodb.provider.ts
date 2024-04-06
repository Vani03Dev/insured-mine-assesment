import mongoose from 'mongoose';

export const MongodbProvider = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(process.env.MONGO_URI),
  },
];
