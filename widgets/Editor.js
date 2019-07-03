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
// See http://js.arcgis.com/4.12/esri/copyright.txt for details.

define(["require","exports","../core/tsSupport/declareExtendsHelper","../core/tsSupport/decorateHelper","../core/tsSupport/assignHelper","@dojo/framework/shim/Map","dojo/i18n!../nls/common","dojo/i18n!./Editor/nls/Editor","dojo/i18n!./FeatureTemplates/nls/FeatureTemplates","../intl","../core/events","../core/HandleOwner","../core/watchUtils","../core/accessorSupport/decorators","./FeatureForm","./FeatureTemplates","./Spinner","./Widget","./Editor/EditorViewModel","./FeatureTemplates/ItemList","./support/widget"],function(e,t,r,i,n,a,o,l,s,d,c,u,p,f,w,v,h,y,g,_,m){function k(e){e.focus()}var b={base:"esri-editor esri-widget",header:"esri-editor__header",scroller:"esri-editor__scroller",content:"esri-editor__content",contentWrapper:"esri-editor__temp-wrapper",message:"esri-editor__message",controls:"esri-editor__controls",title:"esri-editor__title",backButton:"esri-editor__back-button",modeSelection:"esri-editor__mode-selection",progressBar:"esri-editor__progress-bar",warningCard:"esri-editor__warning-card",warningHeader:"esri-editor__warning-header",warningHeading:"esri-editor__warning-heading",warningMessage:"esri-editor__warning-message",warningDivider:"esri-editor__warning-divider",warningOption:"esri-editor__warning-option",warningOptionPrimary:"esri-editor__warning-option--primary",warningOptionNegative:"esri-editor__warning-option--negative",warningOptionPositive:"esri-editor__warning-option--positive",featureList:"esri-editor__feature-list",featureListItem:"esri-editor__feature-list-item",featureListItemDisabled:"esri-editor__feature-list-item--disabled",featureListName:"esri-editor__feature-list-name",featureListIcon:"esri-editor__feature-list-icon",featureListIndex:"esri-editor__feature-list-index",controlButton:"esri-editor__control-button",overlay:"esri-editor__overlay",errorIcon:"esri-icon-error2",basemapIcon:"esri-basemap",rightArrowIcon:"esri-icon-right",leftArrowIcon:"esri-icon-left",warningIcon:"esri-icon-notice-triangle",widgetIcon:"esri-icon-edit",button:"esri-button",buttonDisabled:"esri-button--disabled",buttonSecondary:"esri-button--secondary",buttonTertiary:"esri-button--tertiary",heading:"esri-heading",input:"esri-input",interactive:"esri-interactive",select:"esri-select"};return function(e){function t(t){var r=e.call(this)||this;return r._featureForm=new w,r._featureTemplates=new v,r._filterText="",r._prompt=null,r._spinner=new h,r.activeWorkflow=null,r.allowedWorkflows=null,r.iconClass=b.widgetIcon,r.label=l.widgetLabel,r.layerInfos=null,r.supportingWidgetDefaults=null,r.view=null,r.viewModel=new g,r._handleSave=r._handleSave.bind(r),r._handleBack=r._handleBack.bind(r),r._handleDone=r._handleDone.bind(r),r._handleDelete=r._handleDelete.bind(r),r._handleAdd=r._handleAdd.bind(r),r._handleEdit=r._handleEdit.bind(r),r}return r(t,e),t.prototype.postInitialize=function(){var e=this;this.own([p.init(this,"viewModel",function(t){e._featureForm.viewModel=t?t.featureFormViewModel:null,e._featureTemplates.viewModel=t?t.featureTemplatesViewModel:null,e._spinner.viewModel=t?t.spinnerViewModel:null}),p.init(this,"view",function(t,r){var i="editor-"+e.id+"-spinner";r&&r.ui.remove(e._spinner,i),t&&t.ui.add(e._spinner,{key:i,position:"manual"})}),p.on(this,"viewModel.sketchViewModel","create",function(){e.scheduleRender()}),p.on(this,"viewModel.activeWorkflow","cancel-request",function(t){var r=t.controller;e._prompt={title:l.cancelRequestTitle,message:l.cancelRequestWarningMessage,options:[{label:o.form.no,type:"neutral",action:function(){return r.deny(),e._prompt=null}},{label:o.form.yes,type:"negative",action:function(){r.allow(),e._prompt=null}}]},e.scheduleRender()}),p.init(this,"supportingWidgetDefaults",function(t){t&&(e._featureForm.set(t.featureForm),e._featureTemplates.set(t.featureTemplates),e.viewModel.sketchViewModel.set(t.sketch))}),p.watch(this,"viewModel.failures",function(t){if(t){var r=t[0],i=r.error,n=r.retry,a=r.cancel;e._prompt={title:l.errorWarningTitle,message:d.substitute(l.errorWarningMessageTemplate,{errorMessage:i.message}),options:[{label:l.retry,type:"positive",action:function(){n(),e._prompt=null}},{label:l.ignore,type:"neutral",action:function(){return a(),e._prompt=null}}]}}}),p.whenNot(this,"viewModel.activeWorkflow",function(){return e._featureTemplates.filterText=""})])},t.prototype.destroy=function(){this._featureForm.destroy(),this._featureTemplates.destroy()},t.prototype.startCreateWorkflowAtFeatureTypeSelection=function(){return null},t.prototype.startCreateWorkflowAtFeatureCreation=function(e){return null},t.prototype.startCreateWorkflowAtFeatureEdit=function(e){return null},t.prototype.startUpdateWorkflowAtFeatureSelection=function(){return null},t.prototype.startUpdateWorkflowAtMultipleFeatureSelection=function(e){return null},t.prototype.startUpdateWorkflowAtFeatureEdit=function(e){return null},t.prototype.deleteFeatureFromWorkflow=function(){return null},t.prototype.cancelWorkflow=function(e){return null},t.prototype.render=function(){var e=this.viewModel;if(!e)return m.tsx("div",{class:b.base});var t=e.state,r=this._prompt?m.tsx("div",{class:b.overlay,key:"overlay"},this.renderPrompt({message:this._prompt.message,title:this._prompt.title,options:this._prompt.options})):null;return m.tsx("div",{class:b.base},this.viewModel.syncing?this.renderProgressBar():null,"disabled"===t?null:"ready"===t?this.renderLanding():"awaiting-feature-creation-info"===t?this.renderTemplates():"editing-new-feature"===t||"editing-existing-feature"===t?this.renderAttributeEditing():"awaiting-feature-to-update"===t?this.renderFeatureUpdating():"awaiting-update-feature-candidate"===t?this.renderFeatureList():"awaiting-feature-to-create"===t?this.renderFeatureCreation():null,r)},t.prototype.renderTemplates=function(){return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(l.selectTemplate,!0),m.tsx("div",{key:"content",class:b.content},this._featureTemplates.render()))},t.prototype.renderAttributeEditing=function(){var e=this.viewModel,t=e.activeWorkflow,r=e.featureFormViewModel,i=t.data.edits.feature,n="update"===t.type&&!t.data.edits.modified||r.inputFields.length>0&&!r.valid,a="create"===t.type?o.add:o.update,s=[{label:a,type:"primary",disabled:n,clickHandler:this._handleSave}];"update"===t.type&&t.data.editableItem.supports.indexOf("delete")>-1&&s.push({label:o.delete,type:"tertiary",clickHandler:this._handleDelete});var c=this._getLabel(i);return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(c,!0),m.tsx("div",{key:"content",class:this.classes(b.content,b.scroller)},r.inputFields.length>0?this._featureForm.render():this.renderMessage(d.substitute(l.clickToFinishTemplate,{button:a}))),this.renderControls(s))},t.prototype.renderFeatureUpdating=function(){return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(l.selectFeature,!0),m.tsx("div",{key:"content",class:this.classes(b.content,b.scroller)},this.renderMessage(l.selectFeatureToEdit)))},t.prototype.renderMessage=function(e){return m.tsx("div",{class:b.message},e)},t.prototype.renderFeatureCreation=function(){var e=this.viewModel,t=e.sketchViewModel,r=e.activeWorkflow,i=r.data.creationInfo.layer,n=t.canUndo()&&t.createGraphic?t.createGraphic:null,a=this._getSketchingTip(i.geometryType,n);return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(l.placeFeature,!0),m.tsx("div",{key:"content",class:this.classes(b.content,b.scroller)},this.renderMessage(a)))},t.prototype.renderControls=function(e){var t=this;return m.tsx("div",{class:b.controls,key:"controls"},e.map(function(e,r){var i=e.disabled,n=void 0!==i&&i,a=e.label,o=e.type,l=e.clickHandler;return t.renderButton({label:a,class:t.classes(b.controlButton,b.button,"secondary"===o?b.buttonSecondary:"tertiary"===o?b.buttonTertiary:null,n?b.buttonDisabled:null),disabled:n,clickHandler:l,key:r})}))},t.prototype.renderPrompt=function(e){var t=this,r=e.title,i=e.message,n=e.options,a=void 0===n?[]:n;return m.tsx("div",{class:b.warningCard,role:"alert"},m.tsx("div",{class:b.warningHeader},m.tsx("span",{class:b.warningIcon,"aria-hidden":"true"}),m.tsx("h4",{class:this.classes(b.heading,b.warningHeading)},r)),m.tsx("div",{class:b.warningMessage},i),m.tsx("div",{class:b.warningDivider}),a.map(function(e,r){var i=e.label,n=e.action,a=e.type,o=0===r;return m.tsx("div",{afterCreate:o?k:null,class:t.classes(b.warningOption,o?b.warningOptionPrimary:null,"positive"===a?b.warningOptionPositive:"negative"===a?b.warningOptionNegative:null),key:r,onclick:n,onkeydown:function(e){var t=c.eventKey(e);"Enter"!==t&&" "!==t||(e.preventDefault(),n.call(null))},tabIndex:0,role:"button"},i)}))},t.prototype.renderProgressBar=function(){return m.tsx("div",{class:this.classes(b.progressBar),key:"progress-bar"})},t.prototype.renderButton=function(e){return m.tsx("button",{class:e.class,disabled:e.disabled,key:e.key,onclick:e.clickHandler},e.label)},t.prototype.renderHeader=function(e,t){return void 0===t&&(t=!1),m.tsx("header",{class:b.header,key:"header"},t?m.tsx("div",{"aria-label":o.back,class:this.classes(b.backButton,b.interactive),key:"back-button",onclick:this._handleBack,onkeydown:this._handleBack,tabIndex:0,title:o.back},m.tsx("span",{"aria-hidden":"true",class:m.isRTL()?b.rightArrowIcon:b.leftArrowIcon})):null,m.tsx("h4",{class:this.classes(b.title,b.heading)},e))},t.prototype.renderLanding=function(){var e=this.viewModel,t=e.allowedWorkflows,r=e.canCreate,i=e.canUpdate,n=m.isRTL()?b.leftArrowIcon:b.rightArrowIcon;return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(l.widgetLabel),m.tsx("div",{key:"content",class:b.content,role:"group"},m.tsx("div",{class:b.modeSelection,key:"mode-selection"},t.indexOf("update")>-1?m.tsx("div",{"aria-disabled":i?"false":"true",class:this.classes(b.featureListItem,i?null:b.featureListItemDisabled),key:"update",onclick:this._handleEdit,onkeydown:this._handleEdit,role:"button",tabIndex:i?0:-1},m.tsx("span",{class:b.featureListName},l.editFeature),m.tsx("span",{"aria-hidden":"true",class:this.classes(b.featureListIcon,n)})):null,t.indexOf("create")>-1?m.tsx("div",{class:this.classes(b.featureListItem,r?null:b.featureListItemDisabled),key:"create",onclick:this._handleAdd,onkeydown:this._handleAdd,role:"button",tabIndex:r?0:-1},m.tsx("span",{class:b.featureListName},l.addFeature),m.tsx("span",{"aria-hidden":"true",class:this.classes(b.featureListIcon,n)})):null)))},t.prototype.renderFeatureList=function(){var e=this,t=this.viewModel,r=t.editableItems,i=t.activeWorkflow,n=i,o=n.data.candidates,c=d.substitute(l.multipleFeaturesTemplate,{total:o.length}),u=new a.default;o.map(function(t){return{label:e._getLabel(t),id:t.attributes[t.layer.objectIdField],data:t}}).filter(function(t){var r=t.label,i=t.data,n=e._filterText.toLowerCase(),a=i.layer.title;return e.viewModel.editableItems.find(function(e){return e.layer===i.layer}).supports.indexOf("update")>-1&&(!n||r.toLowerCase().indexOf(n)>-1||a.toLowerCase().indexOf(n)>-1)}).forEach(function(e){var t=e.data.layer;if(!u.has(t))return void u.set(t,{id:t.id,label:t.title,items:[e]});u.get(t).items.push(e)});var p=r.filter(function(e){var t=e.layer;return u.has(t)}).map(function(e){var t=e.layer;return u.get(t)}).toArray();return m.tsx("div",{class:b.contentWrapper,key:"wrapper"},this.renderHeader(c,!0),m.tsx("div",{key:"content",class:this.classes(b.content,b.scroller)},_.ItemList({id:this.id,filterText:this._filterText,items:p,messages:{filterPlaceholder:s.filterPlaceholder,noItems:s.noItems,noMatches:s.noMatches},onItemMouseEnter:function(e){var t=e.data;n.data.edits.feature=t},onItemMouseLeave:function(){n.data.edits.feature=null},onItemSelect:function(e){var t=e.data;n.data.edits.feature=t,n.next()},onFilterChange:function(t){e._filterText=t}})))},t.prototype._getSketchingTip=function(e,t){if("point"===e)return l.tips.clickToAddPoint;if("polygon"===e||"polyline"===e){if(!t)return l.tips.clickToStart;var r=t.geometry,i="polygon"===e?"rings":"paths",n=r[i][0];return"polygon"===e&&n<4?l.tips.clickToContinue:l.tips.clickToContinueThenDoubleClickToEnd}return l.tips.clickToAddFeature},t.prototype._getLabel=function(e){var t=e.layer,r=t.displayField,i=t.objectIdField,n=e.attributes;return r&&n[r]||d.substitute(l.untitledFeatureTemplate,{id:n[i]})},t.prototype._handleDelete=function(){var e=this;this._prompt={title:l.deleteWarningTitle,message:l.deleteWarningMessage,options:[{label:l.keepFeature,type:"neutral",action:function(){return e._prompt=null}},{label:o.delete,type:"positive",action:function(){e.viewModel.deleteFeatureFromWorkflow(),e._prompt=null}}]}},t.prototype._handleSave=function(){var e=this.viewModel.activeWorkflow;e.commit(),e.reset()},t.prototype._handleAdd=function(){this.viewModel.canCreate&&this.viewModel.startCreateWorkflowAtFeatureTypeSelection()},t.prototype._handleEdit=function(){this.viewModel.canUpdate&&this.viewModel.startUpdateWorkflowAtFeatureSelection()},t.prototype._handleDone=function(){this.viewModel.cancelWorkflow({force:!0})},t.prototype._handleBack=function(){var e=this,t=this.viewModel.activeWorkflow,r=t.stepId,i=t.data,n=t.type,a=function(){if(t.hasPreviousStep)return void t.previous();e.viewModel.cancelWorkflow({force:!0})};if("editing-new-feature"===r||"editing-existing-feature"===r&&i.edits.modified){var o="create"===n?l.cancelAddWarningMessage:l.cancelEditWarningMessage,s="create"===n?l.cancelAddTitle:l.cancelEditTitle,d="create"===n?l.continueAdding:l.continueEditing,c="create"===n?l.discardFeature:l.discardEdits;return void(this._prompt={title:s,message:o,options:[{label:d,type:"neutral",action:function(){return e._prompt=null}},{label:c,type:"negative",action:function(){a(),e._prompt=null}}]})}a()},i([f.aliasOf("viewModel.activeWorkflow")],t.prototype,"activeWorkflow",void 0),i([f.aliasOf("viewModel.allowedWorkflows")],t.prototype,"allowedWorkflows",void 0),i([f.property()],t.prototype,"iconClass",void 0),i([f.property()],t.prototype,"label",void 0),i([f.aliasOf("viewModel.layerInfos")],t.prototype,"layerInfos",void 0),i([f.property()],t.prototype,"supportingWidgetDefaults",void 0),i([f.aliasOf("viewModel.view")],t.prototype,"view",void 0),i([f.property(),m.renderable(["viewModel.canCreate","viewModel.canUpdate","viewModel.failures","viewModel.state","viewModel.syncing","viewModel.activeWorkflow.data.edits.modified"])],t.prototype,"viewModel",void 0),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureTypeSelection")],t.prototype,"startCreateWorkflowAtFeatureTypeSelection",null),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureCreation")],t.prototype,"startCreateWorkflowAtFeatureCreation",null),i([f.aliasOf("viewModel.startCreateWorkflowAtFeatureEdit")],t.prototype,"startCreateWorkflowAtFeatureEdit",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtFeatureSelection")],t.prototype,"startUpdateWorkflowAtFeatureSelection",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtMultipleFeatureSelection")],t.prototype,"startUpdateWorkflowAtMultipleFeatureSelection",null),i([f.aliasOf("viewModel.startUpdateWorkflowAtFeatureEdit")],t.prototype,"startUpdateWorkflowAtFeatureEdit",null),i([f.aliasOf("viewModel.deleteFeatureFromWorkflow")],t.prototype,"deleteFeatureFromWorkflow",null),i([f.aliasOf("viewModel.cancelWorkflow")],t.prototype,"cancelWorkflow",null),i([m.accessibleHandler()],t.prototype,"_handleDelete",null),i([m.accessibleHandler()],t.prototype,"_handleAdd",null),i([m.accessibleHandler()],t.prototype,"_handleEdit",null),i([m.accessibleHandler()],t.prototype,"_handleDone",null),i([m.accessibleHandler()],t.prototype,"_handleBack",null),t=i([f.subclass("esri.widgets.Editor")],t)}(f.declared(y,u))});