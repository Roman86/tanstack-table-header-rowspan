import type { Header } from '@tanstack/react-table';
import { type CSSProperties } from 'react';

function deepestHeader<D, V>(header: Header<D, V>): Header<D, V> | null {
  let last = header;
  while (true) {
    const next =
      last.isPlaceholder && last.colSpan === 1 && last.subHeaders.length === 1
        ? last.subHeaders[0]
        : null;
    if (next) {
      last = next;
    } else {
      return last === header ? null : last;
    }
  }
}

export function tableHeaderRowSpan(header: Header<any, any>): number | null {
  const deepest = deepestHeader(header);
  const rowSpan = (deepest ? deepest.depth - header.depth : 0) + 1;
  const above = header.depth - header.column.depth;
  if (above > 1) {
    return null;
  }
  return rowSpan;
}
export function tableFooterRowSpan(header: Header<any, any>): number | null {
  const deepest = deepestHeader(header);
  const below = (deepest ? deepest.depth - header.depth : 0) + 1;
  const above = header.depth - header.column.depth;
  if (below > 1) {
    return null;
  }
  return above;
}

export function flexTableHeaderRowSpan(header: Header<any, any>) {
  const rowSpan = header.depth - header.column.depth;
  return {
    rowSpan,
    topBorderMightBeNeeded: header.column.depth === 0,
    styles: (cssRowHeight: CSSProperties['height']): CSSProperties => ({
      /** @ts-ignore */
      '--row-span': rowSpan,
      height: `calc(var(--row-span, 1) * ${cssRowHeight})`,
      marginTop: `calc(-1 * (var(--row-span, 1) - 1) * ${cssRowHeight})`,
      visibility: header.isPlaceholder ? 'hidden' : undefined,
    }),
  };
}

export function flexTableFooterRowSpan(header: Header<any, any>) {
  const rowSpan = header.depth - header.column.depth;
  return {
    rowSpan,
    bottomBorderMightBeNeeded: header.column.depth === 0,
    styles: (cssRowHeight: CSSProperties['height']): CSSProperties => ({
      /** @ts-ignore */
      '--row-span': rowSpan,
      height: `calc(var(--row-span, 1) * ${cssRowHeight})`,
      marginBottom: `calc(-1*(var(--row-span, 1) - 1) * ${cssRowHeight})`,
      visibility: header.isPlaceholder ? 'hidden' : undefined,
    }),
  };
}
