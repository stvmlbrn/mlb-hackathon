import React, {Component} from 'react';

import PanelNoControls from '../components/panels/PanelNoControls';

export default class extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <PanelNoControls title="Pitcher Scouting Report - Project Overview">
          This project is intended to serve as a tool for scouting report on MLB pitchers. It allows the user
          to look for pitch selection tendencies under various circumstances. The project has 5 main sections:

          <h4>1) Banner</h4>
          Appears at the top of the pitcher's scouting report. I noticed the pitcherId value in the database
          matches the player ID on mlb.com. I use this value to pull the player's profile picture from MLB's
          website. Aside from the profile picture, the banner provides general information for number of
          appearances, total pitches thrown, and the average pitch count per appearance.
          <h4>2) Pitch Selection</h4>
          The Pitch Selection feature provides 2 charts based on the pitcher's pitch selection:
            <ul>
              <li><strong>Overall</strong> - Using the entire database of every pitch thrown by the pitcher for the
              selected year, this charts shows the percentage of each type of pitch thrown.</li>
              <li><strong>Inning Breakdown</strong> - Again using the entire dataset of every pitch throw by the
              pitcher for the selected year, this chart shows how pitch selection may change from inning-to-inning.
              For example, a starting pitcher may begin to use less fastballs and more off-speed pitches as the game
              progresses. This chart will show that tendency and by what margin the pitch selection actually changes.</li>
            </ul>

          <h4>3) Pitch Effectiveness</h4>

          <h4>4) Situational Analysis</h4>
          Allows the user to specify a number of criteria to describe the state of the game (runners on, count,
          inning, etc). The analysis will detail the pitcher's pitch selection tendencies in the described
          situation and compare the results to the pitcher's overall dataset. Illustrates if the pitcher is more
          or less likely to throw a specific pitch in the given situation, and if he is more or less likely
          to throw it for a strike.

          <h4>5) Head-to-Head</h4>
          Shows the pitcher's pitch selection against a particular batter. Only batters that faced the pitcher are
          listed in the select box. Available data is the following:
            <ul>
              <li><strong>General Stats</strong>Just some general matchup data (batting avg, plate appearances,
              average pitches per plate appearance, etc).</li>
              <li><strong>Situational Analysis</strong>Just like the Situational Analysis in the other section, but
              here we are only looking at data against the selected batter.</li>
              <li><strong>Pitch Selection</strong> - Show the pitch selection totals for each plate appearance
              against the selected batter. For example, it may show that a pitcher throws mostly hard stuff to a
              certain batter for the first 2 plate appearances, then switches to offspeed for latter plate
              appearances. (This section may not be very useful when looking at relievers since they rarely
              face a batter more than once in a game)
              </li>
            </ul>
          <dl>
            <dt>Technologies Used</dt>
            <dd>
              Node.js, React.js, MySQL, Recharts
            </dd>
            <dt>Data Preparation</dt>
            <dd>
              I used the provided .csv files to populate a MySQL database. I only kept records for innings
              1-9, and deleted pitch types that were not relevent to a pitcher's tendendies (PO, IN, UN, AB, AS).
            </dd>
          </dl>
        </PanelNoControls>
      </div>
    );
  }
}
