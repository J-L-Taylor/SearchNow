processDocument();

//Walk the DOM of the <body> handling all non-empty text nodes
function processDocument() {
  let treeWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT,{
      acceptNode: function(node) { 
          if(node.textContent.length === 0) {
              return NodeFilter.FILTER_SKIP; //Skip empty text nodes
          } //else
          return NodeFilter.FILTER_ACCEPT;
        }
    });
  let nodeList=[];
  while(treeWalker.nextNode()){
      nodeList.push(treeWalker.currentNode.textContent);
  }
  console.log(nodeList);
  //Iterate over all text nodes, calling handleTextNode on each node in the list.
  nodeList.forEach(function(el){
      handleTextNode(el);
  });
  } 

function handleTextNode(textNode) {
  var newHtml = '';
  if(textNode.nodeName !== '#text' || textNode.parentNode.nodeName === 'SCRIPT' || textNode.parentNode.nodeName === 'STYLE') {
    console.log(textNode.nodeName);
    return
  };
  let origText = textNode.textContent;
  let CatchAllTicketNumRegExPattern = /[A-Za-z]{2,5}[0-9]{7,9}/g;
  if(CatchAllTicketNumRegExPattern.test(origText)){
      var newHtml=`<a href="https://gsa.servicenowservices.com/nav_to.do?uri=task.do?sysparm_query=number=${origText}">${origText}</a>`
  }
  //Compare the strings, as it should be faster than a second RegExp operation and
  //  lets us use the RegExp in only one place for maintainability.
  if(newHtml !== origText) {
      let newSpan = document.createElement('span');
      newSpan.innerHTML = newHtml;
      textNode.parentNode.replaceChild(newSpan,textNode);
  }
}