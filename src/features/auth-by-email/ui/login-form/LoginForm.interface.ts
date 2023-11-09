export interface ILoginFormProps extends React.HTMLAttributes<HTMLDivElement> {
  onLoginSuccess: () => void;
  onLoginStart?: () => void;
}
