import { FC } from "react";
import { classNames } from "shared/lib/class-names";
import styles from "./SheetsPage.module.scss";

const SheetsPage: FC = () => {
  return (
    <div className={classNames(styles.sheets_page, {}, ["page"])}>
      SheetsPage
    </div>
  );
};

export default SheetsPage;
