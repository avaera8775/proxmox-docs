(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&r(i)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();/**
* @vue/shared v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**//*! #__NO_SIDE_EFFECTS__ */function br(e){const t=Object.create(null);for(const n of e.split(","))t[n]=1;return n=>n in t}const te={},It=[],Xe=()=>{},Ws=()=>!1,En=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),xr=e=>e.startsWith("onUpdate:"),be=Object.assign,vr=(e,t)=>{const n=e.indexOf(t);n>-1&&e.splice(n,1)},Xs=Object.prototype.hasOwnProperty,Y=(e,t)=>Xs.call(e,t),N=Array.isArray,Ot=e=>An(e)==="[object Map]",Eo=e=>An(e)==="[object Set]",q=e=>typeof e=="function",le=e=>typeof e=="string",ht=e=>typeof e=="symbol",oe=e=>e!==null&&typeof e=="object",Ao=e=>(oe(e)||q(e))&&q(e.then)&&q(e.catch),Ro=Object.prototype.toString,An=e=>Ro.call(e),Ks=e=>An(e).slice(8,-1),Io=e=>An(e)==="[object Object]",yr=e=>le(e)&&e!=="NaN"&&e[0]!=="-"&&""+parseInt(e,10)===e,zt=br(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"),Rn=e=>{const t=Object.create(null);return n=>t[n]||(t[n]=e(n))},Ys=/-(\w)/g,Te=Rn(e=>e.replace(Ys,(t,n)=>n?n.toUpperCase():"")),Qs=/\B([A-Z])/g,kt=Rn(e=>e.replace(Qs,"-$1").toLowerCase()),In=Rn(e=>e.charAt(0).toUpperCase()+e.slice(1)),qn=Rn(e=>e?`on${In(e)}`:""),pt=(e,t)=>!Object.is(e,t),jn=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},Oo=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},Js=e=>{const t=parseFloat(e);return isNaN(t)?e:t};let Vr;const On=()=>Vr||(Vr=typeof globalThis<"u"?globalThis:typeof self<"u"?self:typeof window<"u"?window:typeof global<"u"?global:{});function St(e){if(N(e)){const t={};for(let n=0;n<e.length;n++){const r=e[n],o=le(r)?ni(r):St(r);if(o)for(const s in o)t[s]=o[s]}return t}else if(le(e)||oe(e))return e}const Zs=/;(?![^(]*\))/g,ei=/:([^]+)/,ti=/\/\*[^]*?\*\//g;function ni(e){const t={};return e.replace(ti,"").split(Zs).forEach(n=>{if(n){const r=n.split(ei);r.length>1&&(t[r[0].trim()]=r[1].trim())}}),t}function ie(e){let t="";if(le(e))t=e;else if(N(e))for(let n=0;n<e.length;n++){const r=ie(e[n]);r&&(t+=r+" ")}else if(oe(e))for(const n in e)e[n]&&(t+=n+" ");return t.trim()}const ri="itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly",oi=br(ri);function To(e){return!!e||e===""}const Do=e=>!!(e&&e.__v_isRef===!0),j=e=>le(e)?e:e==null?"":N(e)||oe(e)&&(e.toString===Ro||!q(e.toString))?Do(e)?j(e.value):JSON.stringify(e,Uo,2):String(e),Uo=(e,t)=>Do(t)?Uo(e,t.value):Ot(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((n,[r,o],s)=>(n[zn(r,s)+" =>"]=o,n),{})}:Eo(t)?{[`Set(${t.size})`]:[...t.values()].map(n=>zn(n))}:ht(t)?zn(t):oe(t)&&!N(t)&&!Io(t)?String(t):t,zn=(e,t="")=>{var n;return ht(e)?`Symbol(${(n=e.description)!=null?n:t})`:e};/**
* @vue/reactivity v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let Ce;class si{constructor(t=!1){this.detached=t,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this.parent=Ce,!t&&Ce&&(this.index=(Ce.scopes||(Ce.scopes=[])).push(this)-1)}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].pause();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let t,n;if(this.scopes)for(t=0,n=this.scopes.length;t<n;t++)this.scopes[t].resume();for(t=0,n=this.effects.length;t<n;t++)this.effects[t].resume()}}run(t){if(this._active){const n=Ce;try{return Ce=this,t()}finally{Ce=n}}}on(){++this._on===1&&(this.prevScope=Ce,Ce=this)}off(){this._on>0&&--this._on===0&&(Ce=this.prevScope,this.prevScope=void 0)}stop(t){if(this._active){this._active=!1;let n,r;for(n=0,r=this.effects.length;n<r;n++)this.effects[n].stop();for(this.effects.length=0,n=0,r=this.cleanups.length;n<r;n++)this.cleanups[n]();if(this.cleanups.length=0,this.scopes){for(n=0,r=this.scopes.length;n<r;n++)this.scopes[n].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!t){const o=this.parent.scopes.pop();o&&o!==this&&(this.parent.scopes[this.index]=o,o.index=this.index)}this.parent=void 0}}}function ii(){return Ce}let re;const Wn=new WeakSet;class Ho{constructor(t){this.fn=t,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,Ce&&Ce.active&&Ce.effects.push(this)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Wn.has(this)&&(Wn.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||Fo(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,Fr(this),Bo(this);const t=re,n=Ue;re=this,Ue=!0;try{return this.fn()}finally{Lo(this),re=t,Ue=n,this.flags&=-3}}stop(){if(this.flags&1){for(let t=this.deps;t;t=t.nextDep)Sr(t);this.deps=this.depsTail=void 0,Fr(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Wn.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){rr(this)&&this.run()}get dirty(){return rr(this)}}let Vo=0,Wt,Xt;function Fo(e,t=!1){if(e.flags|=8,t){e.next=Xt,Xt=e;return}e.next=Wt,Wt=e}function wr(){Vo++}function kr(){if(--Vo>0)return;if(Xt){let t=Xt;for(Xt=void 0;t;){const n=t.next;t.next=void 0,t.flags&=-9,t=n}}let e;for(;Wt;){let t=Wt;for(Wt=void 0;t;){const n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(r){e||(e=r)}t=n}}if(e)throw e}function Bo(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Lo(e){let t,n=e.depsTail,r=n;for(;r;){const o=r.prevDep;r.version===-1?(r===n&&(n=o),Sr(r),li(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=o}e.deps=t,e.depsTail=n}function rr(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Go(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Go(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===en)||(e.globalVersion=en,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!rr(e))))return;e.flags|=2;const t=e.dep,n=re,r=Ue;re=e,Ue=!0;try{Bo(e);const o=e.fn(e._value);(t.version===0||pt(o,e._value))&&(e.flags|=128,e._value=o,t.version++)}catch(o){throw t.version++,o}finally{re=n,Ue=r,Lo(e),e.flags&=-3}}function Sr(e,t=!1){const{dep:n,prevSub:r,nextSub:o}=e;if(r&&(r.nextSub=o,e.prevSub=void 0),o&&(o.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let s=n.computed.deps;s;s=s.nextDep)Sr(s,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function li(e){const{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}let Ue=!0;const $o=[];function nt(){$o.push(Ue),Ue=!1}function rt(){const e=$o.pop();Ue=e===void 0?!0:e}function Fr(e){const{cleanup:t}=e;if(e.cleanup=void 0,t){const n=re;re=void 0;try{t()}finally{re=n}}}let en=0;class ai{constructor(t,n){this.sub=t,this.dep=n,this.version=n.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}}class Cr{constructor(t){this.computed=t,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0}track(t){if(!re||!Ue||re===this.computed)return;let n=this.activeLink;if(n===void 0||n.sub!==re)n=this.activeLink=new ai(re,this),re.deps?(n.prevDep=re.depsTail,re.depsTail.nextDep=n,re.depsTail=n):re.deps=re.depsTail=n,No(n);else if(n.version===-1&&(n.version=this.version,n.nextDep)){const r=n.nextDep;r.prevDep=n.prevDep,n.prevDep&&(n.prevDep.nextDep=r),n.prevDep=re.depsTail,n.nextDep=void 0,re.depsTail.nextDep=n,re.depsTail=n,re.deps===n&&(re.deps=r)}return n}trigger(t){this.version++,en++,this.notify(t)}notify(t){wr();try{for(let n=this.subs;n;n=n.prevSub)n.sub.notify()&&n.sub.dep.notify()}finally{kr()}}}function No(e){if(e.dep.sc++,e.sub.flags&4){const t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let r=t.deps;r;r=r.nextDep)No(r)}const n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}const or=new WeakMap,wt=Symbol(""),sr=Symbol(""),tn=Symbol("");function ge(e,t,n){if(Ue&&re){let r=or.get(e);r||or.set(e,r=new Map);let o=r.get(n);o||(r.set(n,o=new Cr),o.map=r,o.key=n),o.track()}}function et(e,t,n,r,o,s){const i=or.get(e);if(!i){en++;return}const c=a=>{a&&a.trigger()};if(wr(),t==="clear")i.forEach(c);else{const a=N(e),g=a&&yr(n);if(a&&n==="length"){const l=Number(r);i.forEach((m,f)=>{(f==="length"||f===tn||!ht(f)&&f>=l)&&c(m)})}else switch((n!==void 0||i.has(void 0))&&c(i.get(n)),g&&c(i.get(tn)),t){case"add":a?g&&c(i.get("length")):(c(i.get(wt)),Ot(e)&&c(i.get(sr)));break;case"delete":a||(c(i.get(wt)),Ot(e)&&c(i.get(sr)));break;case"set":Ot(e)&&c(i.get(wt));break}}kr()}function Et(e){const t=K(e);return t===e?t:(ge(t,"iterate",tn),Oe(e)?t:t.map(pe))}function Tn(e){return ge(e=K(e),"iterate",tn),e}const ci={__proto__:null,[Symbol.iterator](){return Xn(this,Symbol.iterator,pe)},concat(...e){return Et(this).concat(...e.map(t=>N(t)?Et(t):t))},entries(){return Xn(this,"entries",e=>(e[1]=pe(e[1]),e))},every(e,t){return Qe(this,"every",e,t,void 0,arguments)},filter(e,t){return Qe(this,"filter",e,t,n=>n.map(pe),arguments)},find(e,t){return Qe(this,"find",e,t,pe,arguments)},findIndex(e,t){return Qe(this,"findIndex",e,t,void 0,arguments)},findLast(e,t){return Qe(this,"findLast",e,t,pe,arguments)},findLastIndex(e,t){return Qe(this,"findLastIndex",e,t,void 0,arguments)},forEach(e,t){return Qe(this,"forEach",e,t,void 0,arguments)},includes(...e){return Kn(this,"includes",e)},indexOf(...e){return Kn(this,"indexOf",e)},join(e){return Et(this).join(e)},lastIndexOf(...e){return Kn(this,"lastIndexOf",e)},map(e,t){return Qe(this,"map",e,t,void 0,arguments)},pop(){return Gt(this,"pop")},push(...e){return Gt(this,"push",e)},reduce(e,...t){return Br(this,"reduce",e,t)},reduceRight(e,...t){return Br(this,"reduceRight",e,t)},shift(){return Gt(this,"shift")},some(e,t){return Qe(this,"some",e,t,void 0,arguments)},splice(...e){return Gt(this,"splice",e)},toReversed(){return Et(this).toReversed()},toSorted(e){return Et(this).toSorted(e)},toSpliced(...e){return Et(this).toSpliced(...e)},unshift(...e){return Gt(this,"unshift",e)},values(){return Xn(this,"values",pe)}};function Xn(e,t,n){const r=Tn(e),o=r[t]();return r!==e&&!Oe(e)&&(o._next=o.next,o.next=()=>{const s=o._next();return s.value&&(s.value=n(s.value)),s}),o}const di=Array.prototype;function Qe(e,t,n,r,o,s){const i=Tn(e),c=i!==e&&!Oe(e),a=i[t];if(a!==di[t]){const m=a.apply(e,s);return c?pe(m):m}let g=n;i!==e&&(c?g=function(m,f){return n.call(this,pe(m),f,e)}:n.length>2&&(g=function(m,f){return n.call(this,m,f,e)}));const l=a.call(i,g,r);return c&&o?o(l):l}function Br(e,t,n,r){const o=Tn(e);let s=n;return o!==e&&(Oe(e)?n.length>3&&(s=function(i,c,a){return n.call(this,i,c,a,e)}):s=function(i,c,a){return n.call(this,i,pe(c),a,e)}),o[t](s,...r)}function Kn(e,t,n){const r=K(e);ge(r,"iterate",tn);const o=r[t](...n);return(o===-1||o===!1)&&Mr(n[0])?(n[0]=K(n[0]),r[t](...n)):o}function Gt(e,t,n=[]){nt(),wr();const r=K(e)[t].apply(e,n);return kr(),rt(),r}const ui=br("__proto__,__v_isRef,__isVue"),qo=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!=="arguments"&&e!=="caller").map(e=>Symbol[e]).filter(ht));function fi(e){ht(e)||(e=String(e));const t=K(this);return ge(t,"has",e),t.hasOwnProperty(e)}class jo{constructor(t=!1,n=!1){this._isReadonly=t,this._isShallow=n}get(t,n,r){if(n==="__v_skip")return t.__v_skip;const o=this._isReadonly,s=this._isShallow;if(n==="__v_isReactive")return!o;if(n==="__v_isReadonly")return o;if(n==="__v_isShallow")return s;if(n==="__v_raw")return r===(o?s?ki:Ko:s?Xo:Wo).get(t)||Object.getPrototypeOf(t)===Object.getPrototypeOf(r)?t:void 0;const i=N(t);if(!o){let a;if(i&&(a=ci[n]))return a;if(n==="hasOwnProperty")return fi}const c=Reflect.get(t,n,he(t)?t:r);return(ht(n)?qo.has(n):ui(n))||(o||ge(t,"get",n),s)?c:he(c)?i&&yr(n)?c:c.value:oe(c)?o?Qo(c):Dn(c):c}}class zo extends jo{constructor(t=!1){super(!1,t)}set(t,n,r,o){let s=t[n];if(!this._isShallow){const a=gt(s);if(!Oe(r)&&!gt(r)&&(s=K(s),r=K(r)),!N(t)&&he(s)&&!he(r))return a?!1:(s.value=r,!0)}const i=N(t)&&yr(n)?Number(n)<t.length:Y(t,n),c=Reflect.set(t,n,r,he(t)?t:o);return t===K(o)&&(i?pt(r,s)&&et(t,"set",n,r):et(t,"add",n,r)),c}deleteProperty(t,n){const r=Y(t,n);t[n];const o=Reflect.deleteProperty(t,n);return o&&r&&et(t,"delete",n,void 0),o}has(t,n){const r=Reflect.has(t,n);return(!ht(n)||!qo.has(n))&&ge(t,"has",n),r}ownKeys(t){return ge(t,"iterate",N(t)?"length":wt),Reflect.ownKeys(t)}}class pi extends jo{constructor(t=!1){super(!0,t)}set(t,n){return!0}deleteProperty(t,n){return!0}}const gi=new zo,mi=new pi,hi=new zo(!0);const ir=e=>e,un=e=>Reflect.getPrototypeOf(e);function bi(e,t,n){return function(...r){const o=this.__v_raw,s=K(o),i=Ot(s),c=e==="entries"||e===Symbol.iterator&&i,a=e==="keys"&&i,g=o[e](...r),l=n?ir:t?vn:pe;return!t&&ge(s,"iterate",a?sr:wt),{next(){const{value:m,done:f}=g.next();return f?{value:m,done:f}:{value:c?[l(m[0]),l(m[1])]:l(m),done:f}},[Symbol.iterator](){return this}}}}function fn(e){return function(...t){return e==="delete"?!1:e==="clear"?void 0:this}}function xi(e,t){const n={get(o){const s=this.__v_raw,i=K(s),c=K(o);e||(pt(o,c)&&ge(i,"get",o),ge(i,"get",c));const{has:a}=un(i),g=t?ir:e?vn:pe;if(a.call(i,o))return g(s.get(o));if(a.call(i,c))return g(s.get(c));s!==i&&s.get(o)},get size(){const o=this.__v_raw;return!e&&ge(K(o),"iterate",wt),Reflect.get(o,"size",o)},has(o){const s=this.__v_raw,i=K(s),c=K(o);return e||(pt(o,c)&&ge(i,"has",o),ge(i,"has",c)),o===c?s.has(o):s.has(o)||s.has(c)},forEach(o,s){const i=this,c=i.__v_raw,a=K(c),g=t?ir:e?vn:pe;return!e&&ge(a,"iterate",wt),c.forEach((l,m)=>o.call(s,g(l),g(m),i))}};return be(n,e?{add:fn("add"),set:fn("set"),delete:fn("delete"),clear:fn("clear")}:{add(o){!t&&!Oe(o)&&!gt(o)&&(o=K(o));const s=K(this);return un(s).has.call(s,o)||(s.add(o),et(s,"add",o,o)),this},set(o,s){!t&&!Oe(s)&&!gt(s)&&(s=K(s));const i=K(this),{has:c,get:a}=un(i);let g=c.call(i,o);g||(o=K(o),g=c.call(i,o));const l=a.call(i,o);return i.set(o,s),g?pt(s,l)&&et(i,"set",o,s):et(i,"add",o,s),this},delete(o){const s=K(this),{has:i,get:c}=un(s);let a=i.call(s,o);a||(o=K(o),a=i.call(s,o)),c&&c.call(s,o);const g=s.delete(o);return a&&et(s,"delete",o,void 0),g},clear(){const o=K(this),s=o.size!==0,i=o.clear();return s&&et(o,"clear",void 0,void 0),i}}),["keys","values","entries",Symbol.iterator].forEach(o=>{n[o]=bi(o,e,t)}),n}function _r(e,t){const n=xi(e,t);return(r,o,s)=>o==="__v_isReactive"?!e:o==="__v_isReadonly"?e:o==="__v_raw"?r:Reflect.get(Y(n,o)&&o in r?n:r,o,s)}const vi={get:_r(!1,!1)},yi={get:_r(!1,!0)},wi={get:_r(!0,!1)};const Wo=new WeakMap,Xo=new WeakMap,Ko=new WeakMap,ki=new WeakMap;function Si(e){switch(e){case"Object":case"Array":return 1;case"Map":case"Set":case"WeakMap":case"WeakSet":return 2;default:return 0}}function Ci(e){return e.__v_skip||!Object.isExtensible(e)?0:Si(Ks(e))}function Dn(e){return gt(e)?e:Pr(e,!1,gi,vi,Wo)}function Yo(e){return Pr(e,!1,hi,yi,Xo)}function Qo(e){return Pr(e,!0,mi,wi,Ko)}function Pr(e,t,n,r,o){if(!oe(e)||e.__v_raw&&!(t&&e.__v_isReactive))return e;const s=Ci(e);if(s===0)return e;const i=o.get(e);if(i)return i;const c=new Proxy(e,s===2?r:n);return o.set(e,c),c}function Tt(e){return gt(e)?Tt(e.__v_raw):!!(e&&e.__v_isReactive)}function gt(e){return!!(e&&e.__v_isReadonly)}function Oe(e){return!!(e&&e.__v_isShallow)}function Mr(e){return e?!!e.__v_raw:!1}function K(e){const t=e&&e.__v_raw;return t?K(t):e}function _i(e){return!Y(e,"__v_skip")&&Object.isExtensible(e)&&Oo(e,"__v_skip",!0),e}const pe=e=>oe(e)?Dn(e):e,vn=e=>oe(e)?Qo(e):e;function he(e){return e?e.__v_isRef===!0:!1}function Un(e){return Jo(e,!1)}function Pi(e){return Jo(e,!0)}function Jo(e,t){return he(e)?e:new Mi(e,t)}class Mi{constructor(t,n){this.dep=new Cr,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=n?t:K(t),this._value=n?t:pe(t),this.__v_isShallow=n}get value(){return this.dep.track(),this._value}set value(t){const n=this._rawValue,r=this.__v_isShallow||Oe(t)||gt(t);t=r?t:K(t),pt(t,n)&&(this._rawValue=t,this._value=r?t:pe(t),this.dep.trigger())}}function S(e){return he(e)?e.value:e}const Ei={get:(e,t,n)=>t==="__v_raw"?e:S(Reflect.get(e,t,n)),set:(e,t,n,r)=>{const o=e[t];return he(o)&&!he(n)?(o.value=n,!0):Reflect.set(e,t,n,r)}};function Zo(e){return Tt(e)?e:new Proxy(e,Ei)}class Ai{constructor(t,n,r){this.fn=t,this.setter=n,this._value=void 0,this.dep=new Cr(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=en-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!n,this.isSSR=r}notify(){if(this.flags|=16,!(this.flags&8)&&re!==this)return Fo(this,!0),!0}get value(){const t=this.dep.track();return Go(this),t&&(t.version=this.dep.version),this._value}set value(t){this.setter&&this.setter(t)}}function Ri(e,t,n=!1){let r,o;return q(e)?r=e:(r=e.get,o=e.set),new Ai(r,o,n)}const pn={},yn=new WeakMap;let yt;function Ii(e,t=!1,n=yt){if(n){let r=yn.get(n);r||yn.set(n,r=[]),r.push(e)}}function Oi(e,t,n=te){const{immediate:r,deep:o,once:s,scheduler:i,augmentJob:c,call:a}=n,g=T=>o?T:Oe(T)||o===!1||o===0?tt(T,1):tt(T);let l,m,f,h,R=!1,C=!1;if(he(e)?(m=()=>e.value,R=Oe(e)):Tt(e)?(m=()=>g(e),R=!0):N(e)?(C=!0,R=e.some(T=>Tt(T)||Oe(T)),m=()=>e.map(T=>{if(he(T))return T.value;if(Tt(T))return g(T);if(q(T))return a?a(T,2):T()})):q(e)?t?m=a?()=>a(e,2):e:m=()=>{if(f){nt();try{f()}finally{rt()}}const T=yt;yt=l;try{return a?a(e,3,[h]):e(h)}finally{yt=T}}:m=Xe,t&&o){const T=m,Z=o===!0?1/0:o;m=()=>tt(T(),Z)}const I=ii(),F=()=>{l.stop(),I&&I.active&&vr(I.effects,l)};if(s&&t){const T=t;t=(...Z)=>{T(...Z),F()}}let U=C?new Array(e.length).fill(pn):pn;const B=T=>{if(!(!(l.flags&1)||!l.dirty&&!T))if(t){const Z=l.run();if(o||R||(C?Z.some((de,se)=>pt(de,U[se])):pt(Z,U))){f&&f();const de=yt;yt=l;try{const se=[Z,U===pn?void 0:C&&U[0]===pn?[]:U,h];U=Z,a?a(t,3,se):t(...se)}finally{yt=de}}}else l.run()};return c&&c(B),l=new Ho(m),l.scheduler=i?()=>i(B,!1):B,h=T=>Ii(T,!1,l),f=l.onStop=()=>{const T=yn.get(l);if(T){if(a)a(T,4);else for(const Z of T)Z();yn.delete(l)}},t?r?B(!0):U=l.run():i?i(B.bind(null,!0),!0):l.run(),F.pause=l.pause.bind(l),F.resume=l.resume.bind(l),F.stop=F,F}function tt(e,t=1/0,n){if(t<=0||!oe(e)||e.__v_skip||(n=n||new Set,n.has(e)))return e;if(n.add(e),t--,he(e))tt(e.value,t,n);else if(N(e))for(let r=0;r<e.length;r++)tt(e[r],t,n);else if(Eo(e)||Ot(e))e.forEach(r=>{tt(r,t,n)});else if(Io(e)){for(const r in e)tt(e[r],t,n);for(const r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&tt(e[r],t,n)}return e}/**
* @vue/runtime-core v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/function an(e,t,n,r){try{return r?e(...r):e()}catch(o){Hn(o,t,n)}}function Ke(e,t,n,r){if(q(e)){const o=an(e,t,n,r);return o&&Ao(o)&&o.catch(s=>{Hn(s,t,n)}),o}if(N(e)){const o=[];for(let s=0;s<e.length;s++)o.push(Ke(e[s],t,n,r));return o}}function Hn(e,t,n,r=!0){const o=t?t.vnode:null,{errorHandler:s,throwUnhandledErrorInProduction:i}=t&&t.appContext.config||te;if(t){let c=t.parent;const a=t.proxy,g=`https://vuejs.org/error-reference/#runtime-${n}`;for(;c;){const l=c.ec;if(l){for(let m=0;m<l.length;m++)if(l[m](e,a,g)===!1)return}c=c.parent}if(s){nt(),an(s,null,10,[e,a,g]),rt();return}}Ti(e,n,o,r,i)}function Ti(e,t,n,r=!0,o=!1){if(o)throw e;console.error(e)}const ve=[];let ze=-1;const Dt=[];let dt=null,At=0;const es=Promise.resolve();let wn=null;function ts(e){const t=wn||es;return e?t.then(this?e.bind(this):e):t}function Di(e){let t=ze+1,n=ve.length;for(;t<n;){const r=t+n>>>1,o=ve[r],s=nn(o);s<e||s===e&&o.flags&2?t=r+1:n=r}return t}function Er(e){if(!(e.flags&1)){const t=nn(e),n=ve[ve.length-1];!n||!(e.flags&2)&&t>=nn(n)?ve.push(e):ve.splice(Di(t),0,e),e.flags|=1,ns()}}function ns(){wn||(wn=es.then(os))}function Ui(e){N(e)?Dt.push(...e):dt&&e.id===-1?dt.splice(At+1,0,e):e.flags&1||(Dt.push(e),e.flags|=1),ns()}function Lr(e,t,n=ze+1){for(;n<ve.length;n++){const r=ve[n];if(r&&r.flags&2){if(e&&r.id!==e.uid)continue;ve.splice(n,1),n--,r.flags&4&&(r.flags&=-2),r(),r.flags&4||(r.flags&=-2)}}}function rs(e){if(Dt.length){const t=[...new Set(Dt)].sort((n,r)=>nn(n)-nn(r));if(Dt.length=0,dt){dt.push(...t);return}for(dt=t,At=0;At<dt.length;At++){const n=dt[At];n.flags&4&&(n.flags&=-2),n.flags&8||n(),n.flags&=-2}dt=null,At=0}}const nn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function os(e){try{for(ze=0;ze<ve.length;ze++){const t=ve[ze];t&&!(t.flags&8)&&(t.flags&4&&(t.flags&=-2),an(t,t.i,t.i?15:14),t.flags&4||(t.flags&=-2))}}finally{for(;ze<ve.length;ze++){const t=ve[ze];t&&(t.flags&=-2)}ze=-1,ve.length=0,rs(),wn=null,(ve.length||Dt.length)&&os()}}let Ee=null,ss=null;function kn(e){const t=Ee;return Ee=e,ss=e&&e.type.__scopeId||null,t}function Hi(e,t=Ee,n){if(!t||e._n)return e;const r=(...o)=>{r._d&&Yr(-1);const s=kn(t);let i;try{i=e(...o)}finally{kn(s),r._d&&Yr(1)}return i};return r._n=!0,r._c=!0,r._d=!0,r}function ue(e,t){if(Ee===null)return e;const n=Ln(Ee),r=e.dirs||(e.dirs=[]);for(let o=0;o<t.length;o++){let[s,i,c,a=te]=t[o];s&&(q(s)&&(s={mounted:s,updated:s}),s.deep&&tt(i),r.push({dir:s,instance:n,value:i,oldValue:void 0,arg:c,modifiers:a}))}return e}function xt(e,t,n,r){const o=e.dirs,s=t&&t.dirs;for(let i=0;i<o.length;i++){const c=o[i];s&&(c.oldValue=s[i].value);let a=c.dir[r];a&&(nt(),Ke(a,n,8,[e.el,c,e,t]),rt())}}const Vi=Symbol("_vte"),Fi=e=>e.__isTeleport;function Ar(e,t){e.shapeFlag&6&&e.component?(e.transition=t,Ar(e.component.subTree,t)):e.shapeFlag&128?(e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback)):e.transition=t}/*! #__NO_SIDE_EFFECTS__ */function Ct(e,t){return q(e)?be({name:e.name},t,{setup:e}):e}function is(e){e.ids=[e.ids[0]+e.ids[2]+++"-",0,0]}function Sn(e,t,n,r,o=!1){if(N(e)){e.forEach((R,C)=>Sn(R,t&&(N(t)?t[C]:t),n,r,o));return}if(Kt(r)&&!o){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&Sn(e,t,n,r.component.subTree);return}const s=r.shapeFlag&4?Ln(r.component):r.el,i=o?null:s,{i:c,r:a}=e,g=t&&t.r,l=c.refs===te?c.refs={}:c.refs,m=c.setupState,f=K(m),h=m===te?()=>!1:R=>Y(f,R);if(g!=null&&g!==a&&(le(g)?(l[g]=null,h(g)&&(m[g]=null)):he(g)&&(g.value=null)),q(a))an(a,c,12,[i,l]);else{const R=le(a),C=he(a);if(R||C){const I=()=>{if(e.f){const F=R?h(a)?m[a]:l[a]:a.value;o?N(F)&&vr(F,s):N(F)?F.includes(s)||F.push(s):R?(l[a]=[s],h(a)&&(m[a]=l[a])):(a.value=[s],e.k&&(l[e.k]=a.value))}else R?(l[a]=i,h(a)&&(m[a]=i)):C&&(a.value=i,e.k&&(l[e.k]=i))};i?(I.id=-1,Me(I,n)):I()}}}On().requestIdleCallback;On().cancelIdleCallback;const Kt=e=>!!e.type.__asyncLoader,ls=e=>e.type.__isKeepAlive;function Bi(e,t){as(e,"a",t)}function Li(e,t){as(e,"da",t)}function as(e,t,n=me){const r=e.__wdc||(e.__wdc=()=>{let o=n;for(;o;){if(o.isDeactivated)return;o=o.parent}return e()});if(Vn(t,r,n),n){let o=n.parent;for(;o&&o.parent;)ls(o.parent.vnode)&&Gi(r,t,n,o),o=o.parent}}function Gi(e,t,n,r){const o=Vn(t,e,r,!0);cs(()=>{vr(r[t],o)},n)}function Vn(e,t,n=me,r=!1){if(n){const o=n[e]||(n[e]=[]),s=t.__weh||(t.__weh=(...i)=>{nt();const c=cn(n),a=Ke(t,n,e,i);return c(),rt(),a});return r?o.unshift(s):o.push(s),s}}const ot=e=>(t,n=me)=>{(!on||e==="sp")&&Vn(e,(...r)=>t(...r),n)},$i=ot("bm"),Ni=ot("m"),qi=ot("bu"),ji=ot("u"),zi=ot("bum"),cs=ot("um"),Wi=ot("sp"),Xi=ot("rtg"),Ki=ot("rtc");function Yi(e,t=me){Vn("ec",e,t)}const Qi="components";function Ji(e,t){return el(Qi,e,!0,t)||e}const Zi=Symbol.for("v-ndc");function el(e,t,n=!0,r=!1){const o=Ee||me;if(o){const s=o.type;{const c=$l(s,!1);if(c&&(c===t||c===Te(t)||c===In(Te(t))))return s}const i=Gr(o[e]||s[e],t)||Gr(o.appContext[e],t);return!i&&r?s:i}}function Gr(e,t){return e&&(e[t]||e[Te(t)]||e[In(Te(t))])}function lr(e,t,n,r){let o;const s=n,i=N(e);if(i||le(e)){const c=i&&Tt(e);let a=!1,g=!1;c&&(a=!Oe(e),g=gt(e),e=Tn(e)),o=new Array(e.length);for(let l=0,m=e.length;l<m;l++)o[l]=t(a?g?vn(pe(e[l])):pe(e[l]):e[l],l,void 0,s)}else if(typeof e=="number"){o=new Array(e);for(let c=0;c<e;c++)o[c]=t(c+1,c,void 0,s)}else if(oe(e))if(e[Symbol.iterator])o=Array.from(e,(c,a)=>t(c,a,void 0,s));else{const c=Object.keys(e);o=new Array(c.length);for(let a=0,g=c.length;a<g;a++){const l=c[a];o[a]=t(e[l],l,a,s)}}else o=[];return o}const ar=e=>e?As(e)?Ln(e):ar(e.parent):null,Yt=be(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>ar(e.parent),$root:e=>ar(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>us(e),$forceUpdate:e=>e.f||(e.f=()=>{Er(e.update)}),$nextTick:e=>e.n||(e.n=ts.bind(e.proxy)),$watch:e=>wl.bind(e)}),Yn=(e,t)=>e!==te&&!e.__isScriptSetup&&Y(e,t),tl={get({_:e},t){if(t==="__v_skip")return!0;const{ctx:n,setupState:r,data:o,props:s,accessCache:i,type:c,appContext:a}=e;let g;if(t[0]!=="$"){const h=i[t];if(h!==void 0)switch(h){case 1:return r[t];case 2:return o[t];case 4:return n[t];case 3:return s[t]}else{if(Yn(r,t))return i[t]=1,r[t];if(o!==te&&Y(o,t))return i[t]=2,o[t];if((g=e.propsOptions[0])&&Y(g,t))return i[t]=3,s[t];if(n!==te&&Y(n,t))return i[t]=4,n[t];cr&&(i[t]=0)}}const l=Yt[t];let m,f;if(l)return t==="$attrs"&&ge(e.attrs,"get",""),l(e);if((m=c.__cssModules)&&(m=m[t]))return m;if(n!==te&&Y(n,t))return i[t]=4,n[t];if(f=a.config.globalProperties,Y(f,t))return f[t]},set({_:e},t,n){const{data:r,setupState:o,ctx:s}=e;return Yn(o,t)?(o[t]=n,!0):r!==te&&Y(r,t)?(r[t]=n,!0):Y(e.props,t)||t[0]==="$"&&t.slice(1)in e?!1:(s[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:o,propsOptions:s}},i){let c;return!!n[i]||e!==te&&Y(e,i)||Yn(t,i)||(c=s[0])&&Y(c,i)||Y(r,i)||Y(Yt,i)||Y(o.config.globalProperties,i)},defineProperty(e,t,n){return n.get!=null?e._.accessCache[t]=0:Y(n,"value")&&this.set(e,t,n.value,null),Reflect.defineProperty(e,t,n)}};function $r(e){return N(e)?e.reduce((t,n)=>(t[n]=null,t),{}):e}let cr=!0;function nl(e){const t=us(e),n=e.proxy,r=e.ctx;cr=!1,t.beforeCreate&&Nr(t.beforeCreate,e,"bc");const{data:o,computed:s,methods:i,watch:c,provide:a,inject:g,created:l,beforeMount:m,mounted:f,beforeUpdate:h,updated:R,activated:C,deactivated:I,beforeDestroy:F,beforeUnmount:U,destroyed:B,unmounted:T,render:Z,renderTracked:de,renderTriggered:se,errorCaptured:Fe,serverPrefetch:st,expose:Be,inheritAttrs:it,components:bt,directives:Le,filters:Bt}=t;if(g&&rl(g,r,null),i)for(const J in i){const W=i[J];q(W)&&(r[J]=W.bind(n))}if(o){const J=o.call(n,n);oe(J)&&(e.data=Dn(J))}if(cr=!0,s)for(const J in s){const W=s[J],Ye=q(W)?W.bind(n,n):q(W.get)?W.get.bind(n,n):Xe,lt=!q(W)&&q(W.set)?W.set.bind(n):Xe,Ge=De({get:Ye,set:lt});Object.defineProperty(r,J,{enumerable:!0,configurable:!0,get:()=>Ge.value,set:ke=>Ge.value=ke})}if(c)for(const J in c)ds(c[J],r,n,J);if(a){const J=q(a)?a.call(n):a;Reflect.ownKeys(J).forEach(W=>{gn(W,J[W])})}l&&Nr(l,e,"c");function ae(J,W){N(W)?W.forEach(Ye=>J(Ye.bind(n))):W&&J(W.bind(n))}if(ae($i,m),ae(Ni,f),ae(qi,h),ae(ji,R),ae(Bi,C),ae(Li,I),ae(Yi,Fe),ae(Ki,de),ae(Xi,se),ae(zi,U),ae(cs,T),ae(Wi,st),N(Be))if(Be.length){const J=e.exposed||(e.exposed={});Be.forEach(W=>{Object.defineProperty(J,W,{get:()=>n[W],set:Ye=>n[W]=Ye})})}else e.exposed||(e.exposed={});Z&&e.render===Xe&&(e.render=Z),it!=null&&(e.inheritAttrs=it),bt&&(e.components=bt),Le&&(e.directives=Le),st&&is(e)}function rl(e,t,n=Xe){N(e)&&(e=dr(e));for(const r in e){const o=e[r];let s;oe(o)?"default"in o?s=He(o.from||r,o.default,!0):s=He(o.from||r):s=He(o),he(s)?Object.defineProperty(t,r,{enumerable:!0,configurable:!0,get:()=>s.value,set:i=>s.value=i}):t[r]=s}}function Nr(e,t,n){Ke(N(e)?e.map(r=>r.bind(t.proxy)):e.bind(t.proxy),t,n)}function ds(e,t,n,r){let o=r.includes(".")?Cs(n,r):()=>n[r];if(le(e)){const s=t[e];q(s)&&mn(o,s)}else if(q(e))mn(o,e.bind(n));else if(oe(e))if(N(e))e.forEach(s=>ds(s,t,n,r));else{const s=q(e.handler)?e.handler.bind(n):t[e.handler];q(s)&&mn(o,s,e)}}function us(e){const t=e.type,{mixins:n,extends:r}=t,{mixins:o,optionsCache:s,config:{optionMergeStrategies:i}}=e.appContext,c=s.get(t);let a;return c?a=c:!o.length&&!n&&!r?a=t:(a={},o.length&&o.forEach(g=>Cn(a,g,i,!0)),Cn(a,t,i)),oe(t)&&s.set(t,a),a}function Cn(e,t,n,r=!1){const{mixins:o,extends:s}=t;s&&Cn(e,s,n,!0),o&&o.forEach(i=>Cn(e,i,n,!0));for(const i in t)if(!(r&&i==="expose")){const c=ol[i]||n&&n[i];e[i]=c?c(e[i],t[i]):t[i]}return e}const ol={data:qr,props:jr,emits:jr,methods:jt,computed:jt,beforeCreate:xe,created:xe,beforeMount:xe,mounted:xe,beforeUpdate:xe,updated:xe,beforeDestroy:xe,beforeUnmount:xe,destroyed:xe,unmounted:xe,activated:xe,deactivated:xe,errorCaptured:xe,serverPrefetch:xe,components:jt,directives:jt,watch:il,provide:qr,inject:sl};function qr(e,t){return t?e?function(){return be(q(e)?e.call(this,this):e,q(t)?t.call(this,this):t)}:t:e}function sl(e,t){return jt(dr(e),dr(t))}function dr(e){if(N(e)){const t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function xe(e,t){return e?[...new Set([].concat(e,t))]:t}function jt(e,t){return e?be(Object.create(null),e,t):t}function jr(e,t){return e?N(e)&&N(t)?[...new Set([...e,...t])]:be(Object.create(null),$r(e),$r(t??{})):t}function il(e,t){if(!e)return t;if(!t)return e;const n=be(Object.create(null),e);for(const r in t)n[r]=xe(e[r],t[r]);return n}function fs(){return{app:null,config:{isNativeTag:Ws,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}let ll=0;function al(e,t){return function(r,o=null){q(r)||(r=be({},r)),o!=null&&!oe(o)&&(o=null);const s=fs(),i=new WeakSet,c=[];let a=!1;const g=s.app={_uid:ll++,_component:r,_props:o,_container:null,_context:s,_instance:null,version:ql,get config(){return s.config},set config(l){},use(l,...m){return i.has(l)||(l&&q(l.install)?(i.add(l),l.install(g,...m)):q(l)&&(i.add(l),l(g,...m))),g},mixin(l){return s.mixins.includes(l)||s.mixins.push(l),g},component(l,m){return m?(s.components[l]=m,g):s.components[l]},directive(l,m){return m?(s.directives[l]=m,g):s.directives[l]},mount(l,m,f){if(!a){const h=g._ceVNode||ye(r,o);return h.appContext=s,f===!0?f="svg":f===!1&&(f=void 0),e(h,l,f),a=!0,g._container=l,l.__vue_app__=g,Ln(h.component)}},onUnmount(l){c.push(l)},unmount(){a&&(Ke(c,g._instance,16),e(null,g._container),delete g._container.__vue_app__)},provide(l,m){return s.provides[l]=m,g},runWithContext(l){const m=Ut;Ut=g;try{return l()}finally{Ut=m}}};return g}}let Ut=null;function gn(e,t){if(me){let n=me.provides;const r=me.parent&&me.parent.provides;r===n&&(n=me.provides=Object.create(r)),n[e]=t}}function He(e,t,n=!1){const r=me||Ee;if(r||Ut){let o=Ut?Ut._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(o&&e in o)return o[e];if(arguments.length>1)return n&&q(t)?t.call(r&&r.proxy):t}}const ps={},gs=()=>Object.create(ps),ms=e=>Object.getPrototypeOf(e)===ps;function cl(e,t,n,r=!1){const o={},s=gs();e.propsDefaults=Object.create(null),hs(e,t,o,s);for(const i in e.propsOptions[0])i in o||(o[i]=void 0);n?e.props=r?o:Yo(o):e.type.props?e.props=o:e.props=s,e.attrs=s}function dl(e,t,n,r){const{props:o,attrs:s,vnode:{patchFlag:i}}=e,c=K(o),[a]=e.propsOptions;let g=!1;if((r||i>0)&&!(i&16)){if(i&8){const l=e.vnode.dynamicProps;for(let m=0;m<l.length;m++){let f=l[m];if(Fn(e.emitsOptions,f))continue;const h=t[f];if(a)if(Y(s,f))h!==s[f]&&(s[f]=h,g=!0);else{const R=Te(f);o[R]=ur(a,c,R,h,e,!1)}else h!==s[f]&&(s[f]=h,g=!0)}}}else{hs(e,t,o,s)&&(g=!0);let l;for(const m in c)(!t||!Y(t,m)&&((l=kt(m))===m||!Y(t,l)))&&(a?n&&(n[m]!==void 0||n[l]!==void 0)&&(o[m]=ur(a,c,m,void 0,e,!0)):delete o[m]);if(s!==c)for(const m in s)(!t||!Y(t,m))&&(delete s[m],g=!0)}g&&et(e.attrs,"set","")}function hs(e,t,n,r){const[o,s]=e.propsOptions;let i=!1,c;if(t)for(let a in t){if(zt(a))continue;const g=t[a];let l;o&&Y(o,l=Te(a))?!s||!s.includes(l)?n[l]=g:(c||(c={}))[l]=g:Fn(e.emitsOptions,a)||(!(a in r)||g!==r[a])&&(r[a]=g,i=!0)}if(s){const a=K(n),g=c||te;for(let l=0;l<s.length;l++){const m=s[l];n[m]=ur(o,a,m,g[m],e,!Y(g,m))}}return i}function ur(e,t,n,r,o,s){const i=e[n];if(i!=null){const c=Y(i,"default");if(c&&r===void 0){const a=i.default;if(i.type!==Function&&!i.skipFactory&&q(a)){const{propsDefaults:g}=o;if(n in g)r=g[n];else{const l=cn(o);r=g[n]=a.call(null,t),l()}}else r=a;o.ce&&o.ce._setProp(n,r)}i[0]&&(s&&!c?r=!1:i[1]&&(r===""||r===kt(n))&&(r=!0))}return r}const ul=new WeakMap;function bs(e,t,n=!1){const r=n?ul:t.propsCache,o=r.get(e);if(o)return o;const s=e.props,i={},c=[];let a=!1;if(!q(e)){const l=m=>{a=!0;const[f,h]=bs(m,t,!0);be(i,f),h&&c.push(...h)};!n&&t.mixins.length&&t.mixins.forEach(l),e.extends&&l(e.extends),e.mixins&&e.mixins.forEach(l)}if(!s&&!a)return oe(e)&&r.set(e,It),It;if(N(s))for(let l=0;l<s.length;l++){const m=Te(s[l]);zr(m)&&(i[m]=te)}else if(s)for(const l in s){const m=Te(l);if(zr(m)){const f=s[l],h=i[m]=N(f)||q(f)?{type:f}:be({},f),R=h.type;let C=!1,I=!0;if(N(R))for(let F=0;F<R.length;++F){const U=R[F],B=q(U)&&U.name;if(B==="Boolean"){C=!0;break}else B==="String"&&(I=!1)}else C=q(R)&&R.name==="Boolean";h[0]=C,h[1]=I,(C||Y(h,"default"))&&c.push(m)}}const g=[i,c];return oe(e)&&r.set(e,g),g}function zr(e){return e[0]!=="$"&&!zt(e)}const Rr=e=>e[0]==="_"||e==="$stable",Ir=e=>N(e)?e.map(We):[We(e)],fl=(e,t,n)=>{if(t._n)return t;const r=Hi((...o)=>Ir(t(...o)),n);return r._c=!1,r},xs=(e,t,n)=>{const r=e._ctx;for(const o in e){if(Rr(o))continue;const s=e[o];if(q(s))t[o]=fl(o,s,r);else if(s!=null){const i=Ir(s);t[o]=()=>i}}},vs=(e,t)=>{const n=Ir(t);e.slots.default=()=>n},ys=(e,t,n)=>{for(const r in t)(n||!Rr(r))&&(e[r]=t[r])},pl=(e,t,n)=>{const r=e.slots=gs();if(e.vnode.shapeFlag&32){const o=t._;o?(ys(r,t,n),n&&Oo(r,"_",o,!0)):xs(t,r)}else t&&vs(e,t)},gl=(e,t,n)=>{const{vnode:r,slots:o}=e;let s=!0,i=te;if(r.shapeFlag&32){const c=t._;c?n&&c===1?s=!1:ys(o,t,n):(s=!t.$stable,xs(t,o)),i=t}else t&&(vs(e,t),i={default:1});if(s)for(const c in o)!Rr(c)&&i[c]==null&&delete o[c]},Me=El;function ml(e){return hl(e)}function hl(e,t){const n=On();n.__VUE__=!0;const{insert:r,remove:o,patchProp:s,createElement:i,createText:c,createComment:a,setText:g,setElementText:l,parentNode:m,nextSibling:f,setScopeId:h=Xe,insertStaticContent:R}=e,C=(d,u,b,x=null,w=null,y=null,M=void 0,P=null,_=!!u.dynamicChildren)=>{if(d===u)return;d&&!$t(d,u)&&(x=v(d),ke(d,w,y,!0),d=null),u.patchFlag===-2&&(_=!1,u.dynamicChildren=null);const{type:k,ref:V,shapeFlag:A}=u;switch(k){case Bn:I(d,u,b,x);break;case mt:F(d,u,b,x);break;case hn:d==null&&U(u,b,x,M);break;case Ie:bt(d,u,b,x,w,y,M,P,_);break;default:A&1?Z(d,u,b,x,w,y,M,P,_):A&6?Le(d,u,b,x,w,y,M,P,_):(A&64||A&128)&&k.process(d,u,b,x,w,y,M,P,_,D)}V!=null&&w&&Sn(V,d&&d.ref,y,u||d,!u)},I=(d,u,b,x)=>{if(d==null)r(u.el=c(u.children),b,x);else{const w=u.el=d.el;u.children!==d.children&&g(w,u.children)}},F=(d,u,b,x)=>{d==null?r(u.el=a(u.children||""),b,x):u.el=d.el},U=(d,u,b,x)=>{[d.el,d.anchor]=R(d.children,u,b,x,d.el,d.anchor)},B=({el:d,anchor:u},b,x)=>{let w;for(;d&&d!==u;)w=f(d),r(d,b,x),d=w;r(u,b,x)},T=({el:d,anchor:u})=>{let b;for(;d&&d!==u;)b=f(d),o(d),d=b;o(u)},Z=(d,u,b,x,w,y,M,P,_)=>{u.type==="svg"?M="svg":u.type==="math"&&(M="mathml"),d==null?de(u,b,x,w,y,M,P,_):st(d,u,w,y,M,P,_)},de=(d,u,b,x,w,y,M,P)=>{let _,k;const{props:V,shapeFlag:A,transition:H,dirs:G}=d;if(_=d.el=i(d.type,y,V&&V.is,V),A&8?l(_,d.children):A&16&&Fe(d.children,_,null,x,w,Qn(d,y),M,P),G&&xt(d,null,x,"created"),se(_,d,d.scopeId,M,x),V){for(const ne in V)ne!=="value"&&!zt(ne)&&s(_,ne,null,V[ne],y,x);"value"in V&&s(_,"value",null,V.value,y),(k=V.onVnodeBeforeMount)&&je(k,x,d)}G&&xt(d,null,x,"beforeMount");const z=bl(w,H);z&&H.beforeEnter(_),r(_,u,b),((k=V&&V.onVnodeMounted)||z||G)&&Me(()=>{k&&je(k,x,d),z&&H.enter(_),G&&xt(d,null,x,"mounted")},w)},se=(d,u,b,x,w)=>{if(b&&h(d,b),x)for(let y=0;y<x.length;y++)h(d,x[y]);if(w){let y=w.subTree;if(u===y||Ps(y.type)&&(y.ssContent===u||y.ssFallback===u)){const M=w.vnode;se(d,M,M.scopeId,M.slotScopeIds,w.parent)}}},Fe=(d,u,b,x,w,y,M,P,_=0)=>{for(let k=_;k<d.length;k++){const V=d[k]=P?ut(d[k]):We(d[k]);C(null,V,u,b,x,w,y,M,P)}},st=(d,u,b,x,w,y,M)=>{const P=u.el=d.el;let{patchFlag:_,dynamicChildren:k,dirs:V}=u;_|=d.patchFlag&16;const A=d.props||te,H=u.props||te;let G;if(b&&vt(b,!1),(G=H.onVnodeBeforeUpdate)&&je(G,b,u,d),V&&xt(u,d,b,"beforeUpdate"),b&&vt(b,!0),(A.innerHTML&&H.innerHTML==null||A.textContent&&H.textContent==null)&&l(P,""),k?Be(d.dynamicChildren,k,P,b,x,Qn(u,w),y):M||W(d,u,P,null,b,x,Qn(u,w),y,!1),_>0){if(_&16)it(P,A,H,b,w);else if(_&2&&A.class!==H.class&&s(P,"class",null,H.class,w),_&4&&s(P,"style",A.style,H.style,w),_&8){const z=u.dynamicProps;for(let ne=0;ne<z.length;ne++){const Q=z[ne],_e=A[Q],Se=H[Q];(Se!==_e||Q==="value")&&s(P,Q,_e,Se,w,b)}}_&1&&d.children!==u.children&&l(P,u.children)}else!M&&k==null&&it(P,A,H,b,w);((G=H.onVnodeUpdated)||V)&&Me(()=>{G&&je(G,b,u,d),V&&xt(u,d,b,"updated")},x)},Be=(d,u,b,x,w,y,M)=>{for(let P=0;P<u.length;P++){const _=d[P],k=u[P],V=_.el&&(_.type===Ie||!$t(_,k)||_.shapeFlag&198)?m(_.el):b;C(_,k,V,null,x,w,y,M,!0)}},it=(d,u,b,x,w)=>{if(u!==b){if(u!==te)for(const y in u)!zt(y)&&!(y in b)&&s(d,y,u[y],null,w,x);for(const y in b){if(zt(y))continue;const M=b[y],P=u[y];M!==P&&y!=="value"&&s(d,y,P,M,w,x)}"value"in b&&s(d,"value",u.value,b.value,w)}},bt=(d,u,b,x,w,y,M,P,_)=>{const k=u.el=d?d.el:c(""),V=u.anchor=d?d.anchor:c("");let{patchFlag:A,dynamicChildren:H,slotScopeIds:G}=u;G&&(P=P?P.concat(G):G),d==null?(r(k,b,x),r(V,b,x),Fe(u.children||[],b,V,w,y,M,P,_)):A>0&&A&64&&H&&d.dynamicChildren?(Be(d.dynamicChildren,H,b,w,y,M,P),(u.key!=null||w&&u===w.subTree)&&ws(d,u,!0)):W(d,u,b,V,w,y,M,P,_)},Le=(d,u,b,x,w,y,M,P,_)=>{u.slotScopeIds=P,d==null?u.shapeFlag&512?w.ctx.activate(u,b,x,M,_):Bt(u,b,x,w,y,M,_):_t(d,u,_)},Bt=(d,u,b,x,w,y,M)=>{const P=d.component=Vl(d,x,w);if(ls(d)&&(P.ctx.renderer=D),Fl(P,!1,M),P.asyncDep){if(w&&w.registerDep(P,ae,M),!d.el){const _=P.subTree=ye(mt);F(null,_,u,b)}}else ae(P,d,u,b,w,y,M)},_t=(d,u,b)=>{const x=u.component=d.component;if(Pl(d,u,b))if(x.asyncDep&&!x.asyncResolved){J(x,u,b);return}else x.next=u,x.update();else u.el=d.el,x.vnode=u},ae=(d,u,b,x,w,y,M)=>{const P=()=>{if(d.isMounted){let{next:A,bu:H,u:G,parent:z,vnode:ne}=d;{const Ne=ks(d);if(Ne){A&&(A.el=ne.el,J(d,A,M)),Ne.asyncDep.then(()=>{d.isUnmounted||P()});return}}let Q=A,_e;vt(d,!1),A?(A.el=ne.el,J(d,A,M)):A=ne,H&&jn(H),(_e=A.props&&A.props.onVnodeBeforeUpdate)&&je(_e,z,A,ne),vt(d,!0);const Se=Xr(d),$e=d.subTree;d.subTree=Se,C($e,Se,m($e.el),v($e),d,w,y),A.el=Se.el,Q===null&&Ml(d,Se.el),G&&Me(G,w),(_e=A.props&&A.props.onVnodeUpdated)&&Me(()=>je(_e,z,A,ne),w)}else{let A;const{el:H,props:G}=u,{bm:z,m:ne,parent:Q,root:_e,type:Se}=d,$e=Kt(u);vt(d,!1),z&&jn(z),!$e&&(A=G&&G.onVnodeBeforeMount)&&je(A,Q,u),vt(d,!0);{_e.ce&&_e.ce._injectChildStyle(Se);const Ne=d.subTree=Xr(d);C(null,Ne,b,x,d,w,y),u.el=Ne.el}if(ne&&Me(ne,w),!$e&&(A=G&&G.onVnodeMounted)){const Ne=u;Me(()=>je(A,Q,Ne),w)}(u.shapeFlag&256||Q&&Kt(Q.vnode)&&Q.vnode.shapeFlag&256)&&d.a&&Me(d.a,w),d.isMounted=!0,u=b=x=null}};d.scope.on();const _=d.effect=new Ho(P);d.scope.off();const k=d.update=_.run.bind(_),V=d.job=_.runIfDirty.bind(_);V.i=d,V.id=d.uid,_.scheduler=()=>Er(V),vt(d,!0),k()},J=(d,u,b)=>{u.component=d;const x=d.vnode.props;d.vnode=u,d.next=null,dl(d,u.props,x,b),gl(d,u.children,b),nt(),Lr(d),rt()},W=(d,u,b,x,w,y,M,P,_=!1)=>{const k=d&&d.children,V=d?d.shapeFlag:0,A=u.children,{patchFlag:H,shapeFlag:G}=u;if(H>0){if(H&128){lt(k,A,b,x,w,y,M,P,_);return}else if(H&256){Ye(k,A,b,x,w,y,M,P,_);return}}G&8?(V&16&&Re(k,w,y),A!==k&&l(b,A)):V&16?G&16?lt(k,A,b,x,w,y,M,P,_):Re(k,w,y,!0):(V&8&&l(b,""),G&16&&Fe(A,b,x,w,y,M,P,_))},Ye=(d,u,b,x,w,y,M,P,_)=>{d=d||It,u=u||It;const k=d.length,V=u.length,A=Math.min(k,V);let H;for(H=0;H<A;H++){const G=u[H]=_?ut(u[H]):We(u[H]);C(d[H],G,b,null,w,y,M,P,_)}k>V?Re(d,w,y,!0,!1,A):Fe(u,b,x,w,y,M,P,_,A)},lt=(d,u,b,x,w,y,M,P,_)=>{let k=0;const V=u.length;let A=d.length-1,H=V-1;for(;k<=A&&k<=H;){const G=d[k],z=u[k]=_?ut(u[k]):We(u[k]);if($t(G,z))C(G,z,b,null,w,y,M,P,_);else break;k++}for(;k<=A&&k<=H;){const G=d[A],z=u[H]=_?ut(u[H]):We(u[H]);if($t(G,z))C(G,z,b,null,w,y,M,P,_);else break;A--,H--}if(k>A){if(k<=H){const G=H+1,z=G<V?u[G].el:x;for(;k<=H;)C(null,u[k]=_?ut(u[k]):We(u[k]),b,z,w,y,M,P,_),k++}}else if(k>H)for(;k<=A;)ke(d[k],w,y,!0),k++;else{const G=k,z=k,ne=new Map;for(k=z;k<=H;k++){const Pe=u[k]=_?ut(u[k]):We(u[k]);Pe.key!=null&&ne.set(Pe.key,k)}let Q,_e=0;const Se=H-z+1;let $e=!1,Ne=0;const Lt=new Array(Se);for(k=0;k<Se;k++)Lt[k]=0;for(k=G;k<=A;k++){const Pe=d[k];if(_e>=Se){ke(Pe,w,y,!0);continue}let qe;if(Pe.key!=null)qe=ne.get(Pe.key);else for(Q=z;Q<=H;Q++)if(Lt[Q-z]===0&&$t(Pe,u[Q])){qe=Q;break}qe===void 0?ke(Pe,w,y,!0):(Lt[qe-z]=k+1,qe>=Ne?Ne=qe:$e=!0,C(Pe,u[qe],b,null,w,y,M,P,_),_e++)}const Ur=$e?xl(Lt):It;for(Q=Ur.length-1,k=Se-1;k>=0;k--){const Pe=z+k,qe=u[Pe],Hr=Pe+1<V?u[Pe+1].el:x;Lt[k]===0?C(null,qe,b,Hr,w,y,M,P,_):$e&&(Q<0||k!==Ur[Q]?Ge(qe,b,Hr,2):Q--)}}},Ge=(d,u,b,x,w=null)=>{const{el:y,type:M,transition:P,children:_,shapeFlag:k}=d;if(k&6){Ge(d.component.subTree,u,b,x);return}if(k&128){d.suspense.move(u,b,x);return}if(k&64){M.move(d,u,b,D);return}if(M===Ie){r(y,u,b);for(let A=0;A<_.length;A++)Ge(_[A],u,b,x);r(d.anchor,u,b);return}if(M===hn){B(d,u,b);return}if(x!==2&&k&1&&P)if(x===0)P.beforeEnter(y),r(y,u,b),Me(()=>P.enter(y),w);else{const{leave:A,delayLeave:H,afterLeave:G}=P,z=()=>{d.ctx.isUnmounted?o(y):r(y,u,b)},ne=()=>{A(y,()=>{z(),G&&G()})};H?H(y,z,ne):ne()}else r(y,u,b)},ke=(d,u,b,x=!1,w=!1)=>{const{type:y,props:M,ref:P,children:_,dynamicChildren:k,shapeFlag:V,patchFlag:A,dirs:H,cacheIndex:G}=d;if(A===-2&&(w=!1),P!=null&&(nt(),Sn(P,null,b,d,!0),rt()),G!=null&&(u.renderCache[G]=void 0),V&256){u.ctx.deactivate(d);return}const z=V&1&&H,ne=!Kt(d);let Q;if(ne&&(Q=M&&M.onVnodeBeforeUnmount)&&je(Q,u,d),V&6)dn(d.component,b,x);else{if(V&128){d.suspense.unmount(b,x);return}z&&xt(d,null,u,"beforeUnmount"),V&64?d.type.remove(d,u,b,D,x):k&&!k.hasOnce&&(y!==Ie||A>0&&A&64)?Re(k,u,b,!1,!0):(y===Ie&&A&384||!w&&V&16)&&Re(_,u,b),x&&Pt(d)}(ne&&(Q=M&&M.onVnodeUnmounted)||z)&&Me(()=>{Q&&je(Q,u,d),z&&xt(d,null,u,"unmounted")},b)},Pt=d=>{const{type:u,el:b,anchor:x,transition:w}=d;if(u===Ie){Mt(b,x);return}if(u===hn){T(d);return}const y=()=>{o(b),w&&!w.persisted&&w.afterLeave&&w.afterLeave()};if(d.shapeFlag&1&&w&&!w.persisted){const{leave:M,delayLeave:P}=w,_=()=>M(b,y);P?P(d.el,y,_):_()}else y()},Mt=(d,u)=>{let b;for(;d!==u;)b=f(d),o(d),d=b;o(u)},dn=(d,u,b)=>{const{bum:x,scope:w,job:y,subTree:M,um:P,m:_,a:k,parent:V,slots:{__:A}}=d;Wr(_),Wr(k),x&&jn(x),V&&N(A)&&A.forEach(H=>{V.renderCache[H]=void 0}),w.stop(),y&&(y.flags|=8,ke(M,d,u,b)),P&&Me(P,u),Me(()=>{d.isUnmounted=!0},u),u&&u.pendingBranch&&!u.isUnmounted&&d.asyncDep&&!d.asyncResolved&&d.suspenseId===u.pendingId&&(u.deps--,u.deps===0&&u.resolve())},Re=(d,u,b,x=!1,w=!1,y=0)=>{for(let M=y;M<d.length;M++)ke(d[M],u,b,x,w)},v=d=>{if(d.shapeFlag&6)return v(d.component.subTree);if(d.shapeFlag&128)return d.suspense.next();const u=f(d.anchor||d.el),b=u&&u[Vi];return b?f(b):u};let O=!1;const E=(d,u,b)=>{d==null?u._vnode&&ke(u._vnode,null,null,!0):C(u._vnode||null,d,u,null,null,null,b),u._vnode=d,O||(O=!0,Lr(),rs(),O=!1)},D={p:C,um:ke,m:Ge,r:Pt,mt:Bt,mc:Fe,pc:W,pbc:Be,n:v,o:e};return{render:E,hydrate:void 0,createApp:al(E)}}function Qn({type:e,props:t},n){return n==="svg"&&e==="foreignObject"||n==="mathml"&&e==="annotation-xml"&&t&&t.encoding&&t.encoding.includes("html")?void 0:n}function vt({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function bl(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function ws(e,t,n=!1){const r=e.children,o=t.children;if(N(r)&&N(o))for(let s=0;s<r.length;s++){const i=r[s];let c=o[s];c.shapeFlag&1&&!c.dynamicChildren&&((c.patchFlag<=0||c.patchFlag===32)&&(c=o[s]=ut(o[s]),c.el=i.el),!n&&c.patchFlag!==-2&&ws(i,c)),c.type===Bn&&(c.el=i.el),c.type===mt&&!c.el&&(c.el=i.el)}}function xl(e){const t=e.slice(),n=[0];let r,o,s,i,c;const a=e.length;for(r=0;r<a;r++){const g=e[r];if(g!==0){if(o=n[n.length-1],e[o]<g){t[r]=o,n.push(r);continue}for(s=0,i=n.length-1;s<i;)c=s+i>>1,e[n[c]]<g?s=c+1:i=c;g<e[n[s]]&&(s>0&&(t[r]=n[s-1]),n[s]=r)}}for(s=n.length,i=n[s-1];s-- >0;)n[s]=i,i=t[i];return n}function ks(e){const t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:ks(t)}function Wr(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}const vl=Symbol.for("v-scx"),yl=()=>He(vl);function mn(e,t,n){return Ss(e,t,n)}function Ss(e,t,n=te){const{immediate:r,deep:o,flush:s,once:i}=n,c=be({},n),a=t&&r||!t&&s!=="post";let g;if(on){if(s==="sync"){const h=yl();g=h.__watcherHandles||(h.__watcherHandles=[])}else if(!a){const h=()=>{};return h.stop=Xe,h.resume=Xe,h.pause=Xe,h}}const l=me;c.call=(h,R,C)=>Ke(h,l,R,C);let m=!1;s==="post"?c.scheduler=h=>{Me(h,l&&l.suspense)}:s!=="sync"&&(m=!0,c.scheduler=(h,R)=>{R?h():Er(h)}),c.augmentJob=h=>{t&&(h.flags|=4),m&&(h.flags|=2,l&&(h.id=l.uid,h.i=l))};const f=Oi(e,t,c);return on&&(g?g.push(f):a&&f()),f}function wl(e,t,n){const r=this.proxy,o=le(e)?e.includes(".")?Cs(r,e):()=>r[e]:e.bind(r,r);let s;q(t)?s=t:(s=t.handler,n=t);const i=cn(this),c=Ss(o,s.bind(r),n);return i(),c}function Cs(e,t){const n=t.split(".");return()=>{let r=e;for(let o=0;o<n.length&&r;o++)r=r[n[o]];return r}}const kl=(e,t)=>t==="modelValue"||t==="model-value"?e.modelModifiers:e[`${t}Modifiers`]||e[`${Te(t)}Modifiers`]||e[`${kt(t)}Modifiers`];function Sl(e,t,...n){if(e.isUnmounted)return;const r=e.vnode.props||te;let o=n;const s=t.startsWith("update:"),i=s&&kl(r,t.slice(7));i&&(i.trim&&(o=n.map(l=>le(l)?l.trim():l)),i.number&&(o=n.map(Js)));let c,a=r[c=qn(t)]||r[c=qn(Te(t))];!a&&s&&(a=r[c=qn(kt(t))]),a&&Ke(a,e,6,o);const g=r[c+"Once"];if(g){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,Ke(g,e,6,o)}}function _s(e,t,n=!1){const r=t.emitsCache,o=r.get(e);if(o!==void 0)return o;const s=e.emits;let i={},c=!1;if(!q(e)){const a=g=>{const l=_s(g,t,!0);l&&(c=!0,be(i,l))};!n&&t.mixins.length&&t.mixins.forEach(a),e.extends&&a(e.extends),e.mixins&&e.mixins.forEach(a)}return!s&&!c?(oe(e)&&r.set(e,null),null):(N(s)?s.forEach(a=>i[a]=null):be(i,s),oe(e)&&r.set(e,i),i)}function Fn(e,t){return!e||!En(t)?!1:(t=t.slice(2).replace(/Once$/,""),Y(e,t[0].toLowerCase()+t.slice(1))||Y(e,kt(t))||Y(e,t))}function Xr(e){const{type:t,vnode:n,proxy:r,withProxy:o,propsOptions:[s],slots:i,attrs:c,emit:a,render:g,renderCache:l,props:m,data:f,setupState:h,ctx:R,inheritAttrs:C}=e,I=kn(e);let F,U;try{if(n.shapeFlag&4){const T=o||r,Z=T;F=We(g.call(Z,T,l,m,h,f,R)),U=c}else{const T=t;F=We(T.length>1?T(m,{attrs:c,slots:i,emit:a}):T(m,null)),U=t.props?c:Cl(c)}}catch(T){Qt.length=0,Hn(T,e,1),F=ye(mt)}let B=F;if(U&&C!==!1){const T=Object.keys(U),{shapeFlag:Z}=B;T.length&&Z&7&&(s&&T.some(xr)&&(U=_l(U,s)),B=Ht(B,U,!1,!0))}return n.dirs&&(B=Ht(B,null,!1,!0),B.dirs=B.dirs?B.dirs.concat(n.dirs):n.dirs),n.transition&&Ar(B,n.transition),F=B,kn(I),F}const Cl=e=>{let t;for(const n in e)(n==="class"||n==="style"||En(n))&&((t||(t={}))[n]=e[n]);return t},_l=(e,t)=>{const n={};for(const r in e)(!xr(r)||!(r.slice(9)in t))&&(n[r]=e[r]);return n};function Pl(e,t,n){const{props:r,children:o,component:s}=e,{props:i,children:c,patchFlag:a}=t,g=s.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&a>=0){if(a&1024)return!0;if(a&16)return r?Kr(r,i,g):!!i;if(a&8){const l=t.dynamicProps;for(let m=0;m<l.length;m++){const f=l[m];if(i[f]!==r[f]&&!Fn(g,f))return!0}}}else return(o||c)&&(!c||!c.$stable)?!0:r===i?!1:r?i?Kr(r,i,g):!0:!!i;return!1}function Kr(e,t,n){const r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let o=0;o<r.length;o++){const s=r[o];if(t[s]!==e[s]&&!Fn(n,s))return!0}return!1}function Ml({vnode:e,parent:t},n){for(;t;){const r=t.subTree;if(r.suspense&&r.suspense.activeBranch===e&&(r.el=e.el),r===e)(e=t.vnode).el=n,t=t.parent;else break}}const Ps=e=>e.__isSuspense;function El(e,t){t&&t.pendingBranch?N(e)?t.effects.push(...e):t.effects.push(e):Ui(e)}const Ie=Symbol.for("v-fgt"),Bn=Symbol.for("v-txt"),mt=Symbol.for("v-cmt"),hn=Symbol.for("v-stc"),Qt=[];let Ae=null;function L(e=!1){Qt.push(Ae=e?null:[])}function Al(){Qt.pop(),Ae=Qt[Qt.length-1]||null}let rn=1;function Yr(e,t=!1){rn+=e,e<0&&Ae&&t&&(Ae.hasOnce=!0)}function Ms(e){return e.dynamicChildren=rn>0?Ae||It:null,Al(),rn>0&&Ae&&Ae.push(e),e}function $(e,t,n,r,o,s){return Ms(p(e,t,n,r,o,s,!0))}function Rl(e,t,n,r,o){return Ms(ye(e,t,n,r,o,!0))}function _n(e){return e?e.__v_isVNode===!0:!1}function $t(e,t){return e.type===t.type&&e.key===t.key}const Es=({key:e})=>e??null,bn=({ref:e,ref_key:t,ref_for:n})=>(typeof e=="number"&&(e=""+e),e!=null?le(e)||he(e)||q(e)?{i:Ee,r:e,k:t,f:!!n}:e:null);function p(e,t=null,n=null,r=0,o=null,s=e===Ie?0:1,i=!1,c=!1){const a={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&Es(t),ref:t&&bn(t),scopeId:ss,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:s,patchFlag:r,dynamicProps:o,dynamicChildren:null,appContext:null,ctx:Ee};return c?(Or(a,n),s&128&&e.normalize(a)):n&&(a.shapeFlag|=le(n)?8:16),rn>0&&!i&&Ae&&(a.patchFlag>0||s&6)&&a.patchFlag!==32&&Ae.push(a),a}const ye=Il;function Il(e,t=null,n=null,r=0,o=null,s=!1){if((!e||e===Zi)&&(e=mt),_n(e)){const c=Ht(e,t,!0);return n&&Or(c,n),rn>0&&!s&&Ae&&(c.shapeFlag&6?Ae[Ae.indexOf(e)]=c:Ae.push(c)),c.patchFlag=-2,c}if(Nl(e)&&(e=e.__vccOpts),t){t=Ol(t);let{class:c,style:a}=t;c&&!le(c)&&(t.class=ie(c)),oe(a)&&(Mr(a)&&!N(a)&&(a=be({},a)),t.style=St(a))}const i=le(e)?1:Ps(e)?128:Fi(e)?64:oe(e)?4:q(e)?2:0;return p(e,t,n,r,o,i,s,!0)}function Ol(e){return e?Mr(e)||ms(e)?be({},e):e:null}function Ht(e,t,n=!1,r=!1){const{props:o,ref:s,patchFlag:i,children:c,transition:a}=e,g=t?Dl(o||{},t):o,l={__v_isVNode:!0,__v_skip:!0,type:e.type,props:g,key:g&&Es(g),ref:t&&t.ref?n&&s?N(s)?s.concat(bn(t)):[s,bn(t)]:bn(t):s,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:c,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==Ie?i===-1?16:i|16:i,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:a,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&Ht(e.ssContent),ssFallback:e.ssFallback&&Ht(e.ssFallback),el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce};return a&&r&&Ar(l,a.clone(l)),l}function we(e=" ",t=0){return ye(Bn,null,e,t)}function ce(e,t){const n=ye(hn,null,e);return n.staticCount=t,n}function Tl(e="",t=!1){return t?(L(),Rl(mt,null,e)):ye(mt,null,e)}function We(e){return e==null||typeof e=="boolean"?ye(mt):N(e)?ye(Ie,null,e.slice()):_n(e)?ut(e):ye(Bn,null,String(e))}function ut(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:Ht(e)}function Or(e,t){let n=0;const{shapeFlag:r}=e;if(t==null)t=null;else if(N(t))n=16;else if(typeof t=="object")if(r&65){const o=t.default;o&&(o._c&&(o._d=!1),Or(e,o()),o._c&&(o._d=!0));return}else{n=32;const o=t._;!o&&!ms(t)?t._ctx=Ee:o===3&&Ee&&(Ee.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}else q(t)?(t={default:t,_ctx:Ee},n=32):(t=String(t),r&64?(n=16,t=[we(t)]):n=8);e.children=t,e.shapeFlag|=n}function Dl(...e){const t={};for(let n=0;n<e.length;n++){const r=e[n];for(const o in r)if(o==="class")t.class!==r.class&&(t.class=ie([t.class,r.class]));else if(o==="style")t.style=St([t.style,r.style]);else if(En(o)){const s=t[o],i=r[o];i&&s!==i&&!(N(s)&&s.includes(i))&&(t[o]=s?[].concat(s,i):i)}else o!==""&&(t[o]=r[o])}return t}function je(e,t,n,r=null){Ke(e,t,7,[n,r])}const Ul=fs();let Hl=0;function Vl(e,t,n){const r=e.type,o=(t?t.appContext:e.appContext)||Ul,s={uid:Hl++,vnode:e,type:r,parent:t,appContext:o,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new si(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(o.provides),ids:t?t.ids:["",0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:bs(r,o),emitsOptions:_s(r,o),emit:null,emitted:null,propsDefaults:te,inheritAttrs:r.inheritAttrs,ctx:te,data:te,props:te,attrs:te,slots:te,refs:te,setupState:te,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return s.ctx={_:s},s.root=t?t.root:s,s.emit=Sl.bind(null,s),e.ce&&e.ce(s),s}let me=null,Pn,fr;{const e=On(),t=(n,r)=>{let o;return(o=e[n])||(o=e[n]=[]),o.push(r),s=>{o.length>1?o.forEach(i=>i(s)):o[0](s)}};Pn=t("__VUE_INSTANCE_SETTERS__",n=>me=n),fr=t("__VUE_SSR_SETTERS__",n=>on=n)}const cn=e=>{const t=me;return Pn(e),e.scope.on(),()=>{e.scope.off(),Pn(t)}},Qr=()=>{me&&me.scope.off(),Pn(null)};function As(e){return e.vnode.shapeFlag&4}let on=!1;function Fl(e,t=!1,n=!1){t&&fr(t);const{props:r,children:o}=e.vnode,s=As(e);cl(e,r,s,t),pl(e,o,n||t);const i=s?Bl(e,t):void 0;return t&&fr(!1),i}function Bl(e,t){const n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,tl);const{setup:r}=n;if(r){nt();const o=e.setupContext=r.length>1?Gl(e):null,s=cn(e),i=an(r,e,0,[e.props,o]),c=Ao(i);if(rt(),s(),(c||e.sp)&&!Kt(e)&&is(e),c){if(i.then(Qr,Qr),t)return i.then(a=>{Jr(e,a)}).catch(a=>{Hn(a,e,0)});e.asyncDep=i}else Jr(e,i)}else Rs(e)}function Jr(e,t,n){q(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:oe(t)&&(e.setupState=Zo(t)),Rs(e)}function Rs(e,t,n){const r=e.type;e.render||(e.render=r.render||Xe);{const o=cn(e);nt();try{nl(e)}finally{rt(),o()}}}const Ll={get(e,t){return ge(e,"get",""),e[t]}};function Gl(e){const t=n=>{e.exposed=n||{}};return{attrs:new Proxy(e.attrs,Ll),slots:e.slots,emit:e.emit,expose:t}}function Ln(e){return e.exposed?e.exposeProxy||(e.exposeProxy=new Proxy(Zo(_i(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Yt)return Yt[n](e)},has(t,n){return n in t||n in Yt}})):e.proxy}function $l(e,t=!0){return q(e)?e.displayName||e.name:e.name||t&&e.__name}function Nl(e){return q(e)&&"__vccOpts"in e}const De=(e,t)=>Ri(e,t,on);function Is(e,t,n){const r=arguments.length;return r===2?oe(t)&&!N(t)?_n(t)?ye(e,null,[t]):ye(e,t):ye(e,null,t):(r>3?n=Array.prototype.slice.call(arguments,2):r===3&&_n(n)&&(n=[n]),ye(e,t,n))}const ql="3.5.16";/**
* @vue/runtime-dom v3.5.16
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/let pr;const Zr=typeof window<"u"&&window.trustedTypes;if(Zr)try{pr=Zr.createPolicy("vue",{createHTML:e=>e})}catch{}const Os=pr?e=>pr.createHTML(e):e=>e,jl="http://www.w3.org/2000/svg",zl="http://www.w3.org/1998/Math/MathML",Ze=typeof document<"u"?document:null,eo=Ze&&Ze.createElement("template"),Wl={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{const t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{const o=t==="svg"?Ze.createElementNS(jl,e):t==="mathml"?Ze.createElementNS(zl,e):n?Ze.createElement(e,{is:n}):Ze.createElement(e);return e==="select"&&r&&r.multiple!=null&&o.setAttribute("multiple",r.multiple),o},createText:e=>Ze.createTextNode(e),createComment:e=>Ze.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ze.querySelector(e),setScopeId(e,t){e.setAttribute(t,"")},insertStaticContent(e,t,n,r,o,s){const i=n?n.previousSibling:t.lastChild;if(o&&(o===s||o.nextSibling))for(;t.insertBefore(o.cloneNode(!0),n),!(o===s||!(o=o.nextSibling)););else{eo.innerHTML=Os(r==="svg"?`<svg>${e}</svg>`:r==="mathml"?`<math>${e}</math>`:e);const c=eo.content;if(r==="svg"||r==="mathml"){const a=c.firstChild;for(;a.firstChild;)c.appendChild(a.firstChild);c.removeChild(a)}t.insertBefore(c,n)}return[i?i.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Xl=Symbol("_vtc");function Kl(e,t,n){const r=e[Xl];r&&(t=(t?[t,...r]:[...r]).join(" ")),t==null?e.removeAttribute("class"):n?e.setAttribute("class",t):e.className=t}const Mn=Symbol("_vod"),Ts=Symbol("_vsh"),fe={beforeMount(e,{value:t},{transition:n}){e[Mn]=e.style.display==="none"?"":e.style.display,n&&t?n.beforeEnter(e):Nt(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Nt(e,!0),r.enter(e)):r.leave(e,()=>{Nt(e,!1)}):Nt(e,t))},beforeUnmount(e,{value:t}){Nt(e,t)}};function Nt(e,t){e.style.display=t?e[Mn]:"none",e[Ts]=!t}const Yl=Symbol(""),Ql=/(^|;)\s*display\s*:/;function Jl(e,t,n){const r=e.style,o=le(n);let s=!1;if(n&&!o){if(t)if(le(t))for(const i of t.split(";")){const c=i.slice(0,i.indexOf(":")).trim();n[c]==null&&xn(r,c,"")}else for(const i in t)n[i]==null&&xn(r,i,"");for(const i in n)i==="display"&&(s=!0),xn(r,i,n[i])}else if(o){if(t!==n){const i=r[Yl];i&&(n+=";"+i),r.cssText=n,s=Ql.test(n)}}else t&&e.removeAttribute("style");Mn in e&&(e[Mn]=s?r.display:"",e[Ts]&&(r.display="none"))}const to=/\s*!important$/;function xn(e,t,n){if(N(n))n.forEach(r=>xn(e,t,r));else if(n==null&&(n=""),t.startsWith("--"))e.setProperty(t,n);else{const r=Zl(e,t);to.test(n)?e.setProperty(kt(r),n.replace(to,""),"important"):e[r]=n}}const no=["Webkit","Moz","ms"],Jn={};function Zl(e,t){const n=Jn[t];if(n)return n;let r=Te(t);if(r!=="filter"&&r in e)return Jn[t]=r;r=In(r);for(let o=0;o<no.length;o++){const s=no[o]+r;if(s in e)return Jn[t]=s}return t}const ro="http://www.w3.org/1999/xlink";function oo(e,t,n,r,o,s=oi(t)){r&&t.startsWith("xlink:")?n==null?e.removeAttributeNS(ro,t.slice(6,t.length)):e.setAttributeNS(ro,t,n):n==null||s&&!To(n)?e.removeAttribute(t):e.setAttribute(t,s?"":ht(n)?String(n):n)}function so(e,t,n,r,o){if(t==="innerHTML"||t==="textContent"){n!=null&&(e[t]=t==="innerHTML"?Os(n):n);return}const s=e.tagName;if(t==="value"&&s!=="PROGRESS"&&!s.includes("-")){const c=s==="OPTION"?e.getAttribute("value")||"":e.value,a=n==null?e.type==="checkbox"?"on":"":String(n);(c!==a||!("_value"in e))&&(e.value=a),n==null&&e.removeAttribute(t),e._value=n;return}let i=!1;if(n===""||n==null){const c=typeof e[t];c==="boolean"?n=To(n):n==null&&c==="string"?(n="",i=!0):c==="number"&&(n=0,i=!0)}try{e[t]=n}catch{}i&&e.removeAttribute(o||t)}function ea(e,t,n,r){e.addEventListener(t,n,r)}function ta(e,t,n,r){e.removeEventListener(t,n,r)}const io=Symbol("_vei");function na(e,t,n,r,o=null){const s=e[io]||(e[io]={}),i=s[t];if(r&&i)i.value=r;else{const[c,a]=ra(t);if(r){const g=s[t]=ia(r,o);ea(e,c,g,a)}else i&&(ta(e,c,i,a),s[t]=void 0)}}const lo=/(?:Once|Passive|Capture)$/;function ra(e){let t;if(lo.test(e)){t={};let r;for(;r=e.match(lo);)e=e.slice(0,e.length-r[0].length),t[r[0].toLowerCase()]=!0}return[e[2]===":"?e.slice(3):kt(e.slice(2)),t]}let Zn=0;const oa=Promise.resolve(),sa=()=>Zn||(oa.then(()=>Zn=0),Zn=Date.now());function ia(e,t){const n=r=>{if(!r._vts)r._vts=Date.now();else if(r._vts<=n.attached)return;Ke(la(r,n.value),t,5,[r])};return n.value=e,n.attached=sa(),n}function la(e,t){if(N(t)){const n=e.stopImmediatePropagation;return e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0},t.map(r=>o=>!o._stopped&&r&&r(o))}else return t}const ao=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,aa=(e,t,n,r,o,s)=>{const i=o==="svg";t==="class"?Kl(e,r,i):t==="style"?Jl(e,n,r):En(t)?xr(t)||na(e,t,n,r,s):(t[0]==="."?(t=t.slice(1),!0):t[0]==="^"?(t=t.slice(1),!1):ca(e,t,r,i))?(so(e,t,r),!e.tagName.includes("-")&&(t==="value"||t==="checked"||t==="selected")&&oo(e,t,r,i,s,t!=="value")):e._isVueCE&&(/[A-Z]/.test(t)||!le(r))?so(e,Te(t),r,s,t):(t==="true-value"?e._trueValue=r:t==="false-value"&&(e._falseValue=r),oo(e,t,r,i))};function ca(e,t,n,r){if(r)return!!(t==="innerHTML"||t==="textContent"||t in e&&ao(t)&&q(n));if(t==="spellcheck"||t==="draggable"||t==="translate"||t==="autocorrect"||t==="form"||t==="list"&&e.tagName==="INPUT"||t==="type"&&e.tagName==="TEXTAREA")return!1;if(t==="width"||t==="height"){const o=e.tagName;if(o==="IMG"||o==="VIDEO"||o==="CANVAS"||o==="SOURCE")return!1}return ao(t)&&le(n)?!1:t in e}const da=be({patchProp:aa},Wl);let co;function ua(){return co||(co=ml(da))}const fa=(...e)=>{const t=ua().createApp(...e),{mount:n}=t;return t.mount=r=>{const o=ga(r);if(!o)return;const s=t._component;!q(s)&&!s.render&&!s.template&&(s.template=o.innerHTML),o.nodeType===1&&(o.textContent="");const i=n(o,!1,pa(o));return o instanceof Element&&(o.removeAttribute("v-cloak"),o.setAttribute("data-v-app","")),i},t};function pa(e){if(e instanceof SVGElement)return"svg";if(typeof MathMLElement=="function"&&e instanceof MathMLElement)return"mathml"}function ga(e){return le(e)?document.querySelector(e):e}const ma=(e,t)=>{const n=e.__vccOpts||e;for(const[r,o]of t)n[r]=o;return n},ha={},ba={class:"min-h-screen bg-white dark:bg-gray-900"};function xa(e,t){const n=Ji("router-view");return L(),$("div",ba,[ye(n)])}const va=ma(ha,[["render",xa]]);/*!
  * vue-router v4.5.1
  * (c) 2025 Eduardo San Martin Morote
  * @license MIT
  */const Rt=typeof document<"u";function Ds(e){return typeof e=="object"||"displayName"in e||"props"in e||"__vccOpts"in e}function ya(e){return e.__esModule||e[Symbol.toStringTag]==="Module"||e.default&&Ds(e.default)}const X=Object.assign;function er(e,t){const n={};for(const r in t){const o=t[r];n[r]=Ve(o)?o.map(e):e(o)}return n}const Jt=()=>{},Ve=Array.isArray,Us=/#/g,wa=/&/g,ka=/\//g,Sa=/=/g,Ca=/\?/g,Hs=/\+/g,_a=/%5B/g,Pa=/%5D/g,Vs=/%5E/g,Ma=/%60/g,Fs=/%7B/g,Ea=/%7C/g,Bs=/%7D/g,Aa=/%20/g;function Tr(e){return encodeURI(""+e).replace(Ea,"|").replace(_a,"[").replace(Pa,"]")}function Ra(e){return Tr(e).replace(Fs,"{").replace(Bs,"}").replace(Vs,"^")}function gr(e){return Tr(e).replace(Hs,"%2B").replace(Aa,"+").replace(Us,"%23").replace(wa,"%26").replace(Ma,"`").replace(Fs,"{").replace(Bs,"}").replace(Vs,"^")}function Ia(e){return gr(e).replace(Sa,"%3D")}function Oa(e){return Tr(e).replace(Us,"%23").replace(Ca,"%3F")}function Ta(e){return e==null?"":Oa(e).replace(ka,"%2F")}function sn(e){try{return decodeURIComponent(""+e)}catch{}return""+e}const Da=/\/$/,Ua=e=>e.replace(Da,"");function tr(e,t,n="/"){let r,o={},s="",i="";const c=t.indexOf("#");let a=t.indexOf("?");return c<a&&c>=0&&(a=-1),a>-1&&(r=t.slice(0,a),s=t.slice(a+1,c>-1?c:t.length),o=e(s)),c>-1&&(r=r||t.slice(0,c),i=t.slice(c,t.length)),r=Ba(r??t,n),{fullPath:r+(s&&"?")+s+i,path:r,query:o,hash:sn(i)}}function Ha(e,t){const n=t.query?e(t.query):"";return t.path+(n&&"?")+n+(t.hash||"")}function uo(e,t){return!t||!e.toLowerCase().startsWith(t.toLowerCase())?e:e.slice(t.length)||"/"}function Va(e,t,n){const r=t.matched.length-1,o=n.matched.length-1;return r>-1&&r===o&&Vt(t.matched[r],n.matched[o])&&Ls(t.params,n.params)&&e(t.query)===e(n.query)&&t.hash===n.hash}function Vt(e,t){return(e.aliasOf||e)===(t.aliasOf||t)}function Ls(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(const n in e)if(!Fa(e[n],t[n]))return!1;return!0}function Fa(e,t){return Ve(e)?fo(e,t):Ve(t)?fo(t,e):e===t}function fo(e,t){return Ve(t)?e.length===t.length&&e.every((n,r)=>n===t[r]):e.length===1&&e[0]===t}function Ba(e,t){if(e.startsWith("/"))return e;if(!e)return t;const n=t.split("/"),r=e.split("/"),o=r[r.length-1];(o===".."||o===".")&&r.push("");let s=n.length-1,i,c;for(i=0;i<r.length;i++)if(c=r[i],c!==".")if(c==="..")s>1&&s--;else break;return n.slice(0,s).join("/")+"/"+r.slice(i).join("/")}const at={path:"/",name:void 0,params:{},query:{},hash:"",fullPath:"/",matched:[],meta:{},redirectedFrom:void 0};var ln;(function(e){e.pop="pop",e.push="push"})(ln||(ln={}));var Zt;(function(e){e.back="back",e.forward="forward",e.unknown=""})(Zt||(Zt={}));function La(e){if(!e)if(Rt){const t=document.querySelector("base");e=t&&t.getAttribute("href")||"/",e=e.replace(/^\w+:\/\/[^\/]+/,"")}else e="/";return e[0]!=="/"&&e[0]!=="#"&&(e="/"+e),Ua(e)}const Ga=/^[^#]+#/;function $a(e,t){return e.replace(Ga,"#")+t}function Na(e,t){const n=document.documentElement.getBoundingClientRect(),r=e.getBoundingClientRect();return{behavior:t.behavior,left:r.left-n.left-(t.left||0),top:r.top-n.top-(t.top||0)}}const Gn=()=>({left:window.scrollX,top:window.scrollY});function qa(e){let t;if("el"in e){const n=e.el,r=typeof n=="string"&&n.startsWith("#"),o=typeof n=="string"?r?document.getElementById(n.slice(1)):document.querySelector(n):n;if(!o)return;t=Na(o,e)}else t=e;"scrollBehavior"in document.documentElement.style?window.scrollTo(t):window.scrollTo(t.left!=null?t.left:window.scrollX,t.top!=null?t.top:window.scrollY)}function po(e,t){return(history.state?history.state.position-t:-1)+e}const mr=new Map;function ja(e,t){mr.set(e,t)}function za(e){const t=mr.get(e);return mr.delete(e),t}let Wa=()=>location.protocol+"//"+location.host;function Gs(e,t){const{pathname:n,search:r,hash:o}=t,s=e.indexOf("#");if(s>-1){let c=o.includes(e.slice(s))?e.slice(s).length:1,a=o.slice(c);return a[0]!=="/"&&(a="/"+a),uo(a,"")}return uo(n,e)+r+o}function Xa(e,t,n,r){let o=[],s=[],i=null;const c=({state:f})=>{const h=Gs(e,location),R=n.value,C=t.value;let I=0;if(f){if(n.value=h,t.value=f,i&&i===R){i=null;return}I=C?f.position-C.position:0}else r(h);o.forEach(F=>{F(n.value,R,{delta:I,type:ln.pop,direction:I?I>0?Zt.forward:Zt.back:Zt.unknown})})};function a(){i=n.value}function g(f){o.push(f);const h=()=>{const R=o.indexOf(f);R>-1&&o.splice(R,1)};return s.push(h),h}function l(){const{history:f}=window;f.state&&f.replaceState(X({},f.state,{scroll:Gn()}),"")}function m(){for(const f of s)f();s=[],window.removeEventListener("popstate",c),window.removeEventListener("beforeunload",l)}return window.addEventListener("popstate",c),window.addEventListener("beforeunload",l,{passive:!0}),{pauseListeners:a,listen:g,destroy:m}}function go(e,t,n,r=!1,o=!1){return{back:e,current:t,forward:n,replaced:r,position:window.history.length,scroll:o?Gn():null}}function Ka(e){const{history:t,location:n}=window,r={value:Gs(e,n)},o={value:t.state};o.value||s(r.value,{back:null,current:r.value,forward:null,position:t.length-1,replaced:!0,scroll:null},!0);function s(a,g,l){const m=e.indexOf("#"),f=m>-1?(n.host&&document.querySelector("base")?e:e.slice(m))+a:Wa()+e+a;try{t[l?"replaceState":"pushState"](g,"",f),o.value=g}catch(h){console.error(h),n[l?"replace":"assign"](f)}}function i(a,g){const l=X({},t.state,go(o.value.back,a,o.value.forward,!0),g,{position:o.value.position});s(a,l,!0),r.value=a}function c(a,g){const l=X({},o.value,t.state,{forward:a,scroll:Gn()});s(l.current,l,!0);const m=X({},go(r.value,a,null),{position:l.position+1},g);s(a,m,!1),r.value=a}return{location:r,state:o,push:c,replace:i}}function Ya(e){e=La(e);const t=Ka(e),n=Xa(e,t.state,t.location,t.replace);function r(s,i=!0){i||n.pauseListeners(),history.go(s)}const o=X({location:"",base:e,go:r,createHref:$a.bind(null,e)},t,n);return Object.defineProperty(o,"location",{enumerable:!0,get:()=>t.location.value}),Object.defineProperty(o,"state",{enumerable:!0,get:()=>t.state.value}),o}function Qa(e){return typeof e=="string"||e&&typeof e=="object"}function $s(e){return typeof e=="string"||typeof e=="symbol"}const Ns=Symbol("");var mo;(function(e){e[e.aborted=4]="aborted",e[e.cancelled=8]="cancelled",e[e.duplicated=16]="duplicated"})(mo||(mo={}));function Ft(e,t){return X(new Error,{type:e,[Ns]:!0},t)}function Je(e,t){return e instanceof Error&&Ns in e&&(t==null||!!(e.type&t))}const ho="[^/]+?",Ja={sensitive:!1,strict:!1,start:!0,end:!0},Za=/[.+*?^${}()[\]/\\]/g;function ec(e,t){const n=X({},Ja,t),r=[];let o=n.start?"^":"";const s=[];for(const g of e){const l=g.length?[]:[90];n.strict&&!g.length&&(o+="/");for(let m=0;m<g.length;m++){const f=g[m];let h=40+(n.sensitive?.25:0);if(f.type===0)m||(o+="/"),o+=f.value.replace(Za,"\\$&"),h+=40;else if(f.type===1){const{value:R,repeatable:C,optional:I,regexp:F}=f;s.push({name:R,repeatable:C,optional:I});const U=F||ho;if(U!==ho){h+=10;try{new RegExp(`(${U})`)}catch(T){throw new Error(`Invalid custom RegExp for param "${R}" (${U}): `+T.message)}}let B=C?`((?:${U})(?:/(?:${U}))*)`:`(${U})`;m||(B=I&&g.length<2?`(?:/${B})`:"/"+B),I&&(B+="?"),o+=B,h+=20,I&&(h+=-8),C&&(h+=-20),U===".*"&&(h+=-50)}l.push(h)}r.push(l)}if(n.strict&&n.end){const g=r.length-1;r[g][r[g].length-1]+=.7000000000000001}n.strict||(o+="/?"),n.end?o+="$":n.strict&&!o.endsWith("/")&&(o+="(?:/|$)");const i=new RegExp(o,n.sensitive?"":"i");function c(g){const l=g.match(i),m={};if(!l)return null;for(let f=1;f<l.length;f++){const h=l[f]||"",R=s[f-1];m[R.name]=h&&R.repeatable?h.split("/"):h}return m}function a(g){let l="",m=!1;for(const f of e){(!m||!l.endsWith("/"))&&(l+="/"),m=!1;for(const h of f)if(h.type===0)l+=h.value;else if(h.type===1){const{value:R,repeatable:C,optional:I}=h,F=R in g?g[R]:"";if(Ve(F)&&!C)throw new Error(`Provided param "${R}" is an array but it is not repeatable (* or + modifiers)`);const U=Ve(F)?F.join("/"):F;if(!U)if(I)f.length<2&&(l.endsWith("/")?l=l.slice(0,-1):m=!0);else throw new Error(`Missing required param "${R}"`);l+=U}}return l||"/"}return{re:i,score:r,keys:s,parse:c,stringify:a}}function tc(e,t){let n=0;for(;n<e.length&&n<t.length;){const r=t[n]-e[n];if(r)return r;n++}return e.length<t.length?e.length===1&&e[0]===80?-1:1:e.length>t.length?t.length===1&&t[0]===80?1:-1:0}function qs(e,t){let n=0;const r=e.score,o=t.score;for(;n<r.length&&n<o.length;){const s=tc(r[n],o[n]);if(s)return s;n++}if(Math.abs(o.length-r.length)===1){if(bo(r))return 1;if(bo(o))return-1}return o.length-r.length}function bo(e){const t=e[e.length-1];return e.length>0&&t[t.length-1]<0}const nc={type:0,value:""},rc=/[a-zA-Z0-9_]/;function oc(e){if(!e)return[[]];if(e==="/")return[[nc]];if(!e.startsWith("/"))throw new Error(`Invalid path "${e}"`);function t(h){throw new Error(`ERR (${n})/"${g}": ${h}`)}let n=0,r=n;const o=[];let s;function i(){s&&o.push(s),s=[]}let c=0,a,g="",l="";function m(){g&&(n===0?s.push({type:0,value:g}):n===1||n===2||n===3?(s.length>1&&(a==="*"||a==="+")&&t(`A repeatable param (${g}) must be alone in its segment. eg: '/:ids+.`),s.push({type:1,value:g,regexp:l,repeatable:a==="*"||a==="+",optional:a==="*"||a==="?"})):t("Invalid state to consume buffer"),g="")}function f(){g+=a}for(;c<e.length;){if(a=e[c++],a==="\\"&&n!==2){r=n,n=4;continue}switch(n){case 0:a==="/"?(g&&m(),i()):a===":"?(m(),n=1):f();break;case 4:f(),n=r;break;case 1:a==="("?n=2:rc.test(a)?f():(m(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--);break;case 2:a===")"?l[l.length-1]=="\\"?l=l.slice(0,-1)+a:n=3:l+=a;break;case 3:m(),n=0,a!=="*"&&a!=="?"&&a!=="+"&&c--,l="";break;default:t("Unknown state");break}}return n===2&&t(`Unfinished custom RegExp for param "${g}"`),m(),i(),o}function sc(e,t,n){const r=ec(oc(e.path),n),o=X(r,{record:e,parent:t,children:[],alias:[]});return t&&!o.record.aliasOf==!t.record.aliasOf&&t.children.push(o),o}function ic(e,t){const n=[],r=new Map;t=wo({strict:!1,end:!0,sensitive:!1},t);function o(m){return r.get(m)}function s(m,f,h){const R=!h,C=vo(m);C.aliasOf=h&&h.record;const I=wo(t,m),F=[C];if("alias"in m){const T=typeof m.alias=="string"?[m.alias]:m.alias;for(const Z of T)F.push(vo(X({},C,{components:h?h.record.components:C.components,path:Z,aliasOf:h?h.record:C})))}let U,B;for(const T of F){const{path:Z}=T;if(f&&Z[0]!=="/"){const de=f.record.path,se=de[de.length-1]==="/"?"":"/";T.path=f.record.path+(Z&&se+Z)}if(U=sc(T,f,I),h?h.alias.push(U):(B=B||U,B!==U&&B.alias.push(U),R&&m.name&&!yo(U)&&i(m.name)),js(U)&&a(U),C.children){const de=C.children;for(let se=0;se<de.length;se++)s(de[se],U,h&&h.children[se])}h=h||U}return B?()=>{i(B)}:Jt}function i(m){if($s(m)){const f=r.get(m);f&&(r.delete(m),n.splice(n.indexOf(f),1),f.children.forEach(i),f.alias.forEach(i))}else{const f=n.indexOf(m);f>-1&&(n.splice(f,1),m.record.name&&r.delete(m.record.name),m.children.forEach(i),m.alias.forEach(i))}}function c(){return n}function a(m){const f=cc(m,n);n.splice(f,0,m),m.record.name&&!yo(m)&&r.set(m.record.name,m)}function g(m,f){let h,R={},C,I;if("name"in m&&m.name){if(h=r.get(m.name),!h)throw Ft(1,{location:m});I=h.record.name,R=X(xo(f.params,h.keys.filter(B=>!B.optional).concat(h.parent?h.parent.keys.filter(B=>B.optional):[]).map(B=>B.name)),m.params&&xo(m.params,h.keys.map(B=>B.name))),C=h.stringify(R)}else if(m.path!=null)C=m.path,h=n.find(B=>B.re.test(C)),h&&(R=h.parse(C),I=h.record.name);else{if(h=f.name?r.get(f.name):n.find(B=>B.re.test(f.path)),!h)throw Ft(1,{location:m,currentLocation:f});I=h.record.name,R=X({},f.params,m.params),C=h.stringify(R)}const F=[];let U=h;for(;U;)F.unshift(U.record),U=U.parent;return{name:I,path:C,params:R,matched:F,meta:ac(F)}}e.forEach(m=>s(m));function l(){n.length=0,r.clear()}return{addRoute:s,resolve:g,removeRoute:i,clearRoutes:l,getRoutes:c,getRecordMatcher:o}}function xo(e,t){const n={};for(const r of t)r in e&&(n[r]=e[r]);return n}function vo(e){const t={path:e.path,redirect:e.redirect,name:e.name,meta:e.meta||{},aliasOf:e.aliasOf,beforeEnter:e.beforeEnter,props:lc(e),children:e.children||[],instances:{},leaveGuards:new Set,updateGuards:new Set,enterCallbacks:{},components:"components"in e?e.components||null:e.component&&{default:e.component}};return Object.defineProperty(t,"mods",{value:{}}),t}function lc(e){const t={},n=e.props||!1;if("component"in e)t.default=n;else for(const r in e.components)t[r]=typeof n=="object"?n[r]:n;return t}function yo(e){for(;e;){if(e.record.aliasOf)return!0;e=e.parent}return!1}function ac(e){return e.reduce((t,n)=>X(t,n.meta),{})}function wo(e,t){const n={};for(const r in e)n[r]=r in t?t[r]:e[r];return n}function cc(e,t){let n=0,r=t.length;for(;n!==r;){const s=n+r>>1;qs(e,t[s])<0?r=s:n=s+1}const o=dc(e);return o&&(r=t.lastIndexOf(o,r-1)),r}function dc(e){let t=e;for(;t=t.parent;)if(js(t)&&qs(e,t)===0)return t}function js({record:e}){return!!(e.name||e.components&&Object.keys(e.components).length||e.redirect)}function uc(e){const t={};if(e===""||e==="?")return t;const r=(e[0]==="?"?e.slice(1):e).split("&");for(let o=0;o<r.length;++o){const s=r[o].replace(Hs," "),i=s.indexOf("="),c=sn(i<0?s:s.slice(0,i)),a=i<0?null:sn(s.slice(i+1));if(c in t){let g=t[c];Ve(g)||(g=t[c]=[g]),g.push(a)}else t[c]=a}return t}function ko(e){let t="";for(let n in e){const r=e[n];if(n=Ia(n),r==null){r!==void 0&&(t+=(t.length?"&":"")+n);continue}(Ve(r)?r.map(s=>s&&gr(s)):[r&&gr(r)]).forEach(s=>{s!==void 0&&(t+=(t.length?"&":"")+n,s!=null&&(t+="="+s))})}return t}function fc(e){const t={};for(const n in e){const r=e[n];r!==void 0&&(t[n]=Ve(r)?r.map(o=>o==null?null:""+o):r==null?r:""+r)}return t}const pc=Symbol(""),So=Symbol(""),$n=Symbol(""),Dr=Symbol(""),hr=Symbol("");function qt(){let e=[];function t(r){return e.push(r),()=>{const o=e.indexOf(r);o>-1&&e.splice(o,1)}}function n(){e=[]}return{add:t,list:()=>e.slice(),reset:n}}function ft(e,t,n,r,o,s=i=>i()){const i=r&&(r.enterCallbacks[o]=r.enterCallbacks[o]||[]);return()=>new Promise((c,a)=>{const g=f=>{f===!1?a(Ft(4,{from:n,to:t})):f instanceof Error?a(f):Qa(f)?a(Ft(2,{from:t,to:f})):(i&&r.enterCallbacks[o]===i&&typeof f=="function"&&i.push(f),c())},l=s(()=>e.call(r&&r.instances[o],t,n,g));let m=Promise.resolve(l);e.length<3&&(m=m.then(g)),m.catch(f=>a(f))})}function nr(e,t,n,r,o=s=>s()){const s=[];for(const i of e)for(const c in i.components){let a=i.components[c];if(!(t!=="beforeRouteEnter"&&!i.instances[c]))if(Ds(a)){const l=(a.__vccOpts||a)[t];l&&s.push(ft(l,n,r,i,c,o))}else{let g=a();s.push(()=>g.then(l=>{if(!l)throw new Error(`Couldn't resolve component "${c}" at "${i.path}"`);const m=ya(l)?l.default:l;i.mods[c]=l,i.components[c]=m;const h=(m.__vccOpts||m)[t];return h&&ft(h,n,r,i,c,o)()}))}}return s}function Co(e){const t=He($n),n=He(Dr),r=De(()=>{const a=S(e.to);return t.resolve(a)}),o=De(()=>{const{matched:a}=r.value,{length:g}=a,l=a[g-1],m=n.matched;if(!l||!m.length)return-1;const f=m.findIndex(Vt.bind(null,l));if(f>-1)return f;const h=_o(a[g-2]);return g>1&&_o(l)===h&&m[m.length-1].path!==h?m.findIndex(Vt.bind(null,a[g-2])):f}),s=De(()=>o.value>-1&&xc(n.params,r.value.params)),i=De(()=>o.value>-1&&o.value===n.matched.length-1&&Ls(n.params,r.value.params));function c(a={}){if(bc(a)){const g=t[S(e.replace)?"replace":"push"](S(e.to)).catch(Jt);return e.viewTransition&&typeof document<"u"&&"startViewTransition"in document&&document.startViewTransition(()=>g),g}return Promise.resolve()}return{route:r,href:De(()=>r.value.href),isActive:s,isExactActive:i,navigate:c}}function gc(e){return e.length===1?e[0]:e}const mc=Ct({name:"RouterLink",compatConfig:{MODE:3},props:{to:{type:[String,Object],required:!0},replace:Boolean,activeClass:String,exactActiveClass:String,custom:Boolean,ariaCurrentValue:{type:String,default:"page"},viewTransition:Boolean},useLink:Co,setup(e,{slots:t}){const n=Dn(Co(e)),{options:r}=He($n),o=De(()=>({[Po(e.activeClass,r.linkActiveClass,"router-link-active")]:n.isActive,[Po(e.exactActiveClass,r.linkExactActiveClass,"router-link-exact-active")]:n.isExactActive}));return()=>{const s=t.default&&gc(t.default(n));return e.custom?s:Is("a",{"aria-current":n.isExactActive?e.ariaCurrentValue:null,href:n.href,onClick:n.navigate,class:o.value},s)}}}),hc=mc;function bc(e){if(!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)&&!e.defaultPrevented&&!(e.button!==void 0&&e.button!==0)){if(e.currentTarget&&e.currentTarget.getAttribute){const t=e.currentTarget.getAttribute("target");if(/\b_blank\b/i.test(t))return}return e.preventDefault&&e.preventDefault(),!0}}function xc(e,t){for(const n in t){const r=t[n],o=e[n];if(typeof r=="string"){if(r!==o)return!1}else if(!Ve(o)||o.length!==r.length||r.some((s,i)=>s!==o[i]))return!1}return!0}function _o(e){return e?e.aliasOf?e.aliasOf.path:e.path:""}const Po=(e,t,n)=>e??t??n,vc=Ct({name:"RouterView",inheritAttrs:!1,props:{name:{type:String,default:"default"},route:Object},compatConfig:{MODE:3},setup(e,{attrs:t,slots:n}){const r=He(hr),o=De(()=>e.route||r.value),s=He(So,0),i=De(()=>{let g=S(s);const{matched:l}=o.value;let m;for(;(m=l[g])&&!m.components;)g++;return g}),c=De(()=>o.value.matched[i.value]);gn(So,De(()=>i.value+1)),gn(pc,c),gn(hr,o);const a=Un();return mn(()=>[a.value,c.value,e.name],([g,l,m],[f,h,R])=>{l&&(l.instances[m]=g,h&&h!==l&&g&&g===f&&(l.leaveGuards.size||(l.leaveGuards=h.leaveGuards),l.updateGuards.size||(l.updateGuards=h.updateGuards))),g&&l&&(!h||!Vt(l,h)||!f)&&(l.enterCallbacks[m]||[]).forEach(C=>C(g))},{flush:"post"}),()=>{const g=o.value,l=e.name,m=c.value,f=m&&m.components[l];if(!f)return Mo(n.default,{Component:f,route:g});const h=m.props[l],R=h?h===!0?g.params:typeof h=="function"?h(g):h:null,I=Is(f,X({},R,t,{onVnodeUnmounted:F=>{F.component.isUnmounted&&(m.instances[l]=null)},ref:a}));return Mo(n.default,{Component:I,route:g})||I}}});function Mo(e,t){if(!e)return null;const n=e(t);return n.length===1?n[0]:n}const yc=vc;function wc(e){const t=ic(e.routes,e),n=e.parseQuery||uc,r=e.stringifyQuery||ko,o=e.history,s=qt(),i=qt(),c=qt(),a=Pi(at);let g=at;Rt&&e.scrollBehavior&&"scrollRestoration"in history&&(history.scrollRestoration="manual");const l=er.bind(null,v=>""+v),m=er.bind(null,Ta),f=er.bind(null,sn);function h(v,O){let E,D;return $s(v)?(E=t.getRecordMatcher(v),D=O):D=v,t.addRoute(D,E)}function R(v){const O=t.getRecordMatcher(v);O&&t.removeRoute(O)}function C(){return t.getRoutes().map(v=>v.record)}function I(v){return!!t.getRecordMatcher(v)}function F(v,O){if(O=X({},O||a.value),typeof v=="string"){const b=tr(n,v,O.path),x=t.resolve({path:b.path},O),w=o.createHref(b.fullPath);return X(b,x,{params:f(x.params),hash:sn(b.hash),redirectedFrom:void 0,href:w})}let E;if(v.path!=null)E=X({},v,{path:tr(n,v.path,O.path).path});else{const b=X({},v.params);for(const x in b)b[x]==null&&delete b[x];E=X({},v,{params:m(b)}),O.params=m(O.params)}const D=t.resolve(E,O),ee=v.hash||"";D.params=l(f(D.params));const d=Ha(r,X({},v,{hash:Ra(ee),path:D.path})),u=o.createHref(d);return X({fullPath:d,hash:ee,query:r===ko?fc(v.query):v.query||{}},D,{redirectedFrom:void 0,href:u})}function U(v){return typeof v=="string"?tr(n,v,a.value.path):X({},v)}function B(v,O){if(g!==v)return Ft(8,{from:O,to:v})}function T(v){return se(v)}function Z(v){return T(X(U(v),{replace:!0}))}function de(v){const O=v.matched[v.matched.length-1];if(O&&O.redirect){const{redirect:E}=O;let D=typeof E=="function"?E(v):E;return typeof D=="string"&&(D=D.includes("?")||D.includes("#")?D=U(D):{path:D},D.params={}),X({query:v.query,hash:v.hash,params:D.path!=null?{}:v.params},D)}}function se(v,O){const E=g=F(v),D=a.value,ee=v.state,d=v.force,u=v.replace===!0,b=de(E);if(b)return se(X(U(b),{state:typeof b=="object"?X({},ee,b.state):ee,force:d,replace:u}),O||E);const x=E;x.redirectedFrom=O;let w;return!d&&Va(r,D,E)&&(w=Ft(16,{to:x,from:D}),Ge(D,D,!0,!1)),(w?Promise.resolve(w):Be(x,D)).catch(y=>Je(y)?Je(y,2)?y:lt(y):W(y,x,D)).then(y=>{if(y){if(Je(y,2))return se(X({replace:u},U(y.to),{state:typeof y.to=="object"?X({},ee,y.to.state):ee,force:d}),O||x)}else y=bt(x,D,!0,u,ee);return it(x,D,y),y})}function Fe(v,O){const E=B(v,O);return E?Promise.reject(E):Promise.resolve()}function st(v){const O=Mt.values().next().value;return O&&typeof O.runWithContext=="function"?O.runWithContext(v):v()}function Be(v,O){let E;const[D,ee,d]=kc(v,O);E=nr(D.reverse(),"beforeRouteLeave",v,O);for(const b of D)b.leaveGuards.forEach(x=>{E.push(ft(x,v,O))});const u=Fe.bind(null,v,O);return E.push(u),Re(E).then(()=>{E=[];for(const b of s.list())E.push(ft(b,v,O));return E.push(u),Re(E)}).then(()=>{E=nr(ee,"beforeRouteUpdate",v,O);for(const b of ee)b.updateGuards.forEach(x=>{E.push(ft(x,v,O))});return E.push(u),Re(E)}).then(()=>{E=[];for(const b of d)if(b.beforeEnter)if(Ve(b.beforeEnter))for(const x of b.beforeEnter)E.push(ft(x,v,O));else E.push(ft(b.beforeEnter,v,O));return E.push(u),Re(E)}).then(()=>(v.matched.forEach(b=>b.enterCallbacks={}),E=nr(d,"beforeRouteEnter",v,O,st),E.push(u),Re(E))).then(()=>{E=[];for(const b of i.list())E.push(ft(b,v,O));return E.push(u),Re(E)}).catch(b=>Je(b,8)?b:Promise.reject(b))}function it(v,O,E){c.list().forEach(D=>st(()=>D(v,O,E)))}function bt(v,O,E,D,ee){const d=B(v,O);if(d)return d;const u=O===at,b=Rt?history.state:{};E&&(D||u?o.replace(v.fullPath,X({scroll:u&&b&&b.scroll},ee)):o.push(v.fullPath,ee)),a.value=v,Ge(v,O,E,u),lt()}let Le;function Bt(){Le||(Le=o.listen((v,O,E)=>{if(!dn.listening)return;const D=F(v),ee=de(D);if(ee){se(X(ee,{replace:!0,force:!0}),D).catch(Jt);return}g=D;const d=a.value;Rt&&ja(po(d.fullPath,E.delta),Gn()),Be(D,d).catch(u=>Je(u,12)?u:Je(u,2)?(se(X(U(u.to),{force:!0}),D).then(b=>{Je(b,20)&&!E.delta&&E.type===ln.pop&&o.go(-1,!1)}).catch(Jt),Promise.reject()):(E.delta&&o.go(-E.delta,!1),W(u,D,d))).then(u=>{u=u||bt(D,d,!1),u&&(E.delta&&!Je(u,8)?o.go(-E.delta,!1):E.type===ln.pop&&Je(u,20)&&o.go(-1,!1)),it(D,d,u)}).catch(Jt)}))}let _t=qt(),ae=qt(),J;function W(v,O,E){lt(v);const D=ae.list();return D.length?D.forEach(ee=>ee(v,O,E)):console.error(v),Promise.reject(v)}function Ye(){return J&&a.value!==at?Promise.resolve():new Promise((v,O)=>{_t.add([v,O])})}function lt(v){return J||(J=!v,Bt(),_t.list().forEach(([O,E])=>v?E(v):O()),_t.reset()),v}function Ge(v,O,E,D){const{scrollBehavior:ee}=e;if(!Rt||!ee)return Promise.resolve();const d=!E&&za(po(v.fullPath,0))||(D||!E)&&history.state&&history.state.scroll||null;return ts().then(()=>ee(v,O,d)).then(u=>u&&qa(u)).catch(u=>W(u,v,O))}const ke=v=>o.go(v);let Pt;const Mt=new Set,dn={currentRoute:a,listening:!0,addRoute:h,removeRoute:R,clearRoutes:t.clearRoutes,hasRoute:I,getRoutes:C,resolve:F,options:e,push:T,replace:Z,go:ke,back:()=>ke(-1),forward:()=>ke(1),beforeEach:s.add,beforeResolve:i.add,afterEach:c.add,onError:ae.add,isReady:Ye,install(v){const O=this;v.component("RouterLink",hc),v.component("RouterView",yc),v.config.globalProperties.$router=O,Object.defineProperty(v.config.globalProperties,"$route",{enumerable:!0,get:()=>S(a)}),Rt&&!Pt&&a.value===at&&(Pt=!0,T(o.location).catch(ee=>{}));const E={};for(const ee in at)Object.defineProperty(E,ee,{get:()=>a.value[ee],enumerable:!0});v.provide($n,O),v.provide(Dr,Yo(E)),v.provide(hr,a);const D=v.unmount;Mt.add(v),v.unmount=function(){Mt.delete(v),Mt.size<1&&(g=at,Le&&Le(),Le=null,a.value=at,Pt=!1,J=!1),D()}}};function Re(v){return v.reduce((O,E)=>O.then(()=>st(E)),Promise.resolve())}return dn}function kc(e,t){const n=[],r=[],o=[],s=Math.max(t.matched.length,e.matched.length);for(let i=0;i<s;i++){const c=t.matched[i];c&&(e.matched.find(g=>Vt(g,c))?r.push(c):n.push(c));const a=e.matched[i];a&&(t.matched.find(g=>Vt(g,a))||o.push(a))}return[n,r,o]}function zs(){return He($n)}function Sc(e){return He(Dr)}const Cc={class:"min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800"},_c={class:"max-w-6xl mx-auto px-6 py-12"},Pc={class:"grid md:grid-cols-2 gap-8 mb-12"},Mc={class:"p-8"},Ec={class:"mb-4"},Ac={class:"text-2xl font-bold text-gray-900 dark:text-white"},Rc={class:"text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"},Ic={class:"flex items-center justify-end pt-4 border-t border-gray-200 dark:border-gray-700"},Oc=["onClick"],Tc=Ct({__name:"IndexPage",setup(e){const t=zs(),n=[{id:"core-setup",title:"Core Setup Guide",description:"Step-by-step Proxmox VE installation, ZFS pool creation, cluster setup, and storage configuration.",path:"/core-setup"},{id:"services-guide",title:"Services Setup Guide",description:"Complete homelab services deployment including development environments, monitoring, and media services.",path:"/services-guide"},{id:"gpu-passthrough",title:"GPU Passthrough Guide",description:"Complete RX 7800XT GPU passthrough setup for gaming VM with VFIO configuration and troubleshooting.",path:"/gpu-passthrough"},{id:"security-maintenance",title:"Security & Maintenance Guide",description:"Essential security hardening, user management, monitoring, and ongoing maintenance procedures.",path:"/security-maintenance"}],r=o=>{t.push(o)};return(o,s)=>(L(),$("div",Cc,[p("div",_c,[s[1]||(s[1]=p("div",{class:"text-center mb-12"},[p("h1",{class:"text-5xl font-bold text-gray-900 dark:text-white mb-4"}," Proxmox Homelab Documentation "),p("p",{class:"text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"}," Complete guides for setting up and managing your Proxmox homelab infrastructure. From basic installation to advanced service deployment. ")],-1)),p("div",Pc,[(L(),$(Ie,null,lr(n,i=>p("div",{key:i.id,class:"bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700"},[p("div",Mc,[p("div",Ec,[p("h2",Ac,j(i.title),1)]),p("p",Rc,j(i.description),1),p("div",Ic,[p("button",{onClick:c=>r(i.path),class:"flex items-center text-blue-600 dark:text-blue-400 font-medium hover:text-blue-800 dark:hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/90"},s[0]||(s[0]=[we(" Open Guide "),p("svg",{class:"w-4 h-4 ml-1",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1)]),8,Oc)])])])),64))]),s[2]||(s[2]=ce('<div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700"><h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-4"> Before You Begin </h2><div class="grid md:grid-cols-3 gap-6"><div class="text-center"><div class="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20"><path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"></path></svg></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Hardware Requirements</h3><p class="text-sm text-gray-600 dark:text-gray-300">PCs with adequate RAM, storage, GPU, and network connectivity</p></div><div class="text-center"><div class="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Network Setup</h3><p class="text-sm text-gray-600 dark:text-gray-300">10.10.10.0/24 VLAN with proper gateway configuration</p></div><div class="text-center"><div class="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mx-auto mb-3"><svg class="w-6 h-6 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg></div><h3 class="font-semibold text-gray-900 dark:text-white mb-2">Prerequisites</h3><p class="text-sm text-gray-600 dark:text-gray-300">Basic Linux knowledge and familiarity with virtualization concepts</p></div></div></div><footer class="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"><div class="text-center"><div class="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600 dark:text-gray-400"><div class="flex items-center space-x-1"><span>© Copyright 2025 All Rights Reserved</span></div><div class="flex items-center space-x-1"><span>Powered by</span><a href="https://www.proxmox.com/en/products/proxmox-virtual-environment/overview" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"> Proxmox VE 8.4 </a></div><div class="flex items-center space-x-2"><a href="https://github.com/avaera8775/proxmox-docs/" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-1 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-300 transition-colors"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path></svg><span>View on GitHub</span></a></div></div></div></footer>',2))])]))}}),ct=[{path:"/core-setup",name:"CoreSetup",title:"Core Setup Guide",description:"Proxmox installation, ZFS pools, and cluster setup"},{path:"/services-guide",name:"ServicesGuide",title:"Services Setup Guide",description:"Deploy homelab services and applications"},{path:"/gpu-passthrough",name:"GPUPassthrough",title:"GPU Passthrough Guide",description:"RX 7800XT passthrough for gaming VM"},{path:"/security-maintenance",name:"SecurityMaintenance",title:"Security & Maintenance Guide",description:"Hardening and ongoing maintenance"}];function Nn(){const e=zs(),t=Sc(),n=ct.findIndex(l=>l.path===t.path),r=ct[n],o=n>0?ct[n-1]:null,s=n<ct.length-1?ct[n+1]:null;return{currentGuide:r,previousGuide:o,nextGuide:s,navigateToHome:()=>{e.push("/")},navigateToPrevious:()=>{o&&e.push(o.path)},navigateToNext:()=>{s&&e.push(s.path)},getProgressInfo:()=>({current:n+1,total:ct.length,percentage:Math.round((n+1)/ct.length*100)}),guides:ct}}const Dc={class:"max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans"},Uc={class:"mb-8"},Hc={class:"mb-4"},Vc={class:"flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"},Fc={class:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"},Bc={class:"flex items-center justify-between"},Lc={class:"text-center"},Gc={class:"text-lg font-semibold text-gray-900 dark:text-gray-100"},$c={class:"text-sm text-gray-500 dark:text-gray-400"},Nc={key:1,class:"w-32"},qc={class:"mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"},jc={class:"flex items-center justify-between"},zc={key:1,class:"w-32"},Wc=Ct({__name:"CoreSetup",setup(e){const{currentGuide:t,nextGuide:n,navigateToHome:r,navigateToNext:o,getProgressInfo:s}=Nn(),i=s();return(c,a)=>{var g,l;return L(),$("main",Dc,[p("div",Uc,[p("div",Hc,[p("div",Vc,[p("span",null,"Step "+j(S(i).current)+" of "+j(S(i).total),1),p("span",null,j(S(i).percentage)+"% Complete",1)]),p("div",Fc,[p("div",{class:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:St({width:S(i).percentage+"%"})},null,4)])]),p("div",Bc,[p("button",{onClick:a[0]||(a[0]=(...m)=>S(r)&&S(r)(...m)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},a[4]||(a[4]=[p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1),we(" Back to Index ")])),p("div",Lc,[p("h2",Gc,j((g=S(t))==null?void 0:g.title),1),p("p",$c,j((l=S(t))==null?void 0:l.description),1)]),S(n)?(L(),$("button",{key:0,onClick:a[1]||(a[1]=(...m)=>S(o)&&S(o)(...m)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},[we(" Next: "+j(S(n).title.replace(" Guide",""))+" ",1),a[5]||(a[5]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",Nc))])]),a[7]||(a[7]=ce(`<h1 class="text-4xl font-bold mb-8 text-center">Step-by-Step Core Setup</h1><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">Step 1: Proxmox VE Installation</h2><p class="mb-4"><strong>Both Nodes:</strong></p><ul class="list-disc list-inside mb-4 space-y-1"><li>Download Proxmox VE 8.x ISO from proxmox.com</li><li>Create bootable USB with Rufus/Balena Etcher</li><li>Boot from USB on each system</li></ul><p class="font-semibold mb-2">Network Configuration During Install:</p><ul class="list-disc list-inside mb-4 space-y-1 pl-5"><li>PC1: IP 10.10.10.100, Gateway 10.10.10.1, DNS 10.10.10.1</li><li>PC2: IP 10.10.10.200, Gateway 10.10.10.1, DNS 10.10.10.1</li></ul><p>Complete installation with root password and email.</p></section><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">Step 2: ZFS Pool Creation</h2><article class="mb-6"><h3 class="text-xl font-semibold mb-2">PC1 (Mini PC - Ryzen 5500U, 64GB RAM, 2TB SSD):</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Identify the 2TB SSD
lsblk
# Expected: /dev/sda or /dev/nvme0n1 (2TB SSD)

# Create main storage pool on 2TB SSD
zpool create -o ashift=12 vm-storage /dev/sda

# Optimize for VMs and containers
zfs set compression=lz4 vm-storage
zfs set atime=off vm-storage
zfs set recordsize=64k vm-storage  # Good balance for VMs

# Create datasets for different workloads
zfs create vm-storage/vm-disks
zfs create vm-storage/containers  
zfs create vm-storage/backups
zfs create vm-storage/templates
        </code></pre></article><article><h3 class="text-xl font-semibold mb-2">PC2 (Gaming PC - Ryzen 7 9700X, 64GB RAM, RX 7800XT):</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
# Identify drives first
lsblk
# Expected layout:
# /dev/nvme0n1 - 500GB NVMe (Gaming VM - fastest)
# /dev/nvme1n1 - 500GB NVMe (Gaming VM mirror or separate)
# /dev/sda - 4TB HDD (Storage pool)
# /dev/sdb - 1TB SSD (Storage pool mirror)
# /dev/sdc - 250GB SSD (Cache/transcoding)

# Fast pool for gaming VM (500GB NVMe)
zpool create -o ashift=12 vm-fast /dev/nvme0n1
zfs set compression=lz4 vm-fast
zfs set atime=off vm-fast
zfs set recordsize=64k vm-fast  # Optimized for gaming workloads

# Storage pool (4TB HDD + 1TB SSD mirror for redundancy)
zpool create -o ashift=12 storage mirror /dev/sda /dev/sdb
# Add 250GB SSD as L2ARC cache for better read performance
zpool add storage cache /dev/sdc
zfs set compression=lz4 storage
zfs set atime=off storage

# Create datasets with specific optimizations
zfs create vm-fast/gaming-vm
zfs set recordsize=64k vm-fast/gaming-vm  # Gaming VM optimization

zfs create storage/media
zfs set recordsize=1M storage/media  # Large file optimization for media
zfs create storage/nextcloud
zfs create storage/backups
zfs create storage/transcoding-cache
zfs set recordsize=128k storage/transcoding-cache  # Video transcoding temp
        </code></pre></article></section><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">Step 3: Cluster Setup</h2><article class="mb-6"><h3 class="text-xl font-semibold mb-2">On PC1:</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
pvecm create homelab-cluster --link0 10.10.10.100
        </code></pre></article><article class="mb-6"><h3 class="text-xl font-semibold mb-2">On PC2:</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code>
pvecm add 10.10.10.100 --link0 10.10.10.200
        </code></pre></article><article><h3 class="text-xl font-semibold mb-2">Verify:</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code>
pvecm status
pvecm nodes
        </code></pre></article></section><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">Step 4: Storage Configuration in Web UI</h2><ul class="list-disc list-inside mb-4 space-y-1"><li>Access <a href="https://10.10.10.100:8006" class="text-blue-500 underline" target="_blank" rel="noopener">https://10.10.10.100:8006</a> or <a href="https://10.10.10.200:8006" class="text-blue-500 underline" target="_blank" rel="noopener">https://10.10.10.200:8006</a></li><li>Go to Datacenter → Storage → Add → ZFS</li><li>Add each pool: <ul class="list-disc list-inside ml-5 mt-1 space-y-1"><li><code>vm-storage</code> (PC1) - Enable VM disks, Containers, Backups</li><li><code>vm-fast</code> (PC2) - Enable VM disks only</li><li><code>storage</code> (PC2) - Enable Containers, Backups</li></ul></li></ul><p class="italic">Next Phase Ready</p><p>Core infrastructure complete. Ready for VM/container creation with individual static IPs as needed.</p><p class="mt-4 font-semibold">Perfect numbering scheme! The .100/.200 makes it easy to identify which node services are running on at a glance.</p></section><section class="mb-10 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg border border-gray-300 dark:border-gray-700"><h2 class="text-2xl font-semibold mb-4">Cluster Commands Explained</h2><article class="mb-4"><h3 class="text-xl font-semibold mb-2">Step 1: Create Cluster (PC1 only)</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm create homelab-cluster --link0 10.10.10.100
        </code></pre><p>This creates the cluster and makes PC1 the first member.</p></article><article class="mb-4"><h3 class="text-xl font-semibold mb-2">Step 2: Join Cluster (PC2 only)</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm add 10.10.10.100 --link0 10.10.10.200
        </code></pre><p>This joins PC2 to the existing cluster created on PC1. This IS the join command.</p></article><article><h3 class="text-xl font-semibold mb-2">Step 3: Verify Both Nodes Are Joined</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-2"><code>
pvecm status
pvecm nodes
        </code></pre><p>Run this on either node to confirm both are in the cluster.</p></article><p class="mt-4">So no separate join command needed - <code>pvecm add</code> handles the joining process completely.</p></section><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">Summary After Completing These Steps</h2><p>Exactly! After completing those 4 steps, you&#39;ll have:</p><ul class="list-disc list-inside space-y-1 mt-3"><li>✅ Both Proxmox nodes installed and networked</li><li>✅ ZFS pools created and optimized</li><li>✅ Cluster established and functioning</li><li>✅ Storage configured in web interface</li></ul><h3 class="text-xl font-semibold mt-6 mb-2">Ready for Next Phase</h3><p>You&#39;ll be able to immediately start:</p><ul class="list-disc list-inside space-y-1 mt-3"><li>Creating VMs with the hardware allocations we discussed</li><li>Creating LXC containers for lightweight services</li><li>Assigning specific IP addresses to each service</li><li>Setting up GPU passthrough preparation on PC2</li><li>Installing your development stack, PiHole, monitoring, etc.</li></ul></section><section class="mb-10 bg-gray-50 dark:bg-gray-800 p-5 rounded-lg border border-gray-300 dark:border-gray-700"><h2 class="text-2xl font-semibold mb-4">Quick Verification Checklist</h2><p>Before moving to VMs/LXC creation:</p><ul class="list-disc list-inside space-y-1 mt-3"><li>Both nodes visible in web UI: <a href="https://10.10.10.100:8006" target="_blank" rel="noopener" class="text-blue-600 underline">https://10.10.10.100:8006</a></li><li><code>pvecm status</code> shows 2 nodes online</li><li>All ZFS pools show &quot;Healthy&quot; in Storage tab</li><li>Can create test VM on each storage pool</li></ul><h3 class="text-xl font-semibold mt-6 mb-2">Resource Allocation Plan</h3><ul class="list-disc list-inside space-y-1 mt-3"><li><strong>PC1 (64GB total):</strong> Development VM (24GB), PiHole LXC (2GB), Monitoring LXC (8GB), Reverse Proxy LXC (2GB), Host reserves (28GB)</li><li><strong>PC2 (64GB total):</strong> Gaming VM (32GB + RX 7800XT), Storage/Media VM (20GB), Host reserves (12GB)</li></ul><p class="mt-4">The foundation will be solid and ready for your services!</p></section><section class="mb-10"><h2 class="text-2xl font-semibold mb-4">SMB Share Integration</h2><p>Add Samba to Storage VM Docker Compose</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code>version: &#39;3.8&#39;
services:
  nextcloud-db:
    image: mariadb:10.6
    restart: unless-stopped
    environment:
      MYSQL_ROOT_PASSWORD: rootpass123
      MYSQL_PASSWORD: nextcloud123
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
    volumes:
      - nextcloud_db:/var/lib/mysql

  nextcloud:
    image: nextcloud:latest
    restart: unless-stopped
    ports:
      - &quot;8080:80&quot;
    links:
      - nextcloud-db
    volumes:
      - nextcloud_data:/var/www/html
      - /mnt/storage/nextcloud:/var/www/html/data
      - /mnt/storage/shared:/mnt/shared  # Shared folder accessible in Nextcloud
    environment:
      MYSQL_PASSWORD: nextcloud123
      MYSQL_DATABASE: nextcloud
      MYSQL_USER: nextcloud
      MYSQL_HOST: nextcloud-db

  jellyfin:
    image: jellyfin/jellyfin:latest
    restart: unless-stopped
    ports:
      - &quot;8096:8096&quot;
    volumes:
      - jellyfin_config:/config
      - jellyfin_cache:/cache
      - /mnt/storage/media:/media

  samba:
    image: dperson/samba:latest
    restart: unless-stopped
    ports:
      - &quot;139:139&quot;
      - &quot;445:445&quot;
    volumes:
      - /mnt/storage/shared:/shared
      - /mnt/storage/gaming-footage:/gaming-footage
      - /mnt/storage/media:/media:ro  # Read-only access to media
    command: &gt;
      -s &quot;Shared;/shared;yes;no;no;all;none;;&quot; 
      -s &quot;Gaming Footage;/gaming-footage;yes;no;no;all;none;;&quot; 
      -s &quot;Media;/media;yes;yes;no;all;none;;&quot; 
      -u &quot;homelab;homelab123&quot;
    environment:
      - USERID=1000
      - GROUPID=1000

volumes:
  nextcloud_db:
  nextcloud_data:
  jellyfin_config:
  jellyfin_cache:
</code></pre><h3 class="text-xl font-semibold mb-2">Directory Structure on Storage VM</h3><p>Create the directory structure:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># SSH into storage VM (10.10.10.202)
sudo mkdir -p /mnt/storage/{nextcloud,shared,gaming-footage,media}
sudo chown -R 1000:1000 /mnt/storage/
      </code></pre><h3 class="text-xl font-semibold mb-2">ZFS Dataset Organization (Optional Enhancement)</h3><p>If you want better organization, you can create specific ZFS datasets:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># On PC2 Proxmox host
zfs create storage/shared
zfs create storage/gaming-footage  
zfs create storage/media
zfs create storage/nextcloud

# Then mount these in the VM
# Add to VM&#39;s /etc/fstab or use bind mounts
      </code></pre><p>This helps keep data organized and provides flexibility for snapshots/backups per dataset.</p></section>`,9)),p("section",qc,[p("div",jc,[p("button",{onClick:a[2]||(a[2]=(...m)=>S(r)&&S(r)(...m)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," Back To Index "),S(n)?(L(),$("button",{key:0,onClick:a[3]||(a[3]=(...m)=>S(o)&&S(o)(...m)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"},[we(j(S(n).title)+" ",1),a[6]||(a[6]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",zc))])])])}}}),Xc={class:"max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans"},Kc={class:"mb-8"},Yc={class:"mb-4"},Qc={class:"flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"},Jc={class:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"},Zc={class:"flex items-center justify-between"},ed={class:"text-center"},td={class:"text-lg font-semibold text-gray-900 dark:text-gray-100"},nd={class:"text-sm text-gray-500 dark:text-gray-400"},rd={key:1,class:"w-32"},od={class:"mb-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg border border-blue-200 dark:border-blue-800"},sd={class:"grid md:grid-cols-2 gap-6"},id={class:"space-y-2"},ld={class:"font-medium"},ad={class:"text-sm text-gray-600 dark:text-gray-400"},cd={class:"space-y-2"},dd={class:"font-medium"},ud={class:"ml-2 px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300"},fd={class:"text-sm text-gray-600 dark:text-gray-400"},pd={class:"mb-8"},gd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},md={class:"mb-8"},hd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},bd={class:"mb-8"},xd={class:"mt-4 space-y-6"},vd={class:"mb-8"},yd={class:"mt-4 space-y-6"},wd={class:"mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"},kd={class:"flex items-center justify-between"},Sd={key:1,class:"w-32"},Cd={key:3,class:"w-32"},_d=Ct({__name:"ServicesGuide",setup(e){const{currentGuide:t,nextGuide:n,previousGuide:r,navigateToHome:o,navigateToNext:s,navigateToPrevious:i,getProgressInfo:c}=Nn(),a=c(),g=[{name:"Development VM",ip:"10.10.10.101",node:"PVE-PC1",type:"VM",purpose:"Python, Java, Docker dev"},{name:"PiHole",ip:"10.10.10.102",node:"PVE-PC1",type:"LXC",purpose:"DNS filtering"},{name:"Monitoring Stack",ip:"10.10.10.103",node:"PVE-PC1",type:"LXC",purpose:"Prometheus, Grafana"},{name:"Reverse Proxy",ip:"10.10.10.104",node:"PVE-PC1",type:"LXC",purpose:"Traefik/Nginx"},{name:"Documentation Server",ip:"10.10.10.105",node:"PVE-PC1",type:"LXC",purpose:"MkDocs documentation"},{name:"Homepage Dashboard",ip:"10.10.10.106",node:"PVE-PC1",type:"LXC",purpose:"Service dashboard"},{name:"Radarr",ip:"10.10.10.107",node:"PVE-PC1",type:"LXC",purpose:"Movie management"},{name:"Forgejo",ip:"10.10.10.108",node:"PVE-PC1",type:"LXC",purpose:"Git repository hosting"},{name:"Gaming VM",ip:"10.10.10.201",node:"PVE-PC2",type:"VM",purpose:"Windows + GPU passthrough"},{name:"Storage/Media VM",ip:"10.10.10.202",node:"PVE-PC2",type:"VM",purpose:"Nextcloud, Jellyfin"}],l=Un({postInstall:!0,prerequisites:!1,pc1:!1,pc2:!1,domains:!1,production:!1,backup:!1,verification:!1}),m=f=>{l.value[f]=!l.value[f]};return(f,h)=>{var R,C;return L(),$("main",Xc,[p("div",Kc,[p("div",Yc,[p("div",Qc,[p("span",null,"Step "+j(S(a).current)+" of "+j(S(a).total),1),p("span",null,j(S(a).percentage)+"% Complete",1)]),p("div",Jc,[p("div",{class:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:St({width:S(a).percentage+"%"})},null,4)])]),p("div",Zc,[p("button",{onClick:h[0]||(h[0]=(...I)=>S(o)&&S(o)(...I)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},h[9]||(h[9]=[p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1),we(" Back to Index ")])),p("div",ed,[p("h2",td,j((R=S(t))==null?void 0:R.title),1),p("p",nd,j((C=S(t))==null?void 0:C.description),1)]),S(n)?(L(),$("button",{key:0,onClick:h[1]||(h[1]=(...I)=>S(s)&&S(s)(...I)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},[we(j(S(n).title)+" ",1),h[10]||(h[10]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L15.586 11H4a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",rd))])]),h[28]||(h[28]=p("h1",{class:"text-4xl font-bold mb-8 text-center"},"Services & Applications Guide",-1)),p("div",od,[h[13]||(h[13]=p("h2",{class:"text-2xl font-semibold mb-4"},"Service Overview",-1)),p("div",sd,[p("div",null,[h[11]||(h[11]=p("h3",{class:"text-lg font-medium mb-3"},"PVE-PC1 Services (Development & Infrastructure)",-1)),p("div",id,[(L(!0),$(Ie,null,lr(g.filter(I=>I.node==="PVE-PC1"),I=>(L(),$("div",{key:I.ip,class:"flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},[p("div",null,[p("span",ld,j(I.name),1),p("span",{class:ie(["ml-2 px-2 py-1 text-xs rounded-full",I.type==="VM"?"bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300":"bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"])},j(I.type),3)]),p("span",ad,j(I.ip),1)]))),128))])]),p("div",null,[h[12]||(h[12]=p("h3",{class:"text-lg font-medium mb-3"},"PVE-PC2 Services (Gaming & Storage)",-1)),p("div",cd,[(L(!0),$(Ie,null,lr(g.filter(I=>I.node==="PVE-PC2"),I=>(L(),$("div",{key:I.ip,class:"flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},[p("div",null,[p("span",dd,j(I.name),1),p("span",ud,j(I.type),1)]),p("span",fd,j(I.ip),1)]))),128))])])])]),p("section",pd,[p("button",{onClick:h[2]||(h[2]=I=>m("postInstall")),class:"w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"},[h[15]||(h[15]=p("h2",{class:"text-2xl font-semibold text-yellow-900 dark:text-yellow-100"},"🔧 Post-Install Configuration",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-yellow-600 dark:text-yellow-400 transform transition-transform",{"rotate-180":l.value.postInstall}]),fill:"currentColor",viewBox:"0 0 20 20"},h[14]||(h[14]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",gd,h[16]||(h[16]=[ce(`<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"><h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📋 Important First Step</h4><p class="text-blue-700 dark:text-blue-300 text-sm"> Complete this configuration on both Proxmox nodes before proceeding with service installation. This removes the subscription nag and ensures a clean UI experience. </p></div><h3 class="text-xl font-semibold mb-4">Remove Proxmox Subscription Nag</h3><p class="text-gray-600 dark:text-gray-400 mb-4"> This script automatically removes the subscription warning that appears in the Proxmox web interface and ensures it stays removed after updates: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># SSH into each Proxmox node
ssh root@10.10.10.100  # PVE-PC1
ssh root@10.10.10.200  # PVE-PC2

# Create the script that removes the nag after updates
echo &#39;DPkg::Post-Invoke { &quot;dpkg -V proxmox-widget-toolkit | grep -q &#39;/proxmoxlib\\.js$&#39;; if [ \\$? -eq 1 ]; then { echo &#39;Removing subscription nag from UI...&#39;; sed -i &#39;/.*data\\.status.*{/{s/\\!//;s/active/NoMoreNagging/}&#39; /usr/share/javascript/proxmox-widget-toolkit/proxmoxlib.js; }; fi&quot;; };&#39; &gt; /etc/apt/apt.conf.d/no-nag-script

# Apply the fix immediately
apt --reinstall install proxmox-widget-toolkit</code></pre><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6"><h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">✅ What This Does</h4><ul class="text-sm space-y-1 text-green-700 dark:text-green-300"><li>• <strong>Removes subscription warning</strong> from Proxmox web interface</li><li>• <strong>Automatically reapplies fix</strong> after system updates</li><li>• <strong>Persistent solution</strong> that survives package updates</li><li>• <strong>No manual intervention</strong> required after initial setup</li></ul></div><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"><h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Important Notes</h4><ul class="text-sm space-y-1 text-yellow-700 dark:text-yellow-300"><li>• Run this command on <strong>both Proxmox nodes</strong> (PVE-PC1 and PVE-PC2)</li><li>• The fix is applied automatically after each system update</li><li>• Refresh your browser after running the command to see the changes</li><li>• This is for homelab use - consider purchasing a subscription for production environments</li></ul></div>`,6)]),512),[[fe,l.value.postInstall]])]),p("section",md,[p("button",{onClick:h[3]||(h[3]=I=>m("prerequisites")),class:"w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"},[h[18]||(h[18]=p("h2",{class:"text-2xl font-semibold text-blue-900 dark:text-blue-100"},"Prerequisites",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform",{"rotate-180":l.value.prerequisites}]),fill:"currentColor",viewBox:"0 0 20 20"},h[17]||(h[17]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",hd,h[19]||(h[19]=[ce(`<div class="grid md:grid-cols-2 gap-6"><div><h3 class="text-lg font-semibold mb-3">Required Setup</h3><ul class="space-y-2 text-sm"><li class="flex items-center"><svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Core Proxmox setup completed </li><li class="flex items-center"><svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Network configuration (10.10.10.0/24) </li><li class="flex items-center"><svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> ZFS storage pools configured </li><li class="flex items-center"><svg class="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path></svg> Security hardening applied </li></ul></div><div><h3 class="text-lg font-semibold mb-3">Download Templates</h3><p class="text-sm text-gray-600 dark:text-gray-400 mb-3">Download these container templates before starting:</p><pre class="bg-gray-800 text-green-400 p-3 rounded text-xs"><code># In Proxmox web UI, go to:
# Node → local (storage) → CT Templates
# Download these templates:
- Ubuntu 22.04 Standard
- Ubuntu 20.04 Standard
- Debian 12 Standard</code></pre></div></div>`,1)]),512),[[fe,l.value.prerequisites]])]),p("section",bd,[p("button",{onClick:h[4]||(h[4]=I=>m("pc1")),class:"w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"},[h[21]||(h[21]=p("h2",{class:"text-2xl font-semibold text-green-900 dark:text-green-100"},"PVE-PC1 Services Implementation",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform",{"rotate-180":l.value.pc1}]),fill:"currentColor",viewBox:"0 0 20 20"},h[20]||(h[20]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",xd,h[22]||(h[22]=[ce(`<div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-4">Homepage Dashboard LXC (10.10.10.106)</h3><p class="mb-4">Modern service dashboard with status monitoring:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 106
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 20GB on vm-storage
# Network: Static IP 10.10.10.106
# Features: nesting=1 (enable during creation)

# Install Docker
sudo apt update &amp;&amp; sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create homepage dashboard
mkdir -p ~/homepage
cd ~/homepage

# Create Docker Compose configuration
cat &gt; docker-compose.yml &lt;&lt; &#39;EOF&#39;
version: &#39;3.8&#39;
services:
  homepage:
    image: ghcr.io/gethomepage/homepage:latest
    container_name: homepage
    ports:
      - &quot;3000:3000&quot;
    volumes:
      - ./config:/app/config
      - /var/run/docker.sock:/var/run/docker.sock:ro
    restart: unless-stopped
    environment:
      - PUID=1000
      - PGID=1000
EOF

# Create configuration directory
mkdir -p config

# Create main configuration
cat &gt; config/settings.yaml &lt;&lt; &#39;EOF&#39;
title: Homelab Dashboard
favicon: https://cdn.jsdelivr.net/gh/walkxcode/dashboard-icons/png/homepage.png
theme: dark
color: slate
headerStyle: clean
layout:
  Infrastructure:
    style: row
    columns: 3
  Media &amp; Storage:
    style: row
    columns: 2
  Development:
    style: row
    columns: 2
  Monitoring:
    style: row
    columns: 2
EOF

# Create services configuration
cat &gt; config/services.yaml &lt;&lt; &#39;EOF&#39;
- Infrastructure:
    - Proxmox PVE-PC1:
        href: https://10.10.10.100:8006
        description: Development &amp; Services Node
        icon: proxmox.png
        ping: 10.10.10.100
    - Proxmox PVE-PC2:
        href: https://10.10.10.200:8006
        description: Gaming &amp; Storage Node
        icon: proxmox.png
        ping: 10.10.10.200
    - PiHole:
        href: http://10.10.10.102/admin
        description: DNS Ad Blocking
        icon: pi-hole.png
        ping: 10.10.10.102
        widget:
          type: pihole
          url: http://10.10.10.102
          key: your-api-key-here

- Media &amp; Storage:
    - Jellyfin:
        href: http://10.10.10.202:8096
        description: Media Server
        icon: jellyfin.png
        ping: 10.10.10.202
        widget:
          type: jellyfin
          url: http://10.10.10.202:8096
          key: your-api-key-here
    - Nextcloud:
        href: http://10.10.10.202:8080
        description: Cloud Storage
        icon: nextcloud.png
        ping: 10.10.10.202
    - Radarr:
        href: http://10.10.10.107:7878
        description: Movie Management
        icon: radarr.png
        ping: 10.10.10.107
        widget:
          type: radarr
          url: http://10.10.10.107:7878
          key: your-api-key-here

- Development:
    - Forgejo:
        href: http://10.10.10.108:3000
        description: Git Repository
        icon: forgejo.png
        ping: 10.10.10.108
    - Development VM:
        href: ssh://10.10.10.101
        description: Dev Environment
        icon: ubuntu.png
        ping: 10.10.10.101

- Monitoring:
    - Grafana:
        href: http://10.10.10.103:3000
        description: Metrics Dashboard
        icon: grafana.png
        ping: 10.10.10.103
    - Prometheus:
        href: http://10.10.10.103:9090
        description: Metrics Collection
        icon: prometheus.png
        ping: 10.10.10.103
EOF

# Start the service
docker-compose up -d

echo &quot;Homepage Dashboard setup complete!&quot;
echo &quot;Access at: http://10.10.10.106:3000&quot;</code></pre><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🏠 Homepage Features</h4><ul class="text-sm space-y-1"><li>• <strong>Service Dashboard:</strong> Central hub for all homelab services</li><li>• <strong>Status Monitoring:</strong> Real-time ping status for all services</li><li>• <strong>Widgets:</strong> Live data from PiHole, Jellyfin, Radarr, etc.</li><li>• <strong>Search Integration:</strong> Quick web search functionality</li><li>• <strong>Resource Monitoring:</strong> System resource usage display</li><li>• <strong>Bookmarks:</strong> Quick access to frequently used links</li><li>• <strong>Dark Theme:</strong> Modern, clean interface</li></ul></div></div><div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-4">Radarr LXC (10.10.10.107)</h3><p class="mb-4">Movie collection management and automation:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 107
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 2048 MB (2GB)
# Storage: 30GB on vm-storage
# Network: Static IP 10.10.10.107
# Features: nesting=1 (enable during creation)

# Install Docker
sudo apt update &amp;&amp; sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create Radarr setup
mkdir -p ~/radarr
cd ~/radarr

# Create Docker Compose configuration
cat &gt; docker-compose.yml &lt;&lt; &#39;EOF&#39;
version: &#39;3.8&#39;
services:
  radarr:
    image: lscr.io/linuxserver/radarr:latest
    container_name: radarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Stockholm
    volumes:
      - ./config:/config
      - /mnt/media:/movies
      - /mnt/downloads:/downloads
    ports:
      - &quot;7878:7878&quot;
    restart: unless-stopped

  # Optional: Add Prowlarr for indexer management
  prowlarr:
    image: lscr.io/linuxserver/prowlarr:latest
    container_name: prowlarr
    environment:
      - PUID=1000
      - PGID=1000
      - TZ=Europe/Stockholm
    volumes:
      - ./prowlarr-config:/config
    ports:
      - &quot;9696:9696&quot;
    restart: unless-stopped
EOF

# Create mount points (these should be mounted from your storage VM)
sudo mkdir -p /mnt/{media,downloads}

# Note: You&#39;ll need to mount these from your storage VM
# Example NFS mounts (add to /etc/fstab):
# 10.10.10.202:/mnt/storage/media /mnt/media nfs defaults 0 0
# 10.10.10.202:/mnt/storage/downloads /mnt/downloads nfs defaults 0 0

# Start services
docker-compose up -d

echo &quot;Radarr setup complete!&quot;
echo &quot;Access Radarr at: http://10.10.10.107:7878&quot;
echo &quot;Access Prowlarr at: http://10.10.10.107:9696&quot;</code></pre><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🎬 Radarr Configuration</h4><p class="text-sm mb-2">Essential setup steps:</p><ol class="text-sm space-y-1 list-decimal list-inside"><li>Configure root folders: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">/movies</code></li><li>Add indexers (via Prowlarr or manually)</li><li>Configure download client (qBittorrent recommended)</li><li>Set up quality profiles (1080p, 4K, etc.)</li><li>Configure naming conventions for organized library</li><li>Connect to Jellyfin for automatic library updates</li></ol></div></div><div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-4">Forgejo LXC (10.10.10.108)</h3><p class="mb-4">Self-hosted Git repository with web interface:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create LXC via Proxmox Web UI:
# CT ID: 108
# Template: Ubuntu 22.04
# CPU: 2 cores
# Memory: 4096 MB (4GB)
# Storage: 50GB on vm-storage
# Network: Static IP 10.10.10.108

# Install Docker
sudo apt update &amp;&amp; sudo apt install -y docker.io docker-compose git
sudo usermod -aG docker $USER

# Create Forgejo setup
mkdir -p ~/forgejo
cd ~/forgejo

# Create Docker Compose configuration
cat &gt; docker-compose.yml &lt;&lt; &#39;EOF&#39;
version: &#39;3.8&#39;
services:
  forgejo:
    image: codeberg.org/forgejo/forgejo:1.21
    container_name: forgejo
    environment:
      - USER_UID=1000
      - USER_GID=1000
      - FORGEJO__database__DB_TYPE=postgres
      - FORGEJO__database__HOST=db:5432
      - FORGEJO__database__NAME=forgejo
      - FORGEJO__database__USER=forgejo
      - FORGEJO__database__PASSWD=forgejo_password
    restart: unless-stopped
    volumes:
      - ./data:/data
      - /etc/timezone:/etc/timezone:ro
      - /etc/localtime:/etc/localtime:ro
    ports:
      - &quot;3000:3000&quot;
      - &quot;2222:22&quot;
    depends_on:
      - db

  db:
    image: postgres:15
    restart: unless-stopped
    environment:
      - POSTGRES_USER=forgejo
      - POSTGRES_PASSWORD=forgejo_password
      - POSTGRES_DB=forgejo
    volumes:
      - ./postgres:/var/lib/postgresql/data
    expose:
      - &quot;5432&quot;
EOF

# Create data directories
mkdir -p {data,postgres}

# Start services
docker-compose up -d

echo &quot;Forgejo setup complete!&quot;
echo &quot;Access at: http://10.10.10.108:3000&quot;</code></pre><div class="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-purple-900 dark:text-purple-100 mb-2">🔧 Forgejo Configuration</h4><div class="grid md:grid-cols-2 gap-4"><div><h5 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Initial Setup:</h5><ul class="text-sm space-y-1"><li>• Database: PostgreSQL (pre-configured)</li><li>• Site Title: &quot;Homelab Git&quot;</li><li>• SSH Port: 2222</li><li>• Admin Account: Create during setup</li></ul></div><div><h5 class="font-medium text-purple-700 dark:text-purple-300 mb-2">Git Access:</h5><ul class="text-sm space-y-1"><li>• HTTP: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">http://10.10.10.108:3000</code></li><li>• SSH: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">git@10.10.10.108:2222</code></li><li>• Clone: <code class="bg-gray-200 dark:bg-gray-700 px-1 rounded">git clone http://10.10.10.108:3000/user/repo.git</code></li></ul></div></div></div></div>`,3)]),512),[[fe,l.value.pc1]])]),p("section",vd,[p("button",{onClick:h[5]||(h[5]=I=>m("pc2")),class:"w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"},[h[24]||(h[24]=p("h2",{class:"text-2xl font-semibold text-purple-900 dark:text-purple-100"},"PVE-PC2 Services Implementation",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform",{"rotate-180":l.value.pc2}]),fill:"currentColor",viewBox:"0 0 20 20"},h[23]||(h[23]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",yd,h[25]||(h[25]=[ce(`<div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-4">Gaming VM (10.10.10.201)</h3><p class="mb-4">Windows VM with GPU passthrough for gaming and high-performance applications:</p><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6"><h4 class="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">⚠️ Prerequisites</h4><ul class="text-sm space-y-1 text-yellow-700 dark:text-yellow-300"><li>• Complete GPU passthrough setup from the GPU Passthrough Guide</li><li>• Ensure IOMMU is enabled and GPU is isolated</li><li>• Have Windows 11 ISO ready</li><li>• Dedicated GPU for passthrough (not the one used by Proxmox host)</li></ul></div><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 201
# Name: Gaming-VM
# OS: Microsoft Windows
# ISO: Windows 11 (upload to local storage)
# System: 
#   - Machine: q35
#   - BIOS: OVMF (UEFI)
#   - Add EFI Disk: Yes
#   - SCSI Controller: VirtIO SCSI single
# Hard Disk:
#   - Bus/Device: SCSI 0
#   - Storage: vm-storage
#   - Size: 500GB (or more for games)
#   - Cache: Write back
# CPU:
#   - Sockets: 1
#   - Cores: 8 (adjust based on your CPU)
#   - Type: host
# Memory: 16384 MB (16GB) - adjust based on available RAM
# Network:
#   - Bridge: vmbr0
#   - Model: VirtIO (paravirtualized)
#   - Static IP: 10.10.10.201

# After VM creation, add GPU passthrough via CLI:
# Replace with your actual GPU PCI IDs
qm set 201 -hostpci0 01:00,pcie=1,x-vga=1
qm set 201 -hostpci1 01:00.1,pcie=1  # GPU audio if separate

# Add USB controller for peripherals
qm set 201 -usb0 host=1-1  # Adjust USB port as needed

# Start VM and install Windows
qm start 201</code></pre><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">🎮 Post-Installation Steps</h4><ol class="text-sm space-y-1 list-decimal list-inside"><li>Install Windows 11 and complete initial setup</li><li>Install GPU drivers (NVIDIA/AMD)</li><li>Install VirtIO drivers for optimal performance</li><li>Configure Windows for gaming (disable Windows Defender real-time protection for game folders)</li><li>Install Steam, Epic Games, or other game platforms</li><li>Configure network settings (static IP: 10.10.10.201)</li><li>Set up remote access (RDP) for management</li></ol></div><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🔧 Performance Optimization</h4><ul class="text-sm space-y-1"><li>• <strong>CPU Pinning:</strong> Pin VM cores to physical cores for better performance</li><li>• <strong>Hugepages:</strong> Configure hugepages for reduced memory latency</li><li>• <strong>CPU Governor:</strong> Set host CPU governor to &#39;performance&#39;</li><li>• <strong>Disk Cache:</strong> Use &#39;Write back&#39; cache mode for better disk performance</li><li>• <strong>Network:</strong> Use VirtIO network driver for best network performance</li></ul></div></div><div class="p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"><h3 class="text-xl font-semibold mb-4">Storage/Media VM (10.10.10.202)</h3><p class="mb-4">Ubuntu VM hosting Nextcloud and Jellyfin for file storage and media streaming:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create VM via Proxmox Web UI:
# VM ID: 202
# Name: Storage-Media-VM
# OS: Linux
# ISO: Ubuntu 22.04 Server
# System: Default (i440fx is fine for Linux)
# Hard Disk:
#   - Bus/Device: SCSI 0
#   - Storage: vm-storage
#   - Size: 100GB (for OS and applications)
#   - Additional disk for data: 1TB+ (adjust based on needs)
# CPU:
#   - Sockets: 1
#   - Cores: 4
#   - Type: host
# Memory: 8192 MB (8GB)
# Network:
#   - Bridge: vmbr0
#   - Model: VirtIO
#   - Static IP: 10.10.10.202

# After Ubuntu installation, update system
sudo apt update &amp;&amp; sudo apt upgrade -y

# Install Docker and Docker Compose
sudo apt install -y docker.io docker-compose
sudo usermod -aG docker $USER

# Create directory structure
mkdir -p ~/services/{nextcloud,jellyfin}
mkdir -p ~/data/{nextcloud,media}/{config,data}

# Set up storage mount points
sudo mkdir -p /mnt/storage
# If using additional disk, format and mount it
# sudo mkfs.ext4 /dev/sdb1
# echo &#39;/dev/sdb1 /mnt/storage ext4 defaults 0 0&#39; | sudo tee -a /etc/fstab
# sudo mount -a</code></pre><h4 class="text-lg font-semibold mb-3 mt-6">Nextcloud Setup</h4><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create Nextcloud Docker Compose
cd ~/services/nextcloud

cat &gt; docker-compose.yml &lt;&lt; &#39;EOF&#39;
version: &#39;3.8&#39;
services:
  nextcloud-db:
    image: mariadb:10.11
    container_name: nextcloud-db
    restart: unless-stopped
    command: --transaction-isolation=READ-COMMITTED --log-bin=binlog --binlog-format=ROW
    volumes:
      - ./db:/var/lib/mysql
    environment:
      - MYSQL_ROOT_PASSWORD=nextcloud_root_password
      - MYSQL_PASSWORD=nextcloud_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud

  nextcloud:
    image: nextcloud:latest
    container_name: nextcloud
    restart: unless-stopped
    ports:
      - &quot;8080:80&quot;
    links:
      - nextcloud-db
    volumes:
      - ./data:/var/www/html
      - /mnt/storage/nextcloud:/var/www/html/data
    environment:
      - MYSQL_PASSWORD=nextcloud_password
      - MYSQL_DATABASE=nextcloud
      - MYSQL_USER=nextcloud
      - MYSQL_HOST=nextcloud-db
    depends_on:
      - nextcloud-db
EOF

# Start Nextcloud
docker-compose up -d

echo &quot;Nextcloud setup complete!&quot;
echo &quot;Access at: http://10.10.10.202:8080&quot;
echo &quot;Complete setup via web interface&quot;</code></pre><h4 class="text-lg font-semibold mb-3 mt-6">Jellyfin Setup</h4><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create Jellyfin Docker Compose
cd ~/services/jellyfin

cat &gt; docker-compose.yml &lt;&lt; &#39;EOF&#39;
version: &#39;3.8&#39;
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    container_name: jellyfin
    restart: unless-stopped
    ports:
      - &quot;8096:8096&quot;
      - &quot;8920:8920&quot;  # HTTPS
      - &quot;7359:7359/udp&quot;  # Auto-discovery
      - &quot;1900:1900/udp&quot;  # DLNA
    volumes:
      - ./config:/config
      - ./cache:/cache
      - /mnt/storage/media:/media:ro
    environment:
      - JELLYFIN_PublishedServerUrl=http://10.10.10.202:8096
    # Optional: Hardware acceleration (uncomment if supported)
    # devices:
    #   - /dev/dri:/dev/dri
    # group_add:
    #   - &quot;109&quot;  # render group
EOF

# Create media directory structure
sudo mkdir -p /mnt/storage/media/{movies,tv,music,photos}

# Start Jellyfin
docker-compose up -d

echo &quot;Jellyfin setup complete!&quot;
echo &quot;Access at: http://10.10.10.202:8096&quot;
echo &quot;Complete setup via web interface&quot;</code></pre><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-blue-900 dark:text-blue-100 mb-2">📁 Storage Organization</h4><div class="text-sm"><p class="mb-2">Recommended directory structure:</p><pre class="bg-gray-200 dark:bg-gray-700 p-2 rounded text-xs"><code>/mnt/storage/
├── nextcloud/          # Nextcloud user data
├── media/
│   ├── movies/         # Movie files for Jellyfin
│   ├── tv/            # TV show files for Jellyfin
│   ├── music/         # Music files for Jellyfin
│   └── photos/        # Photo collections
└── downloads/         # Download staging area</code></pre></div></div><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-4"><h4 class="font-semibold text-green-900 dark:text-green-100 mb-2">🔧 Configuration Tips</h4><ul class="text-sm space-y-1"><li>• <strong>Nextcloud:</strong> Configure external storage to access media files</li><li>• <strong>Jellyfin:</strong> Add media libraries pointing to /media subdirectories</li><li>• <strong>Backup:</strong> Regular backups of configuration and database files</li><li>• <strong>Security:</strong> Configure reverse proxy with SSL certificates</li><li>• <strong>Performance:</strong> Consider hardware transcoding for Jellyfin</li><li>• <strong>Network:</strong> Set up NFS exports for other VMs to access media</li></ul></div></div>`,2)]),512),[[fe,l.value.pc2]])]),p("section",wd,[p("div",kd,[S(r)?(L(),$("button",{key:0,onClick:h[6]||(h[6]=(...I)=>S(i)&&S(i)(...I)),class:"flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"},[h[26]||(h[26]=p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1)),we(" "+j(S(r).title),1)])):(L(),$("div",Sd)),p("button",{onClick:h[7]||(h[7]=(...I)=>S(o)&&S(o)(...I)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," Back To Index "),S(n)?(L(),$("button",{key:2,onClick:h[8]||(h[8]=(...I)=>S(s)&&S(s)(...I)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"},[we(j(S(n).title)+" ",1),h[27]||(h[27]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L15.586 11H4a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",Cd))])])])}}}),Pd={class:"max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans"},Md={class:"mb-8"},Ed={class:"mb-4"},Ad={class:"flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"},Rd={class:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"},Id={class:"flex items-center justify-between"},Od={class:"text-center"},Td={class:"text-lg font-semibold text-gray-900 dark:text-gray-100"},Dd={class:"text-sm text-gray-500 dark:text-gray-400"},Ud={key:1,class:"w-32"},Hd={class:"mb-8"},Vd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},Fd={class:"mb-8"},Bd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},Ld={class:"mb-8"},Gd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},$d={class:"mb-8"},Nd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},qd={class:"mb-8"},jd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},zd={class:"mb-8"},Wd={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},Xd={class:"mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"},Kd={class:"flex items-center justify-between"},Yd={key:1,class:"w-32"},Qd={key:3,class:"w-32"},Jd=Ct({__name:"GPUPassthrough",setup(e){const{currentGuide:t,nextGuide:n,previousGuide:r,navigateToHome:o,navigateToNext:s,navigateToPrevious:i,getProgressInfo:c}=Nn(),a=c(),g=Un({prerequisites:!0,bios:!1,grub:!1,vfio:!1,vm:!1,troubleshooting:!1}),l=m=>{g.value[m]=!g.value[m]};return(m,f)=>{var h,R;return L(),$("main",Pd,[p("div",Md,[p("div",Ed,[p("div",Ad,[p("span",null,"Step "+j(S(a).current)+" of "+j(S(a).total),1),p("span",null,j(S(a).percentage)+"% Complete",1)]),p("div",Rd,[p("div",{class:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:St({width:S(a).percentage+"%"})},null,4)])]),p("div",Id,[p("button",{onClick:f[0]||(f[0]=(...C)=>S(o)&&S(o)(...C)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},f[11]||(f[11]=[p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1),we(" Back to Index ")])),p("div",Od,[p("h2",Td,j((h=S(t))==null?void 0:h.title),1),p("p",Dd,j((R=S(t))==null?void 0:R.description),1)]),S(n)?(L(),$("button",{key:0,onClick:f[1]||(f[1]=(...C)=>S(s)&&S(s)(...C)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},[we(" Next: "+j(S(n).title.replace(" Guide",""))+" ",1),f[12]||(f[12]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",Ud))])]),f[33]||(f[33]=p("h1",{class:"text-4xl font-bold mb-8 text-center"},"RX 7800XT GPU Passthrough Setup",-1)),p("section",Hd,[p("button",{onClick:f[2]||(f[2]=C=>l("prerequisites")),class:"w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"},[f[14]||(f[14]=p("h2",{class:"text-2xl font-semibold text-blue-900 dark:text-blue-100"},"Prerequisites & Hardware Check",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform",{"rotate-180":g.value.prerequisites}]),fill:"currentColor",viewBox:"0 0 20 20"},f[13]||(f[13]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",Vd,f[15]||(f[15]=[ce(`<h3 class="text-xl font-semibold mb-4">Hardware Requirements ✅</h3><ul class="list-disc list-inside mb-6 space-y-2"><li><strong>CPU:</strong> Ryzen 7 9700X (supports IOMMU) ✅</li><li><strong>GPU:</strong> RX 7800XT (RDNA3 architecture) ✅</li><li><strong>Motherboard:</strong> Must support IOMMU/VT-d</li><li><strong>RAM:</strong> 64GB (sufficient for host + gaming VM) ✅</li><li><strong>Storage:</strong> 500GB NVMe for gaming VM ✅</li></ul><h3 class="text-xl font-semibold mb-4">Check IOMMU Groups</h3><p class="mb-4">First, verify your GPU is in its own IOMMU group:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Check IOMMU groups
for d in /sys/kernel/iommu_groups/*/devices/*; do 
  n=\${d#*/iommu_groups/*}; n=\${n%%/*}
  printf &#39;IOMMU Group %s &#39; &quot;$n&quot;
  lspci -nns &quot;\${d##*/}&quot;
done | grep -E &quot;(VGA|Audio)&quot;

# Look for your RX 7800XT - should be in separate group from other devices
# Example output:
# IOMMU Group 15 01:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [1002:15bf]
# IOMMU Group 15 01:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [1002:1640]
        </code></pre><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"><h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">⚠️ Important Note</h4><p class="text-yellow-700 dark:text-yellow-300">The GPU and its audio controller should be in the same IOMMU group. If they&#39;re mixed with other devices, you may need ACS override patches.</p></div>`,6)]),512),[[fe,g.value.prerequisites]])]),p("section",Fd,[p("button",{onClick:f[3]||(f[3]=C=>l("bios")),class:"w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"},[f[17]||(f[17]=p("h2",{class:"text-2xl font-semibold text-orange-900 dark:text-orange-100"},"BIOS/UEFI Configuration",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform",{"rotate-180":g.value.bios}]),fill:"currentColor",viewBox:"0 0 20 20"},f[16]||(f[16]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",Bd,f[18]||(f[18]=[ce('<h3 class="text-xl font-semibold mb-4">Required BIOS Settings</h3><div class="grid md:grid-cols-2 gap-6"><div><h4 class="font-semibold mb-3">Enable These Settings:</h4><ul class="list-disc list-inside space-y-1 text-sm"><li><strong>IOMMU:</strong> Enable</li><li><strong>VT-d/AMD-Vi:</strong> Enable</li><li><strong>SVM Mode:</strong> Enable</li><li><strong>Above 4G Decoding:</strong> Enable</li><li><strong>Re-Size BAR Support:</strong> Enable</li><li><strong>CSM:</strong> Disable (UEFI only)</li></ul></div><div><h4 class="font-semibold mb-3">AMD-Specific Settings:</h4><ul class="list-disc list-inside space-y-1 text-sm"><li><strong>IOMMU:</strong> Enable</li><li><strong>NX Mode:</strong> Enable</li><li><strong>SVM Mode:</strong> Enable</li><li><strong>IOMMU Mode:</strong> Auto or Enable</li></ul></div></div><div class="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2">💡 Tip for Ryzen 7 9700X</h4><p class="text-blue-700 dark:text-blue-300">Modern AMD motherboards usually have good IOMMU grouping. The 9700X supports all necessary virtualization features out of the box.</p></div>',3)]),512),[[fe,g.value.bios]])]),p("section",Ld,[p("button",{onClick:f[4]||(f[4]=C=>l("grub")),class:"w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"},[f[20]||(f[20]=p("h2",{class:"text-2xl font-semibold text-green-900 dark:text-green-100"},"GRUB & Kernel Configuration",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform",{"rotate-180":g.value.grub}]),fill:"currentColor",viewBox:"0 0 20 20"},f[19]||(f[19]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",Gd,f[21]||(f[21]=[ce(`<h3 class="text-xl font-semibold mb-4">Step 1: Enable IOMMU in GRUB</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Edit GRUB configuration
nano /etc/default/grub

# Find the line starting with GRUB_CMDLINE_LINUX_DEFAULT
# Add AMD IOMMU parameters:
GRUB_CMDLINE_LINUX_DEFAULT=&quot;quiet amd_iommu=on iommu=pt&quot;

# Update GRUB
update-grub

# Reboot to apply changes
reboot
        </code></pre><h3 class="text-xl font-semibold mb-4">Step 2: Verify IOMMU is Working</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># After reboot, check if IOMMU is enabled
dmesg | grep -i iommu

# Should see output like:
# AMD-Vi: IOMMU performance counters supported
# AMD-Vi: Found IOMMU cap 0x40
# AMD-Vi: Extended features (0x58f77ef22294ade): PPR X2APIC NX GT IA GA PC GA_vAPIC
        </code></pre><h3 class="text-xl font-semibold mb-4">Step 3: Load Required Modules</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Add modules to load at boot
echo &#39;vfio&#39; &gt;&gt; /etc/modules
echo &#39;vfio_iommu_type1&#39; &gt;&gt; /etc/modules
echo &#39;vfio_pci&#39; &gt;&gt; /etc/modules
echo &#39;vfio_virqfd&#39; &gt;&gt; /etc/modules

# Update initramfs
update-initramfs -u
        </code></pre>`,6)]),512),[[fe,g.value.grub]])]),p("section",$d,[p("button",{onClick:f[5]||(f[5]=C=>l("vfio")),class:"w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"},[f[23]||(f[23]=p("h2",{class:"text-2xl font-semibold text-purple-900 dark:text-purple-100"},"VFIO Driver Configuration",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform",{"rotate-180":g.value.vfio}]),fill:"currentColor",viewBox:"0 0 20 20"},f[22]||(f[22]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",Nd,f[24]||(f[24]=[ce(`<h3 class="text-xl font-semibold mb-4">Step 1: Identify GPU PCI IDs</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Find your RX 7800XT PCI IDs
lspci -nn | grep -E &quot;(VGA|Audio)&quot; | grep AMD

# Example output for RX 7800XT:
# 01:00.0 VGA compatible controller [0300]: Advanced Micro Devices, Inc. [1002:15bf] (rev c1)
# 01:00.1 Audio device [0403]: Advanced Micro Devices, Inc. [1002:1640]

# Note the vendor:device IDs: 1002:15bf (GPU) and 1002:1640 (Audio)
        </code></pre><h3 class="text-xl font-semibold mb-4">Step 2: Blacklist AMD GPU Driver</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Create blacklist file for AMD drivers
cat &gt; /etc/modprobe.d/blacklist-amdgpu.conf &lt;&lt; EOF
blacklist amdgpu
blacklist radeon
EOF

# Alternative: Use driver_override method (recommended)
echo &quot;vfio-pci&quot; &gt; /sys/bus/pci/devices/0000:01:00.0/driver_override
echo &quot;vfio-pci&quot; &gt; /sys/bus/pci/devices/0000:01:00.1/driver_override
        </code></pre><h3 class="text-xl font-semibold mb-4">Step 3: Configure VFIO PCI IDs</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Method 1: Using modprobe configuration
cat &gt; /etc/modprobe.d/vfio.conf &lt;&lt; EOF
options vfio-pci ids=1002:15bf,1002:1640
EOF

# Method 2: Add to GRUB (alternative)
# Edit /etc/default/grub and modify:
# GRUB_CMDLINE_LINUX_DEFAULT=&quot;quiet amd_iommu=on iommu=pt vfio-pci.ids=1002:15bf,1002:1640&quot;

# Update initramfs and reboot
update-initramfs -u
reboot
        </code></pre><h3 class="text-xl font-semibold mb-4">Step 4: Verify VFIO Binding</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># After reboot, check if GPU is bound to VFIO
lspci -nnk -d 1002:15bf

# Should show:
# Kernel driver in use: vfio-pci
# Kernel modules: amdgpu

# Check VFIO groups
ls /dev/vfio/
# Should show: vfio and numbered groups (e.g., 15, 16)
        </code></pre>`,8)]),512),[[fe,g.value.vfio]])]),p("section",qd,[p("button",{onClick:f[6]||(f[6]=C=>l("vm")),class:"w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"},[f[26]||(f[26]=p("h2",{class:"text-2xl font-semibold text-indigo-900 dark:text-indigo-100"},"Gaming VM Configuration",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-indigo-600 dark:text-indigo-400 transform transition-transform",{"rotate-180":g.value.vm}]),fill:"currentColor",viewBox:"0 0 20 20"},f[25]||(f[25]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",jd,f[27]||(f[27]=[ce(`<h3 class="text-xl font-semibold mb-4">VM Creation via Proxmox Web UI</h3><div class="space-y-6"><div><h4 class="font-semibold mb-3">Basic VM Settings:</h4><ul class="list-disc list-inside space-y-1 text-sm"><li><strong>VM ID:</strong> 201</li><li><strong>Name:</strong> Gaming-VM</li><li><strong>OS Type:</strong> Microsoft Windows</li><li><strong>Machine:</strong> q35</li><li><strong>BIOS:</strong> OVMF (UEFI)</li><li><strong>Add EFI Disk:</strong> Yes</li><li><strong>Add TPM:</strong> Yes (for Windows 11)</li></ul></div><div><h4 class="font-semibold mb-3">Hardware Configuration:</h4><ul class="list-disc list-inside space-y-1 text-sm"><li><strong>CPU:</strong> 8 cores (host type)</li><li><strong>Memory:</strong> 32768 MB (32GB)</li><li><strong>Storage:</strong> 400GB on vm-fast pool</li><li><strong>Network:</strong> VirtIO (bridge to vmbr0)</li></ul></div></div><h3 class="text-xl font-semibold mb-4 mt-6">GPU Passthrough Configuration</h3><p class="mb-4">After creating the VM, edit the configuration file:</p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-4"><code># Edit VM configuration
nano /etc/pve/qemu-server/201.conf

# Add these lines for GPU passthrough:
args: -cpu &#39;host,+kvm_pv_unhalt,+kvm_pv_eoi,hv_vendor_id=NV43FIX,kvm=off&#39;
cpu: host,hidden=1,flags=+pcid
machine: pc-q35-7.1
hostpci0: 01:00,pcie=1,x-vga=1
hostpci1: 01:00.1,pcie=1

# Additional optimizations:
balloon: 0
bios: ovmf
boot: order=scsi0;ide2;net0
cores: 8
efidisk0: vm-fast:vm-201-disk-0,efitype=4m,size=4M
machine: pc-q35-7.1
memory: 32768
numa: 1
ostype: win11
scsi0: vm-fast:vm-201-disk-1,cache=writeback,discard=on,size=400G,ssd=1
scsihw: virtio-scsi-pci
sockets: 1
vga: none
        </code></pre><h3 class="text-xl font-semibold mb-4">Windows Installation Tips</h3><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4"><ul class="list-disc list-inside space-y-1 text-sm"><li>Install Windows first with VGA display</li><li>Install VirtIO drivers</li><li>Install AMD GPU drivers</li><li>Shut down VM and add GPU passthrough</li><li>Set display output to &quot;none&quot; in Proxmox</li><li>Connect monitor directly to RX 7800XT</li></ul></div>`,7)]),512),[[fe,g.value.vm]])]),p("section",zd,[p("button",{onClick:f[7]||(f[7]=C=>l("troubleshooting")),class:"w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"},[f[29]||(f[29]=p("h2",{class:"text-2xl font-semibold text-red-900 dark:text-red-100"},"Troubleshooting Common Issues",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform",{"rotate-180":g.value.troubleshooting}]),fill:"currentColor",viewBox:"0 0 20 20"},f[28]||(f[28]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",Wd,f[30]||(f[30]=[ce('<div class="space-y-6"><div><h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ VM Won&#39;t Start</h4><ul class="list-disc list-inside space-y-1 text-sm"><li>Check if GPU is properly bound to VFIO: <code>lspci -nnk -d 1002:15bf</code></li><li>Verify IOMMU groups are correct</li><li>Ensure no other process is using the GPU</li><li>Check VM logs: <code>journalctl -u qemu-server@201</code></li></ul></div><div><h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Black Screen After GPU Passthrough</h4><ul class="list-disc list-inside space-y-1 text-sm"><li>Ensure monitor is connected to GPU, not motherboard</li><li>Try different display outputs (HDMI, DisplayPort)</li><li>Check if Windows is detecting the GPU in Device Manager</li><li>Install latest AMD drivers in Windows</li></ul></div><div><h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Poor Gaming Performance</h4><ul class="list-disc list-inside space-y-1 text-sm"><li>Enable CPU pinning for better performance</li><li>Set CPU governor to performance: <code>cpupower frequency-set -g performance</code></li><li>Disable Windows power saving features</li><li>Enable MSI mode for GPU in Windows</li><li>Consider hugepages for memory optimization</li></ul></div><div><h4 class="font-semibold mb-3 text-red-700 dark:text-red-300">❌ Audio Issues</h4><ul class="list-disc list-inside space-y-1 text-sm"><li>Ensure GPU audio device is also passed through</li><li>Install AMD audio drivers in Windows</li><li>Set GPU audio as default device in Windows</li><li>Alternative: Use USB audio or network audio streaming</li></ul></div></div><div class="mt-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"><h4 class="font-semibold text-green-800 dark:text-green-200 mb-2">✅ Success Indicators</h4><ul class="list-disc list-inside space-y-1 text-sm text-green-700 dark:text-green-300"><li>GPU shows up in Windows Device Manager</li><li>AMD Software/Adrenalin detects the GPU</li><li>Games run at expected performance levels</li><li>GPU temperature monitoring works</li><li>Multiple monitors work if connected</li></ul></div>',2)]),512),[[fe,g.value.troubleshooting]])]),p("section",Xd,[p("div",Kd,[S(r)?(L(),$("button",{key:0,onClick:f[8]||(f[8]=(...C)=>S(i)&&S(i)(...C)),class:"flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"},[f[31]||(f[31]=p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1)),we(" "+j(S(r).title),1)])):(L(),$("div",Yd)),p("button",{onClick:f[9]||(f[9]=(...C)=>S(o)&&S(o)(...C)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," Back To Index "),S(n)?(L(),$("button",{key:2,onClick:f[10]||(f[10]=(...C)=>S(s)&&S(s)(...C)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"},[we(j(S(n).title)+" ",1),f[32]||(f[32]=p("svg",{class:"w-5 h-5 ml-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z","clip-rule":"evenodd"})],-1))])):(L(),$("div",Qd))])])])}}}),Zd={class:"max-w-6xl mx-auto p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans"},eu={class:"mb-8"},tu={class:"mb-4"},nu={class:"flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2"},ru={class:"w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2"},ou={class:"flex items-center justify-between"},su={class:"text-center"},iu={class:"text-lg font-semibold text-gray-900 dark:text-gray-100"},lu={class:"text-sm text-gray-500 dark:text-gray-400"},au={class:"mb-8"},cu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},du={class:"mb-8"},uu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},fu={class:"mb-8"},pu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},gu={class:"mb-8"},mu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},hu={class:"mb-8"},bu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},xu={class:"mb-8"},vu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},yu={class:"mb-8"},wu={class:"mt-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"},ku={class:"mt-16 pt-8 border-t border-gray-200 dark:border-gray-700"},Su={class:"flex items-center justify-between"},Cu=Ct({__name:"SecurityMaintenance",setup(e){const{currentGuide:t,previousGuide:n,navigateToHome:r,navigateToPrevious:o,getProgressInfo:s}=Nn(),i=s(),c=Un({critical:!0,userManagement:!1,fail2ban:!1,firewall:!1,vmHardening:!1,monitoring:!1,troubleshooting:!1}),a=g=>{c.value[g]=!c.value[g]};return(g,l)=>{var m,f;return L(),$("main",Zd,[p("div",eu,[p("div",tu,[p("div",nu,[p("span",null,"Step "+j(S(i).current)+" of "+j(S(i).total),1),p("span",null,j(S(i).percentage)+"% Complete",1)]),p("div",ru,[p("div",{class:"bg-blue-600 h-2 rounded-full transition-all duration-300",style:St({width:S(i).percentage+"%"})},null,4)])]),p("div",ou,[p("button",{onClick:l[0]||(l[0]=(...h)=>S(r)&&S(r)(...h)),class:"flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"},l[10]||(l[10]=[p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1),we(" Back to Index ")])),p("div",su,[p("h2",iu,j((m=S(t))==null?void 0:m.title),1),p("p",lu,j((f=S(t))==null?void 0:f.description),1)]),l[11]||(l[11]=p("div",{class:"w-32 flex justify-end"},[p("div",{class:"px-4 py-2 bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200 rounded-lg text-sm font-medium"}," Complete! ")],-1))])]),l[36]||(l[36]=p("h1",{class:"text-4xl font-bold mb-8 text-center"}," Enhanced Proxmox Security Setup Guide ",-1)),p("section",au,[p("button",{onClick:l[1]||(l[1]=h=>a("critical")),class:"w-full flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"},[l[13]||(l[13]=p("h2",{class:"text-2xl font-semibold text-red-900 dark:text-red-100"}," ⚠️ Critical First Steps ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-red-600 dark:text-red-400 transform transition-transform",{"rotate-180":c.value.critical}]),fill:"currentColor",viewBox:"0 0 20 20"},l[12]||(l[12]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",cu,l[14]||(l[14]=[ce(`<div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6"><p class="text-yellow-700 dark:text-yellow-300"> Perform these steps immediately after completing the core setup on both Proxmox nodes. </p></div><h3 class="text-xl font-semibold mb-4">1. Change Default Passwords</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On both PC1 (10.10.10.100) and PC2 (10.10.10.200)
# Change root password to something strong
passwd root

# Verify password complexity
# Use at least 16 characters with mix of uppercase, lowercase, numbers, symbols</code></pre><h3 class="text-xl font-semibold mb-4">2. Update System Packages</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Update package lists and upgrade all packages
apt update &amp;&amp; apt upgrade -y

# Install essential security tools
apt install -y fail2ban ufw htop iotop sudo

# Enable automatic security updates
apt install -y unattended-upgrades
dpkg-reconfigure -plow unattended-upgrades</code></pre><h3 class="text-xl font-semibold mb-4"> 3. Configure Proxmox Repositories </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Remove enterprise repository (requires subscription)
sed -i &#39;s/^deb/#deb/&#39; /etc/apt/sources.list.d/pve-enterprise.list

# Add no-subscription repository
echo &quot;deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription&quot; &gt; /etc/apt/sources.list.d/pve-no-subscription.list

# Update package lists
apt update</code></pre>`,7)]),512),[[fe,c.value.critical]])]),p("section",du,[p("button",{onClick:l[2]||(l[2]=h=>a("userManagement")),class:"w-full flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"},[l[16]||(l[16]=p("h2",{class:"text-2xl font-semibold text-blue-900 dark:text-blue-100"}," 🔐 Enhanced User Management & SSH Security ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-blue-600 dark:text-blue-400 transform transition-transform",{"rotate-180":c.value.userManagement}]),fill:"currentColor",viewBox:"0 0 20 20"},l[15]||(l[15]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",uu,l[17]||(l[17]=[ce(`<h3 class="text-xl font-semibold mb-4"> 4. Create Administrative User (Instead of Using Root) </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Create a dedicated admin user for management
useradd -m -s /bin/bash -G sudo,adm admin

# Set a strong password
passwd admin

# Add user to Proxmox admin group (for PVE management)
usermod -aG www-data admin

# Create SSH directory for the new user
mkdir -p /home/admin/.ssh
chmod 700 /home/admin/.ssh
chown admin:admin /home/admin/.ssh</code></pre><h3 class="text-xl font-semibold mb-4"> 5. Generate and Deploy SSH Keys </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On your local machine (Windows/Mac/Linux)
# Generate a strong SSH key pair
ssh-keygen -t ed25519 -C &quot;proxmox-homelab-admin-$(date +%Y%m%d)&quot;

# Alternative naming options:
# ssh-keygen -t ed25519 -C &quot;your-name-proxmox-admin-2025&quot;
# ssh-keygen -t ed25519 -C &quot;proxmox-cluster-admin-key&quot;

# For additional security, consider using a passphrase-protected key
# Store the key in a specific location, e.g., ~/.ssh/proxmox_ed25519

# Copy public key to admin user (preferred method)
ssh-copy-id -i ~/.ssh/proxmox_ed25519.pub admin@10.10.10.100
ssh-copy-id -i ~/.ssh/proxmox_ed25519.pub admin@10.10.10.200

# If ssh-copy-id doesn&#39;t work, manually copy:
# cat ~/.ssh/proxmox_ed25519.pub | ssh admin@10.10.10.100 &quot;mkdir -p ~/.ssh &amp;&amp; cat &gt;&gt; ~/.ssh/authorized_keys&quot;</code></pre><h3 class="text-xl font-semibold mb-4"> 6. Configure SSH Client for Easy Access </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On your local machine, create/edit ~/.ssh/config
cat &gt;&gt; ~/.ssh/config &lt;&lt; &#39;EOF&#39;
Host proxmox1
    HostName 10.10.10.100
    User admin
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

Host proxmox2
    HostName 10.10.10.200
    User admin
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

# For root access when absolutely necessary
Host proxmox1-root
    HostName 10.10.10.100
    User root
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22

Host proxmox2-root
    HostName 10.10.10.200
    User root
    IdentityFile ~/.ssh/proxmox_ed25519
    Port 22
EOF

# Set proper permissions
chmod 600 ~/.ssh/config</code></pre><h3 class="text-xl font-semibold mb-4">7. Harden SSH Configuration</h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Backup original SSH config
cp /etc/ssh/sshd_config /etc/ssh/sshd_config.backup

# Create enhanced SSH configuration
cat &gt; /etc/ssh/sshd_config &lt;&lt; &#39;EOF&#39;
# Enhanced SSH Security Configuration for Proxmox

# Network
Port 22
AddressFamily inet
ListenAddress 0.0.0.0

# Authentication
PubkeyAuthentication yes
AuthorizedKeysFile .ssh/authorized_keys
PasswordAuthentication no
PermitEmptyPasswords no
ChallengeResponseAuthentication no
UsePAM yes

# Root access - RESTRICTED
PermitRootLogin prohibit-password  # Only key-based root login
# Consider changing to &#39;no&#39; after testing admin user access

# User restrictions
AllowUsers admin root
MaxAuthTries 3
MaxSessions 3
LoginGraceTime 30

# Session management
ClientAliveInterval 300
ClientAliveCountMax 2
TCPKeepAlive yes

# Security features
X11Forwarding no
AllowTcpForwarding yes
GatewayPorts no
PermitTunnel no
PrintMotd yes
Banner /etc/issue.net

# Logging
SyslogFacility AUTH
LogLevel VERBOSE

# Subsystems
Subsystem sftp /usr/lib/openssh/sftp-server
EOF

# Create security banner
cat &gt; /etc/issue.net &lt;&lt; &#39;EOF&#39;
***************************************************************************
                            AUTHORIZED ACCESS ONLY
***************************************************************************
This system is for authorized users only. All activities are monitored
and logged. Unauthorized access is prohibited and will be prosecuted.
***************************************************************************
EOF

# Test configuration and restart SSH
sshd -t &amp;&amp; systemctl restart sshd</code></pre><h3 class="text-xl font-semibold mb-4"> 8. Configure Sudo for Admin User </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Create sudo configuration for admin user
cat &gt; /etc/sudoers.d/admin &lt;&lt; &#39;EOF&#39;
# Admin user sudo configuration
admin ALL=(ALL:ALL) ALL

# Optional: Allow admin to run specific commands without password
# admin ALL=(ALL) NOPASSWD: /usr/bin/systemctl, /usr/sbin/pct, /usr/sbin/qm
EOF

# Set proper permissions
chmod 440 /etc/sudoers.d/admin

# Test sudo configuration
visudo -c</code></pre>`,10)]),512),[[fe,c.value.userManagement]])]),p("section",fu,[p("button",{onClick:l[3]||(l[3]=h=>a("fail2ban")),class:"w-full flex items-center justify-between p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"},[l[19]||(l[19]=p("h2",{class:"text-2xl font-semibold text-purple-900 dark:text-purple-100"}," 🛡️ Enhanced Fail2Ban Configuration ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-purple-600 dark:text-purple-400 transform transition-transform",{"rotate-180":c.value.fail2ban}]),fill:"currentColor",viewBox:"0 0 20 20"},l[18]||(l[18]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",pu,l[20]||(l[20]=[p("h3",{class:"text-xl font-semibold mb-4"}," 9. Configure Advanced Fail2Ban ",-1),p("pre",{class:"bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"},[p("code",null,`# Create comprehensive Fail2Ban configuration
cat > /etc/fail2ban/jail.local << 'EOF'
[DEFAULT]
# Ban settings
bantime = 3600
findtime = 600
maxretry = 3
backend = systemd

# Notification (optional - configure email)
# destemail = admin@yourdomain.com
# sendername = Fail2Ban-Proxmox
# mta = sendmail

# Whitelist your management network
ignoreip = 127.0.0.1/8 ::1 10.10.10.0/24

[sshd]
enabled = true
port = ssh
filter = sshd
logpath = /var/log/auth.log
maxretry = 3
bantime = 7200

[proxmox]
enabled = true
port = https,http,8006
filter = proxmox
logpath = /var/log/daemon.log
maxretry = 3
bantime = 3600

[proxmox-web]
enabled = true
port = 8006
filter = proxmox-web
logpath = /var/log/daemon.log
maxretry = 5
bantime = 1800
EOF`)],-1),p("pre",{class:"bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"},[p("code",null,`# Create Proxmox web interface filter
cat > /etc/fail2ban/filter.d/proxmox-web.conf << 'EOF'
[Definition]
failregex = pveproxy\\[.*\\]: authentication failure; rhost=< HOST > user=.* msg=.*
ignoreregex =
EOF

# Enhanced Proxmox filter
cat > /etc/fail2ban/filter.d/proxmox.conf << 'EOF'
[Definition]
failregex = pvedaemon\\[.*\\]: authentication failure; rhost=< HOST > user=.* msg=.*
            pveproxy\\[.*\\]: authentication failure; rhost= < HOST > user=.* msg=.*
ignoreregex =
EOF

# Start and enable Fail2Ban
systemctl enable fail2ban
systemctl start fail2ban

# Check status
fail2ban-client status
fail2ban-client status sshd
fail2ban-client status proxmox`)],-1)]),512),[[fe,c.value.fail2ban]])]),p("section",gu,[p("button",{onClick:l[4]||(l[4]=h=>a("firewall")),class:"w-full flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"},[l[22]||(l[22]=p("h2",{class:"text-2xl font-semibold text-orange-900 dark:text-orange-100"}," 🔥 Firewall Configuration ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform",{"rotate-180":c.value.firewall}]),fill:"currentColor",viewBox:"0 0 20 20"},l[21]||(l[21]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",mu,l[23]||(l[23]=[ce(`<h3 class="text-xl font-semibold mb-4"> 10. Configure UFW on Proxmox Hosts (Recommended) </h3><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"><p class="text-blue-700 dark:text-blue-300 font-medium"> Run this on PROXMOX HOSTS (not VMs/LXCs) </p></div><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Reset UFW to defaults
ufw --force reset

# Set default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH access
ufw allow ssh

# Allow Proxmox web interface
ufw allow 8006/tcp

# Allow cluster communication (if using clustering)
ufw allow from 10.10.10.0/24 to any port 5404,5405

# Allow SPICE/VNC for VM console access
ufw allow from 10.10.10.0/24 to any port 5900:6000

# Allow common services that VMs might need
# HTTP/HTTPS (if you have web servers)
ufw allow 80/tcp
ufw allow 443/tcp

# Enable firewall
ufw --force enable

# Check status
ufw status verbose</code></pre><h3 class="text-xl font-semibold mb-4"> Alternative: Per-VM/Container Firewall (Advanced) </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> If you prefer granular control, install UFW inside each VM/container: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Inside each VM/LXC - basic template
apt install -y ufw

# Default policies
ufw default deny incoming
ufw default allow outgoing

# Allow SSH (always needed for management)
ufw allow ssh

# Add service-specific rules, examples:
# For web servers:
# ufw allow 80/tcp
# ufw allow 443/tcp

# For database servers:
# ufw allow from 10.10.10.0/24 to any port 3306  # MySQL
# ufw allow from 10.10.10.0/24 to any port 5432  # PostgreSQL

# Enable firewall
ufw --force enable</code></pre><h3 class="text-xl font-semibold mb-4"> Proxmox Built-in Firewall (Alternative Option) </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto"><code># Enable Proxmox firewall
pvesh set /nodes/$(hostname)/firewall/options --enable 1

# Configure via web interface: Datacenter → Firewall
# Or via command line - but web interface is easier for initial setup</code></pre>`,8)]),512),[[fe,c.value.firewall]])]),p("section",hu,[p("button",{onClick:l[5]||(l[5]=h=>a("vmHardening")),class:"w-full flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"},[l[25]||(l[25]=p("h2",{class:"text-2xl font-semibold text-green-900 dark:text-green-100"}," 🖥️ VM/Container Hardening Process ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-green-600 dark:text-green-400 transform transition-transform",{"rotate-180":c.value.vmHardening}]),fill:"currentColor",viewBox:"0 0 20 20"},l[24]||(l[24]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",bu,l[26]||(l[26]=[ce(`<div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6"><h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2"> 📝 VM/Container User Setup Process </h4><p class="text-blue-700 dark:text-blue-300 text-sm"> Follow this step-by-step process for each new VM/container to avoid using root access and implement SSH key authentication. <br><strong>Note:</strong> VM IPs are available in the Services Guide component for reference. </p></div><h3 class="text-xl font-semibold mb-4"> Step 1: Initial Access (Usually Root-Only) </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Most VMs/containers start with only root access available: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Connect to your new VM/container using actual service IPs:
ssh root@10.10.10.101  # Development VM
ssh root@10.10.10.102  # PiHole LXC
ssh root@10.10.10.103  # Monitoring Stack LXC
ssh root@10.10.10.104  # Reverse Proxy LXC
ssh root@10.10.10.105  # Documentation Server LXC
ssh root@10.10.10.201  # Gaming VM (Windows)
ssh root@10.10.10.202  # Storage/Media VM</code></pre><h3 class="text-xl font-semibold mb-4"> Step 2: Create Admin User Inside VM/Container </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Inside each VM/container, create admin user
useradd -m -s /bin/bash -G sudo admin
passwd admin

# Create SSH directory for admin user
mkdir -p /home/admin/.ssh
chmod 700 /home/admin/.ssh
chown admin:admin /home/admin/.ssh</code></pre><h3 class="text-xl font-semibold mb-4"> Step 3: Deploy SSH Keys to Both Users </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> From your admin PC, copy your SSH key to BOTH users for safety: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># From your admin PC - copy to BOTH users for each VM/container:
# Development VM
ssh-copy-id admin@10.10.10.101
ssh-copy-id root@10.10.10.101    # Keep root access initially for safety

# PiHole LXC
ssh-copy-id admin@10.10.10.102
ssh-copy-id root@10.10.10.102

# Monitoring Stack LXC
ssh-copy-id admin@10.10.10.103
ssh-copy-id root@10.10.10.103

# Reverse Proxy LXC
ssh-copy-id admin@10.10.10.104
ssh-copy-id root@10.10.10.104

# Documentation Server LXC
ssh-copy-id admin@10.10.10.105
ssh-copy-id root@10.10.10.105

# Storage/Media VM
ssh-copy-id admin@10.10.10.202
ssh-copy-id root@10.10.10.202

# Alternative manual method if ssh-copy-id doesn&#39;t work:
# cat ~/.ssh/id_ed25519.pub | ssh admin@10.10.10.101 &quot;cat &gt;&gt; ~/.ssh/authorized_keys&quot;
# cat ~/.ssh/id_ed25519.pub | ssh root@10.10.10.101 &quot;cat &gt;&gt; ~/.ssh/authorized_keys&quot;</code></pre><h3 class="text-xl font-semibold mb-4"> Step 4: Test SSH Key Authentication </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Test both connections work with SSH keys for each VM/container:
# Development VM
ssh admin@10.10.10.101
ssh root@10.10.10.101

# PiHole LXC
ssh admin@10.10.10.102
ssh root@10.10.10.102

# Monitoring Stack LXC
ssh admin@10.10.10.103
ssh root@10.10.10.103

# Reverse Proxy LXC
ssh admin@10.10.10.104
ssh root@10.10.10.104

# Documentation Server LXC
ssh admin@10.10.10.105
ssh root@10.10.10.105

# Storage/Media VM
ssh admin@10.10.10.202
ssh root@10.10.10.202

# If successful, you should connect without password prompts</code></pre><h3 class="text-xl font-semibold mb-4"> Step 5: Harden SSH Configuration </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Once SSH key authentication is confirmed working, harden the SSH configuration: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Inside the VM/container, harden SSH (run as root or with sudo)
# Restrict root login to key-only (safer than completely disabling)
sed -i &#39;s/PermitRootLogin yes/PermitRootLogin prohibit-password/&#39; /etc/ssh/sshd_config

# Disable password authentication entirely
sed -i &#39;s/#PasswordAuthentication yes/PasswordAuthentication no/&#39; /etc/ssh/sshd_config

# Restart SSH service to apply changes
systemctl restart sshd</code></pre><h3 class="text-xl font-semibold mb-4"> Step 6: Configure SSH Client Shortcuts (Optional) </h3><p class="text-gray-600 dark:text-gray-400 mb-4"> Add convenient SSH shortcuts to your local ~/.ssh/config: </p><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># On your admin PC, add to ~/.ssh/config
cat &gt;&gt; ~/.ssh/config &lt;&lt; &#39;EOF&#39;
# Development VM
Host dev-vm
    HostName 10.10.10.101
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host dev-vm-root
    HostName 10.10.10.101
    User root
    IdentityFile ~/.ssh/id_ed25519

# Web Server VM
Host web-vm
    HostName 10.10.10.102
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host web-vm-root
    HostName 10.10.10.102
    User root
    IdentityFile ~/.ssh/id_ed25519

# Database VM
Host db-vm
    HostName 10.10.10.103
    User admin
    IdentityFile ~/.ssh/id_ed25519

Host db-vm-root
    HostName 10.10.10.103
    User root
    IdentityFile ~/.ssh/id_ed25519
EOF

# Now you can connect easily:
# ssh dev-vm      # Connect as admin user
# ssh dev-vm-root # Connect as root when needed</code></pre><h3 class="text-xl font-semibold mb-4"> Step 7: Additional Security (Optional) </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Inside each VM/container, install additional security tools
apt update &amp;&amp; apt upgrade -y
apt install -y fail2ban ufw

# Configure basic fail2ban
systemctl enable fail2ban
systemctl start fail2ban

# Configure basic firewall (adjust ports as needed for your services)
ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
# ufw allow 80/tcp   # For web servers
# ufw allow 443/tcp  # For HTTPS
# ufw allow 3306/tcp # For MySQL (from local network only)
ufw --force enable</code></pre><div class="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mt-6"><h4 class="font-semibold text-yellow-800 dark:text-yellow-200 mb-2"> ⚠️ Important Safety Notes </h4><ul class="list-disc list-inside space-y-1 text-sm text-yellow-700 dark:text-yellow-300"><li><strong>Always test SSH key authentication</strong> before disabling password authentication </li><li><strong>Keep root access available</strong> initially in case you need to troubleshoot admin user issues </li><li><strong>Use Proxmox console access</strong> as a backup if you get locked out via SSH </li><li><strong>Document your VM IPs and access methods</strong> for easy reference </li><li><strong>Test connectivity</strong> from your admin PC before proceeding to the next VM </li></ul></div><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mt-6"><h4 class="font-semibold text-green-800 dark:text-green-200 mb-2"> ✅ VM Hardening Checklist </h4><div class="grid md:grid-cols-2 gap-4"><div><h5 class="font-medium text-green-700 dark:text-green-300 mb-2"> For Each VM/Container: </h5><ul class="space-y-1 text-sm text-green-600 dark:text-green-400"><li>□ Admin user created with sudo access</li><li>□ SSH keys deployed to admin user</li><li>□ SSH keys deployed to root user (backup)</li><li>□ SSH key authentication tested</li><li>□ Password authentication disabled</li><li>□ Root login restricted to keys only</li><li>□ SSH shortcuts configured locally</li></ul></div><div><h5 class="font-medium text-green-700 dark:text-green-300 mb-2"> Optional Security: </h5><ul class="space-y-1 text-sm text-green-600 dark:text-green-400"><li>□ Fail2ban installed and configured</li><li>□ UFW firewall configured</li><li>□ System packages updated</li><li>□ Service-specific firewall rules</li><li>□ Regular update schedule planned</li><li>□ Backup access method verified</li><li>□ Documentation updated</li></ul></div></div></div>`,21)]),512),[[fe,c.value.vmHardening]])]),p("section",xu,[p("button",{onClick:l[6]||(l[6]=h=>a("monitoring")),class:"w-full flex items-center justify-between p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 dark:hover:bg-indigo-900/30 transition-colors"},[l[28]||(l[28]=p("h2",{class:"text-2xl font-semibold text-indigo-900 dark:text-indigo-100"}," 🔍 Security Monitoring ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-indigo-600 dark:text-indigo-400 transform transition-transform",{"rotate-180":c.value.monitoring}]),fill:"currentColor",viewBox:"0 0 20 20"},l[27]||(l[27]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",vu,l[29]||(l[29]=[ce(`<h3 class="text-xl font-semibold mb-4"> 12. Basic Security Monitoring Commands </h3><pre class="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto mb-6"><code># Check failed login attempts
grep &quot;Failed password&quot; /var/log/auth.log | tail -10

# Check Fail2Ban status
fail2ban-client status
fail2ban-client banned

# Monitor active connections
ss -tuln
netstat -tulpn

# Check running processes
ps aux | grep -E &quot;(ssh|pve)&quot;

# Review recent logins
last -n 20

# Check for suspicious processes
ps aux --sort=-%cpu | head -10</code></pre><div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4"><h4 class="font-semibold text-blue-800 dark:text-blue-200 mb-2"> 🚀 Next Steps After Setup </h4><ol class="list-decimal list-inside space-y-1 text-sm text-blue-700 dark:text-blue-300"><li><strong>Test everything</strong>: Verify you can access both Proxmox nodes with your admin user </li><li><strong>Backup configurations</strong>: Save your SSH keys and configuration files </li><li><strong>Document access</strong>: Keep a secure record of all credentials and keys </li><li><strong>Regular updates</strong>: Set up automated security updates </li><li><strong>Monitor logs</strong>: Regularly check authentication and system logs </li><li><strong>Consider additional security</strong>: VPN access, certificate-based authentication </li></ol></div>`,3)]),512),[[fe,c.value.monitoring]])]),p("section",yu,[p("button",{onClick:l[7]||(l[7]=h=>a("troubleshooting")),class:"w-full flex items-center justify-between p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-colors"},[l[31]||(l[31]=p("h2",{class:"text-2xl font-semibold text-yellow-900 dark:text-yellow-100"}," 🔧 Troubleshooting & Important Notes ",-1)),(L(),$("svg",{class:ie(["w-6 h-6 text-yellow-600 dark:text-yellow-400 transform transition-transform",{"rotate-180":c.value.troubleshooting}]),fill:"currentColor",viewBox:"0 0 20 20"},l[30]||(l[30]=[p("path",{"fill-rule":"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z","clip-rule":"evenodd"},null,-1)]),2))]),ue(p("div",wu,l[32]||(l[32]=[ce('<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6"><h4 class="font-semibold text-red-800 dark:text-red-200 mb-2"> ⚠️ Important Security Notes </h4><ul class="list-disc list-inside space-y-1 text-sm text-red-700 dark:text-red-300"><li><strong>Never</strong> disable root access until you&#39;ve thoroughly tested admin user access </li><li> Keep a backup method to access your systems (console access, recovery media) </li><li>Regularly rotate SSH keys (every 6-12 months)</li><li>Use different keys for different environments if possible</li><li> Consider using SSH jump hosts for additional security layers </li><li>Monitor your systems regularly for unusual activity</li></ul></div><h3 class="text-xl font-semibold mb-4">If you get locked out:</h3><ol class="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6"><li>Use Proxmox console access through the web interface</li><li> Check SSH configuration: <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">sshd -t</code></li><li> Review SSH logs: <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">tail -f /var/log/auth.log</code></li><li> Verify user permissions: <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">id admin</code></li><li> Check SSH key permissions: <code class="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">ls -la /home/admin/.ssh/</code></li></ol><div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4"><h4 class="font-semibold text-green-800 dark:text-green-200 mb-2"> ✅ Security Checklist </h4><div class="grid md:grid-cols-2 gap-4"><div><h5 class="font-medium text-green-700 dark:text-green-300 mb-2"> Essential Security: </h5><ul class="space-y-1 text-sm text-green-600 dark:text-green-400"><li>✓ Strong root passwords set</li><li>✓ Admin user created</li><li>✓ SSH key authentication enabled</li><li>✓ Password authentication disabled</li><li>✓ Fail2Ban configured and running</li><li>✓ Firewall rules configured</li><li>✓ Automatic updates enabled</li></ul></div><div><h5 class="font-medium text-green-700 dark:text-green-300 mb-2"> Best Practices: </h5><ul class="space-y-1 text-sm text-green-600 dark:text-green-400"><li>✓ SSH keys backed up securely</li><li>✓ Access documented</li><li>✓ Regular monitoring scheduled</li><li>✓ VM security templates ready</li><li>✓ Recovery procedures documented</li><li>✓ Security updates automated</li><li>✓ Log monitoring configured</li></ul></div></div></div>',4)]),512),[[fe,c.value.troubleshooting]])]),p("section",ku,[p("div",Su,[S(n)?(L(),$("button",{key:0,onClick:l[8]||(l[8]=(...h)=>S(o)&&S(o)(...h)),class:"flex items-center px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"},[l[33]||(l[33]=p("svg",{class:"w-5 h-5 mr-2",fill:"currentColor",viewBox:"0 0 20 20"},[p("path",{"fill-rule":"evenodd",d:"M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L4.414 9H17a1 1 0 110 2H4.414l5.293 5.293a1 1 0 010 1.414z","clip-rule":"evenodd"})],-1)),we(" "+j(S(n).title),1)])):Tl("",!0),p("button",{onClick:l[9]||(l[9]=(...h)=>S(r)&&S(r)(...h)),class:"flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"}," Back To Index "),l[34]||(l[34]=p("div",{class:"w-60 flex justify-end"},[p("div",{class:"px-6 py-3 bg-green-600 text-white rounded-lg font-medium"}," Security Complete! ")],-1))]),l[35]||(l[35]=p("div",{class:"mt-8 text-center"},[p("div",{class:"p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg border border-green-200 dark:border-green-800"},[p("h3",{class:"text-xl font-semibold text-green-900 dark:text-green-100 mb-2"}," 🔒 Security Setup Complete! "),p("p",{class:"text-green-700 dark:text-green-300"}," Your Proxmox infrastructure is now secured with enterprise-grade security measures. Remember to test all configurations and keep your security tools updated! ")])],-1))])])}}}),_u=[{path:"/",name:"Home",component:Tc},{path:"/core-setup",name:"CoreSetup",component:Wc},{path:"/services-guide",name:"ServicesGuide",component:_d},{path:"/gpu-passthrough",name:"GPUPassthrough",component:Jd},{path:"/security-maintenance",name:"SecurityMaintenance",component:Cu}],Pu=wc({history:Ya("/proxmox-docs/"),routes:_u});fa(va).use(Pu).mount("#app");
