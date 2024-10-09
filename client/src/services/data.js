async function getPodcast(){
    try {

        const response = await fetch(
            'https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json'
        );
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        const formattedResponse = await response.json();

        const results = [];

        console.log(formattedResponse);
        

        formattedResponse.feed.entry.forEach((podcast) => {
            const result = {
                id: podcast.id.attributes['im:id'],
                img: podcast['im:image'][2].label,
                name: podcast['im:name'].label,
                author: podcast['im:artist'].label,
                description: podcast.summary.label, 
                link: podcast.link.attributes.href,
            };
            results.push(result);
        });
        return results;
    }
    catch (error) {
        console.error('Ocurrió un error:', error);
    }
}

export {getPodcast};