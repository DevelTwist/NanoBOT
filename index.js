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

	}


	var express = require('express');
	const Data = require('./DataConnection');
	const Queries = require('./Queries');
	var body_parser = require('body-parser');
	

	// CONSULTA WEB //

	const withdrawlFees = 0.00022;
	const depositFees = 0.00066;

	Queries.requestLocalBitcoin();
	Queries.requestBitcoinPrice();
	Queries.requestNanoPrice();

	// FIN CONSULTA

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

	bot.sendMessage(chatId, "Hola, " + username + " Este es un sistema de notificaciones que actualiza en cadencias de 45 minutos el precio de las criptomonedas (Por ahora BTC-Nano) en moneda local (valido para Venezuela). ");
	bot.sendMessage(chatId, "El Algoritmo compara el precio del Bitcoin en www.localbitcoin.com con las tazas de los compradores locales, Haciendo una aproximación estimada de los precios y brindando datos de interés. Muchas gracias por preferirnos. ");

	Sites.forEach( function(element) {
		bot.sendMessage(chatId, element.name +" --> "+ element.url);
	});
	
});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  //bot.sendMessage(chatId, '');
});





