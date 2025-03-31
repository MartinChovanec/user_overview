import React from "react";
import data from "./example-data.json";

interface DataItem {
    [key: string]: string;
}

interface HierarchyItem {
    data: DataItem;
    children?: {
        [groupName: string]: { records: HierarchyItem[] };
    };
}

export default function App() {
    const items = data as HierarchyItem[];
    const rows: any[] = [];

    function renderItem(item: HierarchyItem, keyPrefix: string) {
        const columns = Object.keys(item.data);
        console.log(columns, "cool");

        const headerCells: any[] = [];
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
                Delete
            </th>
        );
        console.log(headerCells, "headerCells2");

        rows.push(
            <tr key={`header-${keyPrefix}`} style={{ backgroundColor: "#2ebc71", color: "#000" }}>
                {headerCells}
            </tr>
        );

        const dataCells: any[] = [];
        for (let i = 0; i < columns.length; i++) {
            dataCells.push(
                <td key={columns[i]} style={{ padding: "8px" }}>
                    {item.data[columns[i]] || ""}
                </td>
            );
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

        if (item.children) {
            for (const groupKey in item.children) {
                const group = item.children[groupKey];
                if (group.records && group.records.length > 0) {
                    for (let i = 0; i < group.records.length; i++) {
                        renderItem(group.records[i], `${keyPrefix}-${groupKey}-${i}`);
                    }
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
