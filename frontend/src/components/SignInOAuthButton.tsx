import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAuthButton = () => {
    const { signIn, isLoaded } = useSignIn();

    if(!isLoaded) {
        return null;
    }

    const signInWithGoogle = () => {
        signIn.authenticateWithRedirect({
            strategy: "oauth_google",
            redirectUrl: "/sso-callback",
            redirectUrlComplete: "/auth-callback",
        });
    };
  return (
    <Button onClick={signInWithGoogle} className=" w-auto text-white border-zinc-200 h-11" variant={"secondary"}>
      <img src="https://www.transparentpng.com/thumb/google-logo/colorful-google-logo-transparent-clipart-download-u3DWLj.png" alt="Google" className="size-5" />
      Continue with Google
    </Button>
  )
}

export default SignInOAuthButton