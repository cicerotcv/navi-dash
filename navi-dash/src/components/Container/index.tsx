import { ReactNode } from "react";
import { Header } from "../Header";
import styles from "./Container.module.css";

interface IContainerProps {
  children: ReactNode;
  className?: string;
}
export function Container({ children, className }: IContainerProps) {
  return (
    <main className={`${styles.outer} ${className}`}>
      <Header />
      <div className={styles.inner}>{children}</div>
    </main>
  );
}
