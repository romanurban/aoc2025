import { Test, TestingModule } from '@nestjs/testing';

import { AppModule } from './../src/app.module';
import { AppService } from './../src/app.service';

describe('CLI bootstrap (e2e)', () => {
  let moduleFixture: TestingModule;

  beforeEach(async () => {
    moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  it('resolves AppService for list operations', async () => {
    const appService = moduleFixture.get(AppService);
    await expect(appService.execute({ list: true })).resolves.toBeUndefined();
  });
});
