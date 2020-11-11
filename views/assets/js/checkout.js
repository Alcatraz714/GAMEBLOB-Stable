const order = async () => {
    const data = await fetch("http://localhost:3000/razorpay", {method : 'POST'})
    const json = await data.json()
    return json
}
const amount = Number(document.querySelector("#price").innerText)
const options = {
    "key": "rzp_test_sCDpgdASPFOPWV", 
    "amount": amount*100,
    "currency": order.currency,
    "name": "GameBlob",
    "description": "Test Transaction",
    "image": "https://i.imgur.com/hSeRyai.jpg",
    "order_id": order.id,
    "handler": async (res) => {
        alert(res.razorpay_payment_id);
        //alert(res.razorpay_order_id);
        //alert(res.razorpay_signature)
        await fetch("http://localhost:3000/razorpay/success", {method : 'POST'})
    }
};

const payment = new Razorpay(options);
payment.on('payment.failed', function (response){
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
});

document.getElementsByClassName('buy')[0].onclick = function(e){
    payment.open();
    e.preventDefault();
    console.log(data)
}
