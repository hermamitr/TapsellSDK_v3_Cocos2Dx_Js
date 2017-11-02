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
    NSString* result = @"callbacks.";
    result = [result stringByAppendingString:name];
    result = [result stringByAppendingString:@"("];
    for(NSString* arg in args) {
        if([arg  isEqual: @"true"] || [arg  isEqual: @"false"]) {
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

+(void)requestAd:(NSString*)zoneId options:(NSNumber*)cacheType {
    TSAdRequestOptions* requestOptions = [[TSAdRequestOptions alloc] init];
    [requestOptions setCacheType:(CacheType)[cacheType integerValue]];
    
    [Tapsell requestAdForZone:zoneId
                   andOptions:requestOptions
                onAdAvailable:^(TapsellAd *ad){
                    [tapsellAds setObject:ad forKey:ad.getId];
                    [self callJS:[self rawJs:@"onAdAvailable" arguments:@[ad.getZoneId, ad.getId]]];
                }
                onNoAdAvailable:^{
                    [self callJS:[self rawJs:@"onNoAdAvailable" arguments:@[zoneId]]];
                }
                onError:^(NSString* error){
                    [self callJS:[self rawJs:@"onError" arguments:@[zoneId, error]]];
                }
                onExpiring:^(TapsellAd* ad){
                    [self callJS:[self rawJs:@"onExpiring" arguments:@[ad.getZoneId, ad.getId]]];
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
          [self callJS:[self rawJs:@"onOpened" arguments:@[ad.getZoneId, ad.getId]]];
      }
      andClosedCallback:^(TapsellAd * _Nullable ad){
          [self callJS:[self rawJs:@"onClosed" arguments:@[ad.getZoneId, ad.getId]]];
      }];
}

+(void)setRewardListener {
    [Tapsell setAdShowFinishedCallback:^(TapsellAd *ad, BOOL completed) {
        NSString* jsCompleted = @"false";
        if(completed)
            jsCompleted = @"true";
        [self callJS:[self rawJs:@"onAdShowFinished" arguments:@[ad.getZoneId, ad.getId, jsCompleted]]];
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
