import React, { useState } from "react";
import data from "./example-data.json";

interface DataItem {
    [key: string]: string;
}
interface ChildrenRecords {
    records: HierarchyItem[];
}
interface HierarchyItem {
    data: DataItem;
    children?: { [groupName: string]: ChildrenRecords };
}

export default function App() {
    // load data into local state so we can delete items
    const [items, setItems] = useState<HierarchyItem[]>(data as HierarchyItem[]);
    const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

    // toggle expand/collapse
    function toggleItem(id: string) {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    // recursively remove an item and all its children by ID
    function removeById(id: string, list: HierarchyItem[]): HierarchyItem[] {
        return list
            .filter((item) => item.data.ID !== id)
            .map((item) => ({
                ...item,
                children: item.children
                    ? Object.fromEntries(
                          Object.entries(item.children).map(([key, group]) => [
                              key,
                              { records: removeById(id, group.records) },
                          ])
                      )
                    : undefined,
            }));
    }

    // handler for delete button - removes data, button and it changes the expanded state
    function handleDelete(id: string) {
        setItems((prev) => removeById(id, prev));
        setExpanded((prev) => ({ ...prev, [id]: false }));
    }

    // derive columns from first item
    const columns = Object.keys(items[0].data);

    // render main green header
    const globalHeader = (
        <thead>
            <tr style={{ backgroundColor: "#2ebc71", color: "#000" }}>
                {columns.map((col) => (
                    <th
                        key={col}
                        style={{
                            textAlign: "left",
                            padding: 8,
                            borderBottom: "1px solid #333",
                        }}
                    >
                        {col}
                    </th>
                ))}
                <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>delete</th>
            </tr>
        </thead>
    );

    function renderItem(item: HierarchyItem, key: string, showGroupHeader: boolean) {
        const rows: React.ReactNode[] = [];
        const cols = Object.keys(item.data);
        const hasChildren = item.children && Object.values(item.children).some((g) => g.records.length > 0);

        // group header for expanded detail
        if (showGroupHeader) {
            rows.push(
                <tr key={`sec-head-${key}`} style={{ backgroundColor: "#2ebc71", color: "#000" }}>
                    {cols.map((col) => (
                        <th
                            key={col}
                            style={{
                                textAlign: "left",
                                padding: 8,
                                borderBottom: "1px solid #333",
                            }}
                        >
                            {col}
                        </th>
                    ))}
                    <th style={{ textAlign: "left", padding: 8, borderBottom: "1px solid #333" }}>delete</th>
                </tr>
            );
        }

        const arrow = hasChildren && (expanded[item.data.ID] ? "▼" : "▶");
        const dataCells = cols.map((col, i) =>
            i === 0 && hasChildren ? (
                <td key={col} style={{ padding: 8 }}>
                    <button
                        onClick={() => toggleItem(item.data.ID)}
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
        dataCells.push(
            <td key={`del-${key}`} style={{ padding: 8, textAlign: "center" }}>
                <button
                    onClick={() => handleDelete(item.data.ID)}
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
        rows.push(
            <tr key={`data-${key}`} style={{ backgroundColor: "#333", color: "#fff", borderBottom: "1px solid #444" }}>
                {dataCells}
            </tr>
        );

        if (hasChildren && expanded[item.data.ID]) {
            Object.entries(item.children!).forEach(([groupKey, group]) => {
                group.records.forEach((child, index) => {
                    rows.push(...renderItem(child, `${key}-${groupKey}-${index}`, true));
                });
            });
        }

        return rows;
    }

    const bodyRows: React.ReactNode[] = [];
    items.forEach((item, index) => {
        bodyRows.push(...renderItem(item, index.toString(), false));
    });

    return (
        <div style={{ padding: 20 }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                {globalHeader}
                <tbody>{bodyRows}</tbody>
            </table>
        </div>
    );
}
