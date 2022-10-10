import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  isBrowser: Boolean;
  isServer: Boolean;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private transferState: TransferState
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
    this.isServer = isPlatformServer(platformId);
  }

  saveState<T>(key: string, data: any): void {
    this.transferState.set<T>(makeStateKey(key), data);
  }

  getState<T>(key: string, defaultValue: any = []): T {
    const state = this.transferState.get<T>(makeStateKey(key), defaultValue);
    this.deleteState(key);
    return state;
  }

  hasState<T>(key: string): boolean {
    return this.transferState.hasKey<T>(makeStateKey(key));
  }

  deleteState<T>(key: string): void {
    this.transferState.remove<T>(makeStateKey(key));
  }

  async loadState<T>(promise: Promise<T>, key: string): Promise<T> {
    if (this.isBrowser && this.hasState<T>(key)) {
      return this.getState<T>(key);
    }
    const data = await promise;
    if (this.isServer) {
      this.saveState<T>(key, data);
    }
    return data;
  }
}
