import { afterEach, beforeEach, describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import request = require('supertest');
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { AuthGuard } from '../src/security/guards/auth.guard';
import { RolesGuard } from '../src/security/guards/roles.guard';
import { RegionDTO } from '../src/service/dto/region.dto';
import { RegionService } from '../src/service/region.service';

describe('Region Controller', () => {
  let app: INestApplication;

  const authGuardMock = { canActivate: (): any => true };
  const rolesGuardMock = { canActivate: (): any => true };
  const entityMock: any = {
    id: 'entityId',
  };

  const serviceMock = {
    findById: (): any => entityMock,
    findAndCount: (): any => [entityMock, 0],
    save: (): any => entityMock,
    update: (): any => entityMock,
    deleteById: (): any => entityMock,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideGuard(AuthGuard)
      .useValue(authGuardMock)
      .overrideGuard(RolesGuard)
      .useValue(rolesGuardMock)
      .overrideProvider(RegionService)
      .useValue(serviceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/GET all regions ', async () => {
    const getEntities: RegionDTO[] = (await request(app.getHttpServer()).get('/api/regions').expect(200)).body;

    expect(getEntities).toEqual(entityMock);
  });

  it('/GET regions by id', async () => {
    const getEntity: RegionDTO = (
      await request(app.getHttpServer())
        .get('/api/regions/' + entityMock.id)
        .expect(200)
    ).body;

    expect(getEntity).toEqual(entityMock);
  });

  it('/POST create regions', async () => {
    const createdEntity: RegionDTO = (await request(app.getHttpServer()).post('/api/regions').send(entityMock).expect(201)).body;

    expect(createdEntity).toEqual(entityMock);
  });

  it('/PUT update regions', async () => {
    const updatedEntity: RegionDTO = (await request(app.getHttpServer()).put('/api/regions').send(entityMock).expect(201)).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/PUT update regions from id', async () => {
    const updatedEntity: RegionDTO = (
      await request(app.getHttpServer())
        .put('/api/regions/' + entityMock.id)
        .send(entityMock)
        .expect(201)
    ).body;

    expect(updatedEntity).toEqual(entityMock);
  });

  it('/DELETE regions', async () => {
    const deletedEntity: RegionDTO = (
      await request(app.getHttpServer())
        .delete('/api/regions/' + entityMock.id)
        .expect(204)
    ).body;

    expect(deletedEntity).toEqual({});
  });

  afterEach(async () => {
    await app.close();
  });
});
