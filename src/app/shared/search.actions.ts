export namespace Search {
  export class Country {
    static readonly type = '[Search] Set Country';
    constructor(public country: string) {}
  }

  export class SchoolName {
    static readonly type = '[Search] Set School Name';
    constructor(public schoolName: string) {}
  }
}
