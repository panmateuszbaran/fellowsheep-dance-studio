import { withTranslation } from "react-i18next";
import "../../../node_modules/@syncfusion/ej2-buttons/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-base/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-calendars/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-inputs/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-navigations/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-popups/styles/material.css";
import "../../../node_modules/@syncfusion/ej2-react-schedule/styles/material.css";
import { ScheduleComponent, Day, Week, Month, Inject, ViewsDirective, ViewDirective, EventRenderedArgs } from '@syncfusion/ej2-react-schedule';
import { L10n, setCulture, loadCldr, extend, Internationalization } from '@syncfusion/ej2-base';
import plNumberData from '@syncfusion/ej2-cldr-data/main/pl/numbers.json';
import pltimeZoneData from '@syncfusion/ej2-cldr-data/main/pl/timeZoneNames.json';
import plGregorian from '@syncfusion/ej2-cldr-data/main/pl/ca-gregorian.json';
import plNumberingSystem from '@syncfusion/ej2-cldr-data/supplemental/numberingSystems.json';

import { DateTimePickerComponent } from '@syncfusion/ej2-react-calendars';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';

import pl from "../../../node_modules/@syncfusion/ej2-locale/src/pl.json";
import Container from "../../common/Container";
import ScrollToTop from "../../common/ScrollToTop";
import { Slide } from "react-awesome-reveal";
import { useRef } from "react";

L10n.load(pl);
loadCldr(plNumberData, pltimeZoneData, plGregorian, plNumberingSystem);
setCulture("pl");

const dataSource = [
  {
    Id: 1,
    Name: 'Janusz Tracz',
    Style: 'DiscoFox',
    StartTime: new Date(2025, 3, 21, 10, 0),
    EndTime: new Date(2025, 3, 21, 12, 0)
  },
];

interface SchedulerProps {
}

const timeScale = { enable: true, interval: 60, slotCount: 1 };
const workDays = [0, 1, 2, 3, 4, 5, 6];
const workHours = { highlight: true, start: '09:00', end: '22:00' };
const danceStyles = ['Pierwszy Taniec', 'DiscoFox', 'West Coast Swing', 'Salsa LA', 'Bachata', 'Taniec Towarzyski']

const Scheduler = ({}: SchedulerProps) => {
  ///////////////////////////////////////
  let scheduleObj = useRef<ScheduleComponent>(null);
  const data: Record<string, any>[] = extend([], (dataSource as Record<string, any>).doctorsEventData, undefined, true) as Record<string, any>[];
  const fields = {
    StartTime: { name: 'StartTime', validation: { required: true } },
    EndTime: { name: 'EndTime', validation: { required: false } },
    Style: { name: 'Style', validation: { required: true } },
    Name: { name: 'Name', validation: { required: true } }
  };

  // const onEventRendered = (args: EventRenderedArgs): void => {
  //   switch (args.data.EventType) {
  //     case 'Requested':
  //       (args.element as HTMLElement).style.backgroundColor = '#F57F17';
  //       break;
  //     case 'Confirmed':
  //       (args.element as HTMLElement).style.backgroundColor = '#7fa900';
  //       break;
  //     case 'New':
  //       (args.element as HTMLElement).style.backgroundColor = '#8e24aa';
  //       break;
  //   }
  // }

  const onActionBegin = (args: Record<string, any>): void => {
    console.log(args);
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
      let data: Record<string, any> = args.data instanceof Array ? args.data[0] : args.data;
      args.cancel = !scheduleObj.current?.isSlotAvailable(data.StartTime as Date, data.EndTime as Date);
    }
  }

  // const editorHeaderTemplate = (props: Record<string, any>) => {
  //   return (
  //     <div id="event-header">
  //       {(props !== undefined ) ? ((props.Subject) ? <div>{props.Subject}</div> : <div>Create New Event</div>) : <div></div>}
  //     </div>
  //   );
  // }

   const editorTemplate = (props: Record<string, any>) => {
    return ((props !== undefined) ? 
      <table className="custom-event-editor" style={{ width: '100%' }} cellPadding={5}>
        <tbody>
          <tr>
            <td className="e-textlabel">Imię i nazwisko</td>
            <td colSpan={4}>
              <input id="Name" className="e-field e-input" type="text" name="Name" style={{ width: '100%' }} />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Styl tańca</td>
            <td colSpan={4}>
              <DropDownListComponent id="Style" placeholder='Styl tańca' data-name='Style' className="e-field" style={{ width: '100%' }} dataSource={danceStyles} />
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Godzina</td>
            <td colSpan={4}>
              <DateTimePickerComponent id="StartTime" format='dd/MM/yy hh:mm a' data-name="StartTime" value={new Date(props.startTime || props.StartTime)} className="e-field" />
            </td>
          </tr>
        </tbody>
      </table >
      : 
      <div></div>
    );
  }  
  
  let instance: Internationalization = new Internationalization();

  const getTimeString = (value: Date) => {
    return instance.formatDate(value, { skeleton: 'hm' });
  }

  const monthEventTemplate = (props: any) => {
    return (
      <div className="template-wrap">
        <div className="subject">{props.Name}</div>
        <div className="style">{props.Style}</div>
      </div>
    );
  }
  //////////////////////////////////////
  return (
    <Container>
      <ScrollToTop />
      <Slide direction="right">
        <ScheduleComponent
          ref={scheduleObj} 
          eventSettings={{ dataSource: dataSource, fields: fields }} 
          editorTemplate={editorTemplate}
          selectedDate={new Date()}
          locale="pl"
          timeScale={timeScale}
          startHour="09:00"
          endHour="22:00"
          firstDayOfWeek={1}
          workDays={workDays}
          workHours={workHours}
          actionBegin={onActionBegin}
          // eventDoubleClick={(args: any)=>{args.cancel = true;}}
        >
          <ViewsDirective>
            <ViewDirective option='Day' />
            <ViewDirective option='Week'  eventTemplate={monthEventTemplate}/>
            <ViewDirective option='Month' />
          </ViewsDirective>
          <Inject services={[Day, Week, Month]} />
        </ScheduleComponent>
      </Slide>
    </Container>
  );
}

export default withTranslation()(Scheduler);