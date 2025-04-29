import React from "react";
import { HierarchyItem } from "../types/hierarchy";
import { TableHeader } from "./TableHeader";
import { SectionHeader } from "./SectionHeader";
import { TableRow } from "./TableRow";

interface Props {
  items: HierarchyItem[];
  expanded: { [id: string]: boolean };
  toggleItem: (id: string) => void;
  handleDelete: (id: string) => void;
}

export function HierarchyTable({ items, expanded, toggleItem, handleDelete }: Props) {
  const columns = Object.keys(items[0].data);
  const rows: React.ReactNode[] = [];

  function renderItem(item: HierarchyItem, key: string, showGroupHeader: boolean) {
    const cols = Object.keys(item.data);
    const hasChildren = item.children && Object.values(item.children).some(g => g.records.length > 0);

    if (showGroupHeader) {
      rows.push(<SectionHeader key={`sec-${key}`} columns={cols} sectionKey={key} />);
    }

    const arrow: string | false = hasChildren
  ? (expanded[item.data.ID] ? "▼" : "▶")
  : false;

    rows.push(
      <TableRow
        key={key}
        item={item}
        rowKey={key}
        hasChildren={!!hasChildren}
        arrow={arrow}
        onToggle={toggleItem}
        onDelete={handleDelete}
      />
    );

    if (hasChildren && expanded[item.data.ID]) {
      Object.entries(item.children!).forEach(([groupKey, group]) =>
        group.records.forEach((child, idx) => renderItem(child, `${key}-${groupKey}-${idx}`, true))
      );
    }
  }

  items.forEach((item, i) => renderItem(item, i.toString(), false));

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <TableHeader columns={columns} />
      <tbody>{rows}</tbody>
    </table>
  );
}
