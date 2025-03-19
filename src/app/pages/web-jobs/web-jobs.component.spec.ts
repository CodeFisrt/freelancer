import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebJobsComponent } from './web-jobs.component';

describe('WebJobsComponent', () => {
  let component: WebJobsComponent;
  let fixture: ComponentFixture<WebJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebJobsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
