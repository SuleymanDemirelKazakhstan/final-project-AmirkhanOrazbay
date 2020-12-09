let list = [{
        title: 'Work anywhere',
        description: 'Whether it’s for work, a side project or even the next family vacation, TBT helps you to stay organized.',
        img_src: 'file/img/elementPage.png'
    },

    {
        title: 'Information at a glance',
        description: 'You can keep a list of tasks. The task board will allow you to manage a project using the kanban system.',
        img_src: 'file/img/listPage.png'
    }
];
load();

function load() {
    let cards = document.querySelector('.cards');
    for (var i = 0; i < list.length; i++) {
        cards.appendChild(createCard(list[i], i));
    }
}

function createCard(cardInfo, i) {
    var card = document.createElement('div');
    card.className = 'card';

    var text = document.createElement('div');
    text.className = 'text';

    var h3 = document.createElement('h3');
    h3.innerHTML = cardInfo.title;
    text.appendChild(h3);
    var p = document.createElement('p');
    p.innerHTML = cardInfo.description;
    text.appendChild(p);

    var image = document.createElement('img');
    image.src = cardInfo.img_src

    if (i % 2 == 0) {
        card.appendChild(text);
        card.appendChild(image);
    } else {
        card.appendChild(image);
        card.appendChild(text);
    }
    return card;
}