import {
    KBRegExPattern,
    INCRegExPattern,
    RITMRegExPattern,
    STASKRegExPattern,
    REQRegExPattern,
    CALLRegExPattern,
    PRBRegExPattern,
    CHGRegExPattern,
    SECRegExPattern,
    CHATRegExPattern,
    IPv4RegExPattern,
    EmailRegExPattern,
    HostnameRegExPattern,
    TeleRegExPattern
} from '../utils/regexPatterns.js';

/* jshint moz:true */
/* jshint esversion: 6*/

const urlBase = 'https://gsa.servicenowservices.com/nav_to.do?uri=';

function handleContextMenuClick(info, tab) {
    const selectedText = info.selectionText.trim();
    const encodedSelectedText = encodeURIComponent(selectedText);

    const patterns = [
        { regex: KBRegExPattern, path: 'kb_view.do', query: 'sysparm_article=' },
        { regex: INCRegExPattern, path: 'incident.do', query: 'sysparm_query=number=' },
        { regex: RITMRegExPattern, path: 'sc_req_item.do', query: 'sysparm_query=number=' },
        { regex: STASKRegExPattern, path: 'sc_task.do', query: 'sysparm_query=number=' },
        { regex: REQRegExPattern, path: 'sc_request.do', query: 'sysparm_query=number=' },
        { regex: CALLRegExPattern, path: 'new_call.do', query: 'sysparm_query=number=' },
        { regex: PRBRegExPattern, path: 'problem.do', query: 'sysparm_query=number=' },
        { regex: CHGRegExPattern, path: 'change_request.do', query: 'sysparm_query=number=' },
        { regex: SECRegExPattern, path: 'u_security_inc.do', query: 'sysparm_query=number=' },
        { regex: CHATRegExPattern, path: 'chat_queue_entry.do', query: 'sysparm_query=number=' },
        { regex: IPv4RegExPattern, path: 'cmdb_ci_ip_address.do', query: 'sysparm_query=ip_address=' },
        { regex: EmailRegExPattern, path: 'sys_user.do', query: 'sysparm_query=email=' },
        { regex: HostnameRegExPattern, path: 'cmdb_ci_computer.do', query: 'sysparm_query=name=' }
    ];

    for (const pattern of patterns) {
        if (pattern.regex.test(selectedText)) {
            chrome.tabs.create({
                url: `${urlBase}${pattern.path}?${pattern.query}${encodedSelectedText}`,
                index: tab.index + 1
            });
            return;
        }
    }

    // Default action if no pattern matches
    chrome.tabs.create({
        url: `${urlBase}$sn_global_search_results.do?sysparm_search=${encodedSelectedText}`,
        index: tab.index + 1
    });
}

// Add context menu item
chrome.contextMenus.create({
    id: 'autoSearch',
    title: 'Search ServiceNow for "%s"',
    contexts: ['selection']
});

// Add listener for context menu item click
chrome.contextMenus.onClicked.addListener(handleContextMenuClick);