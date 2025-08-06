import { Test, TestingModule } from '@nestjs/testing';
import { MurmursService } from './murmurs.service';

describe('MurmursService', () => {
  let service: MurmursService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MurmursService],
    }).compile();

    service = module.get<MurmursService>(MurmursService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
