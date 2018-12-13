import { TestBed } from '@angular/core/testing';

import { TemplateQueriesService } from './template-queries.service';

describe('TemplateQueriesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TemplateQueriesService = TestBed.get(TemplateQueriesService);
    expect(service).toBeTruthy();
  });
});
