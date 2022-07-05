var _self="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},Prism=function(l){var t=/(?:^|\s)lang(?:uage)?-([\w-]+)(?=\s|$)/i,n=0,e={},T={manual:l.Prism&&l.Prism.manual,disableWorkerMessageHandler:l.Prism&&l.Prism.disableWorkerMessageHandler,util:{encode:function e(n){return n instanceof j?new j(n.type,e(n.content),n.alias):Array.isArray(n)?n.map(e):n.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).slice(8,-1)},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++n}),e.__id},clone:function t(e,a){var r,n;switch(a=a||{},T.util.type(e)){case"Object":if(n=T.util.objId(e),a[n])return a[n];for(var i in r={},a[n]=r,e)e.hasOwnProperty(i)&&(r[i]=t(e[i],a));return r;case"Array":return n=T.util.objId(e),a[n]||(r=[],a[n]=r,e.forEach(function(e,n){r[n]=t(e,a)}),r);default:return e}},getLanguage:function(e){for(;e;){var n=t.exec(e.className);if(n)return n[1].toLowerCase();e=e.parentElement}return"none"},setLanguage:function(e,n){e.className=e.className.replace(RegExp(t,"gi"),""),e.classList.add("language-"+n)},currentScript:function(){if("undefined"==typeof document)return null;if("currentScript"in document)return document.currentScript;try{throw new Error}catch(e){var n=(/at [^(\r\n]*\((.*):[^:]+:[^:]+\)$/i.exec(e.stack)||[])[1];if(n){var t,a=document.getElementsByTagName("script");for(t in a)if(a[t].src==n)return a[t]}return null}},isActive:function(e,n,t){for(var a="no-"+n;e;){var r=e.classList;if(r.contains(n))return!0;if(r.contains(a))return!1;e=e.parentElement}return!!t}},languages:{plain:e,plaintext:e,text:e,txt:e,extend:function(e,n){var t,a=T.util.clone(T.languages[e]);for(t in n)a[t]=n[t];return a},insertBefore:function(t,e,n,a){var r,i=(a=a||T.languages)[t],s={};for(r in i)if(i.hasOwnProperty(r)){if(r==e)for(var o in n)n.hasOwnProperty(o)&&(s[o]=n[o]);n.hasOwnProperty(r)||(s[r]=i[r])}var l=a[t];return a[t]=s,T.languages.DFS(T.languages,function(e,n){n===l&&e!=t&&(this[e]=s)}),s},DFS:function e(n,t,a,r){r=r||{};var i,s,o,l=T.util.objId;for(i in n)n.hasOwnProperty(i)&&(t.call(n,i,n[i],a||i),s=n[i],"Object"!==(o=T.util.type(s))||r[l(s)]?"Array"!==o||r[l(s)]||(r[l(s)]=!0,e(s,t,i,r)):(r[l(s)]=!0,e(s,t,null,r)))}},plugins:{},highlightAll:function(e,n){T.highlightAllUnder(document,e,n)},highlightAllUnder:function(e,n,t){var a={callback:t,container:e,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};T.hooks.run("before-highlightall",a),a.elements=Array.prototype.slice.apply(a.container.querySelectorAll(a.selector)),T.hooks.run("before-all-elements-highlight",a);for(var r,i=0;r=a.elements[i++];)T.highlightElement(r,!0===n,a.callback)},highlightElement:function(e,n,t){var a=T.util.getLanguage(e),r=T.languages[a],i=(T.util.setLanguage(e,a),e.parentElement),s=(i&&"pre"===i.nodeName.toLowerCase()&&T.util.setLanguage(i,a),{element:e,language:a,grammar:r,code:e.textContent});function o(e){s.highlightedCode=e,T.hooks.run("before-insert",s),s.element.innerHTML=s.highlightedCode,T.hooks.run("after-highlight",s),T.hooks.run("complete",s),t&&t.call(s.element)}if(T.hooks.run("before-sanity-check",s),(i=s.element.parentElement)&&"pre"===i.nodeName.toLowerCase()&&!i.hasAttribute("tabindex")&&i.setAttribute("tabindex","0"),!s.code)return T.hooks.run("complete",s),void(t&&t.call(s.element));T.hooks.run("before-highlight",s),s.grammar?n&&l.Worker?((a=new Worker(T.filename)).onmessage=function(e){o(e.data)},a.postMessage(JSON.stringify({language:s.language,code:s.code,immediateClose:!0}))):o(T.highlight(s.code,s.grammar,s.language)):o(T.util.encode(s.code))},highlight:function(e,n,t){e={code:e,grammar:n,language:t};if(T.hooks.run("before-tokenize",e),e.grammar)return e.tokens=T.tokenize(e.code,e.grammar),T.hooks.run("after-tokenize",e),j.stringify(T.util.encode(e.tokens),e.language);throw new Error('The language "'+e.language+'" has no grammar.')},tokenize:function(e,n){var t=n.rest;if(t){for(var a in t)n[a]=t[a];delete n.rest}for(var r=new u,i=(L(r,r.head,e),function e(n,t,a,r,i,s){for(var o in a)if(a.hasOwnProperty(o)&&a[o]){var l=a[o];l=Array.isArray(l)?l:[l];for(var u=0;u<l.length;++u){if(s&&s.cause==o+","+u)return;var g,c=l[u],d=c.inside,p=!!c.lookbehind,m=!!c.greedy,h=c.alias;m&&!c.pattern.global&&(g=c.pattern.toString().match(/[imsuy]*$/)[0],c.pattern=RegExp(c.pattern.source,g+"g"));for(var f=c.pattern||c,b=r.next,k=i;b!==t.tail&&!(s&&k>=s.reach);k+=b.value.length,b=b.next){var y=b.value;if(t.length>n.length)return;if(!(y instanceof j)){var v,F=1;if(m){if(!(v=C(f,k,n,p))||v.index>=n.length)break;var x=v.index,w=v.index+v[0].length,A=k;for(A+=b.value.length;A<=x;)A+=(b=b.next).value.length;if(k=A-=b.value.length,b.value instanceof j)continue;for(var P=b;P!==t.tail&&(A<w||"string"==typeof P.value);P=P.next)F++,A+=P.value.length;F--,y=n.slice(k,A),v.index-=k}else if(!(v=C(f,0,y,p)))continue;x=v.index;var $=v[0],_=y.slice(0,x),S=y.slice(x+$.length),y=k+y.length,E=(s&&y>s.reach&&(s.reach=y),b.prev);_&&(E=L(t,E,_),k+=_.length),z(t,E,F),b=L(t,E,new j(o,d?T.tokenize($,d):$,h,$)),S&&L(t,b,S),1<F&&(_={cause:o+","+u,reach:y},e(n,t,a,b.prev,k,_),s&&_.reach>s.reach&&(s.reach=_.reach))}}}}}(e,r,n,r.head,0),r),s=[],o=i.head.next;o!==i.tail;)s.push(o.value),o=o.next;return s},hooks:{all:{},add:function(e,n){var t=T.hooks.all;t[e]=t[e]||[],t[e].push(n)},run:function(e,n){var t=T.hooks.all[e];if(t&&t.length)for(var a,r=0;a=t[r++];)a(n)}},Token:j};function j(e,n,t,a){this.type=e,this.content=n,this.alias=t,this.length=0|(a||"").length}function C(e,n,t,a){e.lastIndex=n;n=e.exec(t);return n&&a&&n[1]&&(e=n[1].length,n.index+=e,n[0]=n[0].slice(e)),n}function u(){var e={value:null,prev:null,next:null},n={value:null,prev:e,next:null};e.next=n,this.head=e,this.tail=n,this.length=0}function L(e,n,t){var a=n.next,t={value:t,prev:n,next:a};return n.next=t,a.prev=t,e.length++,t}function z(e,n,t){for(var a=n.next,r=0;r<t&&a!==e.tail;r++)a=a.next;(n.next=a).prev=n,e.length-=r}if(l.Prism=T,j.stringify=function n(e,t){if("string"==typeof e)return e;var a;if(Array.isArray(e))return a="",e.forEach(function(e){a+=n(e,t)}),a;var r,i={type:e.type,content:n(e.content,t),tag:"span",classes:["token",e.type],attributes:{},language:t},e=e.alias,s=(e&&(Array.isArray(e)?Array.prototype.push.apply(i.classes,e):i.classes.push(e)),T.hooks.run("wrap",i),"");for(r in i.attributes)s+=" "+r+'="'+(i.attributes[r]||"").replace(/"/g,"&quot;")+'"';return"<"+i.tag+' class="'+i.classes.join(" ")+'"'+s+">"+i.content+"</"+i.tag+">"},!l.document)return l.addEventListener&&(T.disableWorkerMessageHandler||l.addEventListener("message",function(e){var e=JSON.parse(e.data),n=e.language,t=e.code,e=e.immediateClose;l.postMessage(T.highlight(t,T.languages[n],n)),e&&l.close()},!1)),T;var a,e=T.util.currentScript();function r(){T.manual||T.highlightAll()}return e&&(T.filename=e.src,e.hasAttribute("data-manual")&&(T.manual=!0)),T.manual||("loading"===(a=document.readyState)||"interactive"===a&&e&&e.defer?document.addEventListener("DOMContentLoaded",r):window.requestAnimationFrame?window.requestAnimationFrame(r):window.setTimeout(r,16)),T}(_self);"undefined"!=typeof module&&module.exports&&(module.exports=Prism),"undefined"!=typeof global&&(global.Prism=Prism),Prism.languages.markup={comment:{pattern:/<!--(?:(?!<!--)[\s\S])*?-->/,greedy:!0},prolog:{pattern:/<\?[\s\S]+?\?>/,greedy:!0},doctype:{pattern:/<!DOCTYPE(?:[^>"'[\]]|"[^"]*"|'[^']*')+(?:\[(?:[^<"'\]]|"[^"]*"|'[^']*'|<(?!!--)|<!--(?:[^-]|-(?!->))*-->)*\]\s*)?>/i,greedy:!0,inside:{"internal-subset":{pattern:/(^[^\[]*\[)[\s\S]+(?=\]>$)/,lookbehind:!0,greedy:!0,inside:null},string:{pattern:/"[^"]*"|'[^']*'/,greedy:!0},punctuation:/^<!|>$|[[\]]/,"doctype-tag":/^DOCTYPE/i,name:/[^\s<>'"]+/}},cdata:{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,greedy:!0},tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"special-attr":[],"attr-value":{pattern:/=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/,inside:{punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:[{pattern:/&[\da-z]{1,8};/i,alias:"named-entity"},/&#x?[\da-f]{1,8};/i]},Prism.languages.markup.tag.inside["attr-value"].inside.entity=Prism.languages.markup.entity,Prism.languages.markup.doctype.inside["internal-subset"].inside=Prism.languages.markup,Prism.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),Object.defineProperty(Prism.languages.markup.tag,"addInlined",{value:function(e,n){var t={},t=(t["language-"+n]={pattern:/(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,lookbehind:!0,inside:Prism.languages[n]},t.cdata=/^<!\[CDATA\[|\]\]>$/i,{"included-cdata":{pattern:/<!\[CDATA\[[\s\S]*?\]\]>/i,inside:t}}),n=(t["language-"+n]={pattern:/[\s\S]+/,inside:Prism.languages[n]},{});n[e]={pattern:RegExp("(<__[^>]*>)(?:<!\\[CDATA\\[(?:[^\\]]|\\](?!\\]>))*\\]\\]>|(?!<!\\[CDATA\\[)[^])*?(?=</__>)".replace(/__/g,function(){return e}),"i"),lookbehind:!0,greedy:!0,inside:t},Prism.languages.insertBefore("markup","cdata",n)}}),Object.defineProperty(Prism.languages.markup.tag,"addAttribute",{value:function(e,n){Prism.languages.markup.tag.inside["special-attr"].push({pattern:RegExp("(^|[\"'\\s])(?:"+e+")\\s*=\\s*(?:\"[^\"]*\"|'[^']*'|[^\\s'\">=]+(?=[\\s>]))","i"),lookbehind:!0,inside:{"attr-name":/^[^\s=]+/,"attr-value":{pattern:/=[\s\S]+/,inside:{value:{pattern:/(^=\s*(["']|(?!["'])))\S[\s\S]*(?=\2$)/,lookbehind:!0,alias:[n,"language-"+n],inside:Prism.languages[n]},punctuation:[{pattern:/^=/,alias:"attr-equals"},/"|'/]}}}})}}),Prism.languages.html=Prism.languages.markup,Prism.languages.mathml=Prism.languages.markup,Prism.languages.svg=Prism.languages.markup,Prism.languages.xml=Prism.languages.extend("markup",{}),Prism.languages.ssml=Prism.languages.xml,Prism.languages.atom=Prism.languages.xml,Prism.languages.rss=Prism.languages.xml,function(e){var n=/(?:"(?:\\(?:\r\n|[\s\S])|[^"\\\r\n])*"|'(?:\\(?:\r\n|[\s\S])|[^'\\\r\n])*')/,n=(e.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-](?:[^;{\s]|\s+(?![\s{]))*(?:;|(?=\s*\{))/,inside:{rule:/^@[\w-]+/,"selector-function-argument":{pattern:/(\bselector\s*\(\s*(?![\s)]))(?:[^()\s]|\s+(?![\s)])|\((?:[^()]|\([^()]*\))*\))+(?=\s*\))/,lookbehind:!0,alias:"selector"},keyword:{pattern:/(^|[^\w-])(?:and|not|only|or)(?![\w-])/,lookbehind:!0}}},url:{pattern:RegExp("\\burl\\((?:"+n.source+"|(?:[^\\\\\r\n()\"']|\\\\[^])*)\\)","i"),greedy:!0,inside:{function:/^url/i,punctuation:/^\(|\)$/,string:{pattern:RegExp("^"+n.source+"$"),alias:"url"}}},selector:{pattern:RegExp("(^|[{}\\s])[^{}\\s](?:[^{};\"'\\s]|\\s+(?![\\s{])|"+n.source+")*(?=\\s*\\{)"),lookbehind:!0},string:{pattern:n,greedy:!0},property:{pattern:/(^|[^-\w\xA0-\uFFFF])(?!\s)[-_a-z\xA0-\uFFFF](?:(?!\s)[-\w\xA0-\uFFFF])*(?=\s*:)/i,lookbehind:!0},important:/!important\b/i,function:{pattern:/(^|[^-a-z0-9])[-a-z0-9]+(?=\()/i,lookbehind:!0},punctuation:/[(){};:,]/},e.languages.css.atrule.inside.rest=e.languages.css,e.languages.markup);n&&(n.tag.addInlined("style","css"),n.tag.addAttribute("style","css"))}(Prism),Prism.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0,greedy:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/(\b(?:class|extends|implements|instanceof|interface|new|trait)\s+|\bcatch\s+\()[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:break|catch|continue|do|else|finally|for|function|if|in|instanceof|new|null|return|throw|try|while)\b/,boolean:/\b(?:false|true)\b/,function:/\b\w+(?=\()/,number:/\b0x[\da-f]+\b|(?:\b\d+(?:\.\d*)?|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/[<>]=?|[!=]=?=?|--?|\+\+?|&&?|\|\|?|[?*/~^%]/,punctuation:/[{}[\];(),.:]/},Prism.languages.javascript=Prism.languages.extend("clike",{"class-name":[Prism.languages.clike["class-name"],{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$A-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\.(?:constructor|prototype))/,lookbehind:!0}],keyword:[{pattern:/((?:^|\})\s*)catch\b/,lookbehind:!0},{pattern:/(^|[^.]|\.\.\.\s*)\b(?:as|assert(?=\s*\{)|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally(?=\s*(?:\{|$))|for|from(?=\s*(?:['"]|$))|function|(?:get|set)(?=\s*(?:[#\[$\w\xA0-\uFFFF]|$))|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,lookbehind:!0}],function:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,number:{pattern:RegExp("(^|[^\\w$])(?:NaN|Infinity|0[bB][01]+(?:_[01]+)*n?|0[oO][0-7]+(?:_[0-7]+)*n?|0[xX][\\dA-Fa-f]+(?:_[\\dA-Fa-f]+)*n?|\\d+(?:_\\d+)*n|(?:\\d+(?:_\\d+)*(?:\\.(?:\\d+(?:_\\d+)*)?)?|\\.\\d+(?:_\\d+)*)(?:[Ee][+-]?\\d+(?:_\\d+)*)?)(?![\\w$])"),lookbehind:!0},operator:/--|\+\+|\*\*=?|=>|&&=?|\|\|=?|[!=]==|<<=?|>>>?=?|[-+*/%&|^!=<>]=?|\.{3}|\?\?=?|\?\.?|[~:]/}),Prism.languages.javascript["class-name"][0].pattern=/(\b(?:class|extends|implements|instanceof|interface|new)\s+)[\w.\\]+/,Prism.languages.insertBefore("javascript","keyword",{regex:{pattern:RegExp("((?:^|[^$\\w\\xA0-\\uFFFF.\"'\\])\\s]|\\b(?:return|yield))\\s*)/(?:(?:\\[(?:[^\\]\\\\\r\n]|\\\\.)*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}|(?:\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.|\\[(?:[^[\\]\\\\\r\n]|\\\\.)*\\])*\\])*\\]|\\\\.|[^/\\\\\\[\r\n])+/[dgimyus]{0,7}v[dgimyus]{0,7})(?=(?:\\s|/\\*(?:[^*]|\\*(?!/))*\\*/)*(?:$|[\r\n,.;:})\\]]|//))"),lookbehind:!0,greedy:!0,inside:{"regex-source":{pattern:/^(\/)[\s\S]+(?=\/[a-z]*$)/,lookbehind:!0,alias:"language-regex",inside:Prism.languages.regex},"regex-delimiter":/^\/|\/$/,"regex-flags":/^[a-z]+$/}},"function-variable":{pattern:/#?(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)\s*=>))/,alias:"function"},parameter:[{pattern:/(function(?:\s+(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*)?\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\))/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(^|[^$\w\xA0-\uFFFF])(?!\s)[_$a-z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*=>)/i,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/(\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*=>)/,lookbehind:!0,inside:Prism.languages.javascript},{pattern:/((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*\s*)\(\s*|\]\s*\(\s*)(?!\s)(?:[^()\s]|\s+(?![\s)])|\([^()]*\))+(?=\s*\)\s*\{)/,lookbehind:!0,inside:Prism.languages.javascript}],constant:/\b[A-Z](?:[A-Z_]|\dx?)*\b/}),Prism.languages.insertBefore("javascript","string",{hashbang:{pattern:/^#!.*/,greedy:!0,alias:"comment"},"template-string":{pattern:/`(?:\\[\s\S]|\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}|(?!\$\{)[^\\`])*`/,greedy:!0,inside:{"template-punctuation":{pattern:/^`|`$/,alias:"string"},interpolation:{pattern:/((?:^|[^\\])(?:\\{2})*)\$\{(?:[^{}]|\{(?:[^{}]|\{[^}]*\})*\})+\}/,lookbehind:!0,inside:{"interpolation-punctuation":{pattern:/^\$\{|\}$/,alias:"punctuation"},rest:Prism.languages.javascript}},string:/[\s\S]+/}},"string-property":{pattern:/((?:^|[,{])[ \t]*)(["'])(?:\\(?:\r\n|[\s\S])|(?!\2)[^\\\r\n])*\2(?=\s*:)/m,lookbehind:!0,greedy:!0,alias:"property"}}),Prism.languages.insertBefore("javascript","operator",{"literal-property":{pattern:/((?:^|[,{])[ \t]*)(?!\s)[_$a-zA-Z\xA0-\uFFFF](?:(?!\s)[$\w\xA0-\uFFFF])*(?=\s*:)/m,lookbehind:!0,alias:"property"}}),Prism.languages.markup&&(Prism.languages.markup.tag.addInlined("script","javascript"),Prism.languages.markup.tag.addAttribute("on(?:abort|blur|change|click|composition(?:end|start|update)|dblclick|error|focus(?:in|out)?|key(?:down|up)|load|mouse(?:down|enter|leave|move|out|over|up)|reset|resize|scroll|select|slotchange|submit|unload|wheel)","javascript")),Prism.languages.js=Prism.languages.javascript,function(o){function e(e){return e=e.replace(/<inner>/g,function(){return"(?:\\\\.|[^\\\\\n\r]|(?:\n|\r\n?)(?![\r\n]))"}),RegExp("((?:^|[^\\\\])(?:\\\\{2})*)(?:"+e+")")}var n="(?:\\\\.|``(?:[^`\r\n]|`(?!`))+``|`[^`\r\n]+`|[^\\\\|\r\n`])+",t="\\|?__(?:\\|__)+\\|?(?:(?:\n|\r\n?)|(?![^]))".replace(/__/g,function(){return n}),a="\\|?[ \t]*:?-{3,}:?[ \t]*(?:\\|[ \t]*:?-{3,}:?[ \t]*)+\\|?(?:\n|\r\n?)",l=(o.languages.markdown=o.languages.extend("markup",{}),o.languages.insertBefore("markdown","prolog",{"front-matter-block":{pattern:/(^(?:\s*[\r\n])?)---(?!.)[\s\S]*?[\r\n]---(?!.)/,lookbehind:!0,greedy:!0,inside:{punctuation:/^---|---$/,"front-matter":{pattern:/\S+(?:\s+\S+)*/,alias:["yaml","language-yaml"],inside:o.languages.yaml}}},blockquote:{pattern:/^>(?:[\t ]*>)*/m,alias:"punctuation"},table:{pattern:RegExp("^"+t+a+"(?:"+t+")*","m"),inside:{"table-data-rows":{pattern:RegExp("^("+t+a+")(?:"+t+")*$"),lookbehind:!0,inside:{"table-data":{pattern:RegExp(n),inside:o.languages.markdown},punctuation:/\|/}},"table-line":{pattern:RegExp("^("+t+")"+a+"$"),lookbehind:!0,inside:{punctuation:/\||:?-{3,}:?/}},"table-header-row":{pattern:RegExp("^"+t+"$"),inside:{"table-header":{pattern:RegExp(n),alias:"important",inside:o.languages.markdown},punctuation:/\|/}}}},code:[{pattern:/((?:^|\n)[ \t]*\n|(?:^|\r\n?)[ \t]*\r\n?)(?: {4}|\t).+(?:(?:\n|\r\n?)(?: {4}|\t).+)*/,lookbehind:!0,alias:"keyword"},{pattern:/^```[\s\S]*?^```$/m,greedy:!0,inside:{"code-block":{pattern:/^(```.*(?:\n|\r\n?))[\s\S]+?(?=(?:\n|\r\n?)^```$)/m,lookbehind:!0},"code-language":{pattern:/^(```).+/,lookbehind:!0},punctuation:/```/}}],title:[{pattern:/\S.*(?:\n|\r\n?)(?:==+|--+)(?=[ \t]*$)/m,alias:"important",inside:{punctuation:/==+$|--+$/}},{pattern:/(^\s*)#.+/m,lookbehind:!0,alias:"important",inside:{punctuation:/^#+|#+$/}}],hr:{pattern:/(^\s*)([*-])(?:[\t ]*\2){2,}(?=\s*$)/m,lookbehind:!0,alias:"punctuation"},list:{pattern:/(^\s*)(?:[*+-]|\d+\.)(?=[\t ].)/m,lookbehind:!0,alias:"punctuation"},"url-reference":{pattern:/!?\[[^\]]+\]:[\t ]+(?:\S+|<(?:\\.|[^>\\])+>)(?:[\t ]+(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\)))?/,inside:{variable:{pattern:/^(!?\[)[^\]]+/,lookbehind:!0},string:/(?:"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\((?:\\.|[^)\\])*\))$/,punctuation:/^[\[\]!:]|[<>]/},alias:"url"},bold:{pattern:e("\\b__(?:(?!_)<inner>|_(?:(?!_)<inner>)+_)+__\\b|\\*\\*(?:(?!\\*)<inner>|\\*(?:(?!\\*)<inner>)+\\*)+\\*\\*"),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^..)[\s\S]+(?=..$)/,lookbehind:!0,inside:{}},punctuation:/\*\*|__/}},italic:{pattern:e("\\b_(?:(?!_)<inner>|__(?:(?!_)<inner>)+__)+_\\b|\\*(?:(?!\\*)<inner>|\\*\\*(?:(?!\\*)<inner>)+\\*\\*)+\\*"),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^.)[\s\S]+(?=.$)/,lookbehind:!0,inside:{}},punctuation:/[*_]/}},strike:{pattern:e("(~~?)(?:(?!~)<inner>)+\\2"),lookbehind:!0,greedy:!0,inside:{content:{pattern:/(^~~?)[\s\S]+(?=\1$)/,lookbehind:!0,inside:{}},punctuation:/~~?/}},"code-snippet":{pattern:/(^|[^\\`])(?:``[^`\r\n]+(?:`[^`\r\n]+)*``(?!`)|`[^`\r\n]+`(?!`))/,lookbehind:!0,greedy:!0,alias:["code","keyword"]},url:{pattern:e('!?\\[(?:(?!\\])<inner>)+\\](?:\\([^\\s)]+(?:[\t ]+"(?:\\\\.|[^"\\\\])*")?\\)|[ \t]?\\[(?:(?!\\])<inner>)+\\])'),lookbehind:!0,greedy:!0,inside:{operator:/^!/,content:{pattern:/(^\[)[^\]]+(?=\])/,lookbehind:!0,inside:{}},variable:{pattern:/(^\][ \t]?\[)[^\]]+(?=\]$)/,lookbehind:!0},url:{pattern:/(^\]\()[^\s)]+/,lookbehind:!0},string:{pattern:/(^[ \t]+)"(?:\\.|[^"\\])*"(?=\)$)/,lookbehind:!0}}}}),["url","bold","italic","strike"].forEach(function(n){["url","bold","italic","strike","code-snippet"].forEach(function(e){n!==e&&(o.languages.markdown[n].inside.content.inside[e]=o.languages.markdown[e])})}),o.hooks.add("after-tokenize",function(e){"markdown"!==e.language&&"md"!==e.language||function e(n){if(n&&"string"!=typeof n)for(var t=0,a=n.length;t<a;t++){var r,i,s=n[t];"code"===s.type?(i=s.content[1],r=s.content[3],i&&r&&"code-language"===i.type&&"code-block"===r.type&&"string"==typeof i.content&&(i=i.content.replace(/\b#/g,"sharp").replace(/\b\+\+/g,"pp"),i="language-"+(i=(/[a-z][\w-]*/i.exec(i)||[""])[0].toLowerCase()),r.alias?"string"==typeof r.alias?r.alias=[r.alias,i]:r.alias.push(i):r.alias=[i])):e(s.content)}}(e.tokens)}),o.hooks.add("wrap",function(e){if("code-block"===e.type){for(var n="",t=0,a=e.classes.length;t<a;t++){var r=e.classes[t],r=/language-(.+)/.exec(r);if(r){n=r[1];break}}var i,s=o.languages[n];s?e.content=o.highlight(e.content.replace(l,"").replace(/&(\w{1,8}|#x?[\da-f]{1,8});/gi,function(e,n){var t;return"#"===(n=n.toLowerCase())[0]?(t="x"===n[1]?parseInt(n.slice(2),16):Number(n.slice(1)),g(t)):u[n]||e}),s,n):n&&"none"!==n&&o.plugins.autoloader&&(i="md-"+(new Date).valueOf()+"-"+Math.floor(1e16*Math.random()),e.attributes.id=i,o.plugins.autoloader.loadLanguages(n,function(){var e=document.getElementById(i);e&&(e.innerHTML=o.highlight(e.textContent,o.languages[n],n))}))}}),RegExp(o.languages.markup.tag.pattern.source,"gi")),u={amp:"&",lt:"<",gt:">",quot:'"'},g=String.fromCodePoint||String.fromCharCode;o.languages.md=o.languages.markdown}(Prism);const scrollToTopBtn=document.querySelector(".scrollToTop"),rootElement=document.documentElement;function handleScroll(){var e=rootElement.scrollHeight-rootElement.clientHeight;.5<rootElement.scrollTop/e?scrollToTopBtn.classList.add("showBtn"):scrollToTopBtn.classList.remove("showBtn")}function scrollToTop(){rootElement.scrollTo({top:0,behavior:"smooth"})}scrollToTopBtn.addEventListener("click",scrollToTop),document.addEventListener("scroll",handleScroll);