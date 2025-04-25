import * as React from 'react';
import { useState } from 'react';
import ReactDOM from 'react-dom/client';

import './styles.css';

import { createColumnHelper, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { FlexTd, FlexTfootTh, FlexTh, MyTable, TableTd, TableTfootTh, TableTh } from './MyTable';

declare module '@tanstack/table-core' {
  // @ts-expect-error
  interface ColumnMeta<TData extends RowData, TValue> {
    testRowSpan?: number;
  }
}

type Pet = {
  animal: string;
  name: string;
  age: number;
  weight: number;
  status: string;
};

const tableData: Pet[] = [
  {
    animal: 'Dog',
    name: 'Toby',
    age: 4,
    weight: 10,
    status: 'Much fun',
  },
  {
    animal: 'Cat',
    name: 'Sid',
    age: 5,
    weight: 3,
    status: 'Hungry',
  },
  {
    animal: 'Fish',
    name: 'Billie',
    age: 6,
    weight: 0.02,
    status: 'wut',
  },
];

const columnHelper = createColumnHelper<Pet>();

const columns = [
  columnHelper.display({
    id: 'num',
    header: () => <span>#</span>,
    cell: (info) => <div className={'text-center'}>{info.row.index + 1}</div>,
    meta: {
      testRowSpan: 3,
    },
  }),
  columnHelper.group({
    id: 'pet',
    header: () => <span>Pet</span>,
    // footer: props => props.column.id,
    columns: [
      columnHelper.accessor('animal', {
        cell: (info) => info.getValue(),
        header: () => <span>Animal</span>,
        footer: (props) => props.column.id,
        meta: {
          testRowSpan: 2,
        },
      }),
      columnHelper.accessor((row) => row.name, {
        id: 'lastName',
        cell: (info) => info.getValue(),
        header: () => <span>Name</span>,
        footer: (props) => props.column.id,
      }),
    ],
  }),
  columnHelper.group({
    header: 'Extra',
    footer: (props) => props.column.id,
    columns: [
      columnHelper.accessor('age', {
        header: () => 'Age',
        footer: (props) => props.column.id,
        meta: {
          testRowSpan: 2,
        },
      }),
      columnHelper.group({
        id: 'moreInfo',
        header: () => <span>More Info</span>,
        footer: (props) => props.column.id,
        meta: {
          testRowSpan: 1,
        },
        columns: [
          columnHelper.accessor('weight', {
            header: () => <span>Weight</span>,
            footer: (props) => props.column.id,
            meta: {
              testRowSpan: 1,
            },
          }),
          columnHelper.accessor('status', {
            header: 'Status',
            footer: (props) => props.column.id,
          }),
        ],
      }),
    ],
  }),
];

function App() {
  const [
    data,
  ] = useState(() => [...tableData]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-3 flex flex-col gap-6 items-center">
      <div className={'text-sky-700 text-xl font-light'}>Standard table layout</div>
      <MyTable table={table} tHeadCell={TableTh} tBodyCell={TableTd} tFootCell={TableTfootTh} />
      <div className={'text-violet-600 text-xl font-light'}>Flexbox layout</div>
      <MyTable table={table} flex tHeadCell={FlexTh} tBodyCell={FlexTd} tFootCell={FlexTfootTh} />
    </div>
  );
}

const rootElement = document.getElementById('app');
if (!rootElement) throw new Error('Failed to find the root element');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
