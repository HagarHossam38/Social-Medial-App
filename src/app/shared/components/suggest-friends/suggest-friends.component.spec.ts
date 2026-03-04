import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestFriendsComponent } from './suggest-friends.component';

describe('SuggestFriendsComponent', () => {
  let component: SuggestFriendsComponent;
  let fixture: ComponentFixture<SuggestFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuggestFriendsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
