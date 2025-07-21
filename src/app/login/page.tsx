import LoginForm from "@/components/LoginForm";
import { Separator } from "@/components/ui/separator";

export default function SignInPage() {
  return (
    <div className="h-full flex items-center justify-center">
      <div>
        <h2 className="text-2xl text-center font-semibold mb-6 text-blue-800">
          Geetask
          <Separator className="mt-2" />
        </h2>

        <LoginForm />

        <p className="text-sm mt-2 text-center font-semibold text-gray-900">
          © {new Date().getFullYear()} Geetask. All rights reserved.
        </p>
      </div>
    </div>
  );
}
