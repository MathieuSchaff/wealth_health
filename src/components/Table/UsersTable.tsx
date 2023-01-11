import React, { useMemo } from "react";
import { useUsersStore } from "../../zustandStore";
// import type { FormSchema } from "../components/ZodForm/ZodForm";
import HeaderCell from "./HeaderCell";
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
  SortingState,
  PaginationState,
} from "@tanstack/react-table";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import {
  DivContainerTable,
  SButtonArrow,
  SButtonTableContainer,
  SContainerButtonArrow,
  SContainerPageTable,
  SContainerRest,
  SInputGlobalFilter,
  STable,
  STableNumberInputPage,
  STableSelect,
  STableSpan,
  STBody,
  STBodyTR,
  STD,
  STHead,
  STHeadTR,
} from "./styledTable";
import type { FormatedDataType } from "./fakeData";
import { defaultData } from "./fakeData";
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
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

const UsersTable = () => {
  // const columns = useMemo<ColumnDef<FormatedDataType, any>[]>(
  //   () => [
  //     columnHelper.accessor("firstName", {
  //       id: "firstName",
  //       cell: (info) => info.getValue(),
  //       header: () => <span>First Name</span>,
  //     }),
  //     // Accessor Column
  //     columnHelper.accessor((row) => row.lastName, {
  //       id: "lastName",
  //       cell: (info) => info.getValue(),
  //       header: () => <span>Last Name</span>,
  //     }),

  //     columnHelper.accessor("city", {
  //       header: () => <span>city</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("dateOfBirth", {
  //       header: () => <span>dateOfBirth</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("department", {
  //       header: () => <span>department</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("startDate", {
  //       header: () => <span>startDate</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("state", {
  //       header: () => <span>state</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("street", {
  //       header: () => <span>street</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //     columnHelper.accessor("zipCode", {
  //       header: () => <span>zipCode</span>,
  //       cell: (info) => info.getValue(),
  //     }),
  //   ],
  //   []
  // );
  const columns = useMemo<ColumnDef<FormatedDataType, any>[]>(
    () => [
      {
        accessorKey: "firstName",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.lastName,
        id: "lastName",
        cell: (info) => info.getValue(),
        header: () => <span>Last Name</span>,
      },
      {
        accessorKey: "dateOfBirth",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.department,
        id: "department",
        cell: (info) => info.getValue(),
        header: () => <span>department</span>,
      },
      {
        accessorKey: "startDate",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.state,
        id: "state",
        cell: (info) => info.getValue(),
        header: () => <span>state</span>,
      },
      {
        accessorKey: "street",
        cell: (info) => info.getValue(),
      },
      {
        accessorFn: (row) => row.zipCode,
        id: "zipCode",
        cell: (info) => info.getValue(),
        header: () => <span>zipCode</span>,
      },
    ],
    []
  );
  // const users = useUsersStore((state) => state.users);
  // const [data, setData] = React.useState(() => [...defaultData]);
  const users = useUsersStore((state) => state.users);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });
  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable<FormatedDataType>({
    data: users,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },

    state: {
      sorting,
      globalFilter,
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableSortingRemoval: false,
    enableMultiSort: true,
    debugTable: true,
  });
  console.log(
    "table.getState().pagination.pageSize",
    table.getState().pagination.pageSize
  );
  return (
    <SContainerPageTable>
      <SInputGlobalFilter
        value={globalFilter ?? ""}
        onChange={(e) => setGlobalFilter(e.target.value)}
        placeholder="Search all columns..."
      />
      <DivContainerTable>
        <STable style={{ width: table.getCenterTotalSize() }} stripe>
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
        </STable>
      </DivContainerTable>
      <SButtonTableContainer>
        <SContainerButtonArrow>
          <SButtonArrow
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            {"<<"}
          </SButtonArrow>
          <SButtonArrow
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            {"<"}
          </SButtonArrow>
          <SButtonArrow
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            {">"}
          </SButtonArrow>
          <SButtonArrow
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            {">>"}
          </SButtonArrow>
        </SContainerButtonArrow>
        <SContainerRest>
          <STableSpan>
            <div>Page</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </strong>
          </STableSpan>
          <STableSpan>
            | Go to page:
            <STableNumberInputPage
              type="number"
              defaultValue={table.getState().pagination.pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0;
                table.setPageIndex(page);
              }}
              className="border p-1 rounded w-16"
            />
          </STableSpan>
          <STableSelect
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
          </STableSelect>
        </SContainerRest>
      </SButtonTableContainer>
    </SContainerPageTable>
  );
};

export default UsersTable;
