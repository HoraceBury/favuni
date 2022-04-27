export class University {
  public "state-province": string;
  public country: string;
  public name: string;
  public web_pages: string[];
  public domains: string[];
  public alpha_two_code: string;

  public isFavourite: boolean = false;

  constructor(state_province: string, country: string, name: string, web_pages: string[], domains: string[], alpha: string) {
    this["state-province"] = state_province;
    this.country = country;
    this.name = name;

    this.web_pages = web_pages;
    this.domains = domains;
    this.alpha_two_code = alpha;
  }
}