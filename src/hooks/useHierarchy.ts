import { useState } from "react";
import { HierarchyItem } from "../types/hierarchy";
import { removeById } from "../utils/removeById";
import rawData from "../data/example-data.json";

export function useHierarchy() {
  const [items, setItems] = useState<HierarchyItem[]>(rawData as HierarchyItem[]);
  const [expanded, setExpanded] = useState<{ [id: string]: boolean }>({});

  function toggleItem(id: string) {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function handleDelete(id: string) {
    setItems(prev => removeById(id, prev));
    setExpanded(prev => ({ ...prev, [id]: false }));
  }

  return { items, expanded, toggleItem, handleDelete };
}
