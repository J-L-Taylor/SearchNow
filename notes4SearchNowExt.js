const topAndSecondLevelOfURL = "https://gsa.servicenowservices.com/nav_to.do?uri=";
const tableOfURL = "task.do";
const fragmentOfURL = "?sysparm_query=number=";
const fullEncodedURL = encodeURIComponent(topAndSecondLevelOfURL+tableOfURL+fragmentOfURL);



avascript: for ( ; ; ) {timeout=prompt("Set timeout [s]"); current=location.href; if(timeout>0) setTimeout('reload()',1000*timeout); else location.replace(current); function reload(){ setTimeout('reload()',1000*timeout); fr4me='<frameset cols=\'*\'>\n<frame src=\''+current+'\'/>'; fr4me+='</frameset>'; with(document){write(fr4me);void(close())}; }}



https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number=


var selectedText = info.selectionText;
var EncodedSelectedText = encodeURIComponent(selectedText).toString();
if (KBRegExPattern.test(selectedText)) {
    let url = 'https://gsa.servicenowservices.com/kb_view.do?sysparm_article='+EncodedSelectedText
} else if (INCRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/incident_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = INCRegExPattern
} else if (RITMRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_req_item_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = RITMRegExPattern
} else if (STASKRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_task_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = STASKRegExPattern
} else if (REQRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sc_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = REQRegExPattern
} else if (CALLRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/new_call_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = CALLRegExPattern
} else if (PRBRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/problem_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = PRBRegExPattern
} else if (CHGRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/change_request_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (SECRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/u_security_inc_list.do?sysparm_query=numberLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (CHATRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/chat_queue_entry_list.do?sysparm_query=%5EGOTO123TEXTQUERY321%3D'+EncodedSelectedText
        let RegExMatcher = 
} else if (IPv4RegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/cmdb_ci_list.do?sysparm_query=ip_addressLIKE'+EncodedSelectedText+'%5Esys_class_name%3Dcmdb_ci_computer'
        let RegExMatcher = 
} else if (EmailRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=emailLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (HostnameRegExPattern.test(selectedText)) {
        let url = 'https://gsa.servicenowservices.com/cmdb_ci_computer_list.do?sysparm_query=nameLIKE'+EncodedSelectedText+'%5EORasset_tagLIKE'+EncodedSelectedText+'%5EORserial_numberLIKE'+EncodedSelectedText+'%5EORfqdnLIKE'+EncodedSelectedText+'%5EORdns_domainLIKE'+EncodedSelectedText
        let RegExMatcher = 
} else if (TeleRegExPattern.test(selectedText)) {
        FormatPhoneNumber(info);
        let EncodedSelectedText = encodeURIComponent(FormattedPhoneNumber);
                let url = 'https://gsa.servicenowservices.com/sys_user_list.do?sysparm_query=phoneLIKE'+EncodedSelectedText+'%5EORmobile_phoneLIKE' +EncodedSelectedText+'%5EORhome_phoneLIKE'+EncodedSelectedText
        let RegExMatcher =         
} else {
    
        let url = 'https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number='+EncodedSelectedText
}