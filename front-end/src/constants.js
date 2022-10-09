export const HOME_VIEW                = 'home_view';
export const GAME_VIEW                = 'game_view';
export const SCORES_VIEW              = 'scores_view';

export const COLOR_BACKGROUND         = '#000000';
export const COLOR_PLANE              = '#FFFFFF';
export const COLOR_BULLET             = '#00FF00';
export const COLOR_FONT               = '#FFFF00';
export const COLOR_ENEMY_BLUE         = '#0000FF';
export const COLOR_ENEMY_RED          = '#FF0000';

export const CANVAS_WIDTH             = 600;
export const CANVAS_HEIGHT            = 600;

export const MOVE_RIGHT               = 'right';
export const MOVE_LEFT                = 'left';

export const BULLET_DIRECTION_UP_DOWN = 'up-down';
export const BULLET_DIRECTION_DOWN_UP = 'down-up';


export const PLANE_WIDTH              = 50;
export const PLANE_HEIGHT             = 50;
export const PLANE_TIP_POS            = PLANE_WIDTH / 2;
export const PLANE_VERTICAL_PLANE     = CANVAS_HEIGHT - PLANE_HEIGHT - 10;
export const PLANE_MOVE_SPEED         = 10;

export const FRAMES_PER_SECOND        = 60;
export const ENEMY_APPEAR_RATE        = 2000; // milliseconds

export const COLLISION_PLANE_ENEMY    = 'plane_enemy_collision';
export const COLLISION_BULLET_ENEMY   = 'bullet_enemy_collision';
export const COLLISION_BULLET_PLANE   = 'bullet_plane_collision';
export const COLLISION_NONE           = 'no_collision';