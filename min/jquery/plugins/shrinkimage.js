(function(e,t,n,r){"use strict";var i="qoopido",s="jquery/plugins/shrinkimage",o=function(){return[].push.apply(arguments,[t,n,r]),t[i]=t[i]||{},t[i][s]=e.apply(null,arguments)};typeof define=="function"&&define.amd?define(["jquery","qoopido/base","qoopido/uuid","qoopido/support","qoopido/support/capability/datauri","qoopido/support/element/canvas/todataurl/png"],o):o(t.jQuery,t[i].base,t[i].uuid,t[i].support,r,r)})(function(e,t,n,r,i,s,o,u,a){"use strict";var f="shrinkimage",l={attribute:"data-"+f,quality:80,debug:!1},c=!1,h={},p=o.location.hostname,d={test:new RegExp('^url(\\x28"{0,1}|)data:image/shrink,(.+?)("{0,1}\\x29|)$',"i"),path:new RegExp('^(?:url\\x28"{0,1}|)(?:data:image/shrink,|)(.+?)(?:"{0,1}\\x29|)$',"i"),hostname:new RegExp("^\\w+://([^/]+)","i")},v=e("<a />"),m,g,y="requested."+f,b="queued."+f,w="cached."+f,E="loaded."+f,S="load";return r.testMultiple("/capability/datauri","/element/canvas/todataurl/png").then(function(){c=!0}),e.fn[f]=function(t){return t=e.extend({},l,t||{}),this.each(function(){var n=e(this),r=n.attr(t.attribute),i=n.css("background-image");this.tagName==="IMG"&&(c===!0&&t.debug===!1?g.create(t,n,r):n.attr("src",r).removeAttr(t.attribute)),i!=="none"&&d.test.test(i)===!0&&(c===!0&&t.debug===!1?g.create(t,n,i,!0):n.css("background-image","url("+d.path.exec(i)[1]+")"))})},m=function(n,r){return e("<img />").attr(n,r).on(S,function(e){e.stopPropagation()})},g=t.extend({_constructor:function(t,n,r,i){var s=this;s._loader=null,s._settings=e.extend({},l,t||{}),s._target=n.css({visibility:"hidden",opacity:0}),s._background=i||!1,s._result=null,s._url=r||!1,s._parameter={quality:s._getParameter("quality",s._url)||s._settings.quality,source:s._url!==!1?d.path.exec(s._resolveUrl(s._url))[1].split("?")[0]:!1,target:s._getParameter("target",s._url)||!1};if(s._url!==!1){s._parameter.target===!1&&(s._parameter.target=s._parameter.source.replace(/\.png$/i,".q"+s._parameter.quality+".shrunk")),s._target.removeAttr(s._settings.attribute);switch(typeof h[s._parameter.target]){case"object":h[s._parameter.target]._target.one(w,function(e){e.namespace===f&&s._assign(!0)}),s._target.trigger(b,[s._parameter.target]);break;case"string":s._assign(!0);break;default:s._loader=m(t.attribute,r),h[s._parameter.target]=s,s._load(),s._target.trigger(y,[s._parameter.target])}}},_load:function(){var t=this,r=p!==d.hostname.exec(t._parameter.target)[1];e.ajax({url:r===!0?t._parameter.target+".jsonp":t._parameter.target,context:t,data:{source:t._parameter.source,quality:t._parameter.quality},global:!1,cache:!0,crossDomain:r||null,dataType:r===!0?"jsonp":"json",jsonpCallback:r===!0?function(){var e;do e=f+"-"+n.generate();while(o[e]!==a);return e}:null}).fail(function(e,n,r){t._fallback()}).done(function(e,n,r){typeof e!="object"||e.width===a||e.height===a||e.size===a||e.main===a||e.alpha===a?t._fallback():(t._result={original:parseInt(e.size,10),compressed:parseInt(r.getResponseHeader("Content-Length"),10)},t._process(e))})},_fallback:function(){var e=this;h[e._parameter.target]=e._parameter.source,e._assign(!1,!0)},_process:function(t){var n=this;n._loader.one(S,function(){var r=u.createElement("canvas"),i=n._loader.get(0),s;r.style.display="none",r.width=t.width,r.height=t.height,s=r.getContext("2d"),s.clearRect(0,0,t.width,t.height),s.drawImage(i,0,0,t.width,t.height),n._loader.one(S,function(){n._loader.remove(),s.globalCompositeOperation="xor",s.drawImage(i,0,0,t.width,t.height),h[n._parameter.target]=r.toDataURL("image/png"),e(r).remove(),n._assign()}).attr("src",t.alpha)}).attr("src",t.main)},_assign:function(e,t){var n=this;n._background===!1?n._target.one(S,function(){n._target.css({visibility:"",opacity:""}).trigger(E,[n._parameter.target,e||!1,t||!1])}).attr("src",h[n._parameter.target]):n._target.css({"background-image":"url("+h[n._parameter.target]+")"}).trigger(E,[n._parameter.target,e||!1,t||!1]),e!==!0&&n._result!==null&&n._target.trigger(w,[n._parameter.target,n._result.compressed,n._result.original])},_resolveUrl:function(e){return v.attr("href",e).prop("href")},_getParameter:function(e,t){return decodeURIComponent(((new RegExp("[?|&]"+e+"="+"([^&;]+?)(&|#|;|$)")).exec(t)||["",""])[1].replace(/\+/g,"%20"))||null}}),g},window,document);