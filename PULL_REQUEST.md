Dentro da pasta Service no ServiceCard há a conexão das funções do 'Backend', o consumo dos dados do backend foi realizado pelo 'Axios'.

Os ícones deste frontend foram utilizados da biblioteca 'react-icons'.

1. Users should be able to create, read, update, and delete to-do items using the API.

O CRUD funciona ao criar listas, ler, atualizar e deletar os cards e mostrar diretamente no front.
Existe uma função que criei mas não foi utilizada, chamada no front, (pode ser atribuída a "search") chamada 'searchListsByTitle', basicamente ela faz pesquisas pelo 'title' seja ele completo ou parcial.

2. Users should be able to mark an item as a favorite.

A função 'updateFavoriteStatus' faz com que ao clicar na estrela de um "card" ele troque seu estado entre 0 e 1 ("true" ou "false"), enviando diretamente ao backend e atualizando.

3. Users should be able to set a color for each to-do item.

Isto é possível através do 'modal' que ao clicar ele abre as opções para cada singular 'card', em que ao clicar numa cor é acionado a função "handleCircleClick" que utiliza do index dar cor para identificá-la pois são registradas como numbers. Esta função aciona a "updateCardColor" que aciona o 'back' e atualiza a cor.

4. The React frontend should display the user's to-do list in a responsive and visually appealing manner, with the ability to filter by favorite items and color.

O front-end está responsivo, seja a 'search', os 'cards', o 'createCard' e o 'modal'. Tudo foi feito através de media query.

5. The favorited items should be displayed at the top of the list.

Os itens favoritos estão separados dos comuns através de um filtro presente no index.tsx linha 34 e 35, onde são subdivivididos usando do "is_favorite" para ficar entre as listas.