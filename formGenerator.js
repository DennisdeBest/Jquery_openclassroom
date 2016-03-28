$(function () {
    //set textArea variable and newline variable
    var textArea = $('#formHTML');
    textArea.val('');
    var newLine = '\n';

    //Initialise the variables for the form tags
    var formID = $('#formID').val();
    var formMethod = $('#formMethod option:selected').val();
    var formAction = $('#formAction').val();

    //Create form open and close tags
    var formOpenTag = '<form id="'+formID+'" method="'+formMethod+'" action="'+formAction+'">' + newLine;
    var formClosingTag = newLine + '</form>';

    //A function to strip the opening nd closing tags
    function striptags() {
        var text = textArea.val();
        text = text.replace(formOpenTag, '');
        text = text.replace(formClosingTag, '');
        textArea.val(text);
    }

    //Initialise the textArea with the form tags
    textArea.val(formOpenTag + textArea.val() + formClosingTag);

    //Detect any change in the form tag parameters and update the textArea
    $('#formTags').bind('input propertychange change', function() {
        formID = $('#formID').val();
        formMethod = $('#formMethod option:selected').val();
        formAction = $('#formAction').val();
        striptags();

        formOpenTag = '<form id="'+formID+'" method="'+formMethod+'" action="'+formAction+'">' + newLine;

        textArea.val(formOpenTag + textArea.val() + formClosingTag);
    });

    //Detect any changes in the textArea and update the preview div
    textArea.bind('input propertychange', function() {
        $('#preview').html(textArea.val());
    });

    //Add a <br/> to the text area
    $('#buttonRow').click(function () {
        striptags();
        textArea.val(formOpenTag + textArea.val() + '<br/>' + newLine + formClosingTag);
    });
    //Clear everything
    $('#clearForm').click(function () {
        $('#preview').empty();
        textArea.val('');});
    //Make sure buttons are enabled on launch
    $('.createButtons').prop('disabled', false);
    
    
    //The callback function that adds to the form
    function addToForm(type) {
        var tempText = $('#tempText');
        //give the text input focus when it's created
        tempText.focus();
        //Trigger a click on 'enter'
        tempText.keypress(function (e) {
            if(e.which === 13) {//Enter key pressed
                $('#createTempButton').trigger('click');//Trigger click event
            }
        });

        //Disable the buttons
        $('.createButtons').prop('disabled', true);

        //Add form item to textArea and preview on click
        $('#createTempButton').on('click', function () {
            //set text variables
            var text = $('#tempText').val();
            var value = '';
            //check parameter value and set value variable accordingly
            if(type ==='label')
                value = '<label>'+text+'</label>';
            else if(type ==='text')
                value = '<input type="text" id="'+text+'"/>';
            else if(type ==='button')
                value = '<button>'+text+'</button>';

            // stripTags and set the new textArea and preview
            striptags();
            var newValue = formOpenTag + textArea.val() + value + newLine + formClosingTag;
            textArea.val(newValue);
            $('#preview').html(
                newValue);

            //fadeout the form item and enable the buttons
            $('#buttonPreview').fadeOut();
            $('.createButtons').prop('disabled', false);
        });

        //Detect click on cancel button, fadeout and reenable buttons
        $('#cancelTempButton').click(function () {
            $('#buttonPreview').fadeOut();
            $('.createButtons').prop('disabled', false);
        })
    
    }

    //Label function
    function newLabel(callback) {
        $('#buttonLabel').click(function () {
            $('#buttonPreview').html(
                '<label for="tempText"> Label text : </label>' +
                '<input type="text" id="tempText" name="tempText"/>' +
                '<button id="createTempButton">Submit</button>' +
                '<br /><button id="cancelTempButton">Cancel</button> ')
                .hide().fadeIn();
            callback('label');
        });
    }
    //Text input function
    function newTextInput(callback) {
        $('#buttonText').click(function () {
            $('#buttonPreview').html(
                '<label for="tempText"> Textfield id : </label>' +
                '<input type="text" id="tempText" name="tempText"/>' +
                '<button id="createTempButton">Submit</button>' +
                '<br /><button id="cancelTempButton">Cancel</button> ')
                .hide().fadeIn();
            callback('text');
        });
    }
    //Button input function
    function newButton(callback) {
        $('#buttonButton').click(function () {
            $('#buttonPreview').html(
                '<label for="tempText"> button text : </label>' +
                '<input type="text" id="tempText" name="tempText"/>' +
                '<button id="createTempButton">Submit</button>'+
                '<br /><button id="cancelTempButton">Cancel</button> ')
                .hide().fadeIn();
            callback('button');
        });
    }
    
    //Run the functions so they can listen for a click
    newLabel(addToForm);
    newTextInput(addToForm);
    newButton(addToForm);

});