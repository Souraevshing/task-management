import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerConfigService } from './swagger-config.service';

describe('SwaggerConfigService', () => {
  let service: SwaggerConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SwaggerConfigService],
    }).compile();

    service = module.get<SwaggerConfigService>(SwaggerConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
