window.onload = function(){ 

$('.picture')[0].style.backgroundImage = `url("https://bitgrandios.com/img/${gon.market.ask_unit.toUpperCase()}.png")`

setInterval(function(){
let table = $(".order-book-ask tr");
for(var x = 1; x <= table.length; x++){
	if(x+1 > table.length)
		break;
	if(parseFloat($(`.order-book-ask tr:nth-child(${x})`)[0].dataset.price) > parseFloat($(`.order-book-ask tr:nth-child(${x+1})`)[0].dataset.price))
		$(`.order-book-ask tr:nth-child(${x})`).insertAfter(`.order-book-ask tr:nth-child(${x+1})`);
};

if(parseFloat(gon.ticker.open) > parseFloat(gon.ticker.last)){
	$('.change')[10].classList.remove('green-after');
        $('.change')[10].classList.add('red-after');
	$('.change')[10].style = "color:red";
	$('.change')[10].textContent = ((1 - (parseFloat(gon.ticker.last)/(parseFloat(gon.ticker.open))))*100).toFixed(2) + '%';
}
if(parseFloat(gon.ticker.open) < parseFloat(gon.ticker.last)){
	$('.change')[10].classList.remove('red-after');
	$('.change')[10].classList.add('green-after');
	$('.change')[10].style = "color:green";
	$('.change')[10].textContent = ((1 - (parseFloat(gon.ticker.open)/(parseFloat(gon.ticker.last))))*100).toFixed(2) + '%';
}

let i = 3;
while(i < $('.table tr td').length){
	if($('.table tr td')[i-2].textContent.includes('buy')){
		$('.table tr td')[i-2].style.color = 'green';
		$('.table tr td')[i].textContent = (parseFloat($('.table tr td')[i-3].textContent)*parseFloat($('.table tr td')[i-1].textContent)*parseFloat(gon.market.bid_fee)).toFixed(10) + gon.market.bid_unit.toUpperCase();
	}
	else{
		$('.table tr td')[i-2].style.color = 'red';
		$('.table tr td')[i].textContent = (parseFloat($('.table tr td')[i-3].textContent)*parseFloat(gon.market.ask_fee)).toFixed(5) + gon.market.ask_unit.toUpperCase();
	}
	i = i+5;
}
x = 0; 
$('.order-book-bid tr').each(function(){
x = x + parseFloat(this.dataset.volume)
});
$('.order-book-bid tr').each(function(){
this.style.background = `linear-gradient(to right, rgba(0, 128, 0, 0.25) ${(parseFloat(this.dataset.volume)/x)*100}%, transparent 0)`
this.style.backgroundColor = 'white';
});

x = 0;
$('.order-book-ask tr').each(function(){
x = x + parseFloat(this.dataset.volume)
});

$('.order-book-ask tr').each(function(){
this.style.background = `linear-gradient(to left, rgba(255,0,0,0.25) ${(parseFloat(this.dataset.volume)/x)*100}%, transparent 0)`
this.style.backgroundColor = 'white';
});

}, 1000);

$('.trading-dropdown__form-container').children().each(function(){

let open = gon.tickers[this.children[0].textContent.replace(/[\W_]+/g,"").toLowerCase()].open;
let last = gon.tickers[this.children[0].textContent.replace(/[\W_]+/g,"").toLowerCase()].last;

if(parseFloat(open) > parseFloat(last)){
        this.children[2].classList.remove('green-after');
        this.children[2].classList.add('red-after');
        this.children[2].style = "color:red";
        this.children[2].textContent = ((1 - (parseFloat(last)/(parseFloat(open))))*100).toFixed(2) + '%';
}
if(parseFloat(open) < parseFloat(last)){
        this.children[2].classList.remove('red-after');
        this.children[2].classList.add('green-after');
        this.children[2].style = "color:green";
        this.children[2].textContent = ((1 - (parseFloat(open)/(parseFloat(last))))*100).toFixed(2) + '%';
}


}); 

$(".buy-sell__btn").click(function(){
setTimeout(function(){
window.location.reload();
},2000);
});
$('#buy-button').click();
document.getElementById("price_").textContent = `Price (${gon.market.bid_unit})`;

if(gon.market.id === "coopbtc" || gon.market.id === "coopeth" || gon.market.id === "coopbch") { 
document.getElementsByClassName("buy-sell__btn btn btn--blue")[0].remove()
$('.trading-dropdown__form-container').children()}

};

