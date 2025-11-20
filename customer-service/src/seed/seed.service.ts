import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from '../drizzle/schema';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';

const userData = [
  {
    name: 'User 1',
    password: '1234',
    email: 'user1@gmail.com',
    address: 'Kolkata India',
  },
  {
    name: 'User 2',
    password: '1234',
    email: 'user2@gmail.com',
    address: 'Bangalore India',
  },
  {
    name: 'User 3',
    password: '1234',
    email: 'user3@gmail.com',
    address: 'Hydrabad India',
  },
];

@Injectable()
export class SeedService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}

  async seed() {
    const existing = await this.db.select().from(schema.customers).limit(1);

    if (existing.length > 0) {
      console.log('Seed skipped: products already exist');
      return;
    }

    await this.db
      .insert(schema.customers)
      .values(userData)
      .onConflictDoNothing();

    console.log('Uploaded');
  }
}
