const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
      authorization: '24fc02a3-20be-449b-9405-e793d7a655e4',
      'Content-Type': 'application/json'
    }
}

const checkResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
 }

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(res => checkResponse(res));
}


export const getUserProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(res => checkResponse(res));
}

export const updateUserProfile = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(userInfo)
    })
        .then(res => checkResponse(res))
}

export const addNewCardToServer = (cardInfo) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(cardInfo)
    })
        .then(res => checkResponse(res))
}

export const deleteCardFromServer = (cardID) => {
    return fetch(`${config.baseUrl}/cards/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}

export const likeCardServer = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}

export const dislikeCardServer = (cardID) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: config.headers,
    })
        .then(res => checkResponse(res))
}

export const changeAvatarServer = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify(avatarLink)
    })
        .then(res => checkResponse(res))
}