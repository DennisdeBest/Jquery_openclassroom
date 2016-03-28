$(function () {
    var textArea = $('#formHTML');
    textArea.val('');
    var newLine = '\n';

    var formID = $('#formID').val();
    var formMethod = $('#formMethod option:selected').val();
    var formAction = $('#formAction').val();

    var formOpenTag = '<form id="'+formID+'" method="'+formMethod+'" action="'+formAction+'">' + newLine;
    var formClosingTag = newLine + '</form>';

    function striptags() {
        var text = textArea.val();
        text = text.replace(formOpenTag, '');
        text = text.replace(formClosingTag, '');
        textArea.val(text);
    }

    textArea.val(formOpenTag + textArea.val() + formClosingTag);

    $('#formTags').bind('input propertychange change', function() {
        formID = $('#formID').val();
        formMethod = $('#formMethod option:selected').val();
        formAction = $('#formAction').val();
        striptags();

        formOpenTag = '<form id="'+formID+'" method="'+formMethod+'" action="'+formAction+'">' + newLine;

        textArea.val(formOpenTag + textArea.val() + formClosingTag);
    });

    textArea.bind('input propertychange', function() {
        $('#preview').html(textArea.val());
    });

    $('#buttonRow').click(function () {
        striptags();
        textArea.val(formOpenTag + textArea.val() + '<br/>' + newLine + formClosingTag);
    });
    $('#clearForm').click(function () {
        $('#preview').empty();
        textArea.val('');});
    $('.createButtons').prop('disabled', false);
    
    
    
    function addToForm(type) {
        var tempText = $('#tempText');
        tempText.focus();
        tempText.keypress(function (e) {
            if(e.which === 13) {//Enter key pressed
                $('#createTempButton').trigger('click');//Trigger click event
            }
        });
        
        $('.createButtons').prop('disabled', true);
        
        $('#createTempButton').on('click', function () {
            var text = $('#tempText').val();
            var value = '';
            if(type ==='label')
                value = '<label>'+text+'</label>';
            else if(type ==='text')
                value = '<input type="text" id="'+text+'"/>';
            else if(type ==='button')
                value = '<button>'+text+'</button>';

            striptags();
            var newValue = formOpenTag + textArea.val() + value + newLine + formClosingTag;
            textArea.val(newValue);
            $('#preview').html(
                newValue);

            $('#buttonPreview').fadeOut();
            $('.createButtons').prop('disabled', false);
        });
        $('#cancelTempButton').click(function () {
            $('#buttonPreview').fadeOut();
            $('.createButtons').prop('disabled', false);
        })
    
    }
    
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
    
    
    newLabel(addToForm);
    newTextInput(addToForm);
    newButton(addToForm);

});