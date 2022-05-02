import {theme} from '../service/theme'

export let calTheme: {
    "common.font-family": string;
    "common.border": string; "common.backgroundColor": string; "common.holiday.color": string; "common.saturday.color": string; "common.dayname.color": string; "common.today.color": string;
    // creation guide style
    "common.creationGuide.backgroundColor": string; "common.creationGuide.border": string;
    // month header 'dayname'
    "month.dayname.height": string; "month.dayname.borderLeft": string; "month.dayname.paddingLeft": string; "month.dayname.paddingRight": string; "month.dayname.fontSize": string; "month.dayname.backgroundColor": string; "month.dayname.fontWeight": string; "month.dayname.textAlign": string;
    // month day grid cell 'day'
    "month.holidayExceptThisMonth.color": string; "month.dayExceptThisMonth.color": string; "month.weekend.backgroundColor": string; "month.day.fontSize": string;
    // month schedule style
    "month.schedule.height": string; "month.schedule.marginTop": string; "month.schedule.marginLeft": string; "month.schedule.marginRight": string;
    // month more view
    "month.moreView.boxShadow": string; "month.moreView.paddingBottom": string; "month.moreViewTitle.height": string; "month.moreViewTitle.marginBottom": string; "month.moreViewTitle.backgroundColor": string; "month.moreViewTitle.borderBottom": string; "month.moreViewTitle.padding": string; "month.moreViewList.padding": string;
    // week header 'dayname'
    "week.dayname.height": string; "week.dayname.borderTop": string; "week.dayname.borderBottom": string; "week.dayname.borderLeft": string; "week.dayname.paddingLeft": string; "week.dayname.backgroundColor": string; "week.dayname.textAlign": string; "week.today.color": string; "week.pastDay.color": string;
    // week vertical panel 'vpanel'
    "week.vpanelSplitter.border": string; "week.vpanelSplitter.height": string;
    // week daygrid 'daygrid'
    "week.daygrid.borderRight": string; "week.daygridLeft.width": string; "week.daygridLeft.backgroundColor": string; "week.daygridLeft.paddingRight": string; "week.daygridLeft.borderRight": string; "week.today.backgroundColor": string; "week.weekend.backgroundColor": string;
    // week timegrid 'timegrid'
    "week.timegridLeft.width": string; "week.timegridLeft.backgroundColor": string; "week.timegridLeft.borderRight": string; "week.timegridLeft.fontSize": string; "week.timegridLeftTimezoneLabel.height": string; "week.timegridLeftAdditionalTimezone.backgroundColor": string; "week.timegridOneHour.height": string; "week.timegridHalfHour.height": string; "week.timegridHalfHour.borderBottom": string; "week.timegridHorizontalLine.borderBottom": string; "week.timegrid.paddingRight": string; "week.timegrid.borderRight": string; "week.timegridSchedule.borderRadius": string; "week.timegridSchedule.paddingLeft": string; "week.currentTime.color": string; "week.currentTime.fontSize": string; "week.currentTime.fontWeight": string; "week.pastTime.color": string; "week.pastTime.fontWeight": string; "week.futureTime.color": string; "week.futureTime.fontWeight": string; "week.currentTimeLinePast.border": string; "week.currentTimeLineBullet.backgroundColor": string; "week.currentTimeLineToday.border": string; "week.currentTimeLineFuture.border": string;
    // week creation guide style
    "week.creationGuide.color": string; "week.creationGuide.fontSize": string; "week.creationGuide.fontWeight": string;
    // week daygrid schedule style
    "week.dayGridSchedule.borderRadius": string; "week.dayGridSchedule.height": string; "week.dayGridSchedule.marginTop": string; "week.dayGridSchedule.marginLeft": string; "week.dayGridSchedule.marginRight": string;
};
calTheme = {
    "common.font-family": "Arial",
    "common.border": "1px solid #ddd",
    "common.backgroundColor": "white",
    "common.holiday.color": theme.palette.primary.dark,
    "common.saturday.color": theme.palette.primary.dark,
    "common.dayname.color": theme.palette.primary.dark,
    "common.today.color": theme.palette.secondary.main,

    // creation guide style
    "common.creationGuide.backgroundColor": theme.palette.secondary.dark,     // "rgba(19, 93, 230, 0.1)",
    "common.creationGuide.border": "1px solid #135de6",

    // month header 'dayname'
    "month.dayname.height": "42px",
    "month.dayname.borderLeft": "none",
    "month.dayname.paddingLeft": "0",
    "month.dayname.paddingRight": "0",
    "month.dayname.fontSize": "13px",
    "month.dayname.backgroundColor": "inherit",
    "month.dayname.fontWeight": "normal",
    "month.dayname.textAlign": "center",

    // month day grid cell 'day'
    "month.holidayExceptThisMonth.color": "",
    "month.dayExceptThisMonth.color": "#bbb",
    "month.weekend.backgroundColor": "#fafafa",
    "month.day.fontSize": "16px",

    // month schedule style
    "month.schedule.height": "18px",
    "month.schedule.marginTop": "2px",
    "month.schedule.marginLeft": "10px",
    "month.schedule.marginRight": "10px",

    // month more view
    "month.moreView.boxShadow": "none",
    "month.moreView.paddingBottom": "0",
    "month.moreViewTitle.height": "28px",
    "month.moreViewTitle.marginBottom": "0",
    "month.moreViewTitle.backgroundColor": "#f4f4f4",
    "month.moreViewTitle.borderBottom": "1px solid #ddd",
    "month.moreViewTitle.padding": "0 10px",
    "month.moreViewList.padding": "10px",

    // week header 'dayname'
    "week.dayname.height": "41px",
    "week.dayname.borderTop": "1px solid #ddd",
    "week.dayname.borderBottom": "1px solid #ddd",
    "week.dayname.borderLeft": "1px solid #ddd",
    "week.dayname.paddingLeft": "5px",
    "week.dayname.backgroundColor": "inherit",
    "week.dayname.textAlign": "left",
    "week.today.color": theme.palette.secondary.dark,
    "week.pastDay.color": "#999",

    // week vertical panel 'vpanel'
    "week.vpanelSplitter.border": "1px solid #ddd",
    "week.vpanelSplitter.height": "3px",

    // week daygrid 'daygrid'
    "week.daygrid.borderRight": "1px solid #ddd",

    "week.daygridLeft.width": "100px",
    "week.daygridLeft.backgroundColor": "",
    "week.daygridLeft.paddingRight": "5px",
    "week.daygridLeft.borderRight": "1px solid #ddd",

    "week.today.backgroundColor": "inherit",
    "week.weekend.backgroundColor": "inherit",

    // week timegrid 'timegrid'
    "week.timegridLeft.width": "100px",
    "week.timegridLeft.backgroundColor": "#fafafa",
    "week.timegridLeft.borderRight": "1px solid #ddd",
    "week.timegridLeft.fontSize": "12px",
    "week.timegridLeftTimezoneLabel.height": "51px",
    "week.timegridLeftAdditionalTimezone.backgroundColor": "#fdfdfd",

    "week.timegridOneHour.height": "48px",
    "week.timegridHalfHour.height": "24px",
    "week.timegridHalfHour.borderBottom": "1px dotted #f9f9f9",
    "week.timegridHorizontalLine.borderBottom": "1px solid #eee",

    "week.timegrid.paddingRight": "10px",
    "week.timegrid.borderRight": "1px solid #ddd",
    "week.timegridSchedule.borderRadius": "0",
    "week.timegridSchedule.paddingLeft": "0",

    "week.currentTime.color": theme.palette.primary.dark,
    "week.currentTime.fontSize": "12px",
    "week.currentTime.fontWeight": "bold",

    "week.pastTime.color": "#999",
    "week.pastTime.fontWeight": "normal",

    "week.futureTime.color": "#333",
    "week.futureTime.fontWeight": "normal",

    "week.currentTimeLinePast.border": "1px solid rgba(19, 93, 230, 0.3)",
    "week.currentTimeLineBullet.backgroundColor": theme.palette.primary.dark,
    "week.currentTimeLineToday.border": "1px solid #135de6",
    "week.currentTimeLineFuture.border": "1px solid #135de6",

    // week creation guide style
    "week.creationGuide.color": theme.palette.secondary.dark,
    "week.creationGuide.fontSize": "12px",
    "week.creationGuide.fontWeight": "bold",

    // week daygrid schedule style
    "week.dayGridSchedule.borderRadius": "0",
    "week.dayGridSchedule.height": "18px",
    "week.dayGridSchedule.marginTop": "2px",
    "week.dayGridSchedule.marginLeft": "10px",
    "week.dayGridSchedule.marginRight": "10px"
};
