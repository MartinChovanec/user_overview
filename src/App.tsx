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
    children?: {
        [groupName: string]: ChildrenRecords;
    };
}

export default function App() {
    const items = data as HierarchyItem[];

    const rows: any[] = [];

    const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

    function toggleItem(id: string) {
        setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
    }

    function renderItem(item: HierarchyItem, keyPrefix: string, renderHeader = true) {
        const columns = Object.keys(item.data);

        let hasChildren = false;
        if (item.children) {
            for (const groupKey in item.children) {
                if (item.children[groupKey].records.length > 0) {
                    hasChildren = true;
                    break;
                }
            }
        }

        // green header
        const headerCells: any[] = [];
        if (renderHeader) {
            for (let i = 0; i < columns.length; i++) {
                headerCells.push(
                    <th
                        key={columns[i]}
                        style={{
                            textAlign: "left",
                            padding: "8px",
                            borderBottom: "1px solid #333",
                        }}
                    >
                        {columns[i]}
                    </th>
                );
            }
            headerCells.push(
                <th
                    key="delete"
                    style={{
                        textAlign: "left",
                        padding: "8px",
                        borderBottom: "1px solid #333",
                    }}
                >
                    delete
                </th>
            );
        }

        rows.push(
            <tr key={`header-${keyPrefix}`} style={{ backgroundColor: "#2ebc71", color: "#000" }}>
                {headerCells}
            </tr>
        );

        let arrow = "";
        if (hasChildren) {
            arrow = expanded[item.data["ID"]] ? "▼" : "▶";
        }
        // data header - black
        const dataCells: any[] = [];

        for (let i = 0; i < columns.length; i++) {
            const colKey = columns[i];
            if (i === 0 && hasChildren) {
                dataCells.push(
                    <td key={colKey} style={{ padding: "8px" }}>
                        <button
                            onClick={() => toggleItem(item.data["ID"])}
                            style={{
                                backgroundColor: "transparent",
                                border: "none",
                                color: "#fff",
                                cursor: "pointer",
                                fontSize: "16px",
                                marginRight: "5px",
                            }}
                        >
                            {arrow}
                        </button>
                        {item.data[colKey] || ""}
                    </td>
                );
            } else {
                dataCells.push(
                    <td key={colKey} style={{ padding: "8px" }}>
                        {item.data[colKey] || ""}
                    </td>
                );
            }
        }

        dataCells.push(
            <td key="delete-button" style={{ padding: "8px", textAlign: "center" }}>
                <button
                    style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                        fontSize: "16px",
                    }}
                    onClick={() => alert(`Delete item with ID: ${item.data["ID"]}`)}
                >
                    ✖
                </button>
            </td>
        );

        rows.push(
            <tr
                key={`data-${keyPrefix}`}
                style={{
                    backgroundColor: "#333",
                    color: "#fff",
                    borderBottom: "1px solid #444",
                }}
            >
                {dataCells}
            </tr>
        );

        if (hasChildren && expanded[item.data["ID"]]) {
            for (const groupKey in item.children) {
                const group = item.children[groupKey];
                for (let i = 0; i < group.records.length; i++) {
                    renderItem(group.records[i], `${keyPrefix}-${groupKey}-${i}`);
                }
            }
        }
    }

    for (let i = 0; i < items.length; i++) {
        renderItem(items[i], i.toString());
    }

    return (
        <div style={{ padding: "20px" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <tbody>{rows}</tbody>
            </table>
        </div>
    );
}
