const express = require('express');
const app = express();

app.get('*', function(req, res) {
	res.send("I'm alive");
	console.log(`ping`);
});

app.listen(3000, function() {
	console.log(`server online`);
	console.log(`made by ${process.env['REPL_OWNER']} with ${process.title}`);
});
