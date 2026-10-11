import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  return (
    <Link
      className="flex flex-col items-center gap-x-8 gap-y-4 sm:flex-row"
      href="/"
      aria-label="Swellbeing home page"
    >
      <div className="relative w-2xs h-60">
        <Image
          src="/images/swellbeing-logo.png"
          alt="Swellbeing logo"
          loading="eager"
          fill
          className="object-contain"
        />
      </div>
      <div className="text-6xl">
        <strong>Swellbeing</strong>
      </div>
    </Link>
  );
}
