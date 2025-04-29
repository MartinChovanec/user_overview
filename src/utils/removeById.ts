import { HierarchyItem } from "../types/hierarchy";

/**
 * recursively remove an item and all its children by ID
 */
export function removeById(id: string, list: HierarchyItem[]): HierarchyItem[] {
  return list
    .filter(item => item.data.ID !== id)
    .map(item => ({
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
