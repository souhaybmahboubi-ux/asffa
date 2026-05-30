
import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-40 pb-16 max-w-4xl">
      <h1 class="text-4xl font-black mb-4 text-black">Kypostore: ميداليتك تلمع! ⌨️💡</h1>
      <div class="prose prose-lg max-w-none text-gray-600 leading-loose">
        <p class="mb-6 font-medium text-lg text-gray-700">
          مرحباً بكم في Kypostore، المتجر المتخصص في ميداليات الكيبورد المضيئة في الخليج العربي. بدأنا بفكرة بسيطة: نجمع بين حب التقنية والأناقة في منتج واحد مميز!
        </p>
        
        <h3 class="text-2xl font-bold text-black mt-8 mb-4">ليش Kypostore؟</h3>
        <p class="mb-6">
          نحن نعرف إن عشاق التقنية والقيمرز يحبون كل شي يعبر عن شغفهم. ميدالية Kypolight™ مب مجرد ميدالية — هي قطعة فنية تقنية تعكس شخصيتك وحبك للكيبوردات الميكانيكية والألعاب.
        </p>

        <h3 class="text-2xl font-bold text-black mt-8 mb-4">منتجنا</h3>
        <p class="mb-4">
          ميدالية Kypolight™ هي ميدالية كيبورد ميكانيكي مصغر مع إضاءة LED مدمجة بألوان RGB متغيرة. مصنوعة بجودة عالية وتفاصيل دقيقة تخلي كل من يشوفها ينبهر!
        </p>
        <ul class="list-disc pr-6 mb-6 space-y-3">
          <li><strong class="text-black">تصميم فريد:</strong> شكل كيبورد ميكانيكي مصغر بأزرار حقيقية تنضغط.</li>
          <li><strong class="text-black">إضاءة RGB:</strong> ألوان LED متغيرة تلمع بشكل خيالي.</li>
          <li><strong class="text-black">هدية مثالية:</strong> للقيمرز، المبرمجين، ومحبي التقنية.</li>
        </ul>

        <p class="mt-8 border-t border-gray-100 pt-6">
          في Kypostore، نحن ملتزمون بتقديم منتجات عالية الجودة وتجربة تسوق ممتازة لعملائنا في جميع دول الخليج.
        </p>
      </div>
    </div>
  `
})
export class AboutComponent { }

@Component({
  selector: 'app-privacy',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-40 pb-16 max-w-4xl">
      <h1 class="text-4xl font-black mb-2 text-black">سياسة الخصوصية</h1>
      <p class="text-xl text-gray-500 font-bold mb-8">خصوصيتكم أمانة لدينا</p>
      
      <div class="prose prose-lg max-w-none text-gray-600 leading-loose">
        <p class="mb-8">
          في Kypostore، نضع حماية بيانات عملائنا الكرام على رأس أولوياتنا. هذه السياسة توضح ببساطة وشفافية كيف نتعامل مع معلوماتكم لضمان تجربة تسوق آمنة ومطمئنة.
        </p>

        <div class="bg-gray-50 p-8 rounded-2xl mb-8 border border-gray-200">
          <h3 class="text-xl font-bold text-black mb-4">1. ما هي البيانات التي نجمعها؟</h3>
          <p class="mb-4">نقوم بجمع المعلومات الأساسية اللازمة فقط لإتمام عملية الشراء وتوصيل الطلب، وهي:</p>
          <ul class="list-disc pr-5 space-y-2">
            <li>الاسم (للتوصيل).</li>
            <li>العنوان (لشحن المنتج).</li>
            <li>رقم الهاتف والبريد الإلكتروني (للتواصل بشأن حالة الطلب).</li>
          </ul>
        </div>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">2. حماية البيانات</h3>
        <ul class="list-disc pr-6 mb-6 space-y-2">
          <li>لا نقوم ببيع أو تأجير أو مشاركة بياناتكم مع أي أطراف خارجية لأغراض تسويقية.</li>
          <li>بيانات التصفح تُستخدم فقط لتحسين تجربة المتجر.</li>
        </ul>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">3. الأمان والدفع</h3>
        <p class="mb-6">
          جميع عمليات الدفع تتم عبر بوابات إلكترونية آمنة ومعتمدة (Shopify). نحن لا نحتفظ ببيانات البطاقات البنكية في سجلاتنا نهائياً.
        </p>

        <div class="mt-8 pt-8 border-t border-gray-100">
           <p>إذا كان لديكم أي استفسار حول خصوصية بياناتكم، نسعد دائماً بتواصلكم معنا عبر البريد الإلكتروني الرسمي للمتجر.</p>
        </div>
      </div>
    </div>
  `
})
export class PrivacyComponent { }

@Component({
  selector: 'app-terms',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-40 pb-16 max-w-4xl">
      <h1 class="text-4xl font-black mb-2 text-black">شروط الاستخدام</h1>
      <p class="text-xl text-gray-500 font-bold mb-8">مرحباً بكم في عائلة Kypostore</p>

      <div class="prose prose-lg max-w-none text-gray-600 leading-loose">
        <p class="mb-8 bg-gray-50 p-4 rounded-xl text-gray-700 border border-gray-200">
          يرجى قراءة شروط الاستخدام التالية لضمان أفضل تجربة لكم معنا. استخدامكم للمتجر يعني موافقتكم على هذه الشروط.
        </p>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">1. المنتجات</h3>
        <p class="mb-4">
          منتجات Kypostore هي ميداليات كيبورد مضيئة بإضاءة LED، مصممة للاستخدام كاكسسوارات شخصية وهدايا. نحرص على أن تكون جميع المنتجات مطابقة للوصف والصور المعروضة.
        </p>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">2. الاسترجاع والاستبدال</h3>
        <ul class="list-disc pr-6 mb-6 space-y-2">
          <li>يحق للعميل طلب استرجاع أو استبدال المنتج خلال 14 يوم من تاريخ الاستلام.</li>
          <li>يجب أن يكون المنتج في حالته الأصلية بدون أي تلف أو استخدام.</li>
          <li>يتحمل العميل تكاليف شحن الإرجاع.</li>
        </ul>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">3. الطلبات والشحن</h3>
        <p class="mb-4">
          نحتفظ بالحق في مراجعة الطلبات لضمان صحة العناوين. في حال وجود خطأ في البيانات المدخلة من قبل العميل، يرجى التواصل معنا فوراً قبل خروج الشحنة.
        </p>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">4. التعديلات</h3>
        <p>
          يحق لـ Kypostore تحديث هذه الشروط عند الحاجة، وسيتم نشر أي تحديثات في هذه الصفحة.
        </p>
      </div>
    </div>
  `
})
export class TermsComponent { }

@Component({
  selector: 'app-shipping-policy',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-40 pb-16 max-w-4xl">
      <h1 class="text-4xl font-black mb-2 text-black">سياسة الشحن والتوصيل</h1>
      <p class="text-xl text-gray-500 font-bold mb-8">توصيل سريع وموثوق لكافة دول الخليج</p>

      <div class="prose prose-lg max-w-none text-gray-600 leading-loose">
        <p class="mb-8">
          نسعى في Kypostore لضمان وصول طلباتكم بأسرع وقت وبحالة ممتازة. شحن مجاني لجميع دول الخليج!
        </p>

        <div class="grid md:grid-cols-2 gap-8 mb-8">
            <div class="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                <h3 class="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    🌍 مناطق التوصيل
                </h3>
                <p class="text-sm">نقوم بالشحن إلى كافة دول الخليج العربي:</p>
                <ul class="list-disc pr-5 mt-2 text-sm space-y-1">
                    <li>المملكة العربية السعودية 🇸🇦</li>
                    <li>الإمارات العربية المتحدة 🇦🇪</li>
                    <li>دولة الكويت 🇰🇼</li>
                    <li>دولة قطر 🇶🇦</li>
                    <li>مملكة البحرين 🇧🇭</li>
                    <li>سلطنة عُمان 🇴🇲</li>
                </ul>
            </div>
            
            <div class="bg-gray-100 p-6 rounded-2xl border border-gray-200">
                <h3 class="text-lg font-bold text-black mb-4 flex items-center gap-2">
                    ⏱️ مدة الشحن
                </h3>
                <p class="mb-2">نحرص على شحن الطلبات بأقصى سرعة ممكنة.</p>
                <div class="bg-white p-3 rounded-lg border border-gray-200 text-center">
                    <span class="block text-xs text-gray-500 mb-1">المدة المتوقعة</span>
                    <span class="block text-xl font-black text-black">4 - 10 أيام عمل</span>
                </div>
            </div>
        </div>

        <h3 class="text-xl font-bold text-black mt-8 mb-4">ملاحظات مهمة:</h3>
        <ul class="list-disc pr-6 mb-6 space-y-2 bg-yellow-50 p-6 rounded-xl border border-yellow-100 text-yellow-800">
          <li>أيام العمل لا تشمل العطلات الرسمية أو عطلة نهاية الأسبوع.</li>
          <li>يرجى التأكد من كتابة العنوان ورقم الجوال بشكل دقيق لضمان عدم تأخر التوصيل.</li>
          <li>الشحن مجاني لجميع الطلبات في دول الخليج!</li>
        </ul>
      </div>
    </div>
  `
})
export class ShippingComponent { }

@Component({
  selector: 'app-contact',
  standalone: true,
  template: `
    <div class="container mx-auto px-4 pt-40 pb-16 max-w-2xl">
      <h1 class="text-4xl font-black mb-2 text-center text-black">اتصل بنا</h1>
      <p class="text-xl text-gray-500 font-bold mb-8 text-center">نحن هنا لمساعدتكم</p>
      
      <div class="prose prose-lg max-w-none text-gray-600 leading-loose mb-10 text-center">
        <p class="mb-6">
          سواء كنت تريد تسأل عن المنتج، أو تتابع حالة الطلب، فريق Kypostore جاهز للرد عليكم بكل ود واهتمام.
        </p>

        <div class="bg-gray-50 p-8 rounded-2xl text-right mb-8 border border-gray-200">
            <h3 class="text-lg font-bold text-black mb-4">كيف يمكننا خدمتكم؟</h3>
            <ul class="list-disc pr-5 space-y-2 mb-6">
                <li>الاستفسار عن مواصفات ميدالية Kypolight™.</li>
                <li>متابعة حالة الشحن والتوصيل.</li>
                <li>أي اقتراحات أو ملاحظات لتحسين خدماتنا.</li>
            </ul>
        </div>

        <h3 class="text-xl font-bold text-black mb-4">طرق التواصل</h3>
        <p class="mb-4">يمكنكم التواصل معنا بسهولة عبر البريد الإلكتروني:</p>
        
        <a href="mailto:support@kypostore.com" class="block w-full bg-black text-white font-bold py-4 px-6 rounded-xl hover:bg-gray-800 transition-all shadow-md font-mono text-xl dir-ltr">
            support&#64;kypostore.com
        </a>
        
        <p class="mt-4 text-sm text-gray-500">سيقوم فريقنا بالرد عليكم في أقرب وقت ممكن خلال ساعات العمل الرسمية.</p>
      </div>
    </div>
  `
})
export class ContactComponent { }
