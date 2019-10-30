<?php

namespace App\EduTatar;

class ClientImpl implements Client
{
    private $url

    public function __construct(string $url)
    {
        $this->url = $url;
    }

    public function getInfo()
    {

    }

    public function getUserConnection(string $login, string $password)
    {

    }

    public function getStudent(string $login, string $password)
    {

    }
}
