// COPYRIGHT © 2018 Esri
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
// See http://js.arcgis.com/4.6/esri/copyright.txt for details.

define(["require","exports","dojo/date/locale","../../../core/Error","../../../core/lang","../../../core/Logger","../../../core/promiseUtils","../../../geometry/support/scaleUtils","./geometryUtils"],function(e,r,t,i,n,a,u,l,o){function s(e){var r=e.exactMatch,t=void 0!==r&&r,n=e.location,a=e.maxResults,o=e.spatialReference,s=e.source,f=e.sourceIndex,y=e.suggestResult,F=e.view,x=s.featureLayer,b=s.filter,j=s.zoomScale,I=F&&F.scale,R=d(s,F);return v(x).then(function(){var e=p(s);if(!h(x,e))return q.error("invalid-field: displayField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","displayField is invalid."));var r=s.outFields||[e];if(!c(r)&&!m(x,r))return q.error("invalid-field: outField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","outField is invalid."));var d=x.createQuery(),v=s.searchQueryParams;if(v&&d.set(v),o){d.outSpatialReference=o;var P=l.getMetersPerUnitForSR(o);P&&(d.maxAllowableOffset=P)}if(d.returnGeometry=!0,r&&(d.outFields=r),n)d.geometry=n;else if(y.key)d.objectIds=[parseInt(y.key,10)];else{var E=s.searchFields||[e],S=m(x,E);if(!S)return q.error("invalid-field: search field is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","search field is invalid."));g(x)&&(d.num=a),R&&(d.geometry=R);var U=y.text.trim();if(!U)return u.resolve();var T=s.prefix,k=void 0===T?"":T,C=s.suffix,D=void 0===C?"":C,N=w(""+k+U+D),Q=L(N,x,E,b,t);if(!Q)return u.resolve();d.where=Q}return x.queryFeatures(d).then(function(r){return O(r,F,s,f,e,I,j)})})}function f(e){var r=e.source,t=e.spatialReference,n=e.view,a=e.suggestTerm,l=e.maxSuggestions,o=e.sourceIndex,s=r.featureLayer,f=r.filter,y=d(r,n);return v(s).then(function(){if(!g(s))return u.resolve();var e=p(r),n=r.searchFields||[e],d=[];r.suggestionTemplate?r.suggestionTemplate.replace(k,function(e,r){return d.push(r),e}):d.push(e),-1!==d.indexOf(s.objectIdField)||d.push(s.objectIdField);var v=h(s,e),F=c(d)||m(s,d),x=m(s,n);if(!v)return q.error("invalid-field: displayField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","displayField is invalid."));if(!F)return q.error("invalid-field: outField is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","outField is invalid."));if(!x)return q.error("invalid-field: search field is invalid."),u.reject(new i("searchfeaturelayerutils:invalid-field","search field is invalid."));var b=s.createQuery(),j=r.suggestQueryParams;j&&b.set(j),b.outSpatialReference=t,b.returnGeometry=!1,b.num=l,b.outFields=d,y&&(b.geometry=y);var I=a.trim();if(!I)return u.resolve();var R=r.prefix,P=void 0===R?"":R,E=r.suffix,U=void 0===E?"":E,O=w(""+P+I+U),T=L(O,s,n,f,!1);return T?(b.where=T,s.queryFeatures(b).then(function(t){return S(t,r,o,e)})):u.resolve()})}function d(e,r){var t=e.filter,i=e.searchExtent,n=e.withinViewEnabled,a=r&&r.extent,u=t&&t.geometry,l=n&&a?a:void 0;return u||i||l}function c(e){return e&&1===e.length&&"*"===e[0]}function v(e){return e?e.load().then(u.resolve).catch(u.reject):u.resolve()}function g(e){return e&&!!e.get("capabilities.query.supportsPagination")}function y(e){var r="";if(e){var t=e.fields;t&&t.some(function(e){if("string"===e.type)return r=e.name,!0})}return r}function p(e){return e.displayField||e.featureLayer.displayField||y(e.featureLayer)}function m(e,r){return!(!e||!r)&&r.every(function(r){return h(e,r)})}function h(e,r){return!!e.getField(r)}function F(e){for(var r=0;r<e.length;r++)if(e.charCodeAt(r)>255)return!0;return!1}function x(e,r,t){var i=null,n=e.codedValues;return n&&n.some(function(e){var n=e.name,a=t?n:n.toLowerCase();if((t?r:r.toLowerCase())===a)return i=e.code.toString(),!0}),i}function w(e){return e.replace(/\'/g,"''")}function b(e,r){var t=r&&r.where;return t?"("+e+") AND ("+t+")":e}function j(e,r,t,i,n){var a=r.type,u=r.name;if("string"===a||"date"===a){if(n)return b(u+" = "+t+"'"+e+"'",i);return b("UPPER("+u+") LIKE "+t+"'%"+e.toUpperCase()+"%'",i)}if("oid"===a||"small-integer"===a||"integer"===a||"single"===a||"double"===a){var l=parseFloat(e);return isNaN(l)?null:b(u+" = "+l,i)}return b(u+" = "+e,i)}function I(e,r){return e?" OR ("+r+")":"("+r+")"}function L(e,r,t,i,n){var a="";if(e){var u=T.test(r.url)&&F(e)?"N":"";t&&t.forEach(function(t){var l=r.getField(t),o=r.getFieldDomain(t),s=o&&"coded-value"===o.type?x(o,e,n):null,f=s||e||null;if(null!==f){var d=j(f,l,u,i,n);d&&(a+=I(a,d))}})}return a}function R(e,r){var t=null,i=e.codedValues;return i&&i.length&&i.some(function(e){if(e.code===r)return t=e.name,!0}),t}function P(e,r,i,a){var u=e.layer,l=e.attributes,o=u.getFieldDomain(i);if(r)return n.substitute(l,r);if(i&&e.hasOwnProperty("attributes")&&l.hasOwnProperty(i)){var s=l[i],f=u.getField(i);return o&&"coded-value"===o.type?R(o,s):f&&"date"===f.type?t.format(new Date(s)):s}return""}function E(e,r,t,i){var n=e.layer,a=e.attributes,u=n.objectIdField,l=a[u];return{text:P(e,r.suggestionTemplate,i,r),key:l,sourceIndex:t}}function S(e,r,t,i){return e.features.map(function(e){return E(e,r,t,i)})}function U(e,r,t,i,n,a,u){var l=e.clone(),s=e.layer,f=s&&s.objectIdField,d=f&&e.attributes[f],c=P(e,t.searchTemplate,n,t),v=o.createExtentFromGeometry(l.geometry,r,a);return{extent:u?o.scaleExtent(v.clone(),r,u):v,feature:l,key:d,name:c,sourceIndex:i}}function O(e,r,t,i,n,a,u){return e.features.map(function(e){return U(e,r,t,i,n,a,u)})}Object.defineProperty(r,"__esModule",{value:!0});var T=/https?:\/\/services.*\.arcgis\.com/i,k=/(?:\{([^}]+)\})/g,q=a.getLogger("esri.widgets.Search.support.featureLayerUtils");r.getResults=s,r.getSuggestions=f});