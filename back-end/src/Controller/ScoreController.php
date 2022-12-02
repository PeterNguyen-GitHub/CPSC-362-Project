<?php

namespace App\Controller;

use App\Entity\Score;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class ScoreController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em)
    {}

    #[Route('/score', name: 'app_score', methods: ["POST"])]
    public function index(Request $request): JsonResponse
    {
        $email = $request->request->get('email');
        $scoreValue = $request->request->get('score');

        if (empty($email) && empty($scoreValue)) {
            throw $this->createNotFoundException('');
        }

        if (empty($email)) {
            return $this->json([
                'error' => 'user',
                'message' => 'Missing user information',
            ], 400);
        }

        if (empty($scoreValue)) {
            return $this->json([
                'error' => 'score',
                'message' => 'Missing score information',
            ], 400);
        }

        $user = $this->em->getRepository(User::class)->findOneBy(['email' => $email]);

        
        if (empty($user)) {
            $username = substr($email, 0, strpos($email, '@'));
            $user = new User();
            $user->setEmail($email)
                ->setUsername($username);
        }

        $score = new Score();

        $score->setUser($user)
            ->setScore($scoreValue);

        $this->em->persist($score);
        $this->em->flush();

        return $this->json([
            'success' => 'true',
            'error' => '',
            'message' => 'Score recorded',
        ]);
    }
}
