import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { userService } from "../services";

// Custom hook to read  auth record and user profile doc
export function useUserData() {
  const user = userService.userValue;
  const [company, setCompany] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;
    if (user) {
      setCompany({ ...userService.userValue });
    } else {
      if (pathname != "/signup") {
        router.push("/login");
      }
    }

    return unsubscribe;
  }, [user]);
  return { user, company };
}
