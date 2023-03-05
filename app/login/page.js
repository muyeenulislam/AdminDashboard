import LoginPage from "@/components/login/login";

export const metadata = {
  title: "EZ Wage Login",
  icons: {
    icon: [
      { url: "/q7ypw0Q/ezwage-logo.jpg" },
      new URL("/q7ypw0Q/ezwage-logo.jpg", "https://i.ibb.co"),
    ],
  },
};

export default function Login() {
  return <LoginPage />;
}
