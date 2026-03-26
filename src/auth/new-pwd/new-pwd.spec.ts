import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPwd } from './new-pwd';

describe('NewPwd', () => {
  let component: NewPwd;
  let fixture: ComponentFixture<NewPwd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPwd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPwd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
