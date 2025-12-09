import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchStore } from '../../../core/store/search.store';
import { SearchBarComponent } from './search-bar';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;
  let mockSearchStore: Record<string, unknown>;

  beforeEach(async () => {
    mockSearchStore = {
      clearSearch: jasmine.createSpy('clearSearch'),
      isLoading: signal(false),
      query: signal(''),
      results: signal([]),
      search: jasmine.createSpy('search')
    };

    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
      providers: [{ provide: SearchStore, useValue: mockSearchStore }]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call search store on input', (done) => {
    component['searchControl'].setValue('test');
    setTimeout(() => {
      expect(mockSearchStore['search']).toHaveBeenCalledWith('test');
      done();
    }, 600); // 500ms debounce
  });
});
