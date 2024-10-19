// handlers/navigationHandler.ts
import { formatPhoneNumber } from '../utils/phoneFormatter';
import { constructUrl } from '../utils/urlConstructor';
import {
    KBRegExPattern,
    CALLRegExPattern,
    CatchAllTicketNumRegExPattern,
    IPv4RegExPattern,
    EmailRegExPattern,
    HostnameRegExPattern,
    TeleRegExPattern
} from '../utils/regexPatterns';

const urlBase = 'https://gsa.servicenowservices.com/nav_to.do?uri=';

export function handleNavigation(info, tab) {
    const selectedText = info.selectionText.trim();
    const encodedSelectedText = encodeURIComponent(selectedText);

    if (KBRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'kb_view.do', `sysparm_article=${encodedSelectedText}`), tab.index);
    } else if (CALLRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'new_call.do', `number=${encodedSelectedText}`), tab.index);
    } else if (CatchAllTicketNumRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'task.do', `number=${encodedSelectedText}`), tab.index);
    } else if (IPv4RegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'cmdb_ci_ip_address.do', `ip_address=${encodedSelectedText}`), tab.index);
    } else if (EmailRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'sys_user.do', `email=${encodedSelectedText}`), tab.index);
    } else if (HostnameRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'cmdb_ci_computer.do', `name=${encodedSelectedText}`), tab.index);
    } else if (TeleRegExPattern.test(selectedText)) {
        const formattedPhoneNumber = formatPhoneNumber(selectedText);
        const encodedPhoneNumber = encodeURIComponent(formattedPhoneNumber);
        openTab(constructUrl(urlBase, 'sys_user_list.do', `phoneLIKE${encodedPhoneNumber}%5EORmobile_phoneLIKE${encodedPhoneNumber}%5EORhome_phoneLIKE${encodedPhoneNumber}`), tab.index);
    } else {
        openTab(constructUrl(urlBase, '$sn_global_search_results.do', `sysparm_search=${encodedSelectedText}`), tab.index);
    }
}

function openTab(url: string, index: number) {
    chrome.tabs.create({ url, index: index + 1 });
}