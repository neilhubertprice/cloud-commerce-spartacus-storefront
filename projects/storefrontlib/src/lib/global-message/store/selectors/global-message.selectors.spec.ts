import { Store, StoreModule, combineReducers } from '@ngrx/store';

import * as fromRoot from './../../../routing/store';
import * as fromReducers from './../reducers';
import * as fromSelectors from './../selectors';
import * as fromActions from './../actions';
import { TestBed } from '@angular/core/testing';

import { GlobalMessage, GlobalMessageType } from '../../models/message.model';

fdescribe('Global Messages selectors', () => {
  let store: Store<fromReducers.GlobalMessageState>;

  const testMessage: GlobalMessage = {
    text: 'test',
    type: GlobalMessageType.MSG_TYPE_CONFIRMATION
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot({
          ...fromRoot.reducers,
          globalMessage: combineReducers(fromReducers.reducers)
        })
      ]
    });

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  describe('getGlobalMessagesActiveState', () => {
    it('should return the global Message active state', () => {
      let result: any;
      store
        .select(fromSelectors.getGlobalMessagesActiveState)
        .subscribe(value => (result = value));

      expect(result).toEqual({ entities: {} });
    });
  });

  describe('getGlobalMessages', () => {
    it('should return the list of global messages', () => {
      let result: any;
      store.select(fromSelectors.getGlobalMessages).subscribe(value => {
        result = value;
      });

      expect(result).toEqual({});

      store.dispatch(new fromActions.AddMessage(testMessage));

      expect(result).toEqual({
        [testMessage.type]: [testMessage.text]
      });
    });
  });
});
