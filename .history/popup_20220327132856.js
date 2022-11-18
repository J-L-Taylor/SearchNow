/* eslint-disable no-undef */
/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck

document.addEventListener('DOMContentLoaded', function() {

  var checkHomePageButton = document.getElementById('homePage');

  checkHomePageButton.addEventListener('click', function() {
    chrome.tabs.create({
      url: 'https://gsa.servicenowservices.com/nav_to.do?uri=%2Fhome.do'
    });
  }, false);

  var checkSubmitButton = document.getElementById('submit');

  checkSubmitButton.addEventListener('click', function() {
    var query = document.getElementById("searcher").value;
    chrome.tabs.create({
      url: 'https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search='+query
    });
  }, false);

}, false);