globalThis.__timing__.logStart('Load chunks/app/server');import { v as vue_cjs_prod, s as serverRenderer } from '../handlers/renderer.mjs';
import { joinURL, hasProtocol, isEqual, encodeParam, withBase, withQuery, withLeadingSlash, parseURL, encodePath } from 'ufo';
import { useDebounce, useStorage } from '@vueuse/core';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { u as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'h3';
import 'unenv/runtime/mock/proxy';
import 'stream';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'destr';
import 'ohmyfetch';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'hookable';
import 'scule';
import 'ohash';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';
import 'nuxt-proxy/middleware';
import 'node:url';
import 'ipx';

var vueRouter_prod = {};

/*!
  * vue-router v4.1.3
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */

(function (exports) {

	Object.defineProperty(exports, '__esModule', { value: true });

	var vue = vue_cjs_prod;

	function isESModule(obj) {
	    return obj.__esModule || obj[Symbol.toStringTag] === 'Module';
	}
	const assign = Object.assign;
	function applyToParams(fn, params) {
	    const newParams = {};
	    for (const key in params) {
	        const value = params[key];
	        newParams[key] = isArray(value)
	            ? value.map(fn)
	            : fn(value);
	    }
	    return newParams;
	}
	const noop = () => { };
	/**
	 * Typesafe alternative to Array.isArray
	 * https://github.com/microsoft/TypeScript/pull/48228
	 */
	const isArray = Array.isArray;

	const TRAILING_SLASH_RE = /\/$/;
	const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, '');
	/**
	 * Transforms an URI into a normalized history location
	 *
	 * @param parseQuery
	 * @param location - URI to normalize
	 * @param currentLocation - current absolute location. Allows resolving relative
	 * paths. Must start with `/`. Defaults to `/`
	 * @returns a normalized history location
	 */
	function parseURL(parseQuery, location, currentLocation = '/') {
	    let path, query = {}, searchString = '', hash = '';
	    // Could use URL and URLSearchParams but IE 11 doesn't support it
	    // TODO: move to new URL()
	    const hashPos = location.indexOf('#');
	    let searchPos = location.indexOf('?');
	    // the hash appears before the search, so it's not part of the search string
	    if (hashPos < searchPos && hashPos >= 0) {
	        searchPos = -1;
	    }
	    if (searchPos > -1) {
	        path = location.slice(0, searchPos);
	        searchString = location.slice(searchPos + 1, hashPos > -1 ? hashPos : location.length);
	        query = parseQuery(searchString);
	    }
	    if (hashPos > -1) {
	        path = path || location.slice(0, hashPos);
	        // keep the # character
	        hash = location.slice(hashPos, location.length);
	    }
	    // no search and no query
	    path = resolveRelativePath(path != null ? path : location, currentLocation);
	    // empty path means a relative query or hash `?foo=f`, `#thing`
	    return {
	        fullPath: path + (searchString && '?') + searchString + hash,
	        path,
	        query,
	        hash,
	    };
	}
	/**
	 * Stringifies a URL object
	 *
	 * @param stringifyQuery
	 * @param location
	 */
	function stringifyURL(stringifyQuery, location) {
	    const query = location.query ? stringifyQuery(location.query) : '';
	    return location.path + (query && '?') + query + (location.hash || '');
	}
	/**
	 * Strips off the base from the beginning of a location.pathname in a non
	 * case-sensitive way.
	 *
	 * @param pathname - location.pathname
	 * @param base - base to strip off
	 */
	function stripBase(pathname, base) {
	    // no base or base is not found at the beginning
	    if (!base || !pathname.toLowerCase().startsWith(base.toLowerCase()))
	        return pathname;
	    return pathname.slice(base.length) || '/';
	}
	/**
	 * Checks if two RouteLocation are equal. This means that both locations are
	 * pointing towards the same {@link RouteRecord} and that all `params`, `query`
	 * parameters and `hash` are the same
	 *
	 * @param a - first {@link RouteLocation}
	 * @param b - second {@link RouteLocation}
	 */
	function isSameRouteLocation(stringifyQuery, a, b) {
	    const aLastIndex = a.matched.length - 1;
	    const bLastIndex = b.matched.length - 1;
	    return (aLastIndex > -1 &&
	        aLastIndex === bLastIndex &&
	        isSameRouteRecord(a.matched[aLastIndex], b.matched[bLastIndex]) &&
	        isSameRouteLocationParams(a.params, b.params) &&
	        stringifyQuery(a.query) === stringifyQuery(b.query) &&
	        a.hash === b.hash);
	}
	/**
	 * Check if two `RouteRecords` are equal. Takes into account aliases: they are
	 * considered equal to the `RouteRecord` they are aliasing.
	 *
	 * @param a - first {@link RouteRecord}
	 * @param b - second {@link RouteRecord}
	 */
	function isSameRouteRecord(a, b) {
	    // since the original record has an undefined value for aliasOf
	    // but all aliases point to the original record, this will always compare
	    // the original record
	    return (a.aliasOf || a) === (b.aliasOf || b);
	}
	function isSameRouteLocationParams(a, b) {
	    if (Object.keys(a).length !== Object.keys(b).length)
	        return false;
	    for (const key in a) {
	        if (!isSameRouteLocationParamsValue(a[key], b[key]))
	            return false;
	    }
	    return true;
	}
	function isSameRouteLocationParamsValue(a, b) {
	    return isArray(a)
	        ? isEquivalentArray(a, b)
	        : isArray(b)
	            ? isEquivalentArray(b, a)
	            : a === b;
	}
	/**
	 * Check if two arrays are the same or if an array with one single entry is the
	 * same as another primitive value. Used to check query and parameters
	 *
	 * @param a - array of values
	 * @param b - array of values or a single value
	 */
	function isEquivalentArray(a, b) {
	    return isArray(b)
	        ? a.length === b.length && a.every((value, i) => value === b[i])
	        : a.length === 1 && a[0] === b;
	}
	/**
	 * Resolves a relative path that starts with `.`.
	 *
	 * @param to - path location we are resolving
	 * @param from - currentLocation.path, should start with `/`
	 */
	function resolveRelativePath(to, from) {
	    if (to.startsWith('/'))
	        return to;
	    if (!to)
	        return from;
	    const fromSegments = from.split('/');
	    const toSegments = to.split('/');
	    let position = fromSegments.length - 1;
	    let toPosition;
	    let segment;
	    for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
	        segment = toSegments[toPosition];
	        // we stay on the same position
	        if (segment === '.')
	            continue;
	        // go up in the from array
	        if (segment === '..') {
	            // we can't go below zero but we still need to increment toPosition
	            if (position > 1)
	                position--;
	            // continue
	        }
	        // we reached a non relative path, we stop here
	        else
	            break;
	    }
	    return (fromSegments.slice(0, position).join('/') +
	        '/' +
	        toSegments
	            // ensure we use at least the last element in the toSegments
	            .slice(toPosition - (toPosition === toSegments.length ? 1 : 0))
	            .join('/'));
	}

	var NavigationType;
	(function (NavigationType) {
	    NavigationType["pop"] = "pop";
	    NavigationType["push"] = "push";
	})(NavigationType || (NavigationType = {}));
	var NavigationDirection;
	(function (NavigationDirection) {
	    NavigationDirection["back"] = "back";
	    NavigationDirection["forward"] = "forward";
	    NavigationDirection["unknown"] = "";
	})(NavigationDirection || (NavigationDirection = {}));
	/**
	 * Starting location for Histories
	 */
	const START = '';
	// Generic utils
	/**
	 * Normalizes a base by removing any trailing slash and reading the base tag if
	 * present.
	 *
	 * @param base - base to normalize
	 */
	function normalizeBase(base) {
	    if (!base) {
	        {
	            base = '/';
	        }
	    }
	    // ensure leading slash when it was removed by the regex above avoid leading
	    // slash with hash because the file could be read from the disk like file://
	    // and the leading slash would cause problems
	    if (base[0] !== '/' && base[0] !== '#')
	        base = '/' + base;
	    // remove the trailing slash so all other method can just do `base + fullPath`
	    // to build an href
	    return removeTrailingSlash(base);
	}
	// remove any character before the hash
	const BEFORE_HASH_RE = /^[^#]+#/;
	function createHref(base, location) {
	    return base.replace(BEFORE_HASH_RE, '#') + location;
	}
	const computeScrollPosition = () => ({
	    left: window.pageXOffset,
	    top: window.pageYOffset,
	});
	// TODO: RFC about how to save scroll position
	/**
	 * ScrollBehavior instance used by the router to compute and restore the scroll
	 * position when navigating.
	 */
	// export interface ScrollHandler<ScrollPositionEntry extends HistoryStateValue, ScrollPosition extends ScrollPositionEntry> {
	//   // returns a scroll position that can be saved in history
	//   compute(): ScrollPositionEntry
	//   // can take an extended ScrollPositionEntry
	//   scroll(position: ScrollPosition): void
	// }
	// export const scrollHandler: ScrollHandler<ScrollPosition> = {
	//   compute: computeScroll,
	//   scroll: scrollToPosition,
	// }

	let createBaseLocation = () => location.protocol + '//' + location.host;
	/**
	 * Creates a normalized history location from a window.location object
	 * @param location -
	 */
	function createCurrentLocation(base, location) {
	    const { pathname, search, hash } = location;
	    // allows hash bases like #, /#, #/, #!, #!/, /#!/, or even /folder#end
	    const hashPos = base.indexOf('#');
	    if (hashPos > -1) {
	        let slicePos = hash.includes(base.slice(hashPos))
	            ? base.slice(hashPos).length
	            : 1;
	        let pathFromHash = hash.slice(slicePos);
	        // prepend the starting slash to hash so the url starts with /#
	        if (pathFromHash[0] !== '/')
	            pathFromHash = '/' + pathFromHash;
	        return stripBase(pathFromHash, '');
	    }
	    const path = stripBase(pathname, base);
	    return path + search + hash;
	}
	function useHistoryListeners(base, historyState, currentLocation, replace) {
	    let listeners = [];
	    let teardowns = [];
	    // TODO: should it be a stack? a Dict. Check if the popstate listener
	    // can trigger twice
	    let pauseState = null;
	    const popStateHandler = ({ state, }) => {
	        const to = createCurrentLocation(base, location);
	        const from = currentLocation.value;
	        const fromState = historyState.value;
	        let delta = 0;
	        if (state) {
	            currentLocation.value = to;
	            historyState.value = state;
	            // ignore the popstate and reset the pauseState
	            if (pauseState && pauseState === from) {
	                pauseState = null;
	                return;
	            }
	            delta = fromState ? state.position - fromState.position : 0;
	        }
	        else {
	            replace(to);
	        }
	        // console.log({ deltaFromCurrent })
	        // Here we could also revert the navigation by calling history.go(-delta)
	        // this listener will have to be adapted to not trigger again and to wait for the url
	        // to be updated before triggering the listeners. Some kind of validation function would also
	        // need to be passed to the listeners so the navigation can be accepted
	        // call all listeners
	        listeners.forEach(listener => {
	            listener(currentLocation.value, from, {
	                delta,
	                type: NavigationType.pop,
	                direction: delta
	                    ? delta > 0
	                        ? NavigationDirection.forward
	                        : NavigationDirection.back
	                    : NavigationDirection.unknown,
	            });
	        });
	    };
	    function pauseListeners() {
	        pauseState = currentLocation.value;
	    }
	    function listen(callback) {
	        // setup the listener and prepare teardown callbacks
	        listeners.push(callback);
	        const teardown = () => {
	            const index = listeners.indexOf(callback);
	            if (index > -1)
	                listeners.splice(index, 1);
	        };
	        teardowns.push(teardown);
	        return teardown;
	    }
	    function beforeUnloadListener() {
	        const { history } = window;
	        if (!history.state)
	            return;
	        history.replaceState(assign({}, history.state, { scroll: computeScrollPosition() }), '');
	    }
	    function destroy() {
	        for (const teardown of teardowns)
	            teardown();
	        teardowns = [];
	        window.removeEventListener('popstate', popStateHandler);
	        window.removeEventListener('beforeunload', beforeUnloadListener);
	    }
	    // setup the listeners and prepare teardown callbacks
	    window.addEventListener('popstate', popStateHandler);
	    window.addEventListener('beforeunload', beforeUnloadListener);
	    return {
	        pauseListeners,
	        listen,
	        destroy,
	    };
	}
	/**
	 * Creates a state object
	 */
	function buildState(back, current, forward, replaced = false, computeScroll = false) {
	    return {
	        back,
	        current,
	        forward,
	        replaced,
	        position: window.history.length,
	        scroll: computeScroll ? computeScrollPosition() : null,
	    };
	}
	function useHistoryStateNavigation(base) {
	    const { history, location } = window;
	    // private variables
	    const currentLocation = {
	        value: createCurrentLocation(base, location),
	    };
	    const historyState = { value: history.state };
	    // build current history entry as this is a fresh navigation
	    if (!historyState.value) {
	        changeLocation(currentLocation.value, {
	            back: null,
	            current: currentLocation.value,
	            forward: null,
	            // the length is off by one, we need to decrease it
	            position: history.length - 1,
	            replaced: true,
	            // don't add a scroll as the user may have an anchor and we want
	            // scrollBehavior to be triggered without a saved position
	            scroll: null,
	        }, true);
	    }
	    function changeLocation(to, state, replace) {
	        /**
	         * if a base tag is provided and we are on a normal domain, we have to
	         * respect the provided `base` attribute because pushState() will use it and
	         * potentially erase anything before the `#` like at
	         * https://github.com/vuejs/router/issues/685 where a base of
	         * `/folder/#` but a base of `/` would erase the `/folder/` section. If
	         * there is no host, the `<base>` tag makes no sense and if there isn't a
	         * base tag we can just use everything after the `#`.
	         */
	        const hashIndex = base.indexOf('#');
	        const url = hashIndex > -1
	            ? (location.host && document.querySelector('base')
	                ? base
	                : base.slice(hashIndex)) + to
	            : createBaseLocation() + base + to;
	        try {
	            // BROWSER QUIRK
	            // NOTE: Safari throws a SecurityError when calling this function 100 times in 30 seconds
	            history[replace ? 'replaceState' : 'pushState'](state, '', url);
	            historyState.value = state;
	        }
	        catch (err) {
	            {
	                console.error(err);
	            }
	            // Force the navigation, this also resets the call count
	            location[replace ? 'replace' : 'assign'](url);
	        }
	    }
	    function replace(to, data) {
	        const state = assign({}, history.state, buildState(historyState.value.back, 
	        // keep back and forward entries but override current position
	        to, historyState.value.forward, true), data, { position: historyState.value.position });
	        changeLocation(to, state, true);
	        currentLocation.value = to;
	    }
	    function push(to, data) {
	        // Add to current entry the information of where we are going
	        // as well as saving the current position
	        const currentState = assign({}, 
	        // use current history state to gracefully handle a wrong call to
	        // history.replaceState
	        // https://github.com/vuejs/router/issues/366
	        historyState.value, history.state, {
	            forward: to,
	            scroll: computeScrollPosition(),
	        });
	        changeLocation(currentState.current, currentState, true);
	        const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
	        changeLocation(to, state, false);
	        currentLocation.value = to;
	    }
	    return {
	        location: currentLocation,
	        state: historyState,
	        push,
	        replace,
	    };
	}
	/**
	 * Creates an HTML5 history. Most common history for single page applications.
	 *
	 * @param base -
	 */
	function createWebHistory(base) {
	    base = normalizeBase(base);
	    const historyNavigation = useHistoryStateNavigation(base);
	    const historyListeners = useHistoryListeners(base, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
	    function go(delta, triggerListeners = true) {
	        if (!triggerListeners)
	            historyListeners.pauseListeners();
	        history.go(delta);
	    }
	    const routerHistory = assign({
	        // it's overridden right after
	        location: '',
	        base,
	        go,
	        createHref: createHref.bind(null, base),
	    }, historyNavigation, historyListeners);
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => historyNavigation.location.value,
	    });
	    Object.defineProperty(routerHistory, 'state', {
	        enumerable: true,
	        get: () => historyNavigation.state.value,
	    });
	    return routerHistory;
	}

	/**
	 * Creates a in-memory based history. The main purpose of this history is to handle SSR. It starts in a special location that is nowhere.
	 * It's up to the user to replace that location with the starter location by either calling `router.push` or `router.replace`.
	 *
	 * @param base - Base applied to all urls, defaults to '/'
	 * @returns a history object that can be passed to the router constructor
	 */
	function createMemoryHistory(base = '') {
	    let listeners = [];
	    let queue = [START];
	    let position = 0;
	    base = normalizeBase(base);
	    function setLocation(location) {
	        position++;
	        if (position === queue.length) {
	            // we are at the end, we can simply append a new entry
	            queue.push(location);
	        }
	        else {
	            // we are in the middle, we remove everything from here in the queue
	            queue.splice(position);
	            queue.push(location);
	        }
	    }
	    function triggerListeners(to, from, { direction, delta }) {
	        const info = {
	            direction,
	            delta,
	            type: NavigationType.pop,
	        };
	        for (const callback of listeners) {
	            callback(to, from, info);
	        }
	    }
	    const routerHistory = {
	        // rewritten by Object.defineProperty
	        location: START,
	        // TODO: should be kept in queue
	        state: {},
	        base,
	        createHref: createHref.bind(null, base),
	        replace(to) {
	            // remove current entry and decrement position
	            queue.splice(position--, 1);
	            setLocation(to);
	        },
	        push(to, data) {
	            setLocation(to);
	        },
	        listen(callback) {
	            listeners.push(callback);
	            return () => {
	                const index = listeners.indexOf(callback);
	                if (index > -1)
	                    listeners.splice(index, 1);
	            };
	        },
	        destroy() {
	            listeners = [];
	            queue = [START];
	            position = 0;
	        },
	        go(delta, shouldTrigger = true) {
	            const from = this.location;
	            const direction = 
	            // we are considering delta === 0 going forward, but in abstract mode
	            // using 0 for the delta doesn't make sense like it does in html5 where
	            // it reloads the page
	            delta < 0 ? NavigationDirection.back : NavigationDirection.forward;
	            position = Math.max(0, Math.min(position + delta, queue.length - 1));
	            if (shouldTrigger) {
	                triggerListeners(this.location, from, {
	                    direction,
	                    delta,
	                });
	            }
	        },
	    };
	    Object.defineProperty(routerHistory, 'location', {
	        enumerable: true,
	        get: () => queue[position],
	    });
	    return routerHistory;
	}

	/**
	 * Creates a hash history. Useful for web applications with no host (e.g. `file://`) or when configuring a server to
	 * handle any URL is not possible.
	 *
	 * @param base - optional base to provide. Defaults to `location.pathname + location.search` If there is a `<base>` tag
	 * in the `head`, its value will be ignored in favor of this parameter **but note it affects all the history.pushState()
	 * calls**, meaning that if you use a `<base>` tag, it's `href` value **has to match this parameter** (ignoring anything
	 * after the `#`).
	 *
	 * @example
	 * ```js
	 * // at https://example.com/folder
	 * createWebHashHistory() // gives a url of `https://example.com/folder#`
	 * createWebHashHistory('/folder/') // gives a url of `https://example.com/folder/#`
	 * // if the `#` is provided in the base, it won't be added by `createWebHashHistory`
	 * createWebHashHistory('/folder/#/app/') // gives a url of `https://example.com/folder/#/app/`
	 * // you should avoid doing this because it changes the original url and breaks copying urls
	 * createWebHashHistory('/other-folder/') // gives a url of `https://example.com/other-folder/#`
	 *
	 * // at file:///usr/etc/folder/index.html
	 * // for locations with no `host`, the base is ignored
	 * createWebHashHistory('/iAmIgnored') // gives a url of `file:///usr/etc/folder/index.html#`
	 * ```
	 */
	function createWebHashHistory(base) {
	    // Make sure this implementation is fine in terms of encoding, specially for IE11
	    // for `file://`, directly use the pathname and ignore the base
	    // location.pathname contains an initial `/` even at the root: `https://example.com`
	    base = location.host ? base || location.pathname + location.search : '';
	    // allow the user to provide a `#` in the middle: `/base/#/app`
	    if (!base.includes('#'))
	        base += '#';
	    return createWebHistory(base);
	}

	function isRouteLocation(route) {
	    return typeof route === 'string' || (route && typeof route === 'object');
	}
	function isRouteName(name) {
	    return typeof name === 'string' || typeof name === 'symbol';
	}

	/**
	 * Initial route location where the router is. Can be used in navigation guards
	 * to differentiate the initial navigation.
	 *
	 * @example
	 * ```js
	 * import { START_LOCATION } from 'vue-router'
	 *
	 * router.beforeEach((to, from) => {
	 *   if (from === START_LOCATION) {
	 *     // initial navigation
	 *   }
	 * })
	 * ```
	 */
	const START_LOCATION_NORMALIZED = {
	    path: '/',
	    name: undefined,
	    params: {},
	    query: {},
	    hash: '',
	    fullPath: '/',
	    matched: [],
	    meta: {},
	    redirectedFrom: undefined,
	};

	const NavigationFailureSymbol = Symbol('');
	/**
	 * Enumeration with all possible types for navigation failures. Can be passed to
	 * {@link isNavigationFailure} to check for specific failures.
	 */
	exports.NavigationFailureType = void 0;
	(function (NavigationFailureType) {
	    /**
	     * An aborted navigation is a navigation that failed because a navigation
	     * guard returned `false` or called `next(false)`
	     */
	    NavigationFailureType[NavigationFailureType["aborted"] = 4] = "aborted";
	    /**
	     * A cancelled navigation is a navigation that failed because a more recent
	     * navigation finished started (not necessarily finished).
	     */
	    NavigationFailureType[NavigationFailureType["cancelled"] = 8] = "cancelled";
	    /**
	     * A duplicated navigation is a navigation that failed because it was
	     * initiated while already being at the exact same location.
	     */
	    NavigationFailureType[NavigationFailureType["duplicated"] = 16] = "duplicated";
	})(exports.NavigationFailureType || (exports.NavigationFailureType = {}));
	// DEV only debug messages
	const ErrorTypeMessages = {
	    [1 /* ErrorTypes.MATCHER_NOT_FOUND */]({ location, currentLocation }) {
	        return `No match for\n ${JSON.stringify(location)}${currentLocation
	            ? '\nwhile being at\n' + JSON.stringify(currentLocation)
	            : ''}`;
	    },
	    [2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */]({ from, to, }) {
	        return `Redirected from "${from.fullPath}" to "${stringifyRoute(to)}" via a navigation guard.`;
	    },
	    [4 /* ErrorTypes.NAVIGATION_ABORTED */]({ from, to }) {
	        return `Navigation aborted from "${from.fullPath}" to "${to.fullPath}" via a navigation guard.`;
	    },
	    [8 /* ErrorTypes.NAVIGATION_CANCELLED */]({ from, to }) {
	        return `Navigation cancelled from "${from.fullPath}" to "${to.fullPath}" with a new navigation.`;
	    },
	    [16 /* ErrorTypes.NAVIGATION_DUPLICATED */]({ from, to }) {
	        return `Avoided redundant navigation to current location: "${from.fullPath}".`;
	    },
	};
	function createRouterError(type, params) {
	    // keep full error messages in cjs versions
	    {
	        return assign(new Error(ErrorTypeMessages[type](params)), {
	            type,
	            [NavigationFailureSymbol]: true,
	        }, params);
	    }
	}
	function isNavigationFailure(error, type) {
	    return (error instanceof Error &&
	        NavigationFailureSymbol in error &&
	        (type == null || !!(error.type & type)));
	}
	const propertiesToLog = ['params', 'query', 'hash'];
	function stringifyRoute(to) {
	    if (typeof to === 'string')
	        return to;
	    if ('path' in to)
	        return to.path;
	    const location = {};
	    for (const key of propertiesToLog) {
	        if (key in to)
	            location[key] = to[key];
	    }
	    return JSON.stringify(location, null, 2);
	}

	// default pattern for a param: non greedy everything but /
	const BASE_PARAM_PATTERN = '[^/]+?';
	const BASE_PATH_PARSER_OPTIONS = {
	    sensitive: false,
	    strict: false,
	    start: true,
	    end: true,
	};
	// Special Regex characters that must be escaped in static tokens
	const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
	/**
	 * Creates a path parser from an array of Segments (a segment is an array of Tokens)
	 *
	 * @param segments - array of segments returned by tokenizePath
	 * @param extraOptions - optional options for the regexp
	 * @returns a PathParser
	 */
	function tokensToParser(segments, extraOptions) {
	    const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
	    // the amount of scores is the same as the length of segments except for the root segment "/"
	    const score = [];
	    // the regexp as a string
	    let pattern = options.start ? '^' : '';
	    // extracted keys
	    const keys = [];
	    for (const segment of segments) {
	        // the root segment needs special treatment
	        const segmentScores = segment.length ? [] : [90 /* PathScore.Root */];
	        // allow trailing slash
	        if (options.strict && !segment.length)
	            pattern += '/';
	        for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
	            const token = segment[tokenIndex];
	            // resets the score if we are inside a sub segment /:a-other-:b
	            let subSegmentScore = 40 /* PathScore.Segment */ +
	                (options.sensitive ? 0.25 /* PathScore.BonusCaseSensitive */ : 0);
	            if (token.type === 0 /* TokenType.Static */) {
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    pattern += '/';
	                pattern += token.value.replace(REGEX_CHARS_RE, '\\$&');
	                subSegmentScore += 40 /* PathScore.Static */;
	            }
	            else if (token.type === 1 /* TokenType.Param */) {
	                const { value, repeatable, optional, regexp } = token;
	                keys.push({
	                    name: value,
	                    repeatable,
	                    optional,
	                });
	                const re = regexp ? regexp : BASE_PARAM_PATTERN;
	                // the user provided a custom regexp /:id(\\d+)
	                if (re !== BASE_PARAM_PATTERN) {
	                    subSegmentScore += 10 /* PathScore.BonusCustomRegExp */;
	                    // make sure the regexp is valid before using it
	                    try {
	                        new RegExp(`(${re})`);
	                    }
	                    catch (err) {
	                        throw new Error(`Invalid custom RegExp for param "${value}" (${re}): ` +
	                            err.message);
	                    }
	                }
	                // when we repeat we must take care of the repeating leading slash
	                let subPattern = repeatable ? `((?:${re})(?:/(?:${re}))*)` : `(${re})`;
	                // prepend the slash if we are starting a new segment
	                if (!tokenIndex)
	                    subPattern =
	                        // avoid an optional / if there are more segments e.g. /:p?-static
	                        // or /:p?-:p2
	                        optional && segment.length < 2
	                            ? `(?:/${subPattern})`
	                            : '/' + subPattern;
	                if (optional)
	                    subPattern += '?';
	                pattern += subPattern;
	                subSegmentScore += 20 /* PathScore.Dynamic */;
	                if (optional)
	                    subSegmentScore += -8 /* PathScore.BonusOptional */;
	                if (repeatable)
	                    subSegmentScore += -20 /* PathScore.BonusRepeatable */;
	                if (re === '.*')
	                    subSegmentScore += -50 /* PathScore.BonusWildcard */;
	            }
	            segmentScores.push(subSegmentScore);
	        }
	        // an empty array like /home/ -> [[{home}], []]
	        // if (!segment.length) pattern += '/'
	        score.push(segmentScores);
	    }
	    // only apply the strict bonus to the last score
	    if (options.strict && options.end) {
	        const i = score.length - 1;
	        score[i][score[i].length - 1] += 0.7000000000000001 /* PathScore.BonusStrict */;
	    }
	    // TODO: dev only warn double trailing slash
	    if (!options.strict)
	        pattern += '/?';
	    if (options.end)
	        pattern += '$';
	    // allow paths like /dynamic to only match dynamic or dynamic/... but not dynamic_something_else
	    else if (options.strict)
	        pattern += '(?:/|$)';
	    const re = new RegExp(pattern, options.sensitive ? '' : 'i');
	    function parse(path) {
	        const match = path.match(re);
	        const params = {};
	        if (!match)
	            return null;
	        for (let i = 1; i < match.length; i++) {
	            const value = match[i] || '';
	            const key = keys[i - 1];
	            params[key.name] = value && key.repeatable ? value.split('/') : value;
	        }
	        return params;
	    }
	    function stringify(params) {
	        let path = '';
	        // for optional parameters to allow to be empty
	        let avoidDuplicatedSlash = false;
	        for (const segment of segments) {
	            if (!avoidDuplicatedSlash || !path.endsWith('/'))
	                path += '/';
	            avoidDuplicatedSlash = false;
	            for (const token of segment) {
	                if (token.type === 0 /* TokenType.Static */) {
	                    path += token.value;
	                }
	                else if (token.type === 1 /* TokenType.Param */) {
	                    const { value, repeatable, optional } = token;
	                    const param = value in params ? params[value] : '';
	                    if (isArray(param) && !repeatable) {
	                        throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
	                    }
	                    const text = isArray(param)
	                        ? param.join('/')
	                        : param;
	                    if (!text) {
	                        if (optional) {
	                            // if we have more than one optional param like /:a?-static we don't need to care about the optional param
	                            if (segment.length < 2) {
	                                // remove the last slash as we could be at the end
	                                if (path.endsWith('/'))
	                                    path = path.slice(0, -1);
	                                // do not append a slash on the next iteration
	                                else
	                                    avoidDuplicatedSlash = true;
	                            }
	                        }
	                        else
	                            throw new Error(`Missing required param "${value}"`);
	                    }
	                    path += text;
	                }
	            }
	        }
	        // avoid empty path when we have multiple optional params
	        return path || '/';
	    }
	    return {
	        re,
	        score,
	        keys,
	        parse,
	        stringify,
	    };
	}
	/**
	 * Compares an array of numbers as used in PathParser.score and returns a
	 * number. This function can be used to `sort` an array
	 *
	 * @param a - first array of numbers
	 * @param b - second array of numbers
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 * should be sorted first
	 */
	function compareScoreArray(a, b) {
	    let i = 0;
	    while (i < a.length && i < b.length) {
	        const diff = b[i] - a[i];
	        // only keep going if diff === 0
	        if (diff)
	            return diff;
	        i++;
	    }
	    // if the last subsegment was Static, the shorter segments should be sorted first
	    // otherwise sort the longest segment first
	    if (a.length < b.length) {
	        return a.length === 1 && a[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? -1
	            : 1;
	    }
	    else if (a.length > b.length) {
	        return b.length === 1 && b[0] === 40 /* PathScore.Static */ + 40 /* PathScore.Segment */
	            ? 1
	            : -1;
	    }
	    return 0;
	}
	/**
	 * Compare function that can be used with `sort` to sort an array of PathParser
	 *
	 * @param a - first PathParser
	 * @param b - second PathParser
	 * @returns 0 if both are equal, < 0 if a should be sorted first, > 0 if b
	 */
	function comparePathParserScore(a, b) {
	    let i = 0;
	    const aScore = a.score;
	    const bScore = b.score;
	    while (i < aScore.length && i < bScore.length) {
	        const comp = compareScoreArray(aScore[i], bScore[i]);
	        // do not return if both are equal
	        if (comp)
	            return comp;
	        i++;
	    }
	    if (Math.abs(bScore.length - aScore.length) === 1) {
	        if (isLastScoreNegative(aScore))
	            return 1;
	        if (isLastScoreNegative(bScore))
	            return -1;
	    }
	    // if a and b share the same score entries but b has more, sort b first
	    return bScore.length - aScore.length;
	    // this is the ternary version
	    // return aScore.length < bScore.length
	    //   ? 1
	    //   : aScore.length > bScore.length
	    //   ? -1
	    //   : 0
	}
	/**
	 * This allows detecting splats at the end of a path: /home/:id(.*)*
	 *
	 * @param score - score to check
	 * @returns true if the last entry is negative
	 */
	function isLastScoreNegative(score) {
	    const last = score[score.length - 1];
	    return score.length > 0 && last[last.length - 1] < 0;
	}

	const ROOT_TOKEN = {
	    type: 0 /* TokenType.Static */,
	    value: '',
	};
	const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
	// After some profiling, the cache seems to be unnecessary because tokenizePath
	// (the slowest part of adding a route) is very fast
	// const tokenCache = new Map<string, Token[][]>()
	function tokenizePath(path) {
	    if (!path)
	        return [[]];
	    if (path === '/')
	        return [[ROOT_TOKEN]];
	    if (!path.startsWith('/')) {
	        throw new Error(`Invalid path "${path}"`);
	    }
	    // if (tokenCache.has(path)) return tokenCache.get(path)!
	    function crash(message) {
	        throw new Error(`ERR (${state})/"${buffer}": ${message}`);
	    }
	    let state = 0 /* TokenizerState.Static */;
	    let previousState = state;
	    const tokens = [];
	    // the segment will always be valid because we get into the initial state
	    // with the leading /
	    let segment;
	    function finalizeSegment() {
	        if (segment)
	            tokens.push(segment);
	        segment = [];
	    }
	    // index on the path
	    let i = 0;
	    // char at index
	    let char;
	    // buffer of the value read
	    let buffer = '';
	    // custom regexp for a param
	    let customRe = '';
	    function consumeBuffer() {
	        if (!buffer)
	            return;
	        if (state === 0 /* TokenizerState.Static */) {
	            segment.push({
	                type: 0 /* TokenType.Static */,
	                value: buffer,
	            });
	        }
	        else if (state === 1 /* TokenizerState.Param */ ||
	            state === 2 /* TokenizerState.ParamRegExp */ ||
	            state === 3 /* TokenizerState.ParamRegExpEnd */) {
	            if (segment.length > 1 && (char === '*' || char === '+'))
	                crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
	            segment.push({
	                type: 1 /* TokenType.Param */,
	                value: buffer,
	                regexp: customRe,
	                repeatable: char === '*' || char === '+',
	                optional: char === '*' || char === '?',
	            });
	        }
	        else {
	            crash('Invalid state to consume buffer');
	        }
	        buffer = '';
	    }
	    function addCharToBuffer() {
	        buffer += char;
	    }
	    while (i < path.length) {
	        char = path[i++];
	        if (char === '\\' && state !== 2 /* TokenizerState.ParamRegExp */) {
	            previousState = state;
	            state = 4 /* TokenizerState.EscapeNext */;
	            continue;
	        }
	        switch (state) {
	            case 0 /* TokenizerState.Static */:
	                if (char === '/') {
	                    if (buffer) {
	                        consumeBuffer();
	                    }
	                    finalizeSegment();
	                }
	                else if (char === ':') {
	                    consumeBuffer();
	                    state = 1 /* TokenizerState.Param */;
	                }
	                else {
	                    addCharToBuffer();
	                }
	                break;
	            case 4 /* TokenizerState.EscapeNext */:
	                addCharToBuffer();
	                state = previousState;
	                break;
	            case 1 /* TokenizerState.Param */:
	                if (char === '(') {
	                    state = 2 /* TokenizerState.ParamRegExp */;
	                }
	                else if (VALID_PARAM_RE.test(char)) {
	                    addCharToBuffer();
	                }
	                else {
	                    consumeBuffer();
	                    state = 0 /* TokenizerState.Static */;
	                    // go back one character if we were not modifying
	                    if (char !== '*' && char !== '?' && char !== '+')
	                        i--;
	                }
	                break;
	            case 2 /* TokenizerState.ParamRegExp */:
	                // TODO: is it worth handling nested regexp? like :p(?:prefix_([^/]+)_suffix)
	                // it already works by escaping the closing )
	                // https://paths.esm.dev/?p=AAMeJbiAwQEcDKbAoAAkP60PG2R6QAvgNaA6AFACM2ABuQBB#
	                // is this really something people need since you can also write
	                // /prefix_:p()_suffix
	                if (char === ')') {
	                    // handle the escaped )
	                    if (customRe[customRe.length - 1] == '\\')
	                        customRe = customRe.slice(0, -1) + char;
	                    else
	                        state = 3 /* TokenizerState.ParamRegExpEnd */;
	                }
	                else {
	                    customRe += char;
	                }
	                break;
	            case 3 /* TokenizerState.ParamRegExpEnd */:
	                // same as finalizing a param
	                consumeBuffer();
	                state = 0 /* TokenizerState.Static */;
	                // go back one character if we were not modifying
	                if (char !== '*' && char !== '?' && char !== '+')
	                    i--;
	                customRe = '';
	                break;
	            default:
	                crash('Unknown state');
	                break;
	        }
	    }
	    if (state === 2 /* TokenizerState.ParamRegExp */)
	        crash(`Unfinished custom RegExp for param "${buffer}"`);
	    consumeBuffer();
	    finalizeSegment();
	    // tokenCache.set(path, tokens)
	    return tokens;
	}

	function createRouteRecordMatcher(record, parent, options) {
	    const parser = tokensToParser(tokenizePath(record.path), options);
	    const matcher = assign(parser, {
	        record,
	        parent,
	        // these needs to be populated by the parent
	        children: [],
	        alias: [],
	    });
	    if (parent) {
	        // both are aliases or both are not aliases
	        // we don't want to mix them because the order is used when
	        // passing originalRecord in Matcher.addRoute
	        if (!matcher.record.aliasOf === !parent.record.aliasOf)
	            parent.children.push(matcher);
	    }
	    return matcher;
	}

	/**
	 * Creates a Router Matcher.
	 *
	 * @internal
	 * @param routes - array of initial routes
	 * @param globalOptions - global route options
	 */
	function createRouterMatcher(routes, globalOptions) {
	    // normalized ordered array of matchers
	    const matchers = [];
	    const matcherMap = new Map();
	    globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
	    function getRecordMatcher(name) {
	        return matcherMap.get(name);
	    }
	    function addRoute(record, parent, originalRecord) {
	        // used later on to remove by name
	        const isRootAdd = !originalRecord;
	        const mainNormalizedRecord = normalizeRouteRecord(record);
	        // we might be the child of an alias
	        mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
	        const options = mergeOptions(globalOptions, record);
	        // generate an array of records to correctly handle aliases
	        const normalizedRecords = [
	            mainNormalizedRecord,
	        ];
	        if ('alias' in record) {
	            const aliases = typeof record.alias === 'string' ? [record.alias] : record.alias;
	            for (const alias of aliases) {
	                normalizedRecords.push(assign({}, mainNormalizedRecord, {
	                    // this allows us to hold a copy of the `components` option
	                    // so that async components cache is hold on the original record
	                    components: originalRecord
	                        ? originalRecord.record.components
	                        : mainNormalizedRecord.components,
	                    path: alias,
	                    // we might be the child of an alias
	                    aliasOf: originalRecord
	                        ? originalRecord.record
	                        : mainNormalizedRecord,
	                    // the aliases are always of the same kind as the original since they
	                    // are defined on the same record
	                }));
	            }
	        }
	        let matcher;
	        let originalMatcher;
	        for (const normalizedRecord of normalizedRecords) {
	            const { path } = normalizedRecord;
	            // Build up the path for nested routes if the child isn't an absolute
	            // route. Only add the / delimiter if the child path isn't empty and if the
	            // parent path doesn't have a trailing slash
	            if (parent && path[0] !== '/') {
	                const parentPath = parent.record.path;
	                const connectingSlash = parentPath[parentPath.length - 1] === '/' ? '' : '/';
	                normalizedRecord.path =
	                    parent.record.path + (path && connectingSlash + path);
	            }
	            // create the object before hand so it can be passed to children
	            matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
	            // if we are an alias we must tell the original record that we exist
	            // so we can be removed
	            if (originalRecord) {
	                originalRecord.alias.push(matcher);
	            }
	            else {
	                // otherwise, the first record is the original and others are aliases
	                originalMatcher = originalMatcher || matcher;
	                if (originalMatcher !== matcher)
	                    originalMatcher.alias.push(matcher);
	                // remove the route if named and only for the top record (avoid in nested calls)
	                // this works because the original record is the first one
	                if (isRootAdd && record.name && !isAliasRecord(matcher))
	                    removeRoute(record.name);
	            }
	            if (mainNormalizedRecord.children) {
	                const children = mainNormalizedRecord.children;
	                for (let i = 0; i < children.length; i++) {
	                    addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
	                }
	            }
	            // if there was no original record, then the first one was not an alias and all
	            // other alias (if any) need to reference this record when adding children
	            originalRecord = originalRecord || matcher;
	            // TODO: add normalized records for more flexibility
	            // if (parent && isAliasRecord(originalRecord)) {
	            //   parent.children.push(originalRecord)
	            // }
	            insertMatcher(matcher);
	        }
	        return originalMatcher
	            ? () => {
	                // since other matchers are aliases, they should be removed by the original matcher
	                removeRoute(originalMatcher);
	            }
	            : noop;
	    }
	    function removeRoute(matcherRef) {
	        if (isRouteName(matcherRef)) {
	            const matcher = matcherMap.get(matcherRef);
	            if (matcher) {
	                matcherMap.delete(matcherRef);
	                matchers.splice(matchers.indexOf(matcher), 1);
	                matcher.children.forEach(removeRoute);
	                matcher.alias.forEach(removeRoute);
	            }
	        }
	        else {
	            const index = matchers.indexOf(matcherRef);
	            if (index > -1) {
	                matchers.splice(index, 1);
	                if (matcherRef.record.name)
	                    matcherMap.delete(matcherRef.record.name);
	                matcherRef.children.forEach(removeRoute);
	                matcherRef.alias.forEach(removeRoute);
	            }
	        }
	    }
	    function getRoutes() {
	        return matchers;
	    }
	    function insertMatcher(matcher) {
	        let i = 0;
	        while (i < matchers.length &&
	            comparePathParserScore(matcher, matchers[i]) >= 0 &&
	            // Adding children with empty path should still appear before the parent
	            // https://github.com/vuejs/router/issues/1124
	            (matcher.record.path !== matchers[i].record.path ||
	                !isRecordChildOf(matcher, matchers[i])))
	            i++;
	        matchers.splice(i, 0, matcher);
	        // only add the original record to the name map
	        if (matcher.record.name && !isAliasRecord(matcher))
	            matcherMap.set(matcher.record.name, matcher);
	    }
	    function resolve(location, currentLocation) {
	        let matcher;
	        let params = {};
	        let path;
	        let name;
	        if ('name' in location && location.name) {
	            matcher = matcherMap.get(location.name);
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                });
	            name = matcher.record.name;
	            params = assign(
	            // paramsFromLocation is a new object
	            paramsFromLocation(currentLocation.params, 
	            // only keep params that exist in the resolved location
	            // TODO: only keep optional params coming from a parent record
	            matcher.keys.filter(k => !k.optional).map(k => k.name)), location.params);
	            // throws if cannot be stringified
	            path = matcher.stringify(params);
	        }
	        else if ('path' in location) {
	            // no need to resolve the path with the matcher as it was provided
	            // this also allows the user to control the encoding
	            path = location.path;
	            matcher = matchers.find(m => m.re.test(path));
	            // matcher should have a value after the loop
	            if (matcher) {
	                // TODO: dev warning of unused params if provided
	                // we know the matcher works because we tested the regexp
	                params = matcher.parse(path);
	                name = matcher.record.name;
	            }
	            // location is a relative path
	        }
	        else {
	            // match by name or path of current route
	            matcher = currentLocation.name
	                ? matcherMap.get(currentLocation.name)
	                : matchers.find(m => m.re.test(currentLocation.path));
	            if (!matcher)
	                throw createRouterError(1 /* ErrorTypes.MATCHER_NOT_FOUND */, {
	                    location,
	                    currentLocation,
	                });
	            name = matcher.record.name;
	            // since we are navigating to the same location, we don't need to pick the
	            // params like when `name` is provided
	            params = assign({}, currentLocation.params, location.params);
	            path = matcher.stringify(params);
	        }
	        const matched = [];
	        let parentMatcher = matcher;
	        while (parentMatcher) {
	            // reversed order so parents are at the beginning
	            matched.unshift(parentMatcher.record);
	            parentMatcher = parentMatcher.parent;
	        }
	        return {
	            name,
	            path,
	            params,
	            matched,
	            meta: mergeMetaFields(matched),
	        };
	    }
	    // add initial routes
	    routes.forEach(route => addRoute(route));
	    return { addRoute, resolve, removeRoute, getRoutes, getRecordMatcher };
	}
	function paramsFromLocation(params, keys) {
	    const newParams = {};
	    for (const key of keys) {
	        if (key in params)
	            newParams[key] = params[key];
	    }
	    return newParams;
	}
	/**
	 * Normalizes a RouteRecordRaw. Creates a copy
	 *
	 * @param record
	 * @returns the normalized version
	 */
	function normalizeRouteRecord(record) {
	    return {
	        path: record.path,
	        redirect: record.redirect,
	        name: record.name,
	        meta: record.meta || {},
	        aliasOf: undefined,
	        beforeEnter: record.beforeEnter,
	        props: normalizeRecordProps(record),
	        children: record.children || [],
	        instances: {},
	        leaveGuards: new Set(),
	        updateGuards: new Set(),
	        enterCallbacks: {},
	        components: 'components' in record
	            ? record.components || null
	            : record.component && { default: record.component },
	    };
	}
	/**
	 * Normalize the optional `props` in a record to always be an object similar to
	 * components. Also accept a boolean for components.
	 * @param record
	 */
	function normalizeRecordProps(record) {
	    const propsObject = {};
	    // props does not exist on redirect records but we can set false directly
	    const props = record.props || false;
	    if ('component' in record) {
	        propsObject.default = props;
	    }
	    else {
	        // NOTE: we could also allow a function to be applied to every component.
	        // Would need user feedback for use cases
	        for (const name in record.components)
	            propsObject[name] = typeof props === 'boolean' ? props : props[name];
	    }
	    return propsObject;
	}
	/**
	 * Checks if a record or any of its parent is an alias
	 * @param record
	 */
	function isAliasRecord(record) {
	    while (record) {
	        if (record.record.aliasOf)
	            return true;
	        record = record.parent;
	    }
	    return false;
	}
	/**
	 * Merge meta fields of an array of records
	 *
	 * @param matched - array of matched records
	 */
	function mergeMetaFields(matched) {
	    return matched.reduce((meta, record) => assign(meta, record.meta), {});
	}
	function mergeOptions(defaults, partialOptions) {
	    const options = {};
	    for (const key in defaults) {
	        options[key] = key in partialOptions ? partialOptions[key] : defaults[key];
	    }
	    return options;
	}
	function isRecordChildOf(record, parent) {
	    return parent.children.some(child => child === record || isRecordChildOf(record, child));
	}

	/**
	 * Encoding Rules ␣ = Space Path: ␣ " < > # ? { } Query: ␣ " < > # & = Hash: ␣ "
	 * < > `
	 *
	 * On top of that, the RFC3986 (https://tools.ietf.org/html/rfc3986#section-2.2)
	 * defines some extra characters to be encoded. Most browsers do not encode them
	 * in encodeURI https://github.com/whatwg/url/issues/369, so it may be safer to
	 * also encode `!'()*`. Leaving unencoded only ASCII alphanumeric(`a-zA-Z0-9`)
	 * plus `-._~`. This extra safety should be applied to query by patching the
	 * string returned by encodeURIComponent encodeURI also encodes `[\]^`. `\`
	 * should be encoded to avoid ambiguity. Browsers (IE, FF, C) transform a `\`
	 * into a `/` if directly typed in. The _backtick_ (`````) should also be
	 * encoded everywhere because some browsers like FF encode it when directly
	 * written while others don't. Safari and IE don't encode ``"<>{}``` in hash.
	 */
	// const EXTRA_RESERVED_RE = /[!'()*]/g
	// const encodeReservedReplacer = (c: string) => '%' + c.charCodeAt(0).toString(16)
	const HASH_RE = /#/g; // %23
	const AMPERSAND_RE = /&/g; // %26
	const SLASH_RE = /\//g; // %2F
	const EQUAL_RE = /=/g; // %3D
	const IM_RE = /\?/g; // %3F
	const PLUS_RE = /\+/g; // %2B
	/**
	 * NOTE: It's not clear to me if we should encode the + symbol in queries, it
	 * seems to be less flexible than not doing so and I can't find out the legacy
	 * systems requiring this for regular requests like text/html. In the standard,
	 * the encoding of the plus character is only mentioned for
	 * application/x-www-form-urlencoded
	 * (https://url.spec.whatwg.org/#urlencoded-parsing) and most browsers seems lo
	 * leave the plus character as is in queries. To be more flexible, we allow the
	 * plus character on the query but it can also be manually encoded by the user.
	 *
	 * Resources:
	 * - https://url.spec.whatwg.org/#urlencoded-parsing
	 * - https://stackoverflow.com/questions/1634271/url-encoding-the-space-character-or-20
	 */
	const ENC_BRACKET_OPEN_RE = /%5B/g; // [
	const ENC_BRACKET_CLOSE_RE = /%5D/g; // ]
	const ENC_CARET_RE = /%5E/g; // ^
	const ENC_BACKTICK_RE = /%60/g; // `
	const ENC_CURLY_OPEN_RE = /%7B/g; // {
	const ENC_PIPE_RE = /%7C/g; // |
	const ENC_CURLY_CLOSE_RE = /%7D/g; // }
	const ENC_SPACE_RE = /%20/g; // }
	/**
	 * Encode characters that need to be encoded on the path, search and hash
	 * sections of the URL.
	 *
	 * @internal
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function commonEncode(text) {
	    return encodeURI('' + text)
	        .replace(ENC_PIPE_RE, '|')
	        .replace(ENC_BRACKET_OPEN_RE, '[')
	        .replace(ENC_BRACKET_CLOSE_RE, ']');
	}
	/**
	 * Encode characters that need to be encoded on the hash section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeHash(text) {
	    return commonEncode(text)
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^');
	}
	/**
	 * Encode characters that need to be encoded query values on the query
	 * section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeQueryValue(text) {
	    return (commonEncode(text)
	        // Encode the space as +, encode the + to differentiate it from the space
	        .replace(PLUS_RE, '%2B')
	        .replace(ENC_SPACE_RE, '+')
	        .replace(HASH_RE, '%23')
	        .replace(AMPERSAND_RE, '%26')
	        .replace(ENC_BACKTICK_RE, '`')
	        .replace(ENC_CURLY_OPEN_RE, '{')
	        .replace(ENC_CURLY_CLOSE_RE, '}')
	        .replace(ENC_CARET_RE, '^'));
	}
	/**
	 * Like `encodeQueryValue` but also encodes the `=` character.
	 *
	 * @param text - string to encode
	 */
	function encodeQueryKey(text) {
	    return encodeQueryValue(text).replace(EQUAL_RE, '%3D');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodePath(text) {
	    return commonEncode(text).replace(HASH_RE, '%23').replace(IM_RE, '%3F');
	}
	/**
	 * Encode characters that need to be encoded on the path section of the URL as a
	 * param. This function encodes everything {@link encodePath} does plus the
	 * slash (`/`) character. If `text` is `null` or `undefined`, returns an empty
	 * string instead.
	 *
	 * @param text - string to encode
	 * @returns encoded string
	 */
	function encodeParam(text) {
	    return text == null ? '' : encodePath(text).replace(SLASH_RE, '%2F');
	}
	/**
	 * Decode text using `decodeURIComponent`. Returns the original text if it
	 * fails.
	 *
	 * @param text - string to decode
	 * @returns decoded string
	 */
	function decode(text) {
	    try {
	        return decodeURIComponent('' + text);
	    }
	    catch (err) {
	    }
	    return '' + text;
	}

	/**
	 * Transforms a queryString into a {@link LocationQuery} object. Accept both, a
	 * version with the leading `?` and without Should work as URLSearchParams

	 * @internal
	 *
	 * @param search - search string to parse
	 * @returns a query object
	 */
	function parseQuery(search) {
	    const query = {};
	    // avoid creating an object with an empty key and empty value
	    // because of split('&')
	    if (search === '' || search === '?')
	        return query;
	    const hasLeadingIM = search[0] === '?';
	    const searchParams = (hasLeadingIM ? search.slice(1) : search).split('&');
	    for (let i = 0; i < searchParams.length; ++i) {
	        // pre decode the + into space
	        const searchParam = searchParams[i].replace(PLUS_RE, ' ');
	        // allow the = character
	        const eqPos = searchParam.indexOf('=');
	        const key = decode(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
	        const value = eqPos < 0 ? null : decode(searchParam.slice(eqPos + 1));
	        if (key in query) {
	            // an extra variable for ts types
	            let currentValue = query[key];
	            if (!isArray(currentValue)) {
	                currentValue = query[key] = [currentValue];
	            }
	            currentValue.push(value);
	        }
	        else {
	            query[key] = value;
	        }
	    }
	    return query;
	}
	/**
	 * Stringifies a {@link LocationQueryRaw} object. Like `URLSearchParams`, it
	 * doesn't prepend a `?`
	 *
	 * @internal
	 *
	 * @param query - query object to stringify
	 * @returns string version of the query without the leading `?`
	 */
	function stringifyQuery(query) {
	    let search = '';
	    for (let key in query) {
	        const value = query[key];
	        key = encodeQueryKey(key);
	        if (value == null) {
	            // only null adds the value
	            if (value !== undefined) {
	                search += (search.length ? '&' : '') + key;
	            }
	            continue;
	        }
	        // keep null values
	        const values = isArray(value)
	            ? value.map(v => v && encodeQueryValue(v))
	            : [value && encodeQueryValue(value)];
	        values.forEach(value => {
	            // skip undefined values in arrays as if they were not present
	            // smaller code than using filter
	            if (value !== undefined) {
	                // only append & with non-empty search
	                search += (search.length ? '&' : '') + key;
	                if (value != null)
	                    search += '=' + value;
	            }
	        });
	    }
	    return search;
	}
	/**
	 * Transforms a {@link LocationQueryRaw} into a {@link LocationQuery} by casting
	 * numbers into strings, removing keys with an undefined value and replacing
	 * undefined with null in arrays
	 *
	 * @param query - query object to normalize
	 * @returns a normalized query object
	 */
	function normalizeQuery(query) {
	    const normalizedQuery = {};
	    for (const key in query) {
	        const value = query[key];
	        if (value !== undefined) {
	            normalizedQuery[key] = isArray(value)
	                ? value.map(v => (v == null ? null : '' + v))
	                : value == null
	                    ? value
	                    : '' + value;
	        }
	    }
	    return normalizedQuery;
	}

	/**
	 * RouteRecord being rendered by the closest ancestor Router View. Used for
	 * `onBeforeRouteUpdate` and `onBeforeRouteLeave`. rvlm stands for Router View
	 * Location Matched
	 *
	 * @internal
	 */
	const matchedRouteKey = Symbol('');
	/**
	 * Allows overriding the router view depth to control which component in
	 * `matched` is rendered. rvd stands for Router View Depth
	 *
	 * @internal
	 */
	const viewDepthKey = Symbol('');
	/**
	 * Allows overriding the router instance returned by `useRouter` in tests. r
	 * stands for router
	 *
	 * @internal
	 */
	const routerKey = Symbol('');
	/**
	 * Allows overriding the current route returned by `useRoute` in tests. rl
	 * stands for route location
	 *
	 * @internal
	 */
	const routeLocationKey = Symbol('');
	/**
	 * Allows overriding the current route used by router-view. Internally this is
	 * used when the `route` prop is passed.
	 *
	 * @internal
	 */
	const routerViewLocationKey = Symbol('');

	/**
	 * Create a list of callbacks that can be reset. Used to create before and after navigation guards list
	 */
	function useCallbacks() {
	    let handlers = [];
	    function add(handler) {
	        handlers.push(handler);
	        return () => {
	            const i = handlers.indexOf(handler);
	            if (i > -1)
	                handlers.splice(i, 1);
	        };
	    }
	    function reset() {
	        handlers = [];
	    }
	    return {
	        add,
	        list: () => handlers,
	        reset,
	    };
	}

	function registerGuard(record, name, guard) {
	    const removeFromList = () => {
	        record[name].delete(guard);
	    };
	    vue.onUnmounted(removeFromList);
	    vue.onDeactivated(removeFromList);
	    vue.onActivated(() => {
	        record[name].add(guard);
	    });
	    record[name].add(guard);
	}
	/**
	 * Add a navigation guard that triggers whenever the component for the current
	 * location is about to be left. Similar to {@link beforeRouteLeave} but can be
	 * used in any component. The guard is removed when the component is unmounted.
	 *
	 * @param leaveGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteLeave(leaveGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'leaveGuards', leaveGuard);
	}
	/**
	 * Add a navigation guard that triggers whenever the current location is about
	 * to be updated. Similar to {@link beforeRouteUpdate} but can be used in any
	 * component. The guard is removed when the component is unmounted.
	 *
	 * @param updateGuard - {@link NavigationGuard}
	 */
	function onBeforeRouteUpdate(updateGuard) {
	    const activeRecord = vue.inject(matchedRouteKey, 
	    // to avoid warning
	    {}).value;
	    if (!activeRecord) {
	        return;
	    }
	    registerGuard(activeRecord, 'updateGuards', updateGuard);
	}
	function guardToPromiseFn(guard, to, from, record, name) {
	    // keep a reference to the enterCallbackArray to prevent pushing callbacks if a new navigation took place
	    const enterCallbackArray = record &&
	        // name is defined if record is because of the function overload
	        (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
	    return () => new Promise((resolve, reject) => {
	        const next = (valid) => {
	            if (valid === false) {
	                reject(createRouterError(4 /* ErrorTypes.NAVIGATION_ABORTED */, {
	                    from,
	                    to,
	                }));
	            }
	            else if (valid instanceof Error) {
	                reject(valid);
	            }
	            else if (isRouteLocation(valid)) {
	                reject(createRouterError(2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */, {
	                    from: to,
	                    to: valid,
	                }));
	            }
	            else {
	                if (enterCallbackArray &&
	                    // since enterCallbackArray is truthy, both record and name also are
	                    record.enterCallbacks[name] === enterCallbackArray &&
	                    typeof valid === 'function') {
	                    enterCallbackArray.push(valid);
	                }
	                resolve();
	            }
	        };
	        // wrapping with Promise.resolve allows it to work with both async and sync guards
	        const guardReturn = guard.call(record && record.instances[name], to, from, next);
	        let guardCall = Promise.resolve(guardReturn);
	        if (guard.length < 3)
	            guardCall = guardCall.then(next);
	        guardCall.catch(err => reject(err));
	    });
	}
	function extractComponentsGuards(matched, guardType, to, from) {
	    const guards = [];
	    for (const record of matched) {
	        for (const name in record.components) {
	            let rawComponent = record.components[name];
	            // skip update and leave guards if the route component is not mounted
	            if (guardType !== 'beforeRouteEnter' && !record.instances[name])
	                continue;
	            if (isRouteComponent(rawComponent)) {
	                // __vccOpts is added by vue-class-component and contain the regular options
	                const options = rawComponent.__vccOpts || rawComponent;
	                const guard = options[guardType];
	                guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
	            }
	            else {
	                // start requesting the chunk already
	                let componentPromise = rawComponent();
	                guards.push(() => componentPromise.then(resolved => {
	                    if (!resolved)
	                        return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
	                    const resolvedComponent = isESModule(resolved)
	                        ? resolved.default
	                        : resolved;
	                    // replace the function with the resolved component
	                    // cannot be null or undefined because we went into the for loop
	                    record.components[name] = resolvedComponent;
	                    // __vccOpts is added by vue-class-component and contain the regular options
	                    const options = resolvedComponent.__vccOpts || resolvedComponent;
	                    const guard = options[guardType];
	                    return guard && guardToPromiseFn(guard, to, from, record, name)();
	                }));
	            }
	        }
	    }
	    return guards;
	}
	/**
	 * Allows differentiating lazy components from functional components and vue-class-component
	 * @internal
	 *
	 * @param component
	 */
	function isRouteComponent(component) {
	    return (typeof component === 'object' ||
	        'displayName' in component ||
	        'props' in component ||
	        '__vccOpts' in component);
	}
	/**
	 * Ensures a route is loaded so it can be passed as o prop to `<RouterView>`.
	 *
	 * @param route - resolved route to load
	 */
	function loadRouteLocation(route) {
	    return route.matched.every(record => record.redirect)
	        ? Promise.reject(new Error('Cannot load a route that redirects.'))
	        : Promise.all(route.matched.map(record => record.components &&
	            Promise.all(Object.keys(record.components).reduce((promises, name) => {
	                const rawComponent = record.components[name];
	                if (typeof rawComponent === 'function' &&
	                    !('displayName' in rawComponent)) {
	                    promises.push(rawComponent().then(resolved => {
	                        if (!resolved)
	                            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}". Ensure you passed a function that returns a promise.`));
	                        const resolvedComponent = isESModule(resolved)
	                            ? resolved.default
	                            : resolved;
	                        // replace the function with the resolved component
	                        // cannot be null or undefined because we went into the for loop
	                        record.components[name] = resolvedComponent;
	                        return;
	                    }));
	                }
	                return promises;
	            }, [])))).then(() => route);
	}

	// TODO: we could allow currentRoute as a prop to expose `isActive` and
	// `isExactActive` behavior should go through an RFC
	function useLink(props) {
	    const router = vue.inject(routerKey);
	    const currentRoute = vue.inject(routeLocationKey);
	    const route = vue.computed(() => router.resolve(vue.unref(props.to)));
	    const activeRecordIndex = vue.computed(() => {
	        const { matched } = route.value;
	        const { length } = matched;
	        const routeMatched = matched[length - 1];
	        const currentMatched = currentRoute.matched;
	        if (!routeMatched || !currentMatched.length)
	            return -1;
	        const index = currentMatched.findIndex(isSameRouteRecord.bind(null, routeMatched));
	        if (index > -1)
	            return index;
	        // possible parent record
	        const parentRecordPath = getOriginalPath(matched[length - 2]);
	        return (
	        // we are dealing with nested routes
	        length > 1 &&
	            // if the parent and matched route have the same path, this link is
	            // referring to the empty child. Or we currently are on a different
	            // child of the same parent
	            getOriginalPath(routeMatched) === parentRecordPath &&
	            // avoid comparing the child with its parent
	            currentMatched[currentMatched.length - 1].path !== parentRecordPath
	            ? currentMatched.findIndex(isSameRouteRecord.bind(null, matched[length - 2]))
	            : index);
	    });
	    const isActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        includesParams(currentRoute.params, route.value.params));
	    const isExactActive = vue.computed(() => activeRecordIndex.value > -1 &&
	        activeRecordIndex.value === currentRoute.matched.length - 1 &&
	        isSameRouteLocationParams(currentRoute.params, route.value.params));
	    function navigate(e = {}) {
	        if (guardEvent(e)) {
	            return router[vue.unref(props.replace) ? 'replace' : 'push'](vue.unref(props.to)
	            // avoid uncaught errors are they are logged anyway
	            ).catch(noop);
	        }
	        return Promise.resolve();
	    }
	    return {
	        route,
	        href: vue.computed(() => route.value.href),
	        isActive,
	        isExactActive,
	        navigate,
	    };
	}
	const RouterLinkImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterLink',
	    compatConfig: { MODE: 3 },
	    props: {
	        to: {
	            type: [String, Object],
	            required: true,
	        },
	        replace: Boolean,
	        activeClass: String,
	        // inactiveClass: String,
	        exactActiveClass: String,
	        custom: Boolean,
	        ariaCurrentValue: {
	            type: String,
	            default: 'page',
	        },
	    },
	    useLink,
	    setup(props, { slots }) {
	        const link = vue.reactive(useLink(props));
	        const { options } = vue.inject(routerKey);
	        const elClass = vue.computed(() => ({
	            [getLinkClass(props.activeClass, options.linkActiveClass, 'router-link-active')]: link.isActive,
	            // [getLinkClass(
	            //   props.inactiveClass,
	            //   options.linkInactiveClass,
	            //   'router-link-inactive'
	            // )]: !link.isExactActive,
	            [getLinkClass(props.exactActiveClass, options.linkExactActiveClass, 'router-link-exact-active')]: link.isExactActive,
	        }));
	        return () => {
	            const children = slots.default && slots.default(link);
	            return props.custom
	                ? children
	                : vue.h('a', {
	                    'aria-current': link.isExactActive
	                        ? props.ariaCurrentValue
	                        : null,
	                    href: link.href,
	                    // this would override user added attrs but Vue will still add
	                    // the listener so we end up triggering both
	                    onClick: link.navigate,
	                    class: elClass.value,
	                }, children);
	        };
	    },
	});
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to render a link that triggers a navigation on click.
	 */
	const RouterLink = RouterLinkImpl;
	function guardEvent(e) {
	    // don't redirect with control keys
	    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
	        return;
	    // don't redirect when preventDefault called
	    if (e.defaultPrevented)
	        return;
	    // don't redirect on right click
	    if (e.button !== undefined && e.button !== 0)
	        return;
	    // don't redirect if `target="_blank"`
	    // @ts-expect-error getAttribute does exist
	    if (e.currentTarget && e.currentTarget.getAttribute) {
	        // @ts-expect-error getAttribute exists
	        const target = e.currentTarget.getAttribute('target');
	        if (/\b_blank\b/i.test(target))
	            return;
	    }
	    // this may be a Weex event which doesn't have this method
	    if (e.preventDefault)
	        e.preventDefault();
	    return true;
	}
	function includesParams(outer, inner) {
	    for (const key in inner) {
	        const innerValue = inner[key];
	        const outerValue = outer[key];
	        if (typeof innerValue === 'string') {
	            if (innerValue !== outerValue)
	                return false;
	        }
	        else {
	            if (!isArray(outerValue) ||
	                outerValue.length !== innerValue.length ||
	                innerValue.some((value, i) => value !== outerValue[i]))
	                return false;
	        }
	    }
	    return true;
	}
	/**
	 * Get the original path value of a record by following its aliasOf
	 * @param record
	 */
	function getOriginalPath(record) {
	    return record ? (record.aliasOf ? record.aliasOf.path : record.path) : '';
	}
	/**
	 * Utility class to get the active class based on defaults.
	 * @param propClass
	 * @param globalClass
	 * @param defaultClass
	 */
	const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null
	    ? propClass
	    : globalClass != null
	        ? globalClass
	        : defaultClass;

	const RouterViewImpl = /*#__PURE__*/ vue.defineComponent({
	    name: 'RouterView',
	    // #674 we manually inherit them
	    inheritAttrs: false,
	    props: {
	        name: {
	            type: String,
	            default: 'default',
	        },
	        route: Object,
	    },
	    // Better compat for @vue/compat users
	    // https://github.com/vuejs/router/issues/1315
	    compatConfig: { MODE: 3 },
	    setup(props, { attrs, slots }) {
	        const injectedRoute = vue.inject(routerViewLocationKey);
	        const routeToDisplay = vue.computed(() => props.route || injectedRoute.value);
	        const injectedDepth = vue.inject(viewDepthKey, 0);
	        // The depth changes based on empty components option, which allows passthrough routes e.g. routes with children
	        // that are used to reuse the `path` property
	        const depth = vue.computed(() => {
	            let initialDepth = vue.unref(injectedDepth);
	            const { matched } = routeToDisplay.value;
	            let matchedRoute;
	            while ((matchedRoute = matched[initialDepth]) &&
	                !matchedRoute.components) {
	                initialDepth++;
	            }
	            return initialDepth;
	        });
	        const matchedRouteRef = vue.computed(() => routeToDisplay.value.matched[depth.value]);
	        vue.provide(viewDepthKey, vue.computed(() => depth.value + 1));
	        vue.provide(matchedRouteKey, matchedRouteRef);
	        vue.provide(routerViewLocationKey, routeToDisplay);
	        const viewRef = vue.ref();
	        // watch at the same time the component instance, the route record we are
	        // rendering, and the name
	        vue.watch(() => [viewRef.value, matchedRouteRef.value, props.name], ([instance, to, name], [oldInstance, from, oldName]) => {
	            // copy reused instances
	            if (to) {
	                // this will update the instance for new instances as well as reused
	                // instances when navigating to a new route
	                to.instances[name] = instance;
	                // the component instance is reused for a different route or name so
	                // we copy any saved update or leave guards. With async setup, the
	                // mounting component will mount before the matchedRoute changes,
	                // making instance === oldInstance, so we check if guards have been
	                // added before. This works because we remove guards when
	                // unmounting/deactivating components
	                if (from && from !== to && instance && instance === oldInstance) {
	                    if (!to.leaveGuards.size) {
	                        to.leaveGuards = from.leaveGuards;
	                    }
	                    if (!to.updateGuards.size) {
	                        to.updateGuards = from.updateGuards;
	                    }
	                }
	            }
	            // trigger beforeRouteEnter next callbacks
	            if (instance &&
	                to &&
	                // if there is no instance but to and from are the same this might be
	                // the first visit
	                (!from || !isSameRouteRecord(to, from) || !oldInstance)) {
	                (to.enterCallbacks[name] || []).forEach(callback => callback(instance));
	            }
	        }, { flush: 'post' });
	        return () => {
	            const route = routeToDisplay.value;
	            // we need the value at the time we render because when we unmount, we
	            // navigated to a different location so the value is different
	            const currentName = props.name;
	            const matchedRoute = matchedRouteRef.value;
	            const ViewComponent = matchedRoute && matchedRoute.components[currentName];
	            if (!ViewComponent) {
	                return normalizeSlot(slots.default, { Component: ViewComponent, route });
	            }
	            // props from route configuration
	            const routePropsOption = matchedRoute.props[currentName];
	            const routeProps = routePropsOption
	                ? routePropsOption === true
	                    ? route.params
	                    : typeof routePropsOption === 'function'
	                        ? routePropsOption(route)
	                        : routePropsOption
	                : null;
	            const onVnodeUnmounted = vnode => {
	                // remove the instance reference to prevent leak
	                if (vnode.component.isUnmounted) {
	                    matchedRoute.instances[currentName] = null;
	                }
	            };
	            const component = vue.h(ViewComponent, assign({}, routeProps, attrs, {
	                onVnodeUnmounted,
	                ref: viewRef,
	            }));
	            return (
	            // pass the vnode to the slot as a prop.
	            // h and <component :is="..."> both accept vnodes
	            normalizeSlot(slots.default, { Component: component, route }) ||
	                component);
	        };
	    },
	});
	function normalizeSlot(slot, data) {
	    if (!slot)
	        return null;
	    const slotContent = slot(data);
	    return slotContent.length === 1 ? slotContent[0] : slotContent;
	}
	// export the public type for h/tsx inference
	// also to avoid inline import() in generated d.ts files
	/**
	 * Component to display the current route the user is at.
	 */
	const RouterView = RouterViewImpl;

	/**
	 * Creates a Router instance that can be used by a Vue app.
	 *
	 * @param options - {@link RouterOptions}
	 */
	function createRouter(options) {
	    const matcher = createRouterMatcher(options.routes, options);
	    const parseQuery$1 = options.parseQuery || parseQuery;
	    const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
	    const routerHistory = options.history;
	    const beforeGuards = useCallbacks();
	    const beforeResolveGuards = useCallbacks();
	    const afterGuards = useCallbacks();
	    const currentRoute = vue.shallowRef(START_LOCATION_NORMALIZED);
	    let pendingLocation = START_LOCATION_NORMALIZED;
	    const normalizeParams = applyToParams.bind(null, paramValue => '' + paramValue);
	    const encodeParams = applyToParams.bind(null, encodeParam);
	    const decodeParams = 
	    // @ts-expect-error: intentionally avoid the type check
	    applyToParams.bind(null, decode);
	    function addRoute(parentOrRoute, route) {
	        let parent;
	        let record;
	        if (isRouteName(parentOrRoute)) {
	            parent = matcher.getRecordMatcher(parentOrRoute);
	            record = route;
	        }
	        else {
	            record = parentOrRoute;
	        }
	        return matcher.addRoute(record, parent);
	    }
	    function removeRoute(name) {
	        const recordMatcher = matcher.getRecordMatcher(name);
	        if (recordMatcher) {
	            matcher.removeRoute(recordMatcher);
	        }
	    }
	    function getRoutes() {
	        return matcher.getRoutes().map(routeMatcher => routeMatcher.record);
	    }
	    function hasRoute(name) {
	        return !!matcher.getRecordMatcher(name);
	    }
	    function resolve(rawLocation, currentLocation) {
	        // const objectLocation = routerLocationAsObject(rawLocation)
	        // we create a copy to modify it later
	        currentLocation = assign({}, currentLocation || currentRoute.value);
	        if (typeof rawLocation === 'string') {
	            const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
	            const matchedRoute = matcher.resolve({ path: locationNormalized.path }, currentLocation);
	            const href = routerHistory.createHref(locationNormalized.fullPath);
	            // locationNormalized is always a new object
	            return assign(locationNormalized, matchedRoute, {
	                params: decodeParams(matchedRoute.params),
	                hash: decode(locationNormalized.hash),
	                redirectedFrom: undefined,
	                href,
	            });
	        }
	        let matcherLocation;
	        // path could be relative in object as well
	        if ('path' in rawLocation) {
	            matcherLocation = assign({}, rawLocation, {
	                path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path,
	            });
	        }
	        else {
	            // remove any nullish param
	            const targetParams = assign({}, rawLocation.params);
	            for (const key in targetParams) {
	                if (targetParams[key] == null) {
	                    delete targetParams[key];
	                }
	            }
	            // pass encoded values to the matcher so it can produce encoded path and fullPath
	            matcherLocation = assign({}, rawLocation, {
	                params: encodeParams(rawLocation.params),
	            });
	            // current location params are decoded, we need to encode them in case the
	            // matcher merges the params
	            currentLocation.params = encodeParams(currentLocation.params);
	        }
	        const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
	        const hash = rawLocation.hash || '';
	        // decoding them) the matcher might have merged current location params so
	        // we need to run the decoding again
	        matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
	        const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
	            hash: encodeHash(hash),
	            path: matchedRoute.path,
	        }));
	        const href = routerHistory.createHref(fullPath);
	        return assign({
	            fullPath,
	            // keep the hash encoded so fullPath is effectively path + encodedQuery +
	            // hash
	            hash,
	            query: 
	            // if the user is using a custom query lib like qs, we might have
	            // nested objects, so we keep the query as is, meaning it can contain
	            // numbers at `$route.query`, but at the point, the user will have to
	            // use their own type anyway.
	            // https://github.com/vuejs/router/issues/328#issuecomment-649481567
	            stringifyQuery$1 === stringifyQuery
	                ? normalizeQuery(rawLocation.query)
	                : (rawLocation.query || {}),
	        }, matchedRoute, {
	            redirectedFrom: undefined,
	            href,
	        });
	    }
	    function locationAsObject(to) {
	        return typeof to === 'string'
	            ? parseURL(parseQuery$1, to, currentRoute.value.path)
	            : assign({}, to);
	    }
	    function checkCanceledNavigation(to, from) {
	        if (pendingLocation !== to) {
	            return createRouterError(8 /* ErrorTypes.NAVIGATION_CANCELLED */, {
	                from,
	                to,
	            });
	        }
	    }
	    function push(to) {
	        return pushWithRedirect(to);
	    }
	    function replace(to) {
	        return push(assign(locationAsObject(to), { replace: true }));
	    }
	    function handleRedirectRecord(to) {
	        const lastMatched = to.matched[to.matched.length - 1];
	        if (lastMatched && lastMatched.redirect) {
	            const { redirect } = lastMatched;
	            let newTargetLocation = typeof redirect === 'function' ? redirect(to) : redirect;
	            if (typeof newTargetLocation === 'string') {
	                newTargetLocation =
	                    newTargetLocation.includes('?') || newTargetLocation.includes('#')
	                        ? (newTargetLocation = locationAsObject(newTargetLocation))
	                        : // force empty params
	                            { path: newTargetLocation };
	                // @ts-expect-error: force empty params when a string is passed to let
	                // the router parse them again
	                newTargetLocation.params = {};
	            }
	            return assign({
	                query: to.query,
	                hash: to.hash,
	                // avoid transferring params if the redirect has a path
	                params: 'path' in newTargetLocation ? {} : to.params,
	            }, newTargetLocation);
	        }
	    }
	    function pushWithRedirect(to, redirectedFrom) {
	        const targetLocation = (pendingLocation = resolve(to));
	        const from = currentRoute.value;
	        const data = to.state;
	        const force = to.force;
	        // to could be a string where `replace` is a function
	        const replace = to.replace === true;
	        const shouldRedirect = handleRedirectRecord(targetLocation);
	        if (shouldRedirect)
	            return pushWithRedirect(assign(locationAsObject(shouldRedirect), {
	                state: data,
	                force,
	                replace,
	            }), 
	            // keep original redirectedFrom if it exists
	            redirectedFrom || targetLocation);
	        // if it was a redirect we already called `pushWithRedirect` above
	        const toLocation = targetLocation;
	        toLocation.redirectedFrom = redirectedFrom;
	        let failure;
	        if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
	            failure = createRouterError(16 /* ErrorTypes.NAVIGATION_DUPLICATED */, { to: toLocation, from });
	            // trigger scroll to allow scrolling to the same anchor
	            handleScroll();
	        }
	        return (failure ? Promise.resolve(failure) : navigate(toLocation, from))
	            .catch((error) => isNavigationFailure(error)
	            ? // navigation redirects still mark the router as ready
	                isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)
	                    ? error
	                    : markAsReady(error) // also returns the error
	            : // reject any unknown error
	                triggerError(error, toLocation, from))
	            .then((failure) => {
	            if (failure) {
	                if (isNavigationFailure(failure, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    return pushWithRedirect(
	                    // keep options
	                    assign({
	                        // preserve an existing replace but allow the redirect to override it
	                        replace,
	                    }, locationAsObject(failure.to), {
	                        state: data,
	                        force,
	                    }), 
	                    // preserve the original redirectedFrom if any
	                    redirectedFrom || toLocation);
	                }
	            }
	            else {
	                // if we fail we don't finalize the navigation
	                failure = finalizeNavigation(toLocation, from, true, replace, data);
	            }
	            triggerAfterEach(toLocation, from, failure);
	            return failure;
	        });
	    }
	    /**
	     * Helper to reject and skip all navigation guards if a new navigation happened
	     * @param to
	     * @param from
	     */
	    function checkCanceledNavigationAndReject(to, from) {
	        const error = checkCanceledNavigation(to, from);
	        return error ? Promise.reject(error) : Promise.resolve();
	    }
	    // TODO: refactor the whole before guards by internally using router.beforeEach
	    function navigate(to, from) {
	        let guards;
	        const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
	        // all components here have been resolved once because we are leaving
	        guards = extractComponentsGuards(leavingRecords.reverse(), 'beforeRouteLeave', to, from);
	        // leavingRecords is already reversed
	        for (const record of leavingRecords) {
	            record.leaveGuards.forEach(guard => {
	                guards.push(guardToPromiseFn(guard, to, from));
	            });
	        }
	        const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
	        guards.push(canceledNavigationCheck);
	        // run the queue of per route beforeRouteLeave guards
	        return (runGuardQueue(guards)
	            .then(() => {
	            // check global guards beforeEach
	            guards = [];
	            for (const guard of beforeGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check in components beforeRouteUpdate
	            guards = extractComponentsGuards(updatingRecords, 'beforeRouteUpdate', to, from);
	            for (const record of updatingRecords) {
	                record.updateGuards.forEach(guard => {
	                    guards.push(guardToPromiseFn(guard, to, from));
	                });
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check the route beforeEnter
	            guards = [];
	            for (const record of to.matched) {
	                // do not trigger beforeEnter on reused views
	                if (record.beforeEnter && !from.matched.includes(record)) {
	                    if (isArray(record.beforeEnter)) {
	                        for (const beforeEnter of record.beforeEnter)
	                            guards.push(guardToPromiseFn(beforeEnter, to, from));
	                    }
	                    else {
	                        guards.push(guardToPromiseFn(record.beforeEnter, to, from));
	                    }
	                }
	            }
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // NOTE: at this point to.matched is normalized and does not contain any () => Promise<Component>
	            // clear existing enterCallbacks, these are added by extractComponentsGuards
	            to.matched.forEach(record => (record.enterCallbacks = {}));
	            // check in-component beforeRouteEnter
	            guards = extractComponentsGuards(enteringRecords, 'beforeRouteEnter', to, from);
	            guards.push(canceledNavigationCheck);
	            // run the queue of per route beforeEnter guards
	            return runGuardQueue(guards);
	        })
	            .then(() => {
	            // check global guards beforeResolve
	            guards = [];
	            for (const guard of beforeResolveGuards.list()) {
	                guards.push(guardToPromiseFn(guard, to, from));
	            }
	            guards.push(canceledNavigationCheck);
	            return runGuardQueue(guards);
	        })
	            // catch any navigation canceled
	            .catch(err => isNavigationFailure(err, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)
	            ? err
	            : Promise.reject(err)));
	    }
	    function triggerAfterEach(to, from, failure) {
	        // navigation is confirmed, call afterGuards
	        // TODO: wrap with error handlers
	        for (const guard of afterGuards.list())
	            guard(to, from, failure);
	    }
	    /**
	     * - Cleans up any navigation guards
	     * - Changes the url if necessary
	     * - Calls the scrollBehavior
	     */
	    function finalizeNavigation(toLocation, from, isPush, replace, data) {
	        // a more recent navigation took place
	        const error = checkCanceledNavigation(toLocation, from);
	        if (error)
	            return error;
	        // only consider as push if it's not the first navigation
	        const isFirstNavigation = from === START_LOCATION_NORMALIZED;
	        const state = {} ;
	        // change URL only if the user did a push/replace and if it's not the initial navigation because
	        // it's just reflecting the url
	        if (isPush) {
	            // on the initial navigation, we want to reuse the scroll position from
	            // history state if it exists
	            if (replace || isFirstNavigation)
	                routerHistory.replace(toLocation.fullPath, assign({
	                    scroll: isFirstNavigation && state && state.scroll,
	                }, data));
	            else
	                routerHistory.push(toLocation.fullPath, data);
	        }
	        // accept current navigation
	        currentRoute.value = toLocation;
	        handleScroll();
	        markAsReady();
	    }
	    let removeHistoryListener;
	    // attach listener to history to trigger navigations
	    function setupListeners() {
	        // avoid setting up listeners twice due to an invalid first navigation
	        if (removeHistoryListener)
	            return;
	        removeHistoryListener = routerHistory.listen((to, _from, info) => {
	            if (!router.listening)
	                return;
	            // cannot be a redirect route because it was in history
	            const toLocation = resolve(to);
	            // due to dynamic routing, and to hash history with manual navigation
	            // (manually changing the url or calling history.hash = '#/somewhere'),
	            // there could be a redirect record in history
	            const shouldRedirect = handleRedirectRecord(toLocation);
	            if (shouldRedirect) {
	                pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
	                return;
	            }
	            pendingLocation = toLocation;
	            const from = currentRoute.value;
	            navigate(toLocation, from)
	                .catch((error) => {
	                if (isNavigationFailure(error, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
	                    return error;
	                }
	                if (isNavigationFailure(error, 2 /* ErrorTypes.NAVIGATION_GUARD_REDIRECT */)) {
	                    // Here we could call if (info.delta) routerHistory.go(-info.delta,
	                    // false) but this is bug prone as we have no way to wait the
	                    // navigation to be finished before calling pushWithRedirect. Using
	                    // a setTimeout of 16ms seems to work but there is not guarantee for
	                    // it to work on every browser. So Instead we do not restore the
	                    // history entry and trigger a new navigation as requested by the
	                    // navigation guard.
	                    // the error is already handled by router.push we just want to avoid
	                    // logging the error
	                    pushWithRedirect(error.to, toLocation
	                    // avoid an uncaught rejection, let push call triggerError
	                    )
	                        .then(failure => {
	                        // manual change in hash history #916 ending up in the URL not
	                        // changing but it was changed by the manual url change, so we
	                        // need to manually change it ourselves
	                        if (isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ |
	                            16 /* ErrorTypes.NAVIGATION_DUPLICATED */) &&
	                            !info.delta &&
	                            info.type === NavigationType.pop) {
	                            routerHistory.go(-1, false);
	                        }
	                    })
	                        .catch(noop);
	                    // avoid the then branch
	                    return Promise.reject();
	                }
	                // do not restore history on unknown direction
	                if (info.delta) {
	                    routerHistory.go(-info.delta, false);
	                }
	                // unrecognized error, transfer to the global handler
	                return triggerError(error, toLocation, from);
	            })
	                .then((failure) => {
	                failure =
	                    failure ||
	                        finalizeNavigation(
	                        // after navigation, all matched components are resolved
	                        toLocation, from, false);
	                // revert the navigation
	                if (failure) {
	                    if (info.delta &&
	                        // a new navigation has been triggered, so we do not want to revert, that will change the current history
	                        // entry while a different route is displayed
	                        !isNavigationFailure(failure, 8 /* ErrorTypes.NAVIGATION_CANCELLED */)) {
	                        routerHistory.go(-info.delta, false);
	                    }
	                    else if (info.type === NavigationType.pop &&
	                        isNavigationFailure(failure, 4 /* ErrorTypes.NAVIGATION_ABORTED */ | 16 /* ErrorTypes.NAVIGATION_DUPLICATED */)) {
	                        // manual change in hash history #916
	                        // it's like a push but lacks the information of the direction
	                        routerHistory.go(-1, false);
	                    }
	                }
	                triggerAfterEach(toLocation, from, failure);
	            })
	                .catch(noop);
	        });
	    }
	    // Initialization and Errors
	    let readyHandlers = useCallbacks();
	    let errorHandlers = useCallbacks();
	    let ready;
	    /**
	     * Trigger errorHandlers added via onError and throws the error as well
	     *
	     * @param error - error to throw
	     * @param to - location we were navigating to when the error happened
	     * @param from - location we were navigating from when the error happened
	     * @returns the error as a rejected promise
	     */
	    function triggerError(error, to, from) {
	        markAsReady(error);
	        const list = errorHandlers.list();
	        if (list.length) {
	            list.forEach(handler => handler(error, to, from));
	        }
	        else {
	            console.error(error);
	        }
	        return Promise.reject(error);
	    }
	    function isReady() {
	        if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
	            return Promise.resolve();
	        return new Promise((resolve, reject) => {
	            readyHandlers.add([resolve, reject]);
	        });
	    }
	    function markAsReady(err) {
	        if (!ready) {
	            // still not ready if an error happened
	            ready = !err;
	            setupListeners();
	            readyHandlers
	                .list()
	                .forEach(([resolve, reject]) => (err ? reject(err) : resolve()));
	            readyHandlers.reset();
	        }
	        return err;
	    }
	    // Scroll behavior
	    function handleScroll(to, from, isPush, isFirstNavigation) {
	        return Promise.resolve();
	    }
	    const go = (delta) => routerHistory.go(delta);
	    const installedApps = new Set();
	    const router = {
	        currentRoute,
	        listening: true,
	        addRoute,
	        removeRoute,
	        hasRoute,
	        getRoutes,
	        resolve,
	        options,
	        push,
	        replace,
	        go,
	        back: () => go(-1),
	        forward: () => go(1),
	        beforeEach: beforeGuards.add,
	        beforeResolve: beforeResolveGuards.add,
	        afterEach: afterGuards.add,
	        onError: errorHandlers.add,
	        isReady,
	        install(app) {
	            const router = this;
	            app.component('RouterLink', RouterLink);
	            app.component('RouterView', RouterView);
	            app.config.globalProperties.$router = router;
	            Object.defineProperty(app.config.globalProperties, '$route', {
	                enumerable: true,
	                get: () => vue.unref(currentRoute),
	            });
	            const reactiveRoute = {};
	            for (const key in START_LOCATION_NORMALIZED) {
	                // @ts-expect-error: the key matches
	                reactiveRoute[key] = vue.computed(() => currentRoute.value[key]);
	            }
	            app.provide(routerKey, router);
	            app.provide(routeLocationKey, vue.reactive(reactiveRoute));
	            app.provide(routerViewLocationKey, currentRoute);
	            const unmountApp = app.unmount;
	            installedApps.add(app);
	            app.unmount = function () {
	                installedApps.delete(app);
	                // the router is not attached to an app anymore
	                if (installedApps.size < 1) {
	                    // invalidate the current navigation
	                    pendingLocation = START_LOCATION_NORMALIZED;
	                    removeHistoryListener && removeHistoryListener();
	                    removeHistoryListener = null;
	                    currentRoute.value = START_LOCATION_NORMALIZED;
	                    ready = false;
	                }
	                unmountApp();
	            };
	        },
	    };
	    return router;
	}
	function runGuardQueue(guards) {
	    return guards.reduce((promise, guard) => promise.then(() => guard()), Promise.resolve());
	}
	function extractChangingRecords(to, from) {
	    const leavingRecords = [];
	    const updatingRecords = [];
	    const enteringRecords = [];
	    const len = Math.max(from.matched.length, to.matched.length);
	    for (let i = 0; i < len; i++) {
	        const recordFrom = from.matched[i];
	        if (recordFrom) {
	            if (to.matched.find(record => isSameRouteRecord(record, recordFrom)))
	                updatingRecords.push(recordFrom);
	            else
	                leavingRecords.push(recordFrom);
	        }
	        const recordTo = to.matched[i];
	        if (recordTo) {
	            // the type doesn't matter because we are comparing per reference
	            if (!from.matched.find(record => isSameRouteRecord(record, recordTo))) {
	                enteringRecords.push(recordTo);
	            }
	        }
	    }
	    return [leavingRecords, updatingRecords, enteringRecords];
	}

	/**
	 * Returns the router instance. Equivalent to using `$router` inside
	 * templates.
	 */
	function useRouter() {
	    return vue.inject(routerKey);
	}
	/**
	 * Returns the current route location. Equivalent to using `$route` inside
	 * templates.
	 */
	function useRoute() {
	    return vue.inject(routeLocationKey);
	}

	exports.RouterLink = RouterLink;
	exports.RouterView = RouterView;
	exports.START_LOCATION = START_LOCATION_NORMALIZED;
	exports.createMemoryHistory = createMemoryHistory;
	exports.createRouter = createRouter;
	exports.createRouterMatcher = createRouterMatcher;
	exports.createWebHashHistory = createWebHashHistory;
	exports.createWebHistory = createWebHistory;
	exports.isNavigationFailure = isNavigationFailure;
	exports.loadRouteLocation = loadRouteLocation;
	exports.matchedRouteKey = matchedRouteKey;
	exports.onBeforeRouteLeave = onBeforeRouteLeave;
	exports.onBeforeRouteUpdate = onBeforeRouteUpdate;
	exports.parseQuery = parseQuery;
	exports.routeLocationKey = routeLocationKey;
	exports.routerKey = routerKey;
	exports.routerViewLocationKey = routerViewLocationKey;
	exports.stringifyQuery = stringifyQuery;
	exports.useLink = useLink;
	exports.useRoute = useRoute;
	exports.useRouter = useRouter;
	exports.viewDepthKey = viewDepthKey;
} (vueRouter_prod));

/**
 * SSR Window 4.0.2
 * Better handling for window object in SSR environment
 * https://github.com/nolimits4web/ssr-window
 *
 * Copyright 2021, Vladimir Kharlampidi
 *
 * Licensed under MIT
 *
 * Released on: December 13, 2021
 */
/* eslint-disable no-param-reassign */
function isObject$2(obj) {
    return (obj !== null &&
        typeof obj === 'object' &&
        'constructor' in obj &&
        obj.constructor === Object);
}
function extend$1(target = {}, src = {}) {
    Object.keys(src).forEach((key) => {
        if (typeof target[key] === 'undefined')
            target[key] = src[key];
        else if (isObject$2(src[key]) &&
            isObject$2(target[key]) &&
            Object.keys(src[key]).length > 0) {
            extend$1(target[key], src[key]);
        }
    });
}

const ssrDocument = {
    body: {},
    addEventListener() { },
    removeEventListener() { },
    activeElement: {
        blur() { },
        nodeName: '',
    },
    querySelector() {
        return null;
    },
    querySelectorAll() {
        return [];
    },
    getElementById() {
        return null;
    },
    createEvent() {
        return {
            initEvent() { },
        };
    },
    createElement() {
        return {
            children: [],
            childNodes: [],
            style: {},
            setAttribute() { },
            getElementsByTagName() {
                return [];
            },
        };
    },
    createElementNS() {
        return {};
    },
    importNode() {
        return null;
    },
    location: {
        hash: '',
        host: '',
        hostname: '',
        href: '',
        origin: '',
        pathname: '',
        protocol: '',
        search: '',
    },
};
function getDocument() {
    const doc = typeof document !== 'undefined' ? document : {};
    extend$1(doc, ssrDocument);
    return doc;
}

function nextTick(callback, delay) {
  if (delay === void 0) {
    delay = 0;
  }

  return setTimeout(callback, delay);
}

/* eslint no-underscore-dangle: "off" */
function Autoplay(_ref) {
  let {
    swiper,
    extendParams,
    on,
    emit
  } = _ref;
  let timeout;
  swiper.autoplay = {
    running: false,
    paused: false
  };
  extendParams({
    autoplay: {
      enabled: false,
      delay: 3000,
      waitForTransition: true,
      disableOnInteraction: true,
      stopOnLastSlide: false,
      reverseDirection: false,
      pauseOnMouseEnter: false
    }
  });

  function run() {
    if (!swiper.size) {
      swiper.autoplay.running = false;
      swiper.autoplay.paused = false;
      return;
    }

    const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
    let delay = swiper.params.autoplay.delay;

    if ($activeSlideEl.attr('data-swiper-autoplay')) {
      delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
    }

    clearTimeout(timeout);
    timeout = nextTick(() => {
      let autoplayResult;

      if (swiper.params.autoplay.reverseDirection) {
        if (swiper.params.loop) {
          swiper.loopFix();
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.isBeginning) {
          autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
          emit('autoplay');
        } else if (!swiper.params.autoplay.stopOnLastSlide) {
          autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
          emit('autoplay');
        } else {
          stop();
        }
      } else if (swiper.params.loop) {
        swiper.loopFix();
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.isEnd) {
        autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
        emit('autoplay');
      } else if (!swiper.params.autoplay.stopOnLastSlide) {
        autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
        emit('autoplay');
      } else {
        stop();
      }

      if (swiper.params.cssMode && swiper.autoplay.running) run();else if (autoplayResult === false) {
        run();
      }
    }, delay);
  }

  function start() {
    if (typeof timeout !== 'undefined') return false;
    if (swiper.autoplay.running) return false;
    swiper.autoplay.running = true;
    emit('autoplayStart');
    run();
    return true;
  }

  function stop() {
    if (!swiper.autoplay.running) return false;
    if (typeof timeout === 'undefined') return false;

    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }

    swiper.autoplay.running = false;
    emit('autoplayStop');
    return true;
  }

  function pause(speed) {
    if (!swiper.autoplay.running) return;
    if (swiper.autoplay.paused) return;
    if (timeout) clearTimeout(timeout);
    swiper.autoplay.paused = true;

    if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
      swiper.autoplay.paused = false;
      run();
    } else {
      ['transitionend', 'webkitTransitionEnd'].forEach(event => {
        swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
      });
    }
  }

  function onVisibilityChange() {
    const document = getDocument();

    if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
      pause();
    }

    if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
      run();
      swiper.autoplay.paused = false;
    }
  }

  function onTransitionEnd(e) {
    if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
    if (e.target !== swiper.$wrapperEl[0]) return;
    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
    swiper.autoplay.paused = false;

    if (!swiper.autoplay.running) {
      stop();
    } else {
      run();
    }
  }

  function onMouseEnter() {
    if (swiper.params.autoplay.disableOnInteraction) {
      stop();
    } else {
      emit('autoplayPause');
      pause();
    }

    ['transitionend', 'webkitTransitionEnd'].forEach(event => {
      swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
    });
  }

  function onMouseLeave() {
    if (swiper.params.autoplay.disableOnInteraction) {
      return;
    }

    swiper.autoplay.paused = false;
    emit('autoplayResume');
    run();
  }

  function attachMouseEvents() {
    if (swiper.params.autoplay.pauseOnMouseEnter) {
      swiper.$el.on('mouseenter', onMouseEnter);
      swiper.$el.on('mouseleave', onMouseLeave);
    }
  }

  function detachMouseEvents() {
    swiper.$el.off('mouseenter', onMouseEnter);
    swiper.$el.off('mouseleave', onMouseLeave);
  }

  on('init', () => {
    if (swiper.params.autoplay.enabled) {
      start();
      const document = getDocument();
      document.addEventListener('visibilitychange', onVisibilityChange);
      attachMouseEvents();
    }
  });
  on('beforeTransitionStart', (_s, speed, internal) => {
    if (swiper.autoplay.running) {
      if (internal || !swiper.params.autoplay.disableOnInteraction) {
        swiper.autoplay.pause(speed);
      } else {
        stop();
      }
    }
  });
  on('sliderFirstMove', () => {
    if (swiper.autoplay.running) {
      if (swiper.params.autoplay.disableOnInteraction) {
        stop();
      } else {
        pause();
      }
    }
  });
  on('touchEnd', () => {
    if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
      run();
    }
  });
  on('destroy', () => {
    detachMouseEvents();

    if (swiper.autoplay.running) {
      stop();
    }

    const document = getDocument();
    document.removeEventListener('visibilitychange', onVisibilityChange);
  });
  Object.assign(swiper.autoplay, {
    pause,
    run,
    start,
    stop
  });
}

function Grid(_ref) {
  let {
    swiper,
    extendParams
  } = _ref;
  extendParams({
    grid: {
      rows: 1,
      fill: 'column'
    }
  });
  let slidesNumberEvenToRows;
  let slidesPerRow;
  let numFullColumns;

  const initSlides = slidesLength => {
    const {
      slidesPerView
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid;
    slidesPerRow = slidesNumberEvenToRows / rows;
    numFullColumns = Math.floor(slidesLength / rows);

    if (Math.floor(slidesLength / rows) === slidesLength / rows) {
      slidesNumberEvenToRows = slidesLength;
    } else {
      slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
    }

    if (slidesPerView !== 'auto' && fill === 'row') {
      slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
    }
  };

  const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
    const {
      slidesPerGroup,
      spaceBetween
    } = swiper.params;
    const {
      rows,
      fill
    } = swiper.params.grid; // Set slides order

    let newSlideOrderIndex;
    let column;
    let row;

    if (fill === 'row' && slidesPerGroup > 1) {
      const groupIndex = Math.floor(i / (slidesPerGroup * rows));
      const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
      const columnsInGroup = groupIndex === 0 ? slidesPerGroup : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
      row = Math.floor(slideIndexInGroup / columnsInGroup);
      column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
      newSlideOrderIndex = column + row * slidesNumberEvenToRows / rows;
      slide.css({
        '-webkit-order': newSlideOrderIndex,
        order: newSlideOrderIndex
      });
    } else if (fill === 'column') {
      column = Math.floor(i / rows);
      row = i - column * rows;

      if (column > numFullColumns || column === numFullColumns && row === rows - 1) {
        row += 1;

        if (row >= rows) {
          row = 0;
          column += 1;
        }
      }
    } else {
      row = Math.floor(i / slidesPerRow);
      column = i - row * slidesPerRow;
    }

    slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
  };

  const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
    const {
      spaceBetween,
      centeredSlides,
      roundLengths
    } = swiper.params;
    const {
      rows
    } = swiper.params.grid;
    swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
    swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
    swiper.$wrapperEl.css({
      [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`
    });

    if (centeredSlides) {
      snapGrid.splice(0, snapGrid.length);
      const newSlidesGrid = [];

      for (let i = 0; i < snapGrid.length; i += 1) {
        let slidesGridItem = snapGrid[i];
        if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
        if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
      }

      snapGrid.push(...newSlidesGrid);
    }
  };

  swiper.grid = {
    initSlides,
    updateSlide,
    updateWrapperSize
  };
}

const suspectProtoRx = /"(?:_|\\u005[Ff])(?:_|\\u005[Ff])(?:p|\\u0070)(?:r|\\u0072)(?:o|\\u006[Ff])(?:t|\\u0074)(?:o|\\u006[Ff])(?:_|\\u005[Ff])(?:_|\\u005[Ff])"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^["{[]|^-?[0-9][0-9.]{0,14}$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor") {
    return;
  }
  return value;
}
function destr(val) {
  if (typeof val !== "string") {
    return val;
  }
  const _lval = val.toLowerCase();
  if (_lval === "true") {
    return true;
  }
  if (_lval === "false") {
    return false;
  }
  if (_lval === "null") {
    return null;
  }
  if (_lval === "nan") {
    return NaN;
  }
  if (_lval === "infinity") {
    return Infinity;
  }
  if (_lval === "undefined") {
    return void 0;
  }
  if (!JsonSigRx.test(val)) {
    return val;
  }
  try {
    if (suspectProtoRx.test(val) || suspectConstructorRx.test(val)) {
      return JSON.parse(val, jsonParseTransform);
    }
    return JSON.parse(val);
  } catch (_e) {
    return val;
  }
}
class FetchError extends Error {
  constructor() {
    super(...arguments);
    this.name = "FetchError";
  }
}
function createFetchError(request, error, response) {
  let message = "";
  if (request && response) {
    message = `${response.status} ${response.statusText} (${request.toString()})`;
  }
  if (error) {
    message = `${error.message} (${message})`;
  }
  const fetchError = new FetchError(message);
  Object.defineProperty(fetchError, "request", { get() {
    return request;
  } });
  Object.defineProperty(fetchError, "response", { get() {
    return response;
  } });
  Object.defineProperty(fetchError, "data", { get() {
    return response && response._data;
  } });
  return fetchError;
}
const payloadMethods = new Set(Object.freeze(["PATCH", "POST", "PUT", "DELETE"]));
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(val) {
  if (val === void 0) {
    return false;
  }
  const t = typeof val;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(val)) {
    return true;
  }
  return val.constructor && val.constructor.name === "Object" || typeof val.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*`\-.^~]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift();
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  409,
  425,
  429,
  500,
  502,
  503,
  504
]);
function createFetch(globalOptions) {
  const { fetch: fetch2, Headers: Headers2 } = globalOptions;
  function onError(ctx) {
    if (ctx.options.retry !== false) {
      const retries = typeof ctx.options.retry === "number" ? ctx.options.retry : isPayloadMethod(ctx.options.method) ? 0 : 1;
      const responseCode = ctx.response && ctx.response.status || 500;
      if (retries > 0 && retryStatusCodes.has(responseCode)) {
        return $fetchRaw(ctx.request, {
          ...ctx.options,
          retry: retries - 1
        });
      }
    }
    const err = createFetchError(ctx.request, ctx.error, ctx.response);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(err, $fetchRaw);
    }
    throw err;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _opts = {}) {
    const ctx = {
      request: _request,
      options: { ...globalOptions.defaults, ..._opts },
      response: void 0,
      error: void 0
    };
    if (ctx.options.onRequest) {
      await ctx.options.onRequest(ctx);
    }
    if (typeof ctx.request === "string") {
      if (ctx.options.baseURL) {
        ctx.request = withBase(ctx.request, ctx.options.baseURL);
      }
      if (ctx.options.params) {
        ctx.request = withQuery(ctx.request, ctx.options.params);
      }
      if (ctx.options.body && isPayloadMethod(ctx.options.method)) {
        if (isJSONSerializable(ctx.options.body)) {
          ctx.options.body = typeof ctx.options.body === "string" ? ctx.options.body : JSON.stringify(ctx.options.body);
          ctx.options.headers = new Headers2(ctx.options.headers);
          if (!ctx.options.headers.has("content-type")) {
            ctx.options.headers.set("content-type", "application/json");
          }
          if (!ctx.options.headers.has("accept")) {
            ctx.options.headers.set("accept", "application/json");
          }
        }
      }
    }
    ctx.response = await fetch2(ctx.request, ctx.options).catch(async (error) => {
      ctx.error = error;
      if (ctx.options.onRequestError) {
        await ctx.options.onRequestError(ctx);
      }
      return onError(ctx);
    });
    const responseType = (ctx.options.parseResponse ? "json" : ctx.options.responseType) || detectResponseType(ctx.response.headers.get("content-type") || "");
    if (responseType === "json") {
      const data = await ctx.response.text();
      const parseFn = ctx.options.parseResponse || destr;
      ctx.response._data = parseFn(data);
    } else {
      ctx.response._data = await ctx.response[responseType]();
    }
    if (ctx.options.onResponse) {
      await ctx.options.onResponse(ctx);
    }
    if (!ctx.response.ok) {
      if (ctx.options.onResponseError) {
        await ctx.options.onResponseError(ctx);
      }
    }
    return ctx.response.ok ? ctx.response : onError(ctx);
  };
  const $fetch2 = function $fetch22(request, opts) {
    return $fetchRaw(request, opts).then((r) => r._data);
  };
  $fetch2.raw = $fetchRaw;
  $fetch2.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch2;
}
const _globalThis$2 = function() {
  if (typeof globalThis !== "undefined") {
    return globalThis;
  }
  if (typeof self !== "undefined") {
    return self;
  }
  if (typeof global !== "undefined") {
    return global;
  }
  throw new Error("unable to locate global object");
}();
const fetch$1 = _globalThis$2.fetch || (() => Promise.reject(new Error("[ohmyfetch] global.fetch is not supported!")));
const Headers = _globalThis$2.Headers;
const $fetch$1 = createFetch({ fetch: fetch$1, Headers });
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
function serialCaller(hooks, args) {
  return hooks.reduce((promise, hookFn) => promise.then(() => hookFn.apply(void 0, args)), Promise.resolve(null));
}
function parallelCaller(hooks, args) {
  return Promise.all(hooks.map((hook) => hook.apply(void 0, args)));
}
class Hookable {
  constructor() {
    this._hooks = {};
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, fn) {
    if (!name || typeof fn !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let deprecatedHookObj;
    while (this._deprecatedHooks[name]) {
      const deprecatedHook = this._deprecatedHooks[name];
      if (typeof deprecatedHook === "string") {
        deprecatedHookObj = { to: deprecatedHook };
      } else {
        deprecatedHookObj = deprecatedHook;
      }
      name = deprecatedHookObj.to;
    }
    if (deprecatedHookObj) {
      if (!deprecatedHookObj.message) {
        console.warn(`${originalName} hook has been deprecated` + (deprecatedHookObj.to ? `, please use ${deprecatedHookObj.to}` : ""));
      } else {
        console.warn(deprecatedHookObj.message);
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(fn);
    return () => {
      if (fn) {
        this.removeHook(name, fn);
        fn = null;
      }
    };
  }
  hookOnce(name, fn) {
    let _unreg;
    let _fn = (...args) => {
      _unreg();
      _unreg = null;
      _fn = null;
      return fn(...args);
    };
    _unreg = this.hook(name, _fn);
    return _unreg;
  }
  removeHook(name, fn) {
    if (this._hooks[name]) {
      const idx = this._hooks[name].indexOf(fn);
      if (idx !== -1) {
        this._hooks[name].splice(idx, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = deprecated;
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map((key) => this.hook(key, hooks[key]));
    return () => {
      removeFns.splice(0, removeFns.length).forEach((unreg) => unreg());
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  callHook(name, ...args) {
    return serialCaller(this._hooks[name] || [], args);
  }
  callHookParallel(name, ...args) {
    return parallelCaller(this._hooks[name] || [], args);
  }
  callHookWith(caller, name, ...args) {
    return caller(this._hooks[name] || [], args);
  }
}
function createHooks() {
  return new Hookable();
}
function createContext() {
  let currentInstance = null;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  return {
    use: () => currentInstance,
    tryUse: () => currentInstance,
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = null;
      isSingleton = false;
    },
    call: (instance, cb) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return cb();
      } finally {
        if (!isSingleton) {
          currentInstance = null;
        }
      }
    },
    async callAsync(instance, cb) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : void 0;
      asyncHandlers.add(onLeave);
      try {
        const r = cb();
        if (!isSingleton) {
          currentInstance = null;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace() {
  const contexts = {};
  return {
    get(key) {
      if (!contexts[key]) {
        contexts[key] = createContext();
      }
      contexts[key];
      return contexts[key];
    }
  };
}
const _globalThis$1 = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis$1[globalKey] || (_globalThis$1[globalKey] = createNamespace());
const getContext = (key) => defaultNamespace.get(key);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis$1[asyncHandlersKey] || (_globalThis$1[asyncHandlersKey] = /* @__PURE__ */ new Set());
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: vue_cjs_prod.reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  if (nuxtApp.ssrContext) {
    nuxtApp.ssrContext.nuxt = nuxtApp;
  }
  {
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    nuxtApp.ssrContext.payload = nuxtApp.payload;
  }
  {
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.use();
  if (!nuxtAppInstance) {
    const vm = vue_cjs_prod.getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const wrapInRef = (value) => vue_cjs_prod.isRef(value) ? value : vue_cjs_prod.ref(value);
const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e, _f, _g;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  if (options.defer) {
    console.warn("[useAsyncData] `defer` has been renamed to `lazy`. Support for `defer` will be removed in RC.");
  }
  options.lazy = (_d = (_c = options.lazy) != null ? _c : options.defer) != null ? _d : false;
  options.initialCache = (_e = options.initialCache) != null ? _e : true;
  const nuxt = useNuxtApp();
  const instance = vue_cjs_prod.getCurrentInstance();
  if (instance && !instance._nuxtOnBeforeMountCbs) {
    const cbs = instance._nuxtOnBeforeMountCbs = [];
    if (instance && false) {
      vue_cjs_prod.onUnmounted(() => cbs.splice(0, cbs.length));
    }
  }
  const useInitialCache = () => options.initialCache && nuxt.payload.data[key] !== void 0;
  const asyncData = {
    data: wrapInRef((_f = nuxt.payload.data[key]) != null ? _f : options.default()),
    pending: vue_cjs_prod.ref(!useInitialCache()),
    error: vue_cjs_prod.ref((_g = nuxt.payload._errors[key]) != null ? _g : null)
  };
  asyncData.refresh = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      return nuxt._asyncDataPromises[key];
    }
    if (opts._initial && useInitialCache()) {
      return nuxt.payload.data[key];
    }
    asyncData.pending.value = true;
    nuxt._asyncDataPromises[key] = Promise.resolve(handler(nuxt)).then((result) => {
      if (options.transform) {
        result = options.transform(result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
    }).catch((error) => {
      asyncData.error.value = error;
      asyncData.data.value = vue_cjs_prod.unref(options.default());
    }).finally(() => {
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = true;
      }
      delete nuxt._asyncDataPromises[key];
    });
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer) {
    const promise = initialFetch();
    vue_cjs_prod.onServerPrefetch(() => promise);
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys2) {
  const newObj = {};
  for (const key of keys2) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = vue_cjs_prod.toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (vue_cjs_prod.isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => {
  const nuxtApp = useNuxtApp();
  return useState("error", () => nuxtApp.ssrContext.error, "$bWWAMK0bSA");
};
const throwError = (_err) => {
  const nuxtApp = useNuxtApp();
  useError();
  const err = typeof _err === "string" ? new Error(_err) : _err;
  nuxtApp.callHook("app:error", err);
  {
    nuxtApp.ssrContext.error = nuxtApp.ssrContext.error || err;
  }
  return err;
};
function useFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _key = opts.key || autoKey;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = "$f" + _key;
  const _request = vue_cjs_prod.computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return vue_cjs_prod.isRef(r) ? r.value : r;
  });
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    initialCache,
    ...fetchOptions
  } = opts;
  const _fetchOptions = {
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  };
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    initialCache,
    watch: [
      _request,
      ...watch || []
    ]
  };
  const asyncData = useAsyncData(key, () => {
    return $fetch(_request.value, _fetchOptions);
  }, _asyncDataOptions, "$Y1nhoWDLED");
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  return useFetch(request, {
    ...opts,
    lazy: true
  }, autoKey);
}
const MIMES = {
  html: "text/html",
  json: "application/json"
};
const defer = typeof setImmediate !== "undefined" ? setImmediate : (fn) => fn();
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      event.res.end(data);
      resolve(void 0);
    });
  });
}
function defaultContentType(event, type) {
  if (type && !event.res.getHeader("Content-Type")) {
    event.res.setHeader("Content-Type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.res.statusCode = code;
  event.res.setHeader("Location", location);
  const html = `<!DOCTYPE html>
<html>
  <head><meta http-equiv="refresh" content="0; url=${encodeURI(location)}"></head>
  <body>Redirecting to <a href=${JSON.stringify(location)}>${encodeURI(location)}</a></body>
</html>`;
  return send(event, html, MIMES.html);
}
class H3Error extends Error {
  constructor() {
    super(...arguments);
    this.statusCode = 500;
    this.fatal = false;
    this.unhandled = false;
    this.statusMessage = "Internal Server Error";
  }
}
H3Error.__h3_error__ = true;
function createError(input) {
  var _a;
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error((_a = input.message) != null ? _a : input.statusMessage, input.cause ? { cause: input.cause } : void 0);
  if (input.statusCode) {
    err.statusCode = input.statusCode;
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.fatal !== void 0) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== void 0) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function isError(input) {
  var _a;
  return ((_a = input == null ? void 0 : input.constructor) == null ? void 0 : _a.__h3_error__) === true;
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  return useNuxtApp()._route;
};
const navigateTo = (to, options = {}) => {
  if (!to) {
    to = "/";
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, options.redirectCode || 302));
    }
  }
  return options.replace ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return vue_cjs_prod.defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = vue_cjs_prod.computed(() => {
        return props.to || props.href || "";
      });
      const isExternal = vue_cjs_prod.computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      return () => {
        var _a, _b, _c;
        if (!isExternal.value) {
          return vue_cjs_prod.h(vue_cjs_prod.resolveComponent("RouterLink"), {
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          }, slots.default);
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return vue_cjs_prod.h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
const nuxtLink = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  defineNuxtLink,
  "default": __nuxt_component_0$2
}, Symbol.toStringTag, { value: "Module" }));
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var shared_cjs_prod = {};
Object.defineProperty(shared_cjs_prod, "__esModule", { value: true });
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const PatchFlagNames = {
  [1]: `TEXT`,
  [2]: `CLASS`,
  [4]: `STYLE`,
  [8]: `PROPS`,
  [16]: `FULL_PROPS`,
  [32]: `HYDRATE_EVENTS`,
  [64]: `STABLE_FRAGMENT`,
  [128]: `KEYED_FRAGMENT`,
  [256]: `UNKEYED_FRAGMENT`,
  [512]: `NEED_PATCH`,
  [1024]: `DYNAMIC_SLOTS`,
  [2048]: `DEV_ROOT_FRAGMENT`,
  [-1]: `HOISTED`,
  [-2]: `BAIL`
};
const slotFlagsText = {
  [1]: "STABLE",
  [2]: "DYNAMIC",
  [3]: "FORWARDED"
};
const GLOBALS_WHITE_LISTED = "Infinity,undefined,NaN,isFinite,isNaN,parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,BigInt";
const isGloballyWhitelisted = /* @__PURE__ */ makeMap(GLOBALS_WHITE_LISTED);
const range = 2;
function generateCodeFrame(source, start = 0, end = source.length) {
  let lines = source.split(/(\r?\n)/);
  const newlineSequences = lines.filter((_, idx) => idx % 2 === 1);
  lines = lines.filter((_, idx) => idx % 2 === 0);
  let count = 0;
  const res = [];
  for (let i = 0; i < lines.length; i++) {
    count += lines[i].length + (newlineSequences[i] && newlineSequences[i].length || 0);
    if (count >= start) {
      for (let j = i - range; j <= i + range || end > count; j++) {
        if (j < 0 || j >= lines.length)
          continue;
        const line = j + 1;
        res.push(`${line}${" ".repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
        const lineLength = lines[j].length;
        const newLineSeqLength = newlineSequences[j] && newlineSequences[j].length || 0;
        if (j === i) {
          const pad = start - (count - (lineLength + newLineSeqLength));
          const length = Math.max(1, end > count ? lineLength - pad : end - start);
          res.push(`   |  ` + " ".repeat(pad) + "^".repeat(length));
        } else if (j > i) {
          if (end > count) {
            const length = Math.max(Math.min(end - count, lineLength), 1);
            res.push(`   |  ` + "^".repeat(length));
          }
          count += lineLength + newLineSeqLength;
        }
      }
      break;
    }
  }
  return res.join("\n");
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
const isBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs + `,async,autofocus,autoplay,controls,default,defer,disabled,hidden,loop,open,required,reversed,scoped,seamless,checked,muted,multiple,selected`);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const unsafeAttrCharRE = /[>/="'\u0009\u000a\u000c\u0020]/;
const attrValidationCache = {};
function isSSRSafeAttrName(name) {
  if (attrValidationCache.hasOwnProperty(name)) {
    return attrValidationCache[name];
  }
  const isUnsafe = unsafeAttrCharRE.test(name);
  if (isUnsafe) {
    console.error(`unsafe attribute name: ${name}`);
  }
  return attrValidationCache[name] = !isUnsafe;
}
const propsToAttrMap = {
  acceptCharset: "accept-charset",
  className: "class",
  htmlFor: "for",
  httpEquiv: "http-equiv"
};
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
const isKnownHtmlAttr = /* @__PURE__ */ makeMap(`accept,accept-charset,accesskey,action,align,allow,alt,async,autocapitalize,autocomplete,autofocus,autoplay,background,bgcolor,border,buffered,capture,challenge,charset,checked,cite,class,code,codebase,color,cols,colspan,content,contenteditable,contextmenu,controls,coords,crossorigin,csp,data,datetime,decoding,default,defer,dir,dirname,disabled,download,draggable,dropzone,enctype,enterkeyhint,for,form,formaction,formenctype,formmethod,formnovalidate,formtarget,headers,height,hidden,high,href,hreflang,http-equiv,icon,id,importance,integrity,ismap,itemprop,keytype,kind,label,lang,language,loading,list,loop,low,manifest,max,maxlength,minlength,media,min,multiple,muted,name,novalidate,open,optimum,pattern,ping,placeholder,poster,preload,radiogroup,readonly,referrerpolicy,rel,required,reversed,rows,rowspan,sandbox,scope,scoped,selected,shape,size,sizes,slot,span,spellcheck,src,srcdoc,srclang,srcset,start,step,style,summary,tabindex,target,title,translate,type,usemap,value,width,wrap`);
const isKnownSvgAttr = /* @__PURE__ */ makeMap(`xmlns,accent-height,accumulate,additive,alignment-baseline,alphabetic,amplitude,arabic-form,ascent,attributeName,attributeType,azimuth,baseFrequency,baseline-shift,baseProfile,bbox,begin,bias,by,calcMode,cap-height,class,clip,clipPathUnits,clip-path,clip-rule,color,color-interpolation,color-interpolation-filters,color-profile,color-rendering,contentScriptType,contentStyleType,crossorigin,cursor,cx,cy,d,decelerate,descent,diffuseConstant,direction,display,divisor,dominant-baseline,dur,dx,dy,edgeMode,elevation,enable-background,end,exponent,fill,fill-opacity,fill-rule,filter,filterRes,filterUnits,flood-color,flood-opacity,font-family,font-size,font-size-adjust,font-stretch,font-style,font-variant,font-weight,format,from,fr,fx,fy,g1,g2,glyph-name,glyph-orientation-horizontal,glyph-orientation-vertical,glyphRef,gradientTransform,gradientUnits,hanging,height,href,hreflang,horiz-adv-x,horiz-origin-x,id,ideographic,image-rendering,in,in2,intercept,k,k1,k2,k3,k4,kernelMatrix,kernelUnitLength,kerning,keyPoints,keySplines,keyTimes,lang,lengthAdjust,letter-spacing,lighting-color,limitingConeAngle,local,marker-end,marker-mid,marker-start,markerHeight,markerUnits,markerWidth,mask,maskContentUnits,maskUnits,mathematical,max,media,method,min,mode,name,numOctaves,offset,opacity,operator,order,orient,orientation,origin,overflow,overline-position,overline-thickness,panose-1,paint-order,path,pathLength,patternContentUnits,patternTransform,patternUnits,ping,pointer-events,points,pointsAtX,pointsAtY,pointsAtZ,preserveAlpha,preserveAspectRatio,primitiveUnits,r,radius,referrerPolicy,refX,refY,rel,rendering-intent,repeatCount,repeatDur,requiredExtensions,requiredFeatures,restart,result,rotate,rx,ry,scale,seed,shape-rendering,slope,spacing,specularConstant,specularExponent,speed,spreadMethod,startOffset,stdDeviation,stemh,stemv,stitchTiles,stop-color,stop-opacity,strikethrough-position,strikethrough-thickness,string,stroke,stroke-dasharray,stroke-dashoffset,stroke-linecap,stroke-linejoin,stroke-miterlimit,stroke-opacity,stroke-width,style,surfaceScale,systemLanguage,tabindex,tableValues,target,targetX,targetY,text-anchor,text-decoration,text-rendering,textLength,to,transform,transform-origin,type,u1,u2,underline-position,underline-thickness,unicode,unicode-bidi,unicode-range,units-per-em,v-alphabetic,v-hanging,v-ideographic,v-mathematical,values,vector-effect,version,vert-adv-y,vert-origin-x,vert-origin-y,viewBox,viewTarget,visibility,width,widths,word-spacing,writing-mode,x,x-height,x1,x2,xChannelSelector,xlink:actuate,xlink:arcrole,xlink:href,xlink:role,xlink:show,xlink:title,xlink:type,xml:base,xml:lang,xml:space,y,y1,y2,yChannelSelector,z,zoomAndPan`);
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
function normalizeProps(props) {
  if (!props)
    return null;
  let { class: klass, style } = props;
  if (klass && !isString(klass)) {
    props.class = normalizeClass(klass);
  }
  if (style) {
    props.style = normalizeStyle(style);
  }
  return props;
}
const HTML_TAGS = "html,body,base,head,link,meta,style,title,address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,nav,section,div,dd,dl,dt,figcaption,figure,picture,hr,img,li,main,ol,p,pre,ul,a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,ruby,s,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,embed,object,param,source,canvas,script,noscript,del,ins,caption,col,colgroup,table,thead,tbody,td,th,tr,button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,output,progress,select,textarea,details,dialog,menu,summary,template,blockquote,iframe,tfoot";
const SVG_TAGS = "svg,animate,animateMotion,animateTransform,circle,clipPath,color-profile,defs,desc,discard,ellipse,feBlend,feColorMatrix,feComponentTransfer,feComposite,feConvolveMatrix,feDiffuseLighting,feDisplacementMap,feDistanceLight,feDropShadow,feFlood,feFuncA,feFuncB,feFuncG,feFuncR,feGaussianBlur,feImage,feMerge,feMergeNode,feMorphology,feOffset,fePointLight,feSpecularLighting,feSpotLight,feTile,feTurbulence,filter,foreignObject,g,hatch,hatchpath,image,line,linearGradient,marker,mask,mesh,meshgradient,meshpatch,meshrow,metadata,mpath,path,pattern,polygon,polyline,radialGradient,rect,set,solidcolor,stop,switch,symbol,text,textPath,title,tspan,unknown,use,view";
const VOID_TAGS = "area,base,br,col,embed,hr,img,input,link,meta,param,source,track,wbr";
const isHTMLTag = /* @__PURE__ */ makeMap(HTML_TAGS);
const isSVGTag = /* @__PURE__ */ makeMap(SVG_TAGS);
const isVoidTag = /* @__PURE__ */ makeMap(VOID_TAGS);
const escapeRE = /["'&<>]/;
function escapeHtml(string) {
  const str = "" + string;
  const match = escapeRE.exec(str);
  if (!match) {
    return str;
  }
  let html = "";
  let escaped;
  let index2;
  let lastIndex = 0;
  for (index2 = match.index; index2 < str.length; index2++) {
    switch (str.charCodeAt(index2)) {
      case 34:
        escaped = "&quot;";
        break;
      case 38:
        escaped = "&amp;";
        break;
      case 39:
        escaped = "&#39;";
        break;
      case 60:
        escaped = "&lt;";
        break;
      case 62:
        escaped = "&gt;";
        break;
      default:
        continue;
    }
    if (lastIndex !== index2) {
      html += str.slice(lastIndex, index2);
    }
    lastIndex = index2 + 1;
    html += escaped;
  }
  return lastIndex !== index2 ? html + str.slice(lastIndex, index2) : html;
}
const commentStripRE = /^-?>|<!--|-->|--!>|<!-$/g;
function escapeHtmlComment(src) {
  return src.replace(commentStripRE, "");
}
function looseCompareArrays(a, b) {
  if (a.length !== b.length)
    return false;
  let equal = true;
  for (let i = 0; equal && i < a.length; i++) {
    equal = looseEqual(a[i], b[i]);
  }
  return equal;
}
function looseEqual(a, b) {
  if (a === b)
    return true;
  let aValidType = isDate(a);
  let bValidType = isDate(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? a.getTime() === b.getTime() : false;
  }
  aValidType = isSymbol(a);
  bValidType = isSymbol(b);
  if (aValidType || bValidType) {
    return a === b;
  }
  aValidType = isArray(a);
  bValidType = isArray(b);
  if (aValidType || bValidType) {
    return aValidType && bValidType ? looseCompareArrays(a, b) : false;
  }
  aValidType = isObject$1(a);
  bValidType = isObject$1(b);
  if (aValidType || bValidType) {
    if (!aValidType || !bValidType) {
      return false;
    }
    const aKeysCount = Object.keys(a).length;
    const bKeysCount = Object.keys(b).length;
    if (aKeysCount !== bKeysCount) {
      return false;
    }
    for (const key in a) {
      const aHasKey = a.hasOwnProperty(key);
      const bHasKey = b.hasOwnProperty(key);
      if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key])) {
        return false;
      }
    }
  }
  return String(a) === String(b);
}
function looseIndexOf(arr, val) {
  return arr.findIndex((item) => looseEqual(item, val));
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isDate = (val) => toTypeString(val) === "[object Date]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof commonjsGlobal !== "undefined" ? commonjsGlobal : {});
};
const identRE = /^[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*$/;
function genPropsAccessExp(name) {
  return identRE.test(name) ? `__props.${name}` : `__props[${JSON.stringify(name)}]`;
}
shared_cjs_prod.EMPTY_ARR = EMPTY_ARR;
shared_cjs_prod.EMPTY_OBJ = EMPTY_OBJ;
shared_cjs_prod.NO = NO;
shared_cjs_prod.NOOP = NOOP;
shared_cjs_prod.PatchFlagNames = PatchFlagNames;
shared_cjs_prod.camelize = camelize;
shared_cjs_prod.capitalize = capitalize;
shared_cjs_prod.def = def;
shared_cjs_prod.escapeHtml = escapeHtml;
shared_cjs_prod.escapeHtmlComment = escapeHtmlComment;
shared_cjs_prod.extend = extend;
shared_cjs_prod.genPropsAccessExp = genPropsAccessExp;
shared_cjs_prod.generateCodeFrame = generateCodeFrame;
shared_cjs_prod.getGlobalThis = getGlobalThis;
shared_cjs_prod.hasChanged = hasChanged;
shared_cjs_prod.hasOwn = hasOwn;
shared_cjs_prod.hyphenate = hyphenate;
shared_cjs_prod.includeBooleanAttr = includeBooleanAttr;
shared_cjs_prod.invokeArrayFns = invokeArrayFns;
shared_cjs_prod.isArray = isArray;
shared_cjs_prod.isBooleanAttr = isBooleanAttr;
shared_cjs_prod.isBuiltInDirective = isBuiltInDirective;
shared_cjs_prod.isDate = isDate;
var isFunction_1 = shared_cjs_prod.isFunction = isFunction;
shared_cjs_prod.isGloballyWhitelisted = isGloballyWhitelisted;
shared_cjs_prod.isHTMLTag = isHTMLTag;
shared_cjs_prod.isIntegerKey = isIntegerKey;
shared_cjs_prod.isKnownHtmlAttr = isKnownHtmlAttr;
shared_cjs_prod.isKnownSvgAttr = isKnownSvgAttr;
shared_cjs_prod.isMap = isMap;
shared_cjs_prod.isModelListener = isModelListener;
shared_cjs_prod.isNoUnitNumericStyleProp = isNoUnitNumericStyleProp;
shared_cjs_prod.isObject = isObject$1;
shared_cjs_prod.isOn = isOn;
shared_cjs_prod.isPlainObject = isPlainObject;
shared_cjs_prod.isPromise = isPromise;
shared_cjs_prod.isReservedProp = isReservedProp;
shared_cjs_prod.isSSRSafeAttrName = isSSRSafeAttrName;
shared_cjs_prod.isSVGTag = isSVGTag;
shared_cjs_prod.isSet = isSet;
shared_cjs_prod.isSpecialBooleanAttr = isSpecialBooleanAttr;
shared_cjs_prod.isString = isString;
shared_cjs_prod.isSymbol = isSymbol;
shared_cjs_prod.isVoidTag = isVoidTag;
shared_cjs_prod.looseEqual = looseEqual;
shared_cjs_prod.looseIndexOf = looseIndexOf;
shared_cjs_prod.makeMap = makeMap;
shared_cjs_prod.normalizeClass = normalizeClass;
shared_cjs_prod.normalizeProps = normalizeProps;
shared_cjs_prod.normalizeStyle = normalizeStyle;
shared_cjs_prod.objectToString = objectToString;
shared_cjs_prod.parseStringStyle = parseStringStyle;
shared_cjs_prod.propsToAttrMap = propsToAttrMap;
shared_cjs_prod.remove = remove;
shared_cjs_prod.slotFlagsText = slotFlagsText;
shared_cjs_prod.stringifyStyle = stringifyStyle;
shared_cjs_prod.toDisplayString = toDisplayString;
shared_cjs_prod.toHandlerKey = toHandlerKey;
shared_cjs_prod.toNumber = toNumber;
shared_cjs_prod.toRawType = toRawType;
shared_cjs_prod.toTypeString = toTypeString;
function useHead(meta2) {
  const resolvedMeta = isFunction_1(meta2) ? vue_cjs_prod.computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const preload = defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.mixin({
    beforeCreate() {
      const { _registeredComponents } = this.$nuxt.ssrContext;
      const { __moduleIdentifier } = this.$options;
      _registeredComponents.add(__moduleIdentifier);
    }
  });
});
const components = {};
const _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47_46nuxt_47components_46plugin_46mjs = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document) => {
  const el = document.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var htmlEscape = (str) => str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = htmlEscape(key);
    if (value !== true) {
      attribute += `="${htmlEscape(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var getTagKey = (props) => {
  const names = ["key", "id", "name", "property"];
  for (const n of names) {
    const value = typeof props.getAttribute === "function" ? props.hasAttribute(n) ? props.getAttribute(n) : void 0 : props[n];
    if (value !== void 0) {
      return { name: n, value };
    }
  }
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(vue_cjs_prod.unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys2 = Object.keys(obj);
  for (const key of keys2) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: __spreadValues({ key: "default" }, obj[key]) });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: item });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys2 = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys2.push(key);
  }
  if (keys2.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys2.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document = window.document, type, tags) => {
  var _a, _b;
  const head = document.head;
  const body = document.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute("content", "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length));
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(vue_cjs_prod.shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const titleTemplate = allHeadObjs.map((i) => vue_cjs_prod.unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs) => {
        const tags = headObjToTags(vue_cjs_prod.unref(objs));
        tags.forEach((tag) => {
          if (tag.tag === "meta" || tag.tag === "base" || tag.tag === "script") {
            const key = getTagKey(tag.props);
            if (key) {
              let index2 = -1;
              for (let i = 0; i < deduped.length; i++) {
                const prev = deduped[i];
                const prevValue = prev.props[key.name];
                const nextValue = tag.props[key.name];
                if (prev.tag === tag.tag && prevValue === nextValue) {
                  index2 = i;
                  break;
                }
              }
              if (index2 !== -1) {
                deduped.splice(index2, 1);
              }
            }
          }
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(titleTemplate, tag.props.children);
          }
          deduped.push(tag);
        });
      });
      return deduped;
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document.title = title;
      }
      setAttrs(document.documentElement, htmlAttrs);
      setAttrs(document.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, htmlAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      }));
    },
    get bodyAttrs() {
      return stringifyAttrs(__spreadProps(__spreadValues({}, bodyAttrs), {
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      }));
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
function isObject(val) {
  return val !== null && typeof val === "object";
}
function _defu(baseObj, defaults, namespace = ".", merger) {
  if (!isObject(defaults)) {
    return _defu(baseObj, {}, namespace, merger);
  }
  const obj = Object.assign({}, defaults);
  for (const key in baseObj) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const val = baseObj[key];
    if (val === null || val === void 0) {
      continue;
    }
    if (merger && merger(obj, key, val, namespace)) {
      continue;
    }
    if (Array.isArray(val) && Array.isArray(obj[key])) {
      obj[key] = val.concat(obj[key]);
    } else if (isObject(val) && isObject(obj[key])) {
      obj[key] = _defu(val, obj[key], (namespace ? `${namespace}.` : "") + key.toString(), merger);
    } else {
      obj[key] = val;
    }
  }
  return obj;
}
function createDefu(merger) {
  return (...args) => args.reduce((p, c) => _defu(p, c, "", merger), {});
}
const defu = createDefu();
const _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    vue_cjs_prod.watchEffect(() => {
      head.updateDOM();
    });
  });
  const titleTemplate = vue_cjs_prod.ref();
  nuxtApp._useHead = (_meta) => {
    const meta2 = vue_cjs_prod.ref(_meta);
    if ("titleTemplate" in meta2.value) {
      titleTemplate.value = meta2.value.titleTemplate;
    }
    const headObj = vue_cjs_prod.computed(() => {
      const overrides = { meta: [] };
      if (titleTemplate.value && "title" in meta2.value) {
        overrides.title = typeof titleTemplate.value === "function" ? titleTemplate.value(meta2.value.title) : titleTemplate.value.replace(/%s/g, meta2.value.title);
      }
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => renderHeadToString(head);
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = vue_cjs_prod.defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const Link = vue_cjs_prod.defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = vue_cjs_prod.defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = vue_cjs_prod.defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = vue_cjs_prod.defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((meta2) => ({
    meta: [meta2]
  }))
});
const Style = vue_cjs_prod.defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = vue_cjs_prod.defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = vue_cjs_prod.defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = vue_cjs_prod.defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const metaConfig = { "globalMeta": { "charset": "utf-8", "viewport": "width=device-width, initial-scale=1", "meta": [{ "name": "mobile-web-app-capable", "content": "yes" }, { "name": "apple-mobile-web-app-capable", "content": "yes" }, { "name": "apple-mobile-web-app-status-bar-style", "content": "default" }, { "name": "apple-mobile-web-app-title", "content": "MEETOON" }, { "name": "author", "content": "MEETOON" }, { "name": "description", "content": "Web \u0111\u1ECDc truy\u1EC7n tranh online l\u1EDBn nh\u1EA5t \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt li\xEAn t\u1EE5c m\u1ED7i ng\xE0y - C\xF9ng tham gia \u0111\u1ECDc truy\u1EC7n v\xE0 th\u1EA3o lu\u1EADn v\u1EDBi h\u01A1n \u{1F49A}10 tri\u1EC7u th\xE0nh vi\xEAn t\u1EA1i MEETOON" }, { "name": "theme-color", "content": "#fff" }, { "property": "og:type", "content": "website" }, { "property": "og:url", "content": "https://meetoon.co" }, { "property": "og:title", "content": "MEETOON" }, { "property": "og:site_name", "content": "MEETOON" }, { "property": "og:description", "content": "Web \u0111\u1ECDc truy\u1EC7n tranh online l\u1EDBn nh\u1EA5t \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt li\xEAn t\u1EE5c m\u1ED7i ng\xE0y - C\xF9ng tham gia \u0111\u1ECDc truy\u1EC7n v\xE0 th\u1EA3o lu\u1EADn v\u1EDBi h\u01A1n \u{1F49A}10 tri\u1EC7u th\xE0nh vi\xEAn t\u1EA1i MEETOON" }, { "property": "og:image", "content": "https://meetoon.co/assets/icons/512x512.maskable.af090742.png" }, { "property": "og:image:width", "content": 512 }, { "property": "og:image:height", "content": 512 }, { "property": "og:image:type", "content": "image/png" }, { "name": "twitter:card", "content": "MEETOON" }, { "name": "twitter:site", "content": "MEETOON" }, { "name": "twitter:creator", "content": "MEETOON" }], "link": [{ "href": "/assets/splash/640x1136.af090742.png", "media": "(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/750x1334.af090742.png", "media": "(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/828x1792.af090742.png", "media": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1125x2436.af090742.png", "media": "(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1170x2532.af090742.png", "media": "(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1242x2208.af090742.png", "media": "(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1242x2688.af090742.png", "media": "(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1284x2778.af090742.png", "media": "(device-width: 642px) and (device-height: 1389px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1536x2048.af090742.png", "media": "(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1620x2160.af090742.png", "media": "(device-width: 810px) and (device-height: 1080px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1668x2224.af090742.png", "media": "(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1668x2388.af090742.png", "media": "(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1136x640.af090742.png", "media": "(device-width: 568px) and (device-height: 320px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1334x750.af090742.png", "media": "(device-width: 667px) and (device-height: 375px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/1792x828.af090742.png", "media": "(device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2048x1536.af090742.png", "media": "(device-width: 1024px) and (device-height: 768px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2160x1620.af090742.png", "media": "(device-width: 1080px) and (device-height: 810px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2208x1242.af090742.png", "media": "(device-width: 736px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2224x1668.af090742.png", "media": "(device-width: 1112px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2388x1668.af090742.png", "media": "(device-width: 1194px) and (device-height: 834px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2436x1125.af090742.png", "media": "(device-width: 812px) and (device-height: 375px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2532x1170.af090742.png", "media": "(device-width: 844px) and (device-height: 390px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2688x1242.af090742.png", "media": "(device-width: 896px) and (device-height: 414px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2732x2048.af090742.png", "media": "(device-width: 1366px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "href": "/assets/splash/2778x1284.af090742.png", "media": "(device-width: 926px) and (device-height: 428px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)", "rel": "apple-touch-startup-image" }, { "rel": "shortcut icon", "href": "/assets/icons/64x64.af090742.png" }, { "rel": "apple-touch-icon", "href": "/assets/icons/512x512.maskable.af090742.png", "sizes": "512x512" }, { "rel": "manifest", "href": "/manifest.579c8d44.json" }], "style": [], "script": [{ "children": "if ('serviceWorker' in navigator) {\n  window.addEventListener('load', () => navigator.serviceWorker.register('/sw.js'))\n}" }], "title": "MEETOON", "htmlAttrs": { "lang": "en" } } };
const metaMixin = {
  created() {
    const instance = vue_cjs_prod.getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? vue_cjs_prod.computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47head_47runtime_47plugin = defineNuxtPlugin((nuxtApp) => {
  useHead(vue_cjs_prod.markRaw({ title: "", ...metaConfig.globalMeta }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => m.components.default === routeProps.Component.type);
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = {
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
};
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? vue_cjs_prod.h(component, props === true ? {} : props, slots) : vue_cjs_prod.h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = vue_cjs_prod.defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = vue_cjs_prod.inject(isNestedKey, false);
    vue_cjs_prod.provide(isNestedKey, true);
    return () => {
      return vue_cjs_prod.h(vueRouter_prod.RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a;
          return routeProps.Component && _wrapIf(vue_cjs_prod.Transition, (_a = routeProps.route.meta.pageTransition) != null ? _a : defaultPageTransition, wrapInKeepAlive(routeProps.route.meta.keepalive, isNested && nuxtApp.isHydrating ? vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) : vue_cjs_prod.h(vue_cjs_prod.Suspense, {
            onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
            onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
          }, { default: () => vue_cjs_prod.h(routeProps.Component, { key: generateRouteKey(props.pageKey, routeProps) }) }))).default();
        }
      });
    };
  }
});
const defaultPageTransition = { name: "page", mode: "out-in" };
const _imports_0$6 = publicAssetsURL(`icons/header/icon-back-white.svg`);
const _imports_1$5 = publicAssetsURL(`icons/header/icon-search.svg`);
const _sfc_main$O = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "CateList",
  __ssrInlineRender: true,
  props: {
    categories: Array
  },
  setup(__props) {
    const route = useRoute();
    const params = route.params;
    const slug = vue_cjs_prod.ref(params.slug);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.categories, (cate) => {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          key: cate.slug,
          to: cate.router,
          class: [slug.value === cate.slug ? "text-red-500 border-red-500" : "text-gray-800", "flex items-center justify-center w-[110px] h-[50px] p-3 border-gray-200 rounded-2xl border text-xl text-center font-semibold mx-2 my-2"]
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(cate.label)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(cate.label), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$N = _sfc_main$O.setup;
_sfc_main$O.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/categorys/CateList.vue");
  return _sfc_setup$N ? _sfc_setup$N(props, ctx) : void 0;
};
const CateList = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$O
}, Symbol.toStringTag, { value: "Module" }));
const TRUYEN_TRANH_CHAPTER = "truyen-tranh-chapter";
const TRUYEN_TRANH = "truyen-tranh";
const DANH_MUC = "danh-muc";
const TRENDING = "trending";
const TAG = "tag";
const categories = [
  {
    label: "T\u1EA5t c\u1EA3 danh m\u1EE5c",
    slug: "all",
    router: `/${DANH_MUC}/all`
  },
  {
    label: "\u0110am m\u1EF9 b\xE1ch h\u1EE3p",
    slug: "dam-my-bach-hop",
    router: `/${DANH_MUC}/dam-my-bach-hop`
  },
  {
    label: "Ng\xF4n t\xECnh c\u1ED5 \u0111\u1EA1i",
    slug: "ngon-tinh-co-dai",
    router: `/${DANH_MUC}/ngon-tinh-co-dai`
  },
  {
    label: "Ng\xF4n t\xECnh hi\u1EC7n \u0111\u1EA1i",
    slug: "ngon-tinh-hien-dai",
    router: `/${DANH_MUC}/ngon-tinh-hien-dai`
  },
  {
    label: "N\u1EEF ch\u1EE7 xuy\xEAn kh\xF4ng",
    slug: "nu-chu-xuyen-khong",
    router: `/${DANH_MUC}/nu-chu-xuyen-khong`
  },
  {
    label: "H\xE0nh \u0111\u1ED9ng ph\u01B0u l\u01B0u",
    slug: "hanh-dong-phieu-luu",
    router: `/${DANH_MUC}/hanh-dong-phieu-luu`
  }
];
const comicTabs = {
  comic: "comic",
  chapter: "chapter",
  review: "review"
};
const COMIC_STATUS = {
  inprogress: "\u0110ang ra",
  complete: "Full"
};
const _sfc_main$N = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "SearchLoading",
  __ssrInlineRender: true,
  props: {
    className: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<svg${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: __props.className,
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        style: { "margin": "auto", "background": "none", "display": "block", "shape-rendering": "auto" },
        width: "200px",
        height: "200px",
        viewBox: "0 0 100 100",
        preserveAspectRatio: "xMidYMid"
      }, _attrs))}><circle cx="84" cy="50" r="10" fill="#cf05bf"><animate attributeName="r" repeatCount="indefinite" dur="0.4464285714285714s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate><animate attributeName="fill" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#831a19;#831a19;#831a19;#831a19;#831a19" begin="0s"></animate></circle><circle cx="16" cy="50" r="10" fill="#00d8a6"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate></circle><circle cx="50" cy="50" r="10" fill="blue"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"></animate></circle><circle cx="84" cy="50" r="10" fill="yellow"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"></animate></circle><circle cx="16" cy="50" r="10" fill="black"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"></animate></circle></svg>`);
    };
  }
});
const _sfc_setup$M = _sfc_main$N.setup;
_sfc_main$N.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/SearchLoading.vue");
  return _sfc_setup$M ? _sfc_setup$M(props, ctx) : void 0;
};
const SearchLoading = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$N
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy$8 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicItem;
}));
const _sfc_main$M = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const params = route.params;
    const slug = vue_cjs_prod.ref(params.slug);
    const loading = vue_cjs_prod.ref(false);
    const comics = useState("comics", "$qnsmZDKaGW");
    vue_cjs_prod.onMounted(async () => {
      loading.value = true;
      comics.value = await $fetch(`/api/danh-muc/${slug.value}`);
      loading.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LazyCategorysComicItem = __nuxt_component_1_lazy$8;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2 flex items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$6,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #Danh m\u1EE5c truy\u1EC7n </div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/tim-kiem",
        class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_1$5,
                alt: "search"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap p-4 bg-white">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$O, { categories: vue_cjs_prod.unref(categories) }, null, _parent));
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, { class: "w-[150px] h-[50px]" }, null, _parent));
      } else {
        _push(`<section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyCategorysComicItem, { comics: vue_cjs_prod.unref(comics) }, null, _parent));
        _push(`</section>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$L = _sfc_main$M.setup;
_sfc_main$M.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/danh-muc/[slug].vue");
  return _sfc_setup$L ? _sfc_setup$L(props, ctx) : void 0;
};
const meta$6 = void 0;
const layouts = {
  default: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return _default$1;
  })),
  manga: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return manga$1;
  })),
  menu: vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
    return menu$1;
  }))
};
const defaultLayoutTransition = { name: "layout", mode: "out-in" };
const __nuxt_component_0$1 = vue_cjs_prod.defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout2 = (_b = (_a = vue_cjs_prod.isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout2 && layout2 in layouts;
      return _wrapIf(vue_cjs_prod.Transition, hasLayout && ((_c = route.meta.layoutTransition) != null ? _c : defaultLayoutTransition), _wrapIf(layouts[layout2], hasLayout, context.slots)).default();
    };
  }
});
const layout = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_0$1
}, Symbol.toStringTag, { value: "Module" }));
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheHome;
}));
const meta$5 = void 0;
const __nuxt_component_1_lazy$7 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicItem;
}));
const _sfc_main$L = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const params = route.params;
    const slug = vue_cjs_prod.ref(params.slug);
    const loading = vue_cjs_prod.ref(false);
    const comics = useState("comics", "$gI1SRjfDR5");
    vue_cjs_prod.onMounted(async () => {
      loading.value = true;
      comics.value = await $fetch(`/api/tag/${slug.value}`);
      loading.value = false;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LazyCategorysComicItem = __nuxt_component_1_lazy$7;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2 flex items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$6,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #Danh m\u1EE5c truy\u1EC7n </div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/tim-kiem",
        class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_1$5,
                alt: "search"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap p-4 bg-white">`);
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, { class: "w-[150px] h-[50px]" }, null, _parent));
      } else {
        _push(`<section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyCategorysComicItem, { comics: vue_cjs_prod.unref(comics) }, null, _parent));
        _push(`</section>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$K = _sfc_main$L.setup;
_sfc_main$L.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tag/[slug].vue");
  return _sfc_setup$K ? _sfc_setup$K(props, ctx) : void 0;
};
const meta$4 = void 0;
function getFileExtension(url = "") {
  const extension = url.split(/[?#]/).shift().split("/").pop().split(".").pop();
  return extension;
}
function createMapper(map) {
  return (key) => {
    return key ? map[key] || key : map.missingValue;
  };
}
function createOperationsGenerator({ formatter, keyMap, joinWith = "/", valueMap } = {}) {
  if (!formatter) {
    formatter = (key, value) => `${key}=${value}`;
  }
  if (keyMap && typeof keyMap !== "function") {
    keyMap = createMapper(keyMap);
  }
  const map = valueMap || {};
  Object.keys(map).forEach((valueKey) => {
    if (typeof map[valueKey] !== "function") {
      map[valueKey] = createMapper(map[valueKey]);
    }
  });
  return (modifiers = {}) => {
    const operations = Object.entries(modifiers).filter(([_, value]) => typeof value !== "undefined").map(([key, value]) => {
      const mapper = map[key];
      if (typeof mapper === "function") {
        value = mapper(modifiers[key]);
      }
      key = typeof keyMap === "function" ? keyMap(key) : key;
      return formatter(key, value);
    });
    return operations.join(joinWith);
  };
}
function parseSize(input = "") {
  if (typeof input === "number") {
    return input;
  }
  if (typeof input === "string") {
    if (input.replace("px", "").match(/^\d+$/g)) {
      return parseInt(input, 10);
    }
  }
}
const imageMixin = {
  props: {
    src: { type: String, required: true },
    format: { type: String, default: void 0 },
    quality: { type: [Number, String], default: void 0 },
    background: { type: String, default: void 0 },
    fit: { type: String, default: void 0 },
    modifiers: { type: Object, default: void 0 },
    preset: { type: String, default: void 0 },
    provider: { type: String, default: void 0 },
    sizes: { type: [Object, String], default: void 0 },
    preload: { type: Boolean, default: void 0 },
    width: { type: [String, Number], default: void 0 },
    height: { type: [String, Number], default: void 0 },
    alt: { type: String, default: void 0 },
    referrerpolicy: { type: String, default: void 0 },
    usemap: { type: String, default: void 0 },
    longdesc: { type: String, default: void 0 },
    ismap: { type: Boolean, default: void 0 },
    crossorigin: { type: [Boolean, String], default: void 0, validator: (val) => ["anonymous", "use-credentials", "", true, false].includes(val) },
    loading: { type: String, default: void 0 },
    decoding: { type: String, default: void 0, validator: (val) => ["async", "auto", "sync"].includes(val) }
  },
  computed: {
    nImgAttrs() {
      return {
        width: parseSize(this.width),
        height: parseSize(this.height),
        alt: this.alt,
        referrerpolicy: this.referrerpolicy,
        usemap: this.usemap,
        longdesc: this.longdesc,
        ismap: this.ismap,
        crossorigin: this.crossorigin === true ? "anonymous" : this.crossorigin || void 0,
        loading: this.loading,
        decoding: this.decoding
      };
    },
    nModifiers() {
      return {
        ...this.modifiers,
        width: parseSize(this.width),
        height: parseSize(this.height),
        format: this.format,
        quality: this.quality,
        background: this.background,
        fit: this.fit
      };
    },
    nOptions() {
      return {
        provider: this.provider,
        preset: this.preset
      };
    }
  }
};
async function imageMeta$1(_ctx, url) {
  const meta2 = await _imageMeta(url).catch((err) => {
    console.error("Failed to get image meta for " + url, err + "");
    return {
      width: 0,
      height: 0,
      ratio: 0
    };
  });
  return meta2;
}
async function _imageMeta(url) {
  {
    const imageMeta2 = await Promise.resolve().then(function() {
      return index$3;
    }).then((r) => r.imageMeta);
    const data = await fetch(url).then((res) => res.buffer());
    const metadata = imageMeta2(data);
    if (!metadata) {
      throw new Error(`No metadata could be extracted from the image \`${url}\`.`);
    }
    const { width, height } = metadata;
    const meta2 = {
      width,
      height,
      ratio: width && height ? width / height : void 0
    };
    return meta2;
  }
}
function createImage(globalOptions) {
  const ctx = {
    options: globalOptions
  };
  const getImage2 = (input, options = {}) => {
    const image = resolveImage(ctx, input, options);
    return image;
  };
  const $img = (input, modifiers = {}, options = {}) => {
    return getImage2(input, {
      ...options,
      modifiers: defu(modifiers, options.modifiers || {})
    }).url;
  };
  for (const presetName in globalOptions.presets) {
    $img[presetName] = (source, modifiers, options) => $img(source, modifiers, { ...globalOptions.presets[presetName], ...options });
  }
  $img.options = globalOptions;
  $img.getImage = getImage2;
  $img.getMeta = (input, options) => getMeta(ctx, input, options);
  $img.getSizes = (input, options) => getSizes(ctx, input, options);
  ctx.$img = $img;
  return $img;
}
async function getMeta(ctx, input, options) {
  const image = resolveImage(ctx, input, { ...options });
  if (typeof image.getMeta === "function") {
    return await image.getMeta();
  } else {
    return await imageMeta$1(ctx, image.url);
  }
}
function resolveImage(ctx, input, options) {
  var _a, _b;
  if (typeof input !== "string" || input === "") {
    throw new TypeError(`input must be a string (received ${typeof input}: ${JSON.stringify(input)})`);
  }
  if (input.startsWith("data:")) {
    return {
      url: input
    };
  }
  const { provider, defaults } = getProvider(ctx, options.provider || ctx.options.provider);
  const preset = getPreset(ctx, options.preset);
  input = hasProtocol(input) ? input : withLeadingSlash(input);
  if (!provider.supportsAlias) {
    for (const base in ctx.options.alias) {
      if (input.startsWith(base)) {
        input = joinURL(ctx.options.alias[base], input.substr(base.length));
      }
    }
  }
  if (provider.validateDomains && hasProtocol(input)) {
    const inputHost = parseURL(input).host;
    if (!ctx.options.domains.find((d) => d === inputHost)) {
      return {
        url: input
      };
    }
  }
  const _options = defu(options, preset, defaults);
  _options.modifiers = { ..._options.modifiers };
  const expectedFormat = _options.modifiers.format;
  if ((_a = _options.modifiers) == null ? void 0 : _a.width) {
    _options.modifiers.width = parseSize(_options.modifiers.width);
  }
  if ((_b = _options.modifiers) == null ? void 0 : _b.height) {
    _options.modifiers.height = parseSize(_options.modifiers.height);
  }
  const image = provider.getImage(input, _options, ctx);
  image.format = image.format || expectedFormat || "";
  return image;
}
function getProvider(ctx, name) {
  const provider = ctx.options.providers[name];
  if (!provider) {
    throw new Error("Unknown provider: " + name);
  }
  return provider;
}
function getPreset(ctx, name) {
  if (!name) {
    return {};
  }
  if (!ctx.options.presets[name]) {
    throw new Error("Unknown preset: " + name);
  }
  return ctx.options.presets[name];
}
function getSizes(ctx, input, opts) {
  var _a, _b;
  const width = parseSize((_a = opts.modifiers) == null ? void 0 : _a.width);
  const height = parseSize((_b = opts.modifiers) == null ? void 0 : _b.height);
  const hwRatio = width && height ? height / width : 0;
  const variants = [];
  const sizes = {};
  if (typeof opts.sizes === "string") {
    for (const entry2 of opts.sizes.split(/[\s,]+/).filter((e) => e)) {
      const s = entry2.split(":");
      if (s.length !== 2) {
        continue;
      }
      sizes[s[0].trim()] = s[1].trim();
    }
  } else {
    Object.assign(sizes, opts.sizes);
  }
  for (const key in sizes) {
    const screenMaxWidth = ctx.options.screens && ctx.options.screens[key] || parseInt(key);
    let size = String(sizes[key]);
    const isFluid = size.endsWith("vw");
    if (!isFluid && /^\d+$/.test(size)) {
      size = size + "px";
    }
    if (!isFluid && !size.endsWith("px")) {
      continue;
    }
    let _cWidth = parseInt(size);
    if (!screenMaxWidth || !_cWidth) {
      continue;
    }
    if (isFluid) {
      _cWidth = Math.round(_cWidth / 100 * screenMaxWidth);
    }
    const _cHeight = hwRatio ? Math.round(_cWidth * hwRatio) : height;
    variants.push({
      width: _cWidth,
      size,
      screenMaxWidth,
      media: `(max-width: ${screenMaxWidth}px)`,
      src: ctx.$img(input, { ...opts.modifiers, width: _cWidth, height: _cHeight }, opts)
    });
  }
  variants.sort((v1, v2) => v1.screenMaxWidth - v2.screenMaxWidth);
  const defaultVar = variants[variants.length - 1];
  if (defaultVar) {
    defaultVar.media = "";
  }
  return {
    sizes: variants.map((v) => `${v.media ? v.media + " " : ""}${v.size}`).join(", "),
    srcset: variants.map((v) => `${v.src} ${v.width}w`).join(", "),
    src: defaultVar == null ? void 0 : defaultVar.src
  };
}
const _sfc_main$K = vue_cjs_prod.defineComponent({
  name: "NuxtImg",
  mixins: [imageMixin],
  props: {
    placeholder: { type: [Boolean, String, Number, Array], default: void 0 }
  },
  data() {
    return {
      placeholderLoaded: false
    };
  },
  head() {
    if (this.preload === true) {
      return {
        link: [
          {
            rel: "preload",
            as: "image",
            href: this.nSrc
          }
        ]
      };
    }
    return {};
  },
  computed: {
    nAttrs() {
      const attrs = this.nImgAttrs;
      if (this.sizes) {
        const { sizes, srcset } = this.nSizes;
        attrs.sizes = sizes;
        attrs.srcset = srcset;
      }
      return attrs;
    },
    nMainSrc() {
      return this.sizes ? this.nSizes.src : this.$img(this.src, this.nModifiers, this.nOptions);
    },
    nSizes() {
      return this.$img.getSizes(this.src, {
        ...this.nOptions,
        sizes: this.sizes,
        modifiers: {
          ...this.nModifiers,
          width: parseSize(this.width),
          height: parseSize(this.height)
        }
      });
    },
    nSrc() {
      return this.nPlaceholder ? this.nPlaceholder : this.nMainSrc;
    },
    nPlaceholder() {
      let placeholder = this.placeholder;
      if (placeholder === "") {
        placeholder = true;
      }
      if (!placeholder || this.placeholderLoaded) {
        return false;
      }
      if (typeof placeholder === "string") {
        return placeholder;
      }
      const size = Array.isArray(placeholder) ? placeholder : typeof placeholder === "number" ? [placeholder, placeholder] : [10, 10];
      return this.$img(this.src, {
        ...this.nModifiers,
        width: size[0],
        height: size[1],
        quality: size[2] || 50
      }, this.nOptions);
    }
  },
  mounted() {
    if (this.nPlaceholder) {
      const img = new Image();
      img.src = this.nMainSrc;
      img.onload = () => {
        this.$refs.img.src = this.nMainSrc;
        this.placeholderLoaded = true;
      };
    }
    if (process.static) {
      if (this.sizes) {
        this.nSizes;
      }
    }
  }
});
function _sfc_ssrRender$9(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ key: _ctx.nSrc }, _ctx.nAttrs, {
    ref: "img",
    src: _ctx.nSrc
  }, _attrs))}>`);
}
const _sfc_setup$J = _sfc_main$K.setup;
_sfc_main$K.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image-edge/dist/runtime/components/nuxt-img.vue");
  return _sfc_setup$J ? _sfc_setup$J(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$K, [["ssrRender", _sfc_ssrRender$9]]);
const nuxtImg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_2$1
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$J = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "MeeToonImg",
  __ssrInlineRender: true,
  props: {
    src: {
      type: String,
      default: ""
    },
    fil: String,
    width: Number,
    height: Number,
    className: String,
    alt: String,
    sizes: {
      type: String,
      default: "xs:100vw 2xs:100vw sm:100vw"
    },
    modifiers: Object,
    preset: String,
    quality: {
      type: Number,
      default: 80
    },
    format: {
      type: String,
      default: "webp"
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_nuxt_img = __nuxt_component_2$1;
      _push(serverRenderer.exports.ssrRenderComponent(_component_nuxt_img, vue_cjs_prod.mergeProps({
        width: __props.width,
        height: __props.height,
        quality: __props.quality,
        format: __props.format,
        preset: __props.preset,
        modifiers: __props.modifiers,
        sizes: __props.sizes,
        fil: __props.fil,
        class: __props.className,
        alt: __props.alt,
        provider: "imageengine",
        src: __props.src
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$I = _sfc_main$J.setup;
_sfc_main$J.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/MeeToonImg.vue");
  return _sfc_setup$I ? _sfc_setup$I(props, ctx) : void 0;
};
const MeeToonImg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$J
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$5 = publicAssetsURL(`icons/searchPage/icon-back.svg`);
const _imports_1$4 = publicAssetsURL(`icons/searchPage/icon-search.svg`);
const _imports_2$4 = publicAssetsURL(`icons/searchPage/icon-close.svg`);
const _imports_2$3 = publicAssetsURL(`icons/searchPage/icon-view-count.svg`);
const _imports_3$2 = publicAssetsURL(`icons/searchPage/icon-star.svg`);
function useNavigatorComicPreview(slug, _id) {
  return `/${TRUYEN_TRANH}/${slug}/${_id}`;
}
const convertUnit = (unit) => {
  const pUnit = parseFloat(unit);
  if (pUnit > 1e6)
    return `${(pUnit / 1e6).toFixed(1)} M`;
  else if (pUnit > 1e3)
    return `${(pUnit / 1e3).toFixed(1)} K`;
  else
    return `${pUnit}`;
};
const _sfc_main$I = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const refInput = vue_cjs_prod.ref("");
    const debounced = useDebounce(refInput, 200);
    const searchData = vue_cjs_prod.ref([]);
    const loading = vue_cjs_prod.ref(true);
    const comicNameSuggestion = [
      "L\u1EE5c Cung Phong Hoa",
      "Daddy c\u1EE7a con \u0111\xE2u",
      "C\xF4 V\u1EE3 C\xE2m",
      "C\xF4 v\u1EE3 \u0111\xE1ng y\xEAu",
      "luy\u1EBFn ph\xE2n c\xF4ng l\u01B0\u1EE3c",
      "th\u1EA1ch thi\u1EBFu hi\u1EC7p",
      "boss x\u1EA5u xa",
      "t\u1ED5ng t\xE0i",
      "tr\xF3i ch\u1EB7t tr\xE1i tim",
      "long tr\xF9 k\u1EF7"
    ];
    vue_cjs_prod.watchEffect(async () => {
      loading.value = true;
      try {
        searchData.value = await $fetch("/api/comic/search", {
          params: {
            q: debounced.value
          }
        });
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_CommonSearchLoading = _sfc_main$N;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh] w-full" }, _attrs))}><div class="flex justify-between">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$5)} alt=""${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$5,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex w-[90%] relative mx-2 my-2"><div class="absolute top-1 left-1"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt=""></div><input${serverRenderer.exports.ssrRenderAttr("value", refInput.value)} class="search-input" placeholder="Nh\u1EADp n\u1ED9i dung t\xECm ki\u1EBFm...">`);
      if (refInput.value.length > 0) {
        _push(`<img class="w-8 h-8 text-primary-gray absolute right-5 top-2.5"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><section class="bg-white h-[calc(100vh_-_44px)] overflow-auto scrollbar-hide"><h2 class="font-bold text-2xl text-black p-4"> #T\u1EEB kho\xE1 Hot </h2><div class="flex flex-wrap px-5"><!--[-->`);
      serverRenderer.exports.ssrRenderList(comicNameSuggestion, (comicName) => {
        _push(`<span class="search-hotkey mx-4 my-2">${serverRenderer.exports.ssrInterpolate(comicName)}</span>`);
      });
      _push(`<!--]--></div><h2 class="font-bold text-2xl text-black p-4"> Truy\u1EC7n tranh (${serverRenderer.exports.ssrInterpolate(searchData.value.length ? searchData.value.length : 0)}) </h2>`);
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_CommonSearchLoading, { class: "w-16 h-16" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (searchData.value && searchData.value.length > 0 && !loading.value) {
        _push(`<div class="result grid grid-cols-1 md:grid-cols-2 overflow-y-scroll scrollbar-hide"><!--[-->`);
        serverRenderer.exports.ssrRenderList(searchData.value, (comic) => {
          _push(`<div class="p-4 col-span-1">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            class: "flex items-center",
            to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="relative"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
                  width: 75,
                  height: 100,
                  class: "rounded-xl w-[75px] h-[100px] object-cover",
                  src: comic.verticalLogo
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "width": "calc(100% - 102px)" })}"${_scopeId}><h3 class="text-xl font-semibold line-clamp-1 mb-1"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                  to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
                }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer.exports.ssrInterpolate(comic.comicName)}`);
                    } else {
                      return [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><span class="line-clamp-2 text-primary-gray text-base"${_scopeId}>${serverRenderer.exports.ssrInterpolate(comic.description)}</span><p class="text-background my-2 text-base"${_scopeId}> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comic.newestChapter)}</p><div class="flex items-center"${_scopeId}><div class="text-primary-gray mb-3 text-base flex items-center mr-4"${_scopeId}><img class="mr-1 w-6"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$3)} alt=""${_scopeId}><span${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(comic.viewCount))}</span></div><div class="text-primary-gray mb-3 text-base flex items-center"${_scopeId}><img class="mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$2)} alt=""${_scopeId}><span${_scopeId}> (${serverRenderer.exports.ssrInterpolate(comic.reviewCount)}) </span></div></div></div>`);
              } else {
                return [
                  vue_cjs_prod.createVNode("div", { class: "relative" }, [
                    vue_cjs_prod.createVNode(_component_SharedMeeToonImg, {
                      width: 75,
                      height: 100,
                      class: "rounded-xl w-[75px] h-[100px] object-cover",
                      src: comic.verticalLogo
                    }, null, 8, ["src"])
                  ]),
                  vue_cjs_prod.createVNode("div", {
                    class: "px-5",
                    style: { "width": "calc(100% - 102px)" }
                  }, [
                    vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1 mb-1" }, [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    vue_cjs_prod.createVNode("span", { class: "line-clamp-2 text-primary-gray text-base" }, vue_cjs_prod.toDisplayString(comic.description), 1),
                    vue_cjs_prod.createVNode("p", { class: "text-background my-2 text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(comic.newestChapter), 1),
                    vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-primary-gray mb-3 text-base flex items-center mr-4" }, [
                        vue_cjs_prod.createVNode("img", {
                          class: "mr-1 w-6",
                          src: _imports_2$3,
                          alt: ""
                        }),
                        vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(comic.viewCount)), 1)
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-primary-gray mb-3 text-base flex items-center" }, [
                        vue_cjs_prod.createVNode("img", {
                          class: "mr-1",
                          src: _imports_3$2,
                          alt: ""
                        }),
                        vue_cjs_prod.createVNode("span", null, " (" + vue_cjs_prod.toDisplayString(comic.reviewCount) + ") ", 1)
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup$H = _sfc_main$I.setup;
_sfc_main$I.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tim-kiem/index.vue");
  return _sfc_setup$H ? _sfc_setup$H(props, ctx) : void 0;
};
const meta$3 = void 0;
const _sfc_main$H = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "trending",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: comics, pending } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch("/api/trending", "$mbKLVHtiVa")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      if (vue_cjs_prod.unref(pending)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, vue_cjs_prod.mergeProps({ class: "w-[150px] h-[50px]" }, _attrs), null, _parent));
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mx-2 my-2 flex items-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
            } else {
              return [
                vue_cjs_prod.createVNode("img", {
                  src: _imports_0$6,
                  alt: "back"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #C\xF3 ch\u1EAFc l\xE0 HOT \u0111\xE2y </div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
            } else {
              return [
                vue_cjs_prod.createVNode("img", {
                  src: _imports_1$5,
                  alt: "search"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex flex-wrap bg-white"><section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(comics), (comic, id) => {
          _push(`<div class="p-4 col-span-1 flex items-center">`);
          if (id === 0) {
            _push(`<div class="text-4xl px-4 text-red-500">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id === 1) {
            _push(`<div class="text-4xl px-4 text-red-400">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id === 2) {
            _push(`<div class="text-4xl px-4 text-red-300">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id > 2) {
            _push(`<div class="text-4xl px-4">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center"><div class="relative">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
            width: 75,
            height: 100,
            class: "rounded-xl w-[75px] h-[100px] object-cover",
            src: comic.verticalLogo
          }, null, _parent));
          _push(`</div><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "width": "calc(100% - 102px)" })}"><h3 class="text-xl font-semibold line-clamp-1 mb-1">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(comic.comicName)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3><span class="line-clamp-2 text-primary-gray text-base">${serverRenderer.exports.ssrInterpolate(comic.description)}</span><p class="text-background my-2 text-base"> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comic.newestChapter)}</p><div class="flex items-center"><div class="text-primary-gray mb-3 text-base flex items-center mr-4"><img class="mr-1 w-6"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$3)} alt=""><span>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(comic.viewCount))}</span></div><div class="text-primary-gray mb-3 text-base flex items-center"><img class="mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$2)} alt=""><span> (${serverRenderer.exports.ssrInterpolate(comic.reviewCount)}) </span></div></div></div></div></div>`);
        });
        _push(`<!--]--></section></div></div>`);
      }
    };
  }
});
const _sfc_setup$G = _sfc_main$H.setup;
_sfc_main$H.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trending.vue");
  return _sfc_setup$G ? _sfc_setup$G(props, ctx) : void 0;
};
const meta$2 = void 0;
const _sfc_main$G = {
  __name: "PageLoading",
  __ssrInlineRender: true,
  props: {
    className: {
      type: String,
      default: ""
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "flex w-full bg-black h-full fixed z-50" }, _attrs))}><svg class="${serverRenderer.exports.ssrRenderClass([__props.className, "w-[65px] lg:w-[85px]"])}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="${serverRenderer.exports.ssrRenderStyle({ "margin": "auto", "background": "none", "display": "block", "shape-rendering": "auto" })}" width="200px" height="200px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><circle cx="84" cy="50" r="10" fill="#3affff"><animate attributeName="r" repeatCount="indefinite" dur="0.4464285714285714s" calcMode="spline" keyTimes="0;1" values="10;0" keySplines="0 0.5 0.5 1" begin="0s"></animate><animate attributeName="fill" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="discrete" keyTimes="0;0.25;0.5;0.75;1" values="#831a19;#831a19;#831a19;#831a19;#831a19" begin="0s"></animate></circle><circle cx="16" cy="50" r="10" fill="#831a19"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="0s"></animate></circle><circle cx="50" cy="50" r="10" fill="#52ff3a"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.4464285714285714s"></animate></circle><circle cx="84" cy="50" r="10" fill="#de3aff"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-0.8928571428571428s"></animate></circle><circle cx="16" cy="50" r="10" fill="#ceb109"><animate attributeName="r" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="0;0;10;10;10" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"></animate><animate attributeName="cx" repeatCount="indefinite" dur="1.7857142857142856s" calcMode="spline" keyTimes="0;0.25;0.5;0.75;1" values="16;16;16;50;84" keySplines="0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1;0 0.5 0.5 1" begin="-1.3392857142857142s"></animate></circle></svg></div>`);
    };
  }
};
const _sfc_setup$F = _sfc_main$G.setup;
_sfc_main$G.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/common/PageLoading.vue");
  return _sfc_setup$F ? _sfc_setup$F(props, ctx) : void 0;
};
const PageLoading = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$G
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_2 = vue_cjs_prod.defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = vue_cjs_prod.ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return vue_cjs_prod.createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
function createClientOnly(component) {
  return vue_cjs_prod.defineComponent({
    name: "ClientOnlyWrapper",
    inheritAttrs: false,
    setup(_props, { attrs, slots }) {
      const mounted = vue_cjs_prod.ref(false);
      return () => {
        if (mounted.value) {
          return vue_cjs_prod.h(component, attrs, slots);
        }
        return vue_cjs_prod.h("div", { class: attrs.class, style: attrs.style });
      };
    }
  });
}
const clientOnly = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_2,
  createClientOnly
}, Symbol.toStringTag, { value: "Module" }));
function render$4(_ctx, _cache) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$3(_ctx, _cache) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$2(_ctx, _cache) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render$1(_ctx, _cache) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd"
    }),
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z",
      "clip-rule": "evenodd"
    })
  ]);
}
function render(_ctx, _cache) {
  return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true"
  }, [
    vue_cjs_prod.createVNode("path", {
      "fill-rule": "evenodd",
      d: "M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z",
      "clip-rule": "evenodd"
    })
  ]);
}
const __nuxt_component_1_lazy$6 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtLink;
}));
const __nuxt_component_3_lazy$2 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ChapterImg;
}));
const __nuxt_component_4_lazy$2 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ReadMangaFooter;
}));
const _sfc_main$F = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const params = route.params;
    const chapterSlug = vue_cjs_prod.ref(params.chapter_slug);
    const chapters = useState("chapters", "$wYjDTimCEV");
    const {
      pending,
      data: readPage,
      refresh
    } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useLazyFetch("/api/read-comic", {
      params: {
        chapter_slug: chapterSlug.value
      }
    }, "$gOkpZ0RpOb")), __temp = await __temp, __restore(), __temp);
    vue_cjs_prod.onMounted(async () => {
      chapters.value = await $fetch("/api/chapters", {
        params: {
          comic_slug: readPage.value.chapter.comicSlug
        }
      });
    });
    vue_cjs_prod.watchEffect(() => {
      refresh();
    });
    const handleChapter = async (action) => {
      if (action === "next") {
        const nextC = readPage.value.chapter.chapterOrderIndex + 1;
        const next = chapters.value.find((chap) => chap.chapterOrderIndex === nextC);
        navigateTo({
          path: `/${TRUYEN_TRANH_CHAPTER}/${next.slug}/${next._id}`,
          replace: true
        });
      }
      if (action === "prev") {
        const prevC = readPage.value.chapter.chapterOrderIndex - 1;
        const prev = chapters.value.find((chap) => chap.chapterOrderIndex === prevC);
        navigateTo({
          path: `/${TRUYEN_TRANH_CHAPTER}/${prev.slug}/${prev._id}`,
          replace: true
        });
      }
    };
    const handleNextProcess = (action) => {
      handleChapter(action);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_CommonPageLoading = _sfc_main$G;
      const _component_Head = vue_cjs_prod.resolveComponent("Head");
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      const _component_LazyNuxtLink = __nuxt_component_1_lazy$6;
      const _component_ClientOnly = __nuxt_component_2;
      const _component_LazyMangaChapterImg = __nuxt_component_3_lazy$2;
      const _component_LazyMangaReadMangaFooter = __nuxt_component_4_lazy$2;
      if (vue_cjs_prod.unref(pending)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_CommonPageLoading, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
          ref: "scrollComponent",
          class: "flex h-fit min-h-screen flex-col bg-black scrollbar-hide"
        }, _attrs))}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_Head, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
                default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c, _d;
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate((_a2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a2.chapterName)} | Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate((_b2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b2.chapterNum)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString((_c = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _c.chapterName) + " | Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString((_d = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _d.chapterNum), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_component_Title, null, {
                  default: vue_cjs_prod.withCtx(() => {
                    var _a2, _b2;
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString((_a2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a2.chapterName) + " | Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString((_b2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b2.chapterNum), 1)
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative flex h-fit flex-1 text-white"><div class="h-fit min-h-screen w-full bg-black"><div class="fixed top-0 left-0 z-[999] h-[60px] w-full"><div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-accent-1"><div class="flex h-full w-fit items-center justify-evenly gap-4 px-4 md:space-x-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyNuxtLink, {
          to: vue_cjs_prod.unref(useNavigatorComicPreview)(vue_cjs_prod.unref(readPage).chapter.comicSlug, vue_cjs_prod.unref(readPage).chapter.comicId),
          class: "flex"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$3), { class: "h-9 w-9" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                vue_cjs_prod.createVNode("button", null, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(render$3), { class: "h-9 w-9" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]">${serverRenderer.exports.ssrInterpolate((_a = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a.chapterName)}</h1><button class="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"> Chapter: ${serverRenderer.exports.ssrInterpolate((_b = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b.chapterNum)}</button><div class="absolute-center h-full w-fit gap-4 md:mx-6"><button data-id="prev" class="rounded-xl-lg bg-highlight p-4 md:p-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$4), { class: "h-7 w-7" }, null, _parent));
        _push(`</button><button data-id="next" class="rounded-xl-lg bg-highlight p-4 md:p-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$2), { class: "w-8 h-7" }, null, _parent));
        _push(`</button></div></div></div></div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_LazyMangaChapterImg, {
                pages: vue_cjs_prod.unref(readPage).pages
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_component_LazyMangaChapterImg, {
                  pages: vue_cjs_prod.unref(readPage).pages
                }, null, 8, ["pages"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyMangaReadMangaFooter, { onNextProcess: handleNextProcess }, null, _parent));
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$E = _sfc_main$F.setup;
_sfc_main$F.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/truyen-tranh-chapter/[chapter_slug]/[_id].vue");
  return _sfc_setup$E ? _sfc_setup$E(props, ctx) : void 0;
};
const meta$1 = void 0;
const _imports_0$4 = publicAssetsURL(`icons/comicPage/icon-back.svg`);
const _imports_1$3 = publicAssetsURL(`icons/comicPage/icon-report.svg`);
const _imports_2$2 = publicAssetsURL(`icons/comicPage/icon-view-count.svg`);
const _imports_3$1 = publicAssetsURL(`icons/comicPage/icon-follow-count.svg`);
const _imports_4$1 = publicAssetsURL(`icons/comicPage/icon-comment-count.svg`);
const _imports_5 = publicAssetsURL(`icons/comicPage/icon-star.svg`);
const _imports_6 = publicAssetsURL(`icons/comicPage/icon-share.svg`);
const _imports_7 = publicAssetsURL(`icons/comicPage/icon-follow.svg`);
const _imports_0$3 = publicAssetsURL(`icons/chapterItem/icon-view.svg`);
const _imports_1$2 = publicAssetsURL(`icons/chapterItem/icon-like.svg`);
const _imports_2$1 = publicAssetsURL(`icons/chapterItem/icon-comment.svg`);
const _sfc_main$E = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ComicChapterTab",
  __ssrInlineRender: true,
  props: {
    chapters: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.chapters, (chapter) => {
        _push(`<div class="relative bg-accent-4" style="${serverRenderer.exports.ssrRenderStyle({ "border-bottom": "1px solid rgb(27, 28, 35)" })}"><div class="px-5 py-5 cursor-pointe"><a><h3 class="text-2xl mb-4"><b> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(chapter.chapterNum)}</b></h3><div class="flex"><p class="mr-8 text-primary-gray text-2xl flex items-center">${serverRenderer.exports.ssrInterpolate(new Date(chapter.createdAt).toLocaleDateString())}</p><div class="mr-[17px] flex items-center justify-center text-2xl"><img class="mr-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$3)} alt="view"><span class="text-primary-gray">${serverRenderer.exports.ssrInterpolate(chapter.totalView ? vue_cjs_prod.unref(convertUnit)(chapter.totalView) : 0)}</span></div><div class="mr-8 flex items-center justify-center text-2xl"><img class="mr-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$2)} alt="like"><span class="text-primary-gray">${serverRenderer.exports.ssrInterpolate(chapter.totalLike ? vue_cjs_prod.unref(convertUnit)(chapter.totalLike) : 0)}</span></div><div class="flex items-center justify-center mr-4 text-2xl"><img class="mr-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$1)} alt="comment"><span class="text-primary-gray">${serverRenderer.exports.ssrInterpolate(chapter.totalComment ? vue_cjs_prod.unref(convertUnit)(chapter.totalComment) : 0)}</span></div></div></a></div></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$D = _sfc_main$E.setup;
_sfc_main$E.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComicChapterTab.vue");
  return _sfc_setup$D ? _sfc_setup$D(props, ctx) : void 0;
};
const ComicChapterTab = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$E
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$D = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ComicsRelated",
  __ssrInlineRender: true,
  props: {
    tags: Array
  },
  setup(__props) {
    const comicsRelated = useState("comicsRelated", "$rCUI9FGfVm");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "px-5 py-5 mb-14",
        style: { "border-top": "3px solid rgb(27, 28, 35)" }
      }, _attrs))}><div class="flex items-center justify-between"><h2 class="text-white font-bold text-3xl mb-7"> \u0110\u1EC1 xu\u1EA5t li\xEAn quan </h2></div><div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide min-h-[100px]"><!--[-->`);
      serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(comicsRelated), (comicRelated) => {
        _push(`<div class="inline-block w-[105px] mr-6"><div class="relative"><div class="absolute top-[-3px] left-0 w-full z-10"><span class="inline-block bg-primary px-3 rounded-xl bg-primary font-bold text-white text-xl">${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(COMIC_STATUS)[comicRelated.status])}</span></div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: vue_cjs_prod.unref(useNavigatorComicPreview)(comicRelated.slug, comicRelated._id),
          title: comicRelated.comicName
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
                width: 105,
                "lazy-src": comicRelated.verticalLogo,
                src: comicRelated.verticalLogo
              }, null, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", null, [
                  vue_cjs_prod.createVNode(_component_SharedMeeToonImg, {
                    width: 105,
                    "lazy-src": comicRelated.verticalLogo,
                    src: comicRelated.verticalLogo
                  }, null, 8, ["lazy-src", "src"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><h3 class="line-clamp-1">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          class: "text-white font-bold text-xl",
          title: comicRelated.comicName,
          to: vue_cjs_prod.unref(useNavigatorComicPreview)(comicRelated.slug, comicRelated._id)
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${serverRenderer.exports.ssrInterpolate(comicRelated.comicName)}`);
            } else {
              return [
                vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comicRelated.comicName), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</h3><p class="text-gray-100 text-base"> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comicRelated.newestChapter)}</p></div>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$C = _sfc_main$D.setup;
_sfc_main$D.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComicsRelated.vue");
  return _sfc_setup$C ? _sfc_setup$C(props, ctx) : void 0;
};
const ComicsRelated = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$D
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$C = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ChapterRepresent",
  __ssrInlineRender: true,
  props: {
    representData: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "px-5 overflow-auto whitespace-nowrap scrollbar-hide",
        style: { "display": "-webkit-box" }
      }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.representData, (chapter) => {
        _push(`<div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
          class: "h-[40px] w-[100px] inline-block object-cover border-[1px] border-white mr-4 rounded-xl",
          lazy: true,
          src: chapter.imageRepresent
        }, null, _parent));
        _push(`<p class="text-white text-base mt-2"> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(chapter.chapterNum)}</p></div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$B = _sfc_main$C.setup;
_sfc_main$C.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ChapterRepresent.vue");
  return _sfc_setup$B ? _sfc_setup$B(props, ctx) : void 0;
};
const ChapterRepresent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$C
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$B = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ComicTab",
  __ssrInlineRender: true,
  props: {
    comic: Object
  },
  setup(__props) {
    const { comic } = __props;
    const tags = vue_cjs_prod.computed(() => {
      return comic.tags.map((tag) => tag.slug);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "relative bg-dark-gray" }, _attrs))}><div class="px-6 h-auto relative overflow-hidden pt-6"><div class="content mb-4"><p class="text-xl text-white whitespace-pre-line">${serverRenderer.exports.ssrInterpolate((_a = __props.comic) == null ? void 0 : _a.description)}</p></div></div><div class="scrollbar-hide overflow-auto whitespace-nowrap p-4" style="${serverRenderer.exports.ssrRenderStyle({ "display": "-webkit-box" })}"><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.comic.tags, (tag) => {
        _push(`<a class="inline-block py-1 px-4 mr-2 text-xl rounded-xl bg-accent-5" href="#"># ${serverRenderer.exports.ssrInterpolate(tag.name)}</a>`);
      });
      _push(`<!--]--></div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$C, {
        "represent-data": __props.comic.chaptersRepresentData
      }, null, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$D, { tags: vue_cjs_prod.unref(tags) }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$A = _sfc_main$B.setup;
_sfc_main$B.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ComicTab.vue");
  return _sfc_setup$A ? _sfc_setup$A(props, ctx) : void 0;
};
const ComicTab = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$B
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$A = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const params = route.params;
    const slug = vue_cjs_prod.ref(params.slug);
    const _id = vue_cjs_prod.ref(params._id);
    const tab = vue_cjs_prod.ref("comic");
    const chapters = useState("chapters", "$2RYQRP4HCl");
    const runtimeConfig = useRuntimeConfig();
    const {
      data: comic,
      pending,
      refresh
    } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch(`/api/comic/${slug.value}/${_id.value}`, "$VDMEbSW6PX")), __temp = await __temp, __restore(), __temp);
    vue_cjs_prod.onMounted(async () => {
      if (!comic.value)
        return;
      chapters.value = await $fetch("/api/chapters", {
        params: {
          comic_slug: comic.value.slug
        }
      });
    });
    vue_cjs_prod.watchEffect(async () => {
      await refresh();
    });
    const comicTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.comic;
    });
    const chapterTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.chapter;
    });
    const reviewTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.review;
    });
    const backgroundImage = (image) => {
      return {
        backgroundImage: `url(${runtimeConfig.public.PUBLIC_IMAGE_CDN}${image})`
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<section${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-fc1193c2><div style="${serverRenderer.exports.ssrRenderStyle(backgroundImage(vue_cjs_prod.unref(comic).squareCover))}" class="flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover" data-v-fc1193c2>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "ml-4"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$4)} alt="back" data-v-fc1193c2${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$4,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4" data-v-fc1193c2><img class="mr-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$3)} alt="report" data-v-fc1193c2><span class="text-white text-2xl" data-v-fc1193c2>B\xE1o c\xE1o</span></div></div><div class="fixed top-0 w-full max-w-[768px]" data-v-fc1193c2>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
        class: "relative w-full",
        src: vue_cjs_prod.unref(comic).squareCover
      }, null, _parent));
      _push(`</div><div class="relative mt-[150px]" data-v-fc1193c2><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "background": "linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)" })}" data-v-fc1193c2><div class="bg-contain p-6 bg-comic flex items-center justify-between rounded-xl" style="${serverRenderer.exports.ssrRenderStyle({ "background-image": "url(/icons/comicPage/backgroundInfo.png)" })}" data-v-fc1193c2><div class="left" data-v-fc1193c2><div class="ComicPage__ComicName-sc-1l8m850-8 jYlKUE" data-v-fc1193c2><h1 data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate((_a = vue_cjs_prod.unref(comic)) == null ? void 0 : _a.comicName)}</h1></div><div class="flex flex-wrap" data-v-fc1193c2><div class="my-4 flex items-center justify-center rounded-xl text-primary text-base border-[1px] border-red-700 h-[20px] w-[80px]" data-v-fc1193c2> Ho\xE0n t\u1EA5t </div><div class="mx-4 my-4 flex items-center text-gray-50 text-base" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$2)} alt="view count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).viewCount))}</span></div><div class="mx-4 my-4 flex items-center text-gray-50 text-base" data-v-fc1193c2><img class="w-[18px] h-[18px]"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$1)} alt="follow count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).followingCount))}</span></div><div class="flex items-center text-base text-gray-50" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="comment count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).totalComment))}</span></div></div></div><div class="right" data-v-fc1193c2><div class="w-[80px] text-center cursor-pointer" data-v-fc1193c2><p class="text-yellow-400 text-4xl" data-v-fc1193c2> 5 </p><div class="flex items-center justify-center" data-v-fc1193c2><!--[-->`);
      serverRenderer.exports.ssrRenderList(5, (i) => {
        _push(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_5)} alt="rating" data-v-fc1193c2>`);
      });
      _push(`<!--]--></div><div data-v-fc1193c2><span class="text-white text-xl" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(comic).reviewCount)} \u0110\xE1nh gi\xE1</span></div></div></div></div></div></div><div class="bg-footer-comic_page px-3 fixed bottom-0 w-full h-[52px] max-w-[768px] flex items-center z-50" data-v-fc1193c2><div class="cursor-pointer" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_6)} alt="Chia s\u1EBB" data-v-fc1193c2></div><div class="ml-6 cursor-pointer" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_7)} alt="Theo d\xF5i" data-v-fc1193c2></div><a class="comic-read" data-v-fc1193c2> B\u1EAFt \u0111\u1EA7u \u0111\u1ECDc </a></div><div class="relative bg-accent-4" data-v-fc1193c2><div class="whitespace-nowrap overflow-x-auto" style="${serverRenderer.exports.ssrRenderStyle({ "border-bottom": "1px solid rgb(27, 28, 35)" })}" data-v-fc1193c2><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(comicTab) }, "eKaTWX inline-block"])}" data-v-fc1193c2><span data-v-fc1193c2>Gi\u1EDBi thi\u1EC7u</span></div><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(chapterTab) }, "eKaTWX"])}" data-v-fc1193c2><a data-v-fc1193c2>Chapters (${serverRenderer.exports.ssrInterpolate((_b = vue_cjs_prod.unref(chapters)) == null ? void 0 : _b.length)})</a></div><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(reviewTab) }, "eKaTWX"])}" data-v-fc1193c2><a data-v-fc1193c2>\u0110\xE1nh gi\xE1</a></div></div></div>`);
      if (vue_cjs_prod.unref(comicTab)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$B, { comic: vue_cjs_prod.unref(comic) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(chapterTab)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$E, { chapters: vue_cjs_prod.unref(chapters) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$z = _sfc_main$A.setup;
_sfc_main$A.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/truyen-tranh/[slug]/[_id].vue");
  return _sfc_setup$z ? _sfc_setup$z(props, ctx) : void 0;
};
const meta = void 0;
const routes = [
  {
    name: "danh-muc-slug",
    path: "/danh-muc/:slug",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/danh-muc/[slug].vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _slug_$1;
    })
  },
  {
    name: "index",
    path: "/",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/index.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index$2;
    })
  },
  {
    name: "tag-slug",
    path: "/tag/:slug",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/tag/[slug].vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return _slug_;
    })
  },
  {
    name: "tim-kiem",
    path: "/tim-kiem",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/tim-kiem/index.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return index;
    })
  },
  {
    name: "trending",
    path: "/trending",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/trending.vue",
    children: [],
    meta: meta$2,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return trending;
    })
  },
  {
    name: "truyen-tranh-chapter-chapter_slug-_id",
    path: "/truyen-tranh-chapter/:chapter_slug/:_id",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/truyen-tranh-chapter/[chapter_slug]/[_id].vue",
    children: [],
    meta: meta$1,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return __id_$2;
    })
  },
  {
    name: "truyen-tranh-slug-_id",
    path: "/truyen-tranh/:slug/:_id",
    file: "/Users/bonn/Documents/GitHub/comedy-app/pages/truyen-tranh/[slug]/[_id].vue",
    children: [],
    meta,
    alias: [],
    component: () => Promise.resolve().then(function() {
      return __id_$1;
    })
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
const globalMiddleware = [];
const namedMiddleware = {};
const _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47pages_47runtime_47router = defineNuxtPlugin(async (nuxtApp) => {
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  const baseURL2 = useRuntimeConfig().app.baseURL;
  const routerHistory = vueRouter_prod.createMemoryHistory(baseURL2);
  const initialURL = nuxtApp.ssrContext.url;
  const router = vueRouter_prod.createRouter({
    ...routerOptions,
    history: routerHistory,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = vue_cjs_prod.shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const route = {};
  for (const key in router.currentRoute.value) {
    route[key] = vue_cjs_prod.computed(() => router.currentRoute.value[key]);
  }
  const _activeRoute = vue_cjs_prod.shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _activeRoute.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a, _b, _c, _d;
    if (((_b = (_a = to.matched[0]) == null ? void 0 : _a.components) == null ? void 0 : _b.default) === ((_d = (_c = from.matched[0]) == null ? void 0 : _c.components) == null ? void 0 : _d.default)) {
      syncCurrentRoute();
    }
  });
  const activeRoute = {};
  for (const key in _activeRoute.value) {
    activeRoute[key] = vue_cjs_prod.computed(() => _activeRoute.value[key]);
  }
  nuxtApp._route = vue_cjs_prod.reactive(route);
  nuxtApp._activeRoute = vue_cjs_prod.reactive(activeRoute);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      await router.push(initialURL);
    }
    await router.isReady();
  } catch (error2) {
    callWithNuxt(nuxtApp, throwError, [error2]);
  }
  router.beforeEach(async (to, from) => {
    var _a;
    to.meta = vue_cjs_prod.reactive(to.meta);
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_a = namedMiddleware[entry2]) == null ? void 0 : _a.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, throwError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, throwError, [createError({
        statusCode: 404,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, throwError, [error2]);
    }
  });
  return { provide: { router } };
});
const operationsGenerator$1 = createOperationsGenerator({
  keyMap: {
    width: "w",
    height: "h",
    quality: "cmpr",
    format: "f",
    fit: "m",
    passThrough: "pass",
    sharpen: "s",
    rotate: "r",
    screenPercent: "pc",
    crop: "cr",
    inline: "in",
    metadata: "meta"
  },
  valueMap: {
    fit: {
      cover: "cropbox",
      contain: "letterbox",
      fill: "stretch",
      inside: "box",
      outside: "box"
    },
    format: {
      jpeg: "jpg"
    },
    quality(value) {
      let compression = 100 - parseInt(value, 10);
      if (compression === 100) {
        compression = 99;
      }
      return compression.toString();
    }
  },
  joinWith: "/",
  formatter: (key, value) => `${key}_${value}`
});
const getImage$1 = (src, { modifiers = {}, baseURL: baseURL2 = "/" } = {}) => {
  const operations = operationsGenerator$1(modifiers);
  return {
    url: joinURL(baseURL2, src + (operations ? "?imgeng=/" + operations : ""))
  };
};
const imageengineRuntime$VG92FCIHZl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  operationsGenerator: operationsGenerator$1,
  getImage: getImage$1
}, Symbol.toStringTag, { value: "Module" }));
const operationsGenerator = createOperationsGenerator({
  keyMap: {
    format: "f",
    fit: "fit",
    width: "w",
    height: "h",
    resize: "s",
    quality: "q",
    background: "b"
  },
  joinWith: ",",
  formatter: (key, val) => encodeParam(key) + "_" + encodeParam(val)
});
const getImage = (src, { modifiers = {}, baseURL: baseURL2 } = {}, _ctx) => {
  if (modifiers.width && modifiers.height) {
    modifiers.resize = `${modifiers.width}x${modifiers.height}`;
    delete modifiers.width;
    delete modifiers.height;
  }
  const params = operationsGenerator(modifiers) || "_";
  if (!baseURL2) {
    baseURL2 = joinURL("/", "/_ipx");
  }
  return {
    url: joinURL(baseURL2, params, encodePath(src))
  };
};
const validateDomains = true;
const supportsAlias = true;
const ipxRuntime$iqZzmqVnM6 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getImage,
  validateDomains,
  supportsAlias
}, Symbol.toStringTag, { value: "Module" }));
const imageOptions = {
  "screens": {
    "xs": 320,
    "sm": 640,
    "md": 768,
    "lg": 1024,
    "xl": 1280,
    "xxl": 1536,
    "2xl": 1536,
    "2xs": 390
  },
  "presets": {},
  "provider": "ipx",
  "domains": [
    "meetoon.co",
    "meetruyen.com"
  ],
  "alias": {}
};
imageOptions.providers = {
  ["imageengine"]: { provider: imageengineRuntime$VG92FCIHZl, defaults: { "baseURL": "https://6z1a4akz.cdn.imgeng.in/" } },
  ["ipx"]: { provider: ipxRuntime$iqZzmqVnM6, defaults: {} }
};
const _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47_64nuxt_47image_45edge_47dist_47runtime_47plugin = defineNuxtPlugin(() => {
  const img = createImage(imageOptions);
  return {
    provide: {
      img
    }
  };
});
const _plugins = [
  preload,
  _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47_46nuxt_47components_46plugin_46mjs,
  _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47head_47runtime_47lib_47vueuse_45head_46plugin,
  _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47head_47runtime_47plugin,
  _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47nuxt_47dist_47pages_47runtime_47router,
  _47Users_47bonn_47Documents_47GitHub_47comedy_45app_47node_modules_47_64nuxt_47image_45edge_47dist_47runtime_47plugin
];
const _sfc_main$z = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
      return errorComponent;
    }));
    const nuxtApp = useNuxtApp();
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    vue_cjs_prod.onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, throwError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = vue_cjs_prod.resolveComponent("App");
      serverRenderer.exports.ssrRenderSuspense(_push, {
        default: () => {
          if (vue_cjs_prod.unref(error)) {
            _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorComponent), { error: vue_cjs_prod.unref(error) }, null, _parent));
          } else {
            _push(serverRenderer.exports.ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$y = _sfc_main$z.setup;
_sfc_main$z.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$y ? _sfc_setup$y(props, ctx) : void 0;
};
const _sfc_main$y = {};
function _sfc_ssrRender$8(_ctx, _push, _parent, _attrs) {
}
const _sfc_setup$x = _sfc_main$y.setup;
_sfc_main$y.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CommentComic.vue");
  return _sfc_setup$x ? _sfc_setup$x(props, ctx) : void 0;
};
const CommentComic = /* @__PURE__ */ _export_sfc(_sfc_main$y, [["ssrRender", _sfc_ssrRender$8]]);
const CommentComic$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": CommentComic
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$x = vue_cjs_prod.defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "repeating-linear-gradient(to right, hsl(11deg 100% 52%) 0%, #d72700 50%, hsl(11deg 100% 62%) 100%) 0% 0% / 100%"
    }
  },
  setup(props) {
    const indicator = useLoadingIndicator$1({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => vue_cjs_prod.h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: `${indicator.progress.value}%`,
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transition: "width 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    });
  }
});
function useLoadingIndicator$1(opts) {
  const progress = vue_cjs_prod.ref(0);
  const isLoading = vue_cjs_prod.ref(false);
  vue_cjs_prod.computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    isLoading.value = true;
    if (opts.throttle)
      ;
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const _sfc_setup$w = _sfc_main$x.setup;
_sfc_main$x.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NuxtLoadingBar.vue");
  return _sfc_setup$w ? _sfc_setup$w(props, ctx) : void 0;
};
const NuxtLoadingBar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$x
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$2 = publicAssetsURL(`icons/tabbar/icon-newsfeed.svg`);
const _imports_1$1 = publicAssetsURL(`icons/tabbar/icon-toon-active.svg`);
const _imports_2 = publicAssetsURL(`icons/tabbar/icon-novel.svg`);
const _imports_3 = publicAssetsURL(`icons/tabbar/icon-tutruyen.svg`);
const _imports_4 = publicAssetsURL(`icons/tabbar/icon-canhan.svg`);
const _sfc_main$w = {};
function _sfc_ssrRender$7(_ctx, _push, _parent, _attrs) {
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "max-w-[450px] md:max-w-[750px] flex fixed bottom-0 z-50 bg-white w-full items-center justify-between shadow" }, _attrs))}><div class="w-[20%]"><a class="h-[50px] flex flex-col items-center" title="B\u1EA3ng tin" href="/bang-tin"><div class="w-[30px] max-w-[100%]"><div class="relative pb-[100%]"><img alt="B\u1EA3ng tin" data-src="/icons/tabbar/icon-newsfeed.svg" class="visible h-full left-0 absolute top-0 w-full"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$2)}></div></div><span class="text-xl text-primary-gray">B\u1EA3ng tin</span></a></div><div class="w-[20%]"><a class="h-[50px] flex flex-col items-center" title="Truy\u1EC7n tranh" href="/"><div class="w-[30px] max-w-[100%]"><div class="relative pb-[100%]"><img alt="Truy\u1EC7n tranh" data-src="/icons/tabbar/icon-toon-active.svg" class="visible h-full left-0 absolute top-0 w-full"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$1)}></div></div><span class="text-primary-gray text-xl">Truy\u1EC7n tranh</span></a></div><div class="w-[20%]"><a class="h-[50px] flex flex-col items-center" title="Ti\u1EC3u thuy\u1EBFt" href="/novel"><div class="w-[30px] max-w-[100%]"><div class="relative pb-[100%]"><img alt="Ti\u1EC3u thuy\u1EBFt" data-src="/icons/tabbar/icon-novel.svg" class="visible h-full left-0 absolute top-0 w-full"${serverRenderer.exports.ssrRenderAttr("src", _imports_2)}></div></div><span class="text-primary-gray text-xl">Ti\u1EC3u thuy\u1EBFt</span></a></div><div class="w-[20%]"><a class="h-[50px] flex flex-col items-center" title="Gi\xE1 s\xE1ch" href="/gia-sach"><div class="w-[30px] max-w-[100%]"><div class="relative pb-[100%]"><img alt="Gi\xE1 s\xE1ch" data-src="/icons/tabbar/icon-tutruyen.svg" class="visible h-full left-0 absolute top-0 w-full"${serverRenderer.exports.ssrRenderAttr("src", _imports_3)}></div></div><span class="text-primary-gray text-xl">Gi\xE1 s\xE1ch</span></a></div><div class="w-[20%]"><a class="h-[50px] flex flex-col items-center" title="C\xE1 nh\xE2n" href="/menu"><div class="w-[30px] max-w-[100%]"><div class="relative pb-[100%]"><img alt="C\xE1 nh\xE2n" data-src="/icons/tabbar/icon-canhan.svg" class="visible h-full left-0 absolute top-0 w-full"${serverRenderer.exports.ssrRenderAttr("src", _imports_4)}></div></div><span class="text-primary-gray text-xl">C\xE1 nh\xE2n</span></a></div></div>`);
}
const _sfc_setup$v = _sfc_main$w.setup;
_sfc_main$w.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheFooter.vue");
  return _sfc_setup$v ? _sfc_setup$v(props, ctx) : void 0;
};
const TheFooter = /* @__PURE__ */ _export_sfc(_sfc_main$w, [["ssrRender", _sfc_ssrRender$7]]);
const TheFooter$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": TheFooter
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$v = {
  __name: "TheHeader",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const scrollTransform = vue_cjs_prod.ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SvgBack = vue_cjs_prod.resolveComponent("SvgBack");
      const _component_SvgSearch = vue_cjs_prod.resolveComponent("SvgSearch");
      const _component_SvgNotify = vue_cjs_prod.resolveComponent("SvgNotify");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: [scrollTransform.value === 0 ? "" : "bg-black/70", "max-w-[450px] md:max-w-[750px] px-4 md:px-12 lg:px-20 xl:px-28 2xl:px-36 px-4 md:px-12 flex items-center h-24 fixed top w-full z-50 transition duration-500 to-transparent"]
      }, _attrs))}><div class="mr-4">`);
      if (vue_cjs_prod.unref(route).name !== "index") {
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          class: "flex items-center",
          to: "/"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_SvgBack, { class: "h-12 w-12 text-white" }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_component_SvgBack, { class: "h-12 w-12 text-white" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center space-x-4 ml-auto"><form class="flex"><div class="h-full w-fit rounded-2xl p-4 hover:cursor-pointer hover:opacity-60 text-background flex items-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(serverRenderer.exports.ssrRenderComponent(_component_SvgSearch, { class: "mr-4" }, null, _parent2, _scopeId));
          } else {
            return [
              vue_cjs_prod.createVNode(_component_SvgSearch, { class: "mr-4" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_SvgNotify, { class: "" }, null, _parent));
      _push(`</div></form></div></div>`);
    };
  }
};
const _sfc_setup$u = _sfc_main$v.setup;
_sfc_main$v.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheHeader.vue");
  return _sfc_setup$u ? _sfc_setup$u(props, ctx) : void 0;
};
const TheHeader = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$v
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$u = {};
function _sfc_ssrRender$6(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><div class="h-[270px]"><div class="animate-pulse h-full"><div class="animate-pulse bg-black/10 aspect-w-16 aspect-h-9"></div></div></div><div class="py-2 flex justify-around"><!--[-->`);
  serverRenderer.exports.ssrRenderList(4, (i) => {
    _push(`<div class="animate-pulse bg-black/10 h-[66px] w-[66px] rounded-full relative"><p class="h-[10px] absolute bottom-[-20px] animate-pulse bg-black/10 w-[65px] rounded-2xl"></p></div>`);
  });
  _push(`<!--]--></div><div class="px-4 mt-14"><div class="px-3 grid grid-cols-2 sm:grid-cols-3 gap-2.5 md:gap-5"><!--[-->`);
  serverRenderer.exports.ssrRenderList(6, (i) => {
    _push(`<div class="mt-2 col-span-1 w-full h-[100px] flex items-center"><div class="w-[75px] h-full animate-pulse bg-black/10 rounded-2xl"></div><div class="px-5 w-[120px]"><h3 class="w-[85] h-[9px] animate-pulse bg-black/10 rounded-2xl"></h3><h3 class="w-[75px] h-[9px] animate-pulse bg-black/10 rounded-2xl mt-3"></h3><h3 class="w-[65px] h-[9px] animate-pulse bg-black/10 rounded-2xl mt-3"></h3></div></div>`);
  });
  _push(`<!--]--></div></div><div class="px-4 mt-10 pb-24"><div class="flex justify-between"><h3 class="w-[200px] h-[15px] animate-pulse bg-black/10 rounded-2xl"></h3><span class="w-[80px] h-[15px] animate-pulse bg-black/10 rounded-2xl"></span></div><div class="grid grid-cols-4 mt-3 gap-4"><!--[-->`);
  serverRenderer.exports.ssrRenderList(8, (i) => {
    _push(`<div class="mt-2 col-span-1 w-full flex items-center"><div class="w-[105px] h-[139px] animate-pulse bg-black/10 rounded-2xl"></div></div>`);
  });
  _push(`<!--]--></div></div><!--]-->`);
}
const _sfc_setup$t = _sfc_main$u.setup;
_sfc_main$u.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/pulse/HomeLoading.vue");
  return _sfc_setup$t ? _sfc_setup$t(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$u, [["ssrRender", _sfc_ssrRender$6]]);
const HomeLoading = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __nuxt_component_0
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0$1 = publicAssetsURL(`images/ranking.png`);
const _imports_1 = publicAssetsURL(`images/category.png`);
const _sfc_main$t = {
  __name: "BannerBar",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "py-2 mt-6" }, _attrs))}><div class="grid grid-cols-4"><div class="grid grid-cols-1"><div class="flex items-center justify-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "rounded-[100%] bg-yellow-200"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center"${_scopeId}><img alt="ranking" class="w-9 h-9 mb-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_0$1)}${_scopeId}></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "icon w-16 h-16 rounded-[100%] flex items-center justify-center" }, [
                vue_cjs_prod.createVNode("img", {
                  alt: "ranking",
                  class: "w-9 h-9 mb-2",
                  src: _imports_0$1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-center font-semibold text-xl mt-2"> B\u1EA3ng x\u1EBFp h\u1EA1ng </p></div><div class="grid grid-cols-1"><div class="flex items-center justify-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: `${vue_cjs_prod.unref(DANH_MUC)}/all`,
        class: "rounded-[100%] bg-blue-200"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="icon w-16 h-16 flex items-center justify-center rounded-[100%]"${_scopeId}><img alt="category" class="w-9 h-9"${serverRenderer.exports.ssrRenderAttr("src", _imports_1)}${_scopeId}></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "icon w-16 h-16 flex items-center justify-center rounded-[100%]" }, [
                vue_cjs_prod.createVNode("img", {
                  alt: "category",
                  class: "w-9 h-9",
                  src: _imports_1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-center font-semibold text-xl mt-2"> Th\u1EC3 lo\u1EA1i </p></div><div class="grid grid-cols-1"><div class="flex items-center justify-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "rounded-[100%] bg-amber-200"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center"${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render), { class: "w-10 h-10" }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "icon w-16 h-16 rounded-[100%] flex items-center justify-center" }, [
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(render), { class: "w-10 h-10" })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-center font-semibold text-xl mt-2"> Theo d\xF5i </p></div><div class="grid grid-cols-1"><div class="flex items-center justify-center">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { class: "rounded-[100%] bg-green-200" }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="icon w-16 h-16 rounded-[100%] flex items-center justify-center text-3xl"${_scopeId}> \u{1F4DA} </div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "icon w-16 h-16 rounded-[100%] flex items-center justify-center text-3xl" }, " \u{1F4DA} ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-center font-semibold text-xl mt-2"> L\u1ECBch s\u1EED </p></div></div></div>`);
    };
  }
};
const _sfc_setup$s = _sfc_main$t.setup;
_sfc_main$t.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BannerBar.vue");
  return _sfc_setup$s ? _sfc_setup$s(props, ctx) : void 0;
};
const BannerBar = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$t
}, Symbol.toStringTag, { value: "Module" }));
const keys$1 = {
  comicCacheLocalPreview: "comic-preview",
  visitedComics: "visited-comics"
};
const HomePageTypes = {
  _banner: "banner",
  _cover: "cover",
  _menu: "menu",
  _trend: "trend",
  _representCategory: "representCategory",
  _recommendation: "recommendation",
  _newest: "newest",
  _comingSoon: "comingSoon",
  _funtoonChoice: "funtoonChoice"
};
const __nuxt_component_1_lazy$5 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Spotlight;
}));
const __nuxt_component_3_lazy$1 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Trending$1;
}));
const __nuxt_component_4_lazy$1 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return RepresentCategory;
}));
const __nuxt_component_5_lazy = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return NewStory;
}));
const _sfc_main$s = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "TheHome",
  __ssrInlineRender: true,
  setup(__props) {
    useRuntimeConfig();
    const { data: homepages, pending } = useFetch("/api/homepage", "$EvkV3VL7Jc");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_PulseHomeLoading = __nuxt_component_0;
      const _component_LazyHomepageSpotlight = __nuxt_component_1_lazy$5;
      const _component_SharedBannerBar = _sfc_main$t;
      const _component_LazyHomepageTrending = __nuxt_component_3_lazy$1;
      const _component_LazyHomepageRepresentCategory = __nuxt_component_4_lazy$1;
      const _component_LazyHomepageNewStory = __nuxt_component_5_lazy;
      if (vue_cjs_prod.unref(pending)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white" }, _attrs))}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_PulseHomeLoading, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<main${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "h-[auto] bg-white" }, _attrs))}><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(homepages).data, (record) => {
          _push(`<div>`);
          if (record.type === vue_cjs_prod.unref(HomePageTypes)._banner) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_LazyHomepageSpotlight, { banner: record }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (record.type === vue_cjs_prod.unref(HomePageTypes)._menu) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_SharedBannerBar, null, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (record.type === vue_cjs_prod.unref(HomePageTypes)._trend) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_LazyHomepageTrending, { record }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (record.type === vue_cjs_prod.unref(HomePageTypes)._representCategory) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_LazyHomepageRepresentCategory, { record }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          if (record.type === vue_cjs_prod.unref(HomePageTypes)._newest || record.type === vue_cjs_prod.unref(HomePageTypes)._recommendation) {
            _push(serverRenderer.exports.ssrRenderComponent(_component_LazyHomepageNewStory, { record }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></main>`);
      }
    };
  }
});
const _sfc_setup$r = _sfc_main$s.setup;
_sfc_main$s.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TheHome.vue");
  return _sfc_setup$r ? _sfc_setup$r(props, ctx) : void 0;
};
const TheHome = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$s
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$r = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "VisitedComic",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const visitedComics = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useStorage(keys$1.visitedComics, {
      serializer: {
        read: (v) => v ? JSON.parse(v) : null,
        write: (v) => JSON.stringify(v)
      }
    })), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedImg = vue_cjs_prod.resolveComponent("SharedImg");
      _push(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (vue_cjs_prod.unref(visitedComics) && vue_cjs_prod.unref(visitedComics).length > 0) {
              _push2(`<div class="visited-comics px-3 mt-10"${_scopeId}><h2 class="h-[40px] mb-2 text-2xl font-semibold flex justify-start items-center text-black"${_scopeId}> # Truy\u1EC7n \u0111ang \u0111\u1ECDc </h2>`);
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Swiper), {
                "slides-per-view": 1.3,
                "space-between": 14,
                class: "pt-20_important h-[175px]"
              }, {
                default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<!--[-->`);
                    serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(visitedComics), (manga2) => {
                      _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(SwiperSlide), {
                        key: manga2.slug,
                        class: "duration-300 magictime"
                      }, {
                        default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                          var _a, _b;
                          if (_push4) {
                            _push4(`<div class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"${_scopeId3}><div class="absolute bottom-[13px] left-[13px]"${_scopeId3}>`);
                            _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                              to: vue_cjs_prod.unref(useNavigatorComicPreview)(manga2.slug)
                            }, {
                              default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="max-w-full w-[105px]"${_scopeId4}><div class="relative pb-[133.3333%]"${_scopeId4}>`);
                                  _push5(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
                                    class: "rounded-2xl visible h-full left-0 absolute top-0 w-full",
                                    src: manga2.thumbnail
                                  }, null, _parent5, _scopeId4));
                                  _push5(`</div></div>`);
                                } else {
                                  return [
                                    vue_cjs_prod.createVNode("div", { class: "max-w-full w-[105px]" }, [
                                      vue_cjs_prod.createVNode("div", { class: "relative pb-[133.3333%]" }, [
                                        vue_cjs_prod.createVNode(_component_SharedImg, {
                                          class: "rounded-2xl visible h-full left-0 absolute top-0 w-full",
                                          src: manga2.thumbnail
                                        }, null, 8, ["src"])
                                      ])
                                    ])
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                            _push4(`</div><div class="ml-[118px] p-4"${_scopeId3}><h3 class="text-xl font-semibold line-clamp-1"${_scopeId3}><a${_scopeId3}>${serverRenderer.exports.ssrInterpolate(manga2.name ? manga2.name : manga2.title)}</a></h3><p class="line-clamp-2 text-xs italic"${_scopeId3}>${serverRenderer.exports.ssrInterpolate(manga2.review)}</p><div${_scopeId3}><a class="text-primary text-base"${_scopeId3}> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(manga2.chapterNumber ? manga2.chapterNumber : 0)}/${serverRenderer.exports.ssrInterpolate((_a = manga2 == null ? void 0 : manga2.chapterList) == null ? void 0 : _a.length)}</a></div><button class="bg-primary p-1 text-base w-[80px] rounded-3xl h-[25px]"${_scopeId3}> \u0110\u1ECDc ti\u1EBFp </button></div></div>`);
                          } else {
                            return [
                              vue_cjs_prod.createVNode("div", { class: "col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]" }, [
                                vue_cjs_prod.createVNode("div", { class: "absolute bottom-[13px] left-[13px]" }, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, {
                                    to: vue_cjs_prod.unref(useNavigatorComicPreview)(manga2.slug)
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createVNode("div", { class: "max-w-full w-[105px]" }, [
                                        vue_cjs_prod.createVNode("div", { class: "relative pb-[133.3333%]" }, [
                                          vue_cjs_prod.createVNode(_component_SharedImg, {
                                            class: "rounded-2xl visible h-full left-0 absolute top-0 w-full",
                                            src: manga2.thumbnail
                                          }, null, 8, ["src"])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                vue_cjs_prod.createVNode("div", { class: "ml-[118px] p-4" }, [
                                  vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1" }, [
                                    vue_cjs_prod.createVNode("a", null, vue_cjs_prod.toDisplayString(manga2.name ? manga2.name : manga2.title), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("p", { class: "line-clamp-2 text-xs italic" }, vue_cjs_prod.toDisplayString(manga2.review), 1),
                                  vue_cjs_prod.createVNode("div", null, [
                                    vue_cjs_prod.createVNode("a", { class: "text-primary text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(manga2.chapterNumber ? manga2.chapterNumber : 0) + "/" + vue_cjs_prod.toDisplayString((_b = manga2 == null ? void 0 : manga2.chapterList) == null ? void 0 : _b.length), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("button", { class: "bg-primary p-1 text-base w-[80px] rounded-3xl h-[25px]" }, " \u0110\u1ECDc ti\u1EBFp ")
                                ])
                              ])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  } else {
                    return [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(visitedComics), (manga2) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                          key: manga2.slug,
                          class: "duration-300 magictime"
                        }, {
                          default: vue_cjs_prod.withCtx(() => {
                            var _a;
                            return [
                              vue_cjs_prod.createVNode("div", { class: "col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]" }, [
                                vue_cjs_prod.createVNode("div", { class: "absolute bottom-[13px] left-[13px]" }, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, {
                                    to: vue_cjs_prod.unref(useNavigatorComicPreview)(manga2.slug)
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createVNode("div", { class: "max-w-full w-[105px]" }, [
                                        vue_cjs_prod.createVNode("div", { class: "relative pb-[133.3333%]" }, [
                                          vue_cjs_prod.createVNode(_component_SharedImg, {
                                            class: "rounded-2xl visible h-full left-0 absolute top-0 w-full",
                                            src: manga2.thumbnail
                                          }, null, 8, ["src"])
                                        ])
                                      ])
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                vue_cjs_prod.createVNode("div", { class: "ml-[118px] p-4" }, [
                                  vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1" }, [
                                    vue_cjs_prod.createVNode("a", null, vue_cjs_prod.toDisplayString(manga2.name ? manga2.name : manga2.title), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("p", { class: "line-clamp-2 text-xs italic" }, vue_cjs_prod.toDisplayString(manga2.review), 1),
                                  vue_cjs_prod.createVNode("div", null, [
                                    vue_cjs_prod.createVNode("a", { class: "text-primary text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(manga2.chapterNumber ? manga2.chapterNumber : 0) + "/" + vue_cjs_prod.toDisplayString((_a = manga2 == null ? void 0 : manga2.chapterList) == null ? void 0 : _a.length), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("button", { class: "bg-primary p-1 text-base w-[80px] rounded-3xl h-[25px]" }, " \u0110\u1ECDc ti\u1EBFp ")
                                ])
                              ])
                            ];
                          }),
                          _: 2
                        }, 1024);
                      }), 128))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              vue_cjs_prod.unref(visitedComics) && vue_cjs_prod.unref(visitedComics).length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("div", {
                key: 0,
                class: "visited-comics px-3 mt-10"
              }, [
                vue_cjs_prod.createVNode("h2", { class: "h-[40px] mb-2 text-2xl font-semibold flex justify-start items-center text-black" }, " # Truy\u1EC7n \u0111ang \u0111\u1ECDc "),
                vue_cjs_prod.createVNode(vue_cjs_prod.unref(Swiper), {
                  "slides-per-view": 1.3,
                  "space-between": 14,
                  class: "pt-20_important h-[175px]"
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(vue_cjs_prod.unref(visitedComics), (manga2) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                        key: manga2.slug,
                        class: "duration-300 magictime"
                      }, {
                        default: vue_cjs_prod.withCtx(() => {
                          var _a;
                          return [
                            vue_cjs_prod.createVNode("div", { class: "col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]" }, [
                              vue_cjs_prod.createVNode("div", { class: "absolute bottom-[13px] left-[13px]" }, [
                                vue_cjs_prod.createVNode(_component_NuxtLink, {
                                  to: vue_cjs_prod.unref(useNavigatorComicPreview)(manga2.slug)
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createVNode("div", { class: "max-w-full w-[105px]" }, [
                                      vue_cjs_prod.createVNode("div", { class: "relative pb-[133.3333%]" }, [
                                        vue_cjs_prod.createVNode(_component_SharedImg, {
                                          class: "rounded-2xl visible h-full left-0 absolute top-0 w-full",
                                          src: manga2.thumbnail
                                        }, null, 8, ["src"])
                                      ])
                                    ])
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]),
                              vue_cjs_prod.createVNode("div", { class: "ml-[118px] p-4" }, [
                                vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1" }, [
                                  vue_cjs_prod.createVNode("a", null, vue_cjs_prod.toDisplayString(manga2.name ? manga2.name : manga2.title), 1)
                                ]),
                                vue_cjs_prod.createVNode("p", { class: "line-clamp-2 text-xs italic" }, vue_cjs_prod.toDisplayString(manga2.review), 1),
                                vue_cjs_prod.createVNode("div", null, [
                                  vue_cjs_prod.createVNode("a", { class: "text-primary text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(manga2.chapterNumber ? manga2.chapterNumber : 0) + "/" + vue_cjs_prod.toDisplayString((_a = manga2 == null ? void 0 : manga2.chapterList) == null ? void 0 : _a.length), 1)
                                ]),
                                vue_cjs_prod.createVNode("button", { class: "bg-primary p-1 text-base w-[80px] rounded-3xl h-[25px]" }, " \u0110\u1ECDc ti\u1EBFp ")
                              ])
                            ])
                          ];
                        }),
                        _: 2
                      }, 1024);
                    }), 128))
                  ]),
                  _: 1
                }, 8, ["slides-per-view"])
              ])) : vue_cjs_prod.createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$q = _sfc_main$r.setup;
_sfc_main$r.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/VisitedComic.vue");
  return _sfc_setup$q ? _sfc_setup$q(props, ctx) : void 0;
};
const VisitedComic = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$r
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$q = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ComicItem",
  __ssrInlineRender: true,
  props: {
    comics: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.comics, (comic) => {
        _push(`<div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          class: "flex items-center p-4",
          to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="relative"${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
                class: "w-[125px] h-[168px]",
                width: 125,
                height: 168,
                lazy: true,
                src: comic.verticalLogo,
                fil: "fill"
              }, null, _parent2, _scopeId));
              _push2(`<div class="absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80"${_scopeId}></div><div class="absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center"${_scopeId}><a${_scopeId}>Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comic.newestChapter)}</a></div></div><div class="px-5 h-[168px]" style="${serverRenderer.exports.ssrRenderStyle({ "width": "calc(100% - 102px)" })}"${_scopeId}><h3 class="text-1xl font-semibold line-clamp-1 mb-1"${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
              }, {
                default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate(comic.comicName)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</h3><p class="text-primary-gray mb-3 text-base line-clamp-3"${_scopeId}>${serverRenderer.exports.ssrInterpolate(comic.description)}</p><p class="text-primary-gray text-xl"${_scopeId}> L\u01B0\u1EE3t xem: ${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(comic.viewCount))}</p><p class="text-primary-gray text-xl mt-4"${_scopeId}> C\u1EADp nh\u1EADt cu\u1ED1i: ${serverRenderer.exports.ssrInterpolate(new Date(comic.updatedAt).toLocaleDateString("vi-VN"))}</p></div>`);
            } else {
              return [
                vue_cjs_prod.createVNode("div", { class: "relative" }, [
                  vue_cjs_prod.createVNode(_component_SharedMeeToonImg, {
                    class: "w-[125px] h-[168px]",
                    width: 125,
                    height: 168,
                    lazy: true,
                    src: comic.verticalLogo,
                    fil: "fill"
                  }, null, 8, ["src"]),
                  vue_cjs_prod.createVNode("div", { class: "absolute bottom-0 bg-deep-black h-[30px] w-full rounded-b-xl opacity-80" }),
                  vue_cjs_prod.createVNode("div", { class: "absolute bottom-0 w-full text-xl font-semibold text-white h-[30px] flex items-center justify-center" }, [
                    vue_cjs_prod.createVNode("a", null, "Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(comic.newestChapter), 1)
                  ])
                ]),
                vue_cjs_prod.createVNode("div", {
                  class: "px-5 h-[168px]",
                  style: { "width": "calc(100% - 102px)" }
                }, [
                  vue_cjs_prod.createVNode("h3", { class: "text-1xl font-semibold line-clamp-1 mb-1" }, [
                    vue_cjs_prod.createVNode(_component_NuxtLink, {
                      to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                      ]),
                      _: 2
                    }, 1032, ["to"])
                  ]),
                  vue_cjs_prod.createVNode("p", { class: "text-primary-gray mb-3 text-base line-clamp-3" }, vue_cjs_prod.toDisplayString(comic.description), 1),
                  vue_cjs_prod.createVNode("p", { class: "text-primary-gray text-xl" }, " L\u01B0\u1EE3t xem: " + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(comic.viewCount)), 1),
                  vue_cjs_prod.createVNode("p", { class: "text-primary-gray text-xl mt-4" }, " C\u1EADp nh\u1EADt cu\u1ED1i: " + vue_cjs_prod.toDisplayString(new Date(comic.updatedAt).toLocaleDateString("vi-VN")), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$p = _sfc_main$q.setup;
_sfc_main$q.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/categorys/ComicItem.vue");
  return _sfc_setup$p ? _sfc_setup$p(props, ctx) : void 0;
};
const ComicItem = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$q
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$p = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLink = __nuxt_component_0$2;
  const _component_SharedImg = vue_cjs_prod.resolveComponent("SharedImg");
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "px-4 mb-4 mt-4" }, _attrs))}><h2 class="flex h-[20px] text-3xl font-bold justify-start items-center text-black"> # Ph\xE2n lo\u1EA1i </h2><div class="grid grid-cols-2"><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/mao-hiem" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          format: "webp",
          quantity: "100",
          class: "rounded-xl w-full",
          src: "/images/mao-hiem.png",
          fil: "fill"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            format: "webp",
            quantity: "100",
            class: "rounded-xl w-full",
            src: "/images/mao-hiem.png",
            fil: "fill"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/fantasy-105" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          quantity: "100",
          format: "webp",
          class: "rounded-xl",
          src: "/images/huyen-huyen.png",
          fil: "fill"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            quantity: "100",
            format: "webp",
            class: "rounded-xl",
            src: "/images/huyen-huyen.png",
            fil: "fill"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/dam-my" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          class: "rounded-xl",
          quantity: "100",
          format: "webp",
          src: "/images/dam-my.png",
          fil: "fill"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            class: "rounded-xl",
            quantity: "100",
            format: "webp",
            src: "/images/dam-my.png",
            fil: "fill"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/comic" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          quantity: "100",
          format: "webp",
          class: "rounded-xl",
          src: "/images/tong-tai.png",
          fil: "fill"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            quantity: "100",
            format: "webp",
            class: "rounded-xl",
            src: "/images/tong-tai.png",
            fil: "fill"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/co-dai-207" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          quantity: "100",
          format: "webp",
          class: "rounded-xl",
          src: "/images/nu-cuong.png",
          fil: "cover"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            quantity: "100",
            format: "webp",
            class: "rounded-xl",
            src: "/images/nu-cuong.png",
            fil: "cover"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div><div class="col-span-1 odd_margin-left odd_margin-right mt-5">`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { to: "/category/school-life" }, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedImg, {
          loading: "lazy",
          quantity: "100",
          class: "rounded-xl",
          format: "webp",
          src: "/images/truong-hoc.png",
          fil: "cover"
        }, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_SharedImg, {
            loading: "lazy",
            quantity: "100",
            class: "rounded-xl",
            format: "webp",
            src: "/images/truong-hoc.png",
            fil: "cover"
          })
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div></div>`);
}
const _sfc_setup$o = _sfc_main$p.setup;
_sfc_main$p.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/homepage/Catelog.vue");
  return _sfc_setup$o ? _sfc_setup$o(props, ctx) : void 0;
};
const Catelog = /* @__PURE__ */ _export_sfc(_sfc_main$p, [["ssrRender", _sfc_ssrRender$5]]);
const Catelog$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Catelog
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy$4 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return MeeToonImg;
}));
const _sfc_main$o = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ComicHorizontal",
  __ssrInlineRender: true,
  props: {
    _id: String,
    chapNumber: String,
    className: String,
    adultContent: Boolean,
    slug: String,
    status: String,
    verticalLogo: String,
    comicName: String,
    tags: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LazySharedMeeToonImg = __nuxt_component_1_lazy$4;
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, vue_cjs_prod.mergeProps({
        to: vue_cjs_prod.unref(useNavigatorComicPreview)(__props.slug, __props._id),
        title: __props.comicName
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="inline-block w-[105px] mr-6"${_scopeId}><div class="relative"${_scopeId}><div class="absolute top-[-3px] left-1 w-full z-10"${_scopeId}><span class="inline-block px-3 rounded-xl bg-primary font-bold text-white text-sm"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(COMIC_STATUS)[__props.status])}</span></div>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_LazySharedMeeToonImg, {
              alt: __props.comicName,
              sizes: "sm:100px 2xs:150px md:200px md:250px",
              width: 105,
              height: 140,
              class: "rounded-2xl w-full",
              src: __props.verticalLogo
            }, null, _parent2, _scopeId));
            _push2(`</div><h3 class="text-xl line-clamp-1 mt-1 text-black font-semibold"${serverRenderer.exports.ssrRenderAttr("title", __props.comicName)}${_scopeId}>${serverRenderer.exports.ssrInterpolate(__props.comicName)}</h3>`);
            if (__props.tags && __props.tags.length > 0) {
              _push2(`<p class="text-primary-gray text-base font-medium line-clamp-1"${_scopeId}> #${serverRenderer.exports.ssrInterpolate(__props.tags[0].name)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.chapNumber) {
              _push2(`<p class="text-primary-gray text-base"${_scopeId}> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(__props.chapNumber)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "inline-block w-[105px] mr-6" }, [
                vue_cjs_prod.createVNode("div", { class: "relative" }, [
                  vue_cjs_prod.createVNode("div", { class: "absolute top-[-3px] left-1 w-full z-10" }, [
                    vue_cjs_prod.createVNode("span", { class: "inline-block px-3 rounded-xl bg-primary font-bold text-white text-sm" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(COMIC_STATUS)[__props.status]), 1)
                  ]),
                  vue_cjs_prod.createVNode(_component_LazySharedMeeToonImg, {
                    alt: __props.comicName,
                    sizes: "sm:100px 2xs:150px md:200px md:250px",
                    width: 105,
                    height: 140,
                    class: "rounded-2xl w-full",
                    src: __props.verticalLogo
                  }, null, 8, ["alt", "src"])
                ]),
                vue_cjs_prod.createVNode("h3", {
                  class: "text-xl line-clamp-1 mt-1 text-black font-semibold",
                  title: __props.comicName
                }, vue_cjs_prod.toDisplayString(__props.comicName), 9, ["title"]),
                __props.tags && __props.tags.length > 0 ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("p", {
                  key: 0,
                  class: "text-primary-gray text-base font-medium line-clamp-1"
                }, " #" + vue_cjs_prod.toDisplayString(__props.tags[0].name), 1)) : vue_cjs_prod.createCommentVNode("", true),
                __props.chapNumber ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("p", {
                  key: 1,
                  class: "text-primary-gray text-base"
                }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(__props.chapNumber), 1)) : vue_cjs_prod.createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$n = _sfc_main$o.setup;
_sfc_main$o.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/comics/ComicHorizontal.vue");
  return _sfc_setup$n ? _sfc_setup$n(props, ctx) : void 0;
};
const ComicHorizontal = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$o
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$n = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "NewStory",
  __ssrInlineRender: true,
  props: {
    record: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "px-4 mb-4 mt-10" }, _attrs))}><h2 class="h-[20px] text-3xl font-bold flex justify-start items-center text-black mb-4"> # ${serverRenderer.exports.ssrInterpolate(__props.record.typeName)}</h2><div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide"><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.record.content, (comic) => {
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$o), {
          key: comic.slug,
          _id: comic._id,
          comic,
          "adult-content": comic.adultContent,
          "chap-number": comic.newestChapter,
          "comic-name": comic.comicName,
          slug: comic.slug,
          status: comic.status,
          "vertical-logo": comic.verticalLogo
        }, null, _parent));
      });
      _push(`<!--]--></div></div>`);
    };
  }
});
const _sfc_setup$m = _sfc_main$n.setup;
_sfc_main$n.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/homepage/NewStory.vue");
  return _sfc_setup$m ? _sfc_setup$m(props, ctx) : void 0;
};
const NewStory = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$n
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$m = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "RepresentCategory",
  __ssrInlineRender: true,
  props: {
    record: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.record.content, (content) => {
        _push(`<div class="px-4"><div class="h-[70px] mb-4 flex justify-between"><h2 class="text-3xl font-bold flex justify-start items-center text-black">${serverRenderer.exports.ssrInterpolate(content.name || content.categoryVietName)}</h2>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: content.type !== "category" ? `${vue_cjs_prod.unref(TAG)}/${content.slug}` : `${vue_cjs_prod.unref(DANH_MUC)}/${content.slug}`,
          class: "text-xl font-semibold flex items-center text-primary mr-1"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Th\xEAm `);
            } else {
              return [
                vue_cjs_prod.createTextVNode(" Th\xEAm ")
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="grid grid-cols-1 md:grid-cols-2 gap-14 mb-10"><!--[-->`);
        serverRenderer.exports.ssrRenderList(content.comicsReviewNewest, (comic) => {
          _push(`<div class="col-span-1 rounded-[8px] p-13 max-w-[384px] w-full h-[138px] bg-white relative shadow-[0_3px_20px_rgba(0,0,0,10%)]"><div class="absolute bottom-[13px] left-[13px]">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="max-w-full w-[105px]"${_scopeId}><div class="relative"${_scopeId}><div class="absolute top-0"${_scopeId}>`);
                if (!comic.adultContent) {
                  _push2(`<span class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(COMIC_STATUS)[comic.status])}</span>`);
                } else {
                  _push2(`<span class="bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"${_scopeId}> 17+ </span>`);
                }
                _push2(`</div>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
                  alt: comic.comicName,
                  sizes: "sm:100px 2xs:150px md:200px md:300px",
                  class: "rounded-2xl visible h-full left-0 relative top-0 w-full",
                  src: comic.verticalLogo
                }, null, _parent2, _scopeId));
                _push2(`</div></div>`);
              } else {
                return [
                  vue_cjs_prod.createVNode("div", { class: "max-w-full w-[105px]" }, [
                    vue_cjs_prod.createVNode("div", { class: "relative" }, [
                      vue_cjs_prod.createVNode("div", { class: "absolute top-0" }, [
                        !comic.adultContent ? (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("span", {
                          key: 0,
                          class: "bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"
                        }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(COMIC_STATUS)[comic.status]), 1)) : (vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock("span", {
                          key: 1,
                          class: "bg-primary rounded-xl text-white text-xl font-bold px-3 py-1 ml-1"
                        }, " 17+ "))
                      ]),
                      vue_cjs_prod.createVNode(_component_SharedMeeToonImg, {
                        alt: comic.comicName,
                        sizes: "sm:100px 2xs:150px md:200px md:300px",
                        class: "rounded-2xl visible h-full left-0 relative top-0 w-full",
                        src: comic.verticalLogo
                      }, null, 8, ["alt", "src"])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="ml-[118px] p-4"><h3 class="text-xl font-medium"><a>${serverRenderer.exports.ssrInterpolate(comic == null ? void 0 : comic.comicName)}</a></h3><div><div class="rating flex items-center"><!--[-->`);
          serverRenderer.exports.ssrRenderList(5, (i) => {
            _push(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_5)} alt="rating">`);
          });
          _push(`<!--]--><p class="text-xl">${serverRenderer.exports.ssrInterpolate(comic == null ? void 0 : comic.avgRate.toFixed(1))} <span class="text-xl font-semibold text-gray-500"> (369)</span></p></div><a><i class="w-full text-base line-clamp-3"> &quot;${serverRenderer.exports.ssrInterpolate(comic == null ? void 0 : comic.contentReview)}&quot; </i></a><div class="mt-3"><a class="mt-3"><p class="flex items-center justify-start w-full text-gray-500"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} class="mr-2" alt="comment"><span class="name text-base font-semibold">${serverRenderer.exports.ssrInterpolate(comic.userComment.name)}</span></p></a></div></div></div></div>`);
        });
        _push(`<!--]--></div><div class="whitespace-nowrap overflow-x-auto mb-10 scrollbar-hide"><!--[-->`);
        serverRenderer.exports.ssrRenderList(content.comics, (comic) => {
          _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$o), {
            key: comic == null ? void 0 : comic.slug,
            _id: comic == null ? void 0 : comic._id,
            "adult-content": comic == null ? void 0 : comic.adultContent,
            "chap-number": comic == null ? void 0 : comic.newestChapter,
            "comic-name": comic == null ? void 0 : comic.comicName,
            slug: comic == null ? void 0 : comic.slug,
            status: comic == null ? void 0 : comic.status,
            "vertical-logo": comic == null ? void 0 : comic.verticalLogo,
            tags: comic == null ? void 0 : comic.tags
          }, null, _parent));
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$l = _sfc_main$m.setup;
_sfc_main$m.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/homepage/RepresentCategory.vue");
  return _sfc_setup$l ? _sfc_setup$l(props, ctx) : void 0;
};
const RepresentCategory = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$m
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$l = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "Spotlight",
  __ssrInlineRender: true,
  props: {
    banner: Object
  },
  setup(__props) {
    const modules = vue_cjs_prod.ref([Autoplay]);
    useRuntimeConfig();
    const autoPlaySettings = vue_cjs_prod.ref({
      delay: 2500,
      disableOnInteraction: false
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_shared_mee_toon_img = _sfc_main$J;
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Swiper), vue_cjs_prod.mergeProps({
        loop: true,
        modules: modules.value,
        autoplay: autoPlaySettings.value
      }, _attrs), {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            serverRenderer.exports.ssrRenderList(__props.banner.covers, (cover) => {
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(SwiperSlide), {
                key: cover._id
              }, {
                default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                      to: vue_cjs_prod.unref(useNavigatorComicPreview)(cover.slug, cover._id),
                      class: "relative block h-[65vw]",
                      title: cover.comicName
                    }, {
                      default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="w-full bottom-0"${_scopeId3}>`);
                          _push4(serverRenderer.exports.ssrRenderComponent(_component_shared_mee_toon_img, {
                            class: "w-full",
                            alt: cover.comicName,
                            src: `${cover.link}`
                          }, null, _parent4, _scopeId3));
                          _push4(`</div><!--[-->`);
                          serverRenderer.exports.ssrRenderList(cover.animations, (animation) => {
                            _push4(serverRenderer.exports.ssrRenderComponent(_component_shared_mee_toon_img, {
                              key: animation.image,
                              class: "absolute w-full bottom-0",
                              alt: cover.comicName,
                              src: `${animation.image}`,
                              width: 375,
                              height: 280
                            }, null, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            vue_cjs_prod.createVNode("div", { class: "w-full bottom-0" }, [
                              vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                                class: "w-full",
                                alt: cover.comicName,
                                src: `${cover.link}`
                              }, null, 8, ["alt", "src"])
                            ]),
                            (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(cover.animations, (animation) => {
                              return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_shared_mee_toon_img, {
                                key: animation.image,
                                class: "absolute w-full bottom-0",
                                alt: cover.comicName,
                                src: `${animation.image}`,
                                width: 375,
                                height: 280
                              }, null, 8, ["alt", "src"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        to: vue_cjs_prod.unref(useNavigatorComicPreview)(cover.slug, cover._id),
                        class: "relative block h-[65vw]",
                        title: cover.comicName
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode("div", { class: "w-full bottom-0" }, [
                            vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                              class: "w-full",
                              alt: cover.comicName,
                              src: `${cover.link}`
                            }, null, 8, ["alt", "src"])
                          ]),
                          (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(cover.animations, (animation) => {
                            return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_shared_mee_toon_img, {
                              key: animation.image,
                              class: "absolute w-full bottom-0",
                              alt: cover.comicName,
                              src: `${animation.image}`,
                              width: 375,
                              height: 280
                            }, null, 8, ["alt", "src"]);
                          }), 128))
                        ]),
                        _: 2
                      }, 1032, ["to", "title"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.banner.covers, (cover) => {
                return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                  key: cover._id
                }, {
                  default: vue_cjs_prod.withCtx(() => [
                    vue_cjs_prod.createVNode(_component_NuxtLink, {
                      to: vue_cjs_prod.unref(useNavigatorComicPreview)(cover.slug, cover._id),
                      class: "relative block h-[65vw]",
                      title: cover.comicName
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("div", { class: "w-full bottom-0" }, [
                          vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                            class: "w-full",
                            alt: cover.comicName,
                            src: `${cover.link}`
                          }, null, 8, ["alt", "src"])
                        ]),
                        (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(cover.animations, (animation) => {
                          return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(_component_shared_mee_toon_img, {
                            key: animation.image,
                            class: "absolute w-full bottom-0",
                            alt: cover.comicName,
                            src: `${animation.image}`,
                            width: 375,
                            height: 280
                          }, null, 8, ["alt", "src"]);
                        }), 128))
                      ]),
                      _: 2
                    }, 1032, ["to", "title"])
                  ]),
                  _: 2
                }, 1024);
              }), 128))
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$k = _sfc_main$l.setup;
_sfc_main$l.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/homepage/Spotlight.vue");
  return _sfc_setup$k ? _sfc_setup$k(props, ctx) : void 0;
};
const Spotlight = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$l
}, Symbol.toStringTag, { value: "Module" }));
const _imports_0 = publicAssetsURL(`icons/homePage/icon-view-chapter.svg`);
const _sfc_main$k = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "Trending",
  __ssrInlineRender: true,
  props: {
    record: Object
  },
  setup(__props) {
    const navigatorComicPreview = (slug, _id) => {
      return navigateTo(useNavigatorComicPreview(slug, _id));
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_client_only = __nuxt_component_2;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_nuxt_img = __nuxt_component_2$1;
      const _component_shared_mee_toon_img = _sfc_main$J;
      _push(serverRenderer.exports.ssrRenderComponent(_component_client_only, _attrs, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="px-4 bg-contain" data-v-3ac29874${_scopeId}><div data-v-3ac29874${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, { href: "/" }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(serverRenderer.exports.ssrRenderComponent(_component_nuxt_img, {
                    format: "png",
                    quality: "100",
                    class: "w-full",
                    src: "/icons/widgets/trend/img-header.svg",
                    alt: "C\xF3 ch\u1EAFc \u0111\xE2y l\xE0 hot"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode(_component_nuxt_img, {
                      format: "png",
                      quality: "100",
                      class: "w-full",
                      src: "/icons/widgets/trend/img-header.svg",
                      alt: "C\xF3 ch\u1EAFc \u0111\xE2y l\xE0 hot"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="bg-white px-2 shadow" data-v-3ac29874${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(Swiper), {
              "slides-per-view": 1.3,
              "space-between": 14,
              modules: [vue_cjs_prod.unref(Grid)],
              grid: {
                rows: 3,
                fill: "row"
              }
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  serverRenderer.exports.ssrRenderList(__props.record.content, (content) => {
                    _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(SwiperSlide), {
                      key: content.slug,
                      class: "h-[130px]"
                    }, {
                      default: vue_cjs_prod.withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="flex items-center p-5" data-v-3ac29874${_scopeId3}>`);
                          _push4(serverRenderer.exports.ssrRenderComponent(_component_shared_mee_toon_img, {
                            fil: "cover",
                            class: "aspect-[3/4] w-[75px] h-full relative rounded-2xl",
                            width: 75,
                            height: 100,
                            sizes: "sm:75px 2sm:100px sm:150px md:150px",
                            src: content.verticalLogo
                          }, null, _parent4, _scopeId3));
                          _push4(`<div class="px-5" data-v-3ac29874${_scopeId3}><h3 class="text-xl font-semibold line-clamp-1 mb-1" data-v-3ac29874${_scopeId3}>`);
                          _push4(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                            to: vue_cjs_prod.unref(useNavigatorComicPreview)(content.slug, content._id)
                          }, {
                            default: vue_cjs_prod.withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${serverRenderer.exports.ssrInterpolate(content.comicName)}`);
                              } else {
                                return [
                                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(content.comicName), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</h3><p class="text-primary-gray mb-3 text-base" data-v-3ac29874${_scopeId3}> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(content.newestChapter)}</p><div class="flex items-center" data-v-3ac29874${_scopeId3}><div class="flex items-center mr-2" data-v-3ac29874${_scopeId3}><img class="w-5 h-5 mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_0)} alt="view chapter" data-v-3ac29874${_scopeId3}><span class="text-base text-primary-gray" data-v-3ac29874${_scopeId3}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(content.viewCount))}</span></div><div class="flex items-center" data-v-3ac29874${_scopeId3}><img class="mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_5)} alt="star" data-v-3ac29874${_scopeId3}><span class="text-base" data-v-3ac29874${_scopeId3}>5 </span><span class="text-base text-primary-gray" data-v-3ac29874${_scopeId3}>(${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(content.reviewCount))})</span></div></div></div></div>`);
                        } else {
                          return [
                            vue_cjs_prod.createVNode("div", {
                              class: "flex items-center p-5",
                              onClick: ($event) => navigatorComicPreview(content.slug, content._id)
                            }, [
                              vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                                fil: "cover",
                                class: "aspect-[3/4] w-[75px] h-full relative rounded-2xl",
                                width: 75,
                                height: 100,
                                sizes: "sm:75px 2sm:100px sm:150px md:150px",
                                src: content.verticalLogo
                              }, null, 8, ["src"]),
                              vue_cjs_prod.createVNode("div", { class: "px-5" }, [
                                vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1 mb-1" }, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, {
                                    to: vue_cjs_prod.unref(useNavigatorComicPreview)(content.slug, content._id)
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(content.comicName), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                vue_cjs_prod.createVNode("p", { class: "text-primary-gray mb-3 text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(content.newestChapter), 1),
                                vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                  vue_cjs_prod.createVNode("div", { class: "flex items-center mr-2" }, [
                                    vue_cjs_prod.createVNode("img", {
                                      class: "w-5 h-5 mr-1",
                                      src: _imports_0,
                                      alt: "view chapter"
                                    }),
                                    vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.viewCount)), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                    vue_cjs_prod.createVNode("img", {
                                      class: "mr-1",
                                      src: _imports_5,
                                      alt: "star"
                                    }),
                                    vue_cjs_prod.createVNode("span", { class: "text-base" }, "5 "),
                                    vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, "(" + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.reviewCount)) + ")", 1)
                                  ])
                                ])
                              ])
                            ], 8, ["onClick"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.record.content, (content) => {
                      return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                        key: content.slug,
                        class: "h-[130px]"
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createVNode("div", {
                            class: "flex items-center p-5",
                            onClick: ($event) => navigatorComicPreview(content.slug, content._id)
                          }, [
                            vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                              fil: "cover",
                              class: "aspect-[3/4] w-[75px] h-full relative rounded-2xl",
                              width: 75,
                              height: 100,
                              sizes: "sm:75px 2sm:100px sm:150px md:150px",
                              src: content.verticalLogo
                            }, null, 8, ["src"]),
                            vue_cjs_prod.createVNode("div", { class: "px-5" }, [
                              vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1 mb-1" }, [
                                vue_cjs_prod.createVNode(_component_NuxtLink, {
                                  to: vue_cjs_prod.unref(useNavigatorComicPreview)(content.slug, content._id)
                                }, {
                                  default: vue_cjs_prod.withCtx(() => [
                                    vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(content.comicName), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["to"])
                              ]),
                              vue_cjs_prod.createVNode("p", { class: "text-primary-gray mb-3 text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(content.newestChapter), 1),
                              vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                vue_cjs_prod.createVNode("div", { class: "flex items-center mr-2" }, [
                                  vue_cjs_prod.createVNode("img", {
                                    class: "w-5 h-5 mr-1",
                                    src: _imports_0,
                                    alt: "view chapter"
                                  }),
                                  vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.viewCount)), 1)
                                ]),
                                vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                  vue_cjs_prod.createVNode("img", {
                                    class: "mr-1",
                                    src: _imports_5,
                                    alt: "star"
                                  }),
                                  vue_cjs_prod.createVNode("span", { class: "text-base" }, "5 "),
                                  vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, "(" + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.reviewCount)) + ")", 1)
                                ])
                              ])
                            ])
                          ], 8, ["onClick"])
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><div class="rounded-b-xl shadow-[0_3px_20px_rgba(0,0,0,10%)] bg-white" data-v-3ac29874${_scopeId}><div data-v-3ac29874${_scopeId}>`);
            _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
              to: `/${vue_cjs_prod.unref(TRENDING)}`,
              class: "flex items-center justify-center p-5"
            }, {
              default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span class="text-xl text-primary-gray" data-v-3ac29874${_scopeId2}>Xem t\u1EA5t c\u1EA3</span>`);
                  _push3(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$1), { class: "h-4 w-4 text-primary-gray ml-2" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    vue_cjs_prod.createVNode("span", { class: "text-xl text-primary-gray" }, "Xem t\u1EA5t c\u1EA3"),
                    vue_cjs_prod.createVNode(vue_cjs_prod.unref(render$1), { class: "h-4 w-4 text-primary-gray ml-2" })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></div></div>`);
          } else {
            return [
              vue_cjs_prod.createVNode("div", { class: "px-4 bg-contain" }, [
                vue_cjs_prod.createVNode("div", null, [
                  vue_cjs_prod.createVNode(_component_NuxtLink, { href: "/" }, {
                    default: vue_cjs_prod.withCtx(() => [
                      vue_cjs_prod.createVNode(_component_nuxt_img, {
                        format: "png",
                        quality: "100",
                        class: "w-full",
                        src: "/icons/widgets/trend/img-header.svg",
                        alt: "C\xF3 ch\u1EAFc \u0111\xE2y l\xE0 hot"
                      })
                    ]),
                    _: 1
                  })
                ]),
                vue_cjs_prod.createVNode("div", { class: "bg-white px-2 shadow" }, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(Swiper), {
                    "slides-per-view": 1.3,
                    "space-between": 14,
                    modules: [vue_cjs_prod.unref(Grid)],
                    grid: {
                      rows: 3,
                      fill: "row"
                    }
                  }, {
                    default: vue_cjs_prod.withCtx(() => [
                      (vue_cjs_prod.openBlock(true), vue_cjs_prod.createBlock(vue_cjs_prod.Fragment, null, vue_cjs_prod.renderList(__props.record.content, (content) => {
                        return vue_cjs_prod.openBlock(), vue_cjs_prod.createBlock(vue_cjs_prod.unref(SwiperSlide), {
                          key: content.slug,
                          class: "h-[130px]"
                        }, {
                          default: vue_cjs_prod.withCtx(() => [
                            vue_cjs_prod.createVNode("div", {
                              class: "flex items-center p-5",
                              onClick: ($event) => navigatorComicPreview(content.slug, content._id)
                            }, [
                              vue_cjs_prod.createVNode(_component_shared_mee_toon_img, {
                                fil: "cover",
                                class: "aspect-[3/4] w-[75px] h-full relative rounded-2xl",
                                width: 75,
                                height: 100,
                                sizes: "sm:75px 2sm:100px sm:150px md:150px",
                                src: content.verticalLogo
                              }, null, 8, ["src"]),
                              vue_cjs_prod.createVNode("div", { class: "px-5" }, [
                                vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1 mb-1" }, [
                                  vue_cjs_prod.createVNode(_component_NuxtLink, {
                                    to: vue_cjs_prod.unref(useNavigatorComicPreview)(content.slug, content._id)
                                  }, {
                                    default: vue_cjs_prod.withCtx(() => [
                                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(content.comicName), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["to"])
                                ]),
                                vue_cjs_prod.createVNode("p", { class: "text-primary-gray mb-3 text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(content.newestChapter), 1),
                                vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                  vue_cjs_prod.createVNode("div", { class: "flex items-center mr-2" }, [
                                    vue_cjs_prod.createVNode("img", {
                                      class: "w-5 h-5 mr-1",
                                      src: _imports_0,
                                      alt: "view chapter"
                                    }),
                                    vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.viewCount)), 1)
                                  ]),
                                  vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                                    vue_cjs_prod.createVNode("img", {
                                      class: "mr-1",
                                      src: _imports_5,
                                      alt: "star"
                                    }),
                                    vue_cjs_prod.createVNode("span", { class: "text-base" }, "5 "),
                                    vue_cjs_prod.createVNode("span", { class: "text-base text-primary-gray" }, "(" + vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(content.reviewCount)) + ")", 1)
                                  ])
                                ])
                              ])
                            ], 8, ["onClick"])
                          ]),
                          _: 2
                        }, 1024);
                      }), 128))
                    ]),
                    _: 1
                  }, 8, ["slides-per-view", "modules"])
                ]),
                vue_cjs_prod.createVNode("div", { class: "rounded-b-xl shadow-[0_3px_20px_rgba(0,0,0,10%)] bg-white" }, [
                  vue_cjs_prod.createVNode("div", null, [
                    vue_cjs_prod.createVNode(_component_NuxtLink, {
                      to: `/${vue_cjs_prod.unref(TRENDING)}`,
                      class: "flex items-center justify-center p-5"
                    }, {
                      default: vue_cjs_prod.withCtx(() => [
                        vue_cjs_prod.createVNode("span", { class: "text-xl text-primary-gray" }, "Xem t\u1EA5t c\u1EA3"),
                        vue_cjs_prod.createVNode(vue_cjs_prod.unref(render$1), { class: "h-4 w-4 text-primary-gray ml-2" })
                      ]),
                      _: 1
                    }, 8, ["to"])
                  ])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$j = _sfc_main$k.setup;
_sfc_main$k.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/homepage/Trending.vue");
  return _sfc_setup$j ? _sfc_setup$j(props, ctx) : void 0;
};
const Trending = /* @__PURE__ */ _export_sfc(_sfc_main$k, [["__scopeId", "data-v-3ac29874"]]);
const Trending$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": Trending
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$j = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "Chaplist",
  __ssrInlineRender: true,
  props: {
    slug: String,
    chapterList: Object
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SvgViewChapter = vue_cjs_prod.resolveComponent("SvgViewChapter");
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
        class: "list-chapter overflow-auto",
        style: { "height": "calc(100vh - 400px)" }
      }, _attrs))}><ul><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.chapterList, (chap, cI) => {
        _push(`<li class="flex items-center justify-between py-3 grid grid-cols-1 chapter_list-detail">`);
        if (cI >= 0) {
          _push(`<div><div class="chapter"><a class="text-xl text-white font-bold"> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(chap.chapterNumber)}</a></div><div class="flex justify-between items-center"><div class="text-primary-gray text-base">${serverRenderer.exports.ssrInterpolate(chap.updatedAt)}</div><div class="text-primary-gray text-base flex items-center">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_SvgViewChapter, { class: "w-5 h-5 mb-1" }, null, _parent));
          _push(` ${serverRenderer.exports.ssrInterpolate(chap.view)}</div></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul></div>`);
    };
  }
});
const _sfc_setup$i = _sfc_main$j.setup;
_sfc_main$j.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/manga/Chaplist.vue");
  return _sfc_setup$i ? _sfc_setup$i(props, ctx) : void 0;
};
const Chaplist = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$j
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$i = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ChapterImg",
  __ssrInlineRender: true,
  props: {
    pages: Array
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "pt-24 mx-auto w-full lg:w-[60%] bg-accent-1" }, _attrs))}><!--[-->`);
      serverRenderer.exports.ssrRenderList(__props.pages, (page) => {
        _push(`<div class="relative my-0 h-fit w-full">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
          class: "w-full h-full",
          src: page.linkHD
        }, null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div>`);
    };
  }
});
const _sfc_setup$h = _sfc_main$i.setup;
_sfc_main$i.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/manga/ChapterImg.vue");
  return _sfc_setup$h ? _sfc_setup$h(props, ctx) : void 0;
};
const ChapterImg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$i
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$h = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "ReadMangaFooter",
  __ssrInlineRender: true,
  emits: ["nextProcess"],
  setup(__props, { emit }) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "h-[200px] w-full overflow-hidden py-4 bg-accent-1" }, _attrs))}><div class="mx-auto flex h-full w-full flex-col space-y-4 md:w-1/2"><div class="flex h-full w-full gap-4"><button data-id="prev" class="absolute-center z-[700] h-full w-[20%] border-2 border-dashed border-white/40 px-2 text-white/40 transition-all hover:border-white hover:text-white md:gap-2">`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$4), { "class-name": "inline h-8 w-8" }, null, _parent));
      _push(` Chapter tr\u01B0\u1EDBc </button><button data-id="next" class="absolute-center h-full w-[80%] gap-2 border-2 border-dashed border-white/40 text-white/40 transition-all hover:border-white hover:text-white"> Chapter k\u1EBF ti\u1EBFp `);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$2), { "class-name": "inline-block h-8 w-8" }, null, _parent));
      _push(`</button></div><h1 class="py-4 px-2 text-center text-white/75"> M\u1EB9o: B\u1EA1n c\xF3 th\u1EC3 double tap/click v\xE0o 2 c\u1EA1nh c\u1EE7a m\xE0n h\xECnh \u0111\u1EC3 chuy\u1EC3n chap \u1EDF b\u1EA5t c\u1EE9 v\u1ECB tr\xED n\xE0o \u1EDF ch\u1EBF \u0111\u1ED9 d\u1ECDc! </h1></div></div>`);
    };
  }
});
const _sfc_setup$g = _sfc_main$h.setup;
_sfc_main$h.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/manga/ReadMangaFooter.vue");
  return _sfc_setup$g ? _sfc_setup$g(props, ctx) : void 0;
};
const ReadMangaFooter = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$h
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$g = {
  __name: "welcome",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: "Welcome to Nuxt 3!"
    },
    readDocs: {
      type: String,
      default: "We highly recommend you take a look at the Nuxt documentation, whether you are new or have previous experience with the framework."
    },
    followTwitter: {
      type: String,
      default: "Follow the Nuxt Twitter account to get latest news about releases, new modules, tutorials and tips."
    },
    starGitHub: {
      type: String,
      default: "Nuxt is open source and the code is available on GitHub, feel free to star it, participate in discussions or dive into the source."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.title}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, ;a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1;h4,h5{font-size:inherit;font-weight:inherit}svg{display:block;vertical-align:middle}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white min-h-screen place-content-center flex flex-col items-center justify-center p-8 text-sm sm:text-base" }, _attrs))} data-v-d2e18222><div class="grid grid-cols-3 gap-4 md:gap-8 max-w-5xl w-full z-20" data-v-d2e18222><div class="flex justify-between items-end col-span-3" data-v-d2e18222><a href="https://v3.nuxtjs.org" target="_blank" rel="noopener" class="nuxt-logo" data-v-d2e18222><svg viewBox="0 0 221 65" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-40 text-black dark:text-white" data-v-d2e18222><g clip-path="url(#a)" data-v-d2e18222><path fill="currentColor" d="M82.5623 18.5705h7.3017l15.474 24.7415V18.5705h6.741v35.0576h-7.252L89.3025 28.938v24.6901h-6.7402V18.5705ZM142.207 53.628h-6.282v-3.916c-1.429 2.7559-4.339 4.3076-8.015 4.3076-5.822 0-9.603-4.1069-9.603-10.0175V28.3847h6.282v14.3251c0 3.4558 2.146 5.8592 5.362 5.8592 3.524 0 5.974-2.7044 5.974-6.4099V28.3847h6.282V53.628ZM164.064 53.2289l-6.026-8.4144-6.027 8.4144h-6.69l9.296-13.1723-8.58-12.0709h6.843l5.158 7.2641 5.106-7.2641h6.895l-8.632 12.0709 9.295 13.1723h-6.638ZM183.469 20.7726v7.6116h7.149v5.1593h-7.149v12.5311c0 .4208.17.8245.473 1.1223.303.2978.715.4654 1.144.4661h5.532v5.9547h-4.137c-5.617 0-9.293-3.2062-9.293-8.8109V33.5484h-5.056v-5.1642h3.172c1.479 0 2.34-.8639 2.34-2.2932v-5.3184h5.825Z" data-v-d2e18222></path><path fill-rule="evenodd" clip-rule="evenodd" d="M30.1185 11.5456c-1.8853-3.24168-6.5987-3.24169-8.484 0L1.08737 46.8747c-1.885324 3.2417.47133 7.2938 4.24199 7.2938H21.3695c-1.6112-1.4081-2.2079-3.8441-.9886-5.9341l15.5615-26.675-5.8239-10.0138Z" fill="#80EEC0" data-v-d2e18222></path><path d="M43.1374 19.2952c1.5603-2.6523 5.461-2.6523 7.0212 0l17.0045 28.9057c1.5603 2.6522-.39 5.9676-3.5106 5.9676h-34.009c-3.1206 0-5.0709-3.3154-3.5106-5.9676l17.0045-28.9057ZM209.174 53.8005H198.483c0-1.8514.067-3.4526 0-6.0213h10.641c1.868 0 3.353.1001 4.354-.934 1-1.0341 1.501-2.3351 1.501-3.9029 0-1.8347-.667-3.2191-2.002-4.1532-1.301-.9674-2.985-1.4511-5.054-1.4511h-2.601v-5.2539h2.652c1.701 0 3.119-.4003 4.253-1.2009 1.134-.8006 1.701-1.9849 1.701-3.5527 0-1.301-.434-2.3351-1.301-3.1023-.834-.8007-2.001-1.201-3.503-1.201-1.634 0-2.918.4837-3.853 1.4511-.9.9674-1.401 2.1517-1.501 3.5527h-6.254c.133-3.2358 1.251-5.7877 3.352-7.6558 2.135-1.868 4.887-2.8021 8.256-2.8021 2.402 0 4.42.4337 6.055 1.301 1.668.834 2.919 1.9515 3.753 3.3525.867 1.4011 1.301 2.9523 1.301 4.6536 0 1.9681-.551 3.636-1.651 5.0037-1.068 1.3344-2.402 2.235-4.004 2.7021 1.969.4003 3.57 1.3677 4.804 2.9022 1.234 1.5011 1.852 3.4025 1.852 5.7043 0 1.9347-.468 3.7028-1.402 5.304-.934 1.6012-2.301 2.8855-4.103 3.8529-1.768.9674-3.953 1.4511-6.555 1.4511Z" fill="#00DC82" data-v-d2e18222></path></g><defs data-v-d2e18222><clipPath id="a" data-v-d2e18222><path fill="#fff" d="M0 0h221v65H0z" data-v-d2e18222></path></clipPath></defs></svg></a><a href="https://github.com/nuxt/framework/releases/tag/{{ version }}" target="_blank" rel="noopener" class="flex justify-end pb-1 sm:pb-2" data-v-d2e18222>${serverRenderer.exports.ssrInterpolate(__props.version)}</a><div class="spotlight-wrapper" data-v-d2e18222><div class="fixed z-10 left-0 right-0 spotlight" data-v-d2e18222></div></div></div><div class="col-span-3 rounded p-4 flex flex-col gradient-border" data-v-d2e18222><div class="flex justify-between items-center mb-4" data-v-d2e18222><h4 class="font-medium text-2xl" data-v-d2e18222>Get Started</h4><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d2e18222><path d="M29.4284 31.095C26.9278 33.5955 23.5364 35.0003 20.0001 35.0003C16.4637 35.0003 13.0723 33.5955 10.5717 31.095C8.07118 28.5944 6.66638 25.203 6.66638 21.6667C6.66638 18.1304 8.07118 14.7389 10.5717 12.2383C10.5717 12.2383 11.6667 15 15.0001 16.6667C15.0001 13.3333 15.8334 8.33333 19.9767 5C23.3334 8.33333 26.8167 9.62833 29.4267 12.2383C30.667 13.475 31.6506 14.9446 32.321 16.5626C32.9915 18.1806 33.3355 19.9152 33.3334 21.6667C33.3357 23.418 32.9919 25.1525 32.3218 26.7705C31.6516 28.3886 30.6683 29.8582 29.4284 31.095V31.095Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d2e18222></path><path d="M16.465 26.8683C17.0456 27.4491 17.7604 27.878 18.5462 28.1169C19.3319 28.3559 20.1644 28.3976 20.9701 28.2385C21.7758 28.0793 22.5299 27.7241 23.1657 27.2043C23.8015 26.6845 24.2995 26.016 24.6157 25.2581C24.9318 24.5001 25.0564 23.6759 24.9784 22.8584C24.9004 22.0408 24.6222 21.2551 24.1684 20.5705C23.7146 19.886 23.0992 19.3238 22.3766 18.9336C21.6539 18.5434 20.8463 18.3373 20.025 18.3333L18.3333 23.3333H15C15 24.6133 15.4883 25.8933 16.465 26.8683Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d2e18222></path></svg></div><p class="mb-2" data-v-d2e18222>Remove this welcome page by removing <a class="bg-gray-100 dark:bg-white/10 rounded font-mono p-1 font-bold" data-v-d2e18222>&lt;NuxtWelcome /&gt;</a> tag or creating an <a href="https://v3.nuxtjs.org/docs/directory-structure/app" target="_blank" rel="noopener" class="bg-gray-100 dark:bg-white/10 rounded font-mono p-1 font-bold" data-v-d2e18222>app.vue</a> file.</p></div><a href="https://v3.nuxtjs.org" target="_blank" rel="noopener" class="gradient-border cursor-pointer col-span-3 sm:col-span-1 p-4 flex flex-col" data-v-d2e18222><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d2e18222><path d="M20 10.4217C21.9467 9.12833 24.59 8.33333 27.5 8.33333C30.4117 8.33333 33.0533 9.12833 35 10.4217V32.0883C33.0533 30.795 30.4117 30 27.5 30C24.59 30 21.9467 30.795 20 32.0883M20 10.4217V32.0883V10.4217ZM20 10.4217C18.0533 9.12833 15.41 8.33333 12.5 8.33333C9.59 8.33333 6.94667 9.12833 5 10.4217V32.0883C6.94667 30.795 9.59 30 12.5 30C15.41 30 18.0533 30.795 20 32.0883V10.4217Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-d2e18222></path><rect x="23.3334" y="13.3333" width="8.33334" height="1.66667" rx="0.833333" fill="currentColor" data-v-d2e18222></rect><rect x="8.33337" y="13.3333" width="8.33333" height="1.66667" rx="0.833333" fill="currentColor" data-v-d2e18222></rect><rect x="8.33337" y="18.3333" width="8.33333" height="1.66667" rx="0.833333" fill="currentColor" data-v-d2e18222></rect><rect x="8.33337" y="23.3333" width="8.33333" height="1.66667" rx="0.833334" fill="currentColor" data-v-d2e18222></rect><rect x="23.3334" y="18.3333" width="8.33334" height="1.66667" rx="0.833333" fill="currentColor" data-v-d2e18222></rect><rect x="23.3334" y="23.3333" width="8.33334" height="1.66667" rx="0.833334" fill="currentColor" data-v-d2e18222></rect></svg><h5 class="font-semibold text-xl mt-4" data-v-d2e18222>Documentation</h5><p class="mt-2" data-v-d2e18222>${serverRenderer.exports.ssrInterpolate(__props.readDocs)}</p></a><a href="https://github.com/nuxt/framework" target="_blank" rel="noopener" class="cursor-pointer gradient-border col-span-3 sm:col-span-1 p-4 flex flex-col" data-v-d2e18222><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d2e18222><path fill-rule="evenodd" clip-rule="evenodd" d="M20 3.33333C10.795 3.33333 3.33337 10.8067 3.33337 20.0283C3.33337 27.4033 8.10837 33.6617 14.7317 35.8683C15.565 36.0217 15.8684 35.5067 15.8684 35.0633C15.8684 34.6683 15.855 33.6167 15.8467 32.225C11.21 33.2333 10.2317 29.9867 10.2317 29.9867C9.47504 28.0567 8.38171 27.5433 8.38171 27.5433C6.86837 26.51 8.49671 26.53 8.49671 26.53C10.1684 26.6467 11.0484 28.25 11.0484 28.25C12.535 30.8 14.95 30.0633 15.8984 29.6367C16.0517 28.5583 16.4817 27.8233 16.9584 27.4067C13.2584 26.985 9.36671 25.5517 9.36671 19.155C9.36671 17.3333 10.0167 15.8417 11.0817 14.675C10.91 14.2533 10.3384 12.555 11.245 10.2583C11.245 10.2583 12.645 9.80833 15.8284 11.9683C17.188 11.5975 18.5908 11.4087 20 11.4067C21.4167 11.4133 22.8417 11.5983 24.1734 11.9683C27.355 9.80833 28.7517 10.2567 28.7517 10.2567C29.6617 12.555 29.0884 14.2533 28.9184 14.675C29.985 15.8417 30.6317 17.3333 30.6317 19.155C30.6317 25.5683 26.7334 26.98 23.0217 27.3933C23.62 27.9083 24.1517 28.9267 24.1517 30.485C24.1517 32.715 24.1317 34.5167 24.1317 35.0633C24.1317 35.51 24.4317 36.03 25.2784 35.8667C28.5972 34.7535 31.4823 32.6255 33.5258 29.7834C35.5694 26.9413 36.6681 23.5289 36.6667 20.0283C36.6667 10.8067 29.2034 3.33333 20 3.33333Z" fill="currentColor" data-v-d2e18222></path></svg><h5 class="font-semibold text-xl mt-4" data-v-d2e18222>GitHub</h5><p class="mt-2" data-v-d2e18222>${serverRenderer.exports.ssrInterpolate(__props.starGitHub)}</p></a><a href="https://twitter.com/nuxt_js" target="_blank" rel="noopener" class="cursor-pointer gradient-border col-span-3 sm:col-span-1 p-4 flex flex-col" data-v-d2e18222><svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-d2e18222><path d="M13.8167 33.7557C26.395 33.7557 33.275 23.334 33.275 14.2973C33.275 14.0007 33.275 13.7057 33.255 13.414C34.5937 12.4449 35.7489 11.245 36.6667 9.87066C35.4185 10.424 34.0943 10.7869 32.7384 10.9473C34.1661 10.0924 35.2346 8.74791 35.745 7.164C34.4029 7.96048 32.9345 8.52188 31.4034 8.824C30.3724 7.72694 29.0084 7.00039 27.5228 6.75684C26.0371 6.51329 24.5126 6.76633 23.1852 7.47678C21.8579 8.18723 20.8018 9.31545 20.1805 10.6868C19.5592 12.0581 19.4073 13.596 19.7484 15.0623C17.0294 14.9261 14.3694 14.2195 11.9411 12.9886C9.51285 11.7577 7.37059 10.0299 5.65337 7.91733C4.7789 9.42267 4.51102 11.2047 4.90427 12.9006C5.29751 14.5965 6.32232 16.0788 7.77004 17.0457C6.68214 17.0142 5.61776 16.7215 4.66671 16.1923V16.279C4.66736 17.8578 5.21403 19.3878 6.21404 20.6096C7.21404 21.8313 8.60582 22.6696 10.1534 22.9823C9.14639 23.2569 8.08986 23.2968 7.06504 23.099C7.50198 24.4581 8.35284 25.6467 9.49859 26.4984C10.6443 27.35 12.0277 27.8223 13.455 27.849C12.0369 28.9633 10.413 29.7871 8.67625 30.2732C6.93948 30.7594 5.12391 30.8984 3.33337 30.6823C6.46105 32.6896 10.1004 33.7542 13.8167 33.749" fill="currentColor" data-v-d2e18222></path></svg><h5 class="font-semibold text-xl mt-4" data-v-d2e18222>Twitter</h5><p class="mt-2" data-v-d2e18222>${serverRenderer.exports.ssrInterpolate(__props.followTwitter)}</p></a></div></div>`);
    };
  }
};
const _sfc_setup$f = _sfc_main$g.setup;
_sfc_main$g.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/welcome.vue");
  return _sfc_setup$f ? _sfc_setup$f(props, ctx) : void 0;
};
const welcome = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["__scopeId", "data-v-d2e18222"]]);
const welcome$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": welcome
}, Symbol.toStringTag, { value: "Module" }));
const nuxtErrorBoundary = vue_cjs_prod.defineComponent({
  setup(_props, { slots, emit }) {
    const error = vue_cjs_prod.ref(null);
    useNuxtApp();
    vue_cjs_prod.onErrorCaptured((err) => {
    });
    return () => {
      var _a, _b;
      return error.value ? (_a = slots.error) == null ? void 0 : _a.call(slots, { error }) : (_b = slots.default) == null ? void 0 : _b.call(slots);
    };
  }
});
const nuxtErrorBoundary$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": nuxtErrorBoundary
}, Symbol.toStringTag, { value: "Module" }));
const serverPlaceholder = vue_cjs_prod.defineComponent({
  name: "ServerPlaceholder",
  render() {
    return vue_cjs_prod.createElementBlock("div");
  }
});
const serverPlaceholder$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": serverPlaceholder
}, Symbol.toStringTag, { value: "Module" }));
const nuxtLoadingIndicator = vue_cjs_prod.defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => vue_cjs_prod.h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: `${indicator.progress.value}%`,
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transition: "width 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    });
  }
});
function useLoadingIndicator(opts) {
  const progress = vue_cjs_prod.ref(0);
  const isLoading = vue_cjs_prod.ref(false);
  vue_cjs_prod.computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    isLoading.value = true;
    if (opts.throttle)
      ;
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const nuxtLoadingIndicator$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": nuxtLoadingIndicator
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$f = vue_cjs_prod.defineComponent({
  name: "NuxtPicture",
  mixins: [imageMixin],
  props: {
    legacyFormat: { type: String, default: null },
    imgAttrs: { type: Object, default: null }
  },
  head() {
    if (this.preload === true) {
      const srcKey = typeof this.nSources[1] !== "undefined" ? 1 : 0;
      const link = {
        rel: "preload",
        as: "image",
        imagesrcset: this.nSources[srcKey].srcset
      };
      if (typeof this.nSources[srcKey].sizes !== "undefined") {
        link.imagesizes = this.nSources[srcKey].sizes;
      }
      return {
        link: [link]
      };
    }
    return {};
  },
  computed: {
    isTransparent() {
      return ["png", "webp", "gif"].includes(this.originalFormat);
    },
    originalFormat() {
      return getFileExtension(this.src);
    },
    nFormat() {
      if (this.format) {
        return this.format;
      }
      if (this.originalFormat === "svg") {
        return "svg";
      }
      return "webp";
    },
    nLegacyFormat() {
      if (this.legacyFormat) {
        return this.legacyFormat;
      }
      const formats = {
        webp: this.isTransparent ? "png" : "jpeg",
        svg: "png"
      };
      return formats[this.nFormat] || this.originalFormat;
    },
    nSources() {
      if (this.nFormat === "svg") {
        return [{
          srcset: this.src
        }];
      }
      const formats = this.nLegacyFormat !== this.nFormat ? [this.nLegacyFormat, this.nFormat] : [this.nFormat];
      const sources = formats.map((format) => {
        const { srcset, sizes, src } = this.$img.getSizes(this.src, {
          ...this.nOptions,
          sizes: this.sizes || this.$img.options.screens,
          modifiers: {
            ...this.nModifiers,
            format
          }
        });
        return {
          src,
          type: `image/${format}`,
          sizes,
          srcset
        };
      });
      return sources;
    }
  },
  created() {
    if (process.static) {
      this.nSources;
    }
  }
});
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<picture${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
    key: _ctx.nSources[0].src
  }, _attrs))}>`);
  if (_ctx.nSources[1]) {
    _push(`<source${serverRenderer.exports.ssrRenderAttr("type", _ctx.nSources[1].type)}${serverRenderer.exports.ssrRenderAttr("srcset", _ctx.nSources[1].srcset)}${serverRenderer.exports.ssrRenderAttr("sizes", _ctx.nSources[1].sizes)}>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<img${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ ..._ctx.nImgAttrs, ..._ctx.imgAttrs }, {
    src: _ctx.nSources[0].src,
    srcset: _ctx.nSources[0].srcset,
    sizes: _ctx.nSources[0].sizes
  }))}></picture>`);
}
const _sfc_setup$e = _sfc_main$f.setup;
_sfc_main$f.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/image-edge/dist/runtime/components/nuxt-picture.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const nuxtPicture = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["ssrRender", _sfc_ssrRender$4]]);
const nuxtPicture$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": nuxtPicture
}, Symbol.toStringTag, { value: "Module" }));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ChapterRepresent;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicChapterTab;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicTab;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicsRelated;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return CommentComic$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return NuxtLoadingBar;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheFooter$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheHeader;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheHome;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return VisitedComic;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return CateList;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicItem;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return PageLoading;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return SearchLoading;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Catelog$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return NewStory;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return RepresentCategory;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Spotlight;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Trending$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return HomeLoading;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return BannerBar;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return MeeToonImg;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicHorizontal;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return Chaplist;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ChapterImg;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ReadMangaFooter;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return welcome$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return layout;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtErrorBoundary$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return clientOnly;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return serverPlaceholder$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtLink;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtLoadingIndicator$1;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtImg;
}).then((c) => c.default || c));
vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtPicture$1;
}).then((c) => c.default || c));
const _sfc_main$e = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtPage = vue_cjs_prod.resolveComponent("NuxtPage");
      _push(`<!--[-->`);
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(_sfc_main$x), null, null, _parent));
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$d = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = vue_cjs_prod.createApp(_sfc_main$z);
    vueApp.component("App", _sfc_main$e);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      ssrContext.error = ssrContext.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);
const __nuxt_component_0_lazy$2 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheFooter$1;
}));
const _sfc_main$d = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  const _component_LazyTheFooter = __nuxt_component_0_lazy$2;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "_layout max-w-[450px] md:max-w-[750px] mx-auto h-[100vh]" }, _attrs))}>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(serverRenderer.exports.ssrRenderComponent(_component_LazyTheFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$c = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["ssrRender", _sfc_ssrRender$3]]);
const _default$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _default
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_0_lazy$1 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheHeader;
}));
const _sfc_main$c = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_LazyTheHeader = __nuxt_component_0_lazy$1;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "_layout max-w-[450px] md:max-w-[750px] mx-auto h-[100vh]" }, _attrs))}>`);
  _push(serverRenderer.exports.ssrRenderComponent(_component_LazyTheHeader, null, null, _parent));
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(`</div>`);
}
const _sfc_setup$b = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/manga.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const manga = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["ssrRender", _sfc_ssrRender$2]]);
const manga$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": manga
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_0_lazy = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheFooter$1;
}));
const _sfc_main$b = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_LazyTheFooter = __nuxt_component_0_lazy;
  _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "_layout max-w-[450px] md:max-w-[750px] mx-auto h-[100vh]" }, _attrs))}>`);
  serverRenderer.exports.ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
  _push(serverRenderer.exports.ssrRenderComponent(_component_LazyTheFooter, null, null, _parent));
  _push(`</div>`);
}
const _sfc_setup$a = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/menu.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const menu = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["ssrRender", _sfc_ssrRender$1]]);
const menu$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": menu
}, Symbol.toStringTag, { value: "Module" }));
const BMP = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 2) === "BM";
  },
  calculate(buffer) {
    return {
      height: Math.abs(buffer.readInt32LE(22)),
      width: buffer.readUInt32LE(18)
    };
  }
};
const TYPE_ICON = 1;
const SIZE_HEADER$1 = 2 + 2 + 2;
const SIZE_IMAGE_ENTRY = 1 + 1 + 1 + 1 + 2 + 2 + 4 + 4;
function getSizeFromOffset(buffer, offset) {
  const value = buffer.readUInt8(offset);
  return value === 0 ? 256 : value;
}
function getImageSize$1(buffer, imageIndex) {
  const offset = SIZE_HEADER$1 + imageIndex * SIZE_IMAGE_ENTRY;
  return {
    height: getSizeFromOffset(buffer, offset + 1),
    width: getSizeFromOffset(buffer, offset)
  };
}
const ICO = {
  validate(buffer) {
    if (buffer.readUInt16LE(0) !== 0) {
      return false;
    }
    return buffer.readUInt16LE(2) === TYPE_ICON;
  },
  calculate(buffer) {
    const nbImages = buffer.readUInt16LE(4);
    const imageSize = getImageSize$1(buffer, 0);
    if (nbImages === 1) {
      return imageSize;
    }
    const imgs = [imageSize];
    for (let imageIndex = 1; imageIndex < nbImages; imageIndex += 1) {
      imgs.push(getImageSize$1(buffer, imageIndex));
    }
    const result = {
      height: imageSize.height,
      images: imgs,
      width: imageSize.width
    };
    return result;
  }
};
const TYPE_CURSOR = 2;
const CUR = {
  validate(buffer) {
    if (buffer.readUInt16LE(0) !== 0) {
      return false;
    }
    return buffer.readUInt16LE(2) === TYPE_CURSOR;
  },
  calculate(buffer) {
    return ICO.calculate(buffer);
  }
};
const DDS = {
  validate(buffer) {
    return buffer.readUInt32LE(0) === 542327876;
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32LE(12),
      width: buffer.readUInt32LE(16)
    };
  }
};
const gifRegexp = /^GIF8[79]a/;
const GIF = {
  validate(buffer) {
    const signature = buffer.toString("ascii", 0, 6);
    return gifRegexp.test(signature);
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt16LE(8),
      width: buffer.readUInt16LE(6)
    };
  }
};
const SIZE_HEADER = 4 + 4;
const FILE_LENGTH_OFFSET = 4;
const ENTRY_LENGTH_OFFSET = 4;
const ICON_TYPE_SIZE = {
  ICON: 32,
  "ICN#": 32,
  "icm#": 16,
  icm4: 16,
  icm8: 16,
  "ics#": 16,
  ics4: 16,
  ics8: 16,
  is32: 16,
  s8mk: 16,
  icp4: 16,
  icl4: 32,
  icl8: 32,
  il32: 32,
  l8mk: 32,
  icp5: 32,
  ic11: 32,
  ich4: 48,
  ich8: 48,
  ih32: 48,
  h8mk: 48,
  icp6: 64,
  ic12: 32,
  it32: 128,
  t8mk: 128,
  ic07: 128,
  ic08: 256,
  ic13: 256,
  ic09: 512,
  ic14: 512,
  ic10: 1024
};
function readImageHeader(buffer, imageOffset) {
  const imageLengthOffset = imageOffset + ENTRY_LENGTH_OFFSET;
  return [
    buffer.toString("ascii", imageOffset, imageLengthOffset),
    buffer.readUInt32BE(imageLengthOffset)
  ];
}
function getImageSize(type) {
  const size = ICON_TYPE_SIZE[type];
  return { width: size, height: size, type };
}
const ICNS = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 4) === "icns";
  },
  calculate(buffer) {
    const bufferLength = buffer.length;
    const fileLength = buffer.readUInt32BE(FILE_LENGTH_OFFSET);
    let imageOffset = SIZE_HEADER;
    let imageHeader = readImageHeader(buffer, imageOffset);
    let imageSize = getImageSize(imageHeader[0]);
    imageOffset += imageHeader[1];
    if (imageOffset === fileLength) {
      return imageSize;
    }
    const result = {
      height: imageSize.height,
      images: [imageSize],
      width: imageSize.width
    };
    while (imageOffset < fileLength && imageOffset < bufferLength) {
      imageHeader = readImageHeader(buffer, imageOffset);
      imageSize = getImageSize(imageHeader[0]);
      imageOffset += imageHeader[1];
      result.images.push(imageSize);
    }
    return result;
  }
};
const J2C = {
  validate(buffer) {
    return buffer.toString("hex", 0, 4) === "ff4fff51";
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32BE(12),
      width: buffer.readUInt32BE(8)
    };
  }
};
const BoxTypes = {
  ftyp: "66747970",
  ihdr: "69686472",
  jp2h: "6a703268",
  jp__: "6a502020",
  rreq: "72726571",
  xml_: "786d6c20"
};
const calculateRREQLength = (box) => {
  const unit = box.readUInt8(0);
  let offset = 1 + 2 * unit;
  const numStdFlags = box.readUInt16BE(offset);
  const flagsLength = numStdFlags * (2 + unit);
  offset = offset + 2 + flagsLength;
  const numVendorFeatures = box.readUInt16BE(offset);
  const featuresLength = numVendorFeatures * (16 + unit);
  return offset + 2 + featuresLength;
};
const parseIHDR = (box) => {
  return {
    height: box.readUInt32BE(4),
    width: box.readUInt32BE(8)
  };
};
const JP2 = {
  validate(buffer) {
    const signature = buffer.toString("hex", 4, 8);
    const signatureLength = buffer.readUInt32BE(0);
    if (signature !== BoxTypes.jp__ || signatureLength < 1) {
      return false;
    }
    const ftypeBoxStart = signatureLength + 4;
    const ftypBoxLength = buffer.readUInt32BE(signatureLength);
    const ftypBox = buffer.slice(ftypeBoxStart, ftypeBoxStart + ftypBoxLength);
    return ftypBox.toString("hex", 0, 4) === BoxTypes.ftyp;
  },
  calculate(buffer) {
    const signatureLength = buffer.readUInt32BE(0);
    const ftypBoxLength = buffer.readUInt16BE(signatureLength + 2);
    let offset = signatureLength + 4 + ftypBoxLength;
    const nextBoxType = buffer.toString("hex", offset, offset + 4);
    switch (nextBoxType) {
      case BoxTypes.rreq:
        const MAGIC = 4;
        offset = offset + 4 + MAGIC + calculateRREQLength(buffer.slice(offset + 4));
        return parseIHDR(buffer.slice(offset + 8, offset + 24));
      case BoxTypes.jp2h:
        return parseIHDR(buffer.slice(offset + 8, offset + 24));
      default:
        throw new TypeError("Unsupported header found: " + buffer.toString("ascii", offset, offset + 4));
    }
  }
};
function readUInt(buffer, bits, offset, isBigEndian) {
  offset = offset || 0;
  const endian = isBigEndian ? "BE" : "LE";
  const methodName = "readUInt" + bits + endian;
  return buffer[methodName].call(buffer, offset);
}
const EXIF_MARKER = "45786966";
const APP1_DATA_SIZE_BYTES = 2;
const EXIF_HEADER_BYTES = 6;
const TIFF_BYTE_ALIGN_BYTES = 2;
const BIG_ENDIAN_BYTE_ALIGN = "4d4d";
const LITTLE_ENDIAN_BYTE_ALIGN = "4949";
const IDF_ENTRY_BYTES = 12;
const NUM_DIRECTORY_ENTRIES_BYTES = 2;
function isEXIF(buffer) {
  return buffer.toString("hex", 2, 6) === EXIF_MARKER;
}
function extractSize(buffer, index2) {
  return {
    height: buffer.readUInt16BE(index2),
    width: buffer.readUInt16BE(index2 + 2)
  };
}
function extractOrientation(exifBlock, isBigEndian) {
  const idfOffset = 8;
  const offset = EXIF_HEADER_BYTES + idfOffset;
  const idfDirectoryEntries = readUInt(exifBlock, 16, offset, isBigEndian);
  for (let directoryEntryNumber = 0; directoryEntryNumber < idfDirectoryEntries; directoryEntryNumber++) {
    const start = offset + NUM_DIRECTORY_ENTRIES_BYTES + directoryEntryNumber * IDF_ENTRY_BYTES;
    const end = start + IDF_ENTRY_BYTES;
    if (start > exifBlock.length) {
      return;
    }
    const block = exifBlock.slice(start, end);
    const tagNumber = readUInt(block, 16, 0, isBigEndian);
    if (tagNumber === 274) {
      const dataFormat = readUInt(block, 16, 2, isBigEndian);
      if (dataFormat !== 3) {
        return;
      }
      const numberOfComponents = readUInt(block, 32, 4, isBigEndian);
      if (numberOfComponents !== 1) {
        return;
      }
      return readUInt(block, 16, 8, isBigEndian);
    }
  }
}
function validateExifBlock(buffer, index2) {
  const exifBlock = buffer.slice(APP1_DATA_SIZE_BYTES, index2);
  const byteAlign = exifBlock.toString("hex", EXIF_HEADER_BYTES, EXIF_HEADER_BYTES + TIFF_BYTE_ALIGN_BYTES);
  const isBigEndian = byteAlign === BIG_ENDIAN_BYTE_ALIGN;
  const isLittleEndian = byteAlign === LITTLE_ENDIAN_BYTE_ALIGN;
  if (isBigEndian || isLittleEndian) {
    return extractOrientation(exifBlock, isBigEndian);
  }
}
function validateBuffer(buffer, index2) {
  if (index2 > buffer.length) {
    throw new TypeError("Corrupt JPG, exceeded buffer limits");
  }
  if (buffer[index2] !== 255) {
    throw new TypeError("Invalid JPG, marker table corrupted");
  }
}
const JPG = {
  validate(buffer) {
    const SOIMarker = buffer.toString("hex", 0, 2);
    return SOIMarker === "ffd8";
  },
  calculate(buffer) {
    buffer = buffer.slice(4);
    let orientation;
    let next;
    while (buffer.length) {
      const i = buffer.readUInt16BE(0);
      if (isEXIF(buffer)) {
        orientation = validateExifBlock(buffer, i);
      }
      validateBuffer(buffer, i);
      next = buffer[i + 1];
      if (next === 192 || next === 193 || next === 194) {
        const size = extractSize(buffer, i + 5);
        if (!orientation) {
          return size;
        }
        return {
          height: size.height,
          orientation,
          width: size.width
        };
      }
      buffer = buffer.slice(i + 2);
    }
    throw new TypeError("Invalid JPG, no size found");
  }
};
const SIGNATURE = "KTX 11";
const KTX = {
  validate(buffer) {
    return SIGNATURE === buffer.toString("ascii", 1, 7);
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32LE(40),
      width: buffer.readUInt32LE(36)
    };
  }
};
const pngSignature = "PNG\r\n\n";
const pngImageHeaderChunkName = "IHDR";
const pngFriedChunkName = "CgBI";
const PNG = {
  validate(buffer) {
    if (pngSignature === buffer.toString("ascii", 1, 8)) {
      let chunkName = buffer.toString("ascii", 12, 16);
      if (chunkName === pngFriedChunkName) {
        chunkName = buffer.toString("ascii", 28, 32);
      }
      if (chunkName !== pngImageHeaderChunkName) {
        throw new TypeError("Invalid PNG");
      }
      return true;
    }
    return false;
  },
  calculate(buffer) {
    if (buffer.toString("ascii", 12, 16) === pngFriedChunkName) {
      return {
        height: buffer.readUInt32BE(36),
        width: buffer.readUInt32BE(32)
      };
    }
    return {
      height: buffer.readUInt32BE(20),
      width: buffer.readUInt32BE(16)
    };
  }
};
const PNMTypes = {
  P1: "pbm/ascii",
  P2: "pgm/ascii",
  P3: "ppm/ascii",
  P4: "pbm",
  P5: "pgm",
  P6: "ppm",
  P7: "pam",
  PF: "pfm"
};
const Signatures = Object.keys(PNMTypes);
const handlers = {
  default: (lines) => {
    let dimensions = [];
    while (lines.length > 0) {
      const line = lines.shift();
      if (line[0] === "#") {
        continue;
      }
      dimensions = line.split(" ");
      break;
    }
    if (dimensions.length === 2) {
      return {
        height: parseInt(dimensions[1], 10),
        width: parseInt(dimensions[0], 10)
      };
    } else {
      throw new TypeError("Invalid PNM");
    }
  },
  pam: (lines) => {
    const size = {};
    while (lines.length > 0) {
      const line = lines.shift();
      if (line.length > 16 || line.charCodeAt(0) > 128) {
        continue;
      }
      const [key, value] = line.split(" ");
      if (key && value) {
        size[key.toLowerCase()] = parseInt(value, 10);
      }
      if (size.height && size.width) {
        break;
      }
    }
    if (size.height && size.width) {
      return {
        height: size.height,
        width: size.width
      };
    } else {
      throw new TypeError("Invalid PAM");
    }
  }
};
const PNM = {
  validate(buffer) {
    const signature = buffer.toString("ascii", 0, 2);
    return Signatures.includes(signature);
  },
  calculate(buffer) {
    const signature = buffer.toString("ascii", 0, 2);
    const type = PNMTypes[signature];
    const lines = buffer.toString("ascii", 3).split(/[\r\n]+/);
    const handler = handlers[type] || handlers.default;
    return handler(lines);
  }
};
const PSD = {
  validate(buffer) {
    return buffer.toString("ascii", 0, 4) === "8BPS";
  },
  calculate(buffer) {
    return {
      height: buffer.readUInt32BE(14),
      width: buffer.readUInt32BE(18)
    };
  }
};
const svgReg = /<svg\s([^>"']|"[^"]*"|'[^']*')*>/;
const extractorRegExps = {
  height: /\sheight=(['"])([^%]+?)\1/,
  root: svgReg,
  viewbox: /\sviewBox=(['"])(.+?)\1/,
  width: /\swidth=(['"])([^%]+?)\1/
};
const INCH_CM = 2.54;
const units = {
  cm: 96 / INCH_CM,
  em: 16,
  ex: 8,
  m: 96 / INCH_CM * 100,
  mm: 96 / INCH_CM / 10,
  pc: 96 / 72 / 12,
  pt: 96 / 72
};
function parseLength(len) {
  const m = /([0-9.]+)([a-z]*)/.exec(len);
  if (!m) {
    return void 0;
  }
  return Math.round(parseFloat(m[1]) * (units[m[2]] || 1));
}
function parseViewbox(viewbox) {
  const bounds = viewbox.split(" ");
  return {
    height: parseLength(bounds[3]),
    width: parseLength(bounds[2])
  };
}
function parseAttributes(root) {
  const width = root.match(extractorRegExps.width);
  const height = root.match(extractorRegExps.height);
  const viewbox = root.match(extractorRegExps.viewbox);
  return {
    height: height && parseLength(height[2]),
    viewbox: viewbox && parseViewbox(viewbox[2]),
    width: width && parseLength(width[2])
  };
}
function calculateByDimensions(attrs) {
  return {
    height: attrs.height,
    width: attrs.width
  };
}
function calculateByViewbox(attrs, viewbox) {
  const ratio = viewbox.width / viewbox.height;
  if (attrs.width) {
    return {
      height: Math.floor(attrs.width / ratio),
      width: attrs.width
    };
  }
  if (attrs.height) {
    return {
      height: attrs.height,
      width: Math.floor(attrs.height * ratio)
    };
  }
  return {
    height: viewbox.height,
    width: viewbox.width
  };
}
const SVG = {
  validate(buffer) {
    const str = String(buffer);
    return svgReg.test(str);
  },
  calculate(buffer) {
    const root = buffer.toString("utf8").match(extractorRegExps.root);
    if (root) {
      const attrs = parseAttributes(root[0]);
      if (attrs.width && attrs.height) {
        return calculateByDimensions(attrs);
      }
      if (attrs.viewbox) {
        return calculateByViewbox(attrs, attrs.viewbox);
      }
    }
    throw new TypeError("Invalid SVG");
  }
};
function calculateExtended(buffer) {
  return {
    height: 1 + buffer.readUIntLE(7, 3),
    width: 1 + buffer.readUIntLE(4, 3)
  };
}
function calculateLossless(buffer) {
  return {
    height: 1 + ((buffer[4] & 15) << 10 | buffer[3] << 2 | (buffer[2] & 192) >> 6),
    width: 1 + ((buffer[2] & 63) << 8 | buffer[1])
  };
}
function calculateLossy(buffer) {
  return {
    height: buffer.readInt16LE(8) & 16383,
    width: buffer.readInt16LE(6) & 16383
  };
}
const WEBP = {
  validate(buffer) {
    const riffHeader = buffer.toString("ascii", 0, 4) === "RIFF";
    const webpHeader = buffer.toString("ascii", 8, 12) === "WEBP";
    const vp8Header = buffer.toString("ascii", 12, 15) === "VP8";
    return riffHeader && webpHeader && vp8Header;
  },
  calculate(buffer) {
    const chunkHeader = buffer.toString("ascii", 12, 16);
    buffer = buffer.slice(20, 30);
    if (chunkHeader === "VP8X") {
      const extendedHeader = buffer[0];
      const validStart = (extendedHeader & 192) === 0;
      const validEnd = (extendedHeader & 1) === 0;
      if (validStart && validEnd) {
        return calculateExtended(buffer);
      } else {
        throw new TypeError("Invalid WebP");
      }
    }
    if (chunkHeader === "VP8 " && buffer[0] !== 47) {
      return calculateLossy(buffer);
    }
    const signature = buffer.toString("hex", 3, 6);
    if (chunkHeader === "VP8L" && signature !== "9d012a") {
      return calculateLossless(buffer);
    }
    throw new TypeError("Invalid WebP");
  }
};
const typeHandlers = {
  bmp: BMP,
  cur: CUR,
  dds: DDS,
  gif: GIF,
  icns: ICNS,
  ico: ICO,
  j2c: J2C,
  jp2: JP2,
  jpg: JPG,
  ktx: KTX,
  png: PNG,
  pnm: PNM,
  psd: PSD,
  svg: SVG,
  webp: WEBP
};
const getMimeType = (type) => {
  if (type === "svg") {
    return "image/svg+xml";
  }
  return `image/${type}`;
};
const keys = Object.keys(typeHandlers);
const firstBytes = {
  56: "psd",
  66: "bmp",
  68: "dds",
  71: "gif",
  73: "tiff",
  77: "tiff",
  82: "webp",
  105: "icns",
  137: "png",
  255: "jpg"
};
function detector(buffer) {
  const byte = buffer[0];
  if (byte in firstBytes) {
    const type = firstBytes[byte];
    if (typeHandlers[type].validate(buffer)) {
      return type;
    }
  }
  const finder = (key) => typeHandlers[key].validate(buffer);
  return keys.find(finder);
}
function lookup(buffer, filepath) {
  const type = detector(buffer);
  if (type && type in typeHandlers) {
    const size = typeHandlers[type].calculate(buffer, filepath);
    if (size !== void 0) {
      size.type = type;
      size.mimeType = getMimeType(type);
      return size;
    }
  }
  throw new TypeError("unsupported file type: " + type + " (file: " + filepath + ")");
}
function imageMeta(input) {
  if (Buffer.isBuffer(input)) {
    return lookup(input);
  }
  throw new Error("Input should be buffer!");
}
const types = Object.keys(typeHandlers);
const index$3 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  imageMeta,
  types
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy$3 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicItem;
}));
const _sfc_main$a = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const params = route.params;
    vue_cjs_prod.ref(params.slug);
    const loading = vue_cjs_prod.ref(false);
    const comics = useState("comics", "$qCqTMbX8SL");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LazyCategorysComicItem = __nuxt_component_1_lazy$3;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2 flex items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$6,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #Danh m\u1EE5c truy\u1EC7n </div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/tim-kiem",
        class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_1$5,
                alt: "search"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap p-4 bg-white">`);
      _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$O, { categories: vue_cjs_prod.unref(categories) }, null, _parent));
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, { class: "w-[150px] h-[50px]" }, null, _parent));
      } else {
        _push(`<section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyCategorysComicItem, { comics: vue_cjs_prod.unref(comics) }, null, _parent));
        _push(`</section>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$9 = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/danh-muc/[slug].vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _slug_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$a
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy$2 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return TheHome;
}));
const _sfc_main$9 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_NuxtLayout = __nuxt_component_0$1;
  const _component_LazyTheHome = __nuxt_component_1_lazy$2;
  _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLayout, _attrs, {
    default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(serverRenderer.exports.ssrRenderComponent(_component_LazyTheHome, null, null, _parent2, _scopeId));
      } else {
        return [
          vue_cjs_prod.createVNode(_component_LazyTheHome)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$8 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const index$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["ssrRender", _sfc_ssrRender]]);
const index$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": index$1
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy$1 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ComicItem;
}));
const _sfc_main$8 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const params = route.params;
    vue_cjs_prod.ref(params.slug);
    const loading = vue_cjs_prod.ref(false);
    const comics = useState("comics", "$9eQryIJETV");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_LazyCategorysComicItem = __nuxt_component_1_lazy$1;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2 flex items-center"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$6,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #Danh m\u1EE5c truy\u1EC7n </div>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/tim-kiem",
        class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_1$5,
                alt: "search"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex flex-wrap p-4 bg-white">`);
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, { class: "w-[150px] h-[50px]" }, null, _parent));
      } else {
        _push(`<section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyCategorysComicItem, { comics: vue_cjs_prod.unref(comics) }, null, _parent));
        _push(`</section>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tag/[slug].vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$8
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$7 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const refInput = vue_cjs_prod.ref("");
    const debounced = useDebounce(refInput, 200);
    const searchData = vue_cjs_prod.ref([]);
    const loading = vue_cjs_prod.ref(true);
    const comicNameSuggestion = [
      "L\u1EE5c Cung Phong Hoa",
      "Daddy c\u1EE7a con \u0111\xE2u",
      "C\xF4 V\u1EE3 C\xE2m",
      "C\xF4 v\u1EE3 \u0111\xE1ng y\xEAu",
      "luy\u1EBFn ph\xE2n c\xF4ng l\u01B0\u1EE3c",
      "th\u1EA1ch thi\u1EBFu hi\u1EC7p",
      "boss x\u1EA5u xa",
      "t\u1ED5ng t\xE0i",
      "tr\xF3i ch\u1EB7t tr\xE1i tim",
      "long tr\xF9 k\u1EF7"
    ];
    vue_cjs_prod.watchEffect(async () => {
      loading.value = true;
      try {
        searchData.value = await $fetch("/api/comic/search", {
          params: {
            q: debounced.value
          }
        });
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_CommonSearchLoading = _sfc_main$N;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh] w-full" }, _attrs))}><div class="flex justify-between">`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "mx-2 my-2"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$5)} alt=""${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$5,
                alt: ""
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex w-[90%] relative mx-2 my-2"><div class="absolute top-1 left-1"><img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$4)} alt=""></div><input${serverRenderer.exports.ssrRenderAttr("value", refInput.value)} class="search-input" placeholder="Nh\u1EADp n\u1ED9i dung t\xECm ki\u1EBFm...">`);
      if (refInput.value.length > 0) {
        _push(`<img class="w-8 h-8 text-primary-gray absolute right-5 top-2.5"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$4)} alt="">`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><section class="bg-white h-[calc(100vh_-_44px)] overflow-auto scrollbar-hide"><h2 class="font-bold text-2xl text-black p-4"> #T\u1EEB kho\xE1 Hot </h2><div class="flex flex-wrap px-5"><!--[-->`);
      serverRenderer.exports.ssrRenderList(comicNameSuggestion, (comicName) => {
        _push(`<span class="search-hotkey mx-4 my-2">${serverRenderer.exports.ssrInterpolate(comicName)}</span>`);
      });
      _push(`<!--]--></div><h2 class="font-bold text-2xl text-black p-4"> Truy\u1EC7n tranh (${serverRenderer.exports.ssrInterpolate(searchData.value.length ? searchData.value.length : 0)}) </h2>`);
      if (loading.value) {
        _push(serverRenderer.exports.ssrRenderComponent(_component_CommonSearchLoading, { class: "w-16 h-16" }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (searchData.value && searchData.value.length > 0 && !loading.value) {
        _push(`<div class="result grid grid-cols-1 md:grid-cols-2 overflow-y-scroll scrollbar-hide"><!--[-->`);
        serverRenderer.exports.ssrRenderList(searchData.value, (comic) => {
          _push(`<div class="p-4 col-span-1">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            class: "flex items-center",
            to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div class="relative"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
                  width: 75,
                  height: 100,
                  class: "rounded-xl w-[75px] h-[100px] object-cover",
                  src: comic.verticalLogo
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "width": "calc(100% - 102px)" })}"${_scopeId}><h3 class="text-xl font-semibold line-clamp-1 mb-1"${_scopeId}>`);
                _push2(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
                  to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
                }, {
                  default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${serverRenderer.exports.ssrInterpolate(comic.comicName)}`);
                    } else {
                      return [
                        vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</h3><span class="line-clamp-2 text-primary-gray text-base"${_scopeId}>${serverRenderer.exports.ssrInterpolate(comic.description)}</span><p class="text-background my-2 text-base"${_scopeId}> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comic.newestChapter)}</p><div class="flex items-center"${_scopeId}><div class="text-primary-gray mb-3 text-base flex items-center mr-4"${_scopeId}><img class="mr-1 w-6"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$3)} alt=""${_scopeId}><span${_scopeId}>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(comic.viewCount))}</span></div><div class="text-primary-gray mb-3 text-base flex items-center"${_scopeId}><img class="mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$2)} alt=""${_scopeId}><span${_scopeId}> (${serverRenderer.exports.ssrInterpolate(comic.reviewCount)}) </span></div></div></div>`);
              } else {
                return [
                  vue_cjs_prod.createVNode("div", { class: "relative" }, [
                    vue_cjs_prod.createVNode(_component_SharedMeeToonImg, {
                      width: 75,
                      height: 100,
                      class: "rounded-xl w-[75px] h-[100px] object-cover",
                      src: comic.verticalLogo
                    }, null, 8, ["src"])
                  ]),
                  vue_cjs_prod.createVNode("div", {
                    class: "px-5",
                    style: { "width": "calc(100% - 102px)" }
                  }, [
                    vue_cjs_prod.createVNode("h3", { class: "text-xl font-semibold line-clamp-1 mb-1" }, [
                      vue_cjs_prod.createVNode(_component_NuxtLink, {
                        to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
                      }, {
                        default: vue_cjs_prod.withCtx(() => [
                          vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    vue_cjs_prod.createVNode("span", { class: "line-clamp-2 text-primary-gray text-base" }, vue_cjs_prod.toDisplayString(comic.description), 1),
                    vue_cjs_prod.createVNode("p", { class: "text-background my-2 text-base" }, " Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString(comic.newestChapter), 1),
                    vue_cjs_prod.createVNode("div", { class: "flex items-center" }, [
                      vue_cjs_prod.createVNode("div", { class: "text-primary-gray mb-3 text-base flex items-center mr-4" }, [
                        vue_cjs_prod.createVNode("img", {
                          class: "mr-1 w-6",
                          src: _imports_2$3,
                          alt: ""
                        }),
                        vue_cjs_prod.createVNode("span", null, vue_cjs_prod.toDisplayString(vue_cjs_prod.unref(convertUnit)(comic.viewCount)), 1)
                      ]),
                      vue_cjs_prod.createVNode("div", { class: "text-primary-gray mb-3 text-base flex items-center" }, [
                        vue_cjs_prod.createVNode("img", {
                          class: "mr-1",
                          src: _imports_3$2,
                          alt: ""
                        }),
                        vue_cjs_prod.createVNode("span", null, " (" + vue_cjs_prod.toDisplayString(comic.reviewCount) + ") ", 1)
                      ])
                    ])
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tim-kiem/index.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const index = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$7
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$6 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "trending",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: comics, pending } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch("/api/trending", "$xWIUkM9LCR")), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      if (vue_cjs_prod.unref(pending)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$N, vue_cjs_prod.mergeProps({ class: "w-[150px] h-[50px]" }, _attrs), null, _parent));
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "bg-white h-[100vh]" }, _attrs))}><div class="flex justify-between justify-center" style="${serverRenderer.exports.ssrRenderStyle({ "box-shadow": "rgb(242 242 242) 0 -1px 0 inset" })}">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "mx-2 my-2 flex items-center"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$6)} alt="back"${_scopeId}>`);
            } else {
              return [
                vue_cjs_prod.createVNode("img", {
                  src: _imports_0$6,
                  alt: "back"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="flex items-center justify-center w-[70%] mx-2 my-2 text-4xl text-black font-semibold"> #C\xF3 ch\u1EAFc l\xE0 HOT \u0111\xE2y </div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center mr-2 h-[40px] w-[30px] mx-2 my-2 rounded-2xl text-white"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_1$5)} alt="search"${_scopeId}>`);
            } else {
              return [
                vue_cjs_prod.createVNode("img", {
                  src: _imports_1$5,
                  alt: "search"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="flex flex-wrap bg-white"><section class="mt-4 overflow-auto scrollbar-hide" style="${serverRenderer.exports.ssrRenderStyle({ "height": "calc(100vh - 50px)" })}"><!--[-->`);
        serverRenderer.exports.ssrRenderList(vue_cjs_prod.unref(comics), (comic, id) => {
          _push(`<div class="p-4 col-span-1 flex items-center">`);
          if (id === 0) {
            _push(`<div class="text-4xl px-4 text-red-500">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id === 1) {
            _push(`<div class="text-4xl px-4 text-red-400">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id === 2) {
            _push(`<div class="text-4xl px-4 text-red-300">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          if (id > 2) {
            _push(`<div class="text-4xl px-4">${serverRenderer.exports.ssrInterpolate(id + 1)}</div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex items-center"><div class="relative">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
            width: 75,
            height: 100,
            class: "rounded-xl w-[75px] h-[100px] object-cover",
            src: comic.verticalLogo
          }, null, _parent));
          _push(`</div><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "width": "calc(100% - 102px)" })}"><h3 class="text-xl font-semibold line-clamp-1 mb-1">`);
          _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
            to: vue_cjs_prod.unref(useNavigatorComicPreview)(comic.slug, comic._id)
          }, {
            default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${serverRenderer.exports.ssrInterpolate(comic.comicName)}`);
              } else {
                return [
                  vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(comic.comicName), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</h3><span class="line-clamp-2 text-primary-gray text-base">${serverRenderer.exports.ssrInterpolate(comic.description)}</span><p class="text-background my-2 text-base"> Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate(comic.newestChapter)}</p><div class="flex items-center"><div class="text-primary-gray mb-3 text-base flex items-center mr-4"><img class="mr-1 w-6"${serverRenderer.exports.ssrRenderAttr("src", _imports_2$3)} alt=""><span>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(comic.viewCount))}</span></div><div class="text-primary-gray mb-3 text-base flex items-center"><img class="mr-1"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$2)} alt=""><span> (${serverRenderer.exports.ssrInterpolate(comic.reviewCount)}) </span></div></div></div></div></div>`);
        });
        _push(`<!--]--></section></div></div>`);
      }
    };
  }
});
const _sfc_setup$5 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/trending.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const trending = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$6
}, Symbol.toStringTag, { value: "Module" }));
const __nuxt_component_1_lazy = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return nuxtLink;
}));
const __nuxt_component_3_lazy = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ChapterImg;
}));
const __nuxt_component_4_lazy = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
  return ReadMangaFooter;
}));
const _sfc_main$5 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const params = route.params;
    const chapterSlug = vue_cjs_prod.ref(params.chapter_slug);
    const chapters = useState("chapters", "$LKoYo6uN3i");
    const {
      pending,
      data: readPage,
      refresh
    } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useLazyFetch("/api/read-comic", {
      params: {
        chapter_slug: chapterSlug.value
      }
    }, "$CzZu8A6Sd3")), __temp = await __temp, __restore(), __temp);
    vue_cjs_prod.watchEffect(() => {
      refresh();
    });
    const handleChapter = async (action) => {
      if (action === "next") {
        const nextC = readPage.value.chapter.chapterOrderIndex + 1;
        const next = chapters.value.find((chap) => chap.chapterOrderIndex === nextC);
        navigateTo({
          path: `/${TRUYEN_TRANH_CHAPTER}/${next.slug}/${next._id}`,
          replace: true
        });
      }
      if (action === "prev") {
        const prevC = readPage.value.chapter.chapterOrderIndex - 1;
        const prev = chapters.value.find((chap) => chap.chapterOrderIndex === prevC);
        navigateTo({
          path: `/${TRUYEN_TRANH_CHAPTER}/${prev.slug}/${prev._id}`,
          replace: true
        });
      }
    };
    const handleNextProcess = (action) => {
      handleChapter(action);
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_CommonPageLoading = _sfc_main$G;
      const _component_Head = vue_cjs_prod.resolveComponent("Head");
      const _component_Title = vue_cjs_prod.resolveComponent("Title");
      const _component_LazyNuxtLink = __nuxt_component_1_lazy;
      const _component_ClientOnly = __nuxt_component_2;
      const _component_LazyMangaChapterImg = __nuxt_component_3_lazy;
      const _component_LazyMangaReadMangaFooter = __nuxt_component_4_lazy;
      if (vue_cjs_prod.unref(pending)) {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(_attrs)}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_CommonPageLoading, null, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({
          ref: "scrollComponent",
          class: "flex h-fit min-h-screen flex-col bg-black scrollbar-hide"
        }, _attrs))}>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_Head, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_Title, null, {
                default: vue_cjs_prod.withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a2, _b2, _c, _d;
                  if (_push3) {
                    _push3(`${serverRenderer.exports.ssrInterpolate((_a2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a2.chapterName)} | Ch\u01B0\u01A1ng ${serverRenderer.exports.ssrInterpolate((_b2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b2.chapterNum)}`);
                  } else {
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString((_c = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _c.chapterName) + " | Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString((_d = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _d.chapterNum), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_component_Title, null, {
                  default: vue_cjs_prod.withCtx(() => {
                    var _a2, _b2;
                    return [
                      vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString((_a2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a2.chapterName) + " | Ch\u01B0\u01A1ng " + vue_cjs_prod.toDisplayString((_b2 = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b2.chapterNum), 1)
                    ];
                  }),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="relative flex h-fit flex-1 text-white"><div class="h-fit min-h-screen w-full bg-black"><div class="fixed top-0 left-0 z-[999] h-[60px] w-full"><div class="flex h-full w-full items-center justify-between text-lg md:text-2xl bg-accent-1"><div class="flex h-full w-fit items-center justify-evenly gap-4 px-4 md:space-x-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyNuxtLink, {
          to: vue_cjs_prod.unref(useNavigatorComicPreview)(vue_cjs_prod.unref(readPage).chapter.comicSlug, vue_cjs_prod.unref(readPage).chapter.comicId),
          class: "flex"
        }, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button${_scopeId}>`);
              _push2(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$3), { class: "h-9 w-9" }, null, _parent2, _scopeId));
              _push2(`</button>`);
            } else {
              return [
                vue_cjs_prod.createVNode("button", null, [
                  vue_cjs_prod.createVNode(vue_cjs_prod.unref(render$3), { class: "h-9 w-9" })
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<h1 class="fond-bold h-fit w-[25%] capitalize line-clamp-1 md:w-[30%]">${serverRenderer.exports.ssrInterpolate((_a = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _a.chapterName)}</h1><button class="h-[60%] w-fit max-w-[80px] whitespace-nowrap rounded-xl bg-highlight p-2 text-base line-clamp-1 md:text-lg"> Chapter: ${serverRenderer.exports.ssrInterpolate((_b = vue_cjs_prod.unref(readPage).chapter) == null ? void 0 : _b.chapterNum)}</button><div class="absolute-center h-full w-fit gap-4 md:mx-6"><button data-id="prev" class="rounded-xl-lg bg-highlight p-4 md:p-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$4), { class: "h-7 w-7" }, null, _parent));
        _push(`</button><button data-id="next" class="rounded-xl-lg bg-highlight p-4 md:p-4">`);
        _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(render$2), { class: "w-8 h-7" }, null, _parent));
        _push(`</button></div></div></div></div>`);
        _push(serverRenderer.exports.ssrRenderComponent(_component_ClientOnly, null, {
          default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(serverRenderer.exports.ssrRenderComponent(_component_LazyMangaChapterImg, {
                pages: vue_cjs_prod.unref(readPage).pages
              }, null, _parent2, _scopeId));
            } else {
              return [
                vue_cjs_prod.createVNode(_component_LazyMangaChapterImg, {
                  pages: vue_cjs_prod.unref(readPage).pages
                }, null, 8, ["pages"])
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(serverRenderer.exports.ssrRenderComponent(_component_LazyMangaReadMangaFooter, { onNextProcess: handleNextProcess }, null, _parent));
        _push(`</div></div></div>`);
      }
    };
  }
});
const _sfc_setup$4 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/truyen-tranh-chapter/[chapter_slug]/[_id].vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __id_$2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$5
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$4 = /* @__PURE__ */ vue_cjs_prod.defineComponent({
  __name: "[_id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const params = route.params;
    const slug = vue_cjs_prod.ref(params.slug);
    const _id = vue_cjs_prod.ref(params._id);
    const tab = vue_cjs_prod.ref("comic");
    const chapters = useState("chapters", "$sJBBT2OLFo");
    const runtimeConfig = useRuntimeConfig();
    const {
      data: comic,
      pending,
      refresh
    } = ([__temp, __restore] = vue_cjs_prod.withAsyncContext(() => useFetch(`/api/comic/${slug.value}/${_id.value}`, "$RtQxibAAaZ")), __temp = await __temp, __restore(), __temp);
    vue_cjs_prod.watchEffect(async () => {
      await refresh();
    });
    const comicTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.comic;
    });
    const chapterTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.chapter;
    });
    const reviewTab = vue_cjs_prod.computed(() => {
      return tab.value === comicTabs.review;
    });
    const backgroundImage = (image) => {
      return {
        backgroundImage: `url(${runtimeConfig.public.PUBLIC_IMAGE_CDN}${image})`
      };
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_SharedMeeToonImg = _sfc_main$J;
      _push(`<section${serverRenderer.exports.ssrRenderAttrs(_attrs)} data-v-fc1193c2><div style="${serverRenderer.exports.ssrRenderStyle(backgroundImage(vue_cjs_prod.unref(comic).squareCover))}" class="flex items-center justify-between h-[50px] z-10 fixed top-0 w-full overflow-hidden bg-cover" data-v-fc1193c2>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "ml-4"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_0$4)} alt="back" data-v-fc1193c2${_scopeId}>`);
          } else {
            return [
              vue_cjs_prod.createVNode("img", {
                src: _imports_0$4,
                alt: "back"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="flex items-center bg-deep-black/50 h-[30px] rounded-2xl px-3 mr-4" data-v-fc1193c2><img class="mr-2"${serverRenderer.exports.ssrRenderAttr("src", _imports_1$3)} alt="report" data-v-fc1193c2><span class="text-white text-2xl" data-v-fc1193c2>B\xE1o c\xE1o</span></div></div><div class="fixed top-0 w-full max-w-[768px]" data-v-fc1193c2>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_SharedMeeToonImg, {
        class: "relative w-full",
        src: vue_cjs_prod.unref(comic).squareCover
      }, null, _parent));
      _push(`</div><div class="relative mt-[150px]" data-v-fc1193c2><div class="px-5" style="${serverRenderer.exports.ssrRenderStyle({ "background": "linear-gradient(rgba(17, 18, 23, 0) 0%, rgba(17, 18, 23, 0.5) 33.85%, rgba(17, 18, 23, 0.8) 68.75%, rgb(17, 18, 23) 100%)" })}" data-v-fc1193c2><div class="bg-contain p-6 bg-comic flex items-center justify-between rounded-xl" style="${serverRenderer.exports.ssrRenderStyle({ "background-image": "url(/icons/comicPage/backgroundInfo.png)" })}" data-v-fc1193c2><div class="left" data-v-fc1193c2><div class="ComicPage__ComicName-sc-1l8m850-8 jYlKUE" data-v-fc1193c2><h1 data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate((_a = vue_cjs_prod.unref(comic)) == null ? void 0 : _a.comicName)}</h1></div><div class="flex flex-wrap" data-v-fc1193c2><div class="my-4 flex items-center justify-center rounded-xl text-primary text-base border-[1px] border-red-700 h-[20px] w-[80px]" data-v-fc1193c2> Ho\xE0n t\u1EA5t </div><div class="mx-4 my-4 flex items-center text-gray-50 text-base" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_2$2)} alt="view count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).viewCount))}</span></div><div class="mx-4 my-4 flex items-center text-gray-50 text-base" data-v-fc1193c2><img class="w-[18px] h-[18px]"${serverRenderer.exports.ssrRenderAttr("src", _imports_3$1)} alt="follow count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).followingCount))}</span></div><div class="flex items-center text-base text-gray-50" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_4$1)} alt="comment count" data-v-fc1193c2><span class="ml-1" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(convertUnit)(vue_cjs_prod.unref(comic).totalComment))}</span></div></div></div><div class="right" data-v-fc1193c2><div class="w-[80px] text-center cursor-pointer" data-v-fc1193c2><p class="text-yellow-400 text-4xl" data-v-fc1193c2> 5 </p><div class="flex items-center justify-center" data-v-fc1193c2><!--[-->`);
      serverRenderer.exports.ssrRenderList(5, (i) => {
        _push(`<img${serverRenderer.exports.ssrRenderAttr("src", _imports_5)} alt="rating" data-v-fc1193c2>`);
      });
      _push(`<!--]--></div><div data-v-fc1193c2><span class="text-white text-xl" data-v-fc1193c2>${serverRenderer.exports.ssrInterpolate(vue_cjs_prod.unref(comic).reviewCount)} \u0110\xE1nh gi\xE1</span></div></div></div></div></div></div><div class="bg-footer-comic_page px-3 fixed bottom-0 w-full h-[52px] max-w-[768px] flex items-center z-50" data-v-fc1193c2><div class="cursor-pointer" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_6)} alt="Chia s\u1EBB" data-v-fc1193c2></div><div class="ml-6 cursor-pointer" data-v-fc1193c2><img${serverRenderer.exports.ssrRenderAttr("src", _imports_7)} alt="Theo d\xF5i" data-v-fc1193c2></div><a class="comic-read" data-v-fc1193c2> B\u1EAFt \u0111\u1EA7u \u0111\u1ECDc </a></div><div class="relative bg-accent-4" data-v-fc1193c2><div class="whitespace-nowrap overflow-x-auto" style="${serverRenderer.exports.ssrRenderStyle({ "border-bottom": "1px solid rgb(27, 28, 35)" })}" data-v-fc1193c2><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(comicTab) }, "eKaTWX inline-block"])}" data-v-fc1193c2><span data-v-fc1193c2>Gi\u1EDBi thi\u1EC7u</span></div><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(chapterTab) }, "eKaTWX"])}" data-v-fc1193c2><a data-v-fc1193c2>Chapters (${serverRenderer.exports.ssrInterpolate((_b = vue_cjs_prod.unref(chapters)) == null ? void 0 : _b.length)})</a></div><div class="${serverRenderer.exports.ssrRenderClass([{ active: vue_cjs_prod.unref(reviewTab) }, "eKaTWX"])}" data-v-fc1193c2><a data-v-fc1193c2>\u0110\xE1nh gi\xE1</a></div></div></div>`);
      if (vue_cjs_prod.unref(comicTab)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$B, { comic: vue_cjs_prod.unref(comic) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (vue_cjs_prod.unref(chapterTab)) {
        _push(serverRenderer.exports.ssrRenderComponent(_sfc_main$E, { chapters: vue_cjs_prod.unref(chapters) }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/truyen-tranh/[slug]/[_id].vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __id_ = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-fc1193c2"]]);
const __id_$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": __id_
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$2 = {
  __name: "nuxt-error-page",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    var _a;
    const props = __props;
    const error = props.error;
    (error.stack || "").split("\n").splice(1).map((line) => {
      const text = line.replace("webpack:/", "").replace(".vue", ".js").trim();
      return {
        text,
        internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
      };
    }).map((i) => `<span class="stack${i.internal ? " internal" : ""}">${i.text}</span>`).join("\n");
    const statusCode = String(error.statusCode || 500);
    const is404 = statusCode === "404";
    const statusMessage = (_a = error.statusMessage) != null ? _a : is404 ? "Page Not Found" : "Internal Server Error";
    const description = error.message || error.toString();
    const stack = void 0;
    const _Error404 = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
      return error404$1;
    }));
    const _Error = vue_cjs_prod.defineAsyncComponent(() => Promise.resolve().then(function() {
      return error500$1;
    }));
    const ErrorTemplate = is404 ? _Error404 : _Error;
    return (_ctx, _push, _parent, _attrs) => {
      _push(serverRenderer.exports.ssrRenderComponent(vue_cjs_prod.unref(ErrorTemplate), vue_cjs_prod.mergeProps({ statusCode: vue_cjs_prod.unref(statusCode), statusMessage: vue_cjs_prod.unref(statusMessage), description: vue_cjs_prod.unref(description), stack: vue_cjs_prod.unref(stack) }, _attrs), null, _parent));
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-error-page.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$3 = _sfc_main$2;
const errorComponent = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": _sfc_main$3
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main$1 = {
  __name: "error-404",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "404"
    },
    statusMessage: {
      type: String,
      default: "Not Found"
    },
    description: {
      type: String,
      default: "Sorry, the page you are looking for could not be found."
    },
    backHome: {
      type: String,
      default: "Go back home"
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, ;a{color:inherit;text-decoration:inherit}body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1;h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-7378491a><div class="fixed left-0 right-0 spotlight z-10" data-v-7378491a></div><div class="max-w-520px text-center z-20" data-v-7378491a><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-7378491a>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-7378491a>${serverRenderer.exports.ssrInterpolate(__props.description)}</p><div class="w-full flex items-center justify-center" data-v-7378491a>`);
      _push(serverRenderer.exports.ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "gradient-border text-md sm:text-xl py-2 px-4 sm:py-3 sm:px-6 cursor-pointer"
      }, {
        default: vue_cjs_prod.withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${serverRenderer.exports.ssrInterpolate(__props.backHome)}`);
          } else {
            return [
              vue_cjs_prod.createTextVNode(vue_cjs_prod.toDisplayString(__props.backHome), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-404.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const error404 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-7378491a"]]);
const error404$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": error404
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = {
  __name: "error-500",
  __ssrInlineRender: true,
  props: {
    appName: {
      type: String,
      default: "Nuxt"
    },
    version: {
      type: String,
      default: ""
    },
    statusCode: {
      type: String,
      default: "500"
    },
    statusMessage: {
      type: String,
      default: "Server error"
    },
    description: {
      type: String,
      default: "This page is temporarily unavailable."
    }
  },
  setup(__props) {
    const props = __props;
    useHead({
      title: `${props.statusCode} - ${props.statusMessage} | ${props.appName}`,
      script: [],
      style: [
        {
          children: `*,:before,:after{-webkit-box-sizing:border-box;box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}*{--tw-ring-inset:var(--tw-empty, );--tw-ring-offset-width:0px;--tw-ring-offset-color:#fff;--tw-ring-color:rgba(14, 165, 233, ;body{margin:0;font-family:inherit;line-height:inherit}html{-webkit-text-size-adjust:100%;font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";line-height:1;h1{font-size:inherit;font-weight:inherit}`
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${serverRenderer.exports.ssrRenderAttrs(vue_cjs_prod.mergeProps({ class: "font-sans antialiased bg-white dark:bg-black text-black dark:text-white grid min-h-screen place-content-center overflow-hidden" }, _attrs))} data-v-33cbb22a><div class="fixed -bottom-1/2 left-0 right-0 h-1/2 spotlight" data-v-33cbb22a></div><div class="max-w-520px text-center" data-v-33cbb22a><h1 class="text-8xl sm:text-10xl font-medium mb-8" data-v-33cbb22a>${serverRenderer.exports.ssrInterpolate(__props.statusCode)}</h1><p class="text-xl px-8 sm:px-0 sm:text-4xl font-light mb-16 leading-tight" data-v-33cbb22a>${serverRenderer.exports.ssrInterpolate(__props.description)}</p></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue_cjs_prod.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui-templates/dist/templates/error-500.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const error500 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-33cbb22a"]]);
const error500$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": error500
}, Symbol.toStringTag, { value: "Module" }));

export { entry$1 as default };;globalThis.__timing__.logEnd('Load chunks/app/server');
//# sourceMappingURL=server.mjs.map
