import DefaultLayout from "@/components/layout";

export const metadata = {
  title: "Dashboard",
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
        <p className="text-gray-700 text-3xl mb-16 font-bold pl-[50px] pt-[12px]">
          Dashboard
        </p>

        <div className="grid lg:grid-cols-3 gap-5 mb-16">
          <div className="rounded bg-white h-40 shadow-sm"></div>
          <div className="rounded bg-white h-40 shadow-sm"></div>
          <div className="rounded bg-white h-40 shadow-sm"></div>
        </div>
        <div className="grid col-1 bg-white h-96 shadow-sm"></div>
      </DefaultLayout>
    </>
  );
}
