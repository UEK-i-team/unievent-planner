import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Connection, HydratedDocument, Model } from 'mongoose';
import { UserAccountDto } from 'src/core/accounts/dtos';
import { MongooseModels, UserAccount } from '../models/index';
@Injectable()
export class UpserDefaultsService implements OnModuleInit {
  private systemAccount?: HydratedDocument<UserAccount>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
    await this.upsertSystemAccount();
  }

  private getCollectionNames(models: typeof MongooseModels): string[] {
    return models.map((model) => model.collection);
  }

  private async upsertDefaults(): Promise<void> {
    const dbName = process.env.MONGODB_DATABASE;
    let collectionAdded = false;
    const db = this.connection.useDb(dbName, { useCache: true });

    const collections = await db.db.listCollections().toArray();
    const collectionNames = this.getCollectionNames(MongooseModels);

    for (const collectionName of collectionNames) {
      if (
        !collections.some((collection) => collection.name === collectionName)
      ) {
        await db.createCollection(collectionName);
        collectionAdded = true;
      }
    }
    if (collectionAdded) {
      // eslint-disable-next-line no-console
      Logger.debug('[UpserService] Database prepared.');
    }
  }

  async getSystemAccount(): Promise<UserAccountDto> {
    const systemAccount = await this.upsertSystemAccount();
    return plainToClass(UserAccountDto, systemAccount, {
      excludeExtraneousValues: true,
    });
  }

  private async upsertSystemAccount(): Promise<HydratedDocument<UserAccount>> {
    if (!this.systemAccount) {
      const username = 'SYSTEM';
      let systemAccount = await this.userAccountModel
        .findOne({ username })
        .exec();

      if (!systemAccount) {
        systemAccount = new this.userAccountModel();
        systemAccount.username = username;
        systemAccount.updatedAt = new Date();
        systemAccount.createdAt = new Date();
        systemAccount.updatedBy = systemAccount.id;
        systemAccount.createdBy = systemAccount.id;
        systemAccount.updatedBy = systemAccount.id;
        systemAccount.createdBy = systemAccount.id;
        systemAccount.avatarUrl = `https://i.imgur.com/${Date.now()}.png`;
        systemAccount.email = 'system@unievent-planner.com';
        await systemAccount.save();
      }
      this.systemAccount = systemAccount;
    }
    return this.systemAccount;
  }
}
