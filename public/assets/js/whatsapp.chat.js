var url = 'https://wati-integration-service.clare.ai/ShopifyWidget/shopifyWidget.js?12326';
var s = document.createElement('script');
s.type = 'text/javascript';
s.async = true;
s.src = url;
var options = {
"enabled":true,
"chatButtonSetting":{
  "backgroundColor":"#4dc247",
  "ctaText":"Live Chat",
  "borderRadius":"25",
  "marginLeft":"0",
  "marginBottom":"50",
  "marginRight":"50",
  "position":"right"
},
"brandSetting":{
  "brandName":"Bancorp Securities Limited",
  "brandSubTitle":"Typically replies within few seconds.",
  "brandImg":"https://cdn.clare.ai/wati/images/WATI_logo_square_2.png",
  "welcomeText":"Hi, there!\nHow can we help you today?",
  "messageText":"Hello, I am chatting you from the Whatsapp live chat button on your website {{page_link}} ",
  "backgroundColor":"#4dc247",
  "ctaText":"Start Chat",
  "borderRadius":"25",
  "autoShow":false,
  "phoneNumber":"2348039446861"
}
};
s.onload = function() {
    CreateWhatsappChatWidget(options);
};
var x = document.getElementsByTagName('script')[0];
x.parentNode.insertBefore(s, x);