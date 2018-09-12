// 表头分组
export const groupColumns = (
  columns,
  currentRow = 0,
  parentColumn: { colSpan?: number } = {},
  rows: any[] = [],
  dataColumns: any[] = [],
) => {
  rows[currentRow] = rows[currentRow] || [];
  const group: any[] = [];

  function setRowSpan(column) {
    const rowSpan = rows.length - currentRow;
    if (
      column &&
      !column.children &&
      rowSpan > 1 &&
      (!column.rowSpan || column.rowSpan < rowSpan)
    ) {
      column.rowSpan = rowSpan;
    }
  }
  columns.forEach((column, index) => {
    const newColumn = { ...column };
    rows[currentRow].push(newColumn);
    parentColumn.colSpan = parentColumn.colSpan || 0;
    if (newColumn.children && newColumn.children.length > 0) {
      newColumn.children = groupColumns(
        newColumn.children,
        currentRow + 1,
        newColumn,
        rows,
        dataColumns,
      ).group;
      parentColumn.colSpan += newColumn.colSpan;
    } else {
      dataColumns.push(newColumn);
      parentColumn.colSpan++;
    }

    for (let i = 0; i < rows[currentRow].length - 1; ++i) {
      setRowSpan(rows[currentRow][i]);
    }
    if (index + 1 === columns.length) {
      setRowSpan(newColumn);
    }
    group.push(newColumn);
  });
  return { group, headRows: rows, dataColumns };
};

// 鼠标hover效果
export const toggleHoverStatus = (trs, index) => {
  trs.forEach(tr => tr.classList.remove('hover'));
  if (index >= 0) {
    trs[index].classList.add('hover');
  }
};
