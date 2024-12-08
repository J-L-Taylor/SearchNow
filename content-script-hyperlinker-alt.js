 const KBRegExPattern = /KB\d{7}/i;
 const INCRegExPattern = /INC\d{7}/i;
 const RITMRegExPattern = /RITM\d{7}/i;
 const STASKRegExPattern = /STASK\d{7}/i;
 const REQRegExPattern = /REQ\d{7}/i;
 const CALLRegExPattern = /CALL\d{7}/i;
 const PRBRegExPattern = /PRB\d{7}/i;
 const CHGRegExPattern = /CHG\d{7}/i;
 const SECRegExPattern = /SEC\d{7}/i;
 const CHATRegExPattern = /CHAT\d{7}/i;
 const IPv4RegExPattern = /\b(?:(?:2(?:[0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9])\.){3}(?:(?:2([0-4][0-9]|5[0-5])|[0-1]?[0-9]?[0-9]))\b/i;
 const EmailRegExPattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
 const HostnameRegExPattern = /[A-PR-VX-Z](CO|01|02|03|04|05|06|07|08|09|10|11|EU|AS)[A-Z0-9]{2}[A-CEGJ-PS-XZ]-[A-Z0-9]{7,8}/i;
 const TeleRegExPattern = /(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?/;
 const CatchAllTicketNumRegExPattern = /[A-Za-z]{2,5}[0-9]{7,9}/g;

const regexPatterns = {
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
    TeleRegExPattern,
    CatchAllTicketNumRegExPattern
};

console.log('Content script loaded.');

document.addEventListener('DOMContentLoaded', runner);

async function runner() {
    console.log('Document loaded, starting hyperlinking process.');
    try {
        const response = await sendMessageAsync({ action: 'getRegexPatterns' });
        console.log('Message sent to background script.');
        const serializedRegexPatterns = response.regexPatterns;
        if (!serializedRegexPatterns) {
            console.error('Failed to receive regexPatterns from background script');
            return;
        }
        const regexPatterns = JSON.parse(serializedRegexPatterns);
        await hyperlinkMatches(document.body, regexPatterns);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function sendMessageAsync(message) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            if (chrome.runtime.lastError) {
                reject(new Error(chrome.runtime.lastError.message));
            } else {
                resolve(response);
            }
        });
    });
}

async function hyperlinkMatches(node, regexPatterns) {
    if (!regexPatterns) {
        console.error('regexPatterns is undefined or null');
        return;
    }

    if (node.nodeType === Node.TEXT_NODE) {
        let text = node.nodeValue;
        let replacedText = text;

        console.log('Original text:', text);

        for (const [patternName, regex] of Object.entries(regexPatterns)) {
            replacedText = await replacedText.replace(new RegExp(regex), async (match) => {
                try {
                    const response = await sendMessageAsync({
                        action: 'constructUrl',
                        base: 'https://gsa.servicenowservices.com',
                        path: '/nav_to.do',
                        query: match
                    });
                    const url = response.url;
                    console.log(`Match found: ${match}, URL: ${url}`);
                    return `<a href="${url}" target="_blank">${match}</a>`;
                } catch (error) {
                    console.error('Error constructing URL:', error);
                    return match;
                }
            });
        }

        if (replacedText !== text) {
            console.log('Replaced text:', replacedText);
            const span = document.createElement('span');
            span.innerHTML = replacedText;
            node.parentNode.replaceChild(span, node);
        }
    } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') {
        for (let child = node.firstChild; child; child = child.nextSibling) {
            await hyperlinkMatches(child, regexPatterns);
        }
    }
}
