import { CounterPage, RedditListPage, FusionChartBar } from './';
// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html


export default {
  path: 'demo',
  childRoutes: [
    { path: 'counter', component: CounterPage },
    { path: 'reddit-list', component: RedditListPage },
    { path: 'fusion-chart-bar', component: FusionChartBar },
  ],
};
