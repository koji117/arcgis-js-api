// COPYRIGHT © 201 Esri
//
// All rights reserved under the copyright laws of the United States
// and applicable international laws, treaties, and conventions.
//
// This material is licensed for use under the Esri Master License
// Agreement (MLA), and is bound by the terms of that agreement.
// You may redistribute and use this code without modification,
// provided you adhere to the terms of the MLA and include this
// copyright notice.
//
// See use restrictions at http://www.esri.com/legal/pdfs/mla_e204_e300/english
//
// For additional information, contact:
// Environmental Systems Research Institute, Inc.
// Attn: Contracts and Legal Services Department
// 380 New York Street
// Redlands, California, USA 92373
// USA
//
// email: contracts@esri.com
//
// See http://js.arcgis.com/3.31/esri/copyright.txt for details.

define(["dojo/_base/declare","dojo/_base/lang","esri/dijit/geoenrichment/Deferred","dojo/request/xhr","dojo/io-query","dojo/sniff","esri/dijit/geoenrichment/when","esri/kernel","esri/config","esri/lang","esri/urlUtils","../UrlUtil","./BinaryData","./FileContent","./MultipartDataBuilder","./ErrorUtil"],function(e,t,n,r,o,i,s,l,a,u,d,h,c,f,p,m){function v(e,t){if(t)return void this.reject(t);var n=e.xhr,r=n.getResponseHeader&&n.getResponseHeader("Content-Type");e.status=n.status,e.data=new c(n.response||n.responseBody||n.responseText,r),this.resolve(e)}var y=0,g=i("safari"),w=e(null,{constructor:function(e){"string"==typeof e?this.url=e:"object"==typeof e&&t.mixin(this,e)},url:null,preventCache:null,usePost:!1,timeout:0,multipartThreshold:0,useCommonAuth:!1,useProxy:!1,allowSSL:null,send:function(e,t){return this.sendUrlRequest(this.prepareUrlRequest(e,t),"UniversalClient.send")},prepareUrlRequest:function(e,n){"string"==typeof e?e={urlSuffix:e}:e||(e={}),n||(n={});var r=e.url||this.url,i=e.urlSuffix;if(r||(r=i,i=null),!r)throw new Error("URL is missing.");var s=d.urlToObject(r);r=h.combine(s.path,i);var c=s.query||{};"object"==typeof n.content&&(c=t.mixin(c,n.content));var m=n.requireSSL;if(!0!==m&&!1===this.allowSSL&&(m=!1),!1!==m&&!0===this.allowSSL&&/^https/i.test(window.location.protocol)&&(m=!0),l.id){var v=l.id.findCredential(r);!v&&this.useCommonAuth&&(v="string"==typeof this.useCommonAuth?l.id.findCredential(this.useCommonAuth):l.id.credentials[0]),v&&(c.token||!1===c.token||(c.token=v.token),v.ssl&&!1!==m&&(m=!0))}!0===m&&(r=h.toHttpsUrl(r)),!1===c.token&&delete c.token;var w=n.handleAs||"json";"json"===w&&(c.f="json");var j=(n.sendAs||(n.usePost||this.usePost||c.token?"post":"get")).toLowerCase(),x="multipart"==j||!n.sendAs&&!n.sizeLimit&&null,C=0;for(var T in c){var k=c[T];k instanceof f?x=!0:("object"==typeof k&&(k=c[T]=JSON.stringify(k)),!x&&this.multipartThreshold>0&&(C+=T.length+(k?k.length:0)+2))}if(!1!==x&&this.multipartThreshold>0&&C>this.multipartThreshold&&(x=!0),n.useProxy||!d.hasSameOrigin(r,window.location.href)&&this.useProxy&&!n.hasOwnProperty("useProxy")){var L=h.getProxyUrl();L&&(r=L+"?"+r)}else d.getProxyRule(r)&&(r=d.getProxyRule(r).proxyUrl+"?"+r);var E=n.hasOwnProperty("preventCache")?n.preventCache:this.preventCache;E=E||null===E&&L||g?"_ts="+(new Date).getTime()+y++:"";var S={handleAs:w},U=Number(u.isDefined(n.timeout)?n.timeout:this.timeout);U&&(S.timeout=U);var b="get"!=j||x,P=x?null:o.objectToQuery(c);if(b||(b=P.length+r.length+E.length+1>=a.defaults.io.postLength),S.method=b?"POST":"GET",S.headers={"X-Requested-With":null},S.headers["Content-Type"]=void 0!==n.contentType?n.contentType:"application/x-www-form-urlencoded; charset=utf-8",x){var R=new p;R.addVariables(c),R.build(S)}else b?S.data=P:P&&(r+="?"+P,E&&(r+="&"+E),E=null);return!P&&E&&(r+="?"+E),{url:r,options:S,sizeLimit:n.sizeLimit}},sendUrlRequest:function(e,t){var o="string"==typeof e.options.data?e.options.data.length:null;if(e.sizeLimit&&o){if("function"==typeof e.sizeLimit?e.sizeLimit(o):o>e.sizeLimit)return(new n).reject(new Error("SIZE_LIMIT_EXCEEDED"))}t=t||"UniversalClient.sendUrlRequest";var i=e.deferred||new n,l="bin"==e.options.handleAs;l&&(e.options.handleAs="blob");var a=r(e.url,e.options,!0);l&&(a.handleResponse=v);var u=this;return a.then(function(n){if((n="json"===e.options.handleAs&&n&&m.parseError(n)||n)instanceof Error){var r;!0===u.useCommonAuth&&498===n.code&&(r=w.handleInvalidTokenError(n)),s(r).finally(function(){i.reject(n)})}else i.resolve(u._makeResponse(t,n))},function(e){i.reject(m.makeError(e))}),i.promise},requestToUrl:function(e){if(e.options.headers&&e.options.headers["Content-Type"]&&0==e.options.headers["Content-Type"].indexOf("multipart/form-data"))return null;var t=e.url,n=e.options.data;if(n){if(t.length+n.length>=a.defaults.io.postLength)return null;t+="?"+n}return t},_makeResponse:function(e,t){return t}});w.makeError=m.makeError,w.handleInvalidTokenError=function(e){};var j=new w({useCommonAuth:!0,allowSSL:!0});return w.request=function(e,r){return j.send(e,r).otherwise(function(o){var i=r&&r.content&&r.content.token;return 498!==o.code||null!=i?(new n).reject(o):(r=t.mixin({},r),r.content=t.mixin({},r.content),r.content.token=!1,j.send(e,r))})},w.requestPublicFirst=function(e,r){var o=t.mixin({},r);return o.content=t.mixin({},r.content),o.content.token=!1,j.send(e,o).otherwise(function(t){return 499===t.code?j.send(e,r):(new n).reject(t)})},w});