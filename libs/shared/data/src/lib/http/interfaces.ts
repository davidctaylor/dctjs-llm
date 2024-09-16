export enum FetchState {
  ACTIVE,
  ERROR,
  IDLE,
}

export interface FetchResponse {
  state: FetchState;
  errorStatusCode?: number
  errorStatusText?: string;
}
