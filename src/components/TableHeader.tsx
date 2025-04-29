import React from "react";

interface TableHeaderProps {
  columns: string[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead>
      <tr style={{ backgroundColor: "#2ebc71", color: "#000" }}>
        {columns.map(col => (
          <th key={col} style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>
            {col}
          </th>
        ))}
        <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>
          delete
        </th>
      </tr>
    </thead>
  );
}
