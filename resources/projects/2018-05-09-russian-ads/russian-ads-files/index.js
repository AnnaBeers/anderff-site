---
---

// I'm sorry this Javascript looks so confusing and out of order -- amateurs need to practice too.

// $('#year_criteria :checkbox').prop('checked', true);

$(document).ready(function(){

  var page_id = parseFloat(getParameterByName('ad_id'));
  if (typeof page_id === 'undefined' || ! page_id) {
    page_id = 2647
    history.replaceState('', 'Russian Ad Explorer', '?ad_id=2647')
  }

  getContentByIndex(page_id, 'ad_id')

  $("#next-button").on('click', function(e){
    ad_id = parseInt($('#date_order_index').text())
    getContentByIndex(ad_id + 1, 'date_order_index')
  });

  $("#previous-button").on('click', function(e){
    ad_id = parseInt($('#date_order_index').text())
    getContentByIndex(ad_id - 1, 'date_order_index')
  });

  $("#random-button").on('click', function(e){
    ad_id = Math.floor(Math.random() * russian_ads.length);
    getContentByIndex(ad_id, 'date_order_index')
  });

  initSliders();

  //NOTE: To append in different container
  var appendToContainer = function(htmlele, record){
    console.log(record)
  };

  var afterFilter = function(result, jQ){
    $('#total-russian-ads').text(result.length);

    // var checkboxes  = $("#genre_criteria :input");

    // checkboxes.each(function(){
    //   var c = $(this), count = 0

    //   if(result.length > 0){
    //     count = jQ.where({ 'year': c.val() }).count;
    //   }
    //   c.next().text(c.val() + '(' + count + ')')
    // });

  };

  var FJS = FilterJS(russian_ads, '#russian-ads', {
    template: '#russian-ad-template',
    // search: { ele: '#searchbox' },
    search: {ele: '#searchbox', fields: ['ad_copy']}, // With specific fields
    callbacks: {
      afterFilter: afterFilter
    },
    pagination: {
      container: '#pagination',
      visiblePages: 5,
      perPage: {
        values: [12, 15, 18],
        container: '#per_page'
      },
    }
  });

  FJS.addCallback('beforeAddRecords', function(){

  });

  FJS.addCallback('beforeRender', function(){

  })

  FJS.addCallback('afterAddRecords', function(){
    // var percent = (this.recordsCount - 250)*100/250;

    // $('#stream_progress').text(percent + '%').attr('style', 'width: '+ percent +'%;');

    // if (percent == 100){
    //   $('#stream_progress').parent().fadeOut(1000);
    // }

  });

  var sortOptions = {};

  // for(i = 0; i < sort_values.length; i++) {
    // $(".sort-button").on('change', function(e){
    //   sortOptions = buildSortOptions($(this).val());
    //   FJS.filter();
    //   e.preventDefault();
    // });

    $('.sort-btn').click(function(e) {
      data_point = $(this).children().val();
      sortOptions = buildSortOptions(data_point);
      $('.sort-btn.active').removeClass("active");
      $(this).addClass("active");

      FJS.filter();

      $('.thumbnail-tag').addClass("hidden");

      if (data_point === 'ad_creation_date') {
        $('.ad_clicks_label').removeClass("hidden");
      }
      else {
        $('.' + data_point + '_label').removeClass("hidden");
      }

      chosen_sort = data_point

    });
// }

  FJS.addCallback('shortResult', function(query){
    if(sortOptions){
      query.order(sortOptions);
    }

  });

  // FJS.addCriteria({field: 'year', ele: '#year_filter', type: 'range', all: 'all'});
  // FJS.addCriteria({field: 'ad_clicks', ele: '#click_filter', type: 'range'});
  // FJS.addCriteria({field: 'ad_impressions', ele: '#impressions_filter', type: 'range'});
  // FJS.addCriteria({field: 'ad_spend', ele: '#spend_filter', type: 'range'});
  FJS.addCriteria({field: 'year', ele: '#year-criteria input:checkbox'});
  FJS.addCriteria({field: 'month', ele: '#month-criteria input:checkbox'});


  /*
   * Add multiple criterial.
    FJS.addCriteria([
      {field: 'genre', ele: '#genre_criteria input:checkbox'},
      {field: 'year', ele: '#year_filter', type: 'range'}
    ])
    */

  FJS.filter();

  sortOptions = buildSortOptions('ad_clicks');
  $(".click-btn").addClass("active");
  FJS.filter();

  window.FJS = FJS;

  // $('#all_month').on('click', function(){
  //   $('#genre_criteria :checkbox').prop('checked', $(this).is(':checked'));
  // });

  });