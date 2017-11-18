var APP_KEY =
	"qjmospqbfarbhodregqecbbnfhcjllkflpbpsmdrtpqkapdeptftldfiapfgbamkhalbij";
var ZONE_ID = "59b4d07d468465281b792cb7";
var NATIVE_BANNER_ZONEID = "59c8a9334684656c504f0e19";
var AD_ID = "";
var NATIVE_BANNER_AD_ID = "";
var nativeBannerProps = {};

var HelloWorldLayer = cc.Layer.extend({
	sprite: null,
	ctor: function() {
		this._super();
		Tapsell.setDebugMode(true);
		Tapsell.initialize(APP_KEY);
		var size = cc.winSize;

		var menuItem1 = new cc.MenuItemFont("RequestAd", onRequestAdClicked);
		var menuItem2 = new cc.MenuItemFont("ShowAd", onShowAdClicked);
		var menuItem3 = new cc.MenuItemFont(
			"RequestNativeBannerAd",
			onRequestNativeBannerAdClicked
		);

		menuItem1.setPosition(cc.p(size.width / 2, size.height / 4 * 3));
		menuItem2.setPosition(cc.p(size.width / 2, size.height / 4 * 2));
		menuItem3.setPosition(cc.p(size.width / 2, size.height / 4));

		var menu = new cc.Menu(menuItem1, menuItem2, menuItem3);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu, 1);

		var fontDef = new cc.FontDefinition();
		fontDef.fontName = "Arial";
		fontDef.fontSize = "24";
		var myLabel = new cc.LabelTTF("NativeAd Title", fontDef);
		myLabel.setPosition(cc.p(size.width / 2, size.height / 8));
		nativeBannerProps.title = myLabel;
		var ctaListener = cc.EventListener.create({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan: function(touch, event) {
				var target = event.getCurrentTarget();

				var locationInNode = target.convertToNodeSpace(
					touch.getLocation()
				);
				var s = target.getContentSize();
				var rect = cc.rect(0, 0, s.width, s.height);

				if (cc.rectContainsPoint(rect, locationInNode)) {
					target.opacity = 180;
					return true;
				}
				return false;
			},
			onTouchMoved: function(touch, event) {},
			onTouchEnded: function(touch, event) {
				var target = event.getCurrentTarget();
				cc.log("CallToAction Clicked");
				Tapsell.onNativeBannerAdClicked(NATIVE_BANNER_AD_ID);
				target.opacity = 255;
			}
		});
		cc.eventManager.addListener(ctaListener, myLabel);
		this.addChild(myLabel, -1);

		Tapsell.setRewardListener((zoneId, adId, completed, rewarded) => {
			cc.log("Reward! " + completed + " " + rewarded);
		});

		return true;
	}
});

var HelloWorldScene = cc.Scene.extend({
	onEnter: function() {
		this._super();
		var layer = new HelloWorldLayer();
		this.addChild(layer);
	}
});

var onRequestAdClicked = function() {
	cc.log("RequestAd Clicked");

	Tapsell.requestAd(
		ZONE_ID,
		true,
		function(adId) {
			cc.log("onAdAvailable");
			AD_ID = adId;
		},
		function() {
			cc.log("onNoAdAvailable");
		},
		function(error) {
			cc.log("onError: " + error);
		},
		function() {
			cc.log("onNoNetwork");
		},
		function(adId) {
			cc.log("onExpiring");
		}
	);
};
var onShowAdClicked = function() {
	cc.log("ShowAd Clicked");
	Tapsell.showAd(
		ZONE_ID,
		AD_ID,
		{
			back_disabled: false,
			immersive_mode: false,
			rotation_mode: Tapsell.ROTATION_UNLOCKED,
			show_exit_dialog: true
		},
		function(adId) {
			cc.log("onOpened");
		},
		function(adId) {
			cc.log("onClosed");
		}
	);
};
var onRequestNativeBannerAdClicked = function() {
	cc.log("RequestNativeBannerAd Clicked");

	Tapsell.requestNativeBannerAd(
		NATIVE_BANNER_ZONEID,
		function(adProps) {
			cc.log("onAdAvailable");
			nativeBannerProps.title.setString(adProps.description);
			Tapsell.onNativeBannerAdShown(adProps.ad_id);
			NATIVE_BANNER_AD_ID = adProps.ad_id;
			// cc.textureCache.addImageAsync(adProps.icon_url, function(texture) {
			// 	if (texture instanceof cc.Texture2D) {
			// 		var sprite = new cc.Sprite(texture);

			// 		cc.log("Sprite available");
			// 	} else {
			// 		cc.TextureCache.getInstance().removeAllTextures();
			// 	}
			// });
		},
		function() {
			cc.log("onNoAdAvailable");
		},
		function() {
			cc.log("onNoNetwork");
		},
		function(error) {
			cc.log("onError: " + error);
		}
	);
};
