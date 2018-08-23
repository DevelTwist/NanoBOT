/*
*	 DESARROLLADOR: @DevelTwistCode
*/
	
	Stats = {

		Compra: null,
		Venta: null,
		Promedio: null,
		BTC: null,
		USD: null,
		NANO: null,
		NANOUSD: null,
		NANONeto: null,
		NANOTrade: null,
		NANOTaza: null,

	}

	 // CONSULTA WEB //

		setInterval(function(){
			Update.updateStats();
		},600000);
		
	// FIN CONSULTA


	var express = require('express');
	const Data = require('./DataConnection');
	const Update = require('./Update');
	var body_parser = require('body-parser');
	

	const TelegramBot = require(Data.nameApi());
	// TOKEN Que genera @BotFather
	const token = Data.token();
	// Crear un Objeto TelegramBot Recibe 2 parametros Token y Polling
	const bot = new TelegramBot(token, {polling: true});


//METODOS DE FUNCIONALIDAD

//INICIALIZAR BOT
bot.onText(/\/start/, function(msg){
	
	var chatId = msg.chat.id;
	var username = msg.from.username;
	var Sites = [
		{
			name: "NanoExchange [Español]",
			url: "@NanoExchange"
		},
	]

	Update.updateStats();

	bot.sendMessage(chatId, "Hola, " + username + " Este es un sistema de notificaciones que actualiza en cadencias de 45 minutos el precio de las criptomonedas (Por ahora BTC-Nano) en moneda local (valido para Venezuela). ");
	bot.sendMessage(chatId, "El Algoritmo compara el precio del Bitcoin en www.localbitcoin.com con las tazas de los compradores locales, Haciendo una aproximación estimada de los precios y brindando datos de interés. Muchas gracias por preferirnos. ");

	Sites.forEach( function(element) {
		bot.sendMessage(chatId, element.name +" --> "+ element.url);
	});
	
});

// Matches "/echo [whatever]"
bot.onText(/\/precio/, (msg) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;



	var mensaje = " ► Precio de compra VES/BTC: " + Stats.Compra + " VES. \n" +
		  		  " ► Precio de venta VES/BTC: " + Stats.Venta + " VES. \n" +
		  		  " ► USD/BTC: " + Stats.BTC + " $. \n" +
		  		  " ► VES/USD: " + Stats.USD + " VES. \n" +
		  		  " ► BTC/NANO: " + Stats.NANO + " BTC. \n" +
		  		  " ► USD/NANO: " + Stats.NANOUSD + " USD. \n" +
		  		  " ► VES/NANO (NETO): " + Stats.NANONeto + " VES. \n" +
		  		  " ► VES/NANO (TRADING): " + Stats.NANOTrade + " VES. \n"+
		  		  " ► VES/NANO (Aproximacion Compradores): " + Stats.NANOTaza + " VES. \n";

  bot.sendMessage(chatId,mensaje);

});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, '');
});





