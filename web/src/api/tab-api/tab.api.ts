import { Delete, Get, Post, Put } from "api/config";
import { ILink, ITab, IUpdateTabsRequest } from "./tab.api.types";

class TabApi {
  getTabs(): Promise<ITab[]> {
    return Get("tab");
  }

  updateTabs(request: IUpdateTabsRequest) {
    return Put("tab", request);
  }

  createLink(request: FormData): Promise<ILink> {
    return Post("link/addlink", request);
  }

  updateLink(req: { id: number; formData: FormData }) {
    return Put(`link/updateLink/${req.id}`, req.formData);
  }

  deleteLink(id: number) {
    return Delete(`link/deletelink/${id}`);
  }
}

export const tabApi = new TabApi();
