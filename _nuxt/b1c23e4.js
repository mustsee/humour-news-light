(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{318:function(t,n,e){"use strict";e.r(n);var o=e(29),r={computed:{loginPageMessage:function(){if(!this.routeParams.action)return null;var t=this.routeParams.action;return"You have to be logged in to ".concat(t,".")},routeParams:function(){return this.$route.params}},methods:{showAuthContainer:function(){var t=this,n=e(302),r=n.auth.AuthUI.getInstance();r||(r=new n.auth.AuthUI(o.b));var c={signInOptions:[o.a.Google],signInFlow:"popup",callbacks:{signInSuccessWithAuthResult:function(n){return t.signInResult(n)}}};r.start("#firebaseui-auth-container",c)},signInResult:function(t){var n=t.user,e=n.email,r=n.displayName,c=this.routeParams,l=c.id,h=c.action;return o.c.collection("users").doc(e).set({email:e,displayName:r},{merge:!0}),this.$router.push({name:"index",params:{id:l,action:h}}),!1}},activated:function(){this.showAuthContainer()},mounted:function(){this.showAuthContainer()}},c=(e(310),e(57)),component=Object(c.a)(r,(function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"main"},[e("div",{staticClass:"h-2"}),t._v(" "),e("div",{staticClass:"text-center"},[t._v(t._s(t.loginPageMessage))]),t._v(" "),e("div",{attrs:{id:"firebaseui-auth-container"}})])}),[],!1,null,null,null);n.default=component.exports}}]);