import { withTranslation } from "react-i18next";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, WorkWeek, Month, Agenda, Inject } from '@syncfusion/ej2-react-schedule';
import { L10n, setCulture, loadCldr } from '@syncfusion/ej2-base';
import plNumberData from '@syncfusion/ej2-cldr-data/main/pl/numbers.json';
import pltimeZoneData from '@syncfusion/ej2-cldr-data/main/pl/timeZoneNames.json';
import plGregorian from '@syncfusion/ej2-cldr-data/main/pl/ca-gregorian.json';
import plNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';

import pl from "../../../node_modules/@syncfusion/ej2-locale/src/pl.json";
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import { Slide } from "react-awesome-reveal";
L10n.load(pl);
loadCldr(plNumberData, pltimeZoneData, plGregorian, plNumberingSystem);
setCulture("pl");

const data = [
  {
    Id: 1,
    Subject: 'DiscoFox',
    StartTime: new Date(2023, 1, 15, 10, 0),
    EndTime: new Date(2023, 1, 15, 12, 30),
  },
];

interface SchedulerProps {
}


const Scheduler = ({}: SchedulerProps) => {
  return (
    <Container>
      <ScrollToTop />
      <Slide direction="right">
        <ScheduleComponent
          selectedDate={new Date(2023, 1, 15)}
          eventSettings={{
            dataSource: data,
          }}
          locale="pl"
        >
          <Inject services={[Day, Week, WorkWeek, Month, Agenda]} />
        </ScheduleComponent>
      </Slide>
    </Container>
  );
}

export default withTranslation()(Scheduler);