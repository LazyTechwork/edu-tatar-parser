<?php

namespace App\EduTatar;

interface Client
{
    abstract public function getInfo();
    abstract public function getUserConnection(string $login, string $password);
    abstract public function getStudent(string $login, string $password);
}
