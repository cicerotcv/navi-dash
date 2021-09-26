import { ReactNode } from 'react';
import styles from './Section.module.css';

interface ISectionProps {
  children?: ReactNode;
  className?: string;
}

export function Section({ children, className }: ISectionProps) {
  return (
    <section className={`${styles.wrapper} ${className}`}>{children}</section>
  );
}
