import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblLogin } from './tbl-login';

describe('TblLogin', () => {
  let component: TblLogin;
  let fixture: ComponentFixture<TblLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TblLogin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TblLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
