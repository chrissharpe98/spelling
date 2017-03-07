<?php
    // Set IS_DEBUG flag. If true, then unminified versions of JS files will be loaded.
    $IS_DEBUG = true;
?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
        <meta name="description" content="A simple app for testing primary school spellings">
        <meta name="author" content="Chris Sharpe">
        <link rel="icon" href="../../favicon.ico">

        <title>Iona's Spelling Test App</title>

        <!-- Bootstrap core CSS -->
        <link href="css/bootstrap.min.css" rel="stylesheet">
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">

        <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-2.1.4.js"></script>
    </head>

    <body>

    <div class="container">
        <div class="jumbotron" style="margin-top:25px">
            <div id="app"></div>
        </div>
    </div>

    <script src="https://npmcdn.com/tether@1.2.4/dist/js/tether.min.js"></script>
    <script src="js/bootstrap.min.js"></script>

    <?php
        if ($IS_DEBUG)
            echo '<script src="js/iona-spelling-app.js"></script>';
        else
            echo '<script src="js/iona-spelling-app.min.js"></script>';
    ?>

    <script type="text/javascript">
        var app = new SpellingApp();
    </script>

    </body>
</html>
