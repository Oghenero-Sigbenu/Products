// Phone Number Validation
export const isValid = (n) => {

    var firstChar;
    var number;
    var pattern = /^([0]{1})([7-9]{1})([0|1]{1})([\d]{1})([\d]{7,8})$/g;

    if (!n || n.length < 5) return false;

    if (typeof n === 'number') {

        // numbers never begin with 0, force this to become a string
        number = '0' + n;

    } else if (typeof n === 'string') {

        firstChar = n.substring(0, 1);

        // user may supply 0 before the number or not
        // e.g 0703 or 703 (two types of people ¯\_(ツ)_/¯)
        // either way supply missing leading 0
        number = (firstChar === '0') ? n : '0' + n;

    } else {

        return false;

    }

    // remove all whitespace(s) before running test 
    return pattern.test(number.replace(/\s+/g, ''));

};
// eslint-disable-next-line
export const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validateForm = (data) => {
    let valid = true;
    // validate form errors
    Object.values(data.errors).forEach(val => {
        val.length > 0 && (valid = false);
    })
    Object.values(data).forEach(val => {
        (val === "" || val === null) && (valid = false)
    })
    return valid
};

export const payWithPaystack = (data) => {
    var handler = window.PaystackPop.setup({
        // This assumes you already created a constant named
        // PAYSTACK_PUBLIC_KEY with your public key from the
        // Paystack dashboard. You can as well just paste it
        // instead of creating the constant
        key: 'pk_test_ef06b80943d8f79d4e573be078b1f9cb0cb1d628',
        email: data.email,
        amount: data.price * 100,
        metadata: {
            name: data.name,
            custom_fields: [
                {
                    display_name: "Paid on",
                    variable_name: "paid_on",
                    value: 'Website'
                },
                {
                    display_name: "Paid via",
                    variable_name: "paid_via",
                    value: 'Inline Popup'
                }
            ]
        },
        callback: function (response) {
            // post to server to verify transaction before giving value
            // var verifying = $.get('/verify.php?reference=' + response.reference);
            // verifying.done(function (data) { /* give value saved in data */ });
            alert('success. transaction ref is ' + response.reference);
        },
        onClose: function () {
            alert('Click "Pay now" to retry payment.');
        }
    });
    handler.openIframe();
}
