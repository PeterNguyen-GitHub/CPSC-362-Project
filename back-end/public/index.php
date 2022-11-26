<?php

use App\Kernel;

if ($_SERVER['SERVER_NAME'] == 'game.fnino.com') {
    $autoloadPath = dirname(__DIR__, 2).'/CPSC-362-Project/vendor/autoload_runtime.php';
} else {
    $autoloadPath = dirname(__DIR__).'/vendor/autoload_runtime.php';
}

require_once $autoloadPath;

return function (array $context) {
    return new Kernel($context['APP_ENV'], (bool) $context['APP_DEBUG']);
};
