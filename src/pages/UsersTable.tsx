import React, { useMemo } from "react";
import { useUsersStore } from "../zustandStore";
import type { FormSchema } from "../components/ZodForm.tsx/ZodForm";
import HeaderCell from "./HeaderCell";
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
  createColumnHelper,
  SortingState,
  CellContext,
} from "@tanstack/react-table";
import { format } from "date-fns";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import {
  DivContainerTable,
  STable,
  STBody,
  STBodyTR,
  STD,
  STH,
  STHead,
  STHeadTR,
} from "./styledTable";
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
export type FormatedDataType = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  startDate: string;
  street: string;
  city: string;
  state: string;
  zipCode: number;
  department: string;
};
const defaultData: FormatedDataType[] = [
  {
    firstName: "tanner",
    lastName: "linsley",
    city: "oslo",
    dateOfBirth: format(new Date(2010, 10, 10), "dd-mm-yyy"),
    department: "rea",
    startDate: format(new Date(), "dd-mm-yyy"),
    state: "alalala",
    street: "akakaakaka",
    zipCode: 23,
  },
  {
    firstName: "tandy",
    lastName: "miller",
    city: "oslo",
    dateOfBirth: format(new Date(2022, 10, 10), "dd-mm-yyy"),
    department: "rea",
    startDate: format(new Date(), "dd-mm-yyy"),
    state: "rtexas",
    street: "lincold",
    zipCode: 55,
  },
  {
    firstName: "joe",
    lastName: "dirte",
    city: "oslo",
    dateOfBirth: format(new Date(2021, 10, 10), "dd-mm-yyy"),
    department: "rea",
    startDate: format(new Date(), "dd-mm-yyy"),
    state: "tennesseeeee",
    street: "prout",
    zipCode: 44,
  },
];
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};
const columnHelper = createColumnHelper<FormatedDataType>();

// const columns = ;

const UsersTable = () => {
  const columns = useMemo<ColumnDef<FormatedDataType, any>[]>(
    () => [
      columnHelper.accessor("firstName", {
        id: "firstName",
        cell: (info) => info.getValue(),
        header: () => <span>First Name</span>,
      }),
      // Accessor Column
      columnHelper.accessor((row) => row.lastName, {
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      }),

      columnHelper.accessor("city", {
        header: () => <span>city</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("dateOfBirth", {
        header: () => <span>dateOfBirth</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("department", {
        header: () => <span>department</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("startDate", {
        header: () => <span>startDate</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("state", {
        header: () => <span>state</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("street", {
        header: () => <span>street</span>,
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("zipCode", {
        header: () => <span>zipCode</span>,
        cell: (info) => info.getValue(),
      }),
    ],
    []
  );
  // const users = useUsersStore((state) => state.users);
  const [data, setData] = React.useState(() => [...defaultData]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const table = useReactTable<FormatedDataType>({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },

    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    enableMultiSort: true,
    debugTable: true,
  });
  console.log(sorting);
  return (
    <div>
      <input
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
      />
      <DivContainerTable
      //  style={{ overflowX: "auto" }}
      >
        <STable style={{ width: table.getCenterTotalSize() }}>
          <STHead>
            {table.getHeaderGroups().map((headerGroup) => (
              <STHeadTR key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <HeaderCell key={header.id} header={header} />
                ))}
              </STHeadTR>
            ))}
          </STHead>
          <STBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <STBodyTR key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <STD key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </STD>
                    );
                  })}
                </STBodyTR>
              );
            })}
          </STBody>
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        </STable>
      </DivContainerTable>
      <div>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {"<<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {"<"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {">"}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {">>"}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UsersTable;
