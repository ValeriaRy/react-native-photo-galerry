export const getImagesFromApi = async (page) => {
    let url = 'https://api.500px.com/v1/photos?feature=popular&consumer_key=wB4ozJxTijCwNuggJvPGtBGCRqaZVcF6jsrzUadF';
    if (page) url = url + '&page=' + page;
    return new Promise((resolve) => {
        fetch(url)
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson); ;
        })
        .catch((error) => {
            console.error(error);
        });
    });
}
