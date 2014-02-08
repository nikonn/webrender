(function(){var s=this;var q=s.Backbone;var i=[];var h=i.push;var r=i.slice;var B=i.splice;var d;if(typeof exports!=="undefined"){d=exports}else{d=s.Backbone={}}d.VERSION="0.9.10";var D=s._;if(!D&&(typeof require!=="undefined")){D=require("underscore")}d.$=s.jQuery||s.Zepto||s.ender;d.noConflict=function(){s.Backbone=q;return this};d.emulateHTTP=false;d.emulateJSON=false;var a=/\s+/;var F=function(N,L,H,K){if(!H){return true}if(typeof H==="object"){for(var J in H){N[L].apply(N,[J,H[J]].concat(K))}}else{if(a.test(H)){var M=H.split(a);for(var I=0,G=M.length;I<G;I++){N[L].apply(N,[M[I]].concat(K))}}else{return true}}};var e=function(J,H){var K,I=-1,G=J.length;switch(H.length){case 0:while(++I<G){(K=J[I]).callback.call(K.ctx)}return;case 1:while(++I<G){(K=J[I]).callback.call(K.ctx,H[0])}return;case 2:while(++I<G){(K=J[I]).callback.call(K.ctx,H[0],H[1])}return;case 3:while(++I<G){(K=J[I]).callback.call(K.ctx,H[0],H[1],H[2])}return;default:while(++I<G){(K=J[I]).callback.apply(K.ctx,H)}}};var p=d.Events={on:function(G,J,H){if(!(F(this,"on",G,[J,H])&&J)){return this}this._events||(this._events={});var I=this._events[G]||(this._events[G]=[]);I.push({callback:J,context:H,ctx:H||this});return this},once:function(H,K,I){if(!(F(this,"once",H,[K,I])&&K)){return this}var G=this;var J=D.once(function(){G.off(H,J);K.apply(this,arguments)});J._callback=K;this.on(H,J,I);return this},off:function(G,P,H){var M,O,Q,N,L,I,K,J;if(!this._events||!F(this,"off",G,[P,H])){return this}if(!G&&!P&&!H){this._events={};return this}N=G?[G]:D.keys(this._events);for(L=0,I=N.length;L<I;L++){G=N[L];if(M=this._events[G]){Q=[];if(P||H){for(K=0,J=M.length;K<J;K++){O=M[K];if((P&&P!==O.callback&&P!==O.callback._callback)||(H&&H!==O.context)){Q.push(O)}}}this._events[G]=Q}}return this},trigger:function(I){if(!this._events){return this}var H=r.call(arguments,1);if(!F(this,"trigger",I,H)){return this}var J=this._events[I];var G=this._events.all;if(J){e(J,H)}if(G){e(G,arguments)}return this},listenTo:function(I,G,K){var H=this._listeners||(this._listeners={});var J=I._listenerId||(I._listenerId=D.uniqueId("l"));H[J]=I;I.on(G,typeof G==="object"?this:K,this);return this},stopListening:function(I,G,K){var H=this._listeners;if(!H){return}if(I){I.off(G,typeof G==="object"?this:K,this);if(!G&&!K){delete H[I._listenerId]}}else{if(typeof G==="object"){K=this}for(var J in H){H[J].off(G,K,this)}this._listeners={}}return this}};p.bind=p.on;p.unbind=p.off;D.extend(d,p);var n=d.Model=function(G,I){var J;var H=G||{};this.cid=D.uniqueId("c");this.attributes={};if(I&&I.collection){this.collection=I.collection}if(I&&I.parse){H=this.parse(H,I)||{}}if(J=D.result(this,"defaults")){H=D.defaults({},H,J)}this.set(H,I);this.changed={};this.initialize.apply(this,arguments)};D.extend(n.prototype,p,{changed:null,idAttribute:"id",initialize:function(){},toJSON:function(G){return D.clone(this.attributes)},sync:function(){return d.sync.apply(this,arguments)},get:function(G){return this.attributes[G]},escape:function(G){return D.escape(this.get(G))},has:function(G){return this.get(G)!=null},set:function(O,G,S){var M,P,Q,N,L,R,I,K;if(O==null){return this}if(typeof O==="object"){P=O;S=G}else{(P={})[O]=G}S||(S={});if(!this._validate(P,S)){return false}Q=S.unset;L=S.silent;N=[];R=this._changing;this._changing=true;if(!R){this._previousAttributes=D.clone(this.attributes);this.changed={}}K=this.attributes,I=this._previousAttributes;if(this.idAttribute in P){this.id=P[this.idAttribute]}for(M in P){G=P[M];if(!D.isEqual(K[M],G)){N.push(M)}if(!D.isEqual(I[M],G)){this.changed[M]=G}else{delete this.changed[M]}Q?delete K[M]:K[M]=G}if(!L){if(N.length){this._pending=true}for(var J=0,H=N.length;J<H;J++){this.trigger("change:"+N[J],this,K[N[J]],S)}}if(R){return this}if(!L){while(this._pending){this._pending=false;this.trigger("change",this,S)}}this._pending=false;this._changing=false;return this},unset:function(G,H){return this.set(G,void 0,D.extend({},H,{unset:true}))},clear:function(H){var G={};for(var I in this.attributes){G[I]=void 0}return this.set(G,D.extend({},H,{unset:true}))},hasChanged:function(G){if(G==null){return !D.isEmpty(this.changed)}return D.has(this.changed,G)},changedAttributes:function(I){if(!I){return this.hasChanged()?D.clone(this.changed):false}var K,J=false;var H=this._changing?this._previousAttributes:this.attributes;for(var G in I){if(D.isEqual(H[G],(K=I[G]))){continue}(J||(J={}))[G]=K}return J},previous:function(G){if(G==null||!this._previousAttributes){return null}return this._previousAttributes[G]},previousAttributes:function(){return D.clone(this._previousAttributes)},fetch:function(G){G=G?D.clone(G):{};if(G.parse===void 0){G.parse=true}var H=G.success;G.success=function(J,K,I){if(!J.set(J.parse(K,I),I)){return false}if(H){H(J,K,I)}};return this.sync("read",this,G)},save:function(J,M,I){var H,L,N,K,G=this.attributes;if(J==null||typeof J==="object"){H=J;I=M}else{(H={})[J]=M}if(H&&(!I||!I.wait)&&!this.set(H,I)){return false}I=D.extend({validate:true},I);if(!this._validate(H,I)){return false}if(H&&I.wait){this.attributes=D.extend({},G,H)}if(I.parse===void 0){I.parse=true}L=I.success;I.success=function(P,R,O){P.attributes=G;var Q=P.parse(R,O);if(O.wait){Q=D.extend(H||{},Q)}if(D.isObject(Q)&&!P.set(Q,O)){return false}if(L){L(P,R,O)}};N=this.isNew()?"create":(I.patch?"patch":"update");if(N==="patch"){I.attrs=H}K=this.sync(N,this,I);if(H&&I.wait){this.attributes=G}return K},destroy:function(H){H=H?D.clone(H):{};var G=this;var K=H.success;var I=function(){G.trigger("destroy",G,G.collection,H)};H.success=function(M,N,L){if(L.wait||M.isNew()){I()}if(K){K(M,N,L)}};if(this.isNew()){H.success(this,null,H);return false}var J=this.sync("delete",this,H);if(!H.wait){I()}return J},url:function(){var G=D.result(this,"urlRoot")||D.result(this.collection,"url")||v();if(this.isNew()){return G}return G+(G.charAt(G.length-1)==="/"?"":"/")+encodeURIComponent(this.id)},parse:function(H,G){return H},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return this.id==null},isValid:function(G){return !this.validate||!this.validate(this.attributes,G)},_validate:function(I,H){if(!H.validate||!this.validate){return true}I=D.extend({},this.attributes,I);var G=this.validationError=this.validate(I,H)||null;if(!G){return true}this.trigger("invalid",this,G,H||{});return false}});var E=d.Collection=function(H,G){G||(G={});if(G.model){this.model=G.model}if(G.comparator!==void 0){this.comparator=G.comparator}this.models=[];this._reset();this.initialize.apply(this,arguments);if(H){this.reset(H,D.extend({silent:true},G))}};D.extend(E.prototype,p,{model:n,initialize:function(){},toJSON:function(G){return this.map(function(H){return H.toJSON(G)})},sync:function(){return d.sync.apply(this,arguments)},add:function(G,R){G=D.isArray(G)?G.slice():[G];R||(R={});var M,J,N,P,H,O,Q,I,L,K;Q=[];I=R.at;L=this.comparator&&(I==null)&&R.sort!=false;K=D.isString(this.comparator)?this.comparator:null;for(M=0,J=G.length;M<J;M++){if(!(N=this._prepareModel(P=G[M],R))){this.trigger("invalid",this,P,R);continue}if(H=this.get(N)){if(R.merge){H.set(P===N?N.attributes:P,R);if(L&&!O&&H.hasChanged(K)){O=true}}continue}Q.push(N);N.on("all",this._onModelEvent,this);this._byId[N.cid]=N;if(N.id!=null){this._byId[N.id]=N}}if(Q.length){if(L){O=true}this.length+=Q.length;if(I!=null){B.apply(this.models,[I,0].concat(Q))}else{h.apply(this.models,Q)}}if(O){this.sort({silent:true})}if(R.silent){return this}for(M=0,J=Q.length;M<J;M++){(N=Q[M]).trigger("add",N,this,R)}if(O){this.trigger("sort",this,R)}return this},remove:function(L,J){L=D.isArray(L)?L.slice():[L];J||(J={});var K,G,I,H;for(K=0,G=L.length;K<G;K++){H=this.get(L[K]);if(!H){continue}delete this._byId[H.id];delete this._byId[H.cid];I=this.indexOf(H);this.models.splice(I,1);this.length--;if(!J.silent){J.index=I;H.trigger("remove",H,this,J)}this._removeReference(H)}return this},push:function(H,G){H=this._prepareModel(H,G);this.add(H,D.extend({at:this.length},G));return H},pop:function(H){var G=this.at(this.length-1);this.remove(G,H);return G},unshift:function(H,G){H=this._prepareModel(H,G);this.add(H,D.extend({at:0},G));return H},shift:function(H){var G=this.at(0);this.remove(G,H);return G},slice:function(H,G){return this.models.slice(H,G)},get:function(G){if(G==null){return void 0}this._idAttr||(this._idAttr=this.model.prototype.idAttribute);return this._byId[G.id||G.cid||G[this._idAttr]||G]},at:function(G){return this.models[G]},where:function(G){if(D.isEmpty(G)){return[]}return this.filter(function(H){for(var I in G){if(G[I]!==H.get(I)){return false}}return true})},sort:function(G){if(!this.comparator){throw new Error("Cannot sort a set without a comparator")}G||(G={});if(D.isString(this.comparator)||this.comparator.length===1){this.models=this.sortBy(this.comparator,this)}else{this.models.sort(D.bind(this.comparator,this))}if(!G.silent){this.trigger("sort",this,G)}return this},pluck:function(G){return D.invoke(this.models,"get",G)},update:function(G,O){O=D.extend({add:true,merge:true,remove:true},O);if(O.parse){G=this.parse(G,O)}var M,K,I,H;var N=[],L=[],J={};if(!D.isArray(G)){G=G?[G]:[]}if(O.add&&!O.remove){return this.add(G,O)}for(K=0,I=G.length;K<I;K++){M=G[K];H=this.get(M);if(O.remove&&H){J[H.cid]=true}if((O.add&&!H)||(O.merge&&H)){N.push(M)}}if(O.remove){for(K=0,I=this.models.length;K<I;K++){M=this.models[K];if(!J[M.cid]){L.push(M)}}}if(L.length){this.remove(L,O)}if(N.length){this.add(N,O)}return this},reset:function(J,H){H||(H={});if(H.parse){J=this.parse(J,H)}for(var I=0,G=this.models.length;I<G;I++){this._removeReference(this.models[I])}H.previousModels=this.models.slice();this._reset();if(J){this.add(J,D.extend({silent:true},H))}if(!H.silent){this.trigger("reset",this,H)}return this},fetch:function(G){G=G?D.clone(G):{};if(G.parse===void 0){G.parse=true}var H=G.success;G.success=function(K,J,I){var L=I.update?"update":"reset";K[L](J,I);if(H){H(K,J,I)}};return this.sync("read",this,G)},create:function(H,G){G=G?D.clone(G):{};if(!(H=this._prepareModel(H,G))){return false}if(!G.wait){this.add(H,G)}var J=this;var I=G.success;G.success=function(L,M,K){if(K.wait){J.add(L,K)}if(I){I(L,M,K)}};H.save(null,G);return H},parse:function(H,G){return H},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models.length=0;this._byId={}},_prepareModel:function(I,H){if(I instanceof n){if(!I.collection){I.collection=this}return I}H||(H={});H.collection=this;var G=new this.model(I,H);if(!G._validate(I,H)){return false}return G},_removeReference:function(G){if(this===G.collection){delete G.collection}G.off("all",this._onModelEvent,this)},_onModelEvent:function(I,H,J,G){if((I==="add"||I==="remove")&&J!==this){return}if(I==="destroy"){this.remove(H,G)}if(H&&I==="change:"+H.idAttribute){delete this._byId[H.previous(H.idAttribute)];if(H.id!=null){this._byId[H.id]=H}}this.trigger.apply(this,arguments)},sortedIndex:function(G,J,H){J||(J=this.comparator);var I=D.isFunction(J)?J:function(K){return K.get(J)};return D.sortedIndex(this.models,G,I,H)}});var z=["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect","filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","indexOf","shuffle","lastIndexOf","isEmpty","chain"];D.each(z,function(G){E.prototype[G]=function(){var H=r.call(arguments);H.unshift(this.models);return D[G].apply(D,H)}});var j=["groupBy","countBy","sortBy"];D.each(j,function(G){E.prototype[G]=function(J,H){var I=D.isFunction(J)?J:function(K){return K.get(J)};return D[G](this.models,I,H)}});var C=d.Router=function(G){G||(G={});if(G.routes){this.routes=G.routes}this._bindRoutes();this.initialize.apply(this,arguments)};var m=/\((.*?)\)/g;var k=/(\(\?)?:\w+/g;var A=/\*\w+/g;var f=/[\-{}\[\]+?.,\\\^$|#\s]/g;D.extend(C.prototype,p,{initialize:function(){},route:function(G,H,I){if(!D.isRegExp(G)){G=this._routeToRegExp(G)}if(!I){I=this[H]}d.history.route(G,D.bind(function(K){var J=this._extractParameters(G,K);I&&I.apply(this,J);this.trigger.apply(this,["route:"+H].concat(J));this.trigger("route",H,J);d.history.trigger("route",this,H,J)},this));return this},navigate:function(H,G){d.history.navigate(H,G);return this},_bindRoutes:function(){if(!this.routes){return}var H,G=D.keys(this.routes);while((H=G.pop())!=null){this.route(H,this.routes[H])}},_routeToRegExp:function(G){G=G.replace(f,"\\$&").replace(m,"(?:$1)?").replace(k,function(I,H){return H?I:"([^/]+)"}).replace(A,"(.*?)");return new RegExp("^"+G+"$")},_extractParameters:function(G,H){return G.exec(H).slice(1)}});var b=d.History=function(){this.handlers=[];D.bindAll(this,"checkUrl");if(typeof window!=="undefined"){this.location=window.location;this.history=window.history}};var o=/^[#\/]|\s+$/g;var y=/^\/+|\/+$/g;var l=/msie [\w.]+/;var c=/\/$/;b.started=false;D.extend(b.prototype,p,{interval:50,getHash:function(H){var G=(H||this).location.href.match(/#(.*)$/);return G?G[1]:""},getFragment:function(I,H){if(I==null){if(this._hasPushState||!this._wantsHashChange||H){I=this.location.pathname;var G=this.root.replace(c,"");if(!I.indexOf(G)){I=I.substr(G.length)}}else{I=this.getHash()}}return I.replace(o,"")},start:function(I){if(b.started){throw new Error("Backbone.history has already been started")}b.started=true;this.options=D.extend({},{root:"/"},this.options,I);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==false;this._wantsPushState=!!this.options.pushState;this._hasPushState=!!(this.options.pushState&&this.history&&this.history.pushState);var H=this.getFragment();var G=document.documentMode;var K=(l.exec(navigator.userAgent.toLowerCase())&&(!G||G<=7));this.root=("/"+this.root+"/").replace(y,"/");if(K&&this._wantsHashChange){this.iframe=d.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow;this.navigate(H)}if(this._hasPushState){d.$(window).on("popstate",this.checkUrl)}else{if(this._wantsHashChange&&("onhashchange" in window)&&!K){d.$(window).on("hashchange",this.checkUrl)}else{if(this._wantsHashChange){this._checkUrlInterval=setInterval(this.checkUrl,this.interval)}}}this.fragment=H;var L=this.location;var J=L.pathname.replace(/[^\/]$/,"$&/")===this.root;if(this._wantsHashChange&&this._wantsPushState&&!this._hasPushState&&!J){this.fragment=this.getFragment(null,true);this.location.replace(this.root+this.location.search+"#"+this.fragment);return true}else{if(this._wantsPushState&&this._hasPushState&&J&&L.hash){this.fragment=this.getHash().replace(o,"");this.history.replaceState({},document.title,this.root+this.fragment+L.search)}}if(!this.options.silent){return this.loadUrl()}},stop:function(){d.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);clearInterval(this._checkUrlInterval);b.started=false},route:function(G,H){this.handlers.unshift({route:G,callback:H})},checkUrl:function(H){var G=this.getFragment();if(G===this.fragment&&this.iframe){G=this.getFragment(this.getHash(this.iframe))}if(G===this.fragment){return false}if(this.iframe){this.navigate(G)}this.loadUrl()||this.loadUrl(this.getHash())},loadUrl:function(I){var H=this.fragment=this.getFragment(I);var G=D.any(this.handlers,function(J){if(J.route.test(H)){J.callback(H);return true}});return G},navigate:function(I,H){if(!b.started){return false}if(!H||H===true){H={trigger:H}}I=this.getFragment(I||"");if(this.fragment===I){return}this.fragment=I;var G=this.root+I;if(this._hasPushState){this.history[H.replace?"replaceState":"pushState"]({},document.title,G)}else{if(this._wantsHashChange){this._updateHash(this.location,I,H.replace);if(this.iframe&&(I!==this.getFragment(this.getHash(this.iframe)))){if(!H.replace){this.iframe.document.open().close()}this._updateHash(this.iframe.location,I,H.replace)}}else{return this.location.assign(G)}}if(H.trigger){this.loadUrl(I)}},_updateHash:function(G,I,J){if(J){var H=G.href.replace(/(javascript:|#).*$/,"");G.replace(H+"#"+I)}else{G.hash="#"+I}}});d.history=new b;var u=d.View=function(G){this.cid=D.uniqueId("view");this._configure(G||{});this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()};var g=/^(\S+)\s*(.*)$/;var w=["model","collection","el","id","attributes","className","tagName","events"];D.extend(u.prototype,p,{tagName:"div",$:function(G){return this.$el.find(G)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},setElement:function(G,H){if(this.$el){this.undelegateEvents()}this.$el=G instanceof d.$?G:d.$(G);this.el=this.$el[0];if(H!==false){this.delegateEvents()}return this},delegateEvents:function(K){if(!(K||(K=D.result(this,"events")))){return}this.undelegateEvents();for(var J in K){var L=K[J];if(!D.isFunction(L)){L=this[K[J]]}if(!L){throw new Error('Method "'+K[J]+'" does not exist')}var I=J.match(g);var H=I[1],G=I[2];L=D.bind(L,this);H+=".delegateEvents"+this.cid;if(G===""){this.$el.on(H,L)}else{this.$el.on(H,G,L)}}},undelegateEvents:function(){this.$el.off(".delegateEvents"+this.cid)},_configure:function(G){if(this.options){G=D.extend({},D.result(this,"options"),G)}D.extend(this,D.pick(G,w));this.options=G},_ensureElement:function(){if(!this.el){var G=D.extend({},D.result(this,"attributes"));if(this.id){G.id=D.result(this,"id")}if(this.className){G["class"]=D.result(this,"className")}var H=d.$("<"+D.result(this,"tagName")+">").attr(G);this.setElement(H,false)}else{this.setElement(D.result(this,"el"),false)}}});var t={"create":"POST","update":"PUT","patch":"PATCH","delete":"DELETE","read":"GET"};d.sync=function(G,I,O){var J=t[G];D.defaults(O||(O={}),{emulateHTTP:d.emulateHTTP,emulateJSON:d.emulateJSON});var H={type:J,dataType:"json"};if(!O.url){H.url=D.result(I,"url")||v()}if(O.data==null&&I&&(G==="create"||G==="update"||G==="patch")){H.contentType="application/json";H.data=JSON.stringify(O.attrs||I.toJSON(O))}if(O.emulateJSON){H.contentType="application/x-www-form-urlencoded";H.data=H.data?{model:H.data}:{}}if(O.emulateHTTP&&(J==="PUT"||J==="DELETE"||J==="PATCH")){H.type="POST";if(O.emulateJSON){H.data._method=J}var L=O.beforeSend;O.beforeSend=function(P){P.setRequestHeader("X-HTTP-Method-Override",J);if(L){return L.apply(this,arguments)}}}if(H.type!=="GET"&&!O.emulateJSON){H.processData=false}var M=O.success;O.success=function(P){if(M){M(I,P,O)}I.trigger("sync",I,P,O)};var K=O.error;O.error=function(P){if(K){K(I,P,O)}I.trigger("error",I,P,O)};var N=O.xhr=d.ajax(D.extend(H,O));I.trigger("request",I,N,O);return N};d.ajax=function(){return d.$.ajax.apply(d.$,arguments)};var x=function(G,I){var H=this;var K;if(G&&D.has(G,"constructor")){K=G.constructor}else{K=function(){return H.apply(this,arguments)}}D.extend(K,H,I);var J=function(){this.constructor=K};J.prototype=H.prototype;K.prototype=new J;if(G){D.extend(K.prototype,G)}K.__super__=H.prototype;return K};n.extend=E.extend=C.extend=u.extend=b.extend=x;var v=function(){throw new Error('A "url" property or function must be specified')}}).call(this);