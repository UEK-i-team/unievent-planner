import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Connection, HydratedDocument, Model } from 'mongoose';
import { UserAccountDto } from '../core/accounts/dtos';
import { MongooseModels, UserAccount, Role } from '../models';
import { Types } from 'mongoose';

@Injectable()
export class UpserDefaultsService implements OnModuleInit {
  private systemAccount?: HydratedDocument<UserAccount>;

  constructor(
    @InjectConnection() private readonly connection: Connection,
    @InjectModel(UserAccount.name)
    private readonly userAccountModel: Model<UserAccount>,
    @InjectModel(Role.name)
    private readonly roleModel: Model<Role>,
  ) {}

  async onModuleInit(): Promise<void> {
    await this.upsertDefaults();
    await this.createRoles();
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
        systemAccount.email = 'system@unievent-planner.com';
        systemAccount.firebaseId = 'defaultFirebaseId';
        systemAccount.role = [(await this.getSystemRole()).id];
        await systemAccount.save();
      }
      this.systemAccount = systemAccount;
    }
    return this.systemAccount;
  }

  private async createRoles(): Promise<void> {
    await this.createRoleIfNotExists('USER', [
      { action: 'read', subject: 'profile' },
      { action: 'update', subject: 'profile' },
    ]);
    await this.createRoleIfNotExists('SYSTEM', [
      { action: 'manage', subject: 'all' },
    ]);
  }

  private async createRoleIfNotExists(
    name: string,
    permissions: { action: string; subject: string }[],
  ): Promise<void> {
    const role = await this.roleModel.findOne({ name });
    if (!role) {
      const systemUser = new Types.ObjectId((await this.getSystemAccount()).id);
      const newRole = new this.roleModel({
        name,
        permissions,
        createdBy: systemUser,
        updatedBy: systemUser,
      });
      await newRole.save();
      Logger.debug(`[UpserService] Role ${name} created.`);
    } else {
      Logger.debug(`[UpserService] Role ${name} already exists.`);
    }
  }
  async getUserRole(): Promise<HydratedDocument<Role>> {
    return this.roleModel.findOne({ name: 'USER' }).exec();
  }

  async getSystemRole(): Promise<HydratedDocument<Role>> {
    return this.roleModel.findOne({ name: 'SYSTEM' }).exec();
  }
}
