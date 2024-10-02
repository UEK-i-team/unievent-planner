import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';

describe('AppModule', () => {
  let appModule: TestingModule;
  let app: INestApplication;

  beforeAll(async () => {
    appModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = appModule.createNestApplication();
    await app.init();
  });

  it('should compile the module', () => {
    expect(appModule).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });
});
