// $(document).ready(function() {
//     bitcoin_btc();

//     setInterval(function () {
//         bitcoin_btc();
//     }, 60000); // refresh every 15000 milliseconds
// });

// function bitcoin_btc() {
//     $.ajax({
//         type: 'GET',
//         url: 'https://api.coinmarketcap.com/v1/ticker/loyalcoin/?convert=PHP',
//         dataType: "text",
//         success: function (data) {
//             var json = $.parseJSON(data);
//             var price_btc = json[0].price_btc;
//             var s_result = btc_background(price_btc);

//             chrome.browserAction.setBadgeText({text: s_result });
//             chrome.browserAction.setBadgeBackgroundColor({color:'#555555'});
//         }
//     });
// }

// function btc_background(price_btc) {
//     var str_btc = price_btc;
//     var first_2 = str_btc.slice(0, 2);
//     var last_3 = str_btc.slice(-3);
//     var short = first_2 + last_3;
//     return short;
// }
