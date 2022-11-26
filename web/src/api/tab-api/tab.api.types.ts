export interface ITab {
  id: number;
  name: string;
  links: ILink[];
  order: number;
}

export interface IUpdateTab {
  id: number;
  name: string;
  links: number[];
  order: number;
}

export enum LinkType {
  Link,
  Video,
  Pdf,
}

export interface ILink {
  id: number;
  description: string;
  content: string;
  contentType: LinkType;
  resourseId?: string;
  order: number;
  metadata?: string;
}

export interface IUpdateTabsRequest {
  tabs: IUpdateTab[];
}
