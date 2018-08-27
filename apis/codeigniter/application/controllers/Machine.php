<?php
class Machine extends CI_Controller
{
    // ATTRIBUT + CONST -------------------------------------------------------------------------------------------------------------------
    public function __construct()
    {
        parent::__construct();
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Headers: X-Requested-Width, Origin, Content-Type, X-Auth-Token');
        header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');

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

    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet d'ajouter une machine à la liste
    public function addNewMachine($machine)
    {

    }//--------------------------------------------------------------------------------------------------------------------------------------------
    // Permet de modifier une machine à la liste
    public function updateMachine($machine)
    {

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
        if($request == 'machinesList') {
            echo json_encode($response);
        }
        elseif($request == 'switch') {
            echo json_encode($response[0]);
        }
    }//----------------------------------------------------------------------------------------------------------------------------------------------------------------
}
