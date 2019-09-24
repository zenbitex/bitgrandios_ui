function getLanguageFromURL() {
	const regex = new RegExp('[\\?&]lang=([^&#]*)');
	const results = regex.exec(location.search);

	return results === null ? null : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

TradingView.onready(function() {
        var x = $("#trading_view_chart").parent().width();
	
	var widget = window.tvWidget = new TradingView.widget({
			symbol: gon.market.id,
			// BEWARE: no trailing slash is expected in feed URL
			// tslint:disable-next-line:no-any
			datafeed: new window.Datafeeds.UDFCompatibleDatafeed('http://bitgrandios.com/tradingview_api/v1'),
			interval: '30',
			theme: 'Dark',
			container_id: 'trading_view_chart',
			library_path: '/trading-ui/assets/charting_library/',
			locale: getLanguageFromURL() || 'en',
			disabled_features: ['use_localstorage_for_settings', 'left_toolbar', 'header_settings'],
			enabled_features: ['study_templates'],
			charts_storage_url: 'https://saveload.tradingview.com',
			charts_storage_api_version: '1.1',
			client_id: 'tradingview.com',
			user_id: 'public_user_id',
			fullscreen: false,
			height: 400,
			width: x,
			studies_overrides: {},
			loading_screen: { foregroundColor: "#4d748b" },
			overrides: {
				
			}
	});

	widget.onChartReady(() => {
		const button = widget.createButton()
			.attr('title', 'Click to show a notification popup')
			.addClass('apply-common-tooltip')
			.on('click', () => widget.showNoticeDialog({
				title: 'Notification',
				body: 'The Peoples Currency Exchange, charts working properly',
				callback: () => {
					console.log('Noticed!');
				},
			}));

		button[0].innerHTML = 'Check API';
	});
});
