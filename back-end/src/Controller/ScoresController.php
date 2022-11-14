<?php

namespace App\Controller;

use App\Entity\Score;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class ScoresController extends AbstractController
{
    private const TOP_SCORES_VALUE = 10;
    
    public function __construct(private EntityManagerInterface $em)
    {}

    #[Route('/scores', name: 'app_scores')]
    public function index(): JsonResponse
    {
        $scores_ = $this->em->getRepository(Score::class)
            ->findBy(
                [],                                             // finds all
                ['score' => 'DESC', 'dateAdded' => 'ASC'],      // sorts by score
                self::TOP_SCORES_VALUE);                        // limit to top

        // Redirect to home if there are no scores to show
        if (empty($scores_)) {
            return $this->redirectToRoute('app_home');
        }

        $scores = [];

        /** @var Score */
        foreach($scores_ as $score) {
            $scores[] = [
                'username' => $score->getUser()->getUsername(),
                'score' => $score->getScore(),
                'date' => $score->getDateAdded()
            ];
        }
        
        return $this->json([
            'scores' => $scores,
        ]);
    }
}
