import { University } from "./university.model";

export namespace Favourites {
  export class Clear {
    static readonly type = '[Favourites] Clear Favourites';
  }

  export class Add {
    static readonly type = '[Favourites] Add Favourite';
    constructor(public university: University) {}
  }

  export class Remove {
    static readonly type = '[Favourites] Remove Favourite';
    constructor(public university: University) {}
  }
}
