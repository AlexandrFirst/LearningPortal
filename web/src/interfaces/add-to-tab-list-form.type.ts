// import { ITab } from "./tab.interface";
import { ITab } from "api/tab-api/tab.api.types";

export type AddUpdateTabList = {
  tabList: Partial<ITab>[];
};
