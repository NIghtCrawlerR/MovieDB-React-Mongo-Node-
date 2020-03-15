import React from 'react';

const TopInfo = ({
  release_date,
  runtime,
  playtime,
  number_of_seasons,
  number_of_episodes,
  rating,
}) => (
    <div className="info-top mb-2">
      {/* Release date */}
      {release_date && <span>{new Date(release_date).getFullYear()} year</span>}

      {/* Runtime (Movies) */}
      {runtime && <span>{`${runtime} min`}</span>}

      {/* Playtime (Games) */}
      {playtime && <span>{`${playtime} hours`}</span>}

      {/* Number of seasons (TV Shows) */}
      {number_of_seasons && <span>{`${number_of_seasons} Seasons`}</span>}

      {/* Number of episodes (TV Shows) */}
      {number_of_episodes && <span>{`${number_of_episodes} Episodes`}</span>}

      {/* Rating */}
      {rating && (
        <span>
          <i className="fas fa-star mr-2" />
          {rating}
        </span>
      )}
    </div>
  );

export default TopInfo;