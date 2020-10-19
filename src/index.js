import './styles.css';
import contryListTempl from './templates/contry-list.hbs';
import contryInfoTempl from './templates/contry-info.hbs';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/Material.css';
import 'material-design-icons/iconfont/material-icons.css';
import { defaults } from '@pnotify/core';
import { error } from '@pnotify/core';
import { debounce } from 'lodash';

defaults.styling = 'material';
defaults.icons = 'material';

const inputRef = document.querySelector('.input-contry-area');
const contryListRef = document.querySelector('.contry');

const debounceInputCallback = debounce(event => {
    const value = event.target.value;
    contryListRef.innerHTML = '';
        if(value){
            let url = `https://restcountries.eu/rest/v2/name/${value}`
            const fet = fetch(url).then(res => res.json()).
            then(data => {
                let markup = null;
                if(data.length === 1){
                    markup = contryInfoTempl(data);
                }
                else if(data.length > 1 && data.length <= 10){
                    markup = contryListTempl(data);
                }
                else if(data.length > 10){
                    markup = '';
                    error({
                        text: "Найдено более 10 резудльтатов. Уточните запрос!",
                        addModalClass: 'notify',
                        width: '360px',
                        delay: 3000
                    });
                }
                else{
                    markup = '<h1>Ничего не найдено!!! попробуйте изменить запрос поиска!</h1>'
                }
                    contryListRef.insertAdjacentHTML('beforeend', markup);  
            });
        }
    else return;
}, 500);

inputRef.addEventListener('input', debounceInputCallback);


