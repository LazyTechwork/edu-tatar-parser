<?php

namespace App\EduTatar;

class StudentParser
{
    private $conn;
    private $marksPage = "/user/diary/term";
    private $infoPage = "/";

    public function __construct(?Connection $conn = null)
    {
        $this->conn = $conn;
    }

    public function getInfo()
    {
        $page = $this->conn->getPage($this->infoPage);
        return $this->parseInfo($page);
    }

    public function getMarks()
    {
        $page = $this->conn->getPage($this->marksPage);
        return $this->parseMarks($page);
    }

    private function fixInfoStr($s)
    {
        $s = html_entity_decode($s);
        $s = preg_replace('/<[^>]*>?/', '', $s);
        $s = preg_replace('/:/', '', $s);
        $s = trim($s);

        return $s;
    }

    public function parseInfo(string $page)
    {
        $table_regex     = '/<table class="tableEx">([^`]+)<\/table>/';
        $row_regex       = '/<tr>([^`]+?)<\/tr>/';
        $key_value_regex = '/<td[^`]*?>([^`]*?)<\/td>/';

        preg_match($table_regex, $page, $table_matches);
        $table = $table_matches[1];

        preg_match_all($row_regex, $table, $row_matches, PREG_SET_ORDER);

        $rows = [];

        foreach ($row_matches as $row_match) {
            $row = $row_match[1];
            preg_match_all($key_value_regex, $row, $matches, PREG_SET_ORDER);

            $key   = $this->fixInfoStr($matches[0][0]);
            $value = $this->fixInfoStr($matches[1][0]);

            if ($key && $value) {
                $rows[] = [
                    "key"   => $key,
                    "value" => $value
                ];
            }

        }

        return $rows;
    }

    public function parseMarks(string $page)
    {
        $body_regex = '/<tbody>([^`]+)<\/tbody>/';
        $lesson_regex = '/<tr>([^`]+?)<\/tr>/';
        $title_regex = '/<td>([^`]+?)<\/td>/';
        $mark_regex = '/<td>(\d+)<\/td>/';;

        preg_match($body_regex, $page, $body_matches);
        $body = $body_matches[1];

        preg_match_all($lesson_regex, $body, $lesson_matches);

        $lessons = [];

        array_pop($lesson_matches[0]);
        foreach ($lesson_matches[0] as $lesson)
        {
            preg_match($title_regex, $lesson, $title);
            $title = $title[1];

            $marks = [];
            preg_match_all($mark_regex, $lesson, $matches);

            foreach ($matches[1] as $mark)
            {
                $mark = intval($mark);
                if (!is_nan($mark) && $mark >= 1 && $mark <= 5)
                    $marks[] = $mark;
            }

            $lessons[] = [
                "title" => $title,
                "marks" => $marks
            ];
        }

        return $lessons;
    }
}
