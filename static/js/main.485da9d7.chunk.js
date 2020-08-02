(this.webpackJsonpcovid_tracker=this.webpackJsonpcovid_tracker||[]).push([[0],{102:function(e,a,t){e.exports={container:"ChartError_container__o7PVP",text:"ChartError_text__25n4h"}},173:function(e,a,t){e.exports={background:"CustomMultiLineChart_background__1RuuR"}},174:function(e,a,t){e.exports={container:"Home_container__2FE8G",search:"Home_search__25bVJ",inputContainer:"Home_inputContainer__2ttl1",graphsContainer:"Home_graphsContainer__1QL2V",graphContainer:"Home_graphContainer__19xcp",graph:"Home_graph__1Livk"}},201:function(e,a,t){e.exports=t(391)},206:function(e,a,t){},23:function(e,a,t){e.exports={KPI:"KPI_KPI__1Pi1Y",value:"KPI_value__VpBqW",key:"KPI_key__1dX1j",KPIContainer:"KPI_KPIContainer__Nw140",row:"KPI_row__1WW3m",connected:"KPI_connected__1jvlp",separate:"KPI_separate__3zeix",column:"KPI_column__3KmTW"}},29:function(e,a,t){e.exports={MiddleSection:"MiddleSection_MiddleSection__2V0_b",graphContainer:"MiddleSection_graphContainer__1QaKv",circleChart:"MiddleSection_circleChart__1g-Nx",lineChart:"MiddleSection_lineChart__Ndo5c",lineChart2:"MiddleSection_lineChart2__1zrP6"}},389:function(e,a,t){},391:function(e,a,t){"use strict";t.r(a);var n,r=t(1),i=t.n(r),o=t(17),l=t.n(o),c=(t(206),t(9)),s=t(49),d=t.n(s),u=t(8),m=r.memo((function(e){var a=e.children;return r.createElement(u.b,null,r.createElement(u.c.div,{layout:!0,className:d.a.layout},r.createElement(u.c.div,{layout:!0,className:d.a.container},a),r.createElement(u.c.div,{initial:{x:"100vw"},animate:{x:0},transition:{type:"spring",stiffness:100,damping:300,mass:4,delay:.8},className:d.a.block1}),r.createElement(u.c.div,{initial:{y:"-100vh"},animate:{y:0},transition:{type:"spring",stiffness:100,damping:300,mass:4,delay:.8},className:d.a.block2})))})),p=t(105),h=t(42),_=t.n(h),f=t(50),v=t.n(f),y=r.memo((function(){return r.createElement("svg",{preserveAspectRatio:"none",className:v.a.svg,viewBox:"0 0 20 4.2"},r.createElement("filter",{id:"blurMe"},r.createElement("feGaussianBlur",{stdDeviation:".04"})),r.createElement("g",null,r.createElement("path",{strokeWidth:".1px",fill:"transparent",stroke:"#141c5a",strokeLinejoin:"round",d:"m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0"})),r.createElement("g",null,r.createElement("path",{className:v.a.animatedMiddle,d:"m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0"}),r.createElement("path",{className:v.a.animatedLeft,d:"m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0"}),r.createElement("path",{className:v.a.animatedRight,d:"m 0 3 l 3 0 l 1 1 l 12 0 l 1 -1 l 3 0"})))})),E=t(97),g=t(39),S=t(99),b=t.n(S),k=t(159);!function(e){e.RequestData="REQUEST_DATA",e.RequestDataSuccess="REQUEST_DATA_SUCCESS",e.RequestDataFailure="REQUEST_DATA_FAILURE"}(n||(n={}));var M=function(e){return function(){var a=Object(k.a)(b.a.mark((function a(t,r){var i;return b.a.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return t({type:n.RequestData}),a.prev=1,a.next=4,fetch("https://corona-api.com/countries/".concat(e)).then((function(e){return e.json()}));case 4:i=a.sent,t((o=i.data,{type:n.RequestDataSuccess,payload:o})),a.next=11;break;case 8:a.prev=8,a.t0=a.catch(1),t((r=a.t0,{type:n.RequestDataFailure,payload:r}));case 11:case"end":return a.stop()}var r,o}),a,null,[[1,8]])})));return function(e,t){return a.apply(this,arguments)}}()},C=t(177),N=r.memo((function(){var e=Object(g.b)(),a=Object(r.useState)({label:"United States",value:"US"}),t=Object(p.a)(a,2),n=t[0],i=t[1],o=Object(r.useMemo)((function(){return Object.entries(E).map((function(e){var a=Object(p.a)(e,2);return{label:a[0],value:a[1]}}))}),[E]);return r.createElement("form",{action:"",className:_.a.search},r.createElement(y,null),r.createElement("span",{className:_.a.location}),r.createElement("div",{className:_.a.inputContainer},r.createElement(C.a,{options:o,value:n,onChange:function(a){i(a),e(M(a.value))},className:_.a.select,isSearchable:!0})),r.createElement("span",{className:_.a.date}))})),B=t(29),I=t.n(B),T=t(10),R=function(e){var a=e%1,t=Math.floor(e);return"".concat(t.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1,")).concat(a>0?"."+a.toFixed(2).split(".")[1]:"")},A=t(70),x=t.n(A),P=t(102),K=t.n(P),L=r.memo((function(){return r.createElement(u.c.div,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},className:K.a.container},r.createElement("p",{className:K.a.text},"No data available"))})),G=r.memo((function(e){var a=e.pieData,t={deaths:{start:"hsl(332, 98%, 68%)",end:"hsl(344, 81%, 56%)",color:"#f1437d"},critical:{start:"hsl(43, 92%, 72%)",end:"hsl(27, 67%, 58%)",color:"#e09852"},recovered:{start:"hsl(203, 99%, 59%)",end:"hsl(230, 66%, 52%)",color:"#3362dd"},confirmed:{start:"hsl(167, 81%, 58%)",end:"hsl(192, 58%, 46%)",color:"#8884d8"}},n=null===a||void 0===a?void 0:a.slices.every((function(e){return 0===e.value}));return r.createElement(u.a,{exitBeforeEnter:!0},n?r.createElement(L,null):r.createElement(u.c.div,{layout:!0,key:"CustomPieChart",initial:{opacity:.5},animate:{opacity:1},exit:{opacity:.5},style:{width:"100%",height:"100%"}},r.createElement(T.i,{className:x.a.background},r.createElement(T.h,{margin:{top:10,right:10,left:10,bottom:10}},r.createElement("defs",null,Object.keys(t).map((function(e){return r.createElement("linearGradient",{id:e,key:e},r.createElement("stop",{offset:"5%",stopColor:t[e].start}),r.createElement("stop",{offset:"95%",stopColor:t[e].end}))}))),r.createElement(T.g,{dataKey:"value",data:null===a||void 0===a?void 0:a.slices,innerRadius:"50%",outerRadius:"80%",stroke:0,paddingAngle:0},a&&a.slices.map((function(e,a){return r.createElement(T.b,{key:"cell-".concat(a),fill:t[e.name].color})})),r.createElement(T.c,{position:"center",content:function(e){var t=e.viewBox,n={x:t.cx,y:t.cy};return r.createElement(T.j,Object.assign({className:"Testing-class"},n,{fill:"#8884d8",fontSize:16},{textAnchor:"middle",verticalAnchor:"middle",fontWeight:700}),R(a.total))}})),r.createElement(T.k,{contentStyle:{textTransform:"capitalize",backgroundColor:"#161f48",border:"0px solid transparent"},content:function(e){var a=e.active,t=e.payload;e.label;return a?r.createElement("div",{className:x.a.customTooltip},r.createElement("p",{style:{color:t[0].payload.fill},className:x.a.label},"".concat(t[0].name," : ").concat(R(t[0].value)))):null}}),r.createElement(T.d,{layout:"horizontal",align:"center",verticalAlign:"bottom",formatter:function(e,a){return r.createElement("span",{style:{color:t[e].color,textTransform:"capitalize",fontSize:12,fontWeight:700}},e)}})))))})),D=t(23),w=t.n(D),F=r.memo((function(e){var a=e.data,t=a||{key:"Loading",value:"Loading"},n=t.key,i=t.value;return r.createElement("div",{className:w.a.KPI},r.createElement("span",{className:w.a.value},i),r.createElement("span",{className:w.a.key},n))})),O=r.memo((function(e){var a=e.children,t=e.type,n=e.direction;return r.createElement("div",{className:"".concat(w.a.KPIContainer," ").concat(t?w.a[t]:w.a.separate," ").concat(n?w.a[n]:w.a.row)},a)})),W=t(173),U=t.n(W),H=r.memo((function(e){var a=e.data,t=e.scale,n=void 0===t?"linear":t,i=e.lines,o=e.yAxis,l=(e.loading,function(e){var a=new Date(e),t=a.getFullYear(),n=a.getMonth()+1,r=a.getDate();return"".concat(n,"/").concat(r,"/").concat(t)});return r.createElement(u.a,{exitBeforeEnter:!0},0===a.length?r.createElement(L,null):r.createElement(u.c.div,{key:"MiltiLineChart",initial:{opacity:.5},animate:{opacity:1},exit:{opacity:.5},style:{width:"100%",height:"100%"}},r.createElement(T.i,{className:U.a.background},r.createElement(T.f,{data:a,margin:{top:20,left:20,right:20,bottom:10}},r.createElement(T.a,{vertical:!1,strokeWidth:1.5,opacity:.5,stroke:"#293875"}),i.map((function(e){var a=e.dataKey,t=e.stroke,n=e.dot,i=e.strokeWidth;return r.createElement(T.e,{key:a,dataKey:a,stroke:t,dot:n,strokeWidth:i})})),r.createElement(T.l,{scale:"time",dataKey:"dateNumber",type:"number",domain:["dataMin","auto"],tickFormatter:function(e){return new Date(e).toDateString()},interval:30,tick:function(e){var a=e.x,t=e.y,n=(e.stroke,e.payload);return r.createElement("g",{transform:"translate(".concat(a,",").concat(t,")")},r.createElement("text",{x:0,y:0,dy:16,textAnchor:"middle",fill:"hsl(228,48%,50%)",fontSize:"14",fontWeight:"500",transform:"rotate(0)"},l(n.value)))},stroke:"hsl(228,48%,50%)"}),r.createElement(T.m,{dataKey:o,domain:["dataMin","dataMax"],scale:n,tickFormatter:R,stroke:"hsl(228,48%,50%)",allowDataOverflow:!0}),r.createElement(T.k,{labelFormatter:function(e){return l(e)},formatter:function(e,a,t){return R(e)},contentStyle:{textTransform:"capitalize",backgroundColor:"#161f48",border:"0px solid transparent"},labelStyle:{color:"white",fontWeight:500}})))))})),j={initial:function(e){return e.parent?{opacity:1}:{opacity:0,scale:.2}},show:function(e){return e.parent?{opacity:1}:{opacity:1,scale:1,transition:{type:"spring",delay:.15*e.index,duration:.5}}},exit:function(e){return e.parent?{opacity:1}:{opacity:0}}},V=r.memo((function(){var e=Object(g.c)((function(e){return e.graphData})),a=(e.error,e.errorMessage,e.loading),t=(e.data,e.pieData),n=e.KPI,i=e.timeline;return r.createElement(u.c.div,{layout:!0,variants:j,custom:{parent:!0,index:0},initial:"initial",animate:"show",exit:"exit",className:I.a.MiddleSection},r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:1},className:I.a.graphContainer},r.createElement(O,{type:"separate"},r.createElement(F,{data:null===n||void 0===n?void 0:n.critical}),r.createElement(F,{data:null===n||void 0===n?void 0:n.recovered}),r.createElement(F,{data:null===n||void 0===n?void 0:n.deaths}))),r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:2},className:I.a.graphContainer},r.createElement(O,{type:"connected"},r.createElement(F,{data:null===n||void 0===n?void 0:n.death_rate}),r.createElement(F,{data:null===n||void 0===n?void 0:n.cases_per_million_population}),r.createElement(F,{data:null===n||void 0===n?void 0:n.recovery_rate}))),r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:3},className:I.a.graphContainer},r.createElement(O,{type:"connected",direction:"column"},r.createElement(F,{data:null===n||void 0===n?void 0:n.name}),r.createElement(F,{data:null===n||void 0===n?void 0:n.population}),r.createElement(F,{data:null===n||void 0===n?void 0:n.updated_at}))),r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:4},className:I.a.graphContainer},r.createElement(G,{pieData:t})),r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:5},className:I.a.lineChart2},r.createElement(H,{data:i,scale:"linear",lines:[{type:"linear",dataKey:"new_confirmed",stroke:"#8884d8",dot:!1,strokeWidth:2},{type:"linear",dataKey:"new_recovered",stroke:"#3362dd",dot:!1,strokeWidth:2},{type:"linear",dataKey:"new_deaths",stroke:"#f1437d",dot:!1,strokeWidth:2}],yAxis:"new_confirmed",loading:a})),r.createElement(u.c.div,{variants:j,custom:{parent:!1,index:6},className:I.a.lineChart},r.createElement(H,{data:i,scale:"linear",lines:[{type:"linear",dataKey:"confirmed",stroke:"#8884d8",dot:!1,strokeWidth:2},{type:"linear",dataKey:"active",stroke:"#e09852",dot:!1,strokeWidth:2},{type:"linear",dataKey:"recovered",stroke:"#3362dd",dot:!1,strokeWidth:2},{type:"linear",dataKey:"deaths",stroke:"#f1437d",dot:!1,strokeWidth:2}],yAxis:"confirmed",loading:a})))})),z=t(43),J=t.n(z),Y=r.memo((function(e){return r.createElement("div",{className:J.a.BottomSection},r.createElement("svg",{preserveAspectRatio:"none",className:J.a.svg,viewBox:"0 0 20 4.2"},r.createElement("filter",{id:"blurMe"},r.createElement("feGaussianBlur",{stdDeviation:".04"})),r.createElement("filter",{id:"blurBorder"},r.createElement("feGaussianBlur",{stdDeviation:".04"})),r.createElement("g",{transform:"translate(0,.2)"},r.createElement("path",{strokeWidth:".1px",fill:"#0d1633",stroke:"#141c5a",strokeLinejoin:"round",filter:"url(#blurBorder)",d:"m 5 4 l 1 -4 l 8 0 l 1 4"})),r.createElement("g",{transform:"translate(0,.2)"},r.createElement("path",{className:J.a.animatedMiddle,d:"m 5 4 l 1 -4 l 8 0 l 1 4"}),r.createElement("path",{className:J.a.animatedLeft,d:"m 5 4 l 1 -4 l 8 0 l 1 4"}),r.createElement("path",{className:J.a.animatedRight,d:"m 5 4 l 1 -4 l 8 0 l 1 4"}))))})),Z=t(174),q=t.n(Z),Q=function(){return r.createElement(m,null,r.createElement("div",{className:q.a.container},r.createElement(N,null),r.createElement(V,null),r.createElement(Y,null)))},X=function(){return r.createElement("div",null," This is Admin route")};t(389);var $=function(){return i.a.createElement(c.d,null,i.a.createElement(c.b,{exact:!0,path:"/admin"},i.a.createElement(X,null)),i.a.createElement(c.b,{exact:!0,path:"/covid_tracker"},i.a.createElement(Q,null)),i.a.createElement(c.b,{path:"*"},i.a.createElement(c.a,{to:"/covid_tracker"})))},ee=t(96),ae=t(26),te=t(175),ne=t(178),re={loading:!1,error:!1,errorMessage:"",data:void 0,KPI:void 0,timeline:[],pieData:void 0},ie=function(e){return Object.keys(e).reduce((function(a,t){switch(t){case"name":a[t]={key:"Country",value:e[t]};break;case"population":a[t]={key:t,value:R(e[t])};break;case"updated_at":a[t]={key:"Last Update",value:new Date(e[t]).toLocaleString()};break;case"latest_data":Object.keys(e[t]).reduce((function(a,n){switch(n){case"calculated":Object.keys(e[t][n]).reduce((function(a,r){switch(r){case"cases_per_million_population":a[r]={key:"cases / Million",value:R(e[t][n][r])};break;case"death_rate":a[r]={key:"death rate",value:R(e[t][n][r])};break;case"recovery_rate":a[r]={key:"recovery rate",value:R(e[t][n][r])};break;default:a[r]={key:r,value:R(e[t][n][r])}}return a}),a);break;default:a[n]={key:n,value:R(e[t][n])}}return a}),a)}return a}),{})},oe=function(e){return e.timeline.map((function(e){return e.dateNumber=Date.parse(e.updated_at),e})).reverse()},le=function(e){return{slices:Object.entries(e.latest_data).reduce((function(e,a){return"number"===typeof a[1]&&"confirmed"!==a[0]&&e.push({name:a[0],value:a[1]}),e}),[]).filter((function(e){return e})),total:"number"===typeof e.latest_data.confirmed?e.latest_data.confirmed:0}},ce=Object(ae.combineReducers)({graphData:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:re,a=arguments.length>1?arguments[1]:void 0,t=Object(ne.a)({},e);switch(a.type){case n.RequestData:t.loading=!0,t.error=!1;break;case n.RequestDataSuccess:t.loading=!1,t.error=!1,t.data=a.payload,t.KPI=ie(a.payload),t.timeline=oe(a.payload),t.pieData=le(a.payload);break;case n.RequestDataFailure:t.loading=!1,t.error=!0,t.errorMessage=a.payload}return t}}),se=t(176),de=Object(ae.createStore)(ce,Object(se.composeWithDevTools)(Object(ae.applyMiddleware)(te.a)));de.dispatch(M("US"));var ue=de;Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(i.a.createElement(ee.a,null,i.a.createElement(g.a,{store:ue},i.a.createElement($,null))),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},42:function(e,a,t){e.exports={search:"TopSection_search__33u_E",inputContainer:"TopSection_inputContainer__1Nrg1",select:"TopSection_select__1Pp2L"}},43:function(e,a,t){e.exports={BottomSection:"BottomSection_BottomSection__1vdh6",svg:"BottomSection_svg__1IKIL",animatedMiddle:"BottomSection_animatedMiddle__1dGfo",toMiddle:"BottomSection_toMiddle__9E-9h",animatedLeft:"BottomSection_animatedLeft__Y0IQv",fromRight:"BottomSection_fromRight__1RocY",animatedRight:"BottomSection_animatedRight__20YJn",fromLeft:"BottomSection_fromLeft__10QlZ"}},49:function(e,a,t){e.exports={layout:"Layout_layout__gwcxd",container:"Layout_container__2HtMz",block1:"Layout_block1__27XyA",block2:"Layout_block2__1iDU5"}},50:function(e,a,t){e.exports={svg:"BackgroundTop_svg__2Deqp",animatedMiddle:"BackgroundTop_animatedMiddle__3DtyK",toMiddle:"BackgroundTop_toMiddle__2Wk2h",animatedLeft:"BackgroundTop_animatedLeft__MRkDx",fromRight:"BackgroundTop_fromRight__1vb4Y",animatedRight:"BackgroundTop_animatedRight__CAfcw",fromLeft:"BackgroundTop_fromLeft__3Ngem"}},70:function(e,a,t){e.exports={background:"CustomPieChart_background__3PQJw",customTooltip:"CustomPieChart_customTooltip__mOORe",label:"CustomPieChart_label__1Z2V5"}},97:function(e){e.exports=JSON.parse('{"Afghanistan":"AF","\xc5land Islands":"AX","Albania":"AL","Algeria":"DZ","American Samoa":"AS","Andorra":"AD","Angola":"AO","Anguilla":"AI","Antarctica":"AQ","Antigua and Barbuda":"AG","Argentina":"AR","Armenia":"AM","Aruba":"AW","Australia":"AU","Austria":"AT","Azerbaijan":"AZ","Bahrain":"BH","Bahamas":"BS","Bangladesh":"BD","Barbados":"BB","Belarus":"BY","Belgium":"BE","Belize":"BZ","Benin":"BJ","Bermuda":"BM","Bhutan":"BT","Bolivia, Plurinational State of":"BO","Bonaire, Sint Eustatius and Saba":"BQ","Bosnia and Herzegovina":"BA","Botswana":"BW","Bouvet Island":"BV","Brazil":"BR","British Indian Ocean Territory":"IO","Brunei Darussalam":"BN","Bulgaria":"BG","Burkina Faso":"BF","Burundi":"BI","Cambodia":"KH","Cameroon":"CM","Canada":"CA","Cape Verde":"CV","Cayman Islands":"KY","Central African Republic":"CF","Chad":"TD","Chile":"CL","China":"CN","Christmas Island":"CX","Cocos (Keeling) Islands":"CC","Colombia":"CO","Comoros":"KM","Congo":"CG","Congo, the Democratic Republic of the":"CD","Cook Islands":"CK","Costa Rica":"CR","C\xf4te d\'Ivoire":"CI","Croatia":"HR","Cuba":"CU","Cura\xe7ao":"CW","Cyprus":"CY","Czech Republic":"CZ","Denmark":"DK","Djibouti":"DJ","Dominica":"DM","Dominican Republic":"DO","Ecuador":"EC","Egypt":"EG","El Salvador":"SV","Equatorial Guinea":"GQ","Eritrea":"ER","Estonia":"EE","Ethiopia":"ET","Falkland Islands (Malvinas)":"FK","Faroe Islands":"FO","Fiji":"FJ","Finland":"FI","France":"FR","French Guiana":"GF","French Polynesia":"PF","French Southern Territories":"TF","Gabon":"GA","Gambia":"GM","Georgia":"GE","Germany":"DE","Ghana":"GH","Gibraltar":"GI","Greece":"GR","Greenland":"GL","Grenada":"GD","Guadeloupe":"GP","Guam":"GU","Guatemala":"GT","Guernsey":"GG","Guinea":"GN","Guinea-Bissau":"GW","Guyana":"GY","Haiti":"HT","Heard Island and McDonald Islands":"HM","Holy See (Vatican City State)":"VA","Honduras":"HN","Hong Kong":"HK","Hungary":"HU","Iceland":"IS","India":"IN","Indonesia":"ID","Iran, Islamic Republic of":"IR","Iraq":"IQ","Ireland":"IE","Isle of Man":"IM","Israel":"IL","Italy":"IT","Jamaica":"JM","Japan":"JP","Jersey":"JE","Jordan":"JO","Kazakhstan":"KZ","Kenya":"KE","Kiribati":"KI","Korea, Democratic People\'s Republic of":"KP","Korea, Republic of":"KR","Kuwait":"KW","Kyrgyzstan":"KG","Lao People\'s Democratic Republic":"LA","Latvia":"LV","Lebanon":"LB","Lesotho":"LS","Liberia":"LR","Libya":"LY","Liechtenstein":"LI","Lithuania":"LT","Luxembourg":"LU","Macao":"MO","Macedonia, the Former Yugoslav Republic of":"MK","Madagascar":"MG","Malawi":"MW","Malaysia":"MY","Maldives":"MV","Mali":"ML","Malta":"MT","Marshall Islands":"MH","Martinique":"MQ","Mauritania":"MR","Mauritius":"MU","Mayotte":"YT","Mexico":"MX","Micronesia, Federated States of":"FM","Moldova, Republic of":"MD","Monaco":"MC","Mongolia":"MN","Montenegro":"ME","Montserrat":"MS","Morocco":"MA","Mozambique":"MZ","Myanmar":"MM","Namibia":"NA","Nauru":"NR","Nepal":"NP","Netherlands":"NL","New Caledonia":"NC","New Zealand":"NZ","Nicaragua":"NI","Niger":"NE","Nigeria":"NG","Niue":"NU","Norfolk Island":"NF","Northern Mariana Islands":"MP","Norway":"NO","Oman":"OM","Pakistan":"PK","Palau":"PW","Palestine, State of":"PS","Panama":"PA","Papua New Guinea":"PG","Paraguay":"PY","Peru":"PE","Philippines":"PH","Pitcairn":"PN","Poland":"PL","Portugal":"PT","Puerto Rico":"PR","Qatar":"QA","R\xe9union":"RE","Romania":"RO","Russian Federation":"RU","Rwanda":"RW","Saint Barth\xe9lemy":"BL","Saint Helena, Ascension and Tristan da Cunha":"SH","Saint Kitts and Nevis":"KN","Saint Lucia":"LC","Saint Martin (French part)":"MF","Saint Pierre and Miquelon":"PM","Saint Vincent and the Grenadines":"VC","Samoa":"WS","San Marino":"SM","Sao Tome and Principe":"ST","Saudi Arabia":"SA","Senegal":"SN","Serbia":"RS","Seychelles":"SC","Sierra Leone":"SL","Singapore":"SG","Sint Maarten (Dutch part)":"SX","Slovakia":"SK","Slovenia":"SI","Solomon Islands":"SB","Somalia":"SO","South Africa":"ZA","South Georgia and the South Sandwich Islands":"GS","South Sudan":"SS","Spain":"ES","Sri Lanka":"LK","Sudan":"SD","Suriname":"SR","Svalbard and Jan Mayen":"SJ","Swaziland":"SZ","Sweden":"SE","Switzerland":"CH","Syrian Arab Republic":"SY","Taiwan, Province of China":"TW","Tajikistan":"TJ","Tanzania, United Republic of":"TZ","Thailand":"TH","Timor-Leste":"TL","Togo":"TG","Tokelau":"TK","Tonga":"TO","Trinidad and Tobago":"TT","Tunisia":"TN","Turkey":"TR","Turkmenistan":"TM","Turks and Caicos Islands":"TC","Tuvalu":"TV","Uganda":"UG","Ukraine":"UA","United Arab Emirates":"AE","United Kingdom":"GB","United States":"US","United States Minor Outlying Islands":"UM","Uruguay":"UY","Uzbekistan":"UZ","Vanuatu":"VU","Venezuela, Bolivarian Republic of":"VE","Viet Nam":"VN","Virgin Islands, British":"VG","Virgin Islands, U.S.":"VI","Wallis and Futuna":"WF","Western Sahara":"EH","Yemen":"YE","Zambia":"ZM","Zimbabwe":"ZW"}')}},[[201,1,2]]]);
//# sourceMappingURL=main.485da9d7.chunk.js.map