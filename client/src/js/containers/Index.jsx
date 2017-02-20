import React, {Component} from 'react';

import PanelNoControls from '../components/panels/PanelNoControls';

export default class extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PanelNoControls>
          <ul>
            <li>Submitted By: Steve Milburn</li>
            <li>Source Code: <a href="https://github.com/stvmlbrn/mlb-hackathon" target="_blank">https://github.com/stvmlbrn/mlb-hackathon</a></li>
            <li>Personal Web Site: <a href="https://stvmlbrn.github.io/" target="_blank">https://stvmlbrn.github.io/</a></li>
          </ul>
        </PanelNoControls>
        <PanelNoControls title="Project Overview - Pitcher Patterns and Tendencies">
          <p>
          This application is intended to serve as a tool for looking at a pitcher's pitch selection and effectiveness
          in a variety of scenarios. Technologies used include Node.js, React.js, MySQL, and Recharts. The database
          is queried whenever the user is searching for a pitcher, and then loading the dataset for the selected season year.
          All data manipulations/calculations are done client-side. To simplify the data and only keep what was relevent
          I removed certain pitch types (PO, IN, UN, AB, AS) as well as anything other than innings 1-9. The app can be used
          to look at data from any pitcher but some charts are more informative for starting pitchers since there is more available data
          to look for in-game trends. The database is not optimized in any way so the initial player search and data load may take a few seconds.
          </p>
          <p>
          I noticed the ID of the player in the dataset matches the ID of the player on MLB's web site. I used that ID
          to pull in player photos from their profile page on mlb.com.
          </p>
          <p>
          A quick overview of some of the application features:
            <ul>
              <li>
                <strong>Banner: </strong>Appears at the top of the page after a pitcher is selected and displays some general information including
                number of appearances, total pitches thrown, and average pitch count. Also allows the user to change the
                season year they want to analyze.
              </li>
              <li>
                <strong>Pitch Selection: </strong> Provides 2 types of charts illustrating the pitcher's pitch selection. Each
                chart can include data from all matchups, or specifically against left handed or right handed batters.
                <ul>
                  <li>
                    <strong>Overall: </strong> Shows the percentage of each type of pitch thrown.
                  </li>
                  <li>
                    <strong>Inning Breakdown: </strong> Shows how pitch selection changes from inning-to-inning.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Pitch Metrics: </strong> Displays the average velocity, spin rate, and the called strike probability
                of each pitch type thrown by the pitcher. It also allows the user to select a pitch type and chart how the
                average velocity and spin rate of that pitch changes over the course of the game.
              </li>
              <li>
                <strong>Situational Analysis: </strong> Allows the user to specify a number of criteria to describe the state
                of the game (runners on, count, inning, etc). The analysis will detail the pitcher's pitch selection
                tendencies in the described situation and compare the results to the pitcher's overall dataset. Illustrates
                if the pitcher is more or less likely to throw a specific pitch in the given situation, and also if he
                is more or less likely to throw it for a strike.
              </li>
              <li>
                <strong>Head-To-Head</strong> Shows the pitcher's pitch selection against a particular batter. Only batters
                that faced the pitcher are listed in the select box. Available data is the following:
                <ul>
                  <li>
                    <strong>General Stats: </strong> General matchup data (batting avg, plate appearances,
                    average pitches per plate appearance, etc).
                  </li>
                  <li>
                    <strong>Situational Analysis: </strong> Similar to the Situational Analysis in the other section, but
                    here we are only looking at data against the selected batter. Shows if the pitcher is more or less likely
                    to throw specific pitches to the selected batter.
                  </li>
                  <li>
                    <strong>Pitch Selection: </strong> Show the pitch selection changes each plate appearance
                    against the selected batter. For example, it may show that a pitcher throws mostly hard stuff to a
                    certain batter for the first 2 plate appearances, then switches to offspeed for latter plate
                    appearances. (This section may not be very useful when looking at relievers since they rarely
                    face a batter more than once in a game)
                  </li>
                </ul>
              </li>
            </ul>
          </p>
        </PanelNoControls>
      </div>
    );
  }
}
