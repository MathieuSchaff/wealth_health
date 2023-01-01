import { flexRender, Header } from "@tanstack/react-table";
import { STH } from "./styledTable";
import type { FormatedDataType } from "./UsersTable";
const HeaderCell = ({
  header,
}: {
  header: Header<FormatedDataType, unknown>;
}) => {
  const isSortable = header.column.getCanSort();
  //   if (isSortable) {
  //   console.log("isSorted", header.column.getIsSorted());
  console.log(
    {
      asc: " 🔼",
      desc: " 🔽",
    }[header.column.getIsSorted() as string]
  );
  //   }
  const ascOrDesc = {
    asc: " 🔼",
    desc: " 🔽",
  }[header.column.getIsSorted() as string];
  const isAsc = ascOrDesc === " 🔼";
  const isDesc = ascOrDesc === " 🔽";
  return (
    <STH key={header.id}>
      {header.isPlaceholder ? null : (
        <div role={isSortable ? "button" : undefined} aria-hidden>
          {flexRender(header.column.columnDef.header, header.getContext())}
          <button
            onClick={header.column.getToggleSortingHandler()}
            disabled={isDesc}
          >
            {" "}
            🔼
          </button>
          <button
            onClick={header.column.getToggleSortingHandler()}
            disabled={isAsc}
          >
            {" "}
            🔽
          </button>
        </div>
      )}
    </STH>
  );
};
export default HeaderCell;
