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
// See http://js.arcgis.com/3.28/esri/copyright.txt for details.

var __extends=this&&this.__extends||function(){var e=function(t,r){return(e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)t.hasOwnProperty(r)&&(e[r]=t[r])})(t,r)};return function(t,r){function a(){this.constructor=t}e(t,r),t.prototype=null===r?Object.create(r):(a.prototype=r.prototype,new a)}}(),__assign=this&&this.__assign||function(){return __assign=Object.assign||function(e){for(var t,r=1,a=arguments.length;r<a;r++){t=arguments[r];for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])}return e},__assign.apply(this,arguments)};define(["require","exports","../../../graphic","../../../request","../../../sniff","../../../SpatialReference","../../../urlUtils","../../Attachment","../support/cache","../support/FeatureSet","../support/IdSet","../support/sha","../support/shared","../support/stats","../../polyfill/promiseUtils","../../../geometry/Extent","../../../layers/FeatureType","../../../layers/Field","../../../tasks/query","../../../tasks/QueryTask","../../../tasks/StatisticDefinition"],function(e,t,r,a,i,n,s,l,o,u,d,p,c,y,f,h,_,g,m,v,b){"use strict";var F=!!i("esri-pbf"),R=!!i("esri-featurelayer-pbf"),C=function(){function e(e,t,r){void 0===r&&(r=null),this.url=e,this.outFields=t,this.spatialReference=r,this._url=null,this.supportsFormatPBF=!1,this.supportsAttachments=!1,this._loadPromise=null,this._queryTask=null,this.currentVersion=0,this.useStandardizedQueries=!1,this.fields=[],this._url=s.urlToObject(e)}return e.prototype._canFetchPBFForQuery=function(e){return F&&R&&this.supportsFormatPBF&&!e.outStatistics},e.prototype._loadMetaData=function(e){if(null!==o.applicationCache){var t=o.applicationCache.getLayerInfo(e);if(null!==t)return t}var r={hasbeenset:!1},i=f.create(function(t,n){a({url:e,content:{f:"json"},callbackParamName:"callback",load:function(a){null!==o.applicationCache&&!1===r.hasbeenset&&(r.hasbeenset=!0,o.applicationCache.setLayerInfo(e,i)),t(a)},error:function(t){null!==o.applicationCache&&!1===r.hasbeenset&&(r.hasbeenset=!0,o.applicationCache.setLayerInfo(e,i)),null!==o.applicationCache&&o.applicationCache.clearLayerInfo(e),n(t)}})});return null!==o.applicationCache&&!1===r.hasbeenset&&(r.hasbeenset=!0,o.applicationCache.setLayerInfo(e,i)),i},e.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=f.create(function(t,r){var a=e._url.path;e._loadMetaData(a).then(function(i){try{if(e._queryTask=new v(a),e.objectIdField=i.objectIdField,e.supportsAttachments=!0===i.hasAttachments,!e.objectIdField)for(var s=i.fields,l=0;l<s.length;l++){var o=s[l];if("esriFieldTypeOID"===o.type){e.objectIdField=o.name;break}}if(e.globalIdField=i.globalIdField,e.geometryType=i.geometryType,e.typeIdField=i.typeIdField,e.fullExtent=new h(i.fullExtent),e.advancedQueryCapabilities=i.advancedQueryCapabilities||{supportsStatistics:i.supportsStatistics,supportsOrderBy:i.supportsAdvancedQueries,supportsDistinct:i.supportsAdvancedQueries},i.supportedQueryFormats)for(var u=0,d=i.supportedQueryFormats.split(",");u<d.length;u++){var p=d[u];if("pbf"===p.replace(/^\s+|\s+$/gm,"").toLowerCase()){e.supportsFormatPBF=!0;break}}if(!0===i.useStandardizedQueries&&(e.useStandardizedQueries=!0),void 0!==i.currentVersion&&(e.currentVersion=i.currentVersion),i.types){e.types=[];for(var c=0,y=i.types;c<y.length;c++){var f=y[c],m=new _(f);e.types.push(m)}}if(i.spatialReference&&!e.spatialReference&&(e.spatialReference=new n(i.spatialReference)),1===e.outFields.length&&"*"===e.outFields[0])for(var b=0,F=i.fields;b<F.length;b++){var f=F[b],R=new g(f);e.fields.push(R)}else for(var C=0,S=i.fields;C<S.length;C++){var f=S[C];if("esriFieldTypeOID"===f.type){var R=new g(f);e.fields.push(R)}else{for(var D=!1,x=0,I=e.outFields;x<I.length;x++){var w=I[x];if(f.name.toUpperCase()===w.toUpperCase()){D=!0;break}}if(D){var R=new g(f);e.fields.push(R)}}}e.definitionExpression="",t(e)}catch(e){r(e)}},r)})),this._loadPromise},e.prototype.queryIds=function(e){var t=this;return f.create(function(r,a){t._queryTask.executeForIds(e,r,a)})},e.prototype.queryAttachments=function(e){var t=this,r=__assign({},e,{f:"json"});return r.objectIds.length>0&&(r.objectIds=r.objectIds.join(",")),r.size&&(r.size=r.size.join(",")),r.attachmentTypes&&(r.attachmentTypes=r.attachmentTypes.join(",")),f.create(function(e,i){a({url:t._url.path+"/queryAttachments",content:r,callbackParamName:"callback",load:function(t){var r={};if(t&&t.attachmentGroups)for(var a=0,i=t.attachmentGroups;a<i.length;a++){var n=i[a];void 0===r[n.parentObjectId]&&(r[n.parentObjectId]=[]);for(var s=0,l=n.attachmentInfos;s<l.length;s++){var o=l[s];r[n.parentObjectId].push({id:o.id,globalId:o.globalId,name:o.name,contentType:o.contentType,size:o.size})}}e(r)},error:function(e){i(e)}})})},e}();return function(e){function t(t){var r=e.call(this,t)||this;return r._layer=null,r._removeGeometry=!1,r.formulaCredential=null,r._pageJustIds=!1,r._requestStandardised=!1,t.spatialReference&&(r.spatialReference=t.spatialReference),r._layer=new C(t.url,t.outFields,r.spatialReference),r._transparent=!0,r._maxProcessing=1e3,r._wset=null,void 0!==t.includeGeometry&&(r._removeGeometry=!1===t.includeGeometry),r}return __extends(t,e),t.prototype.optimisePagingFeatureQueries=function(e){this._pageJustIds=e},t.prototype._maxQueryRate=function(){return c.defaultMaxRecords},t.prototype.convertQueryToLruCacheKey=function(e){var t=c.stableStringify(e.toJson());return new p(t,"TEXT").getHash("SHA-1","B64")},t.prototype.load=function(){var e=this;return null===this._loadPromise&&(this._loadPromise=f.create(function(t,r){e._layer.load().then(function(){try{e._initialiseFeatureSet(),t(e)}catch(e){r(e)}},function(e){r(e)})})),this._loadPromise},t.prototype._initialiseFeatureSet=function(){if(null==this.spatialReference&&(this.spatialReference=this._layer.spatialReference),this.geometryType=this._layer.geometryType,void 0===this.geometryType&&(this.geometryType=""),this.fields=this._layer.fields.slice(0),!0===this._layer.useStandardizedQueries)this._databaseType=c.FeatureServiceDatabaseType.Standardised;else{var e=this._layer.currentVersion;void 0!==e&&null!==e&&e>=10.5&&(this._databaseType=c.FeatureServiceDatabaseType.Standardised,this._requestStandardised=!0)}this.objectIdField=this._layer.objectIdField,this.typeIdField=this._layer.typeIdField,this.types=this._layer.types},t.prototype._isInFeatureSet=function(e){return c.IdState.InFeatureSet},t.prototype._refineSetBlock=function(e,t){return f.resolve(e)},t.prototype._candidateIdTransform=function(e){return e},t.prototype._transformSetWithIdChanges=function(e){},t.prototype._getSet=function(e){var t=this;return null===this._wset?this._ensureLoaded().then(function(){return t._getFilteredSet("",null,null,null,e)}).then(function(e){return t._wset=e,e}):f.resolve(this._wset)},t.prototype._runDatabaseProbe=function(e){var t=this;return f.create(function(r,a){try{t._ensureLoaded().then(function(){try{var i=new m;i.where=e.replace("OBJECTID",t._layer.objectIdField),t._layer.queryIds(i).then(function(e){r(!0)},function(e){try{r(!1)}catch(e){a(e)}})}catch(e){a(e)}})}catch(e){a(e)}})},t.prototype._canUsePagination=function(){return void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsPagination},t.prototype._cacheableFeatureSetSourceKey=function(){return this._layer.url},t.prototype._getFilteredSet=function(e,t,r,a,i){var n=this;return this.databaseType().then(function(s){if(n.isTable()&&t&&null!==e&&""!==e){return new d([],[],!0,null)}if(n._canUsePagination())return n._getFilteredSetUsingPaging(e,t,r,a,i);var l="",o=!1;null!==a&&void 0!==n._layer.advancedQueryCapabilities&&null!==n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsOrderBy&&(l=a.constructClause(),o=!0);var u=new m;return n._requestStandardised&&(u.sqlFormat="standard"),u.where=null===r?null===t?"1=1":"":r.toWhereClause(s),u.spatialRelationship=n._makeRelationshipEnum(e),u.outSpatialReference=n.spatialReference,u.orderByFields=""!==l?l.split(","):null,u.geometry=null===t?null:t,u.relationParam=n._makeRelationshipParam(e),n.executeQuery(u,"executeForIds").then(function(e){return null===e&&(e=[]),n._checkCancelled(i),new d([],e,o,null)})})},t.prototype._expandPagedSet=function(e,t,r,a,i){return this._expandPagedSetFeatureSet(e,t,r,a,i)},t.prototype._getFilteredSetUsingPaging=function(e,t,r,a,i){var n=this;try{var s="",l=!1;return null!==a&&void 0!==this._layer.advancedQueryCapabilities&&null!==this._layer.advancedQueryCapabilities&&!0===this._layer.advancedQueryCapabilities.supportsOrderBy&&(s=a.constructClause(),l=!0),this.databaseType().then(function(a){var o=null===r?null===t?"1=1":"":r.toWhereClause(a);n._layer.definitionExpression&&(o=""!==o?"(("+n._layer.definitionExpression+") AND ("+o+"))":n._layer.definitionExpression);var u=n._maxQueryRate();void 0!==n._layer.maxRecordCount&&n._layer.maxRecordCount<u&&(u=n._layer.maxRecordCount);var p=null;if(!0===n._pageJustIds)p=new d([],["GETPAGES"],l,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:n._layer.objectIdField,resultRecordCount:u,resultOffset:0,geometry:null===t?"":t,where:o,orderByFields:s,returnGeometry:!1,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}});else{var c=!0;!0===n._removeGeometry&&(c=!1);var y=n._fieldsIncludingObjectId(n._layer.outFields);p=new d([],["GETPAGES"],l,{spatialRel:n._makeRelationshipEnum(e),relationParam:n._makeRelationshipParam(e),outFields:y.join(","),resultRecordCount:u,resultOffset:0,geometry:null===t?"":t,where:o,orderByFields:s,returnGeometry:c,returnIdsOnly:"false",internal:{set:[],lastRetrieved:0,fullyResolved:!1}})}return n._expandPagedSet(p,u,0,1,i).then(function(e){return p})})}catch(e){return f.reject(e)}},t.prototype._clonePageDefinition=function(e){return null===e?null:!0!==e.groupbypage?{groupbypage:!1,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,resultOffset:e.resultOffset,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}:{groupbypage:!0,spatialRel:e.spatialRel,relationParam:e.relationParam,outFields:e.outFields,resultRecordCount:e.resultRecordCount,useOIDpagination:e.useOIDpagination,generatedOid:e.generatedOid,groupByFieldsForStatistics:e.groupByFieldsForStatistics,resultOffset:e.resultOffset,outStatistics:e.outStatistics,geometry:e.geometry,where:e.where,orderByFields:e.orderByFields,returnGeometry:e.returnGeometry,returnIdsOnly:e.returnIdsOnly,internal:e.internal}},t.prototype._getPhysicalPage=function(e,t,r){var a=this;try{var i=e.pagesDefinition.internal.lastRetrieved,n=i,s=new m;return this._requestStandardised&&(s.sqlFormat="standard"),s.spatialRelationship=e.pagesDefinition.spatialRel,s.relationParam=e.pagesDefinition.relationParam,s.outFields=e.pagesDefinition.outFields.split(","),s.num=e.pagesDefinition.resultRecordCount,s.start=e.pagesDefinition.internal.lastRetrieved,s.geometry=e.pagesDefinition.geometry,s.where=e.pagesDefinition.where,s.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,s.returnGeometry=e.pagesDefinition.returnGeometry,s.outSpatialReference=this.spatialReference,this.executeQuery(s,"execute").then(function(t){if(a._checkCancelled(r),e.pagesDefinition.internal.lastRetrieved!==i)return"done";for(var s=0;s<t.features.length;s++)void 0===t.features[s].geometry&&(t.features[s].geometry=null),e.pagesDefinition.internal.set[n+s]=t.features[s].attributes[a._layer.objectIdField];if(!1===a._pageJustIds)for(var s=0;s<t.features.length;s++)a._featureCache[t.features[s].attributes[a._layer.objectIdField]]=t.features[s];return t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=i+e.pagesDefinition.resultRecordCount,"done"})}catch(e){return f.reject(e)}},t.prototype._fieldsIncludingObjectId=function(e){if(null===e)return[this.objectIdField];var t=e.slice(0);if(t.indexOf("*")>-1)return t;for(var r=!1,a=0,i=t;a<i.length;a++){if(i[a].toUpperCase()===this.objectIdField.toUpperCase()){r=!0;break}}return!1===r&&t.push(this.objectIdField),t},t.prototype._getFeatures=function(e,t,r,a){var i=this,n=[];try{if(-1!==t&&void 0===this._featureCache[t]&&n.push(t),!0===this._checkIfNeedToExpandKnownPage(e,this._maxProcessingRate(),a))return this._expandPagedSet(e,this._maxProcessingRate(),0,0,a).then(function(n){return i._getFeatures(e,t,r,a)});for(var s=0,l=e._lastFetchedIndex;l<e._known.length;l++){if(e._lastFetchedIndex+=1,s++,void 0===this._featureCache[e._known[l]]){var o=!1;if(null!==this._layer._mode&&void 0!==this._layer._mode){var u=this._layer._mode;if(void 0!==u._featureMap[e._known[l]]){var d=u._featureMap[e._known[l]];null!==d&&(o=!0,this._featureCache[e._known[l]]=d)}}if(!1===o&&(e._known[l]!==t&&n.push(e._known[l]),n.length>=this._maxProcessingRate()-1))break}if(s>=r&&0===n.length)break}if(0===n.length)return f.resolve("success");try{var p=new m;return this._requestStandardised&&(p.sqlFormat="standard"),p.objectIds=n,p.outFields=this._fieldsIncludingObjectId(this._layer.outFields),p.returnGeometry=!0,!0===this._removeGeometry&&(p.returnGeometry=!1),p.outSpatialReference=this.spatialReference,this.executeQuery(p,"execute").then(function(e){if(i._checkCancelled(a),void 0!==e.error)return f.reject(new Error(e.error));for(var t=0;t<e.features.length;t++)void 0===e.features[t].geometry&&(e.features[t].geometry=null),i._featureCache[e.features[t].attributes[i._layer.objectIdField]]=e.features[t];return"success"})}catch(e){return f.reject(e)}}catch(e){return f.reject(e)}},t.prototype._layerUrl=function(){return this._layer.url},t.prototype.pbfSupportedForQuery=function(e){return this._layer._canFetchPBFForQuery(e)},t.prototype.executeQuery=function(e,t){var r=new v(this._layerUrl()),a="execute"===t&&this.pbfSupportedForQuery(e);a&&(e.quantizationParameters={mode:"edit"});var i=null;if(this.recentlyUsedQueries){var n=this.convertQueryToLruCacheKey(e);i=this.recentlyUsedQueries.getFromCache(n),i&&i.isRejected()&&(i=null,this.recentlyUsedQueries.removeFromCache(n)),null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"}),this.recentlyUsedQueries.addToCache(n,i))}return null===i&&(i=!0!==a?r[t](e):r[t](e,null,null,{format:"pbf"})),i},t.prototype._getDistinctPages=function(e,t,r,a,i,n,s,l,o){var u=this;return this._ensureLoaded().then(function(){for(var d=r.parseTree.column,p=0;p<u._layer.fields.length;p++)if(u._layer.fields[p].name.toLowerCase()===d.toLowerCase()){d=u._layer.fields[p].name;break}return u.databaseType().then(function(p){var c=new m;u._requestStandardised&&(c.sqlFormat="standard");var y=null===n?null===i?"1=1":"":n.toWhereClause(p);return u._layer.definitionExpression&&(y=""!==y?"(("+u._layer.definitionExpression+") AND ("+y+"))":u._layer.definitionExpression),c.where=y,c.spatialRelationship=u._makeRelationshipEnum(a),c.relationParam=u._makeRelationshipParam(a),c.geometry=null===i?null:i,c.returnDistinctValues=!0,c.returnGeometry=!1,c.outFields=[d],u.executeQuery(c,"execute").then(function(p){if(u._checkCancelled(o),!p.hasOwnProperty("features"))return f.reject(new Error("Unnexected Result querying statistics from layer"));for(var c=!1,y=0;y<u._layer.fields.length;y++)if(u._layer.fields[y].name===d){"esriFieldTypeDate"===u._layer.fields[y].type&&(c=!0);break}for(var y=0;y<p.features.length;y++){if(c){var h=p.features[y].attributes[d];null!==h?l.push(new Date(h)):l.push(h)}else l.push(p.features[y].attributes[d]);if(l.length>=s)break}return 0===p.features.length?l:p.features.length===u._layer.maxRecordCount&&l.length<s?u._getDistinctPages(e+p.features.length,t,r,a,i,n,s,l,o).then(function(e){return{calculated:!0,result:e}}):l})})})},t.prototype._distinctStat=function(e,t,r,a,i,n,s){return this._getDistinctPages(0,e,t,r,a,i,n,[],s).then(function(e){return{calculated:!0,result:e}})},t.prototype.isTable=function(){return null===this._layer.geometryType||""===this._layer.geometryType||void 0===this._layer.geometryType},t.prototype._countstat=function(e,t,r,a,i){var n=this;return this.databaseType().then(function(e){var i=new m;if(n._requestStandardised&&(i.sqlFormat="standard"),n.isTable()&&r&&null!==t&&""!==t)return{calculated:!0,result:0};var s=null===a?null===r?"1=1":"":a.toWhereClause(e);return n._layer.definitionExpression&&(s=""!==s?"(("+n._layer.definitionExpression+") AND ("+s+"))":n._layer.definitionExpression),i.where=s,i.where=s,i.spatialRelationship=n._makeRelationshipEnum(t),i.relationParam=n._makeRelationshipParam(t),i.geometry=null===r?null:r,i.returnGeometry=!1,n.executeQuery(i,"executeForCount").then(function(e){return{calculated:!0,result:e}})})},t.prototype._stats=function(e,t,r,a,i,n,s){var l=this;return this._ensureLoaded().then(function(){var o=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsSqlExpression,u=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsStatistics,d=l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsDistinct;return"count"===e?d?l._countstat(e,r,a,i,s):{calculated:!1}:!1===u||!1===t.isSingleField()&&!1===o||!1===t.isStandardized()?""!==r||null!==i?{calculated:!1}:l._manualStat(e,t,n,s):"distinct"===e?!1===d?""!==r||null!==i?{calculated:!1}:l._manualStat(e,t,n,s):l._distinctStat(e,t,r,a,i,n,s):l.databaseType().then(function(n){if(l.isTable()&&a&&null!==r&&""!==r)return{calculated:!0,result:null};var s=new m;l._requestStandardised&&(s.sqlFormat="standard");var o=null===i?null===a?"1=1":"":i.toWhereClause(n);l._layer.definitionExpression&&(o=""!==o?"(("+l._layer.definitionExpression+") AND ("+o+"))":l._layer.definitionExpression),s.where=o,s.spatialRelationship=l._makeRelationshipEnum(r),s.relationParam=l._makeRelationshipParam(r),s.geometry=null===a?null:a;var u=new b;u.statisticType=y.decodeStatType(e),u.onStatisticField=t.toWhereClause(n),u.outStatisticFieldName="ARCADE_STAT_RESULT";var d="ARCADE_STAT_RESULT";return s.returnGeometry=!1,s.outStatistics=[u],l.executeQuery(s,"execute").then(function(e){if(!e.hasOwnProperty("features")||0===e.features.length)return f.reject(new Error("Unnexected Result querying statistics from layer"));for(var t=!1,r=0;r<e.fields.length;r++)if("ARCADE_STAT_RESULT"===e.fields[r].name.toUpperCase()){d=e.fields[r].name,"esriFieldTypeDate"===e.fields[r].type&&(t=!0);break}if(t){var a=e.features[0].attributes[d];return null!==a&&(a=new Date(e.features[0].attributes[d])),{calculated:!0,result:a}}return{calculated:!0,result:e.features[0].attributes[d]}})})})},t.prototype._stat=function(e,t,r,a,i,n,s){return this._stats(e,t,r,a,i,n,s)},t.prototype._canDoAggregates=function(e,t,r,a,i){var n=this;return this._ensureLoaded().then(function(e){var r=!1,a=n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsSqlExpression;if(void 0!==n._layer.advancedQueryCapabilities&&null!==n._layer.advancedQueryCapabilities&&!0===n._layer.advancedQueryCapabilities.supportsStatistics&&!0===n._layer.advancedQueryCapabilities.supportsOrderBy&&(r=!0),r)for(var i=0;i<t.length-1;i++)null!==t[i].workingexpr&&(!1===t[i].workingexpr.isStandardized()?r=!1:!1===t[i].workingexpr.isSingleField()&&!1===a&&(r=!1));return!1!==r})},t.prototype._makeRelationshipEnum=function(e){return e.indexOf("esriSpatialRelRelation")>=0?"esriSpatialRelRelation":e},t.prototype._makeRelationshipParam=function(e){return e.indexOf("esriSpatialRelRelation")>=0?e.split(":")[1]:""},t.prototype._getAggregatePagesDataSourceDefinition=function(e,t,r,a,i,n,s){var l=this;return this._ensureLoaded().then(function(o){return l.databaseType().then(function(o){var u="",p=!1,c=!1;null!==n&&void 0!==l._layer.advancedQueryCapabilities&&null!==l._layer.advancedQueryCapabilities&&!0===l._layer.advancedQueryCapabilities.supportsOrderBy&&(u=n.constructClause(),c=!0),void 0!==l._layer.advancedQueryCapabilities&&null!==l._layer.advancedQueryCapabilities&&!1===l._layer.advancedQueryCapabilities.supportsPagination&&(c=!1,p=!0,u=l._layer.objectIdField);for(var y=[],f=0;f<t.length;f++){var h=new b;h.onStatisticField=null!==t[f].workingexpr?t[f].workingexpr.toWhereClause(o):"",h.outStatisticFieldName=t[f].field,h.statisticType=t[f].toStatisticsName(),y.push(h)}""===u&&(u=e.join(","));var _=l._maxQueryRate();void 0!==l._layer.maxRecordCount&&l._layer.maxRecordCount<_&&(_=l._layer.maxRecordCount);var g=null===i?null===a?"1=1":"":i.toWhereClause(o);return l._layer.definitionExpression&&(g=""!==g?"(("+l._layer.definitionExpression+") AND ("+g+"))":l._layer.definitionExpression),new d([],["GETPAGES"],c,{groupbypage:!0,spatialRel:l._makeRelationshipEnum(r),relationParam:l._makeRelationshipParam(r),outFields:["*"],useOIDpagination:p,generatedOid:s,resultRecordCount:_,resultOffset:0,groupByFieldsForStatistics:e,outStatistics:y,geometry:null===a?null:a,where:g,orderByFields:u,returnGeometry:!1,returnIdsOnly:!1,internal:{lastMaxId:-1,set:[],lastRetrieved:0,fullyResolved:!1}})})})},t.prototype._getAgregagtePhysicalPage=function(e,t,a){var i=this;try{var n=e.pagesDefinition.where;!0===e.pagesDefinition.useOIDpagination&&(n=""!==n?"("+n+") AND ("+e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString()+")":e.pagesDefinition.generatedOid+">"+e.pagesDefinition.internal.lastMaxId.toString());var s=e.pagesDefinition.internal.lastRetrieved,l=s,o=new m;return this._requestStandardised&&(o.sqlFormat="standard"),o.where=n,o.spatialRelationship=e.pagesDefinition.spatialRel,o.relationParam=e.pagesDefinition.relationParam,o.outFields=e.pagesDefinition.outFields,o.outStatistics=e.pagesDefinition.outStatistics,o.geometry=e.pagesDefinition.geometry,o.groupByFieldsForStatistics=e.pagesDefinition.groupByFieldsForStatistics,o.num=e.pagesDefinition.resultRecordCount,o.start=e.pagesDefinition.internal.lastRetrieved,o.returnGeometry=e.pagesDefinition.returnGeometry,o.orderByFields=""!==e.pagesDefinition.orderByFields?e.pagesDefinition.orderByFields.split(","):null,this.isTable()&&o.geometry&&o.spatialRelationship?f.resolve([]):this.executeQuery(o,"execute").then(function(t){if(i._checkCancelled(a),!t.hasOwnProperty("features"))return f.reject(new Error("Unnexected Result querying aggregates from layer"));var n=[];if(e.pagesDefinition.internal.lastRetrieved!==s)return f.resolve([]);for(var o=0;o<t.features.length;o++)void 0===t.features[o].geometry&&(t.features[o].geometry=null),e.pagesDefinition.internal.set[l+o]=t.features[o].attributes[e.pagesDefinition.generatedOid];for(var o=0;o<t.features.length;o++)n.push(new r({attributes:t.features[o].attributes,geometry:null}));return!0===e.pagesDefinition.useOIDpagination?0===t.features.length?e.pagesDefinition.internal.fullyResolved=!0:e.pagesDefinition.internal.lastMaxId=t.features[t.features.length-1].attributes[e.pagesDefinition.generatedOid]:t.features.length!==e.pagesDefinition.resultRecordCount&&(e.pagesDefinition.internal.fullyResolved=!0),e.pagesDefinition.internal.lastRetrieved=s+e.pagesDefinition.resultRecordCount,n})}catch(e){return f.reject(e)}},t.create=function(e,r,a){return new t({url:e,outFields:null===r?["*"]:r,spatialReference:a})},t.prototype.canBeBigDataFeatureSet=function(){return!0},t.prototype.shouldBeResolvedAsBigData=function(){return!1},t.prototype.expressAsArcadeScriptImpl=function(e,t,r){var a=(this.arcadeAssignNextScriptStepIdentifiers(r),this.arcadeAssignNextGlobalIdentifier(r));return t[a]={name:a,type:"FeatureLayer",params:{url:this._layer.url,definitionExpression:this._layer.definitionExpression,fields:this._layer.outFields}},r.featuresetsyms.push(a),""},t.prototype.queryAttachments=function(e,t,r,a){var i=this;if(this._layer.supportsAttachments){var n={objectIds:[e]};return(t&&t>0||r&&r>0)&&(n.size=[t&&t>0?t:0,r&&r>0?r:t+1]),a&&a.length>0&&(n.attachmentTypes=a),this._layer.queryAttachments(n).then(function(t){var r=[];if(t&&t[e]){var a=i._layer._url.path;t[e].forEach(function(t){var i=a+"/"+e.toString()+"/attachments/"+t.id.toString();r.push(new l(t.id,t.name,t.contentType,t.size,i))})}return r})}return f.resolve([])},t}(u)});