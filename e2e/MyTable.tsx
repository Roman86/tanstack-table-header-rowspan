import { Cell, flexRender, Header, Table as ReactTable } from '@tanstack/react-table';
import {
  flexTableFooterRowSpan,
  flexTableHeaderRowSpan,
  tableFooterRowSpan,
  tableHeaderRowSpan,
} from '../src/index';
import * as React from 'react';
import { FC, PropsWithChildren, ReactElement } from 'react';
import { clsx } from 'clsx';

interface Props {
  table: ReactTable<any>;
  flex?: boolean;
  tHeadCell: FC<PropsWithChildren<{ header: Header<any, any> }>>;
  tBodyCell: FC<PropsWithChildren<{ cell: Cell<any, any> }>>;
  tFootCell: FC<PropsWithChildren<{ header: Header<any, any> }>>;
}

export function MyTable({
  table,
  flex,
  tHeadCell: Th,
  tBodyCell: Td,
  tFootCell: Tf,
}: Props): ReactElement {
  return (
    <table className={'leading-[2rem] border-collapse'}>
      <thead className={'header'}>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id} className={clsx('group/row', flex && 'flex')}>
            {headerGroup.headers.map((header) => (
              <Th key={header.id} header={header}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody className={'body'}>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id} className={clsx('group/row', flex && 'flex')}>
            {row.getVisibleCells().map((cell) => (
              <Td key={cell.id} cell={cell}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
      <tfoot className={'footer'}>
        {table.getFooterGroups().map((footerGroup) => (
          <tr key={footerGroup.id} className={clsx('group/row', flex && 'flex')}>
            {footerGroup.headers.map((header) => (
              <Tf key={header.id} header={header}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </Tf>
            ))}
          </tr>
        ))}
      </tfoot>
    </table>
  );
}

export function TableTh({ children, header }: PropsWithChildren<{ header: Header<any, any> }>) {
  const rowSpan = tableHeaderRowSpan(header);
  if (!rowSpan) {
    return null;
  }
  return (
    <th
      data-test-rowspan={header.column.columnDef.meta?.testRowSpan}
      className={clsx('border border-black/20 bg-gray-100 px-2')}
      colSpan={header.colSpan}
      rowSpan={rowSpan}
      style={{
        width: header.column.getSize(),
      }}
    >
      {children}
    </th>
  );
}
export function TableTd({ children, cell }: PropsWithChildren<{ cell: Cell<any, any> }>) {
  return <td className={'border border-black/20 px-2'}>{children}</td>;
}
export function TableTfootTh({
  children,
  header,
}: PropsWithChildren<{ header: Header<any, any> }>) {
  const rowSpan = tableFooterRowSpan(header);
  if (!rowSpan) {
    return null;
  }
  return (
    <th
      data-test-rowspan={header.column.columnDef.meta?.testRowSpan}
      colSpan={header.colSpan}
      rowSpan={rowSpan}
      className={'border border-black/20 bg-gray-100'}
    >
      {children}
    </th>
  );
}

export function FlexTh({ children, header }: PropsWithChildren<{ header: Header<any, any> }>) {
  const rowSpan = flexTableHeaderRowSpan(header);
  return (
    <th
      data-test-rowspan={header.column.columnDef.meta?.testRowSpan}
      className={clsx(
        'group-first/row:border-t border-b border-e first:border-s border-black/20 bg-gray-100 px-2',
        'flex items-center justify-center',
        rowSpan.topBorderMightBeNeeded && 'border-t',
      )}
      style={{
        width: header.getSize(),
        ...rowSpan.styles('2rem'),
      }}
    >
      {children}
    </th>
  );
}

export function FlexTd({ children, cell }: PropsWithChildren<{ cell: Cell<any, any> }>) {
  return (
    <td
      className={'border-b group-last/row:border-b-0 border-e first:border-s border-black/20 px-2'}
      style={{
        width: cell.column.getSize(),
      }}
    >
      {children}
    </td>
  );
}
export function FlexTfootTh({ children, header }: PropsWithChildren<{ header: Header<any, any> }>) {
  const rowSpan = flexTableFooterRowSpan(header);
  return (
    <th
      data-test-rowspan={header.column.columnDef.meta?.testRowSpan}
      className={clsx(
        'border-t group-last/row:border-b border-e first:border-s border-black/20 bg-gray-100',
        'flex items-center justify-center',
        rowSpan.bottomBorderMightBeNeeded && 'border-b',
      )}
      style={{
        width: header.getSize(),
        ...rowSpan.styles('2rem'),
      }}
    >
      {children}
    </th>
  );
}
