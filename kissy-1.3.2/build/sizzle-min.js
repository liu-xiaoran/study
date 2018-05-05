/*
Copyright 2013, KISSY UI Library v1.32
MIT Licensed
build time: Aug 15 00:07
*/
KISSY.add("sizzle",function(){function k(a,b,c,d){var c=c||[],b=b||j,g,f,e,i,h=b.nodeType;if(!a||"string"!==typeof a)return c;if(1!==h&&9!==h)return[];e=E(b);if(!e&&!d&&(g=fa.exec(a)))if(i=g[1])if(9===h)if((f=b.getElementById(i))&&f.parentNode){if(f.id===i)return c.push(f),c}else return c;else{if(b.ownerDocument&&(f=b.ownerDocument.getElementById(i))&&v(b,f)&&f.id===i)return c.push(f),c}else{if(g[2])return z.apply(c,A.call(b.getElementsByTagName(a),0)),c;if((i=g[3])&&X&&b.getElementsByClassName)return z.apply(c,
A.call(b.getElementsByClassName(i),0)),c}return L(a.replace(F,"$1"),b,c,d,e)}function B(a){return function(b){return"input"===b.nodeName.toLowerCase()&&b.type===a}}function Y(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function y(a){return s(function(b){b=+b;return s(function(c,d){for(var g,f=a([],c.length,b),e=f.length;e--;)if(c[g=f[e]])c[g]=!(d[g]=c[g])})})}function Z(a,b){if(a&&b)for(var c=a.nextSibling;c;){if(c===b)return-1;c=c.nextSibling}return a?
1:-1}function G(a,b){var c,d,g,f,e,i,h;if(e=$[m][a+" "])return b?0:e.slice(0);e=a;i=[];for(h=l.preFilter;e;){if(!c||(d=ga.exec(e)))d&&(e=e.slice(d[0].length)||e),i.push(g=[]);c=!1;if(d=ha.exec(e))g.push(c=new aa(d.shift())),e=e.slice(c.length),c.type=d[0].replace(F," ");for(f in l.filter)if((d=H[f].exec(e))&&(!h[f]||(d=h[f](d))))g.push(c=new aa(d.shift())),e=e.slice(c.length),c.type=f,c.matches=d;if(!c)break}return b?e.length:e?k.error(a):$(a,i).slice(0)}function M(a,b,c){var d=b.dir,g=c&&"parentNode"===
b.dir,f=ia++;return b.first?function(b,c,f){for(;b=b[d];)if(g||1===b.nodeType)return a(b,c,f)}:function(b,c,h){if(h)for(;b=b[d];){if((g||1===b.nodeType)&&a(b,c,h))return b}else for(var n,r=C+" "+f+" ",w=r+N;b=b[d];)if(g||1===b.nodeType){if((n=b[m])===w)return b.sizset;if("string"===typeof n&&0===n.indexOf(r)){if(b.sizset)return b}else{b[m]=w;if(a(b,c,h))return b.sizset=!0,b;b.sizset=!1}}}}function O(a){return 1<a.length?function(b,c,d){for(var g=a.length;g--;)if(!a[g](b,c,d))return!1;return!0}:a[0]}
function I(a,b,c,d,g){for(var f,e=[],i=0,h=a.length,n=null!=b;i<h;i++)if(f=a[i])if(!c||c(f,d,g))e.push(f),n&&b.push(i);return e}function P(a,b,c,d,g,f){d&&!d[m]&&(d=P(d));g&&!g[m]&&(g=P(g,f));return s(function(e,f,h,n){var r,w,l=[],j=[],m=f.length,p;if(!(p=e)){p=b||"*";for(var q=h.nodeType?[h]:h,o=[],s=0,t=q.length;s<t;s++)k(p,q[s],o);p=o}p=a&&(e||!b)?I(p,l,a,h,n):p;q=c?g||(e?a:m||d)?[]:f:p;c&&c(p,q,h,n);if(d){r=I(q,j);d(r,[],h,n);for(h=r.length;h--;)if(w=r[h])q[j[h]]=!(p[j[h]]=w)}if(e){if(g||a){if(g){r=
[];for(h=q.length;h--;)if(w=q[h])r.push(p[h]=w);g(null,q=[],r,n)}for(h=q.length;h--;)if((w=q[h])&&-1<(r=g?Q.call(e,w):l[h]))e[r]=!(f[r]=w)}}else q=I(q===f?q.splice(m,q.length):q),g?g(null,f,q,n):z.apply(f,q)})}function R(a){var b,c,d,g=a.length,f=l.relative[a[0].type];c=f||l.relative[" "];for(var e=f?1:0,i=M(function(a){return a===b},c,!0),h=M(function(a){return-1<Q.call(b,a)},c,!0),n=[function(a,c,d){return!f&&(d||c!==J)||((b=c).nodeType?i(a,c,d):h(a,c,d))}];e<g;e++)if(c=l.relative[a[e].type])n=
[M(O(n),c)];else{c=l.filter[a[e].type].apply(null,a[e].matches);if(c[m]){for(d=++e;d<g&&!l.relative[a[d].type];d++);return P(1<e&&O(n),1<e&&a.slice(0,e-1).join("").replace(F,"$1"),c,e<d&&R(a.slice(e,d)),d<g&&R(a=a.slice(d)),d<g&&a.join(""))}n.push(c)}return O(n)}function ja(a,b){var c=0,d=0<b.length,g=0<a.length,f=function(f,i,h,n,r){var m,s,o=[],t=0,p="0",q=f&&[],u=null!=r,v=J,y=f||g&&l.find.TAG("*",r&&i.parentNode||i),x=C+=null==v?1:Math.E;u&&(J=i!==j&&i,N=c);for(;null!=(r=y[p]);p++){if(g&&r){for(m=
0;s=a[m];m++)if(s(r,i,h)){n.push(r);break}u&&(C=x,N=++c)}d&&((r=!s&&r)&&t--,f&&q.push(r))}t+=p;if(d&&p!==t){for(m=0;s=b[m];m++)s(q,o,i,h);if(f){if(0<t)for(;p--;)!q[p]&&!o[p]&&(o[p]=ka.call(n));o=I(o)}z.apply(n,o);u&&!f&&0<o.length&&1<t+b.length&&k.uniqueSort(n)}u&&(C=x,J=v);return q};return d?s(f):f}function L(a,b,c,d,g){var f,e,i,h,n=G(a);if(!d&&1===n.length){e=n[0]=n[0].slice(0);if(2<e.length&&"ID"===(i=e[0]).type&&9===b.nodeType&&!g&&l.relative[e[1].type]){b=l.find.ID(i.matches[0].replace(x,""),
b,g)[0];if(!b)return c;a=a.slice(e.shift().length)}for(f=H.needsContext.test(a)?-1:e.length-1;0<=f;f--){i=e[f];if(l.relative[h=i.type])break;if(h=l.find[h])if(d=h(i.matches[0].replace(x,""),S.test(e[0].type)&&b.parentNode||b,g)){e.splice(f,1);a=d.length&&e.join("");if(!a)return z.apply(c,A.call(d,0)),c;break}}}T(a,n)(d,b,g,c,S.test(a));return c}function ba(){}var N,U,l,K,E,v,T,V,D,J,ca=!0,m=("sizcache"+Math.random()).replace(".",""),aa=String,j=window.document,o=j.documentElement,C=0,ia=0,ka=[].pop,
z=[].push,A=[].slice,Q=[].indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1},s=function(a,b){a[m]=null==b||b;return a},t=function(){var a={},b=[];return s(function(c,d){b.push(c)>l.cacheLength&&delete a[b.shift()];return a[c+" "]=d},a)},da=t(),$=t(),ea=t(),t="\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)[\\x20\\t\\r\\n\\f]*(?:([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+"(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w","w#")+
")|)|)[\\x20\\t\\r\\n\\f]*\\]",W=":((?:\\\\.|[-\\w]|[^\\x00-\\xa0])+)(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:"+t+")|[^:]|\\\\.)*|.*))\\)|)",F=RegExp("^[\\x20\\t\\r\\n\\f]+|((?:^|[^\\\\])(?:\\\\.)*)[\\x20\\t\\r\\n\\f]+$","g"),ga=/^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,ha=/^[\x20\t\r\n\f]*([\x20\t\r\n\f>+~])[\x20\t\r\n\f]*/,la=RegExp(W),fa=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,S=/[\x20\t\r\n\f]*[+~]/,ma=/h\d/i,na=/input|select|textarea|button/i,x=/\\(?!\\)/g,H={ID:/^#((?:\\.|[-\w]|[^\x00-\xa0])+)/,
CLASS:/^\.((?:\\.|[-\w]|[^\x00-\xa0])+)/,NAME:/^\[name=['"]?((?:\\.|[-\w]|[^\x00-\xa0])+)['"]?\]/,TAG:RegExp("^("+"(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+".replace("w","w*")+")"),ATTR:RegExp("^"+t),PSEUDO:RegExp("^"+W),CHILD:RegExp("^:(only|nth|first|last)-child(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)","i"),needsContext:RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)",
"i")},u=function(a){var b=j.createElement("div");try{return a(b)}catch(c){return!1}finally{}},t=u(function(a){a.appendChild(j.createComment(""));return!a.getElementsByTagName("*").length}),oa=u(function(a){a.innerHTML="<a href='#'></a>";return a.firstChild&&"undefined"!==typeof a.firstChild.getAttribute&&"#"===a.firstChild.getAttribute("href")}),pa=u(function(a){a.innerHTML="<select></select>";a=typeof a.lastChild.getAttribute("multiple");return"boolean"!==a&&"string"!==a}),X=u(function(a){a.innerHTML=
"<div class='hidden e'></div><div class='hidden'></div>";if(!a.getElementsByClassName||!a.getElementsByClassName("e").length)return!1;a.lastChild.className="e";return 2===a.getElementsByClassName("e").length}),qa=u(function(a){a.id=m+0;a.innerHTML="<a name='"+m+"'></a><div name='"+m+"'></div>";o.insertBefore(a,o.firstChild);var b=j.getElementsByName&&j.getElementsByName(m).length===2+j.getElementsByName(m+0).length;U=!j.getElementById(m);o.removeChild(a);return b});try{A.call(o.childNodes,0)[0].nodeType}catch(ra){A=
function(a){for(var b,c=[];b=this[a];a++)c.push(b);return c}}k.matches=function(a,b){return k(a,null,null,b)};k.matchesSelector=function(a,b){return 0<k(b,null,null,[a]).length};K=k.getText=function(a){var b,c="",d=0;if(b=a.nodeType)if(1===b||9===b||11===b){if("string"===typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=K(a)}else{if(3===b||4===b)return a.nodeValue}else for(;b=a[d];d++)c+=K(b);return c};E=k.isXML=function(a){return(a=a&&(a.ownerDocument||a).documentElement)?
"HTML"!==a.nodeName:!1};v=k.contains=o.contains?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||!(1===d.nodeType&&c.contains&&c.contains(d)))}:o.compareDocumentPosition?function(a,b){return b&&!!(a.compareDocumentPosition(b)&16)}:function(a,b){for(;b=b.parentNode;)if(b===a)return!0;return!1};k.attr=function(a,b){var c,d=E(a);d||(b=b.toLowerCase());return(c=l.attrHandle[b])?c(a):d||pa?a.getAttribute(b):(c=a.getAttributeNode(b))?"boolean"===typeof a[b]?a[b]?
b:null:c.specified?c.value:null:null};l=k.selectors={cacheLength:50,createPseudo:s,match:H,attrHandle:oa?{}:{href:function(a){return a.getAttribute("href",2)},type:function(a){return a.getAttribute("type")}},find:{ID:U?function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(a=b.getElementById(a))&&a.parentNode?[a]:[]}:function(a,b,c){if("undefined"!==typeof b.getElementById&&!c)return(b=b.getElementById(a))?b.id===a||"undefined"!==typeof b.getAttributeNode&&b.getAttributeNode("id").value===
a?[b]:void 0:[]},TAG:t?function(a,b){if("undefined"!==typeof b.getElementsByTagName)return b.getElementsByTagName(a)}:function(a,b){var c=b.getElementsByTagName(a);if("*"===a){for(var d,g=[],f=0;d=c[f];f++)1===d.nodeType&&g.push(d);return g}return c},NAME:qa&&function(a,b){if("undefined"!==typeof b.getElementsByName)return b.getElementsByName(name)},CLASS:X&&function(a,b,c){if("undefined"!==typeof b.getElementsByClassName&&!c)return b.getElementsByClassName(a)}},relative:{">":{dir:"parentNode",first:!0},
" ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){a[1]=a[1].replace(x,"");a[3]=(a[4]||a[5]||"").replace(x,"");"~="===a[2]&&(a[3]=" "+a[3]+" ");return a.slice(0,4)},CHILD:function(a){a[1]=a[1].toLowerCase();"nth"===a[1]?(a[2]||k.error(a[0]),a[3]=+(a[3]?a[4]+(a[5]||1):2*("even"===a[2]||"odd"===a[2])),a[4]=+(a[6]+a[7]||"odd"===a[2])):a[2]&&k.error(a[0]);return a},PSEUDO:function(a){var b,c;if(H.CHILD.test(a[0]))return null;if(a[3])a[2]=
a[3];else if(b=a[4]){if(la.test(b)&&(c=G(b,!0))&&(c=b.indexOf(")",b.length-c)-b.length))b=b.slice(0,c),a[0]=a[0].slice(0,c);a[2]=b}return a.slice(0,3)}},filter:{ID:U?function(a){a=a.replace(x,"");return function(b){return b.getAttribute("id")===a}}:function(a){a=a.replace(x,"");return function(b){return(b="undefined"!==typeof b.getAttributeNode&&b.getAttributeNode("id"))&&b.value===a}},TAG:function(a){if("*"===a)return function(){return!0};a=a.replace(x,"").toLowerCase();return function(b){return b.nodeName&&
b.nodeName.toLowerCase()===a}},CLASS:function(a){var b=da[m][a+" "];return b||(b=RegExp("(^|[\\x20\\t\\r\\n\\f])"+a+"([\\x20\\t\\r\\n\\f]|$)"))&&da(a,function(a){return b.test(a.className||"undefined"!==typeof a.getAttribute&&a.getAttribute("class")||"")})},ATTR:function(a,b,c){return function(d){d=k.attr(d,a);if(null==d)return"!="===b;if(!b)return!0;d+="";return"="===b?d===c:"!="===b?d!==c:"^="===b?c&&0===d.indexOf(c):"*="===b?c&&-1<d.indexOf(c):"$="===b?c&&d.substr(d.length-c.length)===c:"~="===
b?-1<(" "+d+" ").indexOf(c):"|="===b?d===c||d.substr(0,c.length+1)===c+"-":!1}},CHILD:function(a,b,c,d){return"nth"===a?function(a){var b,e;b=a.parentNode;if(1===c&&0===d)return!0;if(b){e=0;for(b=b.firstChild;b&&!(1===b.nodeType&&(e++,a===b));b=b.nextSibling);}e-=d;return e===c||0===e%c&&0<=e/c}:function(b){var c=b;switch(a){case "only":case "first":for(;c=c.previousSibling;)if(1===c.nodeType)return!1;if("first"===a)return!0;c=b;case "last":for(;c=c.nextSibling;)if(1===c.nodeType)return!1;return!0}}},
PSEUDO:function(a,b){var c,d=l.pseudos[a]||l.setFilters[a.toLowerCase()]||k.error("unsupported pseudo: "+a);return d[m]?d(b):1<d.length?(c=[a,a,"",b],l.setFilters.hasOwnProperty(a.toLowerCase())?s(function(a,c){for(var e,i=d(a,b),h=i.length;h--;)e=Q.call(a,i[h]),a[e]=!(c[e]=i[h])}):function(a){return d(a,0,c)}):d}},pseudos:{not:s(function(a){var b=[],c=[],d=T(a.replace(F,"$1"));return d[m]?s(function(a,b,c,i){for(var i=d(a,null,i,[]),h=a.length;h--;)if(c=i[h])a[h]=!(b[h]=c)}):function(a,f,e){b[0]=
a;d(b,null,e,c);return!c.pop()}}),has:s(function(a){return function(b){return 0<k(a,b).length}}),contains:s(function(a){return function(b){return-1<(b.textContent||b.innerText||K(b)).indexOf(a)}}),enabled:function(a){return!1===a.disabled},disabled:function(a){return!0===a.disabled},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){a.parentNode&&a.parentNode.selectedIndex;return!0===a.selected},parent:function(a){return!l.pseudos.empty(a)},
empty:function(a){for(var b,a=a.firstChild;a;){if("@"<a.nodeName||3===(b=a.nodeType)||4===b)return!1;a=a.nextSibling}return!0},header:function(a){return ma.test(a.nodeName)},text:function(a){var b,c;return"input"===a.nodeName.toLowerCase()&&"text"===(b=a.type)&&(null==(c=a.getAttribute("type"))||c.toLowerCase()===b)},radio:B("radio"),checkbox:B("checkbox"),file:B("file"),password:B("password"),image:B("image"),submit:Y("submit"),reset:Y("reset"),button:function(a){var b=a.nodeName.toLowerCase();return"input"===
b&&"button"===a.type||"button"===b},input:function(a){return na.test(a.nodeName)},focus:function(a){var b=a.ownerDocument;return a===b.activeElement&&(!b.hasFocus||b.hasFocus())&&!(!a.type&&!a.href&&!~a.tabIndex)},active:function(a){return a===a.ownerDocument.activeElement},first:y(function(){return[0]}),last:y(function(a,b){return[b-1]}),eq:y(function(a,b,c){return[0>c?c+b:c]}),even:y(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:y(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),
lt:y(function(a,b,c){for(b=0>c?c+b:c;0<=--b;)a.push(b);return a}),gt:y(function(a,b,c){for(c=0>c?c+b:c;++c<b;)a.push(c);return a})}};V=o.compareDocumentPosition?function(a,b){var c,d;return a===b?(D=!0,0):a.compareDocumentPosition&&b.compareDocumentPosition?(c=a.compareDocumentPosition(b))&1||(d=a.parentNode)&&11===d.nodeType?a===j||v(j,a)?-1:b===j||v(j,b)?1:0:c&4?-1:1:a.compareDocumentPosition?-1:1}:function(a,b){if(a===b)return D=!0,0;if(a.sourceIndex&&b.sourceIndex)return(~b.sourceIndex||-2147483648)-
(v(j,a)&&~a.sourceIndex||-2147483648);var c=0,d=[a],g=[b],f=a.parentNode,e=b.parentNode,i=f;if(a===j)return-1;if(b===j)return 1;if(!f&&!e)return 0;if(e)if(f){if(f===e)return Z(a,b)}else return 1;else return-1;for(;i;)d.unshift(i),i=i.parentNode;for(i=e;i;)g.unshift(i),i=i.parentNode;for(;d[c]===g[c];)c++;return 0===c?d[0]===j||v(j,d[0])?-1:g[0]===j||v(j,g[0])?1:0:Z(d[c],g[c])};[0,0].sort(V);ca=!D;k.uniqueSort=function(a){var b,c=[],d=1,g=0;D=ca;a.sort(V);if(D){for(;b=a[d];d++)b===a[d-1]&&(g=c.push(d));
for(;g--;)a.splice(c[g],1)}return a};k.error=function(a){throw Error("Syntax error, unrecognized expression: "+a);};T=k.compile=function(a,b){var c,d=[],g=[],f=ea[m][a+" "];if(!f){b||(b=G(a));for(c=b.length;c--;)f=R(b[c]),f[m]?d.push(f):g.push(f);f=ea(a,ja(g,d))}return f};j.querySelectorAll&&function(){var a,b=L,c=/'|\\/g,d=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,g=[":focus"],f=[":active"],e=o.matchesSelector||o.mozMatchesSelector||o.webkitMatchesSelector||o.oMatchesSelector||o.msMatchesSelector;
u(function(a){a.innerHTML="<select><option selected=''></option></select>";a.querySelectorAll("[selected]").length||g.push("\\[[\\x20\\t\\r\\n\\f]*(?:checked|disabled|ismap|multiple|readonly|selected|value)");a.querySelectorAll(":checked").length||g.push(":checked")});u(function(a){a.innerHTML="<p test=''></p>";a.querySelectorAll("[test^='']").length&&g.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:\"\"|'')");a.innerHTML="<input type='hidden'/>";a.querySelectorAll(":enabled").length||g.push(":enabled",":disabled")});
g=RegExp(g.join("|"));L=function(a,d,e,f,l){if(!f&&!l&&!g.test(a)){var j,k,o=!0,p=m;k=d;j=9===d.nodeType&&a;if(1===d.nodeType&&"object"!==d.nodeName.toLowerCase()){j=G(a);(o=d.getAttribute("id"))?p=o.replace(c,"\\$&"):d.setAttribute("id",p);p="[id='"+p+"'] ";for(k=j.length;k--;)j[k]=p+j[k].join("");k=S.test(a)&&d.parentNode||d;j=j.join(",")}if(j)try{return z.apply(e,A.call(k.querySelectorAll(j),0)),e}catch(q){}finally{o||d.removeAttribute("id")}}return b(a,d,e,f,l)};e&&(u(function(b){a=e.call(b,"div");
try{e.call(b,"[test!='']:sizzle"),f.push("!=",W)}catch(c){}}),f=RegExp(f.join("|")),k.matchesSelector=function(b,c){c=c.replace(d,"='$1']");if(!E(b)&&!f.test(c)&&!g.test(c))try{var j=e.call(b,c);if(j||a||b.document&&11!==b.document.nodeType)return j}catch(l){}return 0<k(c,null,null,[b]).length})}();l.pseudos.nth=l.pseudos.eq;l.filters=ba.prototype=l.pseudos;l.setFilters=new ba;return k});
