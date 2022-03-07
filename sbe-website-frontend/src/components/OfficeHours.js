// source: https://ej2.syncfusion.com/react/documentation/schedule/working-days/
// another source: https://www.npmjs.com/package/react-work-calendar
// another source: https://www.telerik.com/kendo-react-ui/components/scheduler/views/day/
// npm i @syncfusion/ej2

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScheduleComponent, Day, Week, Month, Inject, ViewsDirective, ViewDirective } from '@syncfusion/ej2-react-schedule';
// import { scheduleData } from './datasource';
import { extend } from '@syncfusion/ej2-base';

class OfficeHours extends React.Component {
    constructor() {
        super(...arguments);
        // this.data = extend([], scheduleData, null, true);
    }
    render() {
        return <ScheduleComponent width='100%' height='550px' selectedDate={new Date(2018, 1, 15)}  showWeekend={false} workDays={[1, 3, 4, 5]}>
        <ViewsDirective>
          <ViewDirective option='Day'/>
          <ViewDirective option='Week'/>
          <ViewDirective option='Month'/>
        </ViewsDirective>
        <Inject services={[Day, Week, Month]}/>
    </ScheduleComponent>;
    }
};
// ReactDOM.render(<OfficeHours />, document.getElementById('schedule'));
export default OfficeHours;