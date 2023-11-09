export interface ILoginSchema {
  email: string;
  password: string;
  isLoading: boolean;
  error?: string | null;
}
