// global.d.ts
declare namespace chrome {
    namespace tabs {
        interface CreateProperties {
            url: string;
            index?: number; // Made index optional as it might not always be provided
        }

        function create(createProperties: CreateProperties, callback?: (tab: chrome.tabs.Tab) => void): void;
  }
    namespace contextMenus {
    interface CreateProperties {
      type?: 'normal' | 'checkbox' | 'radio' | 'separator';
      id?: string;
      title?: string;
      checked?: boolean;
      contexts?: Array<'page' | 'selection' | 'link' | 'editable' | 'image' | 'video' | 'audio' | 'frame' | 'launcher' | 'browser_action' | 'page_action' | 'action'>;
      onclick?: (info: OnClickData, tab?: chrome.tabs.Tab) => void;
      parentId?: number | string;
      documentUrlPatterns?: string[];
      targetUrlPatterns?: string[];
      enabled?: boolean;
    }

    interface OnClickData {
      menuItemId: number | string;
      parentMenuItemId?: number | string;
      mediaType?: string;
      linkUrl?: string;
      srcUrl?: string;
      pageUrl?: string;
      frameUrl?: string;
      selectionText?: string;
      editable: boolean;
      wasChecked?: boolean;
      checked?: boolean;
    }

    function create(createProperties: CreateProperties, callback?: () => void): void;
    function remove(menuItemId: string | number, callback?: () => void): void;
    function removeAll(callback?: () => void): void;
    function update(id: string | number, updateProperties: CreateProperties, callback?: () => void): void;
  }
}