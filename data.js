$(document).ready(function() {

    var coin_channel = ["lyl_btc", "etn_btc"];
    var coin_channel_holdings = [250000, 25555];

    for (var i = 0; i < coin_channel.length; i++) {
        coin_process_cryptopia('https://www.cryptopia.co.nz/api/GetMarket/' + coin_channel[i], coin_channel_holdings[i]);
    }
});

function coin_process_cryptopia(url, coin_channel_holdings) {
    var total_profit_value = 0;
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);

            $.get('http://free.currencyconverterapi.com/api/v3/convert?q=BTC_PHP&compact=ultra', function(data_php){
                var btc_php_price = data_php['BTC_PHP'];

                var symbol_name = (json['Data']['Label'].replace('/BTC', '')).toLowerCase();
                var price_btc = json['Data']['LastPrice'].toFixed(8);
                var php_price = btc_php_price * price_btc;
                var h = coin_channel_holdings;
                var p = php_price * h;
    
                $('.' + symbol_name + '_php').empty().append("₱" + formatNumber(php_price));
                $('.' + symbol_name + '_btc').empty().append(price_btc);
                $('.' + symbol_name + '_hold').empty().append("<b>H:</b> " + toLocaleString_format(h));
                $('.' + symbol_name + '_profit').empty().append("<b>P</b>: " + toLocaleString_format(p));
                $('#' + symbol_name + '_profit').val(p);
    
                total_profit_value = Number($('#lyl_profit').val()) + Number($('#etn_profit').val());
                $('.total_profit').empty().append("₱" + toLocaleString_format(total_profit_value));
            });
        }
    });
}


function coin_process(url, coin_channel_holdings) {
    var total_profit_value = 0;
    $.ajax({
        type: 'GET',
        url: url,
        async: false,
        dataType: "text",
        success: function (data) {
            var json = $.parseJSON(data);

            var symbol_name = (json[0].symbol).toLowerCase();
            var php_price = json[0].price_php;
            var price_btc = json[0].price_btc;
            var h = coin_channel_holdings;
            var p = php_price * h;

            $('.' + symbol_name + '_php').empty().append("₱" + formatNumber(php_price));
            $('.' + symbol_name + '_btc').empty().append(price_btc);
            $('.' + symbol_name + '_hold').empty().append("<b>H:</b> " + toLocaleString_format(h));
            $('.' + symbol_name + '_profit').empty().append("<b>P</b>: " + toLocaleString_format(p));
            $('#' + symbol_name + '_profit').val(p);

            total_profit_value = Number($('#lyl_profit').val()) + Number($('#etn_profit').val());

        }
    });

    $('.total_profit').empty().append("₱" + toLocaleString_format(total_profit_value));
}

function toLocaleString_format(num) {
    return num.toLocaleString('us', {minimumFractionDigits: 2, maximumFractionDigits: 2})
}

function formatNumber(num) {
    var n = num.toString();
    var nums = n.split('.');
    var newNum = "";
    if (nums.length > 1)
    {
        var dec = nums[1].substring(0,2);
        newNum = nums[0] + "." + dec;
    }
    else
    {
        newNum = num;
    }

    return newNum;
    //alert(newNum)
}