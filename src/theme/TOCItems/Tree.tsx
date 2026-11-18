import React, {type CSSProperties, type ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import type {TOCTreeNode} from '@docusaurus/theme-common/internal';
import type {Props} from '@theme/TOCItems/Tree';

// Same tree as Docusaurus' TOCItems/Tree, plus row classes for the striped ToC. Rows alternate in reading order
// across nesting levels, which CSS nth-child can't do (it restarts in every nested list), so the rows are
// numbered here. --xeno-toc-depth drives the indent.
type RowIndex = ReadonlyMap<string, number>;

function indexRows(toc: readonly TOCTreeNode[], rows: Map<string, number> = new Map()): Map<string, number> {
  for (const heading of toc) {
    rows.set(heading.id, rows.size);
    indexRows(heading.children, rows);
  }
  return rows;
}

type TreeProps = Props & {rows?: RowIndex; depth?: number};

function TOCItemTree({toc, className, linkClassName, isChild, rows, depth = 0}: TreeProps): ReactNode {
  if (!toc.length) {
    return null;
  }
  const rowIndex = rows ?? indexRows(toc);
  return (
    <ul className={isChild ? undefined : className}>
      {toc.map((heading) => {
        const row = rowIndex.get(heading.id) ?? 0;
        return (
          <li
            key={heading.id}
            className={clsx(
              'xeno-toc-row',
              row % 2 === 0 ? 'xeno-toc-row--odd' : 'xeno-toc-row--even',
              row === 0 && 'xeno-toc-row--first',
              row === rowIndex.size - 1 && 'xeno-toc-row--last',
            )}
            style={{'--xeno-toc-depth': depth} as CSSProperties}>
            <Link
              to={`#${heading.id}`}
              className={linkClassName ?? undefined}
              // Developer provided the HTML, so assume it's safe.
              dangerouslySetInnerHTML={{__html: heading.value}}
            />
            <TOCItemTree
              isChild
              toc={heading.children}
              className={className}
              linkClassName={linkClassName}
              rows={rowIndex}
              depth={depth + 1}
            />
          </li>
        );
      })}
    </ul>
  );
}

// Memo only the tree root is enough
export default React.memo(TOCItemTree);
