/**
 * @author Kevin Duglué
 * @author Rémy Kaloustian
 */

// Import JQuery
import $ from 'jquery/dist/jquery.min';
import ImageElementWidget from 'tuiomanager/widgets/ElementWidget/ImageElementWidget/ImageElementWidget';
import LibraryStack from 'tuiomanager/widgets/Library/LibraryStack/LibraryStack';
import Planet from './planet';

// Import ImageWidget
// import VideoElementWidget from 'tuiomanager/widgets/ElementWidget/VideoElementWidget/VideoElementWidget';
// import LibraryBar from 'tuiomanager/widgets/Library/LibraryBar/LibraryBar';
// import CircularMenu from 'tuiomanager/widgets/CircularMenu/CircularMenu';
// import MenuItem from 'tuiomanager/widgets/CircularMenu/MenuItem';
// import { buildNoobWork } from './dev-test';

let widgets = [];

function AddWidgetToScreen(widget) {
//  $('#example-container').append(widget.domElem);
  widget.addTo('#example-container');
  widgets.push(widget);
}// AddWidgetToScreen()

function RemoveWidgets() {
  $('#example-container').empty();
  for (let i = 0; i < widgets.length; i += 1) {
    widgets[i].deleteWidget();
  }
  widgets = [];
}

function buildBackButton() {
  $('#example-container').append('<button id="back-button">Back</button>');
  $('#back-button').on('click', () => {
    RemoveWidgets();
    /* eslint-disable no-use-before-define */
    buildMenu();
    /* eslint-enable no-use-before-define */
  });
}//  displayMenu()

function buildGame() {
  RemoveWidgets();
  buildBackButton();
  const imageWidget1 = new ImageElementWidget(50, 50, 640, 960, 10, 0.1, 'assets/image/rocket.png', 1000, 'B3', 'C9', '38', '6');
  const planet1 = new Planet(0, 0, 610, 1080, 0, 0, 'assets/image/planet1.jpg', 'B3', 'C9', '38', '6');
  const planet2 = new Planet(600, 0, 613, 399, 0, 0, 'assets/image/planet2.jpg', 'B3', 'C9', '38', '6');
  const planet3 = new Planet(500, 700, 764, 391, 0, 0, 'assets/image/planet3.jpg', 'B3', 'C9', '38', '6');
  const planet4 = new Planet(1200, 0, 734, 1080, 0, 0, 'assets/image/planet4.jpg', 'B3', 'C9', '38', '6');
  const planet5 = new Planet(600, 350, 720, 391, 0, 0, 'assets/image/planet5.jpg', 'B3', 'C9', '38', '6');
  AddWidgetToScreen(planet1);
  AddWidgetToScreen(planet2);
  AddWidgetToScreen(planet3);
  AddWidgetToScreen(planet4);
  AddWidgetToScreen(planet5);
  AddWidgetToScreen(imageWidget1);

  const stack = new LibraryStack(200, 150, 150, 'Territoire', '#2196f3', false, ['ImageElementWidget']);
  AddWidgetToScreen(stack);
}

export default function buildMenu() {
  $('#example-container').append('<h1> Alliances et Trahisons</h1>');
  $('#example-container').append('<button id="user-test" class="menu-button"> Lancer le jeu </button></br>');

  $('#user-test').on('click', () => {
    buildGame();
  });
}
