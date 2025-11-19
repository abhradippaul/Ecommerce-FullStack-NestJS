import { Inject, Injectable } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { DrizzleAsyncProvider } from 'src/drizzle/drizzle.provider';
import * as schema from '../drizzle/schema';

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
];

@Injectable()
export class DataService {
  constructor(
    @Inject(DrizzleAsyncProvider)
    private db: NodePgDatabase<typeof schema>,
  ) {}
  async uploadData() {
    await this.db
      .insert(schema.customers)
      .values(userData)
      .onConflictDoNothing();
    return 'Data uploaded';
  }
}
