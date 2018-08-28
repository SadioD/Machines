$(function() {
    // Ce code JS permet de Vérifier si le formulaire est valide ----------------------------------------------------------------------------------
    var myRegex = /^[a-z0-9]+/i;
    $('#formButton').attr('disabled', true);

    $('#name, #content').keyup(function() {
        if(myRegex.test($('#name').val()) && myRegex.test($('#content').val())) {
            $('button').attr('disabled', false);
        }
        else {
            $('button').attr('disabled', true); // j'ai rajouté cette ligne pour le boutton #updateForm
        }
    });
});//---------------------------------------------------------------------------------------------------------------------------------------------------------
