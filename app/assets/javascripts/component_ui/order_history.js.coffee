@OrderHistoryUi = flight.component ->
  flight.compose.mixin this, [ItemListMixin]

  @getTemplate = (order) -> $(JST["templates/order_active"](order))

  @orderHandler = (event, order) ->
    return unless order.market.id == gon.market.id

    switch order.state
      when 'wait'
        @addOrUpdateItem order
      when 'cancel'
        @removeItem order.id
      when 'done'
        @removeItem order.id

  @cancelOrder = (event) ->
    tr = $(event.target).parents('.parent_tr')
    if confirm(formatter.t('place_order')['confirm_cancel'])
      $.ajax
        url:     formatter.market_url gon.market.id, tr.data('id')
        method:  'delete'
        success: =>
          $.getJSON "https://bitgrandios.com/markets/#{gon.market.id}.json", (market_data) =>
            @trigger 'market::order_book::update', asks: market_data.gon_variables.asks, bids: market_data.gon_variables.bids
            gon.my_orders = market_data.gon_variables.my_orders
            @trigger 'order::wait::populate', orders: market_data.gon_variables.my_orders
            window.location.reload()

  @after 'initialize', ->
    @on document, 'order::wait::populate', @populate
    @on document, 'order::wait order::cancel order::done', @orderHandler
    @on @select('tbody'), 'click', @cancelOrder
