export interface View {
  type: string;
  name: string;
  text?: string;
  src?: string;
}

export interface DashboardEntry {
  title: string;
  description: string;
  placement: string[];
  view: Record<string, View>;
  isPublished: boolean;
}

export enum CustomComponentTypes {
  Image = "image",
  TextBlock = "textBlock",
}
