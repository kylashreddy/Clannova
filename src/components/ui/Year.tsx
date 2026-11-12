import { cacheLife } from "next/cache";

// Cached so the static shell can include the current year and refresh it daily.
export async function Year() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
