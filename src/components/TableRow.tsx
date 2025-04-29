import React from "react";
import { HierarchyItem } from "../types/hierarchy";

interface TableRowProps {
  item: HierarchyItem;
  rowKey: string;
  hasChildren: boolean;
  arrow: string | false;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TableRow({
  item,
  rowKey,
  hasChildren,
  arrow,
  onToggle,
  onDelete,
}: TableRowProps) {
  const cols = Object.keys(item.data);

  const cells = cols.map((col, i) =>
    i === 0 && hasChildren ? (
      <td key={col} style={{ padding: 8 }}>
        <button
          onClick={() => onToggle(item.data.ID)}
          style={{
            background: "transparent",
            border: "none",
            color: "#fff",
            cursor: "pointer",
            fontSize: 16,
            marginRight: 5,
          }}
        >
          {arrow}
        </button>
        {item.data[col]}
      </td>
    ) : (
      <td key={col} style={{ padding: 8 }}>
        {item.data[col]}
      </td>
    )
  );

  cells.push(
    <td key={`del-${rowKey}`} style={{ padding: 8, textAlign: "center" }}>
      <button
        onClick={() => onDelete(item.data.ID)}
        style={{
          background: "transparent",
          border: "none",
          color: "red",
          cursor: "pointer",
          fontSize: 16,
        }}
      >
        ✖
      </button>
    </td>
  );

  return (
    <tr key={`data-${rowKey}`} style={{ backgroundColor: "#333", color: "#fff", borderBottom: "1px solid #444" }}>
      {cells}
    </tr>
  );
}
