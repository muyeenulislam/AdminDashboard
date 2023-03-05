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

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "./globals.css";

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
            <main>
              <TransactionContextProvider value={[]}>
                <main>
                  <EmployeeContextProvider value={employee}>
                    <main className={poppins.className}>{children}</main>
                  </EmployeeContextProvider>
                </main>
              </TransactionContextProvider>
            </main>
          </UserContext.Provider>
        </main>
      </body>
    </html>
  );
}
