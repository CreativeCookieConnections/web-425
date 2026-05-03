import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuildComponent } from './guild.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('GuildComponent', () => {
  let component: GuildComponent;
  let fixture: ComponentFixture<GuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuildComponent, ReactiveFormsModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should prevent submission if the form is invalid', () => {
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    expect(component.guildForm.valid).toBeFalsy();
  });

  it('form should be valid when all fields are filled', () => {
    component.guildForm.controls['name'].setValue('Test Guild');
    component.guildForm.controls['description'].setValue('A test guild for testing purposes.');
    component.guildForm.controls['type'].setValue('Public');
    component.guildForm.controls['acceptTerms'].setValue(true);
    component.guildForm.controls['notificationPreference'].setValue('email');
    expect(component.guildForm.valid).toBeTruthy();
  });

  it('form should be invalid when required fields are not filled', () => {
    component.guildForm.controls['name'].setValue('');
    component.guildForm.controls['description'].setValue('');
    component.guildForm.controls['type'].setValue('');
    component.guildForm.controls['acceptTerms'].setValue(false);
    component.guildForm.controls['notificationPreference'].setValue('');
    expect(component.guildForm.valid).toBeFalsy();
  });

  it('should call createGuild when the form submit with valid data', () => {
    const createGuildSpy = spyOn(component, 'createGuild');
    component.guildForm.controls['name'].setValue('Test Guild');
    component.guildForm.controls['description'].setValue('A test guild for testing purposes.');
    component.guildForm.controls['type'].setValue('Public');
    component.guildForm.controls['acceptTerms'].setValue(true);
    component.guildForm.controls['notificationPreference'].setValue('email');
    
    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    submitButton.nativeElement.click();
    
    expect(createGuildSpy).toHaveBeenCalled();
  });
});