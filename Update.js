const Queries = require('./Queries');

module.exports = {

	updateStats: function(){

		const withdrawlFees = 0.00050; // BINANCE
		const depositFees = 0.00022; // LOCALBITCOIN
		const benefits = 0.05; // Beneficios 6% (Estimado)

		let QueryLocalBitcoin = new Promise((resolve, reject) => {
			resolve(Queries.requestLocalBitcoin());
		});

		let QueryBitcoinPrice = new Promise((resolve, reject) => {
			setTimeout( () => {
				resolve(Queries.requestBitcoinPrice());
			}, 2000);
		});

		let QueryNanoPrice = new Promise((resolve, reject) => {
			setTimeout( () => {
				resolve(Queries.requestNanoPrice());
			}, 4000);
		});

		Promise.all([QueryLocalBitcoin,QueryBitcoinPrice,QueryNanoPrice])
			.then((response) => {
				setTimeout( () => {
				var nanos =  parseInt(Math.random() * (30-25) + 25);
				var taza = nanos * Stats.NANO;
				taza = taza - (withdrawlFees+depositFees);
				taza = taza * Stats.Compra;
				taza = taza / nanos;
				taza = taza - (taza*benefits);
				Stats.NANOTaza = taza.toFixed(2);
				var taza2 = (Stats.NANOUSD*Stats.USD);
				Stats.NANONeto = taza2.toFixed(2);
				Stats.NANOTrade = (taza2 - (taza2*0.15)).toFixed(2);

			}, 4000);
			})
			.catch((error) => {
				console.log("Ha Ocurrido un error... Lo estamos solucionando...");
			})

		} // FIN METODO

}