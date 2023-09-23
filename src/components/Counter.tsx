import { FC, useState } from "react";
import styles from "./Counter.module.scss";

export const Counter: FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={styles.counter}>
      <div onClick={() => setCount((p) => p + 1)}>Counter</div>
      <div>{count}</div>
    </div>
  );
};
