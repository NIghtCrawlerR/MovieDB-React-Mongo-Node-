import React from 'react';

import InfoBlock from './InfoBlock';

function MainInfo({
  genres,
  release_date,
  next_episode_to_air,
  developers,
  publishers,
  production_companies,
  production_countries,
  platforms,
  website,
}) {

  const listFromArray = (array) => array.map((item) => item.name).join(', ');
  const platformsList = (array) => array.map((item) => item.platform.name).join(', ');

  return (
    <div className="item-full__main-info">
      {/* Genres */}
      {genres && <InfoBlock title="Genres:" data={genres.map((genre) => genre.name).join(', ')} />}

      {/* Release date (movies & games) */}
      {release_date && <InfoBlock title="Release date:" data={new Date(release_date).toLocaleDateString()} />}

      {/* Next episode date (tv shows) */}
      {next_episode_to_air && <InfoBlock title="Next episod date:" data={new Date(next_episode_to_air.air_date).toLocaleDateString()} />}

      {/* Developer companies (Games) */}
      {developers && <InfoBlock title="Developer:" data={listFromArray(developers)} />}

      {/* Publishers (Games) */}
      {publishers && <InfoBlock title="Publisher:" data={listFromArray(publishers)} />}

      {/* Production companies (Movies & TV shows) */}
      {production_companies && production_companies.length > 0
        ? <InfoBlock title="Production companies:" data={listFromArray(production_companies)} />
        : null}
      {production_countries && <InfoBlock title="Countries:" data={listFromArray(production_countries)} />}

      {/* Production countries (Movies) */}
      {platforms && <InfoBlock title="Platforms:" data={platformsList(platforms)} />}

      {/* Website */}
      {website && <InfoBlock title="Website:" data={<a href={website} target="_blank" rel="noopener noreferrer">{website}</a>} />}
    </div>
  );
}

export default MainInfo;