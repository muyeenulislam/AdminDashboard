import DefaultLayout from "@/components/layout";
import Dashboard from "@/components/home/home";

export const metadata = {
  title: "Ez Wage",
  icons: {
    icon: [
      { url: "/q7ypw0Q/ezwage-logo.jpg" },
      new URL("/q7ypw0Q/ezwage-logo.jpg", "https://i.ibb.co"),
    ],
  },
};
export default function Home() {
  return (
    <>
      <DefaultLayout>
        <Dashboard />
      </DefaultLayout>
    </>
  );
}
