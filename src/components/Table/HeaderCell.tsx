import { flexRender, Header } from "@tanstack/react-table";
import {
  SButtonHeaderContainer,
  SHeaderContainer,
  STH,
  StyledArrowHeaderDown,
  StyledArrowHeaderUp,
} from "./styledTable";
import type { FormatedDataType } from "./fakeData";
const HeaderCell = ({
  header,
}: {
  header: Header<FormatedDataType, unknown>;
}) => {
  const isSortable = header.column.getCanSort();

  const ascOrDesc = {
    asc: " 🔼",
    desc: " 🔽",
  }[header.column.getIsSorted() as string];
  const isAsc = ascOrDesc === " 🔼";
  const isDesc = ascOrDesc === " 🔽";
  return (
    <STH key={header.id}>
      {header.isPlaceholder ? null : (
        <SHeaderContainer aria-hidden>
          {flexRender(header.column.columnDef.header, header.getContext())}
          <SButtonHeaderContainer>
            <StyledArrowHeaderUp
              onClick={header.column.getToggleSortingHandler()}
              disabled={isDesc}
              role={isSortable ? "button" : undefined}
            />

            <StyledArrowHeaderDown
              onClick={header.column.getToggleSortingHandler()}
              disabled={isAsc}
              role={isSortable ? "button" : undefined}
            />
          </SButtonHeaderContainer>
        </SHeaderContainer>
      )}
    </STH>
  );
};
export default HeaderCell;
