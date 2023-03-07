"use client";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

import { UserContext } from "../lib/context";
import { EmployeeContextProvider } from "../lib/employeeContext";
import { useUserData } from "../lib/hooks";
import { TransactionContextProvider } from "../lib/transactionContext";
import Loading from "./loading";

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./globals.css";
import { Suspense } from "react";

export const metadata = {
  title: "Ezwage",
  description: "ezwage portal",
};

export default function RootLayout({ children }) {
  const userData = useUserData();
  const employee = [];

  return (
    <html lang="en">
      <body>
        <main>
          <UserContext.Provider
            value={{ user: userData.user, company: userData.company }}
          >
            <TransactionContextProvider value={[]}>
              <EmployeeContextProvider value={employee}>
                <Suspense fallback={<Loading />}>
                  <main className={poppins.className}>{children}</main>
                </Suspense>
              </EmployeeContextProvider>
            </TransactionContextProvider>
          </UserContext.Provider>
        </main>
      </body>
    </html>
  );
}
