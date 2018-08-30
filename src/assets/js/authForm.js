$(function() {
    // Ce code JS permet de Vérifier si le formulaire est valide ----------------------------------------------------------------------------------
    function validateForm() {
        var myRegex = /^[a-z0-9]+/i;
        $('#authButton').attr('disabled', true);

        $('#pseudo').keyup(function() {
            if(myRegex.test($('#pseudo').val())) {
                $('#authButton').attr('disabled', false);
            }
            else {
                $('#authButton').attr('disabled', true);
            }
        });
    }//---------------------------------------------------------------------------------------------------------------------------------------------------------
    // Ajoute l'image Ajax loader ---------------------------------------------------------------------------------------------------
    $('#authButton, #logOut').click(function() {
        if($(this).attr('id') == 'logOut') {
            setTimeout(function() {
                validateForm();
                $('#authButton').click(function() { $(this).prepend('<img src = "assets/images/ajax-loader.gif" alt = "gif" /> '); });
            }, 2000);
        }
        $(this).prepend('<img src = "assets/images/ajax-loader.gif" alt = "gif" /> ');
    });//---------------------------------------------------------------------------------------------------------------------------------------------------------

    validateForm();
});
