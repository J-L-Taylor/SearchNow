// handlers/navigationHandler.js
const { formatPhoneNumber } = require('../utils/phoneFormatter');
const { constructUrl } = require('../utils/urlConstructor');
const regexPatterns = require('../utils/regexPatterns');

const urlBase = 'https://gsa.servicenowservices.com/nav_to.do?uri=';

function handleNavigation(info, tab) {
    const selectedText = info.selectionText.trim();
    const encodedSelectedText = encodeURIComponent(selectedText);

    if (regexPatterns.KBRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'kb_view.do', `sysparm_article=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.CALLRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'new_call.do', `number=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.CatchAllTicketNumRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'task.do', `number=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.IPv4RegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'cmdb_ci_ip_address.do', `ip_address=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.EmailRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'sys_user.do', `email=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.HostnameRegExPattern.test(selectedText)) {
        openTab(constructUrl(urlBase, 'cmdb_ci_computer.do', `name=${encodedSelectedText}`), tab.index);
    } else if (regexPatterns.TeleRegExPattern.test(selectedText)) {
        const formattedPhoneNumber = formatPhoneNumber(selectedText);
        const encodedPhoneNumber = encodeURIComponent(formattedPhoneNumber);
        openTab(constructUrl(urlBase, 'sys_user_list.do', `phoneLIKE${encodedPhoneNumber}%5EORmobile_phoneLIKE${encodedPhoneNumber}%5EORhome_phoneLIKE${encodedPhoneNumber}`), tab.index);
    } else {
        openTab(constructUrl(urlBase, '$sn_global_search_results.do', `sysparm_search=${encodedSelectedText}`), tab.index);
    }
}

function openTab(url, index) {
    chrome.tabs.create({ url, index: index + 1 });
}

module.exports = {
    handleNavigation: handleNavigation
};