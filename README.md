<div dir="rtl">
<h1>مستندات راه‌اندازی تبلیغات تپسل در Cocos2D-x</h1>
(نسخه اندروید: ۳.۰.۳۲) پشتیبانی از اندروید ۲.۳ و بالاتر
کتابخانه تپسل از نسخه اندروید ۲.۳ و بالاتر پشتیبانی می‌کند و در نتیجه بر روی تقریبا تمامی دستگاه‌های فعال روی مارکت
قابل اجرا است.نسخه نرم افزار Cocos2D-x و کتابخانه اندروید مورد نیاز
جهت استفاده از SDK تپسل و تهیه خروجی اندروید در Cocos2D-x می‌بایست از build tools نسخه ۲۳ و بالاتر
و همچنین نسخه ۳ و بالاتر Cocos2D-x استفاده کنید. فهرست مطالب
<ul>
	<li>
		<a href="#android-init">راه اندازی پروژه Cocos2dx با زبان JavaScript (اندروید)</a>
	</li>
	<li>
		<a href="#ios-init">راه اندازی پروژه Cocos2dx با زبان JavaScript پلتفرم iOS</a>
	</li>
	<li>
		<a href="#rewarded">پیاده‌سازی تبلیغات ویدئویی (Interstitial/Rewarded Video) و بنری تمام صفحه (Interstitial Banner) در پروژه Cocos2dx زبان
			JavaScript</a>
	</li>
	<li>
		<a href="#native-banner">پیاده‌سازی تبلیغات بنری هم‌نما (Native Banner) در پروژه Cocos2dx زبان Javascript</a>
	</li>
	<li>
		<a href="#native-video">پیاده‌سازی تبلیغات ویدیویی هم‌نما (Native Video) در پروژه Cocos2dx زبان Javascript</a>
	</li>
	<li>
		<a href="#standard-banner">پیاده‌سازی تبلیغات بنری استاندارد (Standard Banner) در پروژه Cocos2dx Javascript</a>
	</li>
</ul>

<div id="android-init">
<h2>راه اندازی پروژه Cocos2dx با زبان JavaScript (اندروید)</h2>
<h3>گام ۱: دریافت پلاگین تپسل برای Cocos2dx-JS</h3>
ابتدا فایل پلاگین تپسل برای Cocos2dxJS را از آدرس زیر را دانلود کنید.
<p style="text-align: center;">
	<a href="https://storage.backtory.com/tapsell-server/sdk/tapsell-cocos2dx-android-js.zip">
		<button>دانلود پلاگین</button>
	</a>
</p>

<h3>گام ۲: اضافه کردن tapsell.jar به پروژه اندروید</h3>
فایل tapsell.jar موجود در پلاگین تپسل (دانلود شده از گام ۱) ، را در پوشه
<code>frameworks/runtime-src/proj.android-studio/app/libs</code> از محل پروژه خود ، کپی کنید.
<h3>گام ۳: اضافه کردن فایل Tapsell.java به پروژه اندروید</h3>
فایل Tapsell.java موجود در پلاگین تپسل را در پوشه
<code>frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript</code> از محل پروژه خود ، کپی کنید.
<h3>گام ۴: اضافه کردن TapsellAdActivity به AndroidManifest.xml</h3>
فایل AndroidManifest.xml پروژه اندروید (واقع در پوشه
<code>frameworks/runtime-src/proj.android-studio/app</code> از محل پروژه) را باز کرده و تکه کد زیر را درون تگ
<code>&lt;application&gt;...&lt;/application&gt;</code> قرار دهید :
<pre style="color: #000000; background: #ffffff;"dir="ltr"><span style="color: #696969;">// AndroidManifest.xml</span>
<span style="color: #808030;">&lt;</span>activity
<span style="color: #e34adc;">    android:</span>name<span style="color: #808030;">=</span><span style="color: #800000;">"</span><span style="color: #0000e6;">ir.tapsell.sdk.TapsellAdActivity</span><span style="color: #800000;">"</span>
<span style="color: #e34adc;">    android:</span>label<span style="color: #808030;">=</span><span style="color: #800000;">"</span><span style="color: #0000e6;">TapsellAdActivity</span><span style="color: #800000;">"</span>
<span style="color: #e34adc;">    android:</span>configChanges<span style="color: #808030;">=</span><span style="color: #800000;">"</span><span style="color: #0000e6;">keyboard|keyboardHidden|orientation|screenSize</span><span style="color: #800000;">"</span>
<span style="color: #e34adc;">    android:</span>windowSoftInputMode<span style="color: #808030;">=</span><span style="color: #800000;">"</span><span style="color: #0000e6;">adjustPan</span><span style="color: #800000;">"</span><span style="color: #808030;">&gt;</span>
<span style="color: #808030;">&lt;</span><span style="color: #808030;">/</span>activity<span style="color: #808030;">&gt;</span>
</pre>
<h3>گام ۵: صدا زدن تابع newInstance در شروع برنامه اندروید</h3>
در Launcher Activity پروژه اندروید خود (پیشفرض cocos2dx فایل
<code>frameworks/runtime-src/proj.android-studio/app/src/org/cocos2dx/javascript/AppActivity.java</code> می باشد) ، در تابع onCreate
یا onCreateView ، تابع Tapsell.newInstance را صدا بزنید :
<pre style="color: #000000; background: #ffffff;"dir="ltr"><span style="color: #696969;">// AppActivity.java</span>
<span style="color: #800000; font-weight: bold;">public</span> <span style="color: #800000; font-weight: bold;">class</span> AppActivity <span style="color: #800000; font-weight: bold;">extends</span> Cocos2dxActivity <span style="color: #800080;">{</span>

    <span style="color: #808030;">@</span>Override
    <span style="color: #800000; font-weight: bold;">public</span> Cocos2dxGLSurfaceView onCreateView<span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        Cocos2dxGLSurfaceView glSurfaceView <span style="color: #808030;">=</span> <span style="color: #800000; font-weight: bold;">new</span> Cocos2dxGLSurfaceView<span style="color: #808030;">(</span><span style="color: #800000; font-weight: bold;">this</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
        Tapsell<span style="color: #808030;">.</span>newInstance<span style="color: #808030;">(</span><span style="color: #800000; font-weight: bold;">this</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
        glSurfaceView<span style="color: #808030;">.</span>setEGLConfigChooser<span style="color: #808030;">(</span><span style="color: #008c00;">5</span><span style="color: #808030;">,</span> <span style="color: #008c00;">6</span><span style="color: #808030;">,</span> <span style="color: #008c00;">5</span><span style="color: #808030;">,</span> <span style="color: #008c00;">0</span><span style="color: #808030;">,</span> <span style="color: #008c00;">16</span><span style="color: #808030;">,</span> <span style="color: #008c00;">8</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
        <span style="color: #800000; font-weight: bold;">return</span> glSurfaceView<span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span>
<span style="color: #800080;">}</span>
</pre>
<h3>گام ۶:‌ اضافه کردن فایل tapsell.js به پروژه cocos2dx</h3>
فایل tapsell.js موجود در پلاگین تپسل را در فولدر /src از پروژه کپی کنید. سپس فایل
<code>project.json</code> موجود در روت پروژه را باز کنید و فیلد
<code>"src/tapsell.js"</code> را به آرایه
<code>jsList</code> اضافه کنید :
<pre style="color: #000000; background: #ffffff;"dir="ltr"><span style="color: #696969;">// project.json</span>
<span style="color: #800080;">{</span>
    <span style="color: #808030;">.</span><span style="color: #808030;">.</span><span style="color: #808030;">.</span>
    <span style="color: #800000;">"</span><span style="color: #0000e6;">jsList</span><span style="color: #800000;">"</span><span style="color: #800080;">:</span> <span style="color: #808030;">[</span><span style="color: #800000;">"</span><span style="color: #0000e6;">src/resource.js</span><span style="color: #800000;">"</span><span style="color: #808030;">,</span> <span style="color: #800000;">"</span><span style="color: #0000e6;">src/app.js</span><span style="color: #800000;">"</span><span style="color: #808030;">,</span> <span style="color: #800000;">"</span><span style="color: #0000e6;">src/tapsell.js</span><span style="color: #800000;">"</span><span style="color: #808030;">]</span>
    <span style="color: #808030;">.</span><span style="color: #808030;">.</span><span style="color: #808030;">.</span>
<span style="color: #800080;">}</span>
</div>

<div id="ios-init">
<h2>راه اندازی پروژه Cocos2dx با زبان JavaScript پلتفرم iOS</h2>
<h3>
	<strong>گام ۱: تنظیمات پروژه Xcode</strong>
</h3>
قبل از هر کاری ابتدا پروژه iOS واقع در
<span class="s1">
	<code>frameworks/runtime-src/proj.ios_mac</code> از محل پروژه خود را با xcode باز کرده و تنظیمات لینک زیر را در آن اعمال کنید
	: (دقت کنید که برای اضافه کردن فریمورک تپسل به پروژه Xcode باید Deployment Target بالاتر از iOS 8.0 باشد.)</span>
<p style="text-align: center;">
	<a href="https://answers.tapsell.ir?ht_kb=ios-sdk">
		<button>تنظیم پروژه Xcode</button>
	</a>
</p>

<h3>
	<strong>گام ۲: اضافه کردن کلاس TSTapsell به پروژه Xcode</strong>
</h3>
فایل های پلاگین تپسل ( tapsell-cocos2dx-ios-js ) را از لینک زیر دانلود کنید :
<p style="text-align: center;">
	<a href="https://storage.backtory.com/tapsell-server/sdk/tapsell-cocos2dx-ios-js.zip">
		<button>پلاگین تپسل</button>
	</a>
</p>
<p style="text-align: right;">فایل های TSTapsell.h و TSTapsell.mm را به پروژه ios در پوشه ios اضافه کنید. مانند تصویر زیر :</p>
<p style="text-align: right;">
	<img class="wp-image-1972 aligncenter" src="https://answers.tapsell.ir/wp-content/uploads/2017/11/screenshot-tstapsell.png"
	    alt="" width="218" height="413" />
</p>

<h3>گام ۳:‌ اضافه کردن فایل tapsell.js به پروژه cocos2dx</h3>
فایل tapsell.js موجود در پلاگین تپسل را در فولدر /src از پروژه کپی کنید. سپس فایل
<code>project.json</code> موجود در روت پروژه را باز کنید و فیلد
<code>"src/tapsell.js"</code> را به آرایه
<code>jsList</code> اضافه کنید :
<pre style="color: #000000; background: #ffffff;"dir="ltr"><span style="color: #696969;">// project.json</span>
<span style="color: #800080;">{</span>
    <span style="color: #808030;">.</span><span style="color: #808030;">.</span><span style="color: #808030;">.</span>
    <span style="color: #800000;">"</span><span style="color: #0000e6;">jsList</span><span style="color: #800000;">"</span><span style="color: #800080;">:</span> <span style="color: #808030;">[</span><span style="color: #800000;">"</span><span style="color: #0000e6;">src/resource.js</span><span style="color: #800000;">"</span><span style="color: #808030;">,</span> <span style="color: #800000;">"</span><span style="color: #0000e6;">src/app.js</span><span style="color: #800000;">"</span><span style="color: #808030;">,</span> <span style="color: #800000;">"</span><span style="color: #0000e6;">src/tapsell.js</span><span style="color: #800000;">"</span><span style="color: #808030;">]</span>
    <span style="color: #808030;">.</span><span style="color: #808030;">.</span><span style="color: #808030;">.</span>
<span style="color: #800080;">}</span></pre>
</div>

<div id="rewarded">
<h2>پیاده‌سازی تبلیغات ویدئویی (Interstitial/Rewarded Video) و بنری تمام صفحه (Interstitial Banner) در پروژه Cocos2dx زبان JavaScript</h2>
<h3>گام ۱ : راه اندازی پروژه Cocos2dx با زبان JavaScript</h3>
ابتدا به لینک زیر مراجعه کنید و پلاگین تپسل را به پروژه ی خود اضافه کنید :
<p style="text-align: center;">
	<a href="#android-init">
		<button>راه اندازی پروژه اندروید</button>
	</a>
</p>
<p style="text-align: center;">
	<a href="#ios-init">
		<button>راه اندازی پروژه iOS</button>
	</a>
</p>

<h3>گام ۲: دریافت کلید تپسل</h3>
وارد پنل مدیریت تپسل شده و با تعریف یک اپلیکیشن جدید با عنوان پکیج اپلیکیشن اندرویدی خود، یک کلید تپسل دریافت کنید.
<p style="text-align: center;">
	<a href="https://dashboard.tapsell.ir">
		<button>ورود به داشبورد تپسل</button>
	</a>
</p>

<h3>گام ۳: شروع کار با SDK تپسل</h3>
برای مقداردهی اولیه ، تابع زیر را با ورودی کلید اپ خود صدا بزنید.
<pre dir="ltr">Tapsell.initialize(<span style="color: #409b1c;">"Your tapsell appKey"</span>)</pre> ورودی appKey کلید تپسلی است که در گام قبل از پنل تپسل دریافت کردید.
<h3>گام ۴: دریافت تبلیغ</h3>
نمایش یک تبلیغ ویدئویی در اپلیکیشن به دو صورت ممکن است صورت پذیرد. یک روش، نمایش تبلیغ بصورت stream می باشد. در این حالت،
همزمان که کاربر درحال مشاهده بخشی از تبلیغ است، ادامه آن از اینترنت لود می گردد. ممکن است به دلیل کندی سرعت اینترنت، در این
حالت کاربر با مکث های متعددی در هنگام دریافت و مشاهده تبلیغ مواجه شود. برای اینکه کاربر در هنگام نمایش تبلیغ منتظر نماند
و تجربه کاربر در استفاده از اپلیکیشن بهبود یابد،روش دیگری نیز در SDK تپسل تعبیه شده است که در آن ابتدا فایل ویدئوی تبلیغاتی
بطور کامل بارگذاری شده و سپس تبلیغ نمایش داده می شود. همچنین در تپسل، تبلیغ می تواند در ناحیه‌های مختلفی از برنامه شما (مانند
فروشگاه، انتهای هر مرحله، ابتدای مرحله جهت دریافت امتیاز دوبرابر، دریافت بنزین/لایف و ...) پخش شود. در تپسل به این ناحیه‌ها
zone گفته می شود. ناحیه‌های هر اپلیکیشن در پنل تپسل تعریف می شوند. با اجرای تابع زیر، می توانید یک درخواست تبلیغ به تپسل
ارسال کرده و یک تبلیغ دریافت نمایید:
<pre dir="ltr">Tapsell.requestAd(zoneId, cached, onAdAvailable, 
    onNoAdAvailable, onError, onNoNetwork, onExpiring);
</pre> هر درخواست شامل یک ورودی
<code>zoneId</code> است که باید آن را از
<a href="https://dashboard.tapsell.ir/">داشبورد تپسل</a> در صفحه اپلیکیشن خود دریافت کنید. دقت کنید که برای این پارامتر نباید از مقدار
<code>null</code> استفاده کنید. ورودی
<code>cached</code> یک متغیر
<code>bool</code> (با مقدار True/False) می باشد که نشان می دهد که آیا تبلیغ باید ابتدا دانلود شده و سپس به کاربر نشان داده شود
یا خیر. کش کردن ویدئو تنها در ناحیه‌هایی که کاربر
با احتمال زیادی پس از باز کردن اپلیکیشن تبلیغ آن را مشاهده می‌کند، از تبلیغ Cached استفاده کنید. جهت توضیحات بیشتر درباره
روش انتخاب متد دریافت مناسب،
<a href="https://answers.tapsell.ir/?ht_kb=cached-vs-streamed">اینجا</a> را مطالعه کنید. نتیجه درخواست تبلیغ به تابع های callback ورودی بازگردانده می شود. یک نمونه پیاده سازی
تابع های callback لازم در ادامه آمده است. در onAdAvailable شناسه یک تبلیغ به شما برگردانده می شود که می بایست جهت نمایش تبلیغ
آن را ذخیره نمایید. جهت توضیحات بیشتر به قطعه کد پیاده سازی اکشن که در ادامه آمده است توجه نمایید.
<pre style="color: #000000; background: #ffffff; "dir="ltr">Tapsell<span style="color: #808030;">.</span>requestAd<span style="color: #808030;">(</span>
    ZONE_ID<span style="color: #808030;">,</span>
    <span style="color: #0f4d75;">true</span><span style="color: #808030;">,</span>
    <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adId<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
        AD_ID <span style="color: #808030;">=</span> adId<span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span><span style="color: #808030;">,</span>
    <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span><span style="color: #808030;">,</span>
    <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>error<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onError: </span><span style="color: #800000;">"</span> <span style="color: #808030;">+</span> error<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span><span style="color: #808030;">,</span>
    <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoNetwork</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span><span style="color: #808030;">,</span>
    <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adId<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
        cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onExpiring</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
    <span style="color: #800080;">}</span>
<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre> توضیحات اکشن های مختلف و شرایط اجرا شدن آن ها در جدول ۱ آمده است.
<table style="text-align: center; border-collapse: collapse;" width="100%">
	<caption>جدول ۱ اکشن های دریافت نتیجه درخواست تبلیغ</caption>
	<tbody>
		<tr style="border-bottom: 1px solid #ddd;">
			<th width="40%">تابع</th>
			<th width="60%">توضیحات (زمان اجرا)</th>
		</tr>
		<tr style="background-color: #fefefe;">
			<td dir="ltr" width="40%">onError(error : string)</td>
			<td>هنگامی که هر نوع خطایی در پروسه‌ی دریافت تبلیغ بوجود بیاید</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td dir="ltr" width="40%">onAdAvailable(adId : string)</td>
			<td width="60%">زمانی که تبلیغ دریافت شده و آماده‌ی نمایش باشد.</td>
		</tr>
		<tr style="background-color: #fefefe;">
			<td dir="ltr" width="40%">onNoAdAvailable()</td>
			<td width="60%">در صورتی که تبلیغی برای نمایش وجود نداشته باشد.</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td dir="ltr" width="40%">onNoNetwork()</td>
			<td width="60%">زمانی که دسترسی به شبکه موجود نباشد.</td>
		</tr>
		<tr style="background-color: #fefefe;">
			<td dir="ltr" width="40%">onExpiring(adId : string)</td>
			<td width="60%">زمانی که تبلیغ منقضی شود. هر تبلیغ مدت زمان مشخصی معتبر است و در صورتی که تا قبل از آن نمایش داده نشود منقضی شده و دیگر
				قابل نمایش نخواهد بود.</td>
		</tr>
	</tbody>
</table>
<h3>گام ۵: نمایش تبلیغ</h3>
هر تبلیغ یک id از نوع string دارد. جهت نمایش تبلیغ، می‌توانید از دو تابع زیر استفاده نمایید (این تابع حداکثر یک بار برای
هر تبلیغ قابل اجراست) :
<pre dir="ltr">Tapsell.showAd(zoneId, adId, adOptions);
Tapsell.showAd(zoneId, adId, adOptions, onOpened, onClosed);</pre> ورودی اول مشترک در دو تابع adOptions است که یک Object می باشد و فیلدهای اجباری زیر را شامل می شود :
<pre dir="ltr">{
  back_disabled: <span style="color: #3b5bb5;">Boolean</span>,
  immersive_mode: <span style="color: #3b5bb5;">Boolean</span>,
  rotation_mode: <span style="color: #3b5bb5;">Number</span>,
  show_exit_dialog: <span style="color: #3b5bb5;">Boolean</span>
}</pre> دو ورودی onOpened و onClosed از جنس تابع هستند و این callback ها زمان اجرا و پایان نمایش تبلیغ صدا زده می شوند.
<table style="text-align: center; border-collapse: collapse;" width="100%" cellpadding="6">
	<caption>جدول ۲ فیلدهای adOptions</caption>
	<tbody>
		<tr style="border-bottom: 1px solid #ddd;">
			<th width="40%">متغیر (نوع)</th>
			<th width="60%">توضیحات</th>
		</tr>
		<tr style="background-color: #fefefe;">
			<td dir="ltr" width="40%">back_disabled (Boolean)</td>
			<td width="60%">
				<div align="right">در هنگام پخش تبلیغ دکمه‌ی بازگشت گوشی فعال باشد یا خیر</div>
			</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td dir="ltr" width="40%">immersive_mode(Boolean)</td>
			<td width="60%">
				<div align="right">فعال‌سازی حالت Immersive در هنگام پخش تبلیغ (فقط در اندروید)</div>
			</td>
		</tr>
		<tr style="background-color: #fefefe;">
			<td dir="ltr" width="40%">rotation_mode (Number)</td>
			<td width="60%">
				<div align="right">تعیین وضعیت گوشی در هنگام پخش تبلیغ به یکی از سه حالت:</div>
				<div align="left">ROTATION_LOCKED_PORTRAIT ROTATION_LOCKED_LANDSCAPE ROTATION_UNLOCKED ROTATION_LOCKED_REVERSED_PORTRAIT ROTATION_LOCKED_REVERSED_LANDSCAPE
				</div>
			</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td dir="ltr" width="40%">show_exit_dialog(Boolean)</td>
			<td width="60%">
				<div align="right">نمایش دیالوگ اخطار در هنگام بازگشت از تبلیغات جایزه‌دار</div>
			</td>
		</tr>
	</tbody>
</table>
یک نمونه پیاده‌سازی درخواست تبلیغ در ادامه آمده است.
<pre style="color: #000000; background: #ffffff; "dir="ltr">Tapsell<span style="color: #808030;">.</span>showAd<span style="color: #808030;">(</span>
		ZONE_ID<span style="color: #808030;">,</span>
		AD_ID<span style="color: #808030;">,</span>
		<span style="color: #800080;">{</span>
			back_disabled<span style="color: #800080;">:</span> <span style="color: #0f4d75;">false</span><span style="color: #808030;">,</span>
			immersive_mode<span style="color: #800080;">:</span> <span style="color: #0f4d75;">false</span><span style="color: #808030;">,</span>
			rotation_mode<span style="color: #800080;">:</span> Tapsell<span style="color: #808030;">.</span>ROTATION_UNLOCKED<span style="color: #808030;">,</span>
			show_exit_dialog<span style="color: #800080;">:</span> <span style="color: #0f4d75;">true</span>
		<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
		<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adId<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
			cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onOpened</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
		<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
		<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adId<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
			cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onClosed</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
		<span style="color: #800080;">}</span>
<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre>
<h3>گام ۶: دریافت نتیجه نمایش تبلیغ</h3>
در صورتیکه در اپلیکیشن خود از تبلیغات جایزه‌دار استفاده می‌کنید، جهت دریافت نتیجه نمایش تبلیغ‌ها، باید یک اکشن مطابق زیر
به SDK تپسل بدهید.
<pre dir="ltr">Tapsell.setRewardListener((zoneId : string, adId : string, completed : boolean, rewarded : boolean) <span style="color: #ff7800;">=</span><span style="color: #ff7800;">&gt;</span> {
    <span style="color: #8c868f;">// onAdShowFinished</span>
    <span style="color: #3b5bb5;">cc</span><span style="color: #3b5bb5;">.log</span>(<span style="color: #409b1c;">"onAdShowFinished"</span>);
});</pre> پس از نمایش تبلیغ، اکشن onAdShowFinished اجرا می‌شود و نتیجه نمایش تبلیغ بازگردانده می‌شود. درصورتیکه تبلیغ نمایش داده شده
جایزه‌دار باشد، متغیر rewarded در این شی دارای مقدار true خواهد بود. همچنین درصورتیکه تبلیغ تا انتها دیده شود، متغیر completed
در ای شین دارای مقدار true خواهد بود. در صورتی که تبلیغ جایزه‌دار باشد و مشاهده ویدئو تا انتها انجام شده باشد، باید جایزه
درون برنامه (سکه، اعتبار، بنزین یا ...) را به کاربر بدهید.
<h3>نمونه پیاده‌سازی</h3>
یک نمونه پیاده‌سازی SDK تپسل در Cocos2dx Javascript در repository زیر آمده است.
<p style="text-align: center;">
	<a href="https://github.com/tapselladnet/TapsellSDK_v3_Cocos2Dx_Js">
		<button>مشاهده پروژه نمونه</button>
	</a>
</p>
</div>

<div id="native-banner">
<h2>پیاده‌سازی تبلیغات بنری هم‌نما (Native Banner) در پروژه Cocos2dx زبان Javascript</h2>
<h3>گام ۱ : راه اندازی پروژه Cocos2dx با زبان Javascript</h3>
ابتدا به لینک زیر مراجعه کنید و پلاگین تپسل را به پروژه ی خود اضافه کنید :
<p style="text-align: center;">
	<a href="#android-init">
		<button>راه اندازی پروژه اندروید</button>
	</a>
</p>
<p style="text-align: center;">
	<a href="#ios-init">
		<button>راه اندازی پروژه iOS</button>
	</a>
</p>

<h3>گام ۲: دریافت کلید تپسل</h3>
وارد پنل مدیریت تپسل شده و با تعریف یک اپلیکیشن جدید با عنوان پکیج اپلیکیشن اندرویدی خود، یک کلید تپسل دریافت کنید.
<p style="text-align: center;">
	<a href="https://dashboard.tapsell.ir">
		<button>ورود به داشبورد تپسل</button>
	</a>
</p>

<h3>گام ۳: شروع کار با SDK تپسل</h3>
&nbsp; برای مقداردهی اولیه ، تابع زیر را با ورودی کلید اپ خود صدا بزنید.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell.initialize(appKey);
</pre> ورودی appKey کلید تپسلی است که در گام قبل از پنل تپسل دریافت کردید.
<h3>گام ۴: دریافت تبلیغ</h3>
در تبلیغات هم‌نما، شما قادر هستید ویژگی‌های ظاهری هر یک از اجزای تبلیغ (اندازه، محل قرارگیری، رنگ فونت و…) را بصورتی که هماهنگ
با محتوای اپلیکیشن شما باشد تعیین کنید. برای این منظور، شما یک درخواست تبلیغ به SDK تپسل ارسال می کنید، محتوای یک تبلیغ هم‌نمای
بنری را دریافت کنید و آن را به نحوه مورد نظر خود نمایش دهید. جهت ارسال درخواست تبلیغ هم‌نما، از تابع زیر استفاده کنید.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell<span style="color: #808030;">.</span>requestNativeBannerAd<span style="color: #808030;">(</span>zondId <span style="color: #800080;">:</span> string<span style="color: #808030;">,</span> onAdAvailable <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> 
		onNoAdAvailable <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> onNoNetwork <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> onError <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre> ورودی zoneId، شناسه تبلیغ‌گاه از نوع بنری هم‌نما است که باید آن را از
<a href="https://dashboard.tapsell.ir/">داشبورد تپسل</a> دریافت کنید. نتیجه درخواست تبلیغ به تابع‌های ورودی بازگردانده می شود. یک نمونه پیاده سازی تابع‌های لازم
در ادامه آمده است. تابع onAdAvailable یک Object به نام adProps به عنوان پارامتر دارد که داده های تبلیغ در آن در صورت وجود
تبلیغ قرار می‌گیرد.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell<span style="color: #808030;">.</span>requestNativeBannerAd<span style="color: #808030;">(</span>
	NATIVE_BANNER_ZONEID<span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adProps<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoNetwork</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>error<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onError: </span><span style="color: #800000;">"</span> <span style="color: #808030;">+</span> error<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span>
<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre>
<h3 id="گام-۴-نمایش-تبلیغ">گام ۵: نمایش تبلیغ</h3>
برای نمایش تبلیغ، می‌بایست از داده های موجود در تابع onAdAvailable (همان adProps) استفاده کنید. توضیح این داده ها در جدول
زیر آمده است :
<table width="100%">
	<caption>جدول ۱ داده های تابع onAdAvailable (همان adProps)</caption>
	<tbody>
		<tr>
			<th width="40%">تابع</th>
			<th width="60%">توضیحات</th>
		</tr>
		<tr>
			<td width="40%">adProps.ad_id</td>
			<td>شناسه تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.title</td>
			<td>عنوان تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.description</td>
			<td width="60%">توضیحات تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.call_to_action_text</td>
			<td width="60%">متن دعوت کننده از کاربر به کلیک/نصب</td>
		</tr>
		<tr>
			<td width="40%">adProps.portrait_static_image_url</td>
			<td width="60%">لینک تصویر بنر تبلیغ (عمودی)</td>
		</tr>
		<tr>
			<td width="40%">adProps.landscape_static_image_url</td>
			<td width="60%">لینک تصویر بنر تبلیغ (افقی)</td>
		</tr>
		<tr>
			<td width="40%">adProps.icon_url</td>
			<td width="60%">لینک آیکون تبلیغ</td>
		</tr>
	</tbody>
</table>
دقت کنید که تبلیغ‌ها ممکن است هردو بنر عمودی و افقی را نداشته باشند. در زمان نمایش تبلیغ، باید تابع
<code>onNativeBannerAdShown</code> از
<code>Tapsell</code> را فراخوانی کنید ؛ این تابع یک رشته به عنوان ورودی می‌گیرد که شناسه مربوط به تبلیغی است که نمایش داده شده
است.
<pre dir="ltr">Tapsell.onNativeBannerAdShown(adId);</pre>
<h3 id="گام-۵-باز-کردن-تبلیغ">گام ۶: باز کردن تبلیغ</h3>
برای باز کردن تبلیغ، هنگامی که کاربر روی آن کلیک می‌کند، از تابع زیر استفاده کنید. این تابع یک رشته به عنوان ورودی می‌گیرد
که شناسه تبلیغی است که روی آن کلیک شده است.
<pre dir="ltr">Tapsell.onNativeBannerAdClicked(adId);</pre>
<h3>نمونه پیاده‌سازی</h3>
یک نمونه پیاده‌سازی SDK تپسل در Cocos2dx Javascript در repository زیر آمده است.
<p style="text-align: center;">
	<a href="https://github.com/tapselladnet/TapsellSDK_v3_Cocos2Dx_Js">
		<button>مشاهده پروژه نمونه</button>
	</a>
</p>
</div>

<div id="native-video">
<h2>پیاده‌سازی تبلیغات ویدیویی هم‌نما (Native Video) در پروژه Cocos2dx زبان Javascript</h2>
<h3>گام ۱ : راه اندازی پروژه Cocos2dx با زبان Javascript</h3>
ابتدا به لینک زیر مراجعه کنید و پلاگین تپسل را به پروژه ی خود اضافه کنید :
<p style="text-align: center;">
	<a href="#android-init">
		<button>راه اندازی پروژه اندروید</button>
	</a>
</p>
<p style="text-align: center;">
	<a href="#ios-init">
		<button>راه اندازی پروژه iOS</button>
	</a>
</p>

<h3>گام ۲: دریافت کلید تپسل</h3>
وارد پنل مدیریت تپسل شده و با تعریف یک اپلیکیشن جدید با عنوان پکیج اپلیکیشن اندرویدی خود، یک کلید تپسل دریافت کنید.
<p style="text-align: center;">
	<a href="https://dashboard.tapsell.ir">
		<button>ورود به داشبورد تپسل</button>
	</a>
</p>

<h3>گام ۳: شروع کار با SDK تپسل</h3>
برای مقداردهی اولیه ، تابع زیر را با ورودی کلید اپ خود صدا بزنید.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell.initialize(appKey);
</pre> ورودی appKey کلید تپسلی است که در گام قبل از پنل تپسل دریافت کردید.
<h3>گام ۴: دریافت تبلیغ</h3>
در تبلیغات هم‌نما، شما قادر هستید ویژگی‌های ظاهری هر یک از اجزای تبلیغ (اندازه، محل قرارگیری، رنگ فونت و…) را بصورتی که هماهنگ
با محتوای اپلیکیشن شما باشد تعیین کنید. برای این منظور، شما یک درخواست تبلیغ به SDK تپسل ارسال می کنید، محتوای یک تبلیغ هم‌نمای
ویدیویی را دریافت کنید و آن را به نحوه مورد نظر خود نمایش دهید. جهت ارسال درخواست تبلیغ هم‌نما، از تابع زیر استفاده کنید.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell<span style="color: #808030;">.</span>requestNativeVideoAd<span style="color: #808030;">(</span>zondId <span style="color: #800080;">:</span> string<span style="color: #808030;">,</span> onAdAvailable <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> 
		onNoAdAvailable <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> onNoNetwork <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">,</span> onError <span style="color: #800080;">:</span> <span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre> ورودی zoneId، شناسه تبلیغ‌گاه از نوع ویدیویی هم‌نما است که باید آن را از
<a href="https://dashboard.tapsell.ir/">داشبورد تپسل</a> دریافت کنید. نتیجه درخواست تبلیغ به تابع‌های ورودی بازگردانده می شود. یک نمونه پیاده سازی تابع‌های لازم
در ادامه آمده است. تابع onAdAvailable یک Object به نام adProps به عنوان پارامتر دارد که داده های تبلیغ در آن در صورت وجود
تبلیغ قرار می‌گیرد.
<pre style="color: #000000; background: #ffffff; " dir="ltr">Tapsell<span style="color: #808030;">.</span>requestNativeVideoAd<span style="color: #808030;">(</span>
	NATIVE_VIDEO_ZONEID<span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>adProps<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoAdAvailable</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span><span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onNoNetwork</span><span style="color: #800000;">"</span><span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span><span style="color: #808030;">,</span>
	<span style="color: #800000; font-weight: bold;">function</span><span style="color: #808030;">(</span>error<span style="color: #808030;">)</span> <span style="color: #800080;">{</span>
		cc<span style="color: #808030;">.</span><span style="color: #800000; font-weight: bold;">log</span><span style="color: #808030;">(</span><span style="color: #800000;">"</span><span style="color: #0000e6;">onError: </span><span style="color: #800000;">"</span> <span style="color: #808030;">+</span> error<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
	<span style="color: #800080;">}</span>
<span style="color: #808030;">)</span><span style="color: #800080;">;</span>
</pre>
<h3 id="گام-۴-نمایش-تبلیغ">گام ۵: نمایش تبلیغ</h3>
برای نمایش تبلیغ، می‌بایست از داده های موجود در تابع onAdAvailable (همان adProps) استفاده کنید. توضیح این داده ها در جدول
زیر آمده است :
<table width="100%">
	<caption>جدول ۱ داده های تابع onAdAvailable (همان adProps)</caption>
	<tbody>
		<tr>
			<th width="40%">تابع</th>
			<th width="60%">توضیحات</th>
		</tr>
		<tr>
			<td width="40%">adProps.ad_id</td>
			<td>شناسه تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.title</td>
			<td>عنوان تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.description</td>
			<td width="60%">توضیحات تبلیغ</td>
		</tr>
		<tr>
			<td width="40%">adProps.call_to_action_text</td>
			<td width="60%">متن دعوت کننده از کاربر به کلیک/نصب</td>
		</tr>
		<tr>
			<td width="40%">adProps.video_url</td>
			<td width="60%">لینک تصویر بنر تبلیغ (عمودی)</td>
		</tr>
		<tr>
			<td width="40%">adProps.icon_url</td>
			<td width="60%">لینک آیکون تبلیغ</td>
		</tr>
	</tbody>
</table>
زمانی که پخش ویدیو تمام شد، باید تابع
<code>onNativeVideoAdShown</code> از
<code>Tapsell</code> را فراخوانی کنید ؛ این تابع یک رشته به عنوان ورودی می‌گیرد که شناسه مربوط به تبلیغی است که نمایش داده شده
است.
<pre dir="ltr">Tapsell.onNativeBannerVideoAdShown(adId);</pre>
<h3 id="گام-۵-باز-کردن-تبلیغ">گام ۶: باز کردن تبلیغ</h3>
برای باز کردن تبلیغ، هنگامی که کاربر روی آن کلیک می‌کند، از تابع زیر استفاده کنید. این تابع یک رشته به عنوان ورودی می‌گیرد
که شناسه تبلیغی است که روی آن کلیک شده است.
<pre dir="ltr">Tapsell.onNativeVideoAdClicked(adId);</pre>
<h3>نمونه پیاده‌سازی</h3>
یک نمونه پیاده‌سازی SDK تپسل در Cocos2dx Javascript در repository زیر آمده است.
<p style="text-align: center;">
	<a href="https://github.com/tapselladnet/TapsellSDK_v3_Cocos2Dx_Js">
		<button>مشاهده پروژه نمونه</button>
	</a>
</p>
</div>

<div id="standard-banner"></div>
<h2>پیاده‌سازی تبلیغات بنری استاندارد در پروژه Cocos2dx Javascript</h2>
<h3>گام ۱ : راه اندازی پروژه Cocos2dx با زبان JavaScript</h3>
ابتدا به لینک زیر مراجعه کنید و پلاگین تپسل را به پروژه ی خود اضافه کنید :
<p style="text-align: center;">
	<a href="#android-init">
		<button>راه اندازی پروژه اندروید</button>
	</a>
</p>
<p style="text-align: center;">
	<a href="#ios-init">
		<button>راه اندازی پروژه iOS</button>
	</a>
</p>

<h3>گام ۲: دریافت کلید تپسل</h3>
وارد پنل مدیریت تپسل شده و با تعریف یک اپلیکیشن جدید با عنوان پکیج اپلیکیشن اندرویدی خود، یک کلید تپسل دریافت کنید.
<p style="text-align: center;">
	<a href="https://dashboard.tapsell.ir">
		<button>ورود به داشبورد تپسل</button>
	</a>
</p>

<h3>گام ۳: شروع کار با SDK تپسل</h3>
برای مقداردهی اولیه ، تابع زیر را با ورودی کلید اپ خود صدا بزنید.
<pre dir="ltr">Tapsell.initialize(<span style="color: #409b1c;">"Your tapsell appKey"</span>)</pre> ورودی appKey کلید تپسلی است که در گام قبل از پنل تپسل دریافت کردید.
<h3>گام ۴: دریافت تبلیغ</h3>
جهت نمایش بنر استاندارد، باید محلی برای نمایش آن در صفحه در نظر بگیرید. بنر استاندارد، دارای سایزهای استانداردی است که در
SDK تپسل مشخص شده اند. جهت نمایش بنر، از تابع زیر استفاده کنید:
<pre dir="ltr">Tapsell.requestStandardBannerAd(zoneId, bannerType, horizontalGravity, verticalGravity);</pre> مقدار zoneId کلیدی ست که بعد از ساخت اپلیکیشن در پنل و ثبت یک zone از نوع بنری استاندارد دریافت میکنید. ورودی BannerType
اندازه های مختلف را بیان میکند و شامل مقادیر زیر می‌باشد :
<table style="text-align: center; border-collapse: collapse;" width="100%" cellpadding="6">
	<caption>جدول ۱ مقادیر مختلف پارامتر bannerType</caption>
	<tbody>
		<tr style="border-bottom: 1px solid #ddd;">
			<th width="40%">مقدار</th>
			<th width="60%">ابعاد و نام استاندارد</th>
		</tr>
		<tr style="background-color: #fefefe;">
			<td width="40%">‌BANNER_320x50</td>
			<td width="60%">عرض ۳۲۰ - ارتفاع ۵۰ (mobile banner)</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td width="40%">BANNER_320x100</td>
			<td width="60%">عرض ۳۲۰ - ارتفاع ۱۰۰ (large mobile banner)</td>
		</tr>
		<tr style="background-color: #fefefe;">
			<td width="40%">BANNER_250x250</td>
			<td width="60%">عرض ۲۵۰ - ارتفاع ۲۵۰ (square)</td>
		</tr>
		<tr style="background-color: #f2f2f2;">
			<td width="40%">BANNER_300x250</td>
			<td width="60%">عرض ۳۰۰ - ارتفاع ۲۵۰ (medium rectangle)</td>
		</tr>
	</tbody>
</table>
ورودی horizontalGravity نشان میدهد که آیا تبلیغ، بالا یا پایین صفحه باشد و شامل TOP, BOTTOM می باشد، همچنین verticalGravity
بیان میکند که تبلیغ از جهت عرضی در کجای صفحه باشد و میتواند شامل مقادیر LEFT, RIGHT ,CENTER باشد. یک نمونه پیاده سازی کد
به شکل زیر است:
<pre dir="ltr"><span class="pl-smi">Tapsell</span>.<span class="pl-en">requestStandardBannerAd</span>(<span class="pl-c1">STANDARD_BANNER_ZONEID</span>, <span class="pl-smi">Tapsell</span>.<span class="pl-smi">BANNER_320x50</span>, <span class="pl-smi">Tapsell</span>.<span class="pl-c1">BOTTOM</span>, <span class="pl-smi">Tapsell</span>.<span class="pl-c1">CENTER</span>);</pre>
<h3>نمونه پیاده‌سازی</h3>
یک نمونه پیاده‌سازی SDK تپسل در Cocos2dx Javascript در repository زیر آمده است.
<p style="text-align: center;">
	<a href="https://github.com/tapselladnet/TapsellSDK_v3_Cocos2Dx_Js">
		<button>مشاهده پروژه نمونه</button>
	</a>
</p>

</div>
