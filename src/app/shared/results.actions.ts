import { University } from "./university.model";

export namespace Results {
  export class Clear {
    static readonly type = '[Results] Clear Results';
  }

  export class Found {
    static readonly type = '[Favourites] Found Universities';
    constructor(public universities: University[]) {}
  }
}
