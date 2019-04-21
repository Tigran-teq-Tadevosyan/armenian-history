  $(document).ready(function() {
    $('#contact_form').bootstrapValidator({
        // To use feedback icons, ensure that you use Bootstrap v3.1.0 or later
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },
        fields: {
            comment: {
                validators: {
                      stringLength: {
                        min: 10,
                        max: 200,
                        message:'Please enter at least 10 characters and no more than 200'
                    },
                    notEmpty: {
                        message: 'Please supply a description of your project'
                    }
                }
            },
            basic_summery:{
                validators: {
                      stringLength: {
                        min: 10,
                        max: 225,
                        message:'Please enter at least 10 characters and no more than 225'
                    },
                    notEmpty: {
                        message: 'Please supply a basic summery for your review'
                    }
                }
            },
            before_visiting:{
                validators: {
                      stringLength: {
                        min: 450,
                        max: 900,
                        message:'Please enter at least 450 characters and no more than 900'
                    },
                    notEmpty: {
                        message: 'Please supply a before visiting for your review'
                    }
                }
            },
            the_visit_itself:{
                validators: {
                      stringLength: {
                        min: 2025,
                        max: 2700,
                        message:'Please enter at least 2025 characters and no more than 2700'
                    },
                    notEmpty: {
                        message: 'Please supply a the visit itself for your review'
                    }
                }
            },
            after_visiting:{
                validators: {
                      stringLength: {
                        min: 10,
                        max: 450,
                        message:'Please enter at least 10 characters and no more than 450'
                    },
                    notEmpty: {
                        message: 'Please supply a after visiting for your review'
                    }
                }
            },
        }
        })
        .on('success.form.bv', function(e) {
            $('#success_message').slideDown({ opacity: "show" }, "slow") // Do something ...
                $('#contact_form').data('bootstrapValidator').resetForm();

            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                console.log(result);
            }, 'json');
        });
});