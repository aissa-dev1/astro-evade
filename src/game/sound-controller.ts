class SoundController {
  private spaceMusicPlayed = false;
  private currentPlayedSound: HTMLAudioElement | null = null;

  private _spaceMusic = new Audio("/sounds/space-music.mp3");
  private _asteroidExplosion = new Audio("/sounds/asteroid_explosion.wav");
  private _asteroidHit = new Audio("/sounds/asteroid_hit.wav");
  private _gameStart = new Audio("/sounds/game_start.wav");
  private _playerExplosion = new Audio("/sounds/player_explosion.wav");
  private _playerShoot = new Audio("/sounds/player_shoot.wav");

  constructor() {
    this._spaceMusic.loop = true;
  }

  playSpaceMusic() {
    if (this.spaceMusicPlayed) return;
    this.spaceMusic.play();
    this.spaceMusicPlayed = true;
  }

  pauseSpaceMusic() {
    this.spaceMusic.pause();
    this.spaceMusicPlayed = false;
  }

  play(audio: HTMLAudioElement) {
    if (this.currentPlayedSound !== null) {
      this.currentPlayedSound.pause();
      this.currentPlayedSound.currentTime = 0;
    }

    audio.play();
    this.currentPlayedSound = audio;
  }

  mute(audio: HTMLAudioElement) {
    audio.volume = 0;
  }

  unmute(audio: HTMLAudioElement) {
    audio.volume = 1;
  }

  get spaceMusic(): HTMLAudioElement {
    return this._spaceMusic;
  }

  get asteroidExplosion(): HTMLAudioElement {
    return this._asteroidExplosion;
  }

  get asteroidHit(): HTMLAudioElement {
    return this._asteroidHit;
  }

  get gameStart(): HTMLAudioElement {
    return this._gameStart;
  }

  get playerExplosion(): HTMLAudioElement {
    return this._playerExplosion;
  }

  get playerShoot(): HTMLAudioElement {
    return this._playerShoot;
  }
}

export const soundController = new SoundController();
