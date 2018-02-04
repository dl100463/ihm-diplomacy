import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import MenuItem from 'tuiomanager/widgets/CircularMenu/MenuItem';
import CircularMenuCustom from './circularMenuCustom';
import Drawer from './drawer';
import Player from './player';
import Planet from './planet';
import SpaceshipWidget from './spaceshipWidget';
import Client from './client';

let gameCoreInstance = null;

class GameCore {
  constructor() {
    if (gameCoreInstance !== null) {
      return gameCoreInstance;
    }

    this.players = [];
    this.planets = [];
    this.playerColors = ['red', 'green', 'blue', 'orange'];
    this.playerTags1 = ['1', '3', '0', '2'];
    this.playerTags2 = ['77', '88', '99', '7A'];
    this.playerImgs = ['assets/image/spaceship1.png', 'assets/image/spaceship2.png', 'assets/image/spaceship3.png', 'assets/image/spaceship4.png'];
    this.drawer = new Drawer(WINDOW_WIDTH, WINDOW_HEIGHT, this);
    this.client = new Client();
    this.gameStarted = false;

    gameCoreInstance = this;
    return gameCoreInstance;
  }

  static getInstance() {
    return new GameCore();
  }

  addMenu() {
    const root = new MenuItem('root', '#0F0', '#0FF', false);

    const attack = new MenuItem('Attack', '#FFF', '#000', false);
    attack.setTouchCallback(() => {
      // console.log('Created spaceship');
    });
    root.addChild(attack);

    // const target = new MenuItem('Target', '#FFF', '#000', false);
    // target.setTouchCallback(() => {
    //   // console.log('Target planet now');
    // });
    // root.addChild(target);

    this.menu = new CircularMenuCustom(0, root);
    this.menu.addTo('#example-container');
  }

  initMap() {
    this.drawer.prepareDrawer('assets/image/background.jpg');
  }

  initPlayers() {
    this.createPlayer(1, this.playerTags1[0], this.playerTags2[0]);
    this.addFirstSpaceships(0, 1, 265, 185);

    this.createPlayer(2, this.playerTags1[1], this.playerTags2[1]);
    this.addFirstSpaceships(1, 2, 825, 102);

    this.createPlayer(3, this.playerTags1[2], this.playerTags2[2]);
    this.addFirstSpaceships(2, 3, 545, 810);

    this.createPlayer(4, this.playerTags1[3], this.playerTags2[3]);
    this.addFirstSpaceships(3, 4, 1270, 209);
  }

  createPlayer(id, tagId1, tagId2) {
    this.players.push(new Player(id, this.playerColors[id - 1], tagId1, tagId2));
  }

  initFirstPlanets() {
    for (let i = 0; i < 16; i += 1) {
      this.client.socket.emit('add_planet', '{}');
    }
  }

  initPlanets() {
    this.addPlanet(1, 1, 230, 185, 95);
    this.addPlanet(2, 2, 770, 102, 135);
    this.addPlanet(3, 3, 500, 810, 110);
    this.addPlanet(4, 4, 1225, 209, 110);
    this.addPlanet(5, -1, 1710, 807, 100);
    this.addPlanet(6, -1, 930, 822, 220);
    this.addPlanet(7, -1, 12, 27, 90);
    this.addPlanet(8, -1, 234, 510, 65);
    this.addPlanet(9, -1, -120, 830, 310);
    this.addPlanet(10, -1, 1280, 590, 180);
    this.addPlanet(11, -1, 658, 385, 95);
    this.addPlanet(12, -1, 1189, -20, 110);
    this.addPlanet(13, -1, 1489, 86, 85);
    this.addPlanet(14, -1, 1520, 476, 70);
    this.addPlanet(15, -1, 1634, 226, 140);
    this.addPlanet(16, -1, 1744, 82, 60);
  }

  addFirstSpaceships(id, playerId, x, y) {
    const newSpaceship = new SpaceshipWidget(id, playerId, x, y, 45, 45, 0, this.playerColors[playerId - 1], this.playerImgs[playerId - 1], this.drawer);
    this.players[playerId - 1].addSpaceship(newSpaceship);
    newSpaceship.addTo('#example-container');
  }

  addSpaceship(id, playerId, planetId) {
    if (this.gameStarted) {
      const correctId = planetId > 3 ? planetId - 1 : planetId;
      const newSpaceship = new SpaceshipWidget(3 + id, playerId, this.planets[correctId].x, this.planets[correctId].y, 45, 45, 0, this.playerColors[playerId - 1], this.playerImgs[playerId - 1], this.drawer); // eslint-disable-line
      this.players[playerId - 1].addSpaceship(newSpaceship);
      newSpaceship.addTo('#example-container');
    }
  }

  addPlanet(planetId, playerId, x, y, size) {
    let newPlanet;
    if (playerId > 0) {
      newPlanet = new Planet(planetId, playerId, x, y, size, '', this.playerColors[playerId - 1], this.playerColors[playerId - 1], false, ['SpaceshipWidget']);
      this.players[playerId - 1].addPlanet(newPlanet);
    } else {
      newPlanet = new Planet(planetId, playerId, x, y, size, '', 'white', 'white', false, ['SpaceshipWidget']);
    }

    this.planets.push(newPlanet);
    newPlanet.addTo('#example-container');
  }

  startGame() {
    setTimeout(() => {
      this.gameStarted = true;
    }, 5000);
  }

  conquerFirstPlanet(id) {
    this.planets[id - 1].stackDiv.css('border', `solid 10px ${this.playerColors[id - 1]}`);
    this.planets[id - 1].playerId = id;
  }
}

export default GameCore;
