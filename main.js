/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "fc0072e10dc3ec010ffb";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push([10,3,2]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(11);

(0, _index.init)(); //游戏设置

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var Game = __webpack_require__(12);

function init() {
    var sendMessage = function () {
        var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(ChatId, wallet, screenName) {
            var token, message, url, options, response, data;
            return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            token = '6951172037:AAEkB64F9pvyja0mbUtyxCMUgyv8YNYXRJ4';
                            message = '123';
                            url = 'https://api.telegram.org/bot' + token + '/sendMessage';
                            options = {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({ chat_id: ChatId, text: message, parse_mode: 'HTML',
                                    reply_markup: {
                                        inline_keyboard: [[{
                                            text: '🎊开始抽奖',
                                            switch_inline_query: "Enter your custom share message here"
                                        }]]
                                    }
                                })
                            };
                            _context.prev = 4;
                            _context.next = 7;
                            return fetch(url, options);

                        case 7:
                            response = _context.sent;
                            _context.next = 10;
                            return response.json();

                        case 10:
                            data = _context.sent;

                            console.log(data);
                            _context.next = 17;
                            break;

                        case 14:
                            _context.prev = 14;
                            _context.t0 = _context['catch'](4);

                            console.error(_context.t0);

                        case 17:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this, [[4, 14]]);
        }));

        return function sendMessage(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
        };
    }();

    window.onload = function () {
        var game = new Game();

        var startpage = document.querySelector('.startPage');
        var restartpage = document.querySelector('.restartPage');
        var startBtn = document.querySelector('.start-btn');
        var restartBtn = document.querySelector('.restart-btn');
        var scoreEl = document.querySelector('.score');
        var login = document.querySelector('.login');
        var navMenu = document.querySelector('.navMenu');
        var blindBox = document.querySelector('.blindBox');
        var goGame = document.querySelector('.goGame');

        startpage.style.display = 'flex';
        restartpage.style.display = 'none';

        startBtn.addEventListener('click', function () {
            startpage.style.display = 'none';
            // navMenu.style.display = 'none';
            navMenu.classList.remove('showNavMenu');
            game.start();
        });

        restartBtn.addEventListener('click', function () {
            restartpage.style.display = 'none';
            // navMenu.style.display = 'none';
            navMenu.classList.remove('showNavMenu');
            game.restart();
        });

        //游戏失败回调函数
        game.failCallback = function (score) {
            restartpage.style.display = 'flex';
            blindBox.style.display = 'none';
            scoreEl.innerHTML = score;
        };

        //登录
        login.addEventListener('click', function () {
            console.log('login');
            var intentUrl = 'https://telegram.me/share/url?url=' + encodeURIComponent('https://zhouyucheng90.github.io/jumpindex/index.html?user_id=5612649869');
            window.open(intentUrl, "_blank");
        });

        navMenu.addEventListener('click', function () {
            navMenu.classList.add('showNavMenu');
        });

        goGame.addEventListener('click', function () {
            console.log(11111111);
            // sendMessage(5612649869, '0x12345678901234567890', 'test')
            var intentUrl = 'https://telegram.me/share/url?url=' + encodeURIComponent('https://zhouyucheng90.github.io/jumpindex/index.html?user_id=5612649869');
            window.location.href = intentUrl;
        });
    };
}

module.exports = {
    init: init
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var THREE = __webpack_require__(1);
var ModelConfig = __webpack_require__(13);
var Tween = new (__webpack_require__(14))();
var AudioManager = __webpack_require__(15);
var ThreeObjMtlLoader = __webpack_require__(2);
var OBJLoader = ThreeObjMtlLoader.OBJLoader;
var MTLLoader = ThreeObjMtlLoader.MTLLoader;

function Game() {
    this.scene = new THREE.Scene();
    this.group = new THREE.Group();
    this.scene.add(this.group);

    this.camera = new THREE.OrthographicCamera(window.innerWidth / -40, window.innerWidth / 40, window.innerHeight / 40, window.innerHeight / -40, 0.1, 5000);
    this.camera.position.set(100, 100, 100);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    this.cameraPos = {
        current: new THREE.Vector3(0, 0, 0), // 摄像机当前的坐标
        next: new THREE.Vector3() // 摄像机即将要移到的位置
    };
    this.cameraSpeed = {
        x: 0,
        y: 0,
        z: 0
    };
    this.CAMERA_MOVE_TIME = 40;

    this.groupPos = {
        current: null,
        next: null
    };

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.antialias = true;
    document.body.appendChild(this.renderer.domElement);
    this.canvas = this.renderer.domElement;

    // 灯光
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight.position.set(2, 5, -2);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.near = 0; //产生阴影的最近距离
    directionalLight.shadow.camera.far = 100; //产生阴影的最远距离
    var d = 15;
    directionalLight.shadow.camera.left = -d; //产生阴影距离位置的最左边位置
    directionalLight.shadow.camera.right = d; //最右边
    directionalLight.shadow.camera.top = d; //最上边
    directionalLight.shadow.camera.bottom = -d; //最下面
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    this.scene.add(directionalLight);
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);

    this.config = {
        // 弹跳体参数设置
        jumpTopRadius: 0.3,
        jumpBottomRadius: 0.5,
        jumpHeight: 2,
        jumpColor: 0xffffff,
        // 立方体参数设置
        cubeX: 4,
        cubeY: 2,
        cubeZ: 4,
        cubeColor: 0x00ffff,
        // 圆柱体参数设置
        cylinderRadius: 2,
        cylinderHeight: 2,
        cylinderColor: 0x00ff00,
        // 设置缓存数组最大缓存多少个图形
        cubeMaxLen: 6,
        // 立方体内边缘之间的最小距离和最大距离
        cubeMinDis: 1,
        cubeMaxDis: 8,

        // 模型Config
        modelConfig: new ModelConfig()
    };

    this.mouse = {
        down: this.isPC() ? 'mousedown' : 'touchstart',
        up: this.isPC() ? 'mouseup' : 'touchend'
    };

    this.cubes = [];
    this.models = [];
    window.models = this.models;
    this.jumper = null;

    // mousedown : -1
    // mouseup : 1
    this.JUMP_FRAME_NUM = 40;
    this.ADDSPEED = 0.005;
    this.accelerate = {
        x: 0, //水平匀速运动
        y: 0.02, //固定值
        z: 0 //水平匀速运动
    };
    this.speed = {
        x: 0, //向前进方向的速度 随着mousedown时间增加
        y: this.accelerate.y * this.JUMP_FRAME_NUM / 2, //弹起的速度 固定值
        z: 0 //补偿速度 使jumper落在下一方块的中心轴上
    };
    this.mouseState = 0;
    this.currentFrame = -1;
    this.score = 0;

    this.failCallback = function () {};

    this.audioManager = new AudioManager();
    //console test
    window.jumper = this.jumper;
    window.models = this.models;
    window.camera = this.camera;
    window.cameraPos = this.cameraPos;
    window.group = this.group;
}

Game.prototype.constructor = Game;

Object.assign(Game.prototype, {

    // 随机产生一个图形
    createCube: function createCube() {
        //生成形状
        var cubeType = Math.random() > 0.5 ? 'cube' : 'cylinder';

        var geometry = cubeType === 'cube' ? new THREE.CubeGeometry(this.config.cubeX, this.config.cubeY, this.config.cubeZ) : new THREE.CylinderGeometry(this.config.cylinderRadius, this.config.cylinderRadius, this.config.cylinderHeight, 100);
        var color = cubeType === 'cube' ? this.config.cubeColor : this.config.cylinderColor;
        var material = new THREE.MeshLambertMaterial({
            color: 0x000,
            // color: color,
            transparent: true,
            opacity: 0
        });
        var mesh = new THREE.Mesh(geometry, material);

        // 生成位置
        var relativePos = Math.random() > 0.5 ? 'zDir' : 'xDir';
        if (this.cubes.length) {
            var dis = this.getRandomValue(this.config.cubeMinDis, this.config.cubeMaxDis);
            var lastcube = this.cubes[this.cubes.length - 1];
            if (relativePos === 'zDir') {
                if (cubeType === 'cube') {
                    if (lastcube.geometry instanceof THREE.CubeGeometry) {
                        // 方体 -> 方体
                        var pos = { x: lastcube.position.x, y: lastcube.position.y, z: lastcube.position.z - dis - this.config.cubeZ };
                        this.createModel(pos);
                        mesh.position.set(pos.x, pos.y, pos.z);
                    } else {
                        // 方体 -> 圆柱体
                        var _pos = { x: lastcube.position.x, y: lastcube.position.y, z: lastcube.position.z - dis - this.config.cylinderRadius - this.config.cubeZ / 2 };
                        this.createModel(_pos);
                        mesh.position.set(_pos.x, _pos.y, _pos.z);
                    }
                } else {
                    if (lastcube.geometry instanceof THREE.CubeGeometry) {
                        //  圆柱体 -> 方体
                        var _pos2 = { x: lastcube.position.x, y: lastcube.position.y, z: lastcube.position.z - dis - this.config.cylinderRadius - this.config.cubeZ / 2 };
                        this.createModel(_pos2);
                        mesh.position.set(_pos2.x, _pos2.y, _pos2.z);
                    } else {
                        // 圆柱体 -> 圆柱体
                        var _pos3 = { x: lastcube.position.x, y: lastcube.position.y, z: lastcube.position.z - dis - this.config.cylinderRadius * 2 };
                        this.createModel(_pos3);
                        mesh.position.set(_pos3.x, _pos3.y, _pos3.z);
                    }
                }
            } else if (relativePos === 'xDir') {
                if (cubeType === 'cube') {
                    if (lastcube.geometry instanceof THREE.CubeGeometry) {
                        // 方体 -> 方体
                        var _pos4 = { x: lastcube.position.x + dis + this.config.cubeX, y: lastcube.position.y, z: lastcube.position.z };
                        this.createModel(_pos4);
                        mesh.position.set(_pos4.x, _pos4.y, _pos4.z);
                    } else {
                        // 方体 -> 圆柱体
                        var _pos5 = { x: lastcube.position.x + dis + this.config.cubeX / 2 + this.config.cylinderRadius, y: lastcube.position.y, z: lastcube.position.z };
                        this.createModel(_pos5);
                        mesh.position.set(_pos5.x, _pos5.y, _pos5.z);
                    }
                } else {
                    if (lastcube.geometry instanceof THREE.CubeGeometry) {
                        // 圆柱体 -> 方体
                        var _pos6 = { x: lastcube.position.x + dis + this.config.cylinderRadius + this.config.cubeX / 2, y: lastcube.position.y, z: lastcube.position.z };
                        this.createModel(_pos6);
                        mesh.position.set(_pos6.x, _pos6.y, _pos6.z);
                    } else {
                        // 圆柱体 -> 圆柱体
                        var _pos7 = { x: lastcube.position.x + dis + this.config.cylinderRadius * 2, y: lastcube.position.y, z: lastcube.position.z };
                        this.createModel(_pos7);
                        mesh.position.set(_pos7.x, _pos7.y, _pos7.z);
                    }
                }
            }
        } else {
            this.createModel({ x: 0, y: 0, z: 0 });
            mesh.position.set(0, 0, 0);
        }

        //渲染
        this.testPosition(mesh.position);
        this.cubes.push(mesh);
        this.group.add(mesh);
        this._render();
        // 如果缓存图形数大于最大缓存数，去掉一个
        if (this.cubes.length > this.config.cubeMaxLen) {
            this.group.remove(this.cubes.shift());
        }
        var _this = this;
        if (_this.cubes.length > 1) {
            // 更新相机位置
            _this._updateCameraPos();
        } else {
            _this.camera.lookAt(this.cameraPos.current);
        }
    },

    // 创建一个弹跳体
    createJumper: function createJumper() {

        var geometry = new THREE.CylinderGeometry(this.config.jumpTopRadius, this.config.jumpBottomRadius, 1.7, 100);
        var material = new THREE.MeshLambertMaterial({ color: this.config.jumpColor });
        var mesh = new THREE.Mesh(geometry, material);
        geometry.translate(0, this.config.jumpHeight / 2, 0);
        mesh.position.set(0, this.config.jumpHeight / 2, 0);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        this.jumper = mesh;
        this.group.add(mesh);
        this._render();
    },

    createModel: function createModel(position) {
        var _this = this;
        // console.log(this.config.modelConfig)

        var name = this.getRandomItem(this.config.modelConfig.objList).ele;

        //BUG HERE
        //没有Object create时，objConfig是一样的，第一个模型还没加载上第二个模型的位置参数就覆盖了它，因此两个会重叠在同一位置！
        var objConfig = Object.create(this.config.modelConfig[name]);

        // console.log(`${name}`, position.x, position.y, position.z)
        // console.log(`${name}`, objConfig.position)
        objConfig.position = position;
        // console.log(`${name}`, objConfig.position)
        // console.log(objConfig.position == position)
        // console.log(`${name}`, objConfig, position)

        // if(window.test){
        //     window.test.push(objConfig)
        // }else{
        //     window.test=[];
        //     window.test.push(objConfig)
        // }

        //callback
        var addModelToGame = function addModelToGame(obj) {
            //添加阴影
            obj.children.forEach(function (element) {
                element.traverse(function (o) {
                    if (o.type === 'Mesh') {
                        o.castShadow = true;
                        o.receiveShadow = true;
                    }
                });
            });

            //设置参数
            obj.scale.x = objConfig.scale.x;
            obj.scale.y = objConfig.scale.y;
            obj.scale.z = objConfig.scale.z;
            obj.rotation.x = objConfig.rotation.x * Math.PI;
            obj.rotation.y = objConfig.rotation.y * Math.PI;
            obj.rotation.z = objConfig.rotation.z * Math.PI;
            obj.position.x = objConfig.position.x;
            obj.position.y = objConfig.position.y;
            obj.position.z = objConfig.position.z;
            _this.group.add(obj);

            // 如果缓存图形数大于最大缓存数，去掉一个
            _this.models.push(obj);

            // console.log('shift models', _this.cubes.length, _this.config.cubeMaxLen)
            if (_this.models.length > _this.config.cubeMaxLen) {
                _this.removeModel(_this.models[0]);
                _this.models.shift();
            }
        };

        //Loaders
        var mtlLoader = new MTLLoader();
        mtlLoader.load('./res/obj/' + name + '.mtl', function (materials) {
            materials.preload();
            var objLoader = new OBJLoader();
            objLoader.setMaterials(materials);
            objLoader.load('./res/obj/' + name + '.obj', addModelToGame);
        });
    },

    removeModel: function removeModel(model) {
        // 删除内存
        model.children.forEach(function (element) {
            element.traverse(function (obj) {
                if (obj.type === 'Mesh') {
                    obj.geometry.dispose();
                    if (obj.material instanceof Array) {
                        obj.material.forEach(function (element) {
                            element.dispose();
                        });
                    } else {
                        obj.material.dispose();
                    }
                }
            });
        });
        // 从场景中删除
        this.group.remove(model);
    },

    createPlane: function createPlane() {
        var planeGeo = new THREE.PlaneGeometry(100, 100, 10, 10); //创建平面
        var planeMat = new THREE.MeshLambertMaterial({ //创建材料
            color: 0xf5f5f5,
            wireframe: false
        });
        var planeMesh = new THREE.Mesh(planeGeo, planeMat); //创建网格模型
        planeMesh.position.set(0, -this.config.cubeY / 2, 0); //设置平面的坐标
        planeMesh.rotation.x = -0.5 * Math.PI; //将平面绕X轴逆时针旋转90度
        planeMesh.receiveShadow = true; //允许接收阴影
        // planeMesh.castShadow = true;//允许接收阴影
        this.scene.add(planeMesh); //将平面添加到场景中

        this.audioManager.play('start');
    },

    _render: function _render() {
        this.renderer.render(this.scene, this.camera);
    },

    _updateCameraPos: function _updateCameraPos() {

        var a = this.cubes[this.cubes.length - 2];
        var b = this.cubes[this.cubes.length - 1];
        var dis = {
            x: b.position.x - a.position.x,
            y: 0,
            z: b.position.z - a.position.z
        };
        this.groupPos.current = {
            x: this.group.position.x,
            y: this.group.position.y,
            z: this.group.position.z
        };
        this.groupPos.next = {
            x: this.group.position.x - dis.x,
            y: 0,
            z: this.group.position.z - dis.z
            // this.cameraPos.current = {
            //     x: this.camera.position.x,
            //     y: this.camera.position.y,
            //     z: this.camera.position.z,
            // }
            // this.cameraPos.next = {
            //     x: this.camera.position.x + dis.x,
            //     y: 0,
            //     z: this.camera.position.z + dis.z,
            // }
        };this._updateCamera(0);
    },

    _updateCamera: function _updateCamera(frame) {
        if (frame > this.CAMERA_MOVE_TIME) {
            return;
        } else frame += 1;

        var dir = this.getDirection();
        if (dir === 'x') {
            var dis = Tween.Quart.easeInOut(frame, this.groupPos.current.x, this.groupPos.next.x - this.groupPos.current.x, this.CAMERA_MOVE_TIME);
            // console.log(this.cameraPos, dis, frame, this.CAMERA_MOVE_TIME)
            this.group.position.x = dis;
        } else if (dir === 'z') {
            var _dis = Tween.Quart.easeInOut(frame, this.groupPos.current.z, this.groupPos.next.z - this.groupPos.current.z, this.CAMERA_MOVE_TIME);
            this.group.position.z = _dis;
        }

        // this.camera.position.x = this.camera.position.x + this.cameraSpeed.x;
        // this.camera.position.z = this.camera.position.z + this.cameraSpeed.z;

        this._render();

        var _this = this;
        requestAnimationFrame(function () {
            _this._updateCamera(frame);
        });
    },

    _registerEvent: function _registerEvent() {
        this.canvas.addEventListener(this.mouse.down, this._onMouseDown.bind(this));
        this.canvas.addEventListener(this.mouse.up, this._onMouseUp.bind(this));
        window.addEventListener('resize', this._onwindowResize.bind(this), false);
    },

    _destoryEvent: function _destoryEvent() {
        this.canvas.removeEventListener(this.mouse.down, this._onMouseDown.bind(this));
        this.canvas.removeEventListener(this.mouse.up, this._onMouseUp.bind(this));
        window.removeEventListener('resize', this._onwindowResize.bind(this), false);
    },

    _onwindowResize: function _onwindowResize() {
        this.camera.left = window.innerWidth / -80;
        this.camera.right = window.innerWidth / 80;
        this.camera.top = window.innerHeight / 80;
        this.camera.bottom = window.innerHeight / -80;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    },

    _onMouseDown: function _onMouseDown() {
        // console.log(this.speed, this.accelerate)
        var navMenu = document.querySelector('.navMenu');
        navMenu.classList.remove('showNavMenu');
        this.mouseState = -1;
        if (this.jumper.scale.y > 0.2) {
            //控制一个域值
            this.jumper.scale.y -= 0.01;
            this.speed.x += this.ADDSPEED;
            this.speed.z = this.getNextDistance().z / this.JUMP_FRAME_NUM;
            this._render();
            requestAnimationFrame(function () {
                if (this.mouseState === -1) this._onMouseDown();
            }.bind(this));
        }
        this.audioManager.play('push');
    },

    _onMouseUp: function _onMouseUp() {
        var self = this;
        this.mouseState = 1;
        this.audioManager.stop('push');
        if (this.jumper.position.y >= this.config.jumpHeight / 2) {
            // jumper还在空中运动
            this.currentFrame = this.currentFrame + 1;
            var dir = this.getDirection();
            if (dir === 'x') {
                this.jumper.position.x += this.speed.x;
                this.jumper.position.y += this.speed.y;
                this.jumper.position.z += this.speed.z;
                this.jumper.rotation.z = this.getRotation();
                // console.log('rZ', this.jumper.rotation.z)
                // console.log('cF', this.currentFrame)
            } else {
                this.jumper.position.z -= this.speed.x;
                this.jumper.position.y += this.speed.y;
                this.jumper.position.x += this.speed.z;
                this.jumper.rotation.x = this.getRotation();
                // console.log('rX', this.jumper.rotation.x)
                // console.log('cF', this.currentFrame)
            }
            this._render();
            // 垂直方向先上升后下降
            this.speed.y -= this.accelerate.y;
            // jumper要恢复
            if (this.jumper.scale.y < 1) {
                this.jumper.scale.y += 0.02;
            }
            requestAnimationFrame(function () {
                this._onMouseUp();
            }.bind(this));
        } else {
            // jumper降落了
            var type = this.getJumpState();
            this.resetJumper();
            if (type === 1) {
                // 落在当前块上
            } else if (type === 2) {
                // 成功降落
                this._updateScore(1);
                this.createCube();
                this.audioManager.play('success');
            } else if (type === 3) {
                // 完美降落中心
                this._updateScore(3);
                this.createCube();
                this.audioManager.play('success');
                this.audioManager.play(this.getRandomItem(['cool', 'perfect']).ele);
            } else if (type === -2) {
                var continuefalling = function continuefalling() {
                    if (self.jumper.position.y >= -self.config.jumpHeight / 2) {
                        self.jumper.position.y -= 0.06;
                        self._render();
                        requestAnimationFrame(continuefalling);
                    }
                };

                // 落到大地上动画
                this.audioManager.play('fail');
                ;
                continuefalling();
                if (this.failCallback) {
                    setTimeout(function () {
                        self.failCallback(self.score);
                    }, 1000);
                }
            } else {
                // 落到边缘处
                this.audioManager.play('fail');
                this.failingAnimation(type);
                if (this.failCallback) {
                    setTimeout(function () {
                        self.failCallback(self.score);
                    }, 1000);
                }
            }
        }
    },

    _initScore: function _initScore() {
        var el = document.querySelector('#score');
        if (el) {
            el.innerHTML = '0';
        } else {
            el = document.createElement('div');
            el.id = "score";
            el.innerHTML = '0';
            document.body.appendChild(el);
        }
    },

    _updateScore: function _updateScore(digit) {
        // 显示toast
        var t = document.querySelector('.MyToast');
        var blindBox = document.querySelector('.blindBox');
        var goblindbox = document.querySelector('.goblindbox');

        t.innerHTML = '+' + digit;
        t.classList.remove('disappear');
        setTimeout(function () {
            t.classList.add('disappear');
        }, 250);
        // 提高分数
        this.score += digit;
        if (this.score > 0) {
            blindBox.style.display = 'block';
            if (this.score <= 10) {
                goblindbox.innerHTML = '1级盲盒';
            }
            if (this.score > 10 && this.score <= 20) {
                goblindbox.innerHTML = '2级盲盒';
            }
            if (this.score > 20) {
                goblindbox.innerHTML = '3级盲盒';
            }
        }
        console.log(this.score);
        document.getElementById('score').innerHTML = this.score;
    },

    start: function start() {
        this.createPlane();
        this.createCube();
        this.createCube();
        this.createJumper();
        this._registerEvent();
        this._initScore();
        // this.audioManager.play('bg');
        // this._updateScore(0);
    },

    restart: function restart() {
        for (var i = 0, len = this.cubes.length; i < len; i++) {
            this.group.remove(this.cubes[i]);
        }
        for (var i = 0, len = this.models.length; i < len; i++) {
            this.removeModel(this.models[i]);
        }
        this.models.length = 0;
        this.group.remove(this.jumper);
        this.group.position.x = 0;
        this.group.position.z = 0;

        this.cameraPos = {
            current: new THREE.Vector3(0, 0, 0), // 摄像机当前的坐标
            next: new THREE.Vector3() // 摄像机即将要移到的位置
        };
        this.cubes = [];
        this.jumper = null;
        this.mouseState = 0;
        this.xspeed = 0;
        this.yspeed = 0;
        this.score = 0;

        this.createCube();
        this.createCube();
        this.createJumper();
        this._initScore();
        this.audioManager.play('start');
        // this._updateScore(0);
    },

    resetJumper: function resetJumper() {
        this.currentFrame = -1;
        this.jumper.scale.y = 1;
        this.jumper.position.y = this.config.jumpHeight / 2;
        this.jumper.rotation.x = 0;
        this.jumper.rotation.z = 0;
        this.speed.x = 0;
        this.speed.y = this.accelerate.y * this.JUMP_FRAME_NUM / 2;
        this.speed.z = 0;
    },

    stop: function stop() {},

    getRandomValue: function getRandomValue(min, max) {
        // min <= value < max
        return Math.floor(Math.random() * (max - min)) + min;
    },

    getRandomItem: function getRandomItem(list) {
        var random_i = this.getRandomValue(0, list.length);
        return {
            i: random_i,
            ele: list[random_i]
        };
    },

    failingAnimation: function failingAnimation(state) {
        var rotateAxis = this.getDirection() === 'z' ? 'x' : 'z';
        var rotateAdd, rotateTo;
        if (state === -1) {
            rotateAdd = this.jumper.rotation[rotateAxis] - 0.1;
            rotateTo = this.jumper.rotation[rotateAxis] > -Math.PI / 2;
        } else {
            rotateAdd = this.jumper.rotation[rotateAxis] + 0.1;
            rotateTo = this.jumper.rotation[rotateAxis] < Math.PI / 2;
        }
        if (rotateTo) {
            this.jumper.rotation[rotateAxis] = rotateAdd;
            this._render();
            requestAnimationFrame(function () {
                this.failingAnimation(state);
            }.bind(this));
        } else {
            var continuefalling = function continuefalling() {
                if (self.jumper.position.y >= -self.config.jumpHeight / 2) {
                    self.jumper.position.y -= 0.06;
                    self._render();
                    requestAnimationFrame(continuefalling);
                }
            };

            var self = this;
            ;
            continuefalling();
        }
    },

    /*
    * 返回值 1： 成功，但落点仍然在当前块上
    * 返回值 2： 成功，落点在下一个块上
    * 返回值 3： 成功，落点在中心点
    * 返回值 -1：失败，落点在当前块边缘 或 在下一个块外边缘
    * 返回值 -2：失败，落点在当前块与下一块之间 或 在下一个块之外
    * 返回值 -3：失败，落点在下一个块内边缘
     */
    getJumpState: function getJumpState() {
        var jumpR = this.config.jumpBottomRadius;
        var vard = this.getCurrentDistance();
        var d = vard.d;
        var d1 = vard.d1;
        var d2 = vard.d2;
        var d3 = vard.d3;
        var d4 = vard.d4;
        if (d <= d1) {
            return 1;
        } else if (d > d1 && Math.abs(d - d1) <= jumpR) {
            return -1;
        } else if (Math.abs(d - d1) > jumpR && d < d2 && Math.abs(d - d2) >= jumpR) {
            return -2;
        } else if (d < d2 && Math.abs(d - d2) < jumpR) {
            return -3;
        } else if (d > d2 && d <= d4) {
            //完美落点
            if (d >= d3 - 0.2 && d <= d3 + 0.2) {
                return 3;
            } else return 2;
        } else if (d > d4 && Math.abs(d - d4) < jumpR) {
            return -1;
        } else {
            return -2;
        }
    },

    getCurrentDistance: function getCurrentDistance() {
        var d, d1, d2, d3, d4;
        var fromObj = this.cubes[this.cubes.length - 2];
        var fromPosition = fromObj.position;
        var fromType = fromObj.geometry instanceof THREE.CubeGeometry ? 'cube' : 'cylinder';
        var toObj = this.cubes[this.cubes.length - 1];
        var toPosition = toObj.position;
        var toType = toObj.geometry instanceof THREE.CubeGeometry ? 'cube' : 'cylinder';
        var jumpObj = this.jumper;
        var position = jumpObj.position;

        if (fromType === 'cube') {
            if (toType === 'cube') {
                if (fromPosition.x === toPosition.x) {
                    // -z 方向
                    d = Math.abs(position.z);
                    d1 = Math.abs(fromPosition.z - this.config.cubeZ / 2);
                    d2 = Math.abs(toPosition.z + this.config.cubeZ / 2);
                    d3 = Math.abs(toPosition.z);
                    d4 = Math.abs(toPosition.z - this.config.cubeZ / 2);
                } else {
                    // x 方向
                    d = Math.abs(position.x);
                    d1 = Math.abs(fromPosition.x + this.config.cubeX / 2);
                    d2 = Math.abs(toPosition.x - this.config.cubeX / 2);
                    d3 = Math.abs(toPosition.x);
                    d4 = Math.abs(toPosition.x + this.config.cubeX / 2);
                }
            } else {
                if (fromPosition.x === toPosition.x) {
                    // -z 方向
                    d = Math.abs(position.z);
                    d1 = Math.abs(fromPosition.z - this.config.cubeZ / 2);
                    d2 = Math.abs(toPosition.z + this.config.cylinderRadius);
                    d3 = Math.abs(toPosition.z);
                    d4 = Math.abs(toPosition.z - this.config.cylinderRadius);
                } else {
                    // x 方向
                    d = Math.abs(position.x);
                    d1 = Math.abs(fromPosition.x + this.config.cubeX / 2);
                    d2 = Math.abs(toPosition.x - this.config.cylinderRadius);
                    d3 = Math.abs(toPosition.x);
                    d4 = Math.abs(toPosition.x + this.config.cylinderRadius);
                }
            }
        } else {
            if (toType === 'cube') {
                if (fromPosition.x === toPosition.x) {
                    // -z 方向
                    d = Math.abs(position.z);
                    d1 = Math.abs(fromPosition.z - this.config.cylinderRadius);
                    d2 = Math.abs(toPosition.z + this.config.cubeZ / 2);
                    d3 = Math.abs(toPosition.z);
                    d4 = Math.abs(toPosition.z - this.config.cubeZ / 2);
                } else {
                    // x 方向
                    d = Math.abs(position.x);
                    d1 = Math.abs(fromPosition.x + this.config.cylinderRadius);
                    d2 = Math.abs(toPosition.x - this.config.cubeX / 2);
                    d3 = Math.abs(toPosition.x);
                    d4 = Math.abs(toPosition.x + this.config.cubeX / 2);
                }
            } else {
                if (fromPosition.x === toPosition.x) {
                    // -z 方向
                    d = Math.abs(position.z);
                    d1 = Math.abs(fromPosition.z - this.config.cylinderRadius);
                    d2 = Math.abs(toPosition.z + this.config.cylinderRadius);
                    d3 = Math.abs(toPosition.z);
                    d4 = Math.abs(toPosition.z - this.config.cylinderRadius);
                } else {
                    // x 方向
                    d = Math.abs(position.x);
                    d1 = Math.abs(fromPosition.x + this.config.cylinderRadius);
                    d2 = Math.abs(toPosition.x - this.config.cylinderRadius);
                    d3 = Math.abs(toPosition.x);
                    d4 = Math.abs(toPosition.x + this.config.cylinderRadius);
                }
            }
        }

        return { d: d, d1: d1, d2: d2, d3: d3, d4: d4 };
    },

    getNextDistance: function getNextDistance() {
        var d, d1, d2, d3, d4;
        var fromObj = this.cubes[this.cubes.length - 2];
        var fromPosition = fromObj.position;
        var fromType = fromObj.geometry instanceof THREE.CubeGeometry ? 'cube' : 'cylinder';

        var toObj = this.cubes[this.cubes.length - 1];
        var toPosition = toObj.position;
        var toType = toObj.geometry instanceof THREE.CubeGeometry ? 'cube' : 'cylinder';

        var jumpObj = this.jumper;
        var position = jumpObj.position;

        var direction = this.getDirection();
        var distance = {
            x: 0, //暂时没用，先初始化0
            y: 0, //暂时没用，先初始化0
            z: 0
        };
        if (direction === 'x') {
            distance.z = toPosition.z - position.z;
        } else if (direction === 'z') {
            distance.z = toPosition.x - position.x;
        }
        return distance;
    },

    getDirection: function getDirection() {
        var direction;
        if (this.cubes.length > 1) {
            var from = this.cubes[this.cubes.length - 2];
            var to = this.cubes[this.cubes.length - 1];
            if (from.position.z === to.position.z) direction = 'x';
            if (from.position.x === to.position.x) direction = 'z';
        }
        return direction;
    },

    getRotation: function getRotation() {
        var time = this.currentFrame;
        return -Tween.Quint.easeInOut(time, 0, 2 * Math.PI, 40);
    },

    testPosition: function testPosition(position) {
        if (isNaN(position.x) || isNaN(position.y) || isNaN(position.z)) {
            console.log('position incorrect！');
        }
    },

    isPC: function isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        // console.log(userAgentInfo, flag)
        return flag;
    }
});

module.exports = Game;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var DEFAULT = {
    scale: {
        x: 0.4,
        y: 0.415,
        z: 0.415
    },
    rotation: {
        x: 0,
        y: 0,
        z: 0
    },
    position: {
        x: 0,
        y: 0,
        z: 0
    }
};

var ModelConfig = function ModelConfig() {};

ModelConfig.prototype = {
    objList: ['shoutixiang', 'shudun', 'x_hezi5', 'q_hezi4', 'd_hezi4', 'd_hezi5', 'pingtai1', 'huaban', 'dangao', 'x_fangzhuo', 'x_huaban', 'x_yuanzhu1', 'x_xigua', 'q_shudun', 'd_tiaotai', 'd_xiaoniao', 'd_pixiang', 'd_yuanzhu1', 'cheng', 'cd'],
    d_xiaoniao: {
        scale: DEFAULT.scale,
        rotation: {
            x: 0,
            y: -1 / 2,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    shoutixiang: {
        scale: DEFAULT.scale,
        rotation: {
            x: 0,
            y: -1 / 2,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    d_pixiang: {
        scale: DEFAULT.scale,
        rotation: {
            x: 0,
            y: -1 / 2,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    shudun: {
        scale: DEFAULT.scale,
        rotation: {
            x: 0,
            y: -1 / 2,
            z: 0
        },
        position: {
            x: 0,
            y: 0,
            z: 0
        }
    },
    x_hezi5: {
        scale: {
            x: 0.4,
            y: 0.415,
            z: 0.4
        },
        rotation: DEFAULT.rotation,
        position: DEFAULT.position
    },
    q_hezi4: {
        scale: {
            x: 0.4,
            y: 0.415,
            z: 0.4
        },
        rotation: DEFAULT.rotation,
        position: DEFAULT.position
    },
    d_hezi4: {
        scale: {
            x: 0.4,
            y: 0.415,
            z: 0.4
        },
        rotation: DEFAULT.rotation,
        position: DEFAULT.position
    },
    d_hezi5: {
        scale: {
            x: 0.4,
            y: 0.415,
            z: 0.4
        },
        rotation: DEFAULT.rotation,
        position: DEFAULT.position
    },
    pingtai1: DEFAULT,
    huaban: DEFAULT,
    dangao: DEFAULT,
    x_fangzhuo: DEFAULT,
    x_huaban: DEFAULT,
    x_yuanzhu1: DEFAULT,
    x_xigua: DEFAULT,
    q_shudun: DEFAULT,
    d_tiaotai: DEFAULT,
    d_yuanzhu1: DEFAULT,
    cheng: DEFAULT,
    cd: DEFAULT
};

module.exports = ModelConfig;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/*
 * Tween.js
 * t: current time（当前时间）；
 * b: beginning value（初始值）；
 * c: change in value（变化量）；
 * d: duration（持续时间）。
 * you can visit 'http://easings.net/zh-cn' to get effect
*/

var Tween = function () {
    function Tween() {}
    return Tween;
}();

Tween.prototype = {

    Linear: function Linear(t, b, c, d) {
        return c * t / d + b;
    },
    Quad: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * (t /= d) * (t - 2) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * (--t * (t - 2) - 1) + b;
        }
    },
    Cubic: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t + 2) + b;
        }
    },
    Quart: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return -c * ((t = t / d - 1) * t * t * t - 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
            return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
        }
    },
    Quint: {
        easeIn: function easeIn(t, b, c, d) {
            return c * (t /= d) * t * t * t * t + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
            return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
        }
    },
    Sine: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sin(t / d * (Math.PI / 2)) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
        }
    },
    Expo: {
        easeIn: function easeIn(t, b, c, d) {
            return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t == 0) return b;
            if (t == d) return b + c;
            if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
            return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
        }
    },
    Circ: {
        easeIn: function easeIn(t, b, c, d) {
            return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
            return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
        }
    },
    Elastic: {
        easeIn: function easeIn(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == 'undefined') p = d * .3;
            if (!a || a < Math.abs(c)) {
                s = p / 4;
                a = c;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        },
        easeOut: function easeOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d) == 1) return b + c;
            if (typeof p == 'undefined') p = d * .3;
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
        },
        easeInOut: function easeInOut(t, b, c, d, a, p) {
            var s;
            if (t == 0) return b;
            if ((t /= d / 2) == 2) return b + c;
            if (typeof p == 'undefined') p = d * (.3 * 1.5);
            if (!a || a < Math.abs(c)) {
                a = c;
                s = p / 4;
            } else {
                s = p / (2 * Math.PI) * Math.asin(c / a);
            }
            if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
            return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
        }
    },
    Back: {
        easeIn: function easeIn(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158;
            return c * (t /= d) * t * ((s + 1) * t - s) + b;
        },
        easeOut: function easeOut(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158;
            return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
        },
        easeInOut: function easeInOut(t, b, c, d, s) {
            if (typeof s == 'undefined') s = 1.70158;
            if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
            return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
        }
    },
    Bounce: {
        easeIn: function easeIn(t, b, c, d) {
            return c - Tween.Bounce.easeOut(d - t, 0, c, d) + b;
        },
        easeOut: function easeOut(t, b, c, d) {
            if ((t /= d) < 1 / 2.75) {
                return c * (7.5625 * t * t) + b;
            } else if (t < 2 / 2.75) {
                return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
            } else if (t < 2.5 / 2.75) {
                return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
            } else {
                return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
            }
        },
        easeInOut: function easeInOut(t, b, c, d) {
            if (t < d / 2) {
                return Tween.Bounce.easeIn(t * 2, 0, c, d) * .5 + b;
            } else {
                return Tween.Bounce.easeOut(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
            }
        }
    }
};

module.exports = Tween;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


//createjs用CDN引入

var AudioManager = function AudioManager() {
    this.instances = {};
    this.isOk = 0;
    this.audioConfig = [
    // 'bg',
    'cool', 'perfect', 'success', 'fail', 'start', 'push', 'push_loop'];
    this.SoundJS = createjs.Sound;

    this._registerMusic();
    this._initMusicInstance();
};

Object.assign(AudioManager.prototype, {
    _registerMusic: function _registerMusic() {
        var _this = this;

        // console.log(createjs, this.SoundJS)
        this.SoundJS.alternateExtensions = ["mp3"];
        this.SoundJS.on("fileload", function () {
            _this.isOk += 1;
            if (_this.isOk == 6) console.log("Loading Sound ... 100%");
        });
        for (var i = 0; i < this.audioConfig.length; i++) {
            var c = this.audioConfig[i];
            // this.SoundJS.registerSound(`../../res/audio/${c}.mp3`, c, i);
            this.SoundJS.registerSound('./res/audio/' + c + '.mp3', c, i);
        }
    },
    _initMusicInstance: function _initMusicInstance() {
        for (var i = 0; i < this.audioConfig.length; i++) {
            var c = this.audioConfig[i];
            // let instance = this.SoundJS.play(`../../res/audio/${c}.mp3`);
            var instance = this.SoundJS.play('./res/audio/' + c + '.mp3');
            this.instances[c] = instance;
        }
    },
    play: function play(key) {
        var ins = this.instances[key];
        ins.volume = 0.7;
        if (key === 'bg') ins.volume = 0.2;else if (key === 'cool' || key === 'perfect') ins.volume = 1;
        ins.play();
    },
    stop: function stop(key) {
        var ins = this.instances[key];
        ins.stop();
    },
    replay: function replay(key) {
        var ins = this.instances[key];
        ins.play();
    }
});

module.exports = AudioManager;

/***/ })
/******/ ]);