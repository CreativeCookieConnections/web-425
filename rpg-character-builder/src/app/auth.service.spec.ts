import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';

describe('AuthService', () => {
  let service: AuthService;
  let cookieServiceSpy: jasmine.SpyObj<CookieService>;
  beforeEach(() => {
    const spy = jasmine.createSpyObj('CookieService', ['set', 'deleteAll']);
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: CookieService, useValue: spy }
      ]
    });
    service = TestBed.inject(AuthService);
    cookieServiceSpy = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set cookie and authState to true on successful sign in', (done) => {
    const result = service.signin('giggleflowers@testing.com', 'Trusthonesty202');
    expect(result).toBeTrue();
    expect(cookieServiceSpy.set.calls.count()).toBe(1);
    
    service.getAuthState().subscribe(state => {
      expect(state).toBeTrue();
      done();
    });
  });

  it('should not set cookie and authState to true on unsuccessful sign in', (done) => {
    const result = service.signin('wrongemail', 'wrongpassword');
    expect(result).toBeFalse();
    expect(cookieServiceSpy.set.calls.count()).toBe(0);
    
    service.getAuthState().subscribe(state => {
      expect(state).toBeFalse();
      done();
    });
  });

});
