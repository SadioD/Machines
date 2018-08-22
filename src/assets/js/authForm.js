$(function() {
    // Ce code JS permet de Vérifier si le formulaire est valide ----------------------------------------------------------------------------------
    var myRegex = /^[a-z0-9]+/i;
    $('#authButton').attr('disabled', true);

    $('#pseudo').keyup(function() {
        if(myRegex.test($('#pseudo').val())) {
            $('button').attr('disabled', false);
        }
    });
});//---------------------------------------------------------------------------------------------------------------------------------------------------------
