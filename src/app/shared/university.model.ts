export class University {
  public "state-province": string;
  public country: string;
  public name: string;
  // public web_pages: string[];
  // public domains: string[];
  // public alpha_two_code: string;
  
  public isFavourite: boolean = false;

  constructor(state_province: string, country: string, name: string) {
    this["state-province"] = state_province;
    this.country = country;
    this.name = name;
  }
}