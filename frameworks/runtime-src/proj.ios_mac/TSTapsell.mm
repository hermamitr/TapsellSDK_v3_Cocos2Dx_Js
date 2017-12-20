#import "TSTapsell.h"
#import "cocos2d.h"
#include "cocos/scripting/js-bindings/manual/ScriptingCore.h"

NSMutableDictionary * tapsellAds;

@implementation TSTapsell

+(void)initialize:(NSString *)appKey {
    [Tapsell initializeWithAppKey:appKey];
    tapsellAds = [[NSMutableDictionary alloc] init];
}

+(void)callJS:(NSString*)jsCall {
    std::string evalString = std::string([jsCall UTF8String]);
    cocos2d::Director::getInstance()->getScheduler()->performFunctionInCocosThread([=](){
        ScriptingCore::getInstance()->evalString(evalString.c_str());
    });
}

+(NSString*)rawJs:(NSString*)name arguments:(NSArray*)args {
    NSString* result = @"";
    result = [result stringByAppendingString:name];
    result = [result stringByAppendingString:@"("];
    for(NSString* arg in args) {
        if([arg  isEqual: @"true"] || [arg  isEqual: @"false"] || [arg characterAtIndex:0] == '{') {
            result = [result stringByAppendingString:arg];
        } else {
            result = [result stringByAppendingString:@"\""];
            result = [result stringByAppendingString:arg];
            result = [result stringByAppendingString:@"\""];
        }
        result = [result stringByAppendingString:@","];
    }
    
    if([args count] > 0)
        result = [result substringToIndex:[result length]-1];
    result = [result stringByAppendingString:@")"];
    return result;
}

+(NSString*) createJSON:(NSArray*)keys withValues:(NSArray*)values {
    NSString* result = @"{";
    for(int i = 0; i < [keys count]; i++) {
        result = [result stringByAppendingString:@"\""];
        result = [result stringByAppendingString:keys[i]];
        result = [result stringByAppendingString:@"\""];
        result = [result stringByAppendingString:@":"];
        result = [result stringByAppendingString:@"\""];
        result = [result stringByAppendingString:values[i]];
        result = [result stringByAppendingString:@"\""];
        result = [result stringByAppendingString:@","];
    }
    result = [result substringToIndex:[result length]-1];
    result = [result stringByAppendingString:@"}"];
    return result;
}

+(void)requestAd:(NSString*)zoneId options:(NSNumber*)cacheType {
    TSAdRequestOptions* requestOptions = [[TSAdRequestOptions alloc] init];
    [requestOptions setCacheType:(CacheType)[cacheType integerValue]];
    
    [Tapsell requestAdForZone:zoneId
                   andOptions:requestOptions
                onAdAvailable:^(TapsellAd *ad){
                    [tapsellAds setObject:ad forKey:ad.getId];
                    [self callJS:[self rawJs:@"callbacks.onAdAvailable" arguments:@[ad.getZoneId, ad.getId]]];
                }
                onNoAdAvailable:^{
                    [self callJS:[self rawJs:@"callbacks.onNoAdAvailable" arguments:@[zoneId]]];
                }
                onError:^(NSString* error){
                    [self callJS:[self rawJs:@"callbacks.onError" arguments:@[zoneId, error]]];
                }
                onExpiring:^(TapsellAd* ad){
                    [self callJS:[self rawJs:@"callbacks.onExpiring" arguments:@[ad.getZoneId, ad.getId]]];
                }];
}

+(void)showAd:(NSInteger)rotationMode adId:(NSString*)adId backDisabled:(BOOL)backDisabled showExitDialog:(BOOL)showExitDialog {
    TSAdShowOptions* showOptions = [[TSAdShowOptions alloc] init];
    [showOptions setOrientation:(Orientation)rotationMode];
    [showOptions setBackDisabled:backDisabled];
    [showOptions setShowDialoge:showExitDialog];
    
    TapsellAd* ad = tapsellAds[adId];
    [ad showWithOptions:showOptions
      andOpenedCallback:^(TapsellAd * _Nullable ad){
          [self callJS:[self rawJs:@"callbacks.onOpened" arguments:@[ad.getZoneId, ad.getId]]];
      }
      andClosedCallback:^(TapsellAd * _Nullable ad){
          [self callJS:[self rawJs:@"callbacks.onClosed" arguments:@[ad.getZoneId, ad.getId]]];
      }];
}

+(void)requestNativeBannerAd:(NSString*)zoneId {
    [Tapsell requestNativeBannerAdForZone:zoneId
            onAdAvailable:^(TSNativeBannerAdWrapper* ad) {
                if(ad != nil) {
                    NSString* adProps = [self createJSON:@[@"ad_id",@"title",@"description",@"call_to_action_text",@"icon_url",@"portriat_image_url",@"landscape_image_url"] withValues:@[ad.adId, ad.title, ad.htmlDescription, ad.callToActionText, ad.logoUrl, ad.portriatImageUrl, ad.landscapeImageUrl]];
                    [self callJS:[self rawJs:@"nativeBannerCallbacks.onAdAvailable" arguments:@[zoneId, adProps]]];
                }
            }
          onNoAdAvailable:^(void) {
              [self callJS:[self rawJs:@"nativeBannerCallbacks.onNoAdAvailable" arguments:@[zoneId]]];
          }
                  onError:^(NSString* error) {
                      [self callJS:[self rawJs:@"nativeBannerCallbacks.onError" arguments:@[zoneId, error]]];
                  }];
}

+(void)onNativeBannerAdShown:(NSString*)adId {
    [Tapsell nativeBannerAdShowWithAdId:adId];
}
+(void)onNativeBannerAdClicked:(NSString*)adId {
    [Tapsell nativeBannerAdClickedWithAdId:adId];
}

+(void)requestNativeVideoAd:(NSString*)zoneId {
    [Tapsell requestNativeVideoAdForZone:zoneId
                            onAdAvailable:^(TSNativeVideoAdWrapper* ad) {
                                if(ad != nil) {
                                    NSString* adProps = [self createJSON:@[@"ad_id",@"title",@"description",@"call_to_action_text",@"icon_url",@"video_url"] withValues:@[ad.adId, ad.title, ad.htmlDescription, ad.callToActionText, ad.logoUrl, ad.videoUrl]];
                                    [self callJS:[self rawJs:@"nativeVideoCallbacks.onAdAvailable" arguments:@[zoneId, adProps]]];
                                }
                            }
                          onNoAdAvailable:^(void) {
                              [self callJS:[self rawJs:@"nativeVideoCallbacks.onNoAdAvailable" arguments:@[zoneId]]];
                          }
                                  onError:^(NSString* error) {
                                      [self callJS:[self rawJs:@"nativeVideoCallbacks.onError" arguments:@[zoneId, error]]];
                                  }];
}

+(void)onNativeVideoAdShown:(NSString*)adId {
    [Tapsell nativeVideoAdShowWithAdId:adId];
}
+(void)onNativeVideoAdClicked:(NSString*)adId {
    [Tapsell nativeVideoAdClickedWithAdId:adId];
}

+(void)setRewardListener {
    [Tapsell setAdShowFinishedCallback:^(TapsellAd *ad, BOOL completed) {
        NSString* jsCompleted = @"false";
        if(completed)
            jsCompleted = @"true";
        [self callJS:[self rawJs:@"callbacks.onAdShowFinished" arguments:@[ad.getZoneId, ad.getId, jsCompleted]]];
    }];
}

+(void)setDebugMode:(NSNumber*)mode {
    [Tapsell setDebugMode:mode];
}
+(NSNumber*)isDebugMode {
    BOOL mode = [Tapsell isDebugMode];
    return [NSNumber numberWithBool:mode];
}
+(void)setAppUserId:(NSString*)appUserId {
    
}
+(NSString*)getAppUserId {
    return [Tapsell getAppUserId];
}
+(NSString*)getVersion {
    return [Tapsell getVersion];
}
@end
