import { ShoppingCart } from "lucide-react";

interface StickyCartBarProps {
  visible: boolean;
  price?: number;
  loading?: boolean;
  onAdd?: () => void;
}

export default function StickyCartBar({ visible, price = 3500, loading = false, onAdd }: StickyCartBarProps) {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[100] bg-card border-t border-primary/[0.08] py-2.5 px-4 flex items-center justify-center gap-3 shadow-[0_-4px_24px_rgba(0,0,0,0.08)] transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={onAdd}
        disabled={loading}
        className="flex-1 max-w-[360px] flex flex-col items-center justify-center gap-0.5 bg-primary text-primary-foreground py-2.5 px-6 rounded-full min-h-[52px] transition-all hover:bg-primary-medium relative overflow-hidden disabled:opacity-60"
      >
        <span className="text-[14px] font-bold leading-tight flex items-center gap-1.5">
          {loading ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <ShoppingCart size={16} />
          )}
          .ki Balance — Sepete Ekle
        </span>
        <span className="text-[11px] font-medium opacity-90 leading-tight">
          ₺{price.toLocaleString("tr-TR")} · 30 günlük kullanım
        </span>
      </button>
    </div>
  );
}
