import React from "react";

interface SectionHeaderProps {
  columns: string[];
  sectionKey: string;
}

export function SectionHeader({ columns, sectionKey }: SectionHeaderProps) {
  return (
    <tr key={`sec-head-${sectionKey}`} style={{ backgroundColor: "#2ebc71", color: "#000" }}>
      {columns.map(col => (
        <th key={col} style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>
          {col}
        </th>
      ))}
      <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>
        delete
      </th>
    </tr>
  );
}
