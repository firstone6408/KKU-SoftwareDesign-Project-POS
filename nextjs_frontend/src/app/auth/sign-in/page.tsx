import AuthContainer from "@/features/auth/components/auth-container";
import { LoginForm } from "@/features/auth/components/login-form";

export default function SignInPage() {
  return (
    <AuthContainer type={"signIn"}>
      <LoginForm />
    </AuthContainer>
  );
}
