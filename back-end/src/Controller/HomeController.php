<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class HomeController extends AbstractController
{
    #[Route('/', name: 'app_home')]
    public function index(): Response
    {
        $html = file_get_contents(dirname(__DIR__, 2) . '/public/build/index.html');

        $html = str_replace(
            'PUBLIC_URL', 
            $this->getParameter('app.front_end_dir') . '/build/', 
            $html
        );

        return new Response($html);
    }
}
