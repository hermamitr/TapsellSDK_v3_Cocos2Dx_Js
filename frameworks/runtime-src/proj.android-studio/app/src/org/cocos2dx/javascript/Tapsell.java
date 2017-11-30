package org.cocos2dx.javascript;
/* Created by ahmadrezasy on 10/11/17. */

import org.cocos2dx.lib.Cocos2dxActivity;
import org.cocos2dx.lib.Cocos2dxJavascriptJavaBridge;

import ir.tapsell.sdk.TapsellCocos2D;
import ir.tapsell.sdk.TapsellCocos2DListener;
import ir.tapsell.sdk.TapsellCocos2DModule;
import ir.tapsell.sdk.nativeads.TapsellCocos2DNativeJsListener;

public class Tapsell {

    private static final String TAG = "cocos2d-x";

    private static TapsellCocos2DModule tapsellCocos2DModule = null;
    private static Cocos2dxActivity app = null;
    private TapsellCocos2D tapsellCocos2D = null;
    private static final String COMMA = ",";

    public static void newInstance(Cocos2dxActivity app) {
        Tapsell.app = app;
        tapsellCocos2DModule = new TapsellCocos2DModule(app);
        Tapsell tapsell = new Tapsell();
        tapsell.initializeTapsell();
    }

    private static String createJSParam(String param, boolean comma) {
        String postfix = comma ? COMMA : "";
        return "\"" + param + "\"" + postfix;
    }

    private static String createJSParam(int param, boolean comma) {
        String postfix = comma ? COMMA : "";
        return "\"" + param + "\"" + postfix;
    }

    private static String createJSParam(boolean param, boolean comma) {
        String postfix = comma ? COMMA : "";
        return "\"" + param + "\"" + postfix;
    }

    private void initializeTapsell() {

        tapsellCocos2D = TapsellCocos2D.newInstance(new TapsellCocos2DListener() {
            @Override
            public void onAdShowFinished(final String zoneId, final String adId, final boolean completed, final boolean rewarded) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onAdShowFinished(" +
                                createJSParam(zoneId, true) +
                                createJSParam(adId, true) +
                                createJSParam(completed, true) +
                                createJSParam(rewarded, false)+ ");");
                    }
                });
            }

            @Override
            public void onAdAvailable(final String zoneId, final String adId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onAdAvailable(" +
                                createJSParam(zoneId, true) +
                                createJSParam(adId, false) + ");");
                    }
                });

            }

            @Override
            public void onError(final String zoneId, final String error) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onError(" +
                                createJSParam(zoneId, true) +
                                createJSParam(error, false) + ");");
                    }
                });
            }

            @Override
            public void onNoAdAvailable(final String zoneId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onNoAdAvailable(" +
                                createJSParam(zoneId, false) + ");");
                    }
                });

            }

            @Override
            public void onNoNetwork(final String zoneId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onNoNetwork(" +
                                createJSParam(zoneId, false) + ");");
                    }
                });
            }

            @Override
            public void onExpiring(final String zoneId, final String adId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onExpiring(" +
                                createJSParam(zoneId, true) +
                                createJSParam(adId, false) + ");");
                    }
                });
            }

            @Override
            public void onClosed(final String zoneId, final String adId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onClosed(" +
                                createJSParam(zoneId, true) +
                                createJSParam(adId, false) + ");");
                    }
                });

            }

            @Override
            public void onOpened(final String zoneId, final String adId) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString("callbacks.onOpened(" +
                                createJSParam(zoneId, true) +
                                createJSParam(adId, false) + ");");
                    }
                });
            }
        });
    }

    public static void initialize(String appKey) {
        tapsellCocos2DModule.initialize(appKey);
    }

    public static void showAd(final String adId, final boolean back_disabled, final boolean immersive_mode, final int rotation_mode,
                              final boolean showExitDialog) {

        tapsellCocos2DModule.showAd(adId, back_disabled, immersive_mode, rotation_mode,
                showExitDialog);

    }

    public static void requestAd(String zoneId, boolean isCached) {
        tapsellCocos2DModule.requestAd(zoneId, isCached);
    }



    public static void nativeBannerAdShown(String ad_id) {
        tapsellCocos2DModule.nativeBannerAdShown(ad_id, app);
    }

    public static void nativeBannerAdClicked(String ad_id) {
        tapsellCocos2DModule.nativeBannerAdClicked(ad_id, app);
    }

    public static void requestNativeBannerAd(final String zoneId) {
        tapsellCocos2DModule.requestNativeBannerAd(zoneId, app, new TapsellCocos2DNativeJsListener() {
            @Override
            public void onAdAvailable(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onNoAdAvailable(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onNoNetwork(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onError(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }
        });
    }

    public static void nativeVideoAdShown(String ad_id) {
        tapsellCocos2DModule.nativeVideoAdShown(ad_id, app);
    }

    public static void nativeVideoAdClicked(String ad_id) {
        tapsellCocos2DModule.nativeVideoAdClicked(ad_id, app);
    }

    public static void requestNativeVideoAd(final String zoneId) {
        tapsellCocos2DModule.requestNativeVideoAd(zoneId, app, new TapsellCocos2DNativeJsListener() {
            @Override
            public void onAdAvailable(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onNoAdAvailable(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onNoNetwork(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }

            @Override
            public void onError(final String jsCall) {
                app.runOnGLThread(new Runnable() {
                    @Override
                    public void run() {
                        Cocos2dxJavascriptJavaBridge.evalString(jsCall);
                    }
                });
            }
        });
    }

    public static void setDebugMode(boolean debug) {
        tapsellCocos2DModule.setDebugMode(debug);
    }

    public static boolean isDebugMode() {
        return tapsellCocos2DModule.isDebugMode();
    }

    public static void setAppUserId(String appUserId) {
        tapsellCocos2DModule.setAppUserId(appUserId);
    }

    public static String getAppUserId() {
        return tapsellCocos2DModule.getAppUserId();
    }

    public static void setPermissionHandlerConfig(int permissionHandlerConfig) {
        tapsellCocos2DModule.setPermissionHandlerConfig(permissionHandlerConfig);
    }

    public static String getVersion() {
        return tapsellCocos2DModule.getVersion();
    }

    public static void setMaxAllowedBandwidthUsage(int maxBpsSpeed) {
        tapsellCocos2DModule.setMaxAllowedBandwidthUsage(maxBpsSpeed);
    }

    public static void setMaxAllowedBandwidthUsagePercentage(int maxPercentage) {
        tapsellCocos2DModule.setMaxAllowedBandwidthUsagePercentage(maxPercentage);
    }

    public static void clearBandwidthUsageConstrains() {
        tapsellCocos2DModule.clearBandwidthUsageConstrains();
    }
}
