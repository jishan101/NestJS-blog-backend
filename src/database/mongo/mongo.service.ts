export class MongoService {
  public async getMongoConfig() {
    const user = process.env.MONGO_USER;
    const password = process.env.MONGO_PASSWORD;
    const host = process.env.MONGO_HOST;
    const database = process.env.MONGO_DATABASE;
    const mongodb = {
      uri: `mongodb+srv://${user}:${password}@${host}/${database}`,
    };

    return mongodb;
  }
}
