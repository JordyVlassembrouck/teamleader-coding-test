import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationsContainer } from './notifications.container';
import { NotificationService, Notification, NotificationType } from '../../../services/notifications/notification.service';
import { of } from 'rxjs/internal/observable/of';
import { Subject } from 'rxjs/internal/Subject';

const NOTIFICATIONS: Notification[] = [{ id: 1, text: 'test', type: NotificationType.Success}];


describe('NotificationsContainer', () => {
  let container: NotificationsContainer;
  let fixture: ComponentFixture<NotificationsContainer>;
  let notificationServiceMock = jasmine.createSpyObj(NotificationService, [
    'remove',
    'notifications$'
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationsContainer],
      providers: [
        { provide: NotificationService, useValue: notificationServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationsContainer);
    container = fixture.componentInstance;
    
    notificationServiceMock.notifications$ = new Subject<Notification>();
  });
  
  describe('#ngOnInit', () => {
    it('should subscribe to the notifications$ observable', () => {
      // given
      expect(container.notifications).toEqual([]);
      
      // when
      container.ngOnInit();
      notificationServiceMock.notifications$.next(NOTIFICATIONS);

      // then
      expect(container.notifications).toEqual(NOTIFICATIONS);
    });
  });

  describe('#removeNotification', () => {
    it('should call the remove function on the notificationService with the given notificationId', () => {
      // given

      // when
      fixture.detectChanges();
      container.removeNotification(1);

      // then
      expect(notificationServiceMock.remove).toHaveBeenCalledWith(1);
    });
  });
});
