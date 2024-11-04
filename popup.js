/* eslint-disable no-undef */
/* jshint moz:true */
/* jshint esversion: 6*/
// @ts-nocheck

document.addEventListener('DOMContentLoaded', function() {
    const searcherInput = document.getElementById('searcher');
    const customSearchEnginesDropdown = document.getElementById('custom-search-engines');

    // Read and parse the CSV file
    fetch('custom_search_engines.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            rows.forEach(row => {
                const [title, url, faviconUrl] = row.split(',');
                if (title && url && faviconUrl) {
                    const option = document.createElement('option');
                    option.text = title;
                    option.value = url;
                    option.style.backgroundImage = `url(${faviconUrl})`;
                    option.style.backgroundRepeat = 'no-repeat';
                    option.style.backgroundPosition = 'left center';
                    option.style.paddingLeft = '20px'; // Adjust padding to make space for the icon
                    customSearchEnginesDropdown.add(option);
                }
            });
        });

    // Handle dropdown selection
    customSearchEnginesDropdown.addEventListener('change', function() {
        const selectedUrl = customSearchEnginesDropdown.value;
        if (selectedUrl) {
            const query = searcherInput.value;
            const finalUrl = selectedUrl.replace(/{searchTerms}/g, encodeURIComponent(query));
            chrome.tabs.create({ url: finalUrl });
        }
    });

    document.getElementById('homePage').addEventListener('click', function() {
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/nav_to.do?uri=%2Fhome.do'
        });
    });

    document.getElementById('submit').addEventListener('click', function() {
        const query = searcherInput.value;
        chrome.tabs.create({
            url: 'https://gsa.servicenowservices.com/$sn_global_search_results.do?sysparm_search=' + query
        });
    });
});