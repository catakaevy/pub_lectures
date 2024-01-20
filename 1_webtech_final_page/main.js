window.addEventListener('DOMContentLoaded', (event) => {
    // hidden result message sets up
    const hiddenResultMessage = document.getElementById('hidden_part');
    hiddenResultMessage.style.display = 'none';

    const AmountCheck = document.getElementById('execute'); 
    AmountCheck.addEventListener('click', () => {
        // Calculate the prices and check if all are valid
        const validPrices = calculatePrice();
      
        if (validPrices) {
          // Prices are valid, show the message
          hiddenResultMessage.style.display = 'block';
        } else {
          // Prices are invalid, hide the message
          hiddenResultMessage.style.display = 'none';
        }
    });
});

function calculatePrice(event) {

    /* ValidateForm Check
        1. Data type check
        2. every amount can't be blank (0)
        3. Max limitation (50) for onigiri counts
    */

      // Set default values for all input fields
    document.getElementById('shio_amount').setAttribute('value', 0);
    document.getElementById('ume_amount').setAttribute('value', 0);
    document.getElementById('konbu_amount').setAttribute('value', 0);
    document.getElementById('karage_amount').setAttribute('value', 0);
    document.getElementById('tunamayo_amount').setAttribute('value', 0);
    document.getElementById('mentaiko_amount').setAttribute('value', 0);

    // Declare variables outside of try block
    let shioInteger = 0;
    let umeInteger = 0;
    let konbuInteger = 0;
    let karageInteger = 0;
    let tunamayoInteger = 0;
    let mentaikoInteger = 0;

    // Obtaining each amount from placeholder input
    const shioAmount = document.getElementById('shio_amount').value;
    const umeAmount = document.getElementById('ume_amount').value;
    const konbuAmount = document.getElementById('konbu_amount').value;
    const karageAmount = document.getElementById('karage_amount').value;
    const tunamayoAmount = document.getElementById('tunamayo_amount').value;
    const mentaikoAmount = document.getElementById('mentaiko_amount').value;

    // data type change (from string to integer)
    shioInteger = parseInt(shioAmount);
    umeInteger = parseInt(umeAmount);
    konbuInteger = parseInt(konbuAmount);
    karageInteger = parseInt(karageAmount);
    tunamayoInteger = parseInt(tunamayoAmount);
    mentaikoInteger = parseInt(mentaikoAmount);

    // // 1. Data type check
    // if ( isNaN(shioInteger) || isNaN(umeInteger) || isNaN(konbuInteger) || isNaN(karageInteger) || isNaN(tunamayoInteger) || isNaN(mentaikoInteger)){
    //     alert('Please put the integer as input. Please try it again.')
    //     throw new Error('Data Type Error occurred. Input values must be Integer.');
    // }

    // 2. every amount can't be blank (0)
    const totalAmount = shioInteger + umeInteger + konbuInteger + karageInteger + tunamayoInteger + mentaikoInteger;
    if (totalAmount === 0) {
        alert('Please put at least 1 amount for any onigiri. Please try it again.')
        throw new Error('Total amount must be greater than 0');
    }

    // 3. Max limitation (50) for onigiri counts
    if (totalAmount >= 50) {
        alert('Max limitation for the total amount is 50. Please try it again.')
        throw new Error('Total onigiri count cannot exceed 51');
    }

    /*  Execute calculation
            1. Creation of JSON and use it to create a new html element
            2. only if the execution was properly worked, the new result document is shown in the browser.
    */

    // Refer to the price in html element for JSON reference
    const shioPrice = parseFloat(document.getElementById('shio_price').textContent);
    const umePrice = parseFloat(document.getElementById('ume_price').textContent);
    const konbuPrice = parseFloat(document.getElementById('konbu_price').textContent);
    const karagePrice = parseFloat(document.getElementById('karage_price').textContent);
    const tunamayoPrice = parseFloat(document.getElementById('tunamayo_price').textContent);
    const mentaikoPrice = parseFloat(document.getElementById('mentaiko_price').textContent);

   // Creation of JSON as the reference
    const onigiriList = [
        {
          "type": "Shio Nigiri",
          "price": shioPrice,
          "amount": shioInteger
        },
        {
          "type": "Ume Nigiri",
          "price": umePrice,
          "amount": umeInteger
        },
        {
          "type": "Konbu Nigiri",
          "price": konbuPrice,
          "amount": konbuInteger
        },
        {
          "type": "Karage Nigiri",
          "price": karagePrice,
          "amount": karageInteger
        },
        {
          "type": "Tunamayo Nigiri",
          "price": tunamayoPrice,
          "amount": tunamayoInteger
        },
        {
          "type": "Mentaiko Nigiri",
          "price": mentaikoPrice,
          "amount": mentaikoInteger
        }
      ];

    // Calculate the total amount of price & creating the result elements
    const resultItemContainer = document.querySelector('.result-list');
    for (let onigiri of onigiriList) {
        const price = onigiri.price * onigiri.amount;
        const resultList = document.createElement('li');
        resultList.textContent = `${onigiri.type}: ${price} €`;
        resultItemContainer.appendChild(resultList);
    }

    return true;
}
