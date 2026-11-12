import Image from "next/image";
import { cn } from "@/lib/cn";

type Props = {
  /** "lockup" = icon + wordmark (navigation), "full" = official stacked logo, "icon" = mark only */
  variant?: "lockup" | "full" | "icon";
  className?: string;
  priority?: boolean;
};

// Renders the official CLANNOVA artwork. Assets are derived from the supplied
// logo by scripts/prepare-logo.mjs; proportions are always preserved.
export function Logo({ variant = "lockup", className, priority }: Props) {
  if (variant === "full") {
    return (
      <Image
        src="/assets/clannova-logo.png"
        alt="CLANNOVA — Build Beyond Limits."
        width={976}
        height={690}
        priority={priority}
        sizes="(min-width: 768px) 360px, 70vw"
        className={cn("h-auto w-full", className)}
      />
    );
  }
  if (variant === "icon") {
    return (
      <Image
        src="/assets/clannova-icon.png"
        alt="CLANNOVA"
        width={512}
        height={512}
        priority={priority}
        sizes="64px"
        className={cn("h-auto w-full", className)}
      />
    );
  }
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Image src="/assets/clannova-icon.png" alt="" width={512} height={512} priority={priority} sizes="44px" className="size-10 sm:size-11" />
      <Image
        src="/assets/clannova-wordmark.png"
        alt="CLANNOVA"
        width={944}
        height={116}
        priority={priority}
        sizes="140px"
        className="h-auto w-[112px] sm:w-[132px]"
      />
    </span>
  );
}
