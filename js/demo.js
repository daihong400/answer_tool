/*jslint  browser: true, white: true, plusplus: true */
/*global $, countries */
var countries = {}
$(function () {
    'use strict';

    var countriesArray = $.map(countries, function (value, key) { return { value: value, data: key }; });

    // Setup jQuery ajax mock:
    $.mockjax({
        url: '*',
        responseTime: 2000,
        response: function (settings) {
            var query = settings.data.query,
                queryLowerCase = query.toLowerCase(),
                re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi'),
                suggestions = $.grep(countriesArray, function (country) {
                     // return country.value.toLowerCase().indexOf(queryLowerCase) === 0;
                    return re.test(country.value);
                }),
                response = {
                    query: query,
                    suggestions: suggestions
                };

            this.responseText = JSON.stringify(response);
        }
    });

    // Initialize ajax autocomplete:
    $('#autocomplete-ajax').autocomplete({
        // serviceUrl: '/autosuggest/service/url',
        lookup: countriesArray,
        lookupFilter: function(suggestion, originalQuery, queryLowerCase) {
            var re = new RegExp('\\b' + $.Autocomplete.utils.escapeRegExChars(queryLowerCase), 'gi');
            return re.test(suggestion.value);
        },
        onSelect: function(suggestion) {
            $('#selction-ajax').html('You selected: ' + suggestion.value + ', ' + suggestion.data);
        },
        onHint: function (hint) {
            $('#autocomplete-ajax-x').val(hint);
        },
        onInvalidateSelection: function() {
            $('#selction-ajax').html('You selected: none');
        }
    });

    var frameTeams = ['How do I find the perfect size of frame?',
                      'Can I reply on the try-on function to pick frame size?',
                      'How do I know if the frame style fit me or not?',
                      'What kind of frame shape do you have?',
                      'What types of frames do you have?',
                      'Can I choose rimless frame with progressive lens?',
                      'Can you make sunglasses with common frames?',
                      'How to check if the frames can be made into multifocal glasses?',
                      'Does the height of progressive lens frame be at least 30mm?',
                      'Will you restock this frame?',
                      'Can I order the frame with plain lenses?',
                      'Do you offer children\'s glasses frames?',
                      'Can I just buy the frame with no lenses?'];
    var lensTeams = ['What types of lens do you offer?',
                      'Lenses introduction',
                      'What type of bifocal lens do you use?',
                      'What coatings and add-ons do you offer for your lenses?',
                      'Do you offer bifocal or progressive lenses?',
                      'Do you have prism lenses?',
                      'Can I buy lenses only to fit into my old glasses frame?',
                      'How to choose lenses?',
                      'What does single vision lens mean?',
                      'What do the numbers mean in the lens description?',
                      'How do I get thinner lens?',
                      'Can I order lenses that are both tinted and photochromic?',
                      'What is the difference between single-vision and progressive lenses?',
                      'How to clean my lenses?',
                      'Do the lenses including coating?',
                      'Which kinds of lenses are free?',
                      'What’re the difference between Tint lens, Photochromic lens and polarized lens?',
                      'Do your Photochromic lens offer full vision of view?',
                      'Can I change my lenses after ordering?'];
    var prescriptionTeams = ['What is eyeglasses prescription?',
                      'How to get a prescription?',
                      'What is PD?',
                      'Can I use my contact lens prescription to buy my eyeglasses from you?',
                      'Can I use the copy of my eyeglass prescription which was issued by my doctor 3 years ago?',
                      'Can I save my prescription?',
                      'Can I change my prescription details after I have ordered?'];
    var shippingTeams = ['How do I track my order?',
                      'Will I be charged for any extra payment apart from the products and shipping fees?',
                      'What courier service you will use for shipping my order?',
                      'How long does it take to arrive? How much does the shipping cost?',
                      'Which countries do you deliver to?',
                      'When can I be entitled to free shipping?',
                      'How do you handle shipping delays?',
                      'How long will it take to process my glasses?',
                      'I just placed several orders. Can I combine the shipments?'];
    var orderTeams = ['How to place an order at Firmoo?',
                      'What is necessary to place order at Firmoo?',
                      'How can I change or cancel the order?',
                      'How to check my order status?',
                      'What does the order status mean?',
                      'Are there any free eyeglasses tools in my order?'];
    var paymentsTeams = ['What payment method do you accept?',
                      'Is the payment environment safe?',
                      'Can I get an invoice?',
                      'Do you accept insurance as payment for my eyeglasses?'];
    var couponTeams = ['How to use the coupon?',
                      'How many coupons can I use for one order?',
                      'Can I use the same coupon for several orders?',
                      'Will the coupon be expired?',
                      'How do I get a coupon?',
                      'Why can’t I use the coupon for ordering?'];
    var othersTeams = ['What is your policy of privacy and security?',
                      'Why do I see such prompt message as "Sorry,all free xxx are given away today..."?',
                      'How can I do if the eyeglasses I receive from you need adjustment?',
                      'Home Remedy for Scratched Eyeglasses?',
                      'How to clean eyeglasses?'];
    var firmooTeams = ['What is the background of Firmoo.com?',
                      'Why are your prices so competitive?',
                      'Why choose Firmoo.com?',
                      'General obligations'];
    var cooperationTeams = ['How to cooperate with Firmoo?',
                      'Haven\'t got an email from us after submitting your application?',
                      'Do I have to pay for anything if I review your product?',
                      'What’s the benefit I can get from hosting a giveaway?',
                      'Is the giveaway international?',
                      'What should I do if the frame doesn’t suit me well?',
                      'How to run the Five $10 vouchers giveaway ?',
                      'The instructions to run free glasses WITHOUT free shipping giveaway',
                      'How to run the free glasses with free shipping +five pairs without free shipping giveaway?',
                      'Firmoo glasses review collaboration details',
                      'The instructions to run Firmoo free glasses giveaway'];
    var returnExchangeTeams = ['What’s your return and exchange policy?', 
                      'Where to donate my glasses?'];

    var framet = $.map(frameTeams, function (team) { return { value: team, data: { category: 'Frame' }}; });
    var lenst = $.map(lensTeams, function (team) { return { value: team, data: { category: 'Lens' } }; });
    var prescriptiont = $.map(prescriptionTeams, function (team) { return { value: team, data: { category: 'Prescription' } }; });
    var shippingt = $.map(shippingTeams, function (team) { return { value: team, data: { category: 'Shipping' } }; });
    var ordert = $.map(orderTeams, function (team) { return { value: team, data: { category: 'Order' } }; });
    var paymentst = $.map(paymentsTeams, function (team) { return { value: team, data: { category: 'Payments' } }; });
    var coupont = $.map(couponTeams, function (team) { return { value: team, data: { category: 'Coupont' } }; });
    var otherst = $.map(othersTeams, function (team) { return { value: team, data: { category: 'Others' } }; });
    var firmoot = $.map(firmooTeams, function (team) { return { value: team, data: { category: 'Firmoo' } }; });
    var cooperationt = $.map(cooperationTeams, function (team) { return { value: team, data: { category: 'Cooperation' } }; });
    var returnExchanget = $.map(returnExchangeTeams, function (team) { return { value: team, data: { category: 'Return & Exchange' } }; });
    
    var teams = framet.concat(lenst).concat(prescriptiont).concat(shippingt).concat(ordert).concat(paymentst).concat(coupont).concat(otherst).concat(firmoot).concat(cooperationt).concat(returnExchanget);

    // Initialize autocomplete with local lookup:
    $('#autocomplete').devbridgeAutocomplete({
        lookup: teams,
        minChars: 1,
        onSelect: function (suggestion) {
            $('#selection').html('You selected: ' + suggestion.value + ', ' + suggestion.data.category);
        },
        showNoSuggestionNotice: true,
        noSuggestionNotice: 'Sorry, no matching results',
        groupBy: 'category'
    });
    
    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-custom-append').autocomplete({
        lookup: countriesArray,
        appendTo: '#suggestions-container'
    });

    // Initialize autocomplete with custom appendTo:
    $('#autocomplete-dynamic').autocomplete({
        lookup: countriesArray
    });
});