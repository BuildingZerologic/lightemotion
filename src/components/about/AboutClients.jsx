import "./AboutClients.scss"

const clients = [
    'ITC Hotels',
    'Hyatt Regency',
    'Taj Hotels',
    'JW Marriott',
    'The Claridges Hotels & Resorts',
    'The Lalit',
    'Hilton',
    'Crowne Plaza',

    'Radisson',
    'Westin Hotels & Resorts',
    'HSBC',
    'Google',
    'Volkswagen',
    'GAIL (India) Limited',
    'Emerson',
    'Harman',

    'Asian Paints',
    'Timex',
    'Ray-Ban',
    'Xiaomi',
    'Raffles Hotels & Resorts',
    'D Decor',
    'M3M',
    'Lanco',

    'American Express',
    "Gold's Gym",
    'PVR Cinemas',
    'Delhi International Airport',
    'Max Healthcare',
    'Jaquar Lighting',
    'The Great India Place',

];

function chunkArray(array, size) {
    const chunked = [];

    for (let i = 0; i < array.length; i += size) {
        chunked.push(array.slice(i, i + size));
    }

    return chunked;
}

const columns = chunkArray(clients, 8);

export default function AboutClients() {
    return (
        <section className="about-clients">
            <div className="container">
                <div className="about-clients__header">
                    <span className="about-clients__label">
                        OUR CLIENTS
                    </span>

                    <h3 className="about-clients__heading heading-lg">
                        The spaces that shape India's future - we light them
                    </h3>
                </div>

 
                <div className="about-clients__grid">
                    {columns.map((column, index) => (
                        <ul
                            key={index}
                            className="about-clients__column"
                        >
                            {column.map((client) => (
                                <li
                                    key={client}
                                    className="about-clients__item"
                                >
                                    {client}
                                </li>
                            ))}
                        </ul>
                    ))}
                </div>
            </div>
        </section>
    );
}