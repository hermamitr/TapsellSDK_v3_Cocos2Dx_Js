var requestAdCallbacks = {};
var showAdCallbacks = {};
var requestNativeBannerCallbacks = {};
var requestNativeVideoCallbacks = {};
var rewardListenerCb = undefined;
var Tapsell, callbacks, nativeBannerCallbacks;

if (cc.sys.os == cc.sys.OS_ANDROID) {
	Tapsell = {
		requestAd: function(
			zoneId,
			isCached,
			onAdAvailable,
			onNoAdAvailable,
			onError,
			onNoNetwork,
			onExpiring
		) {
			requestAdCallbacks[zoneId] = {
				ON_AD_AVAILABLE_CB: onAdAvailable,
				ON_ERROR_CB: onError,
				ON_NO_AD_AVAILABLE_CB: onNoAdAvailable,
				ON_NO_NETWORK_CB: onNoNetwork,
				ON_EXPIRING_CB: onExpiring
			};
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"requestAd",
				"(Ljava/lang/String;Z)V",
				zoneId,
				isCached
			);
		},

		showAd: function(zoneId, adId, adOptions, onOpened, onClosed) {
			showAdCallbacks[zoneId] = {
				ON_OPENED_CB: onOpened,
				ON_CLOSED_CB: onClosed
			};
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"showAd",
				"(Ljava/lang/String;ZZIZ)V",
				adId,
				adOptions.back_disabled,
				adOptions.immersive_mode,
				adOptions.rotation_mode,
				adOptions.show_exit_dialog
			);
		},

		setRewardListener: function(rewardListener) {
			rewardListenerCb = rewardListener;
		},

		requestNativeBannerAd: function(
			zoneId,
			onAdAvailable,
			onNoAdAvailable,
			onNoNetwork,
			onError
		) {
			requestNativeBannerCallbacks[zoneId] = {
				ON_AD_AVAILABLE_CB: onAdAvailable,
				ON_ERROR_CB: onError,
				ON_NO_AD_AVAILABLE_CB: onNoAdAvailable,
				ON_NO_NETWORK_CB: onNoNetwork
			};
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"requestNativeBannerAd",
				"(Ljava/lang/String;)V",
				zoneId
			);
		},

		onNativeBannerAdShown: function(adId) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"nativeBannerAdShown",
				"(Ljava/lang/String;)V",
				adId
			);
		},

		onNativeBannerAdClicked: function(adId) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"nativeBannerAdClicked",
				"(Ljava/lang/String;)V",
				adId
			);
		},

		requestNativeVideoAd: function(
			zoneId,
			onAdAvailable,
			onNoAdAvailable,
			onNoNetwork,
			onError
		) {
			requestNativeVideoCallbacks[zoneId] = {
				ON_AD_AVAILABLE_CB: onAdAvailable,
				ON_ERROR_CB: onError,
				ON_NO_AD_AVAILABLE_CB: onNoAdAvailable,
				ON_NO_NETWORK_CB: onNoNetwork
			};
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"requestNativeVideoAd",
				"(Ljava/lang/String;)V",
				zoneId
			);
		},

		onNativeVideoAdShown: function(adId) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"nativeVideoAdShown",
				"(Ljava/lang/String;)V",
				adId
			);
		},

		onNativeVideoAdClicked: function(adId) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"nativeVideoAdClicked",
				"(Ljava/lang/String;)V",
				adId
			);
		},

		initialize: function(appKey) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"initialize",
				"(Ljava/lang/String;)V",
				appKey
			);
		},
		setDebugMode: function(mode) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"setDebugMode",
				"(Z)V",
				mode
			);
		},
		isDebugMode: function() {
			return jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"isDebugMode",
				"()Z"
			);
		},
		setAppUserId: function(appUserId) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"setAppUserId",
				"(Ljava/lang/String;)V",
				appUserId
			);
		},
		getAppUserId: function() {
			return jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"getAppUserId",
				"()Ljava/lang/String;"
			);
		},
		setPermissionHandlerConfig: function(permissionHandlerConfig) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"setPermissionHandlerConfig",
				"(I)V",
				permissionHandlerConfig
			);
		},
		getVersion: function() {
			return jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"getVersion",
				"()Ljava/lang/String;"
			);
		},
		setMaxAllowedBandwidthUsage: function(maxBpsSpeed) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"setMaxAllowedBandwidthUsage",
				"(I)V",
				maxBpsSpeed
			);
		},
		setMaxAllowedBandwidthUsagePercentage: function(maxPercentage) {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"setMaxAllowedBandwidthUsagePercentage",
				"(I)V",
				maxPercentage
			);
		},
		clearBandwidthUsageConstrains: function() {
			jsb.reflection.callStaticMethod(
				"org/cocos2dx/javascript/Tapsell",
				"clearBandwidthUsageConstrains",
				"()V"
			);
		},

		ROTATION_LOCKED_PORTRAIT: 1,
		ROTATION_LOCKED_LANDSCAPE: 2,
		ROTATION_UNLOCKED: 3,
		ROTATION_LOCKED_REVERSED_LANDSCAPE: 4,
		ROTATION_LOCKED_REVERSED_PORTRAIT: 5
	};

	nativeBannerCallbacks = {
		onAdAvailable: function(zoneId, adId) {
			if (requestNativeBannerCallbacks[zoneId]["ON_AD_AVAILABLE_CB"]) {
				requestNativeBannerCallbacks[zoneId]["ON_AD_AVAILABLE_CB"](
					adId
				);
				requestNativeBannerCallbacks[zoneId][
					"ON_AD_AVAILABLE_CB"
				] = undefined;
			}
		},
		onNoAdAvailable: function(zoneId) {
			if (requestNativeBannerCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]) {
				requestNativeBannerCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]();
				requestNativeBannerCallbacks[zoneId][
					"ON_NO_AD_AVAILABLE_CB"
				] = undefined;
			}
		},
		onNoNetwork: function(zoneId) {
			if (requestNativeBannerCallbacks[zoneId]["ON_NO_NETWORK_CB"]) {
				requestNativeBannerCallbacks[zoneId]["ON_NO_NETWORK_CB"]();
				requestNativeBannerCallbacks[zoneId][
					"ON_NO_NETWORK_CB"
				] = undefined;
			}
		},
		onError: function(zoneId, error) {
			if (requestNativeBannerCallbacks[zoneId]["ON_ERROR_CB"]) {
				requestNativeBannerCallbacks[zoneId]["ON_ERROR_CB"](error);
				requestNativeBannerCallbacks[zoneId]["ON_ERROR_CB"] = undefined;
			}
		}
	};

	nativeVideoCallbacks = {
		onAdAvailable: function(zoneId, adId) {
			if (requestNativeVideoCallbacks[zoneId]["ON_AD_AVAILABLE_CB"]) {
				requestNativeVideoCallbacks[zoneId]["ON_AD_AVAILABLE_CB"](adId);
				requestNativeVideoCallbacks[zoneId][
					"ON_AD_AVAILABLE_CB"
				] = undefined;
			}
		},
		onNoAdAvailable: function(zoneId) {
			if (requestNativeVideoCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]) {
				requestNativeVideoCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]();
				requestNativeVideoCallbacks[zoneId][
					"ON_NO_AD_AVAILABLE_CB"
				] = undefined;
			}
		},
		onNoNetwork: function(zoneId) {
			if (requestNativeVideoCallbacks[zoneId]["ON_NO_NETWORK_CB"]) {
				requestNativeVideoCallbacks[zoneId]["ON_NO_NETWORK_CB"]();
				requestNativeVideoCallbacks[zoneId][
					"ON_NO_NETWORK_CB"
				] = undefined;
			}
		},
		onError: function(zoneId, error) {
			if (requestNativeVideoCallbacks[zoneId]["ON_ERROR_CB"]) {
				requestNativeVideoCallbacks[zoneId]["ON_ERROR_CB"](error);
				requestNativeVideoCallbacks[zoneId]["ON_ERROR_CB"] = undefined;
			}
		}
	};

	callbacks = {
		onAdShowFinished: function(zoneId, adId, completed, rewarded) {
			if (rewardListenerCb) {
				rewardListenerCb(zoneId, adId, completed, rewarded);
			}
		},
		onAdAvailable: function(zoneId, adId) {
			if (requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"]) {
				requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"](adId);
				requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"] = undefined;
			}
		},
		onNoAdAvailable: function(zoneId) {
			if (requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]) {
				requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]();
				requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"] = undefined;
			}
		},
		onNoNetwork: function(zoneId) {
			if (requestAdCallbacks[zoneId]["ON_NO_NETWORK_CB"]) {
				requestAdCallbacks[zoneId]["ON_NO_NETWORK_CB"]();
				requestAdCallbacks[zoneId]["ON_NO_NETWORK_CB"] = undefined;
			}
		},
		onError: function(zoneId, error) {
			if (requestAdCallbacks[zoneId]["ON_ERROR_CB"]) {
				requestAdCallbacks[zoneId]["ON_ERROR_CB"](error);
				requestAdCallbacks[zoneId]["ON_ERROR_CB"] = undefined;
			}
		},
		onExpiring: function(zoneId, adId) {
			if (requestAdCallbacks[zoneId]["ON_EXPIRING_CB"]) {
				requestAdCallbacks[zoneId]["ON_EXPIRING_CB"](adId);
				requestAdCallbacks[zoneId]["ON_EXPIRING_CB"] = undefined;
			}
		},
		onOpened: function(zoneId, adId) {
			if (showAdCallbacks[zoneId]["ON_OPENED_CB"]) {
				showAdCallbacks[zoneId]["ON_OPENED_CB"](adId);
				showAdCallbacks[zoneId]["ON_OPENED_CB"] = undefined;
			}
		},
		onClosed: function(zoneId, adId) {
			if (showAdCallbacks[zoneId]["ON_CLOSED_CB"]) {
				showAdCallbacks[zoneId]["ON_CLOSED_CB"](adId);
				showAdCallbacks[zoneId]["ON_CLOSED_CB"] = undefined;
			}
		}
	};
} else if (cc.sys.os == cc.sys.OS_IOS) {
	Tapsell = {
		requestAd: function(
			zoneId,
			isCached,
			onAdAvailable,
			onNoAdAvailable,
			onError,
			onNoNetwork,
			onExpiring
		) {
			requestAdCallbacks[zoneId] = {
				ON_AD_AVAILABLE_CB: onAdAvailable,
				ON_ERROR_CB: onError,
				ON_NO_AD_AVAILABLE_CB: onNoAdAvailable,
				ON_NO_NETWORK_CB: onNoNetwork,
				ON_EXPIRING_CB: onExpiring
			};
			let cIsCached = 2;
			if (isCached) cIsCached = 1;
			jsb.reflection.callStaticMethod(
				"TSTapsell",
				"requestAd:options:",
				zoneId,
				cIsCached
			);
		},

		showAd: function(zoneId, adId, adOptions, onOpened, onClosed) {
			showAdCallbacks[zoneId] = {
				ON_OPENED_CB: onOpened,
				ON_CLOSED_CB: onClosed
			};
			jsb.reflection.callStaticMethod(
				"TSTapsell",
				"showAd:adId:backDisabled:showExitDialog:",
				adOptions.rotation_mode,
				adId,
				adOptions.back_disabled,
				adOptions.show_exit_dialog
			);
		},

		setRewardListener: function(rewardListener) {
			rewardListenerCb = rewardListener;
			jsb.reflection.callStaticMethod("TSTapsell", "setRewardListener");
		},

		initialize: function(appKey) {
			jsb.reflection.callStaticMethod("TSTapsell", "initialize:", appKey);
		},
		setDebugMode: function(mode) {
			jsb.reflection.callStaticMethod("TSTapsell", "setDebugMode:", mode);
		},
		isDebugMode: function() {
			return jsb.reflection.callStaticMethod("TSTapsell", "isDebugMode");
		},
		setAppUserId: function(appUserId) {
			jsb.reflection.callStaticMethod(
				"TSTapsell",
				"setAppUserId:",
				appUserId
			);
		},
		getAppUserId: function() {
			return jsb.reflection.callStaticMethod("TSTapsell", "getAppUserId");
		},
		getVersion: function() {
			return jsb.reflection.callStaticMethod("TSTapsell", "getVersion");
		},

		ROTATION_LOCKED_PORTRAIT: 1,
		ROTATION_LOCKED_LANDSCAPE: 2,
		ROTATION_UNLOCKED: 3,
		ROTATION_LOCKED_REVERSED_LANDSCAPE: 4,
		ROTATION_LOCKED_REVERSED_PORTRAIT: 5
	};

	callbacks = {
		onAdShowFinished: function(zoneId, adId, completed) {
			if (rewardListenerCb) {
				rewardListenerCb(zoneId, adId, completed);
			}
		},
		onAdAvailable: function(zoneId, adId) {
			if (requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"]) {
				requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"](adId);
				requestAdCallbacks[zoneId]["ON_AD_AVAILABLE_CB"] = undefined;
			}
		},
		onNoAdAvailable: function(zoneId) {
			if (requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]) {
				requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"]();
				requestAdCallbacks[zoneId]["ON_NO_AD_AVAILABLE_CB"] = undefined;
			}
		},
		onError: function(zoneId, error) {
			if (requestAdCallbacks[zoneId]["ON_ERROR_CB"]) {
				requestAdCallbacks[zoneId]["ON_ERROR_CB"](error);
				requestAdCallbacks[zoneId]["ON_ERROR_CB"] = undefined;
			}
		},
		onExpiring: function(zoneId, adId) {
			if (requestAdCallbacks[zoneId]["ON_EXPIRING_CB"]) {
				requestAdCallbacks[zoneId]["ON_EXPIRING_CB"](adId);
				requestAdCallbacks[zoneId]["ON_EXPIRING_CB"] = undefined;
			}
		},
		onOpened: function(zoneId, adId) {
			if (showAdCallbacks[zoneId]["ON_OPENED_CB"]) {
				showAdCallbacks[zoneId]["ON_OPENED_CB"](adId);
				showAdCallbacks[zoneId]["ON_OPENED_CB"] = undefined;
			}
		},
		onClosed: function(zoneId, adId) {
			if (showAdCallbacks[zoneId]["ON_CLOSED_CB"]) {
				showAdCallbacks[zoneId]["ON_CLOSED_CB"](adId);
				showAdCallbacks[zoneId]["ON_CLOSED_CB"] = undefined;
			}
		}
	};
} else {
	cc.log("This platform is not supported by tapsell sdk yet!");
	Tapsell = {
		requestAd: function(
			zoneId,
			isCached,
			onAdAvailable,
			onNoAdAvailable,
			onError,
			onNoNetwork,
			onExpiring
		) {},

		showAd: function(zoneId, adId, adOptions, onOpened, onClosed) {},

		setRewardListener: function(rewardListener) {},

		initialize: function(appKey) {},
		setDebugMode: function(mode) {},
		isDebugMode: function() {},
		setAppUserId: function(appUserId) {},
		getAppUserId: function() {},
		setPermissionHandlerConfig: function(permissionHandlerConfig) {},
		getVersion: function() {},
		setMaxAllowedBandwidthUsage: function(maxBpsSpeed) {},
		setMaxAllowedBandwidthUsagePercentage: function(maxPercentage) {},
		clearBandwidthUsageConstrains: function() {},

		ROTATION_LOCKED_PORTRAIT: 1,
		ROTATION_LOCKED_LANDSCAPE: 2,
		ROTATION_UNLOCKED: 3,
		ROTATION_LOCKED_REVERSED_LANDSCAPE: 4,
		ROTATION_LOCKED_REVERSED_PORTRAIT: 5
	};

	callbacks = {
		onAdShowFinished: function(zoneId, adId, completed, rewarded) {},
		onAdAvailable: function(zoneId, adId) {},
		onNoAdAvailable: function(zoneId) {},
		onNoNetwork: function(zoneId) {},
		onError: function(zoneId, error) {},
		onExpiring: function(zoneId, adId) {},
		onOpened: function(zoneId, adId) {},
		onClosed: function(zoneId, adId) {}
	};
}
