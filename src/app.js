var APP_KEY =
	"rashssjnjiaeqqeihgjdsihajkbkqgeqqdoftpafmlcoofdflejgmttlercbsdfbnjnjqs";
var ZONE_ID = "586e4ed1bc5c28712bd8d50c";
var AD_ID = "";

var HelloWorldLayer = cc.Layer.extend({
	sprite: null,
	ctor: function() {
		this._super();

		Tapsell.setDebugMode(true);
		Tapsell.initialize(APP_KEY);
		var size = cc.winSize;

		var menuItem1 = new cc.MenuItemFont("RequestAd", onRequestAdClicked);
		var menuItem2 = new cc.MenuItemFont("ShowAd", onShowAdClicked);

		menuItem1.setPosition(cc.p(size.width / 2, size.height / 3 * 2));
		menuItem2.setPosition(cc.p(size.width / 2, size.height / 3));

		var menu = new cc.Menu(menuItem1, menuItem2);
		menu.setPosition(cc.p(0, 0));
		this.addChild(menu, 0);

		Tapsell.setRewardListener((zoneId, adId, completed) => {
			cc.log("Reward! " + completed);
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
