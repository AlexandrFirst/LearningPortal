import { Delete, Get, Post, Put } from "api/config";
import { ITab, IUpdateTabsRequest } from "./tab.api.types";

class TabApi {
  getTabs(): Promise<ITab[]> {
    return Get("tab");
  }

  updateTabs(request: IUpdateTabsRequest) {
    return Put("tab", request);
  }

  createLink(request: FormData) {
    return Post("link/addlink", request);
  }

  updateLink(id: string, request: FormData) {
    return Put(`link/updateLink/${id}`, request);
  }

  deleteLink(id: string) {
    return Delete(`link/deletelink/${id}`);
  }
}

export const tabApi = new TabApi();
