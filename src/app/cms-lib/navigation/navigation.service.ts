import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {
  constructor() {}

  public createNode(data) {
    const node = {};
    const title = this.getLinkName(data);
    if (title) {
      node['title'] = title;
    }

    const url = this.getUrl(data);
    if (url) {
      node['url'] = url;
    }

    const childs = this.createChilds(data);
    if (childs) {
      node['childs'] = childs;
    }
    return node;
  }

  private createChilds(node) {
    if (!node.children) {
      return;
    }
    const childs = [];
    for (const child of node.children) {
      const childNode = this.createNode(child);
      childs.push(childNode);
    }
    return childs;
  }

  private getUrl(child): string {
    const link = this.getLink(child);
    return link ? link.url : '';
  }

  private getLinkName(node) {
    let linkName = '';
    const link = this.getLink(node);
    if (link) {
      linkName = link.linkItem.linkName
        ? link.linkItem.linkName
        : link.linkName;
    } else if (node.title) {
      linkName = node.title;
    }
    return linkName;
  }

  private getLink(child) {
    if (child.entries && child.entries.length > 0) {
      return child.entries[0];
    } else {
      return;
    }
  }
}
