<?php

namespace Tests\Unit\EduTatar;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\EduTatar\StudentParser;

class StudentParserTest extends TestCase
{
    private $parser;
    private $infoPagePath  = 'tests/Unit/EduTatar/resources/infoPage.html';
    private $marksPagePath = 'tests/Unit/EduTatar/resources/marksPage.html';

    public function setUp(): void
    {

        parent::setUp();
        $this->parser = new StudentParser;
    }

    public function testInfoPage()
    {
        $page = file_get_contents($this->infoPagePath);
        $info = $this->parser->parseInfo($page);

        $this->assertEquals([
            ['key' => 'Имя',               'value' => 'Семенов Роман Сергеевич'],
            ['key' => 'Логин',             'value' => '49104010076'],
            ['key' => 'Школа',             'value' => 'Общеобразовательная школа-интернат "IТ-лицей ФГАОУ ВО К(П)ФУ"'],
            ['key' => 'Должность',         'value' => 'Ученик'],
            ['key' => 'Пол',               'value' => 'мужской'],
            ['key' => 'Номер сертификата', 'value' => '5647988Статус не активен']
        ], $info);
    }

    public function testMarksPage()
    {
        $page = file_get_contents($this->marksPagePath);
        $marks = $this->parser->parseMarks($page);

        $this->assertEquals([
            [ 'title' => 'Астрономия',                                  'marks' => [] ],
            [ 'title' => 'Биология',                                    'marks' => [] ],
            [ 'title' => 'Иностранный',                                 'marks' => [ 5 ] ],
            [ 'title' => 'Информатика и ИКТ',                           'marks' => [ 5, 5 ] ],
            [ 'title' => 'История',                                     'marks' => [] ],
            [ 'title' => 'Литература',                                  'marks' => [] ],
            [ 'title' => 'Математика',                                  'marks' => [ 4, 4 ] ],
            [ 'title' => 'Обществознание (включая экономику и право)',  'marks' => [] ],
            [ 'title' => 'Основы безопасности жизнедеятельности (ОБЖ)', 'marks' => [ 5 ] ],
            [ 'title' => 'Родная литература',                           'marks' => [] ],
            [ 'title' => 'Родной язык',                                 'marks' => [] ],
            [ 'title' => 'Русский язык',                                'marks' => [] ],
            [ 'title' => 'Физика',                                      'marks' => [] ],
            [ 'title' => 'Физическая культура',                         'marks' => [ 5, 5, 5 ] ],
            [ 'title' => 'Химия',                                       'marks' => [] ]
        ], $marks);
    }
}
