<?php
class Machine extends CI_Controller
{
    // ATTRIBUT + CONST -------------------------------------------------------------------------------------------------------------------
    public function __construct()
    {
        parent::__construct();
        /*header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-Width, Origin, Content-Type, X-Auth-Token');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');*/

        $this->load->model('machineManager');
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // METHODS -------------------------------------------------------------------------------------------------------------------------------
    // Permet de recupérer la liste des machines
    public function getMachinesList()
    {
        $list = $this->machineManager->getData();
        $this->sendResponse('machinesList', $list);
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet de supprimer une machine de la liste
    public function deleteMachine($id)
    {
        if($this->machineManager->deleteEntry(['id' => $id]))  {$this->sendResponse('delete', [true]);}
        else                                                   {$this->sendResponse('delete', [false]);}
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'ajouter une machine à la liste
    public function addNewMachine()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
        if(json_encode($_POST) != 'null')
        {
            // On save la machine
            $this->machineManager->addEntry(array('name'         => $_POST['name'],
                                                  'content'      => $_POST['content'],
                                                  'status'       => $_POST['status']),
                                            array('purchaseDate' => 'NOW()'));

            // On la recupère depuis la BDD
            $machine = $this->machineManager->getData('*', array('name'    => $_POST['name'],
                                                                 'content' => $_POST['content']));
            // On envoie la réponse
            isset($machine) && !empty($machine) ? $this->sendResponse('new Machine', $machine) : $this->sendResponse('new Machine', [false]);
        }
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet de modifier une machine à la liste
    public function updateMachine()
    {
        $_POST = json_decode(file_get_contents('php://input'), true);
        if(json_encode($_POST) != 'null')
        {
            $this->machineManager->updateEntry(array('id'      => $_POST['id']),
                                               array('name'    => $_POST['name'],
                                                     'content' => $_POST['content'],
                                                     'status'  => $_POST['status']));
            $this->sendResponse('update Machine', [true]);
        }
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'allumer/ Eteindre toutes les machines
    public function switchALL($status)
    {
        $this->machineManager->updateEntry([], ['status' => $status]);
        $this->sendResponse('switch', [true]);
    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'allumer/ Eteindre une machine
    public function switchTHIS($id, $status)
    {
        $this->machineManager->updateEntry(['id' => $id], ['status' => $status]);
        $this->sendResponse('switch', [true]);
    }//--------------------------------------------------------------------------------------------------------------------------------------------
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Fonctions Internes -------------------------------------------------------------------------------------------------------------------------
    // Permet de
    protected function sendResponse($request, $response)
    {
        if(   $request == 'machinesList') {
            echo json_encode($response);
        }
        else {
            echo json_encode($response[0]);
        }
    }//----------------------------------------------------------------------------------------------------------------------------------------------------------------
}
