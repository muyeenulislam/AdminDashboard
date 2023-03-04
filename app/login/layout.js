export const metadata = {
  title: "EZ Wage Login",
  icons: {
    icon: [
      { url: "/q7ypw0Q/ezwage-logo.jpg" },
      new URL("/q7ypw0Q/ezwage-logo.jpg", "https://i.ibb.co"),
    ],
  },
};

export default function LoginLayout({ children }) {
  return (
    <main>
      <div className="w-full h-16 flex justify-end items-center transition-all duration-[400ms] text-black mb-16 font-medium">
        <ul className="flex">
          <li className="pl-4 pr-4">Contact Us</li>
          <li className="pl-4 pr-4">Features</li>
          <li className="pl-4 pr-4">Learn More</li>
        </ul>
      </div>
      <div>{children}</div>
    </main>
  );
}
