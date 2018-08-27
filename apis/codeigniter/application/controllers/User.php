<?php
class User extends CI_Controller
{
    // ATTRIBUT + CONST -------------------------------------------------------------------------------------------------------------------
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-Width, Origin, Content-Type, X-Auth-Token');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

        $this->load->model('userManager');
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // METHODS -------------------------------------------------------------------------------------------------------------------------------
    // Permet de créer un User lors de la connexion
    public function createUser()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
        if(json_encode($_POST) != 'null')
        {
            // On save l'user + on le recupère depuis la BDD + on crée la variable de session et  envoie la réponse
            $this->userManager->addEntry(array('pseudo' => $_POST['pseudo'], 'status' => 'ON'));
            $user = $this->userManager->getData('*', array('pseudo' => $_POST['pseudo']));
        }
        $this->sendResponse($user);
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet de récupérer un User par AuthGuard (lors du rafraichissement par exemple )
    public function getUser($id)
    {
        $user = $this->userManager->getData('*', array('id' => $id));

        isset($user) && !empty($user) ? $this->sendResponse($user) : $this->sendResponse([false]);

    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet de supprimer un user (lors de la déconnexion de l'app des machines)
    public function removeUser($id)
    {
        $this->userManager->deleteEntry(['id' => (int)($id)]);
        $this->sendResponse([true]);
    }//--------------------------------------------------------------------------------------------------------------------------------------------
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Fonctions Internes -------------------------------------------------------------------------------------------------------------------------
    // Permet de
    protected function sendResponse($response)
    {
        echo json_encode($response[0]);
    }//----------------------------------------------------------------------------------------------------------------------------------------------------------------
}
