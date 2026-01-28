import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotFoundDialog } from './email-not-found-dialog';

describe('EmailNotFoundDialog', () => {
  let component: EmailNotFoundDialog;
  let fixture: ComponentFixture<EmailNotFoundDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailNotFoundDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailNotFoundDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
