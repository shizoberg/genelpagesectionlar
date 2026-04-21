export default function UrgencyBar() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-primary to-primary-medium text-primary-foreground text-center py-3 px-4 text-[13px] font-semibold tracking-wide">
      <span>⚡ Bugün sipariş ver, yarın kargoda — ücretsiz kargo</span>
      <div className="urg-shimmer" />
    </div>
  );
}
