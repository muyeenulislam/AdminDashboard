"use client";

import { useUserData } from "../../lib/hooks";

export default function Login() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <div>the left side</div>
      <div>
        <form>
          <h2>Sign In</h2>
        </form>
      </div>
    </div>
  );
}
