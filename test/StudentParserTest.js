const assert = require('assert');
const fs = require('fs');

const StudentParser = require('../src/StudentParser');

describe('StudentParser', () => {
    const parser = new StudentParser;
    const marksPage = fs.readFileSync('test/marksPage.html', 'utf8');
    const infoPage = fs.readFileSync('test/infoPage.html', 'utf8');

    describe('parseMarks', () => {

        it('should return marks by marks page', () => {
            let lessons = parser.parseMarks(marksPage);

            assert.deepEqual(lessons, [
                { title: 'Астрономия', marks: [] },
                { title: 'Биология', marks: [] },
                { title: 'Иностранный', marks: [ 5 ] },
                { title: 'Информатика и ИКТ', marks: [ 5, 5 ] },
                { title: 'История', marks: [] },
                { title: 'Литература', marks: [] },
                { title: 'Математика', marks: [ 4, 4 ] },
                { title: 'Обществознание (включая экономику и право)', marks: [] },
                { title: 'Основы безопасности жизнедеятельности (ОБЖ)', marks: [ 5 ] },
                { title: 'Родная литература', marks: [] },
                { title: 'Родной язык', marks: [] },
                { title: 'Русский язык', marks: [] },
                { title: 'Физика', marks: [] },
                { title: 'Физическая культура', marks: [ 5, 5, 5 ] },
                { title: 'Химия', marks: [] }
            ]);
        });

    });

    describe('parseInfo', () => {
        it('should return info by info page', () => {
            let info = parser.parseInfo(infoPage);

            assert.deepEqual(info, [
                { key: 'Имя', value: 'Семенов Роман Сергеевич' },
                { key: 'Логин', value: '49104010076' },
                {
                    key: 'Школа',
                    value: 'Общеобразовательная школа-интернат "IТ-лицей ФГАОУ ВО К(П)ФУ"'
                },
                { key: 'Должность', value: 'Ученик' },
                { key: 'Пол', value: 'мужской' },
                { key: 'Номер сертификата', value: '5647988Статус не активен' }
            ]);
        });
    });

});
