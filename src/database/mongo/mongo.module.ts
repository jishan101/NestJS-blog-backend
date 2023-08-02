import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoService } from './mongo.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [MongoModule],
      inject: [MongoService],
      useFactory: async (mongoService: MongoService) =>
        await mongoService.getMongoConfig(),
    }),
  ],
  controllers: [],
  providers: [MongoService],
  exports: [MongoService],
})
export class MongoModule {}
