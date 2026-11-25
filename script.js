'use strict';

document.addEventListener('DOMContentLoaded', function () {
    // Preselect the vehicle when an enquiry link is followed from the stock list.
    var carSelect = document.getElementById('car');
    if (carSelect) {
        var requestedCar = new URLSearchParams(window.location.search).get('car');
        if (requestedCar) {
            Array.from(carSelect.options).forEach(function (option) {
                if (option.text.trim() === requestedCar.trim()) {
                    carSelect.value = option.value || option.text;
                }
            });
        }
    }

    var form = document.getElementById('enquiry-form');
    if (!form) return;

    var fields = [
        { id: 'name', message: 'Please enter your full name.' },
        {
            id: 'email',
            message: 'Please enter a valid email address.',
            validate: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            }
        },
        { id: 'message', message: 'Please enter your message.' }
    ];

    var status = document.getElementById('form-status');

    function showError(field, message) {
        var input = document.getElementById(field.id);
        var error = document.getElementById(field.id + '-error');
        input.setAttribute('aria-invalid', message ? 'true' : 'false');
        error.textContent = message;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        var firstInvalid = null;
        var valid = true;

        fields.forEach(function (field) {
            var input = document.getElementById(field.id);
            var value = input.value.trim();
            var passes = value.length > 0 && (!field.validate || field.validate(value));
            showError(field, passes ? '' : field.message);

            if (!passes) {
                valid = false;
                if (!firstInvalid) firstInvalid = input;
            }
        });

        if (!valid) {
            status.textContent = 'Please correct the highlighted fields and try again.';
            firstInvalid.focus();
            return;
        }

        status.textContent = 'Your details passed the form checks. This demonstration form does not send or store your enquiry.';
        form.reset();
        fields.forEach(function (field) {
            showError(field, '');
        });
    });

    fields.forEach(function (field) {
        var input = document.getElementById(field.id);
        input.addEventListener('input', function () {
            if (input.getAttribute('aria-invalid') === 'true') {
                showError(field, '');
            }
        });
    });
});
