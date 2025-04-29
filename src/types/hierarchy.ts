// shared interfaces
export interface DataItem {
    [key: string]: string;
  }
  
  export interface ChildrenRecords {
    records: HierarchyItem[];
  }
  
  export interface HierarchyItem {
    data: DataItem;
    children?: { [groupName: string]: ChildrenRecords };
  }
  