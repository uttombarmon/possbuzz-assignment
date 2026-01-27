// import { Injectable, OnModuleInit } from '@nestjs/common';
// import { PrismaClient } from './generated/prisma/client.js';
// import { PrismaPg } from '@prisma/adapter-pg';

// @Injectable()
// export class PrismaService extends PrismaClient implements OnModuleInit {
//   constructor() {
//     const adapter = new PrismaPg({
//       connectionString: process.env.DATABASE_URL as string,
//     });
//     super({ adapter });
//   }
// }
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    const pool = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
    super({ adapter: pool });
  }
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
}
