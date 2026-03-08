import React from 'react';

interface CountUpProps {
    to: number;
    suffix?: string;
    duration?: number;
}

const CountUp = ({ to, suffix = '', duration = 1800 }: CountUpProps) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef<HTMLDivElement>(null);
    const started = React.useRef(false);

    React.useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started.current) {
                    started.current = true;
                    const start = performance.now();
                    const tick = (now: number) => {
                        const elapsed = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out cubic
                        const eased = 1 - Math.pow(1 - progress, 3);
                        setCount(Math.round(eased * to));
                        if (progress < 1) requestAnimationFrame(tick);
                    };
                    requestAnimationFrame(tick);
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [to, duration]);

    return <div ref={ref}>{count}{suffix}</div>;
};

export default CountUp;
