// ! FIX
export class URLHelper {
  private url: URL;
  private static instance: URLHelper | null = null;

  private constructor(url: string) {
    this.url = new URL(url);
  }

  static getInstance(url: string): URLHelper {
    if (!this.instance) {
      this.instance = new URLHelper(url);
    }
    return this.instance;
  }

  getParam(name: string): string | null {
    return this.url.searchParams.get(name);
  }

  setParam(name: string, value: string): void {
    this.url.searchParams.set(name, value);
    this.saveChanges();
  }

  removeParam(name: string): void {
    this.url.searchParams.delete(name);
    this.saveChanges();
  }

  joinPaths(...paths: string[]): void {
    const joinedPath = paths.map((path) => path.trim()).join('/');
    this.url.pathname = joinedPath;
    this.saveChanges();
  }

  saveChanges(): void {
    const newURL = this.url.toString();
    history.pushState(null, '', newURL);
  }

  toString(): string {
    return this.url.toString();
  }
}
