import { Test, TestingModule } from '@nestjs/testing';
import { MurmursController } from './murmurs.controller';
import { MurmursService } from './murmurs.service';

describe('MurmursController', () => {
  let controller: MurmursController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MurmursController],
      providers: [MurmursService],
    }).compile();

    controller = module.get<MurmursController>(MurmursController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
