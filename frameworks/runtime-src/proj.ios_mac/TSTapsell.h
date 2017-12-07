#import <Foundation/Foundation.h>
#import <TapsellSDKv3/TapsellSDKv3.h>

@interface TSTapsell : NSObject
+(void)initialize:(NSString *)appKey;
+(void)requestAd:(NSString*)zoneId options:(NSNumber*)cacheType;
+(void)requestNativeBannerAd:(NSString*)zoneId;
+(void)onNativeBannerAdShown:(NSString*)adId;
+(void)onNativeBannerAdClicked:(NSString*)adId;
+(void)showAd:(NSInteger)rotationMode adId:(NSString*)adId backDisabled:(BOOL)backDisabled showExitDialog:(BOOL)showExitDialog;
+(void)setRewardListener;
+(void)setDebugMode:(NSNumber*)mode;
+(NSNumber*)isDebugMode;
+(void)setAppUserId:(NSString*)appUserId;
+(NSString*)getAppUserId;
+(NSString*)getVersion;
@end
