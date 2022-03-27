export default {
  "market": "ru",
  "marketURL": "https://znanija.com",
  "marketHost": "znanija.com",
  "marketName": "znanija",
  "common": {
    "withWarn": "с предупреждением",
    "as": "как",
    "noWarns": "Нет предупреждений",
    "questionLog": "История вопроса",
    "pts": "бал.",
    "question": "Вопрос",
    "answer": "Ответ",
    "areYouSureToDeleteMentee": "Вы уверены, что хотите удалить этого ученика?\nВсе данные, в том числе статистика, проверенные акции, будут утрачены.",
    "deleteMentee": "Удалить ученика",
    "youHaveBeenAuthorized": "Вы авторизованы в расширении Znanija Наставник!",
    "deletionReason": "Причина удаления",
    "dateBetween": "Дата между",
    "close": "Закрыть",
    "reload": "Обновить",
    "today": "сегодня",
    "yesterday": "вчера",
    "nDaysAgo": "%{days} дней назад",
    "all": "Все",
    "nick": "Ник",
    "filters": "Фильтры",
    "clickHereToLogin": "Нажмите сюда, чтобы войти",
    "viewActions": "Смотреть акции",
    "loading": "Загрузка...",
    "actions": "Акции",
    "tryAgain": "Попробовать ещё раз",
    "approveAction": "Одобрить!",
    "disapproveAction": "Отметить как неверно!",
    "revertAction": "Удалить из принятых/неверных акций",
    "answerDeleted": "Ответ удален",
    "questionDeleted": "Вопрос удален",
    "commentDeleted": "Комментарий удален",
    "attachmentDeleted": "Вложение удалено",
    "contentAccepted": "Принято",
    "toCorrect": "Отправлено на исправление",
    "previousPage": "Предыдущая страница",
    "nextPage": "Следующая страница",
    "deleted": "Удалено",
    "yourMentees": "Ваши ученики",
    "note": "Заметка",
    "contentType": "Тип контента",
    "actionType": "Тип акции",
    "noActionsMatchingFilters": "Нет акций, удовлетворяющие фильтрам",
    "noReason": "Нет причины",
    "hideComments": "Скрыть комментарии",
    "actionFilters": {
      "contentTypes": [
        {"value": "answer", "text": "Ответы"},
        {"value": "question", "text": "Вопросы"},
        {"value": "comment", "text": "Комментарии"},
        {"value": "attachment", "text": "Вложения"},
      ],
      "actionTypes": [
        {"value": "DELETED", "text": "Удалено"},
        {"value": "ACCEPTED", "text": "Принято"},
        {"value": "REPORTED_FOR_CORRECTION", "text": "Отправлено на исправление"},
      ],
      "deletionReasons": [{"value":"41","text":"Культура"},{"value":"52","text":"Пропало приложение"},{"value":"15","text":"СПАМ"},{"value":"48","text":"Ссылки"},{"value":"51","text":"НЕ ответ"},{"value":"55","text":"Копия/плагиат"},{"value":"62","text":"Реклама"},{"value":"63","text":"Онлайн калькулятор"},{"value":"7","text":"Неверный"},{"value":"9","text":"Нет расчетов"},{"value":"35","text":"Ответ неполный"},{"value":"42","text":"Переводчик"},{"value":"56","text":"Нет приложения"},{"value":"60","text":"Не тот ответ"},{"value":"16","text":"Оскорбление"},{"value":"40","text":"Культура :)"},{"value":"2","text":"СПАМ"},{"value":"38","text":"КОНТРОЛЬНАЯ (ЭКЗАМЕН)"},{"value":"47","text":"Реклама"},{"value":"3","text":"Неполное условие"},{"value":"4","text":"Банальный"},{"value":"17","text":"Нет приложения"},{"value":"32","text":"Много вопросов"},{"value":"53","text":"Проверить ответ"},{"value":"59","text":"Изменить язык"},{"value":"6","text":"Оскорбление"},{"value":"23","text":"Ссылка"},{"value":"58","text":"Учебник"},{"value":"37","text":"По просьбе"},{"value":"39","text":"Не тот предмет"},{"value":"61","text":"Не школа"},{"value":"44","text":"Комментарий удалён"}]
    },
    "user": "Пользователь",
    "nickEqualsTo": "ник равно",
    "idEqualsTo": "ID равно",
    "rankEqualsTo": "статус равно",
    "addMentee": "Добавить ученика",
    "linkToUserProfile": "Ссылка на профиль пользователя"
  },
  "errors": {
    "accountDeleted": "Аккаунт удалён",
    "couldNotLoadActions": "Нам не удалось загрузить акции :(",
    "notAuthorizedToUseExtension": "Вы не авторизованы, чтобы использовать расширение",
    "couldNotAuthorizeYou": "Мы не смогли вас авторизовать",
    "couldNotFindAuthTokenInDM": "Не удалось найти токен авторизации в личных сообщениях",

    // Server errors
    "notAuthed": "Вы не авторизованы",
    "brainlyError": "Ошибка Brainly",
    "invalidUserOrPage": "Неверный айди пользователя или страницы",
    "pageNotFound": "Страница не найдена",
    "databaseUnavailable": "Сервер расширения временно недоступен 😞",
    "internalError": "Упс :( Непредвиденная ошибка",
    "userNotFound": "Пользователь не найден",
    "invalidUser": "Неверный пользователь",
    "invalidPayload": "Неверные данные",
    "notModerator": "Пользователь - не модератор",
    "marketNotSupported": "Сайт не поддерживается",
    "noActions": "У этого пользователя нет акций. Пока что...",
    "tokenInvalid": "Неверный токен авторизации",
    "mentorNotFound": "Наставник не найден",
    "cannotReviewYourActions": "Вы не можете проверять свои акции",
    "alreadyReviewed": "Акция уже проверена",
    "notReviewed": "Акция ещё не проверена",
    "actionNotFound": "Акция не найдена",
    "couldNotFetchSavedActions": "Мы не смогли загрузить сохранённые акции",
    "noPrivileges": "У вас нет привилегий для выполнения данного действия",
    "wannaAddYourself": "Хотите себя добавить? 👁️",
    "userAlreadyExists": "Пользователь уже существует",
    "accountDeactivated": "Аккаунт деактивирован",
    "menteeNotFound": "Ученик не найден"
  },
  "taskPath": "/task",
  "dateTimeFormat": "DD.MM.YYYY, hh:mm:ss",
  "dateFormat": "DD.MM.YYYY",
  "timezone": "Europe/Moscow",
  "botUserId": 26831100,
  "regexps": {
    "accepted": /принятые/i,
    "deleted": /удален/i,
    "question": /задание/i,
    "incorrect": /отмечено не верно/i
  },
  "localizedActionTypes": {
    "ATTACHMENT_DELETED": "Вложение удалено",
    "ACCEPTED": "Принято",
    "DELETED": "Удалено",
    "REPORTED_FOR_CORRECTION": "Отправлено на исправление",
    "COMMENT_DELETED": "Комментарий удалён"
  },
  "deletionReasons": [{"id":41,"name":"Культура","regex":"относитесь к другим пользователям с уважением"},{"id":52,"name":"Пропало приложение","regex":"из-за сбоя в работе Сервиса решение, данное Вами во вложении"},{"id":15,"name":"СПАМ","regex":"запись не является ответом на заданный вопрос"},{"id":48,"name":"Ссылки","regex":"ссылки на другие сайты или издания в ответах запрещены правилами"},{"id":51,"name":"НЕ ответ","regex":"комментарий не является ответом"},{"id":55,"name":"Копия/плагиат","regex":"чужих ответов, размещение ссылок на другие сайты или издания и текстов из них запрещены"},{"id":62,"name":"Реклама","regex":"грубым нарушением правил Сервиса и приводит к удалению Аккаунта"},{"id":63,"name":"Онлайн калькулятор","regex":"скопирован с онлайн калькулятора"},{"id":7,"name":"Неверный","regex":"содержит ошибки, поэтому не может считаться верным"},{"id":9,"name":"Нет расчетов","regex":"не содержит шагов решения, необходимых пояснений или расчётов"},{"id":35,"name":"Ответ неполный","regex":"не является полным и исчерпывающим"},{"id":42,"name":"Переводчик","regex":"Ввыполнен с помощью онлайн-переводчика"},{"id":56,"name":"Нет приложения","regex":"приложения (рисунка, схемы или чертежа)"},{"id":60,"name":"Не тот ответ","regex":"соответствует заданному вопросу"},{"id":16,"name":"Оскорбление","regex":"слова и выражения, а также ненормативная лексика недопустимы в нашем сообществе"},{"id":40,"name":"Культура :)","regex":"сформулировать его более вежливо, и шансы на получение ответа будут гораздо выше"},{"id":2,"name":"СПАМ","regex":"задавайте осмысленные вопросы"},{"id":38,"name":"КОНТРОЛЬНАЯ (ЭКЗАМЕН)","regex":"задавать вопросы из действующих контрольных, проверочных, экзаменационных работ"},{"id":47,"name":"Реклама","regex":"рекламной информации без разрешения администрации сообщества"},{"id":3,"name":"Неполное условие","regex":"не хватает важных условий или изображений"},{"id":4,"name":"Банальный","regex":"ваш вопрос является слишком простым"},{"id":17,"name":"Нет приложения","regex":"качественное приложение"},{"id":32,"name":"Много вопросов","regex":"содержащие больше 3 вопросов"},{"id":53,"name":"Проверить ответ","regex":"сможете сравнить полученный ответ со своим"},{"id":59,"name":"Изменить язык","regex":"не относящимся к литературе и языку Вашей страны"},{"id":6,"name":"Оскорбление","regex":"повторные нарушения ваш аккаунт может быть заблокирован"},{"id":23,"name":"Ссылка","regex":"размещение ссылок на сторонние ресурсы или издания запрещено"},{"id":58,"name":"Учебник","regex":"перепишите свой вопрос из учебника"},{"id":37,"name":"По просьбе","regex":"удалено по просьбе пользователя"},{"id":39,"name":"Не тот предмет","regex":"опубликуйте свой вопрос в соответствующем ему предмете"},{"id":61,"name":"Не школа","regex":"не связан с тематикой"},{"id":44,"name":"Комментарий удалён","regex":"вынуждены удалить Ваш комментарий"}],
  "subjects": [{"id":59,"name":"Уход за собой"},{"id":29,"name":"Математика"},{"id":17,"name":"Литература"},{"id":30,"name":"Алгебра"},{"id":16,"name":"Русский язык"},{"id":31,"name":"Геометрия"},{"id":33,"name":"Английский язык"},{"id":10,"name":"Химия"},{"id":9,"name":"Физика"},{"id":3,"name":"Биология"},{"id":42,"name":"Другие предметы"},{"id":13,"name":"История"},{"id":15,"name":"Обществознание"},{"id":46,"name":"Окружающий мир"},{"id":8,"name":"География"},{"id":37,"name":"Українська мова"},{"id":32,"name":"Информатика"},{"id":41,"name":"Українська література"},{"id":44,"name":"Қазақ тiлi"},{"id":22,"name":"Экономика"},{"id":48,"name":"Музыка"},{"id":25,"name":"Право"},{"id":49,"name":"Технология"},{"id":43,"name":"Беларуская мова"},{"id":47,"name":"Французский язык"},{"id":45,"name":"Немецкий язык"},{"id":50,"name":"Черчение"},{"id":51,"name":"МХК"},{"id":52,"name":"ОБЖ"},{"id":53,"name":"Психология"},{"id":54,"name":"Оʻzbek tili"},{"id":55,"name":"Кыргыз тили"},{"id":56,"name":"Астрономия"},{"id":57,"name":"Физкультура и спорт"},{"id":58,"name":"ЕГЭ / ОГЭ"}]
};