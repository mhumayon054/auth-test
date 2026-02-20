import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerHref: string;
};

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerHref,
}: Props) {
  return (
    <div className="w-full mx-auto max-w-[420px] rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 shadow-[0_10px_30px_rgba(0,0,0,0.06)]">
      <h1 className="text-2xl font-semibold tracking-tight text-[var(--foreground)]">
        {title}
      </h1>

      <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>

      <div className="mt-6">{children}</div>

      <p className="mt-6 text-center text-sm text-[var(--muted)]">
        {footerText}{" "}
        <Link href={footerHref} className="font-medium text-[var(--foreground)] hover:underline">
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}