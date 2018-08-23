	var request = require('request');
	var cheerio = require('cheerio');

	module.exports = {

		requestLocalBitcoin: function(){

		// CONSULTA DE PRECIOS VES -> BTC EN LOCALBITCOIN
		request({ url: 'https://localbitcoins.com/', encoding: 'binary' }, function(err, resp, body){
		if(!err && resp.statusCode == 200){
			
			let $ = cheerio.load(body);
			let PromCompra = 0;
			let PromVenta = 0;
			let contador = 0;
			let valor;

			// purchase-bitcoins-online
			$('#purchase-bitcoins-online .clickable .column-price').each(function(){
				contador++;
				valor = $(this).html();
				valor = valor.replace("VES","");
				valor = valor.replace(",","");
				valor = parseFloat(valor);
				PromCompra += valor;
			});
			PromCompra = PromCompra/contador;
			Stats.Compra = PromCompra.toFixed(2);

			
			contador = 0;
			//sell-bitcoins-online
			$('#sell-bitcoins-online .clickable .column-price').each(function(){
				contador++;
				valor = $(this).html();
				valor = valor.replace("VES","");
				valor = valor.replace(",","");
				valor = parseFloat(valor);
				PromVenta += valor;
			});
			PromVenta = PromVenta/contador;
			let suma = PromVenta + PromCompra;
			suma = suma.toFixed(2) / 2;
			Stats.Venta = PromVenta.toFixed(2); 
			Stats.Promedio = suma.toFixed(2);
			return true;

		}
	});

	}, // FIN METODO

	requestBitcoinPrice: function(){

	// CONSULTA A CoinMarketCap Precio Bitcoin
	// h2 text-semi-bold details-panel-item--price__value
	// https://coinmarketcap.com/currencies/bitcoin/
	request({ url: 'https://coinmarketcap.com/currencies/bitcoin/', encoding: 'binary' }, function(err, resp, body){
		if(!err && resp.statusCode == 200){
			
			let $ = cheerio.load(body);
			let valor;

			// purchase-bitcoins-online
			$('#quote_price .h2').each(function(){
				valor = $(this).html();
				valor = parseFloat(valor);
			});

			Stats.BTC = valor.toFixed(2);
			Stats.USD = Stats.Promedio / Stats.BTC;
			Stats.USD = Stats.USD.toFixed(2);
		}
		
	});

	}, // FIN METODO

	requestNanoPrice: function(){

	// Consulta A CoinMarketCap Precio de NANO 
	//https://coinmarketcap.com/currencies/nano/
	request({ url: 'https://coinmarketcap.com/currencies/nano/', encoding: 'binary' }, function(err, resp, body){
		if(!err && resp.statusCode == 200){
			
			let $ = cheerio.load(body);
			let valor;

			//text-gray span
			$('[data-format-price-crypto]').each(function(){
				valor = $(this).html();
				valor = parseFloat(valor);
				Stats.NANO = valor;
				Stats.NANOUSD = Stats.NANO * Stats.BTC;
				Stats.NANOUSD = Stats.NANOUSD.toFixed(2);
			});
		}
	});

	} // FIN METODO

	}



	

