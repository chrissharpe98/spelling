/**
 * Spelling App
 *
 * Client application for spelling test app
 *
 * JavaScript
 *
 * @category    Personal
 * @author      Chris Sharpe <chris.sharpe@holisticcity.co.uk>
 * @copyright   2017 Chris Sharpe
 * @version     1.0
 * @licence     Licensed under MIT Licence. Please see https://opensource.org/licenses/MIT for details
 *
 * 'Error' sound by Ryan Smith, licensed under Creative Commons attribution licence.
 * 'Correct' sound by thepositivenomad, licensed under Creative Commons licence.
 */

function SpellingApp() {

    var CONTAINER_ID = 'app',
        TEST_WORD_COUNT = 5,
        MIN_INDEX,
        MAX_INDEX;
    
    var words = [],
        correctCount = 0,
        incorrectCount = 0,
        currentWordIndex = 0,
        displayedWordIndices = [],
        isJustSkippedWord = false;

    /*
     * Get random word to display
     */
    this.GetNextWordIndex = function() {

        var isDoneBefore = true;
        var newWordIndex;

        while(isDoneBefore == true)
        {
            isDoneBefore = false;
            newWordIndex = Math.floor(Math.random() * (MAX_INDEX - MIN_INDEX + 1)) + MIN_INDEX;

            // Check if word has been displayed before
            for (i = 0; i < displayedWordIndices; i++)
            {
                if (displayedWordIndices[i] == newWordIndex)
                    isDoneBefore = true;
            }
        }

        displayedWordIndices.push(newWordIndex);
        return newWordIndex;
    };

    this.Reset = function() {
        var self = this;

        var defaultHTML = '<h1 class="display-3">Iona\'s Spelling Practice</h1>'
            + '<p style="margin-top: 25px" class="lead">This web app will test Year 3 spellings. Please make sure your speakers are turned up to hear words.</p>'
            + '<p class="text-lg-center"><a class="btn btn-lg btn-success" id="btnStart" href="#" role="button">Click to start</a></p>';

        $('#' + CONTAINER_ID).html(defaultHTML);

        // Add listener to start button when app created

        $('#btnStart').click(function(){
            console.log("Should be starting...");
            self.Run();
        });
    };

    this.Run = function() {
        words = this.GetWords('mediumfrequencywords');
        MIN_INDEX = 0;
        MAX_INDEX = words.length;

        this.ShowWord();
    };

    this.ShowEnd = function() {
        var self = this;

        var endHTML = '<p>Finished!</p>'
            + 'You got ' + correctCount + ' words correct out of ' + TEST_WORD_COUNT + '.</p>'
            + '<a class="btn pull-right btn-default btnReset">Reset</a>';

        $('#' + CONTAINER_ID).html(endHTML);
        $('.btnReset').click(function() { self.Reset(); });
    };

    this.ShowResult = function(isCorrect) {
        var self = this;
        var msg = '<p>';

        // Prepare sound
        var audioElement = document.createElement('audio');

        if (isCorrect) {
            correctCount++;
            msg += '<h1 class="text-success"><i class="fa fa-check"></i> ' + words[currentWordIndex];
            audioElement.setAttribute('src', 'audio/soundeffect-correct.mp3');
        }
        else {
            incorrectCount++;
            msg += '<h1 class="text-warning"><i class="fa fa-warning"></i> ' + words[currentWordIndex];
            audioElement.setAttribute('src', 'audio/soundeffect-wrong.mp3');
        }

        audioElement.play();

        $('#' + CONTAINER_ID).html(msg);

        var a = setTimeout(function() {
            currentWordIndex = self.GetNextWordIndex();

            if ((correctCount + incorrectCount) == TEST_WORD_COUNT)
                self.ShowEnd();
            else
                self.Run();
        }, 1500);

    };

    this.ShowWord = function() {
        var self = this;

        currentWordIndex = self.GetNextWordIndex();

        var wordHTML = '<p style="margin-top: 25px" class="lead">'
            + '<span style="float:right">'
                + '<a class="btn btn-sm btn-warning btnPlayAgain"><i class="fa fa-play"></i> Play sound again</a>'
                + '<a class="btn btn-sm btn-warning btn-default btnSkip" style="margin-left: 10px;"><i class="fa fa-arrow-right"></i> Skip</a>'
            + '</span> Please type the word you hear</p>'
            + '<p><input class="form-control" type="text" id="inputSpelling" /></p>'
            + '<p class="text-md-right"><a style="color:white" class="btn btn-primary btnEnterSpelling">Enter</a></p>';

        if (isJustSkippedWord) {
            wordHTML += '<div class="alert alert-warning">'
                    + 'Sorry if the word wasn\'t clear! We will be re-recording some of the words to make them clearer.'
                + '</div>';
            isJustSkippedWord = false;
        }

        
        $('#' + CONTAINER_ID).html(wordHTML);

        // Play sound here (note that apostrophes not used in sound file name, so if the word was "can't" it would look for "cant.m4a")
        var audioFileName = words[currentWordIndex].replace('\'', '');
        var audioElement = document.createElement('audio');
        audioElement.setAttribute('src', 'audio/' + audioFileName + '.m4a');
        audioElement.setAttribute('autoplay', 'autoplay');
        audioElement.play();

        $('.btnEnterSpelling').click(function() {
            var spelling = $('#inputSpelling').val();
            if (spelling == words[currentWordIndex])
                self.ShowResult(true);
            else
                self.ShowResult(false);
        });

        $('.btnPlayAgain').click(function(){ audioElement.play(); });

        $('.btnSkip').click(function(){
            isJustSkippedWord = true;
            self.ShowWord();
        });
    };

    // When creating app, add start content
    this.Reset();
}


SpellingApp.prototype.GetWords = function(library) {
    
    var vocab = [];

    if (library == "mediumfrequencywords")
    {
        vocab = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "November",
            "December",
            "asked",
            "began",
            "being",
            "brought",
            "can't",
            "change",
            "coming",
            "didn't",
            "does",
            "don't",
            "found",
            "goes",
            "gone",
            "heard",
            "I'm",
            "jumped",
            "knew",
            "know",
            "leave",
            "might",
            "opened",
            "show",
            "started",
            "stopped",
            "think",
            "thought",
            "told",
            "tries",
            "turn",
            "turned",
            "used",
            "walked",
            "walking",
            "watch",
            "while",
            "write",
            "woke",
            "woken",
            "almost",
            "always",
            "any",
            "before",
            "better",
            "during",
            "every",
            "first",
            "half",
            "morning",
            "much",
            "never",
            "number",
            "often",
            "only",
            "second"
        ];
        
        /*
            // Words still need to be recorded as sound files
             "sometimes",
             "still",
             "suddenly",
             "today",
             "until",
             "upon",
             "year",
             "young",
             "above",
             "across",
             "along",
             "also",
             "around",
             "below",
             "between",
             "both",
             "different",
             "following",
             "high",
             "inside",
             "near",
             "other",
             "outside",
             "place",
             "right",
             "round",
             "such",
             "through",
             "together",
             "under",
             "where",
             "without",
             "baby",
             "balloon",
             "birthday",
             "brother",
             "children",
             "clothes",
             "garden",
             "great",
             "happy",
             "head",
             "something",
             "sure",
             "swimming",
             "those",
             "word",
             "work",
             "world",
             "earth",
             "eyes",
             "father",
             "friends",
             "important",
             "lady",
             "light",
             "money",
             "mother",
             "own",
             "paper",
             "sister",
             "small",
             "sound",
             "white",
             "whole",
             "why",
             "window"
             ];
         */
    }

    return vocab;
}