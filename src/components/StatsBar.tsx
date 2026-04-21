import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 2400, suffix: "+", label: "Mutlu kullanıcı" },
  { value: 5.0, suffix: "", label: "Ortalama puan", decimal: true },
  { value: 90, suffix: "+", label: "Doğrulanmış yorum" },
  { value: 92, suffix: "%", label: "Tekrar satın alma" },
];

function useAnimatedCounter(target: number, duration = 1800, decimal = false) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - t, 3);
            setCount(decimal ? +(target * ease).toFixed(1) : Math.floor(target * ease));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration, decimal]);

  return { count, ref };
}

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  decimal?: boolean;
  delay?: string;
}

function StatItem({ value, suffix, label, decimal, delay }: StatItemProps) {
  const { count, ref } = useAnimatedCounter(value, 1800, decimal);
  return (
    <div ref={ref} className={`k5-reveal ${delay ?? ""}`}>
      <div className="text-[40px] font-extrabold text-primary-foreground leading-tight tracking-tight">
        {decimal ? count.toFixed(1) : count.toLocaleString("tr-TR")}
        {suffix}
      </div>
      <div className="text-[13px] text-primary-foreground/70 font-medium mt-1">{label}</div>
    </div>
  );
}

export default function StatsBar() {
  return (
    <section className="bg-gradient-to-br from-primary to-primary-medium py-12 mt-12">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-5 text-center">
          {stats.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i > 0 ? `d${i}` : ""} />
          ))}
        </div>
      </div>
    </section>
  );
}
