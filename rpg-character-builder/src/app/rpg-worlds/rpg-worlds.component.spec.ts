import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RpgWorldsComponent } from './rpg-worlds.component';

describe('RpgWorldsComponent', () => {
  let component: RpgWorldsComponent;
  let fixture: ComponentFixture<RpgWorldsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RpgWorldsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RpgWorldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
