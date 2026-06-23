import React, { useEffect, useRef } from 'react';
import { stats } from '../data/products';
import './StatsSection.css';

const useCountUp = (target, isVisible) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (!isVisible) return;
    const numTarget = parseInt(target.replace(/[^0-9]/g, ''));
    if (!numTarget) return;

    let start = 0;
    const duration = 2000;
    const step = numTarget / (duration / 16);

    const timer = setInterval(() => {
      start += step;
      if (start >= numTarget) {
        setCount(numTarget);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isVisible, target]);

  return count;
};

const StatItem = ({ stat, isVisible }) => {
  const count = useCountUp(stat.value, isVisible);
  const hasPlus = stat.value.includes('+');
  const isText = isNaN(parseInt(stat.value)) || stat.value.includes('L');

  return (
    <div className="stat-item" aria-label={`${stat.value} ${stat.label}`}>
      <div className="stat-item-icon" aria-hidden="true">{stat.icon}</div>
      <div className="stat-item-value">
        {isText ? stat.value : (
          <>
            {count.toLocaleString()}{hasPlus ? '+' : ''}
          </>
        )}
      </div>
      <div className="stat-item-label">{stat.label}</div>
    </div>
  );
};

const StatsSection = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = React.useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={sectionRef} aria-labelledby="stats-title">
      <div className="stats-inner">
        <div className="stats-bg-line" aria-hidden="true" />

        <div className="container">
          <h2 id="stats-title" className="visually-hidden">Company Statistics</h2>
          <div className="stats-grid" role="list">
            {stats.map((stat, i) => (
              <div key={i} role="listitem">
                <StatItem stat={stat} isVisible={isVisible} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
