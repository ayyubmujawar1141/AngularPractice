import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpService } from './otp-service';

describe('OtpService', () => {
  let component: OtpService;
  let fixture: ComponentFixture<OtpService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtpService);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
