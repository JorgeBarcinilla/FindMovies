import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabSwitcherComponent } from './tab-switcher';

describe('TabSwitcherComponent', () => {
  let component: TabSwitcherComponent;
  let fixture: ComponentFixture<TabSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabSwitcherComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TabSwitcherComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('tabs', [{ label: 'Tab 1', value: 'tab1' }]);
    fixture.componentRef.setInput('activeTab', 'tab1');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit tab change', () => {
    let emittedValue: string | undefined;
    component.tabChange.subscribe((value) => (emittedValue = value));
    component['onTabClick']('tab2');
    expect(emittedValue).toBe('tab2');
  });
});
