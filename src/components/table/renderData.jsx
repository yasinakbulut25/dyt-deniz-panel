import { isValidElement } from "react";
import Chip from "../chip";
import TableActions from "./TableActions";
import { LANDING_BASE_URL } from "@/app/layout";

export const renderData = (item, columnKey, columnType) => {
  const cellValue = item[columnKey];

  if (isValidElement(cellValue)) {
    return cellValue;
  }

  switch (columnType) {
    case "chip":
      return <Chip item={cellValue} />;
    case "action":
      return <TableActions item={item} cellValue={cellValue} />;
    case "image":
      return (
        <img
          className="rounded-sm"
          src={`${LANDING_BASE_URL}${cellValue}`}
          width={75}
          height={75}
          alt={cellValue}
        />
      );
    default:
      return (
        <p className="w-auto text-sm text-black dark:text-dark-50">
          {cellValue}
        </p>
      );
  }
};
