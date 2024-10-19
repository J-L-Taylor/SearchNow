// utils/regexPatterns.js
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

module.exports = {
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