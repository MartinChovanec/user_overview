import React from "react";
import { useHierarchy } from "./hooks/useHierarchy";
import { HierarchyTable } from "./components/HierarchyTable";

export default function App() {
  const { items, expanded, toggleItem, handleDelete } = useHierarchy();

  return (
    <div style={{ padding: 20 }}>
      <HierarchyTable
        items={items}
        expanded={expanded}
        toggleItem={toggleItem}
        handleDelete={handleDelete}
      />
    </div>
  );
}
