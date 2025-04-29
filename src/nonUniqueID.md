// V případě., kdy by na vstupu nebylo možné zajistit uninkátní ID 
/*
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
    const [expanded, setExpanded] = useState<{ [path: string]: boolean }>({});

    // toggle expand/collapse by path
    function toggleItem(path: string) {
        setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
    }

    // remove a node by its path in the tree
    function removeByPath(path: string, list: HierarchyItem[]): HierarchyItem[] {
        const segments = path.split("-");
        const idx = Number(segments[0]);
        // if only root-level index, filter it out
        if (segments.length === 1) {
            return list.filter((_, i) => i !== idx);
        }
        // otherwise, need to descend
        const groupKey = segments[1];
        const childPath = segments.slice(2).join("-");
        return list
            .map((item, i) => {
                if (i !== idx) return item;
                // clone this item and its children
                const newChildren: any = {};
                if (item.children) {
                    for (const [gk, group] of Object.entries(item.children)) {
                        if (gk === groupKey) {
                            newChildren[gk] = {
                                records: removeByPath(childPath, group.records),
                            };
                        } else {
                            newChildren[gk] = group;
                        }
                    }
                }
                return { ...item, children: newChildren };
            })
            .filter((item) => item !== undefined);
    }

    // handler for delete button - removes data and collapses it
    function handleDelete(path: string) {
        setItems((prev) => removeByPath(path, prev));
        setExpanded((prev) => ({ ...prev, [path]: false }));
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

    // recursive renderItem accepts path as unique key
    function renderItem(item: HierarchyItem, path: string, showGroupHeader: boolean) {
        const rows: React.ReactNode[] = [];
        const cols = Object.keys(item.data);
        const hasChildren = item.children && Object.values(item.children).some((g) => g.records.length > 0);

        // sub-header for expanded group
        if (showGroupHeader) {
            rows.push(
                <tr key={`sec-head-${path}`} style={{ backgroundColor: "#2ebc71", color: "#000" }}>
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

        // data row with toggle arrow
        const arrow = hasChildren && (expanded[path] ? "▼" : "▶");
        const dataCells = cols.map((col, i) =>
            i === 0 && hasChildren ? (
                <td key={col} style={{ padding: 8 }}>
                    <button
                        onClick={() => toggleItem(path)}
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
            <td key={`del-${path}`} style={{ padding: 8, textAlign: "center" }}>
                <button
                    onClick={() => handleDelete(path)}
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
            <tr key={`data-${path}`} style={{ backgroundColor: "#333", color: "#fff", borderBottom: "1px solid #444" }}>
                {dataCells}
            </tr>
        );

        // render children recursively with includeHeader = true
        if (hasChildren && expanded[path]) {
            Object.entries(item.children!).forEach(([groupKey, group]) => {
                group.records.forEach((child, idx) => {
                    const childPath = `${path}-${groupKey}-${idx}`;
                    rows.push(...renderItem(child, childPath, true));
                });
            });
        }

        return rows;
    }

    // build body rows
    const bodyRows: React.ReactNode[] = [];
    items.forEach((item, idx) => {
        const path = idx.toString();
        bodyRows.push(...renderItem(item, path, false));
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
*/