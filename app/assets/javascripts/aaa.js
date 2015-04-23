/**
 * @preserve The XO Analytics JS Library, this library is loaded directly by the knot layout
 * @version 2.4.23
 */

(function(){
    //inialize namespaces
    window.XO = window.XO || {};
    var xoa = window.XO.analytics = window.XO.analytics || {};
    var tags = (window.tk && window.tk.tags) || {};

    //globals
    xoa.apikey = "d2ermgzbwguebqpxd2ws23m3zs97y725xzk";
    xoa.cachebreaker = tags.cachebreaker || getRandom();
    xoa.environment = tags.environmentPrefix || "";
    xoa.timelineOn = false;


    //loader
    xoa.main = function(){

        var timeline = xoa.timeline;


        var log = xoa.log;
        var pg = xoa.page;
        var qs = pg.qs;
        var env = xoa.environment;
        var cb = xoa.cachebreaker;

        // turn timeline debugging on
        if(qs("xo_timeline")){
            xoa.timelineOn = true;
        }
        timeline("Start xo.analytics.js");
        xoa.sioenabled = (pg.subdomain != "weddingshop.theknot.com");

        xoa.segmentIO.track();
        trackActions();
        xoa.identify();


        window.xo = window.XO;

        function trackActions(){
            //reset analytics.track if it's already been set by analytics.head
            xoa.track = track;

            if(!xoa.actions) return;

            //track any leftover actions from analytics.head being loaded before the footer.
            while(xoa.actions.length > 0){
                var a = actions.pop();
                track(a.action, a.properties);
            }
        }

        function track(action, properties){
            if(!action) {
                log("xo.analytics", "no action specified in the track function");
            }

            var event = {};
            event.action = action;
            for(var key in properties){
                if(properties.hasOwnProperty(key)){
                    event[key] = properties[key];
                }
            }

            if(pg.isLoggedIn) {
                event.userId = pg.userId;
            }

            event.url = pg.url;
            xoa.segmentIO.trackEvent(event);
            log("track",event);
        }
    };

    function excluded(arr){
        for(var i = 0;i<arr.length;i++){
            if(document.location.href.indexOf(arr[i]) >= 0){
                return true;
            }
        }

        return false;
    }

    function getRandom(){
        return Math.floor(Math.random() * (new Date().getTime()));
    }

}());
/**
 * @module xo.analytics/iesucks
 * Shim String prototype functions for IE and other String and Object prototypes
 */

(function(){

    if(typeof String.prototype.trim !== 'function') {
        String.prototype.trim = function() {
            return this.valueOf().replace(/^\s\s*/, '').replace(/\s\s*$/, '');
        };
    }

    if(!('contains' in String.prototype)) {
        String.prototype.contains = function(str, startIndex) {
            return -1 !== String.prototype.indexOf.call(this, str, startIndex);
        };
    }

    if(!('containsAll' in String.prototype)) {
        String.prototype.containsAll = function(array){
            for(var i = 0;i<array.length;i++){
                if(!this.valueOf().contains(array[i])){
                    return false;
                }
            }
            return true;
        };
    }

    if(!('containsAny' in String.prototype)) {
        String.prototype.containsAny = function(array){
            for(var i = 0;i<array.length;i++){
                if(this.valueOf().contains(array[i])){
                    return true;
                }
            }
            return false;
        };
    }

    if(!('containsNone' in String.prototype)) {
        String.prototype.containsNone = function(array){
            return !this.valueOf().containsAny(array);
        };
    }

    if(!('matchAll' in String.prototype)) {
        String.prototype.matchAll = function(array){
            for(var i = 0;i<array.length;i++){
                if(this.valueOf() !== array[i]){
                    return false;
                }
            }
            return true;
        };
    }

    if(!('matchAny' in String.prototype)) {
        String.prototype.matchAny = function(array){
            for(var i = 0;i<array.length;i++){
                if(this.valueOf() === array[i]){
                    return true;
                }
            }
            return false;
        };
    }

    if(!('matchNone' in String.prototype)) {
        String.prototype.matchNone = function(array){
            return !this.valueOf().matchAny(array);
        };
    }

    if(!('endsWith' in String.prototype)) {
        String.prototype.endsWith = function(suffix){
            return this.indexOf(suffix, this.length - suffix.length) !== -1;
        };
    }

    if(!('startsWith' in String.prototype)) {
        String.prototype.startsWith = function(prefix){
            return this.indexOf(prefix) === 0;
        };
    }

    if(!('encode' in String.prototype)) {
        String.prototype.encode = function(){
            return encodeURIComponent(this.valueOf());
        };
    }

    if(!('decode' in String.prototype)) {
        String.prototype.decode = function(){
            return decodeURIComponent(this.valueOf());
        };
    }

    if(!('pascalize' in String.prototype)){
        String.prototype.pascalize = function(){
            return this.replace(/\w\S*/g, function(txt){
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            });
        };
    }

    if(!(window.console && console.log)) {
        window.console = {
            log: function(val){},
            debug: function(val){},
            info: function(val){},
            warn: function(val){},
            error: function(val){},
            timeStamp: function(val){}
        };
    }

    if(!Object.keys){
        Object.keys = (function () {
            'use strict';
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
                dontEnums = [
                    'toString',
                    'toLocaleString',
                    'valueOf',
                    'hasOwnProperty',
                    'isPrototypeOf',
                    'propertyIsEnumerable',
                    'constructor'
                ],
                dontEnumsLength = dontEnums.length;

            return function (obj) {
                if (typeof obj !== 'object' && (typeof obj !== 'function' || obj === null)) {
                    throw new TypeError('Object.keys called on non-object');
                }

                var result = [], prop, i;

                for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                        result.push(prop);
                    }
                }

                if (hasDontEnumBug) {
                    for (i = 0; i < dontEnumsLength; i++) {
                        if (hasOwnProperty.call(obj, dontEnums[i])) {
                            result.push(dontEnums[i]);
                        }
                    }
                }
                return result;
            };
        }());
    }

    if(!(window.JSON && window.JSON.stringify && window.JSON.parse)) {
        window.JSON = window.JSON || {};
        window.JSON.stringify = window.JSON.stringify || function (obj) {

            var t = typeof (obj);
            if (t != "object" || obj === null) {

                // simple data type
                if (t == "string") {
                    obj = '"'+obj+'"';
                }
                return String(obj);

            }
            else {

                // recurse array or object
                var n, v, json = [], arr = (obj && obj.constructor == Array);

                for (n in obj) {
                    if(!obj.hasOwnProperty(n)) {
                        continue;
                    }

                    v = obj[n]; t = typeof(v);

                    if (t == "string") {
                        v = '"'+v+'"';
                    } else if (t == "object" && v !== null) {
                        v = JSON.stringify(v);
                    }

                    json.push((arr ? "" : '"' + n + '":') + String(v));
                }

                return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
            }
        };

        // implement JSON.parse de-serialization
        window.JSON.parse = window.JSON.parse || function (str) {
            if (str === "") {
                str = '""';
            }
            eval("var p=" + str + ";");
            return p;
        };
    }

}());
/**
 * @module xo.analytics/page
 * Pre-load and alias standard HTTP and HTML properties, utility functions
 */

(function(xoa){
    var metas = getMetaTag;
    var qs = parseQueryString();
    var cookies = initCookies();
    var referrer = (document.referrer+"").toLowerCase() || "";
    var spoof = qs("spoof");
    var host = (qs("spoof") || window.location.host);
    var topdomain = getDomainPart(2, host);
    var subdomain = getDomainPart(3, host);
    var url = (window.location + "").toLowerCase();
    var path = window.location.pathname;
    var query = window.location.search.substring(1);
    var search = qs("q");
    var uriElems = getUriElems(url);
    var isMobileWeb = subdomain.indexOf("m.") === 0;
    var environment = host.contains("qa-") ? "qa" : "prod"

    //membership
    var mcookie = cookies.get("TMPAUTHTIX");
    var guid = mcookie.subcookie("guid");
    var userId = mcookie.subcookie("userId");
    var isLoggedIn = userId ? true : false;

    xoa.page = {
        metas:metas,
        qs:qs,
        cookies:cookies,
        spoof:spoof,
        host:host,
        topdomain:topdomain,
        subdomain:subdomain,
        url:url,
        path:path,
        query:query,
        search:search,
        uriElems:uriElems,
        referrer:referrer,
        isMobileWeb:isMobileWeb,
        guid:guid,
        userId:userId,
        isLoggedIn:isLoggedIn,
        environment:environment

    };

    xoa.log = function(cat, val){
        if(typeof val !== "string"){
            val = JSON.stringify(val);
        }

        if(qs("verbose") && console && console.log) {
            console.log(cat + ":" + val);
        }
    };

    xoa.timeline = function(event){
        if(!xoa.timelineOn) return;

        if(!window.timeline) window.timeline = new Date();
        xoa.log("Timeline",
            JSON.stringify({
                action:event,
                start:new Date(),
                fromStart: new Date() - window.timeline
            })
        );
    };

    xoa.loadjs = function(url, callback, async, nocache) {
        //retrieved from http://www.blog.cordslatton.com/2010/11/investigating-the-jquery-source/
        var head = document.documentElement,
            script = document.createElement("script");

        if (nocache) {
            var random = getRandom();
            url += (url.lastIndexOf("?") === -1) ? "?" : "&";
            url += "rnd=" + random;
        }

        script.src = url;
        script.async = async;
        var done = false;

        //Attach handlers for all browsers
        script.onload = script.onreadystatechange = function () {
            if (!done && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) {
                done = true;
                if (callback) {
                    callback();
                }

                //handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
            }
        };

        //use insertBefore instead of appendChild to circumvent an IE6 bg.
        //this arises when a base node is used
        if (head && head.firstChild) {
            head.insertBefore(script, head.firstChild);
        }
    };

    function getMetaTag(name) {
        var metatags = document.getElementsByTagName("meta");
        for (var i = 0; i < metatags.length; i++) {
            if (metatags[i].name == name) {
                return metatags[i].content || "";
            }
        }
        return "";
    }

    function parseQueryString() {
        var match,
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace("+", " "));
            },
            query = window.location.search.substring(1);

        var urlParams = {};
        match = search.exec(query);
        while (match){
            urlParams[decode(match[1])] = decode(match[2]);
            match = search.exec(query);
        }

        return function (name) {
            var value = urlParams[name] || "";
            return value.toString();
        };
    }

    function initCookies() {
        return {
            set: function (name, value, minutesToExpire, domain) {
                var expire = "";
                var theDomain = "";
                if ("undefined" != typeof (minutesToExpire) && null !== minutesToExpire) {
                    var d = new Date();
                    d.setTime(d.getTime() + (1000 * 60 * parseFloat(minutesToExpire)));
                    expire = "; expires=" + d.toUTCString();
                }
                if (typeof (domain) != "undefined") {
                    theDomain = "; domain=" + domain;
                }
                if (typeof (name) == "undefined") {
                    name = "";
                }
                return (document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value || "") +
                expire + theDomain + "; path=/");
            },
            get: function (name) {
                var result = {
                    value: "",
                    subcookie: function (name) {
                        if (!this.value) {
                            return "";
                        }
                        if (this.value.indexOf("&") < 0){
                            return "";
                        }

                        var pairs = this.value.split("&");
                        for (var j = 0; j < pairs.length; j++) {
                            var pair = pairs[j].split("=");
                            if (pair[0] == name) {
                                return pair[1];
                            }
                        }

                        return "";
                    }
                };

                var cookieArray = document.cookie.split(';');
                for (var i = 0; i < cookieArray.length; i++) {
                    var c = cookieArray[i];
                    var cookieName = c.slice(0, c.indexOf("=")).trim();
                    if (cookieName === name) {
                        result.value = decodeURIComponent(c.slice(c.indexOf("=") + 1).trim());
                        return result;
                    }
                }

                return result;
            },
            erase: function (name, domain) {
                var cookie = this.get(name) || true;
                if (typeof (domain) != "undefined") {
                    this.set(name, "", -1, domain);
                } else {
                    this.set(name, "", -1);
                }
                return cookie;
            },

            accept: function () {
                if (typeof navigator.cookieEnabled === "boolean") {
                    return navigator.cookieEnabled;
                }
                this.set("_test", "1");
                return (this.erase("_test") === "1");
            }
        };
    }

    function getDomainPart(max, host) {
        var parts = (host || window.location.host).toLowerCase().split(".");
        if (!parts) {
            return "";
        }

        var start = (parts.length - max) < 0 ? 0 : parts.length - max;
        var ar = parts.slice(start);
        return ar.join(".");
    }

    function getUriElems(uri) {
        if ('undefined' == typeof (uri) || null === uri) {
            return [];
        }
        var path = (uri.indexOf("?") >= 0) ? uri.substring(0, uri.indexOf("?")) : uri;
        path = (path.indexOf(".com") >= 0) ? path.substring(path.indexOf(".com") + 4) : path;
        path = (path.indexOf(".com") >= 0) ? path.substring(path.indexOf(".com") + 4) : path;
        return path.substring(path.indexOf('/') + 1).split('/');
    }
}(window.XO.analytics));
/**
 * @module xo.analytics/identify
 * Calls Membership API every 30 minutes and sends identify call to Segment.IO
 */

(function(xoa){
    var keys = {
        'qa' :  {
            "/content": "e7ir1g04oe",
            "/marketplace": "4q63dqufk1",
            "/fashion" :"v4a9flro1y",
            "/real-weddings": "5fx7atkt09",
            "/account": "2ur6iteefi",
            "/boards": "2ogoid7snm",
            "/search": "4D7LOZAiq8zaO1AHvYyvtio7ZguyjLjn",
            "/concierge": "Hq4Gjb4eAqnSUgDyEsaWtflICgkXbhWP",
            "/wedding-checklist": "ULn8Iw0RMs",
            "/registry": "0cJmaZ9GGX",
            "/gs": "5niwjgxx8r",
            //fallback
            "qa-beta.theknot.com": "tsvpc36u5t",
            "qa.theknot.com": "tsvpc36u5t",
            "kleinfeldbridal.com": "hvCIGxjoy21L8XMpSEb4HIYoG8Yu64U1",
            "davidsbridal.com": "hvCIGxjoy21L8XMpSEb4HIYoG8Yu64U1"

        },
        'prod'   :  {
            "test": "aqnc56ddpn",
            "/content": "0ritjygxd2",
            "/marketplace": "uukofsrfdk",
            "/fashion" :"orr3w08ib5",
            "/real-weddings": "9yl6pv9mpp",
            "/account": "jutmk2sr0l",
            "/boards":"qscoxk9qou",
            "weddingshop.theknot.com":"9m0gxtdu8h",
            "/search": "4hQFkoqRsS2BD7ITUoe8eP0kjFDBiYIU",
            "/concierge": "UndafU4oDA",
            "/wedding-checklist": "NcJGRlRJjZ",
            "/registry": "qXyI9slRip",
            "/gs": "nibq354xak",
            //fallback
            "beta.theknot.com": "9pgpjyo4ux",
            "theknot.com":  "9pgpjyo4ux",
            "xogroupinc.com": "i2hqx146t8",
            "kleinfeldbridal.com": "cLpDERX2N22Gfr6GNU6HDxnzHqNqvYWh",
            "davidsbridal.com": "cLpDERX2N22Gfr6GNU6HDxnzHqNqvYWh"
        }
    };

    xoa.keys = {
        setEnvironment : function(envrionment){
            this.environment = envrionment || 'prod';
        },
        get : function(page){
            if((this.current === undefined)){
                for (var environment_key in keys[this.environment]) {
                    if (keys[this.environment].hasOwnProperty(environment_key) && (page.subdomain.contains(environment_key) || page.path.contains(environment_key))) {
                        this.domain = environment_key;
                        this.current = keys[this.environment][environment_key];
                        break;
                    }
                }
            }

            return this.current;
        }

    };
}(window.XO.analytics));
/**
 * @module xo.analytics/trackPage
 * Uses meta tags and dom to determine Page ID and Category ID for Page Load event
 */

(function(xoa){
    var pg = xoa.page;
    var metas = pg.metas;
    var qs = pg.qs;
    var cookies = pg.cookies;

    xoa.trackPage = function() {
        var tr = getTracker();

        //prefix
        applyMobilePrefix();

        //odb-category cookie
        setCategoryCookie();

        setSearchValues();
        setCampaignValues();

        tr.pid = tr.pid.pascalize();
        tr.cid = tr.cid.pascalize();

        xoa.track("Page Load", {
            pageLoad:true,
            pageId:tr.pid,
            categoryId:tr.cid,
            eventId:0,
            searchQuery:tr.searchQuery,
            searchResultsCount:tr.searchResultsCount,
            campaign:tr.campaign,
            sitePromotion:tr.sitePromotion,
            skipsio:false,
            skipga:true
        });

        return tr;

        function setSearchValues(){
            if(qs("q") || metas("cm_search")){
                tr.searchQuery = qs("q") ||  metas("cm_search");
                tr.searchResultsCount = metas("cm_totalRecs");
            }
        }

        function setCampaignValues(){
            if(qs("cm_mmc")) {
                tr.campaign = qs("cm_mmc");
            } else if(qs("cm_ven")) {
                //legacy CM campaigns in responsys emails
                tr.campaign = [qs("cm_ven"),qs("cm_cat"),qs("cm_ite")].join("-_-");
            }

            //legacy CM campaigns in responsys emails
            if(qs("cm_ven")) {
                tr.campaign = [qs("cm_ven"),qs("cm_cat"),qs("cm_ite")].join("-_-");
            }

            if(qs("cm_sp")){
                tr.sitePromotion = qs("cm_sp");
            }
        }

        function setCategoryCookie(){
            if(pg.path.contains("/weddings/photos")){
                cookies.set("analytics.source",tr.cid,null,pg.topdomain);
            }

            if(pg.path.contains("/weddings/albums")){
                cookies.set("analytics.source",tr.pid,null,pg.topdomain);
            }

            if(pg.subdomain == "galleries.weddingchannel.com"){
                cookies.set("analytics.source",tr.cid,null,pg.topdomain);
            }
        }

        function applyMobilePrefix(){
            if(pg.subdomain.indexOf("m.") === 0) {
                tr.pid = "mobile: " + tr.pid;
                tr.cid = "mobile: " + tr.cid;
            }

            if (navigator.userAgent.toLowerCase().indexOf("xoxo/") >= 0) {
                tr.pid = "mobile app frame: " + tr.pid;
                tr.cid = "mobile app frame: " + tr.cid;
                tr.pid = "mobile app frame:" + tr.pid;
                tr.cid = "mobile app frame:" + tr.cid;
            }
        }

        function getTracker() {
            //meta tags
            var mttr = getMetaTagTracker();
            if (mttr) {
                return mttr;
            }

            //hardcoded trackers (home pages, manual etc)
            var hctr = getHardcodedTracker();
            if(hctr){
                return hctr;
            }

            //sitecore
            var sctr = getSitecoreTracker();
            if (sctr) {
                return sctr;
            }

            //weddingChannel pre-tags interception
            var wctr = getWeddingChannelTracker();
            if(wctr) {
                return wctr;
            }

            //The Bump Tools
            var bttr = getBumpToolsTracker();
            if(bttr) {
                return bttr;
            }

            return {
                pid:pg.url,
                cid:"uncategorized"
            };
        }

        function getBumpToolsTracker(){
            if(pg.topdomain != "thebump.com"){
                return null;
            }

            var result = {
                pid:"",
                cid:""
            };

            var path = pg.path;
            var query = pg.query;
            var elems = pg.uriElems;

            if (path.contains("/pregnancychecklist/")) {
                result.pid = "Pregnancy Checklist";
                result.cid = "Pregnancy Checklist";

                if (path.contains("currenttasks.aspx")) {
                    result.pid += ": Home Page";
                }
                if (path.contains("alltasks.aspx")) {
                    result.pid += ": All Items";
                }
                if (path.contains("completeditems.aspx")) {
                    result.pid += ": Completed Items";
                }
                if (query.contains("loadmode=bydate")) {
                    result.pid += ": By Date";
                }
                if (query.contains("loadmode=bycategory")) {
                    result.pid += ": By Category";
                }
                if (path.containsAny(["addtasks.aspx","myitems.aspx"])){
                    result.pid += ": My Items";
                    if (query.contains("taskid=")) {
                        result.pid += ": Edit";
                    } else if (query.contains("member=")) {
                        result.pid += ": Add";
                    }
                }

                return result;
            }

            //tickers
            if (path.contains("/tickers/") && elems.length >= 1) {
                var page = elems[elems.length - 1];
                page = page.split(".")[0];

                if (page === null || page === "" || page == "default"){
                    result.pid = "Tickers: Home";
                    result.cid = "Tickers: Home";
                    return result;
                }

                result.pid = page;
                result.pid = result.pid.replace("Ticker", "Ticker: ").replace("Generate Ticker: ","Generate Ticker");

                var catid = page.substring(0,page.indexOf("Ticker"));
                result.cid = "Tickers: " + catid;

                return result;
            }

            if (path.contains("/baby-names/")){
                result.pid = "Baby Names";
                result.cid = "Baby Names";

                if (elems.length < 1) {
                    return result;
                }

                if (elems.length == 2 && elems[1] == "a"){
                    result.pid += ": Home";
                } else if (elems.length == 2 && elems[1].length == 1){
                    result.pid += ": Browse by Letter";
                } else if (path.contains("/boys")) {
                    result.pid += ": Browse Boy Names";
                } else if (path.contains("/girls")){
                    result.pid += ": Browse Girl Names";
                } else if (path.contains("/origins")) {
                    result.pid += ": Origins";
                } else if (path.contains("/origins/")){
                    result.pid += ": Browse by Origin";
                } else if (path.contains("/my-favorites")){
                    result.pid += ": Favorite Names";
                } else if (path.contains("/my-name-lists")){
                    result.pid += ": My Name Lists";
                } else if (path.contains("/my-name-lists/")){
                    result.pid += ": Name Voting";
                } else if (path.contains("/featured-name-lists")){
                    result.pid += ": Featured Name Lists";
                } else if (path.contains("/search")){
                    result.pid += ": Search Results";
                } else if (elems.length == 2) {
                    result.pid += ": Name Detail";
                }

                return result;
            }

            return null;
        }

        function getWeddingChannelTracker(){
            window.cmwPageID = window.cmwPageID || "";
            window.cmwCatID = window.cmwCatID || "";
            if(pg.topdomain == "weddingchannel.com" &&
                window.cmwPageID &&
                window.cmwCatID) {
                return {
                    pid: window.cmwPageID,
                    cid: window.cmwCatID
                };
            }

            return null;
        }

        function getMetaTagTracker() {
            var result = {
                pid: metas("cm_pageid"),
                cid: metas("cm_catid")
            };

            if(!(result.pid&&result.cid)) {
                return null;
            }

            return result;
        }

        function getHardcodedTracker(){
            var trackers = [
                {pages: ["/","/default.aspx"],
                    pid:"Home Page",cid:pg.topdomain},
                {pages: ["/calculators/ovulation.aspx"],
                    pid:"Tools: Fertility: Ovulation Calculator",
                    cid:"TOOLS: FERTILITY"},
                {pages: ["/calculators/duedate.aspx"],
                    pid:"Tools: Pregnancy: Due Date Calculator",
                    cid:"TOOLS: PREGNANCY"},
                {pages: ["/calculators/chinesegenderchart.aspx"],
                    pid:"Tools: Pregnancy: Chinese Gender Chart",
                    cid:"TOOLS: PREGNANCY"},
                {pages: ["/calculators/contraction.aspx"],
                    pid:"Tools: Pregnancy: Contraction Counter",
                    cid:"TOOLS: PREGNANCY"}

                //todo: add more hardcoded trackers here
            ];

            for(var i=0;i<trackers.length;i++){
                var pages = trackers[i].pages;

                for(var j=0;j<pages.length;j++) {
                    if (pages[j] == pg.path){
                        return trackers[i];
                    }
                }
            }

            return null;
        }

        function getSitecoreTracker() {

            var domains = [
                "wedding.theknot.com",
                "ideas.thenest.com",
                "pregnant.thebump.com",
                "www.xogroupinc.com",
                "weddings.weddingchannel.com",
                "m.theknot.com",
                "m.thebump.com"
            ];

            if(pg.subdomain.matchNone(domains)) {
                return null;
            }

            var result = {pid: "", cid: ""};
            var channel, subchannel, type, page;
            var urielems = pg.uriElems;

            for (var i = 0; urielems && i < urielems.length; i++) {
                switch (i) {
                    case 0:
                        channel = clean(urielems[i]);
                        break;
                    case 1:
                        subchannel = clean(urielems[i]);
                        break;
                    case 2:
                        type = (urielems[i] === "qa") ? "Q and A" : clean(urielems[i]);
                        break;
                    case 3:
                        page = clean(urielems[i]);
                        break;
                }
            }
            if (!type) {
                type = "Home";
            }

            if (!page) {
                page = "Page";
            }

            result.cid = (subchannel) ? subchannel : channel;
            result.cid = result.cid + ": " + type;

            result.pid = channel ? channel : "";
            result.pid += subchannel ? ": " + subchannel : "";
            result.pid += type ? ": " + type : "";
            result.pid += page ? ": " + page : "";

            return result;

        }
    };

    function clean(str) {
        var ret = str.replace(/[\-|_]+/gi, " ");
        ret = ret.replace(/\.aspx/gi, "");
        ret = ret.replace(/\b\w/g, function (c) {
            return c.toUpperCase();
        });
        return ret;
    }
}(window.XO.analytics));
/**
 * @module xo.analytics/trackMembership
 * Determines which sub application fired a Membership gate and calls track
 */

(function(xoa){
    var pg = xoa.page;
    var qs = pg.qs;
    var cookies = pg.cookies;

    xoa.trackMembership = function(pt) {
        var target = qs("target").decode().toLowerCase();
        var gateCookie = cookies.get("gate").value;

        //may not need to track update page anymore
        var isUpdatePage = (pt.pid.contains("Membership - Update Account"));

        var isLoginPage = pt.pid.contains("Membership - Join Page") //tk, tb, tn
            || pg.url.contains("account/login") //mobile
            || (pt.pid == "Login" && pt.cid=="Membership"); //weddngchannel

        var isCreatePage = qs("gate")
            || pt.pid.contains("Membership - Create Account")
            || pg.url.contains("account/register") //mobile
            || (pt.pid == "Join" && pt.cid=="Membership"); //weddngchannel

        var gate = getGate();
        gate = applyMobilePrefix(gate);
        gate = gate.pascalize();

        if(isUpdatePage){
            xoa.setIdentifyOnNext("1");
        }

        if(isLoginPage){
            setGateCookie(gate);

            xoa.track("Membership Prompt",{
                category: "Membership",
                scenario: "Membership",
                step: 1,
                conversion: false,
                gate: gate,
                skipsio: true,
                skipga: true,
                label: gate
            });

            xoa.track("Login Prompt", {
                category: "Membership",
                scenario: "Login",
                step: 1,
                conversion: false,
                gate: gate,
                label: gate,
                skipsio: true
            });

            cookies.set("analytics.laststep","login",null,pg.topdomain);
            xoa.setIdentifyOnNext("1");

        } else if(isCreatePage) {
            if(!gateCookie) {
                setGateCookie(gate);
            }
            cookies.set("analytics.laststep","create",null,pg.topdomain);

            xoa.track("Membership Form",{
                category: "Membership",
                scenario: "Membership",
                step: 2,
                conversion: false,
                gate: gate,
                label: gate,
                skipsio: true
            });

        } else {
            if(gateCookie && pg.isLoggedIn){

                gate = gateCookie;

                var lastStep = cookies.get("analytics.laststep").value;
                cookies.erase("analytics.laststep",pg.topdomain);
                if(lastStep == "create"){
                    xoa.track("Membership Created",{
                        category: "Membership",
                        scenario: "Membership",
                        step: 3,
                        conversion: true,
                        gate: gate,
                        registeredVisitor: true,
                        label: gate,
                        skipsio: true
                    });
                } else {
                    xoa.track("Login Completed", {
                        category: "Membership",
                        scenario: "Login",
                        step: 2,
                        conversion: true,
                        gate: gate,
                        label: gate,
                        skipsio: true
                    });
                }
                setGateCookie(null);
                xoa.setIdentifyOnNext("1");
            }
        }


        function setGateCookie(val) {
            if(val) {
                cookies.set("gate",val,null,pg.topdomain);
            } else {
                cookies.erase("gate", pg.topdomain);
            }
        }

        function applyMobilePrefix(gate){
            if(pg.subdomain.indexOf("m.") === 0) {
                return "mobile: " + gate;
            }

            return gate;
        }

        function getGate(){
            var gates = getGates();

            //shared gates
            var sharedGates = gates.shared;
            for(var shared in sharedGates){
                if(sharedGates.hasOwnProperty(shared)){
                    //execute the functions above in order, if they return a value break out of the loop
                    var sharedResult = sharedGates[shared]();
                    if(sharedResult) {
                        return sharedResult;
                    }
                }
            }

            //site specific
            if(gates[pg.topdomain]){
                var siteGates = gates[pg.topdomain];
                for(var gate in siteGates){
                    if(siteGates.hasOwnProperty(gate)){
                        //execute the functions above in order, if they return a value break out of the loop
                        var result = siteGates[gate]();
                        if(result) {
                            return result;
                        }
                    }
                }
            }

            var t = target ? target : "no target specified";
            return ("uncategorized: " + t);
        }

        function getGates(){
            return {
                "shared":{
                    source: function(){
                        var src = qs("source").toLowerCase();

                        //hack for header join link;
                        src = src.replace("header join+link","header join link");

                        return src || null;
                    },
                    forums:function(){
                        if(target.contains("forums")) {
                            return "forums";
                        }

                        return null;
                    },
                    checklist:function(){
                        if(target.containsAll(["planning.","checklist"])){
                            return "checklist";
                        }

                        return null;
                    },
                    biobuilder:function(){
                        if(target.contains("/biobuilder")){
                            return "biobuilder";
                        }

                        return null;
                    },
                    inspiration_boards:function(){
                        if(target.contains("/inspiration-boards")){
                            return"inspiration boards";
                        }

                        return null;
                    },
                    member_dashboard:function(){
                        if(target.containsAny(["/profiles","/currentusername"])){
                            return "member dashboard";
                        }

                        return null;
                    },
                    contest:function(){
                        if(!target.contains("/contests")) {
                            return null;
                        }

                        var contest = "unknown contest";
                        var parts = pg.uriElems;
                        if(parts && parts.length > 1) {
                            contest = parts[0] + "-" + parts[1];
                        }

                        return contest;
                    },
                    newsletter:function(){
                        if(target.contains("emailpreferences.aspx")){
                            return "newsletter";
                        }

                        return null;
                    }
                },
                "thenest.com":{
                    notebook:function(){
                        if(target.contains("mynotebook.aspx")){
                            return "notebook";
                        }

                        return null;
                    },
                    decor:function(){
                        if(target.containsAny(["/home-decor/","/decor/"])){
                            return "home decor";
                        }

                        return null;
                    },
                    recipes:function(){
                        if(target.contains("/recipes")){
                            return "recipes";
                        }

                        return null;
                    }
                },
                "thebump.com":{
                    babynames:function(){
                        if(target.contains("/baby-names")){
                            return "baby names";
                        }

                        return null;
                    },
                    babymorpher:function(){
                        if(target.contains("/baby-morpher")){
                            return "baby morpher";
                        }

                        return null;
                    },
                    //mobile
                    articles:function(){
                        if(target.containsAny(["/slideshows","/articles"])){
                            return "articles";
                        }

                        return null;
                    }
                },
                "weddingchannel.com":{
                    odb:function(){
                        var themes = [
                            "wedding-dresses",
                            "bridesmaid-dresses",
                            "flower-girl-dresses",
                            "mother-of-the-bride-dresses"
                        ];
                        for(var i=0;i<themes.length;i++){
                            if(target.contains("/" + themes[i] + "/")){
                                return themes[i];
                            }
                        }

                        return null;
                    },
                    galleries:function(){
                        if(!target.contains("galleries.weddingchannel.com")) {
                            return null;
                        }

                        var source = cookies.get("analytics.source").value || "uncategorized";
                        cookies.erase("analytics.source");

                        return "gallleries:" + source;
                    },
                    vendors:function(){
                        if(target.containsAll(["vendors","local.weddingchannel.com"])){
                            return "local vendors";
                        }
                        return null;
                    },
                    fashion:function(){
                        if(target.contains("wedding-fashion")){
                            return "fashion";
                        }

                        return null;
                    },
                    websites:function(){
                        if(target.contains("wws.weddingchannel.com")){
                            return "wedding websites";
                        }
                        return null;
                    },
                    hair:function(){
                        if(target.contains("wedding-hair")){
                            return "virtual hair makeover";
                        }

                        return null;
                    }
                },
                "theknot.com":{
                    budgeter:function(){
                        if(target.containsAll(["planning.theknot.com","budget"])){
                            return "budgeter";
                        }

                        return null;
                    },
                    guest_list:function(){
                        if(target.contains("wedding-guests")){
                            return "guest list";
                        }

                        return null;
                    },
                    my_real_wedding:function(){
                        if(target.containsAny(["myrealwedding.theknot.com","my-real-wedding"])){
                            return "my real wedding";
                        }

                        return null;
                    },
                    universal_website:function(){
                        if(target.contains("uw.theknot.com")){
                            return "universal websites";
                        }

                        return null;
                    },
                    odb:function(){
                        var isodb = false;
                        var source = cookies.get("analytics.source").value ||
                            "photo galleries";



                        var themes = [
                            "wedding-dress",
                            "bridesmaid-dress",
                            "flower-girl-dress",
                            "mother-of-the-bride-dress"
                        ];
                        for(var i=0;i<themes.length;i++){
                            if(target.contains("/" + themes[i] + "/")){
                                source = themes[i];
                                isodb = true;
                            }
                        }

                        if(target.containsAny(["/weddings/albums","/weddings/photo"])){
                            isodb = true;
                        }

                        if(isodb) {
                            cookies.erase("analytics.source",pg.topdomain);
                            return source;
                        }

                        return null;
                    },
                    vendors:function(){
                        if(target.contains("vendors")){
                            return "local vendor profiles";
                        }

                        return null;
                    },
                    slideshows:function(){
                        if(target.containsAll(["wedding.theknot.com","page="])){
                            return "slideshows";
                        }

                        return null;
                    },
                    deals_and_offers:function(){
                        if(target.contains("dealsandoffers.aspx")){
                            return "deals and offers";
                        }

                        return null;
                    },
                    mobile_slideshows:function(){
                        if(target.containsAll(["m.theknot.com","/articles"])){
                            return "slideshows";
                        }

                        return null;
                    }
                }
            };
        }
    };

}(window.XO.analytics));
/**
 * @module xo.analytics/identify
 * Calls Membership API every new session minutes and sends identify call to Segment.IO
 */

(function(xoa){
    var pg = xoa.page;
    var qs = pg.qs;
    var cookies = pg.cookies;
    var apikey = xoa.apikey;

    // Allow to identify on the next page load by setting a cookie,
    // this is not currently in use
    xoa.setIdentifyOnNext=function(val){
        if(val) {
            cookies.set("analytics.identifyOnNext",val,null, pg.topdomain);
        } else {
            cookies.erase("analytics.identifyOnNext", pg.topdomain);
        }
    };

    // Set a session cookie indicating that the current user has been
    // identified and does not need to be re-identified in the current
    // session
    xoa.setIdentified=function(val){
        if(val) {
            cookies.set("_xo_session", val, null, pg.topdomain);
        } else{
            cookies.erase("_xo_session", pg.topdomain);
        }
    }

    //every new session, or if forced, retrieves membership info from membership and sends
    //to Segment.IO
    xoa.identify = function(){
        if(!xoa.sioenabled) return;

        var forceIdentify = true;
        var identified = cookies.get("_xo_session").value;
        xoa.log('Already identified in this session? 1 is yes', identified);

        if(identified === "" || forceIdentify){
            if(window.XO && window.XO.membership){
                identify();
            } else {
                xoa.loadjs("//www.xoedge.com/jscripts/shared/xo/xo-latest.min.js");
                xoa.loadjs("//www.xoedge.com/jscripts/shared/xo/xo.membership/xo.membership-latest.min.js",identify);
            }
        }
    };

    function identify(){
        if(!pg.isLoggedIn || window.location.href.indexOf('/gateway') !== -1){
            xoa.log("identify","member not logged in, or on gateway");
            return;
        }

        XO.membership.member(
            {
                apikey: apikey
            },
            {
                type: 'GET',
                success: function (data, textStatus, jqXHR) {
                    var traits = getTraits(data.MemberDataEntity);

                    //call segment.io
                    setTimeout(function(){
                        analytics.identify(traits.userId,traits);
                    },1500)

                    xoa.log("identify",traits);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.error(errorThrown);
                },
                jsonp: "jsonp"
            }
        );
        // Indicate that the user has been identified
        xoa.setIdentified("1");
    }

    function getTraits(member){

        return {
            weddingDate:getWeddingDateFormatted(),
            email:member.Email,
            firstName:member.FirstName,
            lastName:member.LastName,
            username:member.UserName,
            weddingBudget:getProperty('WeddingBudget'),
            weddingSize:getProperty('WeddingGuests'),
            gender:getGender(),
            weddingCountdown: getCountdown(),
            userId: getProperty('UserIdString')
            /*createdAt: */


        };

        function getWeddingDateFormatted(){
            var weddingDate = getWeddingDate(),
                weddingDateFormatted = undefined;

            if(weddingDate !== undefined){
                weddingDateFormatted = weddingDate.getFullYear()
                + '-' + weddingDate.getMonth()
                + '-' + weddingDate.getDay();
            }
            return weddingDateFormatted;
        }
        //Jasmin Me
        function getWeddingDate(){
            var weddingDateString = getProperty('WeddingDateString'),
                weddingDate = null;

            if(weddingDateString !== "Not Specified" && weddingDateString !== '1/1/0001'){
                weddingDate = new Date(weddingDateString);
                return weddingDate;
            }else{
                return undefined;
            }

        }

        function getCountdown(){

            var weddingDate = getWeddingDate(),
                currentDate = new Date(),
                day = 1000*60*60*24;
            if(weddingDate === undefined){
                return;
            }
            return Math.ceil((weddingDate.getTime() - currentDate.getTime())/(day))

        }

        function getProperty(propertyName){
            if(member.hasOwnProperty(propertyName)){
                return member[propertyName];
            }
            return "Not Specified";
        }

        function getGender(){
            if(member.hasOwnProperty("Gender")){
                switch (member.Gender){
                    case 1:
                        return "Male";
                    case 2:
                        return "Female";
                    default:
                        return "Not Specified";
                }
            }

            return "Not Specified";
        }
    }
}(window.XO.analytics));
/**
 * @module xo.analytics/thirdParty/segmentIO
 * Segment.IO functions
 */


(function(xoa){
    var pg = xoa.page;

    xoa.segmentIO = {

        trackEvent:function(event){
            if(xoa.sioenabled && window.analytics){
                window.analytics.track(event.action, event);
            }
        },

        track:function(){
            if(!xoa.sioenabled) return;

            //disable segment.io on commerce temporarily
            if(pg.subdomain == "weddingshop.theknot.com") return;

            //the bump and the nest are now handled by Bump/Nest team - JGS - 6/4/2014
            if(pg.topdomain == "thenest.com") return;
            if(pg.topdomain == "thebump.com") return;




            if(pg.environment == 'qa'){
                // configuration = config['qa'];
                xoa.keys.setEnvironment('qa');
            }
            else{
                xoa.keys.setEnvironment('prod');
            }


            var token = xoa.keys.get(pg);

            if(token === undefined){
                return;
            }

            // Create a queue, but don't obliterate an existing one!
            window.analytics = window.analytics || [];
            (function () {
                // A list of all the methods we want to generate queueing stubs for.
                var methods = [
                    'identify', 'track', 'trackLink', 'trackForm', 'trackClick', 'trackSubmit',
                    'page', 'pageview', 'ab', 'alias', 'ready', 'group'
                ];

                // For each of our methods, generate a queueing method that pushes arrays of
                // arguments onto our `analytics` queue. The first element of the array
                // is always the name of the analytics.js method itself (eg. `track`), so that
                // we know where to replay them when analytics.js finally loads.
                var factory = function (method) {
                    return function () {
                        analytics.push([method].concat(Array.prototype.slice.call(arguments, 0)));
                    };
                };

                for (var i = 0; i < methods.length; i++) {
                    analytics[methods[i]] = factory(methods[i]);
                }

            }());

            (function(apiKey){
                // Create a queue, but don't obliterate an existing one!
                var analytics = window.analytics = window.analytics || [];

                // If the real analytics.js is already on the page return.
                if (analytics.initialize) return;

                // If the snippet was invoked already show an error.
                if (analytics.invoked) {
                    if (window.console && console.error) {
                        console.error('Segment snippet included twice.');
                    }
                    return;
                }

                // Invoked flag, to make sure the snippet
                // is never invoked twice.
                analytics.invoked = true;

                // A list of the methods in Analytics.js to stub.
                analytics.methods = [
                    'trackSubmit',
                    'trackClick',
                    'trackLink',
                    'trackForm',
                    'pageview',
                    'identify',
                    'group',
                    'track',
                    'ready',
                    'alias',
                    'page',
                    'once',
                    'off',
                    'on'
                ];

                // Define a factory to create stubs. These are placeholders
                // for methods in Analytics.js so that you never have to wait
                // for it to load to actually record data. The `method` is
                // stored as the first argument, so we can replay the data.
                analytics.factory = function(method){
                    return function(){
                        var args = Array.prototype.slice.call(arguments);
                        args.unshift(method);
                        analytics.push(args);
                        return analytics;
                    };
                };

                // For each of our methods, generate a queueing stub.
                for (var i = 0; i < analytics.methods.length; i++) {
                    var key = analytics.methods[i];
                    analytics[key] = analytics.factory(key);
                }

                // Define a method to load Analytics.js from our CDN,
                // and that will be sure to only ever load it once.
                analytics.load = function(key){
                    // Create an async script element based on your key.
                    var script = document.createElement('script');
                    script.type = 'text/javascript';
                    script.async = true;
                    script.src = ('https:' === document.location.protocol
                        ? 'https://' : 'http://')
                    + 'cdn.segment.com/analytics.js/v1/'
                    + key + '/analytics.min.js';

                    // Insert our script next to the first script element.
                    var first = document.getElementsByTagName('script')[0];
                    first.parentNode.insertBefore(script, first);
                };

                // Add a version to keep track of what's in the wild.
                analytics.SNIPPET_VERSION = '3.0.1';

                // Load Analytics.js with your key, which will automatically
                // load the tools you've enabled for your account. Boosh!
                analytics.load(apiKey);

                // Make the first page call to load the integrations. If
                // you'd like to manually name or tag the page, edit or
                // move this call however you'd like.
                analytics.page();

            })(token);


        }
    };
}(window.XO.analytics));
/**
 * @module xo.analytics/foot
 * Called at the bottom of all module loads to initialize XO Analytics
 */

(function(xoa){
    var pg = xoa.page;

    if(window.jQuery && pg.subdomain=="weddingshop.theknot.com"){
        window.jQuery(document).ready(xoa.main)
    } else {
        xoa.main();
    }
}(window.XO.analytics));








