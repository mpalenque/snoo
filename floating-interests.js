const interestLists = {
    '01': [
        'r/technology',
        'r/gadgets',
        'r/homeassistant',
        'r/techsupport',
        'r/dataisbeautiful'
    ],
    '02': [
        'r/CleaningTips',
        'r/HomeImprovement',
        'r/DiWHY',
        'r/CozyPlaces',
        'r/FirstTimeHomeBuyer'
    ],
    '03': [
        'r/CozyGamers',
        'r/truegaming',
        'r/gamedevs',
        'r/ShouldIBuyThisGame',
        'r/IndieDev'
    ],
    '04': [
        'r/personalfinance',
        'r/GetMotivated',
        'r/remotework',
        'r/productivity',
        'r/resumes'
    ],
    '05': [
        'r/streetwear',
        'r/malefashionadvice',
        'r/femalefashionadvice',
        'r/sneakers',
        'r/buyitforlife'
    ],
    '06': [
        'r/sports',
        'r/soccer',
        'r/nba',
        'r/nfl',
        'r/sportphotography'
    ],
    '07': [
        'r/Music',
        'r/listentothis',
        'r/musicsuggestions',
        'r/musictheory',
        'r/WeAreTheMusicMakers'
    ],
    '08': [
        'r/wanderlust',
        'r/TravelHacks',
        'r/backpacking',
        'r/onebag',
        'r/solotravel'
    ],
    '09': [
        'r/classicfilms',
        'r/entertainment',
        'r/MovieDetails',
        'r/Television',
        'r/AccidentalWesAnderson'
    ],
    '10': [
        'r/SketchDaily',
        'r/DesignMyRoom',
        'r/Ceramics',
        'r/photobattles',
        'r/ArtHistory'
    ],
    '11': [
        'r/aww',
        'r/nature',
        'r/CatDistributionSystem',
        'r/dogs',
        'r/plantclinic'
    ],
    '12': [
        'r/AskReddit',
        'r/iAMA',
        'r/MadeMeSmile',
        'r/mildlyinteresting',
        'r/todayilearned'
    ]
};

const interestFolders = {
    '01': '1 Technology',
    '02': '2 Home & DIY',
    '03': '3 Gaming',
    '04': '4 Career',
    '05': '5 Fashion',
    '06': '6 Sports',
    '07': '7 Music',
    '08': '8 Travel',
    '09': '9 Cinema & TV',
    '10': '10 Art & Design',
    '11': '11 Pets & Nature',
    '12': '12 General'
};

function getImageFilename(folderPath, index) {
    const imageMap = {
        '1 Technology': ['technology', 'gadgets', 'homeassistant', 'techsupport', 'dataisbeautiful'],
        '2 Home & DIY': ['CleaningTips', 'HomeImprovement', 'DiWHY', 'CozyPlaces', 'FirstTimeHomeBuyer'],
        '3 Gaming': ['CozyGamers', 'truegaming', 'gamedevs', 'ShouldIbuythisgame', 'IndieDev'],
        '4 Career': ['personalfinance', 'GetMotivated', 'remotework', 'productivity', 'resumes'],
        '5 Fashion': ['streetwear', 'malefashionadvice', 'femalefashionadvice', 'sneakers', 'buyitforlife'],
        '6 Sports': ['sports', 'soccer', 'nba', 'nfl', 'sportsphotography'],
        '7 Music': ['Music', 'listentothis', 'musicsuggestions', 'musictheory', 'WeAreTheMusicMakers'],
        '8 Travel': ['wanderlust', 'TravelHacks', 'backpacking', 'onebag', 'solotravel'],
        '9 Cinema & TV': ['classicfilms', 'entertainment', 'MovieDetails', 'Television', 'AccidentalWesAnderson'],
        '10 Art & Design': ['SketchDaily', 'DesignMyRoom', 'Ceramics', 'photoshopbattles', 'ArtHistory'],
        '11 Pets & Nature': ['aww', 'nature', 'CatDistributionSystem', 'doggos', 'plantclinic'],
        '12 General': ['AskReddit', 'iAMA', 'MadeMeSmile', 'mildlyinteresting', 'todayilearned']
    };

    return imageMap[folderPath]?.[index - 1] || '';
}

function createSubredditButtons() {
    console.log('createSubredditButtons started');
    
    // Crear o obtener el contenedor de subreddits
    let container = document.querySelector('.subreddit-row');
    if (!container) {
        container = document.createElement('div');
        container.className = 'subreddit-row';
        document.querySelector('.subreddit-grid').appendChild(container);
    }

    // Limpiar el contenedor
    container.innerHTML = '';

    // Buscar el parámetro de interés en la URL
    const params = new URLSearchParams(window.location.search);
    let foundInterest = null;
    
    for (let i = 1; i <= 12; i++) {
        const key = `interest-${i.toString().padStart(2, '0')}`;
        if (params.has(key) || Array.from(params.keys()).includes(key)) {
            foundInterest = i.toString().padStart(2, '0');
            break;
        }
    }

    if (!foundInterest || !interestFolders[foundInterest]) {
        console.log('No valid interest parameter found');
        return;
    }

    const folderName = interestFolders[foundInterest];
    console.log('Loading from folder:', folderName);
    
    // Crear botones para cada subreddit
    for (let i = 1; i <= 5; i++) {
        const link = document.createElement('a');
        const img = document.createElement('img');
        
        // Configurar la imagen
        img.className = 'subreddit-item';
        
        // Obtener el nombre del subreddit
        const subredditName = getImageFilename(folderName, i);
        if (!subredditName) continue;

        // Configurar la imagen y el enlace
        img.alt = subredditName;
        img.src = `./Subreddits 4x/${folderName}/${i} ${subredditName}.png`;
        link.href = `https://www.reddit.com/r/${subredditName}`;
        link.target = '_blank';
        
        link.appendChild(img);
        container.appendChild(link);
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSubredditButtons);
} else {
    createSubredditButtons();
}
