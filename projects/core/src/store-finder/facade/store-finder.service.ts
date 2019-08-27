import { Injectable } from '@angular/core';
import { Action, select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GeoPoint } from '../../model/misc.model';
import { WindowRef } from '../../window/window-ref';
import { StoreFinderActions } from '../store/actions/index';
import { StoreFinderSelectors } from '../store/selectors/index';
import {
  FindStoresState,
  StateWithStoreFinder,
  ViewAllStoresState,
} from '../store/store-finder-state';
import { StoreFinderSearchConfig } from './../model/search-config';

@Injectable()
export class StoreFinderService {
  private geolocationWatchId: number = null;

  constructor(
    protected store: Store<StateWithStoreFinder>,
    protected winRef: WindowRef
  ) {}

  /**
   * Returns boolean observable for store's loading state
   */
  getStoresLoading(): Observable<boolean> {
    return this.store.pipe(select(StoreFinderSelectors.getStoresLoading));
  }

  /**
   * Returns observable for store's entities
   */
  getFindStoresEntities(): Observable<FindStoresState> {
    return this.store.pipe(select(StoreFinderSelectors.getFindStoresEntities));
  }

  /**
   * Returns boolean observable for view all store's loading state
   */
  getViewAllStoresLoading(): Observable<boolean> {
    return this.store.pipe(
      select(StoreFinderSelectors.getViewAllStoresLoading)
    );
  }

  /**
   * Returns observable for view all store's entities
   */
  getViewAllStoresEntities(): Observable<ViewAllStoresState> {
    return this.store.pipe(
      select(StoreFinderSelectors.getViewAllStoresEntities)
    );
  }

  /**
   * Store finding action functionality
   * @param queryText text query
   * @param searchConfig search configuration
   * @param longitudeLatitude longitude and latitude coordinates
   * @param countryIsoCode country ISO code
   * @param useMyLocation current location coordinates
   */
  findStoresAction(
    queryText: string,
    searchConfig?: StoreFinderSearchConfig,
    longitudeLatitude?: GeoPoint,
    countryIsoCode?: string,
    useMyLocation?: boolean
  ) {
    if (useMyLocation && this.winRef.nativeWindow) {
      this.clearWatchGeolocation(new StoreFinderActions.FindStoresOnHold());
      this.geolocationWatchId = this.winRef.nativeWindow.navigator.geolocation.watchPosition(
        (pos: Position) => {
          const position: GeoPoint = {
            longitude: pos.coords.longitude,
            latitude: pos.coords.latitude,
          };

          this.clearWatchGeolocation(
            new StoreFinderActions.FindStores({
              queryText: queryText,
              searchConfig: searchConfig,
              longitudeLatitude: position,
              countryIsoCode: countryIsoCode,
            })
          );
        }
      );
    } else {
      this.clearWatchGeolocation(
        new StoreFinderActions.FindStores({
          queryText: queryText,
          searchConfig: searchConfig,
          longitudeLatitude: longitudeLatitude,
          countryIsoCode: countryIsoCode,
        })
      );
    }
  }

  /**
   * View all stores
   */
  viewAllStores() {
    this.clearWatchGeolocation(new StoreFinderActions.ViewAllStores());
  }

  /**
   * View all stores by id
   * @param storeId store id
   */
  viewStoreById(storeId: string) {
    this.clearWatchGeolocation(
      new StoreFinderActions.FindStoreById({ storeId })
    );
  }

  private clearWatchGeolocation(callbackAction: Action) {
    if (this.geolocationWatchId !== null) {
      this.winRef.nativeWindow.navigator.geolocation.clearWatch(
        this.geolocationWatchId
      );
      this.geolocationWatchId = null;
    }
    this.store.dispatch(callbackAction);
  }
}
