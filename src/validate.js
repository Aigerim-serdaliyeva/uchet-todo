import { extend } from 'vee-validate';

import {
    required,
    confirmed,
    numeric,
    min
} from 'vee-validate/dist/rules';

extend('latin', {
    validate: (value) => /^[A-z]+$/.test(value),
    message: 'Только латинские буквы'
});

extend('required', {
    ...required,
    message: 'Поле обязательно к заполнению'
});

extend('confirmed', {
    ...confirmed,
    message: 'Пароль не совпадает'
});

extend('numeric', {
    ...numeric,
    message: 'Это поле должно состоять только из чисел.'
});

extend('min', {
    ...min,
    message: 'Длина проверяемого поля должна быть не меньше {length} символов.'
});
