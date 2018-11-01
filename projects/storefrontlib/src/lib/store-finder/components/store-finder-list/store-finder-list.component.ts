import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as fromStore from '../../store';
import { SearchConfig } from '../../models/search-config';
import { SearchQuery } from '../../models/search-query';
import { ActivatedRoute } from '@angular/router';
import { StoreFinderService } from '../../services';

@Component({
  selector: 'y-store-finder-new-list',
  templateUrl: './store-finder-list.component.html',
  styleUrls: ['./store-finder-list.component.scss']
})
export class StoreFinderListComponent implements OnInit {
  locations: any;
  searchQuery: SearchQuery;
  locations$: Observable<any>;
  isLoading$: Observable<any>;
  searchConfig: SearchConfig = {
    currentPage: 0
  };

  constructor(
    private store: Store<fromStore.StoresState>,
    private storeFinderService: StoreFinderService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(() => this.initialize());
  }

  viewPage(pageNumber: number) {
    this.searchConfig = { ...this.searchConfig, currentPage: pageNumber };
    this.store.dispatch(
      new fromStore.FindStores({
        queryText: this.searchQuery.queryText,
        longitudeLatitude: this.searchQuery.longitudeLatitude,
        searchConfig: this.searchConfig
      })
    );
  }

  private initialize() {
    this.searchQuery = this.parseParameters(this.route.snapshot.queryParams);
    this.storeFinderService.findStores(
      this.searchQuery.queryText,
      this.searchQuery.longitudeLatitude
    );

    this.isLoading$ = this.store.pipe(select(fromStore.getStoresLoading));
    this.locations$ = this.store.pipe(select(fromStore.getFindStoresEntities));
  }

  private parseParameters(queryParams: { [key: string]: any }): SearchQuery {
    let searchQuery: SearchQuery;

    if (queryParams.query) {
      searchQuery = { queryText: queryParams.query };
    } else {
      searchQuery = { queryText: '' };
    }

    if (queryParams.latitude && queryParams.longitude) {
      searchQuery.longitudeLatitude = {
        latitude: queryParams.latitude,
        longitude: queryParams.longitude
      };
    }

    return searchQuery;
  }
}
