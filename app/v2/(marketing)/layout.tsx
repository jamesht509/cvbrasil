import { MarketingHeader } from "@/components/v2/MarketingHeader";
import { MarketingFooter } from "@/components/v2/MarketingFooter";

export default function MarketingLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <MarketingHeader />
      <main className="relative overflow-hidden">{children}</main>
      <MarketingFooter />
    </>
  );
}
